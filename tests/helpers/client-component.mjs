import { readFile } from "node:fs/promises";
import vm from "node:vm";
import ts from "typescript";

export async function loadDataModule(filename) {
  // Use the declared TypeScript dependency so tests also run on Node versions
  // supported by package.json that do not enable native type stripping.
  const source = await readFile(filename, "utf8");
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
    fileName: filename,
  }).outputText;
  return import(`data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`);
}

// Small hook harness for isolated event-handler tests; no browser or new test
// dependency is needed. Production HTML is checked separately through the Worker.
export async function loadClientComponent(filename, { globals = {}, modules = {} } = {}) {
  const slots = [];
  const effects = [];
  let cursor = 0;
  let stateWrites = 0;
  const react = {
    useState(initial) {
      const id = cursor++;
      if (!(id in slots)) slots[id] = { value: typeof initial === "function" ? initial() : initial };
      return [slots[id].value, (next) => {
        stateWrites++;
        slots[id].value = typeof next === "function" ? next(slots[id].value) : next;
      }];
    },
    useRef(initial) {
      const id = cursor++;
      if (!(id in slots)) slots[id] = { current: initial };
      return slots[id];
    },
    useEffect(callback, dependencies) {
      const id = cursor++;
      const previous = slots[id];
      if (!previous || !dependencies || dependencies.some((value, index) => !Object.is(value, previous.dependencies?.[index]))) {
        effects.push(() => {
          previous?.cleanup?.();
          slots[id] = { dependencies, cleanup: callback() };
        });
      }
    },
  };
  const element = (type, props) => ({ type, props: props || {} });
  const exports = {};
  const source = await readFile(filename, "utf8");
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022 },
    fileName: filename,
  }).outputText;
  vm.runInNewContext(compiled, {
    exports,
    require(name) {
      if (name in modules) return modules[name];
      if (name === "react") return react;
      if (name === "react/jsx-runtime") return { jsx: element, jsxs: element, Fragment: "fragment" };
      if (name.endsWith(".css")) return { __esModule: true, default: new Proxy({}, { get: (_, key) => key }) };
      throw new Error(`Unexpected component dependency: ${name}`);
    },
    URL, URLSearchParams, queueMicrotask, setTimeout, clearTimeout,
    ...globals,
  }, { filename });

  return {
    render(props = {}) {
      cursor = 0;
      const tree = exports.default(props);
      effects.splice(0).forEach((effect) => effect());
      return tree;
    },
    unmount() { slots.forEach((slot) => slot?.cleanup?.()); },
    get stateWrites() { return stateWrites; },
  };
}

export function findNodes(tree, predicate) {
  if (!tree || typeof tree !== "object") return [];
  if (Array.isArray(tree)) return tree.flatMap((child) => findNodes(child, predicate));
  if (typeof tree.type === "function") return findNodes(tree.type(tree.props), predicate);
  return [...(predicate(tree) ? [tree] : []), ...findNodes(tree.props?.children, predicate)];
}
