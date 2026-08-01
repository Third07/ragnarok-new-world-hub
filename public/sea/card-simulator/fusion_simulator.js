(() => {
    const e = [ "zh-TW", "en-US", "zh-CN", "th-TH", "id-ID" ];
    const t = function() {
        const t = new URLSearchParams(window.location.search).get("lang"), n = localStorage.getItem("ro_lang"), a = document.documentElement.getAttribute("lang"), i = Array.isArray(navigator.languages) ? navigator.languages : [], o = [ t, n, a, (navigator.language || "").trim(), ...i ];
        for (const t of o) {
            if (!t) continue;
            const n = e.find(e => e.toLowerCase() === String(t).toLowerCase());
            if (n) return n;
        }
        for (const e of o) {
            if (!e) continue;
            const t = String(e).split("-")[0].toLowerCase();
            if ("zh" === t) return "zh-TW";
            if ("en" === t) return "en-US";
            if ("th" === t) return "th-TH";
            if ("id" === t || "in" === t) return "id-ID";
        }
        return "en-US";
    }();
    localStorage.setItem("ro_lang", t), document.documentElement.setAttribute("lang", t);
    const n = {
        "en-US": {
            pageTitle: "Card Fusion Odds",
            mainCard: "Main Card",
            materialCard: "Material Card",
            locked: "Locked",
            none: "None",
            cardsMismatch: "Fusion requires both cards to use the same slot type.",
            materialQualityMismatch: "Material card quality must match the main card or be exactly one tier lower.",
            mvpBlocked: "MVP cards cannot participate in fusion.",
            lockQualityMismatch: "Locking requires both cards to have the same quality.",
            selectCard: "Select card",
            clearCard: "Remove card",
            emptySlot: "Empty slot",
            fixedEffects: "Fixed Effects",
            randomEffects: "Random Effects",
            weight: "Weight",
            chance: "Chance",
            levelShort: "Lv.{level}",
            otherCardTypes: "Other Slot Types",
            moveUp: "Move effect up",
            moveDown: "Move effect down",
            searchCards: "Search cards...",
            searchEffects: "Search effects...",
            noResults: "No matching results.",
            pickerSelectCard: "Select Card",
            pickerSelectEffect: "Select Effect",
            noDecayBadge: "★",
            noDecayTitle: "Fixed effect does not decay",
            slot: "Slot {slot}",
            level: "Level",
            lock: "Lock",
            unlock: "Unlock",
            oddsMain: "Main",
            oddsMaterial: "Material",
            sameEffect: "Same effect",
            cardType: "Slot Type",
            chooseEffect: "Choose effect",
            fixedEffectSubtitle: "Card fixed effect"
        },
        "zh-TW": {
            pageTitle: "卡片融合機率",
            mainCard: "主卡",
            materialCard: "素材卡",
            locked: "已鎖定",
            none: "未鎖定",
            cardsMismatch: "融合要求主卡與素材卡的部位相同。",
            materialQualityMismatch: "素材卡的品質必須與主卡相同，或剛好低一個品質。",
            mvpBlocked: "MVP卡無法參與融合。",
            lockQualityMismatch: "只有兩張卡片品質相同時才能鎖定詞條。",
            selectCard: "選擇卡片",
            clearCard: "移除卡片",
            emptySlot: "空白詞條",
            fixedEffects: "固有詞條",
            randomEffects: "隨機詞條",
            weight: "權重",
            chance: "機率",
            levelShort: "Lv.{level}",
            otherCardTypes: "其他部位",
            moveUp: "將詞條上移",
            moveDown: "將詞條下移",
            searchCards: "搜尋卡片...",
            searchEffects: "搜尋詞條...",
            noResults: "沒有符合的選項。",
            pickerSelectCard: "選擇卡片",
            pickerSelectEffect: "選擇詞條",
            noDecayBadge: "★",
            noDecayTitle: "固有效果不受衰減影響",
            slot: "第 {slot} 格",
            level: "等級",
            lock: "鎖",
            unlock: "解除",
            oddsMain: "主卡",
            oddsMaterial: "素材卡",
            sameEffect: "相同詞條",
            cardType: "部位",
            chooseEffect: "選擇詞條",
            fixedEffectSubtitle: "卡片固有效果"
        },
        "zh-CN": {
            pageTitle: "卡片融合概率",
            mainCard: "主卡",
            materialCard: "材料卡",
            locked: "已锁定",
            none: "未锁定",
            cardsMismatch: "融合要求主卡与材料卡的部位相同。",
            materialQualityMismatch: "材料卡的品质必须与主卡相同，或刚好低一个品质。",
            mvpBlocked: "MVP卡无法参与融合。",
            lockQualityMismatch: "只有两张卡片品质相同时才能锁定词条。",
            selectCard: "选择卡片",
            clearCard: "移除卡片",
            emptySlot: "空白词条",
            fixedEffects: "固有词条",
            randomEffects: "随机词条",
            weight: "权重",
            chance: "概率",
            levelShort: "Lv.{level}",
            otherCardTypes: "其他部位",
            moveUp: "将词条上移",
            moveDown: "将词条下移",
            searchCards: "搜索卡片...",
            searchEffects: "搜索词条...",
            noResults: "没有符合的选项。",
            pickerSelectCard: "选择卡片",
            pickerSelectEffect: "选择词条",
            noDecayBadge: "★",
            noDecayTitle: "固有效果不受衰减影响",
            slot: "第 {slot} 格",
            level: "等级",
            lock: "锁",
            unlock: "解除",
            oddsMain: "主卡",
            oddsMaterial: "材料卡",
            sameEffect: "相同词条",
            cardType: "部位",
            chooseEffect: "选择词条",
            fixedEffectSubtitle: "卡片固有效果"
        },
        "th-TH": {
            pageTitle: "โอกาสผสมการ์ด",
            mainCard: "การ์ดหลัก",
            materialCard: "การ์ดวัตถุดิบ",
            locked: "ล็อกอยู่",
            none: "ไม่ล็อก",
            cardsMismatch: "การผสมต้องใช้การ์ดที่เป็นช่องสวมใส่เดียวกัน",
            materialQualityMismatch: "คุณภาพของการ์ดวัตถุดิบต้องเท่ากับการ์ดหลักหรือ ต่ำกว่าหนึ่งขั้นเท่านั้น",
            mvpBlocked: "การ์ด MVP ไม่สามารถใช้ผสมได้",
            lockQualityMismatch: "การล็อกเอฟเฟกต์ใช้ได้เฉพาะเมื่อการ์ดทั้งสองใบมีคุณภาพเท่ากัน",
            selectCard: "เลือกการ์ด",
            clearCard: "ลบการ์ด",
            emptySlot: "ช่องว่าง",
            fixedEffects: "เอฟเฟกต์ติดตัว",
            randomEffects: "เอฟเฟกต์สุ่ม",
            weight: "น้ำหนัก",
            chance: "โอกาส",
            levelShort: "Lv.{level}",
            otherCardTypes: "ประเภทช่องอื่น",
            moveUp: "เลื่อนเอฟเฟกต์ขึ้น",
            moveDown: "เลื่อนเอฟเฟกต์ลง",
            searchCards: "ค้นหาการ์ด...",
            searchEffects: "ค้นหาเอฟเฟกต์...",
            noResults: "ไม่พบผลลัพธ์",
            pickerSelectCard: "เลือกการ์ด",
            pickerSelectEffect: "เลือกเอฟเฟกต์",
            noDecayBadge: "★",
            noDecayTitle: "เอฟเฟกต์ติดตัวไม่ถูกลดค่าจากการซ้ำกัน",
            slot: "ช่อง {slot}",
            level: "ระดับ",
            lock: "ล็อก",
            unlock: "ปลดล็อก",
            oddsMain: "หลัก",
            oddsMaterial: "วัตถุดิบ",
            sameEffect: "เอฟเฟกต์เดียวกัน",
            cardType: "ช่องสวมใส่",
            chooseEffect: "เลือกเอฟเฟกต์",
            fixedEffectSubtitle: "เอฟเฟกต์ติดตัวของการ์ด"
        }
    }, a = {
        "en-US": {
            sections: [ {
                title: "Basic Rules",
                items: [ "Fusion combines a Main Card and a Material Card into a new card. The new card keeps the Main Card’s quality, binding, and affix count, and each affix is selected from the same position on the two source cards.", "The Material Card is destroyed after fusion. You can choose to keep either the original Main Card or the new fused card.", "The two cards must be for the same slot. The material card must be the same quality as the main card or 1 quality lower. MVP cards cannot be fused.", "Fusion consumes Spirit Pieces. Higher Main Card quality and locked affixes increase the cost.", "Cards that are currently socketed cannot be used as Material Cards." ]
            }, {
                title: "Affix Lock",
                items: [ "The material card must be for the same slot as the main card. When the two cards are the same quality, the affix lock feature is enabled. If the material card is bound, then the main card will also become bound after fusion.", "You can lock up to 1 affix. A locked affix is guaranteed to appear on the new card.", "If no affix is locked, affixes are randomly selected from the same slots on both cards.", "Any extra affixes on the Material Card that exceed the Main Card's count will not appear on the new card.", "Cards of different quality cannot lock affixes.", "The Material Card must have at least as many affixes as the Main Card." ]
            }, {
                title: "Value Decay",
                items: [ "The affixes each card naturally carries are treated as fixed affixes during fusion.", "When a card has multiple fixed affixes, numeric attributes decay: 2 fixed affixes decay to 75%, and 3 fixed affixes decay to 60%." ]
            } ]
        },
        "zh-TW": {
            sections: [ {
                title: "基礎規則",
                items: [ "融合可將主卡片和材料卡融合成1張新卡。新卡片品質、綁定屬性、詞條數和主卡片相同，新卡片詞條將從兩張卡片中同位置的詞條中隨機選擇一個。", "融合後材料卡將銷毀，可在主卡片或新卡片中選擇一張保留。", "卡片要求：兩張卡片的部位需要相同；材料卡的品質需要與主卡品質相同或低一個品質；MVP卡無法參與融合。", "融合消耗靈魂碎片，主卡片品質越高消耗越多；鎖定詞條將額外提升靈魂碎片消耗。", "正在插卡中的卡片不可作為材料卡參與融合。" ]
            }, {
                title: "詞條鎖定",
                items: [ "材料卡的部位需要和主卡片一樣，當兩張卡片品質相同時，就能開啟鎖詞條功能。如果材料卡是綁定卡片，那麼融合後主卡片也會變成綁定卡片。", "詞條最多可以鎖1條，鎖定的詞條一定會出現在新卡片裡。", "都不鎖定的話，就從主卡片和材料卡相同位置的詞條中隨機選。", "材料卡比主卡片多出來的詞條會消失，不會出現在新卡片中。", "卡片品質不同，無法鎖定詞條。", "材料卡的詞條數需要與主卡相同或更多。" ]
            }, {
                title: "數值衰減",
                items: [ "每張卡片自己必定攜帶的詞條在融合中視為固有詞條。", "卡片擁有多個固有詞條時數值類屬性衰減，兩條衰減至75%，3條衰減至60%。" ]
            } ]
        },
        "zh-CN": {
            sections: [ {
                title: "基础规则",
                items: [ "融合可将主卡片和材料卡融合成1张新卡。新卡片品质、绑定属性、词条数和主卡片相同，新卡片词条将从两张卡片中同位置的词条中随机选择一个。", "融合后材料卡将销毁，可在主卡片或新卡片中选择一张保留。", "卡片要求：两张卡片的部位需要相同；材料卡的品质需要与主卡品质相同或低一个品质；MVP卡无法参与融合。", "融合消耗灵魂碎片，主卡片品质越高消耗越多；锁定词条将额外提升灵魂碎片消耗。", "正在插卡中的卡片不可作为材料卡参与融合。" ]
            }, {
                title: "词条锁定",
                items: [ "材料卡的部位需要和主卡片一样，当两张卡片品质相同时，就能开启锁词条功能。如果材料卡是绑定卡片，那么融合后主卡片也会变成绑定卡片。", "词条最多可以锁1条，锁定的词条一定会出现在新卡片里。", "都不锁定的话，就从主卡片和材料卡相同位置的词条中随机选。", "材料卡比主卡片多出来的词条会消失，不会出现在新卡片中。", "卡片品质不同，无法锁定词条。", "材料卡的词条数需要与主卡相同或更多。" ]
            }, {
                title: "数值衰减",
                items: [ "每张卡片自己必定携带的词条在融合中视为固有词条。", "卡片拥有多个固有词条时数值类属性衰减，两条衰减至75%，3条衰减至60%。" ]
            } ]
        }
    }, i = {
        "en-US": {
            decayNote: "Cards marked with a ★ do not seem to be affected by the 75% / 60% reduction in stats.",
            paragraphs: [ "Each card has 1 fixed effect and 2 random effects.", "Each card effect has 3 weights.", "The main issue is that it is not known how the game uses the 3 weights attached to each card effect. My best guess is that the weights are applied based on the slot of that effect." ],
            bullets: [ "If you can come up with a more plausible explanation for how the 3 weights are used, let me know." ],
            feedbackLine: "If you can come up with a more plausible explanation for how the 3 weights are used, let me know.",
            introTitle: "Current Understanding",
            examplesTitle: "Weight Examples",
            examplesLead: "Below are real effect texts and weights taken from the current fusion export / Lua-backed data.",
            formulaTitle: "Assumed formula used by this simulator",
            formulaCode: "slotChance = effect.FusionWeight[slot] / (mainEffect.FusionWeight[slot] + materialEffect.FusionWeight[slot])",
            guaranteeTitle: "Pity / Guarantee Notes",
            guaranteeLead: "There is also a separate config file named CardFusionGuaranteeTable. In the current client dump, it exposes rows keyed as 2 / 3 / 4, and each row contains three fields: GuaranteeNum1, GuaranteeNum2, and GuaranteeNum3.",
            guaranteeBullets: [ "In the current client dump, all visible rows repeat the same values: GuaranteeNum1 = [9, 11], GuaranteeNum2 = [95, 105], GuaranteeNum3 = [9, 11].", "The client UI does not show how those three guarantee fields are consumed, and I have not found a live card-fusion panel/controller path that explains them.", "So the file clearly exists and looks related, but the exact runtime meaning of those three guarantee fields is still unresolved." ],
            guaranteeCode: "[2] = { GuaranteeNum1 = {9, 11}, GuaranteeNum2 = {95, 105}, GuaranteeNum3 = {9, 11} }\n[3] = { GuaranteeNum1 = {9, 11}, GuaranteeNum2 = {95, 105}, GuaranteeNum3 = {9, 11} }\n[4] = { GuaranteeNum1 = {9, 11}, GuaranteeNum2 = {95, 105}, GuaranteeNum3 = {9, 11} }",
            fixedExampleTitle: "Primary sample",
            randomGreenTitle: "Random sample (green cards)",
            randomBlueTitle: "Random sample (blue cards)",
            randomPurpleTitle: "Random sample (purple cards)",
            cardLabel: "Card",
            effectLabel: "Effect",
            fusionWeightLabel: "FusionWeight"
        },
        "zh-TW": {
            decayNote: "標記 ★ 的卡片看起來不會受到 75% / 60% 的數值衰減影響。",
            paragraphs: [ "每張卡片有1條固有效果與2條隨機效果。", "每一條卡片效果都帶有3個權重。", "目前最大的問題是，還不知道遊戲到底怎麼使用每條效果附帶的這3個權重。我目前最傾向的猜測，是權重會依照該效果所在的詞條位置來套用。" ],
            bullets: [ "如果你能提出一個更合理的解釋，說明這3個權重實際上是怎麼被使用的，請告訴我。", "另外還有一個跟保底疑似有關的檔案，叫做 CardFusionGuaranteeTable。它存了 GuaranteeNum1 / GuaranteeNum2 / GuaranteeNum3，並且目前看得到的幾列值完全重複。", "目前重複出現的值是：GuaranteeNum1 = [9, 11]、GuaranteeNum2 = [95, 105]、GuaranteeNum3 = [9, 11]。", "但從目前看得到的客戶端融合介面，還看不出這些保底數字到底怎麼生效，所以目前只能確定它看起來像保底 / 保證相關設定，實際作用仍不明。" ],
            fixedExampleTitle: "例子：帶有3個權重的固有效果",
            fixedExampleSubtitle: "這是從融合匯出資料裡抓出來的一個真實固有效果例子。",
            randomExampleTitle: "例子：同一組隨機效果的3個數值層級",
            randomExampleSubtitle: "這是同一條真實隨機效果在低 / 中 / 高數值層級下的實際資料。",
            effectColumn: "效果",
            weightColumn: "3個權重",
            feedbackLine: "如果你能提出一個更合理的解釋，說明這 3 個權重實際上是怎麼被使用的，請告訴我。",
            introTitle: "目前推測",
            examplesTitle: "權重例子",
            examplesLead: "下面都是從匯出的融合資料裡直接抓出來的真實例子。",
            formulaTitle: "這個模擬器目前假設使用的公式",
            formulaCode: "slotChance = effect.FusionWeight[slot] / (mainEffect.FusionWeight[slot] + materialEffect.FusionWeight[slot])",
            guaranteeTitle: "保底 / 保證相關資料",
            guaranteeLead: "另外還有一個疑似跟保底有關的檔案，叫做 CardFusionGuaranteeTable。它存了 GuaranteeNum1 / GuaranteeNum2 / GuaranteeNum3，而且目前看得到的幾列值完全重複。",
            guaranteeBullets: [ "目前重複出現的值是：GuaranteeNum1 = [9, 11]、GuaranteeNum2 = [95, 105]、GuaranteeNum3 = [9, 11]。", "但從目前看得到的客戶端融合介面，還看不出這些保底數字到底怎麼生效，所以目前只能確定它看起來像保底 / 保證相關設定，實際作用仍不明。" ],
            guaranteeCode: "[2] = { GuaranteeNum1 = {9, 11}, GuaranteeNum2 = {95, 105}, GuaranteeNum3 = {9, 11} }\n[3] = { GuaranteeNum1 = {9, 11}, GuaranteeNum2 = {95, 105}, GuaranteeNum3 = {9, 11} }\n[4] = { GuaranteeNum1 = {9, 11}, GuaranteeNum2 = {95, 105}, GuaranteeNum3 = {9, 11} }",
            cardLabel: "卡片",
            effectLabel: "效果",
            fusionWeightLabel: "FusionWeight",
            randomGreenTitle: "隨機樣本（綠卡）",
            randomBlueTitle: "隨機樣本（藍卡）",
            randomPurpleTitle: "隨機樣本（紫卡）"
        }
    };
    Object.entries({
        "en-US": {
            infoButton: "Fusion Info",
            infoTitle: "Card Fusion Info",
            knownTab: "Official Info",
            speculatedTab: "Speculated Info",
            disclaimer: "Card fusion is still not fully figured out. Do not assume the simulator is fully correct."
        },
        "zh-TW": {
            infoButton: "卡片融合說明",
            infoTitle: "卡片融合說明",
            knownTab: "官方資訊",
            speculatedTab: "推測資訊",
            disclaimer: "卡片融合的實際運作仍未完全釐清，不要將此模擬器視為絕對正確。"
        },
        "zh-CN": {
            infoButton: "卡片融合说明",
            infoTitle: "卡片融合说明",
            knownTab: "官方信息",
            speculatedTab: "推测信息",
            disclaimer: "卡片融合的实际运作仍未完全厘清，不要把这个模拟器当成绝对正确。"
        },
        "th-TH": {
            infoButton: "คำอธิบายการผสมการ์ด",
            infoTitle: "คำอธิบายการผสมการ์ด",
            knownTab: "ข้อมูลทางการ",
            speculatedTab: "ข้อมูลที่คาดการณ์",
            disclaimer: "ระบบผสมการ์ดยังถูกแกะรอยไม่ครบ อย่าสมมติว่าตัวจำลองนี้ถูกต้องทั้งหมด"
        },
        "id-ID": {
            infoButton: "Info Fusion Kartu",
            infoTitle: "Info Fusion Kartu",
            knownTab: "Info Resmi",
            speculatedTab: "Info Spekulatif",
            disclaimer: "Sistem fusion kartu belum sepenuhnya dipahami. Jangan anggap simulator ini sepenuhnya akurat."
        }
    }).forEach(([e, t]) => {
        n[e] || (n[e] = {}), Object.assign(n[e], t);
    });
    const o = n[t] || n["en-US"], r = (e, t = {}) => String(o[e] || n["en-US"][e] || e).replace(/\{(\w+)\}/g, (e, n) => String(t[n] ?? "")), c = a[t] || a["en-US"], s = i[t] || i["en-US"], l = {
        iconPathsUrl: "/sea/skill-simulator/data/icon_paths.json",
        iconBasePath: "/media/images/",
        itemIconBase: "/media/images/item/",
        equipSlotIconBase: "/media/images/equipslot/",
        dataUrl: `/sea/card-simulator/data/card_fusion_simulator_${t}.json`
    }, d = window.withAssetVersion || (e => e);
    let iconPathData = null, iconPathPromise = null;
    const m = {
        cards: [],
        cardsById: new Map,
        optionsByKey: new Map,
        randomGroupById: new Map,
        randomGroupsByLibrary: new Map,
        randomGroupsByType: new Map,
        fixedOptionsByType: new Map,
        decayGroups: new Map,
        selected: {
            main: null,
            material: null
        },
        slots: {
            main: [ {
                category: "empty",
                key: "",
                groupId: ""
            }, {
                category: "empty",
                key: "",
                groupId: ""
            }, {
                category: "empty",
                key: "",
                groupId: ""
            } ],
            material: [ {
                category: "empty",
                key: "",
                groupId: ""
            }, {
                category: "empty",
                key: "",
                groupId: ""
            }, {
                category: "empty",
                key: "",
                groupId: ""
            } ]
        },
        lock: null,
        picker: {
            open: !1,
            mode: null,
            side: null,
            slotIndex: null,
            sections: [],
            returnFocus: null
        },
        infoReturnFocus: null,
        simulationResult: null
    };
    function f(e) {
        return {
            category: e?.category || "empty",
            key: e?.key || "",
            groupId: e?.groupId || ""
        };
    }
    function p(e) {
        return String(e || "").trim().toLowerCase();
    }
    function h(e) {
        return e ? String(e.effect || (Array.isArray(e.effect_lines) ? e.effect_lines[0] : "") || "").trim() : "";
    }
    function y(e) {
        const t = Number(e);
        return 2 === t ? "green" : 3 === t ? "blue" : 4 === t ? "purple" : 5 === t ? "gold" : "unknown";
    }
    function g(e) {
        const t = Number(e);
        return 20 === t ? "icon_equipslot_mini_helmet" : 21 === t ? "icon_equipslot_mini_mask" : 22 === t ? "icon_equipslot_mini_mouth" : 23 === t ? "icon_equipslot_mini_body" : 24 === t ? "icon_equipslot_mini_cloak" : 25 === t ? "icon_equipslot_mini_shoes" : 26 === t ? "icon_equipslot_mini_suit" : 27 === t ? "icon_equipslot_mini_wing" : 28 === t ? "icon_equipslot_mini_accessory" : 29 === t ? "icon_equipslot_mini_weapon" : 30 === t ? "icon_equipslot_mini_shield" : null;
    }
    function C(e) {
        return Boolean(e && (1 === Number(e.quality_type) || e.has_mvp_source));
    }
    function k(e) {
        return Boolean(e && e.fixed_effect_immune_to_decay);
    }
    function E(e) {
        return e ? 1 + Math.max(0, Math.min(2, Number(e.words_count || 0))) : 0;
    }
    function b(e, t) {
        if (!e || !t) return !0;
        const n = Number(e.quality || 0), a = Number(t.quality || 0);
        return a <= n && a >= n - 1;
    }
    function x() {
        const e = $("main"), t = $("material");
        return !(!e || !t || R() || C(e) || C(t) || Number(e.quality || 0) !== Number(t.quality || 0));
    }
    function v(e) {
        const t = Number(e?.min_value || 0);
        return t + Number(e?.max_value || t);
    }
    function N(e, t) {
        const n = String(e?.display || "").trim();
        return n ? t && n.startsWith(t) && n.slice(t.length).trim() || n : "";
    }
    function _(e) {
        if (!e) return "";
        if (iconPathData && iconPathData[e]) {
            const t = String(iconPathData[e]).replace(/\\/g, "/");
            return t.startsWith("item/") ? `${l.iconBasePath}${t}`.replace(/\.png$/i, ".webp") : `${l.iconBasePath}${t}`;
        }
        return "";
    }
    function S(e) {
        return e ? _(e) || `${l.itemIconBase}${e}.webp` : "";
    }
    function w(e) {
        return S(e?.item_icon) || S(e?.mini_icon) || _(e?.mini_icon);
    }
    function T() {
        const e = document.getElementById("fusion-info-panel-known");
        e && (e.textContent = "", (Array.isArray(c?.sections) ? c.sections : []).forEach(t => {
            const n = document.createElement("section");
            if (n.className = "fusion-info-source", t.title) {
                const e = document.createElement("h4");
                e.className = "fusion-info-source-title", e.textContent = t.title, n.appendChild(e);
            }
            const a = document.createElement("ul");
            a.className = "fusion-info-source-list", (Array.isArray(t.items) ? t.items : []).forEach(e => {
                const t = document.createElement("li");
                t.textContent = e, a.appendChild(t);
            }), n.appendChild(a), e.appendChild(n);
        }));
    }
    function I() {
        const e = document.getElementById("fusion-info-panel-speculated");
        if (!e) return;
        e.textContent = "";
        const t = document.createElement("div");
        t.className = "fusion-speculated-sections";
        const n = document.createElement("section");
        if (n.className = "fusion-info-source", s?.introTitle) {
            const e = document.createElement("h4");
            e.className = "fusion-info-source-title", e.textContent = s.introTitle, n.appendChild(e);
        }
        const a = document.createElement("div");
        if (a.className = "fusion-info-copy", s?.decayNote) {
            const e = document.createElement("div");
            e.className = "fusion-decay-note";
            const [t, n] = String(s.decayNote).split("★");
            t && e.appendChild(document.createTextNode(t));
            const i = document.createElement("span");
            i.className = "fusion-decay-note-star", i.textContent = "★";
            const o = document.createElement("span");
            o.textContent = n || "", e.appendChild(i), t || n || (o.textContent = String(s.decayNote)), 
            n ? e.appendChild(o) : t || e.appendChild(o), a.appendChild(e);
        }
        if ((Array.isArray(s?.paragraphs) ? s.paragraphs : []).forEach(e => {
            const t = document.createElement("p");
            t.textContent = e, a.appendChild(t);
        }), s?.feedbackLine) {
            const e = document.createElement("div");
            e.className = "fusion-speculated-feedback", e.textContent = s.feedbackLine, a.appendChild(e);
        }
        n.appendChild(a), t.appendChild(n);
        const i = document.createElement("section");
        if (i.className = "fusion-info-source", s?.examplesTitle) {
            const e = document.createElement("h4");
            e.className = "fusion-info-source-title", e.textContent = s.examplesTitle, i.appendChild(e);
        }
        if (s?.examplesLead) {
            const e = document.createElement("p");
            e.className = "fusion-info-copy", e.textContent = s.examplesLead, i.appendChild(e);
        }
        if (s?.formulaTitle) {
            const e = document.createElement("h4");
            e.className = "fusion-weight-example-title", e.textContent = s.formulaTitle, i.appendChild(e);
        }
        if (s?.formulaCode) {
            const e = document.createElement("pre");
            e.className = "fusion-info-codeblock", e.textContent = s.formulaCode, i.appendChild(e);
        }
        const o = document.createElement("div");
        o.className = "fusion-weight-examples";
        const r = function() {
            const e = m.fixedOptionsByType ? Array.from(m.fixedOptionsByType.values()).flat().find(e => 12833019 === Number(e.source_card_id)) : null;
            return e ? L(s.fixedExampleTitle || "Primary sample", [ [ s.cardLabel || "Card", e.card_name || "-" ], [ s.effectLabel || "Effect", e.display || "-" ], [ s.fusionWeightLabel || "FusionWeight", B(e.weights) ] ]) : null;
        }(), c = function() {
            const e = [ 6011003, 6012003, 6013003 ].map(e => m.optionsByKey.get(`random:${e}`)).filter(Boolean);
            if (!e.length) return null;
            const t = [ s.randomGreenTitle || "Random sample (green cards)", s.randomBlueTitle || "Random sample (blue cards)", s.randomPurpleTitle || "Random sample (purple cards)" ], n = e.map((e, n) => L(t[n] || "Random sample", [ [ s.effectLabel || "Effect", e.display || "-" ], [ s.fusionWeightLabel || "FusionWeight", B(e.weights) ] ])), a = document.createElement("div");
            return a.className = "fusion-random-sample-group", n.forEach(e => a.appendChild(e)), 
            a;
        }();
        r && o.appendChild(r), c && o.appendChild(c), o.childNodes.length && (i.appendChild(o), 
        t.appendChild(i));
        const l = document.createElement("section");
        if (l.className = "fusion-info-source", s?.guaranteeTitle) {
            const e = document.createElement("h4");
            e.className = "fusion-info-source-title", e.textContent = s.guaranteeTitle, l.appendChild(e);
        }
        const d = document.createElement("div");
        if (d.className = "fusion-info-copy", s?.guaranteeLead) {
            const e = document.createElement("p");
            e.textContent = s.guaranteeLead, d.appendChild(e);
        }
        if (s?.guaranteeCode) {
            const e = document.createElement("pre");
            e.className = "fusion-info-codeblock", e.textContent = s.guaranteeCode, d.appendChild(e);
        }
        const u = Array.isArray(s?.guaranteeBullets) ? s.guaranteeBullets : [];
        if (u.length) {
            const e = document.createElement("ul");
            u.forEach(t => {
                const n = document.createElement("li");
                n.textContent = t, e.appendChild(n);
            }), d.appendChild(e);
        }
        l.appendChild(d), t.appendChild(l), e.appendChild(t);
    }
    function B(e) {
        return [ 0, 1, 2 ].map(t => function(e, t) {
            if (!e) return "-";
            const n = e[String(t)];
            return Number.isFinite(Number(n)) ? String(n) : "-";
        }(e, t)).join(" / ");
    }
    function L(e, t) {
        const n = document.createElement("section");
        n.className = "fusion-weight-example";
        const a = document.createElement("h4");
        a.className = "fusion-weight-example-title", a.textContent = e, n.appendChild(a);
        const i = document.createElement("div");
        return i.className = "fusion-sample-lines", t.forEach(([e, t]) => {
            const n = document.createElement("div");
            n.className = "fusion-sample-line";
            const a = document.createElement("span");
            a.className = "fusion-sample-key", a.textContent = `${e}:`;
            const o = document.createElement("span");
            o.className = "fusion-sample-value", o.textContent = t, n.appendChild(a), n.appendChild(o), 
            i.appendChild(n);
        }), n.appendChild(i), n;
    }
    function M(e) {
        const t = document.getElementById("fusion-info-tab-known"), n = document.getElementById("fusion-info-tab-speculated"), a = document.getElementById("fusion-info-panel-known"), i = document.getElementById("fusion-info-panel-speculated"), o = "speculated" !== e;
        t && (t.classList.toggle("active", o), t.setAttribute("aria-selected", o ? "true" : "false")), 
        n && (n.classList.toggle("active", !o), n.setAttribute("aria-selected", o ? "false" : "true")), 
        a && (a.hidden = !o, a.style.display = o ? "grid" : "none"), i && (i.hidden = o, 
        i.style.display = o ? "none" : "grid");
    }
    function $(e) {
        return m.selected[e] && m.cardsById.get(Number(m.selected[e])) || null;
    }
    function G(e) {
        return e?.key && m.optionsByKey.get(String(e.key)) || null;
    }
    function A(e) {
        return e?.groupId && m.randomGroupById.get(String(e.groupId)) || null;
    }
    function O(e, t, n) {
        return {
            category: e,
            groupId: t,
            key: n
        };
    }
    function W(e, t) {
        return {
            category: e,
            groupId: "",
            key: t
        };
    }
    function F(e, t) {
        const n = new Map;
        t.forEach(t => {
            const a = m.optionsByKey.get(String(t));
            if (!a) return;
            const i = function(e) {
                const t = String(e || "").trim();
                return t.replace(/\s+[+\-−]?\d[\d.,%~]*.*$/, "").trim() || t;
            }(a.display), o = null != a.attr_id ? `attr:${a.attr_id}` : `text:${p(i)}`, r = `${e}:${o}`;
            let c = n.get(o);
            c || (c = {
                id: r,
                seed: o,
                label: i,
                levels: [],
                _seenDisplays: new Set,
                searchText: ""
            }, n.set(o, c));
            const s = `${p(a.display)}:${JSON.stringify(a.weights || {})}`;
            c._seenDisplays.has(s) || (c._seenDisplays.add(s), c.levels.push({
                key: String(a.key),
                display: String(a.display || ""),
                label: N(a, i),
                sortValue: v(a)
            }));
        });
        const a = Array.from(n.values()).map(e => {
            e.levels.sort((e, t) => e.sortValue - t.sortValue || e.label.localeCompare(t.label));
            const t = e.levels.reduce((e, t) => (e.set(t.label, (e.get(t.label) || 0) + 1), 
            e), new Map);
            return e.levels.forEach(e => {
                if ((t.get(e.label) || 0) <= 1) return;
                const n = m.optionsByKey.get(String(e.key)), a = n?.weights?.[0];
                null != a && (e.label = `${e.label} (${r("weight")}: ${a})`);
            }), e.searchText = `${e.label} ${e.levels.map(e => e.display).join(" ")}`.toLowerCase(), 
            delete e._seenDisplays, m.randomGroupById.set(e.id, e), e;
        });
        return a.sort((e, t) => e.label.localeCompare(t.label)), a;
    }
    function q(e) {
        return e?.card_type_id && m.randomGroupsByType.get(String(e.card_type_id)) || [];
    }
    function D(e, t) {
        t && !P(e, m.cardsById.get(Number(t)) || null) || (j(), m.selected[e] = t ? Number(t) : null, 
        t ? function(e) {
            const t = $(e);
            if (!t) return void (m.slots[e] = [ {
                category: "empty",
                key: "",
                groupId: ""
            }, {
                category: "empty",
                key: "",
                groupId: ""
            }, {
                category: "empty",
                key: "",
                groupId: ""
            } ]);
            const n = [ {
                category: "empty",
                key: "",
                groupId: ""
            }, {
                category: "empty",
                key: "",
                groupId: ""
            }, {
                category: "empty",
                key: "",
                groupId: ""
            } ];
            let a = 0;
            t.native_fixed_key && (n[a] = W("fixed", String(t.native_fixed_key)), a += 1);
            const i = Math.max(0, Math.min(2, Number(t.words_count || 0))), o = function(e) {
                return e?.native_random_library_id && m.randomGroupsByLibrary.get(String(e.native_random_library_id)) || [];
            }(t);
            (function(e, t) {
                const n = e.slice(), a = [];
                for (;n.length && a.length < t; ) {
                    const e = Math.floor(Math.random() * n.length);
                    a.push(n.splice(e, 1)[0]);
                }
                return a;
            })(o, i).forEach(e => {
                if (a >= n.length) return;
                const i = function(e, t) {
                    return e && t && q(e).find(e => e.seed === t) || null;
                }(t, e.seed) || e, o = (r = e.levels)[Math.floor(Math.random() * r.length)];
                var r;
                n[a] = O("random", i.id, o.key), a += 1;
            }), m.slots[e] = n;
        }(e) : m.slots[e] = [ {
            category: "empty",
            key: "",
            groupId: ""
        }, {
            category: "empty",
            key: "",
            groupId: ""
        }, {
            category: "empty",
            key: "",
            groupId: ""
        } ], m.lock && ($(m.lock.side) || (m.lock = null)), m.lock && !x() && (m.lock = null), 
        m.lock && !function(e, t) {
            const n = m.slots[e][t];
            return Boolean(G(n));
        }(m.lock.side, m.lock.slotIndex) && (m.lock = null), oe());
    }
    function R() {
        const e = $("main"), t = $("material");
        return !(!e || !t) && String(e.card_type_id) !== String(t.card_type_id);
    }
    function U() {
        const e = [], t = $("main"), n = $("material");
        return t || n ? ((t && C(t) || n && C(n)) && e.push(r("mvpBlocked")), R() && e.push(r("cardsMismatch")), 
        t && n && !b(t, n) && e.push(r("materialQualityMismatch")), e) : e;
    }
    function P(e, t) {
        if (!t || C(t)) return !1;
        const n = $("main" === e ? "material" : "main");
        return !n || !C(n) && String(t.card_type_id) === String(n.card_type_id) && ("material" === e ? b($("main"), t) : b(t, $("material")));
    }
    function z() {
        const e = $("main");
        if (e) return E(e);
        const t = $("material");
        return t ? E(t) : 0;
    }
    function j() {
        m.simulationResult = null;
    }
    function K(e, t) {
        if (!e) return null;
        const n = String(t), a = e?.weights?.[n];
        return "number" == typeof a ? a : null;
    }
    function V(e) {
        const t = m.slots.main[e], n = m.slots.material[e], a = G(t), i = G(n), o = m.lock && m.lock.slotIndex === e ? m.lock.side : null, r = K(a, e), c = K(i, e), s = Boolean(a && i && String(a.display) === String(i.display));
        if ("main" === o) return {
            mainOption: a,
            materialOption: i,
            mainWeight: r,
            materialWeight: c,
            mainChance: 1,
            materialChance: 0,
            sameEffect: s,
            forcedSide: o
        };
        if ("material" === o) return {
            mainOption: a,
            materialOption: i,
            mainWeight: r,
            materialWeight: c,
            mainChance: 0,
            materialChance: 1,
            sameEffect: s,
            forcedSide: o
        };
        if (!a && !i) return {
            mainOption: a,
            materialOption: i,
            mainWeight: r,
            materialWeight: c,
            mainChance: null,
            materialChance: null,
            sameEffect: !1,
            forcedSide: null
        };
        if (a && !i) return {
            mainOption: a,
            materialOption: i,
            mainWeight: r,
            materialWeight: c,
            mainChance: 1,
            materialChance: 0,
            sameEffect: !1,
            forcedSide: null
        };
        if (!a && i) return {
            mainOption: a,
            materialOption: i,
            mainWeight: r,
            materialWeight: c,
            mainChance: 0,
            materialChance: 1,
            sameEffect: !1,
            forcedSide: null
        };
        if (s) return {
            mainOption: a,
            materialOption: i,
            mainWeight: r,
            materialWeight: c,
            mainChance: 1,
            materialChance: 1,
            sameEffect: !0,
            forcedSide: null
        };
        if ("number" == typeof r && r > 0 && "number" == typeof c && c > 0) {
            const e = r + c;
            return {
                mainOption: a,
                materialOption: i,
                mainWeight: r,
                materialWeight: c,
                mainChance: r / e,
                materialChance: c / e,
                sameEffect: !1,
                forcedSide: null
            };
        }
        return {
            mainOption: a,
            materialOption: i,
            mainWeight: r,
            materialWeight: c,
            mainChance: .5,
            materialChance: .5,
            sameEffect: !1,
            forcedSide: null
        };
    }
    function H(e) {
        return e.mainOption || e.materialOption ? e.sameEffect ? e.mainOption || e.materialOption : e.mainOption && !e.materialOption ? e.mainOption : !e.mainOption && e.materialOption ? e.materialOption : Math.random() < Number(e.mainChance || 0) ? e.mainOption : e.materialOption : null;
    }
    function Q(e, t) {
        if (!t) return [];
        const n = function(e, t) {
            const n = String(t?.decay_group || "");
            if (!n || "0" === n || !m.decayGroups.has(n)) return 1;
            let a = 0;
            return e.forEach(e => {
                String(e?.decay_group || "") === n && (a += 1);
            }), Math.max(1, Math.min(3, a || 1));
        }(e, t), a = t.line_variants || {}, i = a?.[String(n)];
        return Array.isArray(i) && i.length ? i.map(e => String(e || "").trim()).filter(Boolean) : function(e) {
            if (!e) return [];
            if (Array.isArray(e.lines) && e.lines.length) return e.lines.map(e => String(e || "").trim()).filter(Boolean);
            const t = String(e.display || "").trim();
            return t ? [ t ] : [];
        }(t);
    }
    function J() {
        const e = $("main"), t = $("material");
        if (!e || !t) return;
        if (U().length > 0) return;
        const n = z(), a = [];
        for (let e = 0; e < n; e += 1) {
            const t = H(V(e));
            t && a.push({
                slotIndex: e,
                option: t
            });
        }
        const i = a.map(({slotIndex: e, option: t}) => ({
            slotIndex: e,
            lines: Q(a.map(e => e.option), t)
        }));
        m.simulationResult = {
            quality: e.quality,
            name: e.name || `#${e.id}`,
            icon: w(e),
            effects: i
        }, oe();
    }
    function Y(e, t, n) {
        const a = m.slots[e][t], i = "main" === e ? n.mainOption : n.materialOption, o = "main" === e ? n.mainWeight : n.materialWeight, c = !i || !x(), s = !i || U().length > 0, l = document.createElement("div");
        l.className = "fusion-slot-side";
        const d = document.createElement("div");
        d.className = "fusion-effect-row", d.appendChild(function(e, t, n) {
            const a = m.lock && m.lock.side === e && m.lock.slotIndex === t, i = document.createElement("button");
            return i.type = "button", i.className = "fusion-lock-btn" + (a ? " is-selected" : ""), 
            i.textContent = a ? "✓" : r("lock"), i.title = r(a ? "unlock" : "lock"), i.disabled = n, 
            i.addEventListener("click", () => function(e, t) {
                x() && (j(), m.lock && m.lock.side === e && m.lock.slotIndex === t ? m.lock = null : m.lock = {
                    side: e,
                    slotIndex: t
                }, oe());
            }(e, t)), i;
        }(e, t, c)), d.appendChild(function(e, t, n) {
            const a = document.createElement("button");
            a.type = "button", a.className = "fusion-effect-picker", a.addEventListener("click", () => function(e, t) {
                te("effect", e, t);
            }(e, t));
            const i = G(n), o = A(n);
            if (!i) {
                a.classList.add("is-empty"), $(e) || (a.disabled = !0);
                const t = document.createElement("div");
                t.className = "fusion-effect-picker-copy";
                const n = document.createElement("div");
                n.className = "fusion-effect-picker-title", n.textContent = $(e) ? r("chooseEffect") : "-", 
                t.appendChild(n), a.appendChild(t);
                const i = document.createElement("span");
                return i.className = "fusion-picker-caret", a.appendChild(i), a;
            }
            if ("fixed" === i.source_kind) {
                const e = document.createElement("img");
                e.className = "fusion-effect-picker-art", e.alt = "", e.loading = "lazy", e.decoding = "async", 
                e.src = w(i), a.appendChild(e);
            }
            const c = document.createElement("div");
            c.className = "fusion-effect-picker-copy";
            const s = document.createElement("div");
            s.className = "fusion-effect-picker-title", s.textContent = "fixed" === i.source_kind ? i.card_name || i.display || "" : o?.label || i.display || "", 
            c.appendChild(s);
            const l = document.createElement("div");
            var d;
            l.className = "fusion-effect-picker-subtitle", "fixed" === i.source_kind ? l.textContent = i.display || r("fixedEffectSubtitle") : l.textContent = i.display || (d = n.category, 
            r("fixed" === d ? "fixedEffects" : "random" === d ? "randomEffects" : "emptySlot")), 
            c.appendChild(l), a.appendChild(c);
            const u = document.createElement("span");
            return u.className = "fusion-picker-caret", a.appendChild(u), a;
        }(e, t, a)), d.appendChild(function(e, t, n) {
            const a = document.createElement("div");
            if (a.className = "fusion-move-buttons", t > 0) {
                const i = document.createElement("button");
                i.type = "button", i.className = "fusion-move-btn", i.textContent = "↑", i.title = r("moveUp"), 
                i.setAttribute("aria-label", r("moveUp")), i.disabled = n, i.addEventListener("click", () => X(e, t, t - 1)), 
                a.appendChild(i);
            }
            if (t < 2) {
                const i = document.createElement("button");
                i.type = "button", i.className = "fusion-move-btn", i.textContent = "↓", i.title = r("moveDown"), 
                i.setAttribute("aria-label", r("moveDown")), i.disabled = n, i.addEventListener("click", () => X(e, t, t + 1)), 
                a.appendChild(i);
            }
            return a;
        }(e, t, s)), l.appendChild(d);
        const u = document.createElement("div");
        u.className = "fusion-slot-controls", u.appendChild(function(e, t, n) {
            const a = document.createElement("div");
            a.className = "fusion-level-buttons";
            const i = G(n);
            if (!i || "random" !== i.source_kind) return a.hidden = !0, a;
            const o = function(e) {
                const t = A(e);
                return t ? t.levels : [];
            }(n);
            return o.length <= 1 ? (a.hidden = !0, a) : (o.forEach((i, o) => {
                const c = document.createElement("button");
                c.type = "button";
                const s = y(o + 2);
                c.className = `fusion-level-btn fusion-level-btn--${s}${String(i.key) === String(n.key) ? " is-selected" : ""}`, 
                c.textContent = r("levelShort", {
                    level: o + 1
                }), c.title = i.display || i.label || c.textContent, c.addEventListener("click", () => {
                    j(), m.slots[e][t].key = i.key, oe();
                }), a.appendChild(c);
            }), a);
        }(e, t, a)), l.appendChild(u);
        const f = document.createElement("div");
        if (f.className = "fusion-slot-meta", i) {
            const t = document.createElement("span");
            t.className = "fusion-meta-pill fusion-meta-pill--weight", t.textContent = `${r("weight")}: ${null == o ? "-" : o}`, 
            f.appendChild(t);
            const a = document.createElement("span");
            a.className = "fusion-meta-pill fusion-meta-pill--chance";
            const i = "main" === e ? n.mainChance : n.materialChance;
            a.textContent = `${r("chance")}: ${function(e) {
                if (null == e || Number.isNaN(e)) return "-";
                const t = 100 * e;
                return t >= 99.995 ? "100%" : t >= 10 ? `${t.toFixed(1).replace(/\.0$/, "")}%` : t >= 1 ? `${t.toFixed(2).replace(/0+$/, "").replace(/\.$/, "")}%` : `${t.toFixed(3).replace(/0+$/, "").replace(/\.$/, "")}%`;
            }(i)}`, f.appendChild(a);
        }
        return f.childNodes.length && l.appendChild(f), l;
    }
    function X(e, t, n) {
        if (n < 0 || n >= 3 || t === n) return;
        j();
        const a = m.slots[e].map(f), i = a[t];
        a[t] = a[n], a[n] = i, m.slots[e] = a, m.lock && m.lock.side === e && (m.lock.slotIndex === t ? m.lock.slotIndex = n : m.lock.slotIndex === n && (m.lock.slotIndex = t)), 
        oe();
    }
    function Z(e, t) {
        const n = $(e);
        if (!n) return [];
        const a = [], i = m.slots[e][t], o = function(e) {
            return e?.card_type_id && m.fixedOptionsByType.get(String(e.card_type_id)) || [];
        }(n).filter(e => !C(e)).slice().sort((e, t) => String(e.key) === String(n.native_fixed_key) ? -1 : String(t.key) === String(n.native_fixed_key) ? 1 : String(e.card_name || "").localeCompare(String(t.card_name || "")));
        o.length && a.push({
            title: r("fixedEffects"),
            items: o.map(n => ({
                id: `fixed:${n.key}`,
                title: n.card_name || n.display,
                subtitle: n.display || r("fixedEffectSubtitle"),
                icon: w(n),
                selected: String(i.key) === String(n.key),
                rarityClass: `rarity-${y(n.quality)}`,
                searchText: `${n.card_name || ""} ${n.display || ""}`.toLowerCase(),
                onSelect: () => {
                    j(), m.slots[e][t] = W("fixed", String(n.key)), oe(), ne();
                }
            }))
        });
        const c = q(n);
        return c.length && a.push({
            title: r("randomEffects"),
            items: c.map(a => {
                const o = function(e, t, n) {
                    if (!t?.levels?.length) return null;
                    if (n?.groupId === t.id) {
                        const e = t.levels.find(e => String(e.key) === String(n.key));
                        if (e) return e;
                    }
                    return function(e, t) {
                        if (!e || !t) return null;
                        const n = Number(e.native_random_library_id || 0);
                        return t.levels.find(e => {
                            const t = m.optionsByKey.get(String(e.key));
                            return t && Number(t.library_id) === n;
                        }) || null;
                    }(e, t) || t.levels[0];
                }(n, a, i) || a.levels[0], c = function(e, t) {
                    if (!e?.levels?.length) return 1;
                    const n = e.levels.findIndex(e => String(e.key) === String(t));
                    return n >= 0 ? n + 1 : 1;
                }(a, o?.key);
                return {
                    id: `group:${a.id}`,
                    title: a.label,
                    subtitle: o ? `${r("levelShort", {
                        level: c
                    })} · ${o.display || o.label}` : "",
                    icon: "",
                    selected: i.groupId === a.id,
                    searchText: `${a.searchText} ${o?.display || ""} ${o?.label || ""}`.toLowerCase(),
                    onSelect: () => {
                        o && (j(), m.slots[e][t] = O("random", a.id, o.key), oe(), ne());
                    }
                };
            })
        }), a;
    }
    function ee() {
        const e = document.getElementById("fusion-picker-list"), t = document.getElementById("fusion-picker-search");
        if (!e || !t) return;
        const n = p(t.value), a = m.picker.sections.map(e => ({
            title: e.title,
            items: e.items.filter(e => !n || e.searchText.includes(n))
        })).filter(e => e.items.length);
        if (e.textContent = "", !a.length) {
            const t = document.createElement("div");
            return t.className = "fusion-picker-empty", t.textContent = r("noResults"), void e.appendChild(t);
        }
        a.forEach(t => {
            const n = document.createElement("div");
            if (n.className = "fusion-picker-section", t.title) {
                const e = document.createElement("div");
                e.className = "fusion-picker-section-title", e.textContent = t.title, n.appendChild(e);
            }
            t.items.forEach(e => {
                const t = document.createElement("button");
                if (t.type = "button", t.className = `fusion-picker-option${e.rarityClass ? ` ${e.rarityClass}` : ""}${e.selected ? " is-selected" : ""}${e.disabled ? " is-disabled" : ""}`, 
                t.disabled = Boolean(e.disabled), e.disabled || t.addEventListener("click", e.onSelect), 
                e.icon) {
                    const n = document.createElement("img");
                    n.className = "fusion-picker-option-art", n.alt = "", n.loading = "lazy", n.decoding = "async", 
                    n.src = e.icon, t.appendChild(n);
                }
                if (e.prefixIcon) {
                    const n = document.createElement("img");
                    n.className = "fusion-picker-option-prefix-icon", n.alt = e.prefixIconAlt || "", 
                    n.loading = "lazy", n.decoding = "async", n.src = e.prefixIcon, t.appendChild(n);
                }
                const a = document.createElement("div");
                a.className = "fusion-picker-option-copy";
                const i = document.createElement("div");
                if (i.className = "fusion-picker-option-title", i.textContent = e.title, a.appendChild(i), 
                e.subtitle) {
                    const t = document.createElement("div");
                    t.className = "fusion-picker-option-subtitle", t.textContent = e.subtitle, a.appendChild(t);
                }
                if (t.appendChild(a), e.noDecay) {
                    const e = document.createElement("span");
                    e.className = "fusion-picker-option-badge", e.textContent = r("noDecayBadge"), e.title = r("noDecayTitle"), 
                    e.setAttribute("aria-label", r("noDecayTitle")), t.appendChild(e);
                }
                n.appendChild(t);
            }), e.appendChild(n);
        });
    }
    function te(e, t, n = null) {
        const a = document.getElementById("fusion-picker-modal"), i = document.getElementById("fusion-picker-title"), o = document.getElementById("fusion-picker-search");
        a && i && o && (m.picker.open = !0, m.picker.mode = e, m.picker.side = t, m.picker.slotIndex = n, 
        m.picker.sections = "card" === e ? function(e) {
            const t = $("main" === e ? "material" : "main"), n = null == t?.card_type_id ? null : String(t.card_type_id), a = (t, n = !1) => ({
                id: `card:${t.id}`,
                title: t.name || `#${t.id}`,
                subtitle: h(t) || `${r("cardType")}: ${t.card_type_name || "-"}`,
                icon: w(t),
                prefixIcon: g(t.card_type_id) ? `${l.equipSlotIconBase}${g(t.card_type_id)}.webp` : "",
                prefixIconAlt: t.card_type_name || "",
                selected: Number(m.selected[e]) === Number(t.id),
                disabled: n,
                noDecay: k(t),
                rarityClass: `rarity-${y(t.quality)}`,
                searchText: `${t.name || ""} ${t.id} ${t.card_type_name || ""} ${h(t)}`.toLowerCase(),
                onSelect: () => {
                    n || (D(e, t.id), ne());
                }
            });
            if (!n) {
                const t = m.cards.filter(e => !C(e));
                return [ {
                    title: "",
                    items: t.filter(t => P(e, t)).map(e => a(e))
                }, {
                    title: r("otherCardTypes"),
                    items: t.filter(t => !P(e, t)).map(e => a(e, !0))
                } ].filter(e => e.items.length);
            }
            const i = [], o = [];
            return m.cards.forEach(t => {
                C(t) || (String(t.card_type_id) === n && P(e, t) ? i.push(a(t)) : o.push(a(t, !0)));
            }), [ {
                title: "",
                items: i
            }, {
                title: r("otherCardTypes"),
                items: o
            } ].filter(e => e.items.length);
        }(t) : Z(t, n), m.picker.returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null, 
        i.textContent = r("card" === e ? "pickerSelectCard" : "pickerSelectEffect"), o.value = "", 
        o.placeholder = r("card" === e ? "searchCards" : "searchEffects"), a.hidden = !1, 
        a.inert = !1, a.classList.add("open"), ee(), window.requestAnimationFrame(() => o.focus()));
    }
    function ne() {
        const e = document.getElementById("fusion-picker-modal"), t = m.picker.returnFocus instanceof HTMLElement ? m.picker.returnFocus : null;
        e && (e.contains(document.activeElement) && t && t.isConnected && t.focus(), e.classList.remove("open"), 
        e.inert = !0, e.hidden = !0), m.picker.open = !1, m.picker.mode = null, m.picker.side = null, 
        m.picker.slotIndex = null, m.picker.sections = [], m.picker.returnFocus = null;
    }
    function ae() {
        const e = document.getElementById("fusion-info-modal");
        if (!e) return;
        m.infoReturnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null, 
        e.hidden = !1, e.inert = !1, e.setAttribute("aria-hidden", "false"), e.classList.add("open");
        const t = document.getElementById("fusion-info-close");
        t && window.requestAnimationFrame(() => t.focus());
    }
    function ie() {
        const e = document.getElementById("fusion-info-modal");
        if (!e) return;
        const t = m.infoReturnFocus instanceof HTMLElement ? m.infoReturnFocus : null;
        e.contains(document.activeElement) && t && t.isConnected && t.focus(), e.classList.remove("open"), 
        e.inert = !0, e.setAttribute("aria-hidden", "true"), e.hidden = !0, m.infoReturnFocus = null;
    }
    function oe() {
        [ "main", "material" ].forEach(e => {
            const t = document.getElementById(`${e}-card-picker`);
            if (!t) return;
            const n = $(e);
            t.classList.toggle("is-empty", !n), t.classList.remove("rarity-green", "rarity-blue", "rarity-purple", "rarity-gold"), 
            n && t.classList.add(`rarity-${y(n.quality)}`), t.textContent = "", t.appendChild(function(e) {
                const t = document.createDocumentFragment();
                if (!e) {
                    const e = document.createElement("div");
                    e.className = "fusion-card-picker-copy";
                    const n = document.createElement("div");
                    n.className = "fusion-card-picker-title", n.textContent = r("selectCard"), e.appendChild(n), 
                    t.appendChild(e);
                    const a = document.createElement("span");
                    return a.className = "fusion-picker-caret", t.appendChild(a), t;
                }
                const n = g(e.card_type_id);
                if (n) {
                    const a = document.createElement("img");
                    a.className = "fusion-card-slot-icon", a.alt = e.card_type_name || "", a.loading = "lazy", 
                    a.decoding = "async", a.src = `${l.equipSlotIconBase}${n}.webp`, t.appendChild(a);
                }
                const a = document.createElement("img");
                a.className = "fusion-card-picker-art", a.alt = "", a.loading = "lazy", a.decoding = "async", 
                a.src = w(e), t.appendChild(a);
                const i = document.createElement("div");
                i.className = "fusion-card-picker-copy";
                const o = document.createElement("div");
                o.className = "fusion-card-picker-title", o.textContent = e.name || `#${e.id}`, 
                i.appendChild(o);
                const c = document.createElement("div");
                if (c.className = "fusion-card-picker-subtitle", c.textContent = h(e) || `${r("cardType")}: ${e.card_type_name || "-"}`, 
                i.appendChild(c), t.appendChild(i), k(e)) {
                    const e = document.createElement("span");
                    e.className = "fusion-card-special-badge", e.textContent = r("noDecayBadge"), e.title = r("noDecayTitle"), 
                    e.setAttribute("aria-label", r("noDecayTitle")), t.appendChild(e);
                }
                const s = document.createElement("span");
                s.className = "fusion-picker-caret", t.appendChild(s);
                const d = document.createElement("span");
                return d.className = "fusion-card-clear", d.textContent = "x", d.title = r("clearCard"), 
                d.setAttribute("role", "button"), d.setAttribute("aria-label", r("clearCard")), 
                t.appendChild(d), t;
            }(n));
        }), function() {
            const e = document.getElementById("fusion-slot-rows"), t = document.getElementById("fusion-warning");
            if (!e || !t) return;
            const n = U();
            if (t.hidden = 0 === n.length, t.textContent = n.join(" "), e.textContent = "", 
            !$("main") && !$("material")) return;
            const a = z();
            for (let t = 0; t < a; t += 1) {
                const n = V(t), a = document.createElement("div");
                a.className = "fusion-slot-row";
                const i = document.createElement("div");
                i.className = "fusion-slot-index", i.textContent = String(t + 1), a.appendChild(i), 
                a.appendChild(Y("main", t, n)), a.appendChild(Y("material", t, n)), e.appendChild(a);
            }
        }(), function() {
            const e = document.getElementById("fusion-simulate-area"), t = document.getElementById("fusion-simulate-btn"), n = document.getElementById("fusion-result");
            if (!e || !t || !n) return;
            const a = $("main"), i = $("material"), o = U(), r = Boolean(a || i), c = Boolean(a && i && 0 === o.length);
            if (e.hidden = !r, t.disabled = !c, n.textContent = "", !m.simulationResult) return;
            const s = document.createElement("article");
            s.className = `fusion-result-card rarity-${y(m.simulationResult.quality)}`;
            const l = document.createElement("div");
            l.className = "fusion-result-icon-wrap";
            const d = document.createElement("img");
            d.className = "fusion-result-icon", d.alt = "", d.loading = "lazy", d.decoding = "async", 
            d.src = m.simulationResult.icon, l.appendChild(d), s.appendChild(l);
            const u = document.createElement("div");
            u.className = "fusion-result-body";
            const f = document.createElement("div");
            f.className = "fusion-result-title", f.textContent = m.simulationResult.name, u.appendChild(f), 
            m.simulationResult.effects.forEach(e => {
                (Array.isArray(e.lines) ? e.lines : []).forEach(e => {
                    if (!e) return;
                    const t = document.createElement("div");
                    t.className = "fusion-result-effect", t.textContent = e, u.appendChild(t);
                });
            }), s.appendChild(u), n.appendChild(s);
        }();
    }
    async function re() {
        !function() {
            const e = "true" === document.body?.dataset?.fusionEmbedded;
            e || (window.RO_SET_PAGE_TITLE ? window.RO_SET_PAGE_TITLE(r("pageTitle")) : document.title = `RO仙境傳說：世界之旅 | ${r("pageTitle")}`);
            const t = [ [ "main-side-label", r("mainCard") ], [ "material-side-label", r("materialCard") ] ];
            e || t.unshift([ "page-header-title", r("pageTitle") ]), t.forEach(([e, t]) => {
                const n = document.getElementById(e);
                n && (n.textContent = t);
            });
            const n = document.getElementById("fusion-info-btn-label"), a = document.getElementById("fusion-disclaimer-banner"), i = document.getElementById("fusion-info-title"), o = document.getElementById("fusion-info-tab-known"), c = document.getElementById("fusion-info-tab-speculated");
            n && (n.textContent = r("infoButton")), a && (a.textContent = r("disclaimer")), 
            i && (i.textContent = r("infoTitle")), o && (o.textContent = r("knownTab")), c && (c.textContent = r("speculatedTab")), 
            T(), I(), M("known");
        }(), await async function() {
            if (iconPathData) return iconPathData;
            if (iconPathPromise) return iconPathPromise;
            const e = d(l.iconPathsUrl), t = window.__RO_SHARED_JSON_CACHE || (window.__RO_SHARED_JSON_CACHE = Object.create(null));
            if (t[e]?.data) return iconPathData = t[e].data, iconPathData;
            if (t[e]?.promise) return iconPathPromise = t[e].promise.then(e => (iconPathData = e || {}, iconPathData)).catch(e => {
                throw iconPathPromise = null, e;
            }), iconPathPromise;
            const n = (async () => {
                const t = await fetch(e);
                if (!t || !t.ok) throw new Error(`Failed to load icon paths (${t?.status || "no response"})`);
                const n = await t.json();
                return (window.__RO_SHARED_JSON_CACHE || (window.__RO_SHARED_JSON_CACHE = Object.create(null)))[e] = {
                    data: n || {}
                }, (window.__RO_SHARED_JSON_CACHE || (window.__RO_SHARED_JSON_CACHE = Object.create(null)))[e].data;
            })().catch(n => {
                const a = window.__RO_SHARED_JSON_CACHE || (window.__RO_SHARED_JSON_CACHE = Object.create(null));
                return delete a[e], Promise.reject(n);
            });
            return t[e] = {
                promise: n
            }, iconPathPromise = n.then(e => (iconPathData = e || {}, iconPathData)).catch(e => {
                throw iconPathPromise = null, e;
            }), iconPathPromise;
        }(), document.querySelectorAll("img[data-icon-name]").forEach(e => {
            const t = _(e.getAttribute("data-icon-name"));
            t && (e.src = t);
        }), function(e) {
            const t = Array.isArray(e?.cards) ? e.cards.slice() : [], n = Array.isArray(e?.fixed_options) ? e.fixed_options.slice() : [], a = Array.isArray(e?.random_options) ? e.random_options.slice() : [];
            var i;
            m.cards = t.sort((e, t) => String(e.name || "").localeCompare(String(t.name || ""))), 
            m.cardsById = new Map(t.map(e => [ Number(e.id), e ])), m.optionsByKey = new Map, 
            n.forEach(e => m.optionsByKey.set(String(e.key), e)), a.forEach(e => m.optionsByKey.set(String(e.key), e)), 
            i = e?.pools || {}, m.randomGroupById = new Map, m.randomGroupsByLibrary = new Map, 
            m.randomGroupsByType = new Map, Object.entries(i.library_random_keys || {}).forEach(([e, t]) => {
                const n = F(`library:${e}`, Array.isArray(t) ? t : []);
                m.randomGroupsByLibrary.set(String(e), n);
            }), Object.entries(i.card_type_random_keys || {}).forEach(([e, t]) => {
                const n = F(`type:${e}`, Array.isArray(t) ? t : []);
                m.randomGroupsByType.set(String(e), n);
            }), function(e) {
                m.fixedOptionsByType = new Map, Object.entries(e.card_type_fixed_keys || {}).forEach(([e, t]) => {
                    const n = [], a = new Set;
                    (Array.isArray(t) ? t : []).forEach(e => {
                        const t = m.optionsByKey.get(String(e));
                        if (!t) return;
                        const i = String(t.key);
                        a.has(i) || (a.add(i), n.push(t));
                    }), n.sort((e, t) => String(e.card_name || "").localeCompare(String(t.card_name || ""))), 
                    m.fixedOptionsByType.set(String(e), n);
                });
            }(e?.pools || {}), m.decayGroups = new Map(Object.entries(e?.decay_groups || {}).map(([e, t]) => [ String(e), t || {} ]));
        }(await async function() {
            let e = await fetch(d(l.dataUrl));
            if (e && e.ok || "zh-TW" === t || (e = await fetch(d("/sea/card-simulator/data/card_fusion_simulator_zh-TW.json"))), 
            !e.ok) throw new Error(`Failed to load fusion simulator data (${e.status})`);
            return e.json();
        }()), T(), I(), M("known"), function() {
            const e = document.getElementById("main-card-picker"), t = document.getElementById("material-card-picker"), n = document.getElementById("fusion-simulate-btn"), a = document.getElementById("fusion-picker-search"), i = document.getElementById("fusion-picker-close"), o = document.getElementById("fusion-picker-modal"), r = document.getElementById("fusion-info-btn"), c = document.getElementById("fusion-info-close"), s = document.getElementById("fusion-info-modal"), l = document.getElementById("fusion-info-tab-known"), d = document.getElementById("fusion-info-tab-speculated");
            e && e.addEventListener("click", e => {
                if (e.target.closest(".fusion-card-clear")) return e.stopPropagation(), void D("main", null);
                te("card", "main");
            }), t && t.addEventListener("click", e => {
                if (e.target.closest(".fusion-card-clear")) return e.stopPropagation(), void D("material", null);
                te("card", "material");
            }), n && n.addEventListener("click", J), a && a.addEventListener("input", ee), i && i.addEventListener("click", ne), 
            o && o.addEventListener("click", e => {
                e.target.closest('[data-fusion-close="backdrop"]') && ne();
            }), r && r.addEventListener("click", ae), c && c.addEventListener("click", ie), 
            l && l.addEventListener("click", () => M("known")), d && d.addEventListener("click", () => M("speculated")), 
            s && s.addEventListener("click", e => {
                e.target.closest('[data-fusion-info-close="backdrop"]') && ie();
            }), document.addEventListener("keydown", e => {
                "Escape" === e.key && (m.picker.open ? ne() : s && !s.hidden && ie());
            });
        }(), oe();
    }
    "loading" === document.readyState ? document.addEventListener("DOMContentLoaded", () => {
        re().catch(e => console.error(e));
    }) : re().catch(e => console.error(e));
})();
