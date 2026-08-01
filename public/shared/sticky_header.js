(() => {
    const e = () => {
        const e = document.querySelector(".header");
        if (!e) return;
        const t = Math.ceil(e.getBoundingClientRect().height);
        document.documentElement.style.setProperty("--sticky-header-height", `${t}px`);
    };
    "loading" === document.readyState ? document.addEventListener("DOMContentLoaded", e, {
        once: !0
    }) : e(), window.addEventListener("resize", e);
})();
