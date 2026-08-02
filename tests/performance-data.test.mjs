import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

const readJson = async (path) => JSON.parse(await readFile(path, "utf8"));

test("monster summaries resolve to their detail chunks", async () => {
  const index = await readJson("public/sea/monster-album/data/monster_index_en-US.json");
  assert.ok(index.monsters.length > 2_000);
  for (const monster of index.monsters.filter((_, i) => i % 97 === 0)) {
    const chunk = await readJson(`public/sea/monster-album/data/optimized/en-US/${monster._detailChunk}`);
    assert.ok(chunk.monsters.some((detail) => Number(detail.id) === Number(monster.id)));
  }
});

test("affix manifest covers every indexed package", async () => {
  const [index, manifest] = await Promise.all([
    readJson("public/sea/affix-simulator/data/stunt_package_index_en-US.json"),
    readJson("public/sea/affix-simulator/data/stunt_shard_manifest_en-US.json"),
  ]);
  const packageIds = new Set;
  for (const type of [index.weapon_packages_by_type_and_level, index.armor_packages_by_type_and_level]) {
    for (const levels of Object.values(type || {})) {
      for (const ids of Object.values(levels || {})) for (const id of ids || []) packageIds.add(String(id));
    }
  }
  for (const packageId of packageIds) {
    const shard = manifest.packageToShard[packageId];
    assert.ok(shard, `missing shard for package ${packageId}`);
    await stat(`public/sea/affix-simulator/data/optimized/en-US/${shard}`);
  }
});

test("equipment and shop summaries resolve to detail records", async () => {
  for (const [name, base, rootKey] of [
    ["equipment", "public/sea/equipment/data", "items"],
    ["shop", "public/sea/shop/data", "items"],
  ]) {
    const index = await readJson(`${base}/${name}_index_en-US.json`);
    for (const item of index[rootKey].filter((_, i) => i % 83 === 0)) {
      const chunk = await readJson(`${base}/optimized/en-US/${item._detailChunk}`);
      assert.ok(chunk[rootKey].some((detail) => String(detail.id) === String(item.id)));
    }
  }
});

test("card source lookup is standalone and substantially smaller", async () => {
  const [lookup, source] = await Promise.all([
    stat("public/sea/card-simulator/data/card_monster_sources_en-US.json"),
    stat("source-data/sea/monster-album/data/monster_album_en-US.json"),
  ]);
  assert.ok(lookup.size < source.size / 2);
  const data = await readJson("public/sea/card-simulator/data/card_monster_sources_en-US.json");
  assert.ok(Object.keys(data.cards).length > 0);
});
