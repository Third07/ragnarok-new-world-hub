!function() {
    const e = [ "zh-TW", "en-US", "zh-CN", "th-TH", "id-ID" ];
    const t = function() {
        const t = new URLSearchParams(window.location.search).get("lang"), n = localStorage.getItem("ro_lang"), a = document.documentElement.getAttribute("lang"), o = Array.isArray(navigator.languages) ? navigator.languages : [], l = [ t, n, a, (navigator.language || "").trim(), ...o ], d = t => e.some(e => e.toLowerCase() === String(t).toLowerCase());
        for (const t of l) {
            if (!t) continue;
            const n = e.find(e => e.toLowerCase() === String(t).toLowerCase());
            if (n) return n;
        }
        for (const t of l) {
            if (!t) continue;
            const n = String(t).split("-")[0].toLowerCase();
            if ("zh" === n) {
                if (d("zh-TW")) return "zh-TW";
                const t = e.find(e => e.toLowerCase().startsWith("zh-"));
                if (t) return t;
            }
            if ("en" === n && d("en-US")) return "en-US";
            if (("id" === n || "in" === n) && d("id-ID")) return "id-ID";
        }
        return d("en-US") ? "en-US" : d("zh-TW") ? "zh-TW" : e[0] || "en-US";
    }();
    localStorage.setItem("ro_lang", t), document.documentElement.setAttribute("lang", t);
    const n = {
        "en-US": {
            eventLabel: "Event",
            eventLuckyRabbit: "Hoppy Quiz",
            eventGuildBanquet: "Guild Banquet",
            eventScholarExam: "Scholar Exam",
            eventElementTable: "Element Counter Table",
            searchLabel: "Search",
            searchPlaceholder: "Search questions...",
            answerShow: "Click to show answer",
            answerHide: "Click to hide answer",
            banquetShow: "Click to show answer variants",
            banquetHide: "Click to hide answer variants",
            revealAll: "Show all answers",
            hideAll: "Hide all answers",
            copied: "Copied!",
            noMatch: "No matching questions.",
            loading: "Loading…",
            loadFailed: "Failed to load event data.",
            noEventData: "No event data yet.",
            unavailableLuckyRabbit: "No event data yet.",
            unavailableGuildBanquet: "No event data yet."
        },
        "zh-CN": {
            eventLabel: "活动",
            eventLuckyRabbit: "兔兔送喜",
            eventGuildBanquet: "公会宴会",
            eventScholarExam: "学士考核",
            eventElementTable: "元素相克",
            searchLabel: "搜索题目",
            searchPlaceholder: "搜索题目...",
            answerShow: "点击显示答案",
            answerHide: "点击隐藏答案",
            banquetShow: "点击显示答案变体",
            banquetHide: "点击隐藏答案变体",
            revealAll: "显示全部答案",
            hideAll: "隐藏全部答案",
            copied: "已复制！",
            noMatch: "没有符合的题目。",
            loading: "加载中…",
            loadFailed: "载入活动资料失败。",
            noEventData: "尚无活动资料。",
            unavailableLuckyRabbit: "该活动当前暂未开放。",
            unavailableGuildBanquet: "该活动当前暂未开放。"
        },
        "th-TH": {
            eventLabel: "กิจกรรม",
            eventLuckyRabbit: "Hoppy Quiz",
            eventGuildBanquet: "งานเลี้ยงกิลด์",
            eventScholarExam: "Scholar Exam",
            eventElementTable: "ตารางธาตุแพ้ทาง",
            searchLabel: "ค้นหาคำถาม",
            searchPlaceholder: "ค้นหาคำถาม...",
            answerShow: "คลิกเพื่อแสดงคำตอบ",
            answerHide: "คลิกเพื่อซ่อนคำตอบ",
            banquetShow: "คลิกเพื่อแสดงคำตอบแบบอื่น",
            banquetHide: "คลิกเพื่อซ่อนคำตอบแบบอื่น",
            revealAll: "แสดงคำตอบทั้งหมด",
            hideAll: "ซ่อนคำตอบทั้งหมด",
            copied: "คัดลอกแล้ว!",
            noMatch: "ไม่พบคำถามที่ตรงกัน",
            loading: "กำลังโหลด…",
            loadFailed: "โหลดข้อมูลกิจกรรมไม่สำเร็จ",
            noEventData: "ยังไม่มีข้อมูลกิจกรรม",
            unavailableLuckyRabbit: "อีเวนต์นี้ยังไม่เปิดให้ใช้งานในขณะนี้",
            unavailableGuildBanquet: "อีเวนต์นี้ยังไม่เปิดให้ใช้งานในขณะนี้"
        },
        "zh-TW": {
            eventLabel: "活動",
            eventLuckyRabbit: "兔兔送喜",
            eventGuildBanquet: "公會宴會",
            eventScholarExam: "學士考核",
            eventElementTable: "元素相剋",
            searchLabel: "搜尋題目",
            searchPlaceholder: "搜尋題目...",
            answerShow: "點擊顯示答案",
            answerHide: "點擊隱藏答案",
            banquetShow: "點擊顯示答案變體",
            banquetHide: "點擊隱藏答案變體",
            revealAll: "顯示全部答案",
            hideAll: "隱藏全部答案",
            copied: "已複製！",
            noMatch: "沒有符合的題目。",
            loading: "載入中…",
            loadFailed: "載入活動資料失敗。",
            noEventData: "尚無活動資料。",
            unavailableLuckyRabbit: "此活動目前暫不開放。",
            unavailableGuildBanquet: "此活動目前暫不開放。"
        }
    }, a = n[t] || n["en-US"];
    function o(e) {
        return String(e || "zh-TW").toLowerCase().replace("-", "_");
    }
    const l = document.getElementById("study-event"), d = document.getElementById("study-content"), s = document.getElementById("study-reveal-wrap"), i = document.getElementById("study-reveal-all"), r = document.getElementById("study-reveal-label"), c = document.getElementById("study-search"), u = document.getElementById("study-search-wrap"), h = document.getElementById("study-empty"), p = a.answerShow, m = a.answerHide, w = a.banquetShow, y = a.banquetHide, v = a.revealAll, b = a.hideAll, q = {
        "lucky-rabbit": "10",
        "guild-banquet": "20",
        "scholar-exam": "25",
        "element-table": "30"
    }, g = Object.entries(q).reduce((e, [t, n]) => (e[n] = t, e), {}), C = {};
    function J() {
        const e = {
            "lucky-rabbit": a.eventLuckyRabbit,
            "guild-banquet": a.eventGuildBanquet,
            "scholar-exam": a.eventScholarExam,
            "element-table": a.eventElementTable
        }[l?.value] || "Study";
        window.RO_SET_PAGE_TITLE ? window.RO_SET_PAGE_TITLE(e) : document.title = e;
    }
    let f = !1, E = null;
    const S = [ "neutral", "water", "earth", "fire", "wind", "poison", "holy", "shadow", "ghost", "undead" ], L = {
        "en-US": {
            neutral: "Neutral",
            water: "Water",
            earth: "Earth",
            fire: "Fire",
            wind: "Wind",
            poison: "Poison",
            holy: "Holy",
            shadow: "Shadow",
            ghost: "Ghost",
            undead: "Undead"
        },
        "zh-CN": {
            neutral: "无属性",
            water: "水属性",
            earth: "地属性",
            fire: "火属性",
            wind: "风属性",
            poison: "毒属性",
            holy: "圣属性",
            shadow: "暗属性",
            ghost: "念属性",
            undead: "不死属性"
        },
        "th-TH": {
            neutral: "ไม่มีธาตุ",
            water: "ธาตุน้ำ",
            earth: "ธาตุดิน",
            fire: "ธาตุไฟ",
            wind: "ธาตุลม",
            poison: "ธาตุพิษ",
            holy: "ธาตุศักดิ์สิทธิ์",
            shadow: "ธาตุมืด",
            ghost: "ธาตุผี",
            undead: "ธาตุอันเดด"
        },
        "zh-TW": {
            neutral: "無屬性",
            water: "水屬性",
            earth: "地屬性",
            fire: "火屬性",
            wind: "風屬性",
            poison: "毒屬性",
            holy: "聖屬性",
            shadow: "暗屬性",
            ghost: "念屬性",
            undead: "不死屬性"
        }
    }, x = L[t] || L["en-US"], N = "zh-CN" === t || "zh-TW" === t ? "(缺少答案)" : "th-TH" === t ? "(ไม่มีคำตอบ)" : "(Missing answer)", k = "zh-CN" === t ? "(缺少题目)" : "zh-TW" === t ? "(缺少題目)" : "th-TH" === t ? "(ไม่มีคำถาม)" : "(Missing question)", T = "zh-CN" === t ? "攻击 / 防御" : "zh-TW" === t ? "攻擊 / 防禦" : "th-TH" === t ? "โจมตี / ป้องกัน" : "Attack / Defense", A = "zh-CN" === t ? "复制" : "zh-TW" === t ? "複製" : "th-TH" === t ? "คัดลอก" : "Copy", H = {
        neutral: "el-neutral",
        water: "el-water",
        earth: "el-earth",
        fire: "el-fire",
        wind: "el-wind",
        poison: "el-poison",
        holy: "el-holy",
        shadow: "el-shadow",
        ghost: "el-ghost",
        undead: "el-undead"
    }, z = {
        neutral: 1,
        water: 1,
        earth: 1,
        fire: 1,
        wind: 1,
        poison: 1,
        holy: .75,
        shadow: 1,
        ghost: 1,
        undead: 1
    }, B = {
        neutral: {
            holy: 1,
            ghost: .7
        },
        water: {
            water: .25,
            fire: 1.75,
            wind: .9
        },
        earth: {
            earth: .25,
            fire: .8,
            wind: 1.75
        },
        fire: {
            water: .8,
            earth: 1.75,
            fire: .25,
            undead: 1.5
        },
        wind: {
            water: 1.75,
            earth: .8,
            wind: .25
        },
        poison: {
            water: 1.25,
            earth: 1.25,
            fire: 1.25,
            wind: 1.25,
            poison: .25,
            holy: .5,
            shadow: .5,
            undead: .25
        },
        holy: {
            holy: .25,
            shadow: 1.5,
            undead: 1.75
        },
        shadow: {
            poison: .5,
            holy: 1.5,
            shadow: .25,
            undead: .25
        },
        ghost: {
            neutral: .7,
            shadow: .75,
            ghost: 1.5,
            undead: 1.25
        },
        undead: {
            poison: .5,
            holy: 1.25,
            shadow: .25,
            undead: .25
        }
    }, $ = {
        neutral: 1,
        water: 1,
        earth: 1,
        fire: 1,
        wind: 1,
        poison: 1,
        holy: .9,
        shadow: 1,
        ghost: 1,
        undead: 1
    }, M = {
        neutral: {
            holy: 1,
            ghost: .9
        },
        water: {
            water: .75,
            fire: 1.25,
            wind: .95
        },
        earth: {
            earth: .75,
            fire: .9,
            wind: 1.25
        },
        fire: {
            water: .9,
            earth: 1.25,
            fire: .75,
            undead: 1.15
        },
        wind: {
            water: 1.25,
            earth: .9,
            wind: .75
        },
        poison: {
            water: 1.1,
            earth: 1.1,
            fire: 1.1,
            wind: 1.1,
            poison: .75,
            holy: .8,
            shadow: .8,
            undead: .75
        },
        holy: {
            holy: .75,
            shadow: 1.15,
            undead: 1.25
        },
        shadow: {
            poison: .8,
            holy: 1.15,
            shadow: .75,
            undead: .75
        },
        ghost: {
            neutral: .9,
            shadow: .9,
            ghost: 1.15,
            undead: 1.1
        },
        undead: {
            poison: .8,
            holy: 1.1,
            shadow: .75,
            undead: .75
        }
    };
    function R(e) {
        return "function" == typeof window.withAssetVersion ? window.withAssetVersion(e) : e;
    }
    function W() {
        const e = window.location.hash.replace(/^#/, "");
        if (!e) return {};
        const t = new URLSearchParams(e), n = t.get("event"), a = t.get("reveal");
        let o = null;
        n && (o = g[n] || n, q[o] || (o = null));
        let l = null;
        return null !== a && (l = "1" === a || "true" === a), {
            eventKey: o,
            reveal: l
        };
    }
    function I() {
        if (f) return;
        const e = new URLSearchParams, t = q[l.value] || l.value;
        e.set("event", t), "element-table" !== l.value && e.set("reveal", i.checked ? "1" : "0");
        const n = `#${e.toString()}`;
        window.location.hash !== n && history.replaceState(null, "", `${window.location.pathname}${window.location.search}${n}`);
    }
    let P;
    function U(e) {
        const t = document.createElement("button");
        return t.type = "button", t.className = "copy-btn", t.title = A, t.textContent = "⧉", 
        t.addEventListener("click", n => {
            n.stopPropagation(), function(e) {
                e && navigator.clipboard && navigator.clipboard.writeText && navigator.clipboard.writeText(e).catch(() => {});
            }(e), function(e) {
                const t = P || (P = document.createElement("div"), P.className = "copy-toast", P.textContent = a.copied, 
                document.body.appendChild(P), P), n = e.getBoundingClientRect(), o = n.left + n.width / 2, l = n.top - 8;
                t.style.left = `${Math.max(8, Math.min(window.innerWidth - 8, o))}px`, t.style.top = `${Math.max(8, l)}px`, 
                t.classList.add("is-visible"), clearTimeout(e._copiedTimer), e._copiedTimer = setTimeout(() => {
                    t.classList.remove("is-visible");
                }, 1400);
            }(t);
        }), t;
    }
    function G(e, t) {
        if (e.classList.toggle("is-hidden", !t), e.classList.toggle("is-revealed", t), "banquet" === (e.dataset.layout || "rabbit")) {
            const n = e.querySelector(".qa-answer-value");
            if (n) {
                const a = n.querySelector(".qa-answer-label"), o = n.querySelector(".qa-answer-text"), l = n.querySelector(".qa-answer-options");
                if ("multi" === (n.dataset.type || "single")) return a && (a.hidden = !1, a.textContent = t ? y : w), 
                l && (l.hidden = !1, l.querySelectorAll(".qa-option-text").forEach(e => {
                    const n = e.dataset.answerValue || "";
                    e.textContent = t ? n : "???";
                })), l?.querySelectorAll(".copy-btn").forEach(e => {
                    e.style.display = t ? "grid" : "none";
                }), void (o && (o.hidden = !0, o.textContent = ""));
                a && (a.hidden = !1, a.textContent = t ? y : w), o && (o.hidden = !1, o.textContent = t ? e.dataset.answer : "???");
                const d = n.querySelector(".copy-btn");
                return void (d && (d.style.display = t ? "grid" : "none"));
            }
            const a = e.querySelector(".banquet-toggle"), o = e.querySelector(".banquet-answers"), l = e.querySelector(".banquet-single");
            return a && (a.textContent = t ? m : p), o && (o.hidden = !t), void (l && (l.hidden = !t));
        }
        const n = e.querySelector(".qa-answer-value");
        if (!n) return;
        const a = n.querySelector(".qa-answer-label"), o = n.querySelector(".qa-answer-text"), l = n.querySelector(".qa-answer-options"), d = n.dataset.type || "single";
        a && (a.textContent = t ? m : p), "multi" === d ? (l && (l.hidden = !t), o && (o.hidden = t, 
        o.textContent = "???")) : o && (o.hidden = !1, o.textContent = t ? e.dataset.answer : "???");
        const s = n.querySelector(".copy-btn");
        s && (s.style.display = t ? "grid" : "none");
    }
    function F(e) {
        const t = e.length > 0 && e.every(e => e.classList.contains("is-revealed"));
        i.checked = t, r.textContent = t ? b : v;
    }
    function _(e) {
        d.innerHTML = "";
        const t = document.createElement("div");
        t.className = "study-content", t.classList.toggle("is-banquet", "guild-banquet" === e.eventId);
        const n = "guild-banquet" === e.eventId, a = n ? [ ...e.questions ].sort((e, t) => {
            const n = Array.isArray(e.answers) ? e.answers.length : 0, a = Array.isArray(t.answers) ? t.answers.length : 0;
            return a !== n ? a - n : (e.id || 0) - (t.id || 0);
        }) : e.questions;
        if (n) {
            const e = a.reduce((e, t) => {
                const n = Array.isArray(t.answers) ? t.answers.length : t.answer ? 1 : 0;
                return Math.max(e, n);
            }, 1);
            t.style.setProperty("--banquet-max-answers", e);
        }
        a.forEach(e => {
            const a = Array.isArray(e.answers) && e.answers.length ? e.answers : e.answer ? [ e.answer ] : [], o = a.length ? a.join("\n") : N, l = a.length > 1, s = (a.length && a[0], 
            document.createElement("div"));
            s.className = "qa-card is-hidden", n ? (s.classList.add("banquet-card"), s.dataset.layout = "banquet") : s.dataset.layout = "rabbit", 
            s.dataset.answer = o, s.dataset.question = (e.question || "").toLowerCase();
            const i = document.createElement("div");
            i.className = "qa-header";
            const r = document.createElement("div");
            r.className = "qa-id", r.textContent = `Q${String(e.id).padStart(2, "0")}`, i.appendChild(r);
            const c = document.createElement("div");
            c.className = "qa-question", c.textContent = e.question || k;
            const u = document.createElement("div");
            if (u.className = "qa-answer-row", n) {
                const e = document.createElement("div");
                e.className = "qa-answer-value", e.dataset.type = l ? "multi" : "single";
                const t = document.createElement("div");
                t.className = "qa-answer-label", t.textContent = w, t.hidden = !1;
                const n = document.createElement("div");
                if (n.className = "qa-answer-text", n.textContent = "???", e.appendChild(t), e.appendChild(n), 
                l) {
                    n.textContent = "", n.hidden = !0;
                    const t = document.createElement("div");
                    t.className = "qa-answer-options", t.hidden = !1, a.forEach(e => {
                        const n = document.createElement("div");
                        n.className = "qa-option is-correct";
                        const a = document.createElement("span");
                        a.className = "qa-option-check", a.textContent = "✓";
                        const o = document.createElement("span");
                        o.className = "qa-option-text", o.dataset.answerValue = e, o.textContent = "???", 
                        n.appendChild(a), n.appendChild(o), n.appendChild(U(e)), t.appendChild(n);
                    }), e.appendChild(t);
                } else e.appendChild(U(o));
                e.addEventListener("click", () => {
                    const e = !s.classList.contains("is-revealed");
                    G(s, e), F(Array.from(d.querySelectorAll(".qa-card")));
                }), u.appendChild(e);
            } else {
                const e = document.createElement("div");
                e.className = "qa-answer-value", e.dataset.type = l ? "multi" : "single";
                const t = document.createElement("div");
                t.className = "qa-answer-label", t.textContent = p;
                const n = document.createElement("div");
                if (n.className = "qa-answer-text", n.textContent = "???", e.appendChild(t), e.appendChild(n), 
                l) {
                    const t = document.createElement("div");
                    t.className = "qa-answer-options", t.hidden = !0, a.forEach(e => {
                        const n = document.createElement("div");
                        n.className = "qa-option is-correct";
                        const a = document.createElement("span");
                        a.className = "qa-option-check", a.textContent = "✓";
                        const o = document.createElement("span");
                        o.className = "qa-option-text", o.textContent = e, n.appendChild(a), n.appendChild(o), 
                        n.appendChild(U(e)), t.appendChild(n);
                    }), e.appendChild(t);
                } else e.appendChild(U(o));
                e.addEventListener("click", () => {
                    const e = !s.classList.contains("is-revealed");
                    G(s, e), F(Array.from(d.querySelectorAll(".qa-card")));
                }), u.appendChild(e);
            }
            s.appendChild(i), s.appendChild(c), s.appendChild(u), G(s, !1), t.appendChild(s);
        }), d.appendChild(t), null !== E ? (i.checked = E, E = null) : i.checked = !1, i.dispatchEvent(new Event("change")), 
        V();
    }
    function D(e) {
        return (x[e] || "").replace(/屬性$|属性$/, "");
    }
    function j(e) {
        const t = document.createElement("div");
        t.className = "element-table-scroller";
        const n = document.createElement("table");
        n.className = "element-table";
        const a = document.createElement("thead"), o = document.createElement("tr"), l = document.createElement("th");
        l.className = "element-corner", l.textContent = T, o.appendChild(l), S.forEach(e => {
            const t = document.createElement("th");
            t.className = `element-header ${H[e]}`, t.textContent = D(e), o.appendChild(t);
        }), a.appendChild(o), n.appendChild(a);
        const d = document.createElement("tbody"), s = function(e) {
            const t = "pvp" === e ? $ : z, n = "pvp" === e ? M : B;
            return S.map(e => {
                const a = {
                    ...t
                }, o = n[e];
                return o && Object.keys(o).forEach(e => {
                    a[e] = o[e];
                }), {
                    key: e,
                    values: a
                };
            });
        }(e);
        return s.forEach(e => {
            const t = document.createElement("tr"), n = document.createElement("th");
            n.className = `element-header ${H[e.key]}`, n.textContent = D(e.key), t.appendChild(n), 
            S.forEach(n => {
                const a = e.values[n], o = document.createElement("td");
                o.className = "element-cell", a > 1 && o.classList.add("is-strong"), a < 1 && o.classList.add("is-weak"), 
                1 === a && o.classList.add("is-even"), o.textContent = Number(a).toFixed(2).replace(/\.00$/, ""), 
                t.appendChild(o);
            }), d.appendChild(t);
        }), n.appendChild(d), t.appendChild(n), t;
    }
    function V() {
        const e = (c.value || "").trim().toLowerCase(), t = Array.from(d.querySelectorAll(".qa-card"));
        let n = 0;
        t.forEach(t => {
            const a = !e || t.dataset.question.includes(e);
            t.style.display = a ? "grid" : "none", a && (n += 1);
        }), h.hidden = 0 !== n;
    }
    async function K() {
        const e = l.value;
        if (d.innerHTML = `<div class="study-empty">${a.loading}</div>`, s.hidden = !0, 
        u.hidden = !1, s.style.display = "", u.style.display = "", h.hidden = !0, "lucky-rabbit" === e) {
            s.hidden = !1;
            try {
                _(await async function() {
                    if (C.luckyRabbit) return C.luckyRabbit;
                    const e = `./data/lucky_rabbit_questions_${o(t)}.json`;
                    let n = await fetch(R(e));
                    if (!n.ok) throw new Error("Failed to load LuckyRabbit questions");
                    const a = await n.json();
                    return C.luckyRabbit = a, a;
                }());
            } catch (e) {
                d.innerHTML = `<div class="study-empty">${a.loadFailed}</div>`;
            }
        } else if ("guild-banquet" === e) {
            s.hidden = !1;
            try {
                _(await async function() {
                    if (C.guildBanquet) return C.guildBanquet;
                    const e = `./data/guild_banquet_questions_${o(t)}.json`;
                    let n = await fetch(R(e));
                    if (!n.ok) throw new Error("Failed to load Guild Banquet questions");
                    const a = await n.json();
                    return C.guildBanquet = a, a;
                }());
            } catch (e) {
                d.innerHTML = `<div class="study-empty">${a.loadFailed}</div>`;
            }
        } else if ("scholar-exam" === e) {
            s.hidden = !1;
            try {
                _(await async function() {
                    if (C.scholarExam) return C.scholarExam;
                    const e = `./data/scholar_exam_questions_${o(t)}.json`;
                    let n = await fetch(R(e));
                    if (!n.ok) throw new Error("Failed to load Scholar Exam questions");
                    const a = await n.json();
                    return C.scholarExam = a, a;
                }());
            } catch (e) {
                d.innerHTML = `<div class="study-empty">${a.loadFailed}</div>`;
            }
        } else "element-table" === e ? (u.hidden = !0, u.style.display = "none", s.style.display = "none", 
        function() {
            d.innerHTML = "";
            const e = document.createElement("div");
            e.className = "element-table-host";
            const t = document.createElement("div");
            t.className = "element-table-section-title", t.textContent = "PVE", e.appendChild(t), 
            e.appendChild(j("pve"));
            const n = document.createElement("div");
            n.className = "element-table-section-title", n.textContent = "PVP", e.appendChild(n), 
            e.appendChild(j("pvp")), d.appendChild(e), h.hidden = !0;
        }()) : d.innerHTML = `<div class="study-empty">${a.noEventData}</div>`;
    }
    i.addEventListener("change", () => {
        const e = Array.from(d.querySelectorAll(".qa-card")), t = i.checked;
        e.forEach(e => G(e, t)), r.textContent = t ? b : v, I();
    }), l.addEventListener("change", () => {
        J(), I(), K();
    }), c.addEventListener("input", V);
    const {eventKey: Q, reveal: O} = W();
    !function() {
        const e = document.querySelector("label.study-select > span");
        e && (e.textContent = a.eventLabel);
        const t = l?.querySelector('option[value="lucky-rabbit"]');
        t && (t.textContent = a.eventLuckyRabbit);
        const n = l?.querySelector('option[value="guild-banquet"]');
        n && (n.textContent = a.eventGuildBanquet);
        const o = l?.querySelector('option[value="scholar-exam"]');
        o && (o.textContent = a.eventScholarExam);
        const s = l?.querySelector('option[value="element-table"]');
        s && (s.textContent = a.eventElementTable), r && (r.textContent = v);
        const d = document.querySelector("label.study-search-wrap > span");
        d && (d.textContent = a.searchLabel), c && (c.placeholder = a.searchPlaceholder), 
        h && String(h.textContent || "").trim() && (h.textContent = a.noMatch);
    }(), Q && (l.value = Q), J(), null !== O && (E = O), f = !0, K().finally(() => {
        f = !1, I();
    }), window.addEventListener("hashchange", () => {
        const {eventKey: e, reveal: t} = W();
        if (e && e !== l.value) return l.value = e, J(), E = t, void K();
        null !== t && (i.checked = t, i.dispatchEvent(new Event("change")));
    });
}();
