(function() {
    const SUPPORTED_LOCALES = [ "zh-TW", "en-US", "zh-CN", "th-TH", "id-ID" ];
    const DAY_MS = 24 * 60 * 60 * 1000;
    const HOUR_MS = 60 * 60 * 1000;
    const MINUTE_MS = 60 * 1000;
    const STORAGE_KEYS = {
        localTime: "ro_events_show_local_time",
        hideAllDay: "ro_events_hide_all_day"
    };
    const IS_SEA = /^\/sea(?:\/|$)/.test(window.location.pathname);
    const MOBILE_BREAKPOINT = 760;
    const ACTIVITY_DAY_RESET_HOUR = 5;
    const STRINGS = {
        "en-US": {
            headerTitle: "Events",
            weekly: "Weekly",
            calendar: "Calendar",
            showLocalTime: "Show local time",
            allDay: "All Day",
            noEvents: "No events for this day.",
            noCalendarEvents: "No date-specific events available.",
            hideAllDay: "Hide all-day events",
            unlockRequirement: "Unlock Requirement",
            eventSeries: "Event Series",
            rewards: "Rewards",
            close: "Close",
            loading: "Loading events...",
            loadFailed: "Failed to load event data.",
            untitled: "Untitled Event",
            weekend: "Weekend",
            currentDay: "Today",
            serverTimeWithZone: timezone => `Server time: ${timezone}`,
            localTimeWithZone: timezone => `Local time: ${timezone}`
        },
        "zh-TW": {
            headerTitle: "\u6d3b\u52d5",
            weekly: "\u6bcf\u9031",
            calendar: "\u6a94\u671f",
            showLocalTime: "\u986f\u793a\u7576\u5730\u6642\u9593",
            allDay: "\u5168\u5929\u958b\u653e",
            noEvents: "\u9019\u5929\u6c92\u6709\u6d3b\u52d5\u3002",
            noCalendarEvents: "\u76ee\u524d\u6c92\u6709\u6a94\u671f\u6d3b\u52d5\u3002",
            hideAllDay: "\u96b1\u85cf\u5168\u5929\u6d3b\u52d5",
            unlockRequirement: "\u89e3\u9396\u689d\u4ef6",
            eventSeries: "\u6d3b\u52d5\u7cfb\u5217",
            rewards: "\u734e\u52f5",
            close: "\u95dc\u9589",
            loading: "\u8f09\u5165\u6d3b\u52d5\u4e2d...",
            loadFailed: "\u8f09\u5165\u6d3b\u52d5\u8cc7\u6599\u5931\u6557\u3002",
            untitled: "\u672a\u547d\u540d\u6d3b\u52d5",
            weekend: "\u9031\u672b",
            currentDay: "\u4eca\u5929",
            serverTimeWithZone: timezone => `\u4f3a\u670d\u5668\u6642\u9593\uff1a${timezone}`,
            localTimeWithZone: timezone => `\u7576\u5730\u6642\u9593\uff1a${timezone}`
        },
        "zh-CN": {
            headerTitle: "\u6d3b\u52a8",
            weekly: "\u6bcf\u5468",
            calendar: "\u6863\u671f",
            showLocalTime: "\u663e\u793a\u672c\u5730\u65f6\u95f4",
            allDay: "\u5168\u5929\u5f00\u653e",
            noEvents: "\u8fd9\u5929\u6ca1\u6709\u6d3b\u52a8\u3002",
            noCalendarEvents: "\u76ee\u524d\u6ca1\u6709\u6863\u671f\u6d3b\u52a8\u3002",
            hideAllDay: "\u9690\u85cf\u5168\u5929\u6d3b\u52a8",
            unlockRequirement: "\u89e3\u9501\u6761\u4ef6",
            eventSeries: "\u6d3b\u52a8\u7cfb\u5217",
            rewards: "\u5956\u52b1",
            close: "\u5173\u95ed",
            loading: "\u6b63\u5728\u52a0\u8f7d\u6d3b\u52a8...",
            loadFailed: "\u52a0\u8f7d\u6d3b\u52a8\u8d44\u6599\u5931\u8d25\u3002",
            untitled: "\u672a\u547d\u540d\u6d3b\u52a8",
            weekend: "\u5468\u672b",
            currentDay: "\u4eca\u5929",
            serverTimeWithZone: timezone => `\u670d\u52a1\u5668\u65f6\u95f4\uff1a${timezone}`,
            localTimeWithZone: timezone => `\u672c\u5730\u65f6\u95f4\uff1a${timezone}`
        },
        "th-TH": {
            headerTitle: "\u0e01\u0e34\u0e08\u0e01\u0e23\u0e23\u0e21",
            weekly: "\u0e23\u0e32\u0e22\u0e2a\u0e31\u0e1b\u0e14\u0e32\u0e2b\u0e4c",
            calendar: "\u0e15\u0e32\u0e23\u0e32\u0e07\u0e01\u0e34\u0e08\u0e01\u0e23\u0e23\u0e21",
            showLocalTime: "\u0e41\u0e2a\u0e14\u0e07\u0e40\u0e27\u0e25\u0e32\u0e17\u0e49\u0e2d\u0e07\u0e16\u0e34\u0e48\u0e19",
            allDay: "\u0e40\u0e1b\u0e34\u0e14\u0e15\u0e25\u0e2d\u0e14\u0e27\u0e31\u0e19",
            noEvents: "\u0e44\u0e21\u0e48\u0e21\u0e35\u0e01\u0e34\u0e08\u0e01\u0e23\u0e23\u0e21\u0e43\u0e19\u0e27\u0e31\u0e19\u0e19\u0e35\u0e49",
            noCalendarEvents: "\u0e44\u0e21\u0e48\u0e21\u0e35\u0e01\u0e34\u0e08\u0e01\u0e23\u0e23\u0e21\u0e41\u0e1a\u0e1a\u0e01\u0e33\u0e2b\u0e19\u0e14\u0e27\u0e31\u0e19",
            hideAllDay: "\u0e0b\u0e48\u0e2d\u0e19\u0e01\u0e34\u0e08\u0e01\u0e23\u0e23\u0e21\u0e40\u0e1b\u0e34\u0e14\u0e15\u0e25\u0e2d\u0e14\u0e27\u0e31\u0e19",
            unlockRequirement: "\u0e40\u0e07\u0e37\u0e48\u0e2d\u0e19\u0e44\u0e02\u0e01\u0e32\u0e23\u0e1b\u0e25\u0e14\u0e25\u0e47\u0e2d\u0e01",
            eventSeries: "\u0e0a\u0e38\u0e14\u0e01\u0e34\u0e08\u0e01\u0e23\u0e23\u0e21",
            rewards: "\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25",
            close: "\u0e1b\u0e34\u0e14",
            loading: "\u0e01\u0e33\u0e25\u0e31\u0e07\u0e42\u0e2b\u0e25\u0e14\u0e01\u0e34\u0e08\u0e01\u0e23\u0e23\u0e21...",
            loadFailed: "\u0e42\u0e2b\u0e25\u0e14\u0e02\u0e49\u0e2d\u0e21\u0e39\u0e25\u0e01\u0e34\u0e08\u0e01\u0e23\u0e23\u0e21\u0e44\u0e21\u0e48\u0e2a\u0e33\u0e40\u0e23\u0e47\u0e08",
            untitled: "\u0e01\u0e34\u0e08\u0e01\u0e23\u0e23\u0e21\u0e44\u0e21\u0e48\u0e21\u0e35\u0e0a\u0e37\u0e48\u0e2d",
            weekend: "\u0e2a\u0e38\u0e14\u0e2a\u0e31\u0e1b\u0e14\u0e32\u0e2b\u0e4c",
            currentDay: "\u0e27\u0e31\u0e19\u0e19\u0e35\u0e49",
            serverTimeWithZone: timezone => `\u0e40\u0e27\u0e25\u0e32\u0e40\u0e0b\u0e34\u0e23\u0e4c\u0e1f\u0e40\u0e27\u0e2d\u0e23\u0e4c: ${timezone}`,
            localTimeWithZone: timezone => `\u0e40\u0e27\u0e25\u0e32\u0e17\u0e49\u0e2d\u0e07\u0e16\u0e34\u0e48\u0e19: ${timezone}`
        },
        "id-ID": {
            headerTitle: "Aktivitas",
            weekly: "Mingguan",
            calendar: "Kalender",
            showLocalTime: "Tampilkan waktu lokal",
            allDay: "Sepanjang hari",
            noEvents: "Tidak ada event untuk hari ini.",
            noCalendarEvents: "Tidak ada event musiman yang tersedia.",
            hideAllDay: "Sembunyikan event sepanjang hari",
            unlockRequirement: "Syarat Buka",
            eventSeries: "Seri Event",
            rewards: "Hadiah",
            close: "Tutup",
            loading: "Memuat event...",
            loadFailed: "Gagal memuat data event.",
            untitled: "Event tanpa judul",
            weekend: "Akhir pekan",
            currentDay: "Hari ini",
            serverTimeWithZone: timezone => `Waktu server: ${timezone}`,
            localTimeWithZone: timezone => `Waktu lokal: ${timezone}`
        }
    };

    function detectLocale() {
        const queryLocale = new URLSearchParams(window.location.search).get("lang");
        const storedLocale = localStorage.getItem("ro_lang");
        const htmlLocale = document.documentElement.getAttribute("lang");
        const browserLocales = Array.isArray(navigator.languages) ? navigator.languages : [];
        const candidates = [ queryLocale, storedLocale, htmlLocale, navigator.language || "", ...browserLocales ];
        for (const candidate of candidates) {
            if (!candidate) {
                continue;
            }
            const exact = SUPPORTED_LOCALES.find(item => item.toLowerCase() === String(candidate).toLowerCase());
            if (exact) {
                return exact;
            }
        }
        for (const candidate of candidates) {
            const prefix = String(candidate || "").split("-")[0].toLowerCase();
            if (prefix === "zh") {
                return "zh-TW";
            }
            if (prefix === "en") {
                return "en-US";
            }
            if (prefix === "th") {
                return "th-TH";
            }
            if (prefix === "id" || prefix === "in") {
                return "id-ID";
            }
        }
        return "en-US";
    }

    function escapeHtml(value) {
        return String(value == null ? "" : value).replace(/[&<>\"']/g, function(char) {
            return {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                "\"": "&quot;",
                "'": "&#39;"
            }[char];
        });
    }

    function pad2(value) {
        return String(value).padStart(2, "0");
    }

    function isoWeekdayFromDay(day) {
        return day === 0 ? 7 : day;
    }

    function formatUtcOffsetLabel(offsetMinutes) {
        const sign = offsetMinutes >= 0 ? "+" : "-";
        const absoluteMinutes = Math.abs(offsetMinutes);
        const hours = Math.floor(absoluteMinutes / 60);
        const minutes = absoluteMinutes % 60;
        return `UTC${sign}${pad2(hours)}:${pad2(minutes)}`;
    }

    function getLocalUtcOffsetLabel() {
        return formatUtcOffsetLabel(-new Date().getTimezoneOffset());
    }

    function normalizeTimezoneLabel(label) {
        const raw = String(label || "").trim();
        if (!raw) {
            return "UTC";
        }
        const match = raw.match(/^(?:UTC|GMT)\s*([+-])\s*(\d{1,2})(?::?(\d{2}))?$/i);
        if (!match) {
            return raw;
        }
        const sign = match[1] === "-" ? -1 : 1;
        const hours = Number(match[2]) || 0;
        const minutes = Number(match[3]) || 0;
        return formatUtcOffsetLabel(sign * (hours * 60 + minutes));
    }

    const ACTIVE_LOCALE = detectLocale();
    const TEXT = STRINGS[ACTIVE_LOCALE] || STRINGS["en-US"];
    const DATA_URL = `${IS_SEA ? "/sea" : ""}/events/data/events_${ACTIVE_LOCALE}.json`;
    const TIME_FORMATTER = new Intl.DateTimeFormat(ACTIVE_LOCALE, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        hourCycle: "h23"
    });
    const DATE_FORMATTER = new Intl.DateTimeFormat(ACTIVE_LOCALE, {
        year: "numeric",
        month: "short",
        day: "2-digit"
    });
    const DATE_TIME_FORMATTER = new Intl.DateTimeFormat(ACTIVE_LOCALE, {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        hourCycle: "h23"
    });
    const WEEKDAY_SHORT_FORMATTER = new Intl.DateTimeFormat(ACTIVE_LOCALE, { weekday: "short" });
    const WEEKDAY_LONG_FORMATTER = new Intl.DateTimeFormat(ACTIVE_LOCALE, { weekday: "long" });

    localStorage.setItem("ro_lang", ACTIVE_LOCALE);
    document.documentElement.setAttribute("lang", ACTIVE_LOCALE);

    const state = {
        payload: null,
        mode: "weekly",
        showLocalTime: localStorage.getItem(STORAGE_KEYS.localTime) !== "0",
        hideAllDay: localStorage.getItem(STORAGE_KEYS.hideAllDay) !== "0",
        mobileDayIndex: 1,
        activeModalKey: "",
        swipeStartX: 0,
        swipeStartY: 0
    };

    const elements = {
        weeklyButton: document.getElementById("events-weekly-btn"),
        calendarButton: document.getElementById("events-calendar-btn"),
        localTimeToggle: document.getElementById("events-local-time-toggle"),
        localTimeLabel: document.getElementById("events-local-time-label"),
        timezoneNote: document.getElementById("events-timezone-note"),
        weeklyControls: document.getElementById("events-weekly-controls"),
        content: document.getElementById("events-content"),
        empty: document.getElementById("events-empty"),
        modal: document.getElementById("events-modal"),
        modalClose: document.getElementById("events-modal-close"),
        modalTitle: document.getElementById("events-modal-title"),
        modalIcon: document.getElementById("events-modal-icon"),
        modalDescription: document.getElementById("events-modal-description"),
        modalRequirementWrap: document.getElementById("events-modal-requirement-wrap"),
        modalRequirementLabel: document.getElementById("events-modal-requirement-label"),
        modalRequirement: document.getElementById("events-modal-requirement"),
        modalSeriesWrap: document.getElementById("events-modal-series-wrap"),
        modalSeriesLabel: document.getElementById("events-modal-series-label"),
        modalSeries: document.getElementById("events-modal-series"),
        modalRewardsWrap: document.getElementById("events-modal-rewards-wrap"),
        modalRewardsLabel: document.getElementById("events-modal-rewards-label"),
        modalRewards: document.getElementById("events-modal-rewards")
    };

    const MODAL_EVENT_CACHE = new Map();

    function serverPartsFromUtcMs(utcMs, offsetHours) {
        const shifted = new Date(utcMs + offsetHours * HOUR_MS);
        return {
            year: shifted.getUTCFullYear(),
            month: shifted.getUTCMonth() + 1,
            day: shifted.getUTCDate(),
            hour: shifted.getUTCHours(),
            minute: shifted.getUTCMinutes(),
            second: shifted.getUTCSeconds(),
            weekday: isoWeekdayFromDay(shifted.getUTCDay())
        };
    }

    function localPartsFromUtcMs(utcMs) {
        const date = new Date(utcMs);
        return {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate(),
            hour: date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds(),
            weekday: isoWeekdayFromDay(date.getDay())
        };
    }

    function serverDateToUtcMs(year, month, day, hour, minute, second, offsetHours) {
        return Date.UTC(year, month - 1, day, hour, minute, second) - offsetHours * HOUR_MS;
    }

    function getServerDayStartUtcMs(nowUtcMs, offsetHours) {
        const parts = serverPartsFromUtcMs(nowUtcMs, offsetHours);
        return serverDateToUtcMs(parts.year, parts.month, parts.day, 0, 0, 0, offsetHours);
    }

    function getServerWeekStartUtcMs(nowUtcMs, offsetHours) {
        const dayStart = getServerDayStartUtcMs(nowUtcMs, offsetHours);
        const weekday = serverPartsFromUtcMs(nowUtcMs, offsetHours).weekday;
        return dayStart - (weekday - 1) * DAY_MS;
    }

    function getDisplayParts(utcMs) {
        return state.showLocalTime
            ? localPartsFromUtcMs(utcMs)
            : serverPartsFromUtcMs(utcMs, state.payload.serverOffsetHours);
    }

    function getCurrentDisplayDayIndex() {
        return getDisplayParts(Date.now()).weekday;
    }

    function formatDisplayClock(utcMs) {
        if (state.showLocalTime) {
            return TIME_FORMATTER.format(new Date(utcMs));
        }
        const parts = serverPartsFromUtcMs(utcMs, state.payload.serverOffsetHours);
        return `${pad2(parts.hour)}:${pad2(parts.minute)}`;
    }

    function formatDisplayDateTime(utcMs) {
        if (state.showLocalTime) {
            return DATE_TIME_FORMATTER.format(new Date(utcMs));
        }
        const parts = serverPartsFromUtcMs(utcMs, state.payload.serverOffsetHours);
        return `${parts.year}-${pad2(parts.month)}-${pad2(parts.day)} ${pad2(parts.hour)}:${pad2(parts.minute)}`;
    }

    function formatDisplayDate(utcMs) {
        if (state.showLocalTime) {
            return DATE_FORMATTER.format(new Date(utcMs));
        }
        const parts = serverPartsFromUtcMs(utcMs, state.payload.serverOffsetHours);
        return `${parts.year}-${pad2(parts.month)}-${pad2(parts.day)}`;
    }

    function formatTimeRange(startUtcMs, endUtcMs, allDay) {
        if (allDay) {
            return TEXT.allDay;
        }
        return `${formatDisplayClock(startUtcMs)} - ${formatDisplayClock(endUtcMs)}`;
    }

    function formatCalendarRange(startUtcMs, endUtcMs) {
        return `${formatDisplayDateTime(startUtcMs)} - ${formatDisplayDateTime(endUtcMs)}`;
    }

    function getNextActivityDayBoundaryUtcMs(utcMs) {
        const offsetHours = state.payload.serverOffsetHours;
        const parts = serverPartsFromUtcMs(utcMs, offsetHours);
        const targetDate = new Date(Date.UTC(parts.year, parts.month - 1, parts.day, 12, 0, 0));
        const isAtOrPastReset = parts.hour > ACTIVITY_DAY_RESET_HOUR
            || parts.hour === ACTIVITY_DAY_RESET_HOUR && (parts.minute > 0 || parts.second > 0)
            || parts.hour === ACTIVITY_DAY_RESET_HOUR && parts.minute === 0 && parts.second === 0;
        if (isAtOrPastReset) {
            targetDate.setUTCDate(targetDate.getUTCDate() + 1);
        }
        return serverDateToUtcMs(
            targetDate.getUTCFullYear(),
            targetDate.getUTCMonth() + 1,
            targetDate.getUTCDate(),
            ACTIVITY_DAY_RESET_HOUR,
            0,
            0,
            offsetHours
        );
    }

    function isMonthlyWeekdayMatch(year, month, day, weekIndex, weekday) {
        const date = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
        return isoWeekdayFromDay(date.getUTCDay()) === weekday && Math.floor((day - 1) / 7) + 1 === weekIndex;
    }

    function getServerWeekdayShortLabel(utcMs) {
        const serverParts = serverPartsFromUtcMs(utcMs, state.payload.serverOffsetHours);
        return WEEKDAY_LABELS[serverParts.weekday - 1].short;
    }

    function isMultiActivityDayRange(startUtcMs, endUtcMs, allDay) {
        return !allDay && endUtcMs > getNextActivityDayBoundaryUtcMs(startUtcMs);
    }

    function formatMultiDayTimeRange(startUtcMs, endUtcMs) {
        const endReferenceUtcMs = Math.max(startUtcMs, endUtcMs - 1);
        return `${getServerWeekdayShortLabel(startUtcMs)} ${formatDisplayClock(startUtcMs)} - ${getServerWeekdayShortLabel(endReferenceUtcMs)} ${formatDisplayClock(endUtcMs)}`;
    }

    function makeWeeklyOccurrence(event, startUtcMs, durationSeconds, allDay) {
        const endUtcMs = allDay ? startUtcMs + DAY_MS : startUtcMs + Math.max(0, durationSeconds) * 1000;
        const displayParts = getDisplayParts(startUtcMs);
        return {
            key: `${event.id}:${startUtcMs}`,
            modalKey: `weekly:${event.id}`,
            eventId: event.id,
            title: event.title || TEXT.untitled,
            description: event.description || "",
            iconPath: event.iconPath || "",
            unlockRequirement: event.unlockRequirement || "",
            rewardPreview: Array.isArray(event.rewardPreview) ? event.rewardPreview : [],
            startUtcMs,
            endUtcMs,
            allDay,
            displayDayIndex: displayParts.weekday,
            slotLabel: allDay ? TEXT.allDay : `${pad2(displayParts.hour)}:${pad2(displayParts.minute)}`,
            slotSort: allDay ? -1 : displayParts.hour * 60 + displayParts.minute,
            timeText: isMultiActivityDayRange(startUtcMs, endUtcMs, allDay)
                ? formatMultiDayTimeRange(startUtcMs, endUtcMs)
                : formatTimeRange(startUtcMs, endUtcMs, allDay)
        };
    }

    function buildOccurrencesForRule(event, rule, weekStartUtcMs, weekEndUtcMs) {
        const occurrences = [];
        const offsetHours = state.payload.serverOffsetHours;
        const durationSeconds = Number(rule.durationSeconds || 0);
        if (rule.kind === "always") {
            for (let dayOffset = 0; dayOffset < 7; dayOffset += 1) {
                const startUtcMs = weekStartUtcMs + dayOffset * DAY_MS;
                occurrences.push(makeWeeklyOccurrence(event, startUtcMs, DAY_MS / 1000, true));
            }
            return occurrences;
        }
        if (rule.kind === "daily") {
            for (let dayOffset = 0; dayOffset < 7; dayOffset += 1) {
                const startUtcMs = weekStartUtcMs + dayOffset * DAY_MS + rule.hour * HOUR_MS + rule.minute * MINUTE_MS + (rule.second || 0) * 1000;
                occurrences.push(makeWeeklyOccurrence(event, startUtcMs, durationSeconds, false));
            }
            return occurrences;
        }
        if (rule.kind === "weekly") {
            const weekday = Math.min(7, Math.max(1, Number(rule.weekday || 1)));
            const startUtcMs = weekStartUtcMs + (weekday - 1) * DAY_MS + rule.hour * HOUR_MS + rule.minute * MINUTE_MS + (rule.second || 0) * 1000;
            occurrences.push(makeWeeklyOccurrence(event, startUtcMs, durationSeconds, false));
            return occurrences;
        }
        if (rule.kind === "monthly-weekday") {
            for (let dayOffset = 0; dayOffset < 7; dayOffset += 1) {
                const dayStartUtcMs = weekStartUtcMs + dayOffset * DAY_MS;
                const serverParts = serverPartsFromUtcMs(dayStartUtcMs, offsetHours);
                if (!isMonthlyWeekdayMatch(serverParts.year, serverParts.month, serverParts.day, Number(rule.weekIndex || 0), Number(rule.weekday || 0))) {
                    continue;
                }
                const startUtcMs = serverDateToUtcMs(
                    serverParts.year,
                    serverParts.month,
                    serverParts.day,
                    Number(rule.hour || 0),
                    Number(rule.minute || 0),
                    Number(rule.second || 0),
                    offsetHours
                );
                if (startUtcMs >= weekStartUtcMs && startUtcMs < weekEndUtcMs) {
                    occurrences.push(makeWeeklyOccurrence(event, startUtcMs, durationSeconds, false));
                }
            }
            return occurrences;
        }
        if (rule.kind === "absolute") {
            const startUtcMs = serverDateToUtcMs(
                Number(rule.year || 0),
                Number(rule.month || 0),
                Number(rule.day || 0),
                Number(rule.hour || 0),
                Number(rule.minute || 0),
                Number(rule.second || 0),
                offsetHours
            );
            if (startUtcMs >= weekStartUtcMs && startUtcMs < weekEndUtcMs) {
                occurrences.push(makeWeeklyOccurrence(event, startUtcMs, durationSeconds, false));
            }
        }
        return occurrences;
    }

    function getWeeklyEvents() {
        if (!Array.isArray(state.payload && state.payload.weeklyEvents)) {
            return [];
        }
        return state.payload.weeklyEvents.filter(function(event) {
            const rules = Array.isArray(event.weeklyRules) ? event.weeklyRules : [];
            return !!event.alwaysOpen || rules.length > 0;
        });
    }

    function getCalendarEvents() {
        if (!Array.isArray(state.payload && state.payload.calendarEvents)) {
            return [];
        }
        return state.payload.calendarEvents.filter(function(event) {
            return Array.isArray(event.calendarRanges) && event.calendarRanges.length > 0;
        });
    }

    function buildWeeklyOccurrences() {
        const occurrences = [];
        const weekStartUtcMs = getServerWeekStartUtcMs(Date.now(), state.payload.serverOffsetHours);
        const weekEndUtcMs = weekStartUtcMs + 7 * DAY_MS;
        for (const event of getWeeklyEvents()) {
            for (const rule of Array.isArray(event.weeklyRules) ? event.weeklyRules : []) {
                occurrences.push.apply(occurrences, buildOccurrencesForRule(event, rule, weekStartUtcMs, weekEndUtcMs));
            }
        }
        const visibleOccurrences = state.hideAllDay
            ? occurrences.filter(function(occurrence) {
                return !occurrence.allDay;
            })
            : occurrences;
        visibleOccurrences.sort(function(a, b) {
            if (a.slotSort !== b.slotSort) {
                return a.slotSort - b.slotSort;
            }
            if (a.startUtcMs !== b.startUtcMs) {
                return a.startUtcMs - b.startUtcMs;
            }
            return a.title.localeCompare(b.title);
        });
        return visibleOccurrences;
    }

    function buildCalendarEntries() {
        const entries = [];
        const offsetHours = state.payload.serverOffsetHours;
        for (const event of getCalendarEvents()) {
            for (const range of Array.isArray(event.calendarRanges) ? event.calendarRanges : []) {
                if (!range || range.kind !== "absolute-range" || !range.start || !range.end) {
                    continue;
                }
                const startUtcMs = serverDateToUtcMs(
                    Number(range.start.year || 0),
                    Number(range.start.month || 0),
                    Number(range.start.day || 0),
                    Number(range.start.hour || 0),
                    Number(range.start.minute || 0),
                    Number(range.start.second || 0),
                    offsetHours
                );
                const endUtcMs = serverDateToUtcMs(
                    Number(range.end.year || 0),
                    Number(range.end.month || 0),
                    Number(range.end.day || 0),
                    Number(range.end.hour || 0),
                    Number(range.end.minute || 0),
                    Number(range.end.second || 0),
                    offsetHours
                );
                entries.push({
                    modalKey: `calendar:${event.id}`,
                    id: event.id,
                    title: event.title || TEXT.untitled,
                    description: event.description || "",
                    iconPath: event.iconPath || "",
                    unlockRequirement: event.unlockRequirement || "",
                    rewardPreview: Array.isArray(event.rewardPreview) ? event.rewardPreview : [],
                    startUtcMs,
                    endUtcMs,
                    sort: Number(event.sort || 0)
                });
            }
        }
        entries.sort(function(a, b) {
            if (a.startUtcMs !== b.startUtcMs) {
                return a.startUtcMs - b.startUtcMs;
            }
            if (a.sort !== b.sort) {
                return a.sort - b.sort;
            }
            return a.title.localeCompare(b.title);
        });
        return entries;
    }

    function buildWeekdayLabels() {
        const labels = [];
        for (let dayIndex = 1; dayIndex <= 7; dayIndex += 1) {
            const date = new Date(Date.UTC(2024, 0, dayIndex, 12, 0, 0));
            labels.push({
                short: WEEKDAY_SHORT_FORMATTER.format(date),
                long: WEEKDAY_LONG_FORMATTER.format(date)
            });
        }
        return labels;
    }

    const WEEKDAY_LABELS = buildWeekdayLabels();

    function buildEventTileHtml(occurrence) {
        return `<button type="button" class="events-event-tile" data-modal-key="${escapeHtml(occurrence.modalKey)}">
            ${occurrence.iconPath ? `<img class="events-event-icon" src="${escapeHtml(occurrence.iconPath)}" alt="">` : `<div class="events-event-icon events-event-icon-placeholder"></div>`}
            <div class="events-event-name">${escapeHtml(occurrence.title)}</div>
            <div class="events-event-time">${escapeHtml(occurrence.timeText)}</div>
            ${occurrence.unlockRequirement ? `<div class="events-event-requirement">${escapeHtml(occurrence.unlockRequirement)}</div>` : ""}
        </button>`;
    }

    function buildWeeklyTableHtml(title, dayIndices, occurrencesByDay, highlightedDayIndex) {
        const slotMap = new Map();
        for (const dayIndex of dayIndices) {
            for (const occurrence of occurrencesByDay.get(dayIndex) || []) {
                const key = `${occurrence.slotSort}|${occurrence.slotLabel}`;
                if (!slotMap.has(key)) {
                    slotMap.set(key, {
                        slotSort: occurrence.slotSort,
                        slotLabel: occurrence.slotLabel
                    });
                }
            }
        }
        const rows = Array.from(slotMap.values()).sort(function(a, b) {
            if (a.slotSort !== b.slotSort) {
                return a.slotSort - b.slotSort;
            }
            return a.slotLabel.localeCompare(b.slotLabel);
        });
        if (!rows.length) {
            return "";
        }
        const headerCells = dayIndices.map(function(dayIndex) {
            const labels = WEEKDAY_LABELS[dayIndex - 1];
            return `<div class="events-schedule-head${dayIndex === highlightedDayIndex ? " is-current" : ""}">
                <div class="events-schedule-head-day">${escapeHtml(labels.short)}</div>
                ${dayIndex === highlightedDayIndex ? `<div class="events-schedule-head-badge">${escapeHtml(TEXT.currentDay)}</div>` : ""}
            </div>`;
        }).join("");
        const bodyRows = rows.map(function(row) {
            const cells = dayIndices.map(function(dayIndex) {
                const items = (occurrencesByDay.get(dayIndex) || []).filter(function(occurrence) {
                    return occurrence.slotSort === row.slotSort && occurrence.slotLabel === row.slotLabel;
                });
                const currentClass = dayIndex === highlightedDayIndex ? " is-current" : "";
                return `<div class="events-schedule-cell${currentClass}">
                    ${items.length ? items.map(buildEventTileHtml).join("") : `<div class="events-schedule-empty"></div>`}
                </div>`;
            }).join("");
            return `<div class="events-schedule-row">
                <div class="events-schedule-time">${escapeHtml(row.slotLabel)}</div>
                ${cells}
            </div>`;
        }).join("");
        return `<section class="events-weekly-section">
            ${title ? `<div class="events-weekly-section-title">${escapeHtml(title)}</div>` : ""}
            <div class="events-schedule-table" style="--events-day-count:${dayIndices.length}">
                <div class="events-schedule-corner"></div>
                ${headerCells}
                ${bodyRows}
            </div>
        </section>`;
    }

    function buildWeeklyDesktopHtml(occurrences, highlightedDayIndex) {
        const occurrencesByDay = new Map();
        for (let dayIndex = 1; dayIndex <= 7; dayIndex += 1) {
            occurrencesByDay.set(dayIndex, []);
        }
        for (const occurrence of occurrences) {
            occurrencesByDay.get(occurrence.displayDayIndex).push(occurrence);
        }
        const weekHtml = buildWeeklyTableHtml("", [ 1, 2, 3, 4, 5, 6, 7 ], occurrencesByDay, highlightedDayIndex);
        return weekHtml ? `<div class="events-weekly-desktop">${weekHtml}</div>` : "";
    }

    function buildWeeklyMobileHtml(occurrences, dayIndex) {
        const labels = WEEKDAY_LABELS[dayIndex - 1];
        const isCurrentDay = dayIndex === getCurrentDisplayDayIndex();
        const items = occurrences.filter(function(occurrence) {
            return occurrence.displayDayIndex === dayIndex;
        });
        const listHtml = items.length
            ? items.map(function(occurrence) {
                return `<div class="events-mobile-card-wrap">${buildEventTileHtml(occurrence)}</div>`;
            }).join("")
            : `<div class="events-day-empty">${escapeHtml(TEXT.noEvents)}</div>`;
        return `<div class="events-mobile-weekly">
            <div class="events-day-nav${isCurrentDay ? " is-current" : ""}">
                <button type="button" class="events-day-nav-btn" data-day-shift="-1" aria-label="Previous day">&#8249;</button>
                <div class="events-day-nav-label-wrap">
                    <div class="events-day-nav-label">${escapeHtml(labels.long)}</div>
                    <div class="events-day-nav-badge${isCurrentDay ? "" : " is-hidden"}">${escapeHtml(TEXT.currentDay)}</div>
                </div>
                <button type="button" class="events-day-nav-btn" data-day-shift="1" aria-label="Next day">&#8250;</button>
            </div>
            <div class="events-mobile-day-list">${listHtml}</div>
        </div>`;
    }

    function buildWeeklyControlsHtml() {
        return `<label class="events-all-day-toggle">
            <input type="checkbox" data-hide-all-day="1"${state.hideAllDay ? " checked" : ""}>
            <span>${escapeHtml(TEXT.hideAllDay)}</span>
        </label>`;
    }

    function buildCalendarHtml(entries) {
        if (!entries.length) {
            return "";
        }
        return `<div class="events-calendar-grid">${entries.map(function(entry) {
            return `<button type="button" class="events-calendar-card" data-modal-key="${escapeHtml(entry.modalKey)}">
                ${entry.iconPath ? `<img class="events-calendar-icon" src="${escapeHtml(entry.iconPath)}" alt="">` : `<div class="events-calendar-icon events-calendar-icon-placeholder"></div>`}
                <div class="events-calendar-name">${escapeHtml(entry.title)}</div>
                <div class="events-calendar-range">${escapeHtml(formatCalendarRange(entry.startUtcMs, entry.endUtcMs))}</div>
                ${entry.unlockRequirement ? `<div class="events-calendar-requirement">${escapeHtml(entry.unlockRequirement)}</div>` : ""}
            </button>`;
        }).join("")}</div>`;
    }

    function setTimezoneNote() {
        elements.timezoneNote.textContent = state.showLocalTime
            ? TEXT.localTimeWithZone(getLocalUtcOffsetLabel())
            : TEXT.serverTimeWithZone(normalizeTimezoneLabel(state.payload.serverTimezone || ""));
    }

    function syncStaticLabels() {
        if (window.RO_SET_PAGE_TITLE) {
            window.RO_SET_PAGE_TITLE(TEXT.headerTitle);
        } else {
            document.title = `${TEXT.headerTitle} | RO World Journey`;
        }
        const headerTitle = document.querySelector(".header-title");
        if (headerTitle) {
            headerTitle.textContent = TEXT.headerTitle;
        }
        if (elements.weeklyButton) {
            elements.weeklyButton.textContent = TEXT.weekly;
        }
        if (elements.calendarButton) {
            elements.calendarButton.textContent = TEXT.calendar;
        }
        if (elements.localTimeLabel) {
            elements.localTimeLabel.textContent = TEXT.showLocalTime;
        }
        if (elements.modalRequirementLabel) {
            elements.modalRequirementLabel.textContent = TEXT.unlockRequirement;
        }
        if (elements.modalSeriesLabel) {
            elements.modalSeriesLabel.textContent = TEXT.eventSeries;
        }
        if (elements.modalRewardsLabel) {
            elements.modalRewardsLabel.textContent = TEXT.rewards;
        }
        if (elements.modalClose) {
            elements.modalClose.setAttribute("aria-label", TEXT.close);
        }
    }

    function rebuildModalCache(weeklyOccurrences, calendarEntries) {
        MODAL_EVENT_CACHE.clear();
        const weeklyById = new Map();
        for (const event of getWeeklyEvents()) {
            weeklyById.set(Number(event.id), event);
        }
        for (const occurrence of weeklyOccurrences) {
            if (MODAL_EVENT_CACHE.has(occurrence.modalKey)) {
                continue;
            }
            const source = weeklyById.get(Number(occurrence.eventId)) || {};
            MODAL_EVENT_CACHE.set(occurrence.modalKey, {
                title: occurrence.title,
                description: source.description || occurrence.description || "",
                iconPath: source.iconPath || occurrence.iconPath || "",
                unlockRequirement: source.modalUnlockRequirement || source.unlockRequirement || occurrence.unlockRequirement || "",
                eventSeries: "",
                rewardPreview: Array.isArray(source.rewardPreview) ? source.rewardPreview : []
            });
        }
        for (const entry of calendarEntries) {
            MODAL_EVENT_CACHE.set(entry.modalKey, {
                title: entry.title,
                description: entry.description || "",
                iconPath: entry.iconPath || "",
                unlockRequirement: entry.modalUnlockRequirement || entry.unlockRequirement || "",
                eventSeries: entry.eventSeries || "",
                rewardPreview: Array.isArray(entry.rewardPreview) ? entry.rewardPreview : []
            });
        }
    }

    function openModal(modalKey) {
        const payload = MODAL_EVENT_CACHE.get(modalKey);
        if (!payload) {
            return;
        }
        state.activeModalKey = modalKey;
        elements.modalTitle.textContent = payload.title || TEXT.untitled;
        if (payload.iconPath) {
            elements.modalIcon.hidden = false;
            elements.modalIcon.src = payload.iconPath;
            elements.modalIcon.alt = payload.title || TEXT.untitled;
        } else {
            elements.modalIcon.hidden = true;
            elements.modalIcon.removeAttribute("src");
            elements.modalIcon.alt = "";
        }
        const description = String(payload.description || "").trim();
        elements.modalDescription.textContent = description;
        elements.modalDescription.hidden = !description;
        const unlockRequirement = String(payload.unlockRequirement || "").trim();
        elements.modalRequirement.textContent = unlockRequirement;
        elements.modalRequirementWrap.hidden = !unlockRequirement;
        const eventSeries = String(payload.eventSeries || "").trim();
        elements.modalSeries.textContent = eventSeries;
        elements.modalSeriesWrap.hidden = !eventSeries;
        const rewards = (Array.isArray(payload.rewardPreview) ? payload.rewardPreview : []).filter(function(reward) {
            return reward && (reward.iconPath || reward.name);
        });
        elements.modalRewards.innerHTML = rewards.map(function(reward) {
            const qualityClass = `quality-${Math.max(0, Number(reward.quality || 0) || 0)}`;
            return `<div class="events-modal-reward ${qualityClass}" title="${escapeHtml(reward.name || "")}">
                ${reward.iconPath ? `<img src="${escapeHtml(reward.iconPath)}" alt="">` : ""}
                ${Number(reward.count || 0) > 1 ? `<div class="events-modal-reward-count">${escapeHtml(String(reward.count))}</div>` : ""}
            </div>`;
        }).join("");
        elements.modalRewardsWrap.hidden = rewards.length === 0;
        if (!unlockRequirement) {
            elements.modalRequirement.textContent = "";
        }
        if (!eventSeries) {
            elements.modalSeries.textContent = "";
        }
        if (rewards.length === 0) {
            elements.modalRewards.innerHTML = "";
        }
        elements.modal.hidden = false;
        document.body.classList.add("modal-open");
    }

    function closeModal() {
        state.activeModalKey = "";
        elements.modal.hidden = true;
        document.body.classList.remove("modal-open");
    }

    function render() {
        if (!state.payload) {
            return;
        }
        const weeklyOccurrences = buildWeeklyOccurrences();
        const calendarEntries = buildCalendarEntries();
        rebuildModalCache(weeklyOccurrences, calendarEntries);
        setTimezoneNote();
        elements.weeklyButton.classList.toggle("active", state.mode === "weekly");
        elements.calendarButton.classList.toggle("active", state.mode === "calendar");
        elements.localTimeToggle.checked = state.showLocalTime;
        const highlightedDayIndex = getCurrentDisplayDayIndex();
        if (!Number.isInteger(state.mobileDayIndex) || state.mobileDayIndex < 1 || state.mobileDayIndex > 7) {
            state.mobileDayIndex = highlightedDayIndex;
        }
        elements.weeklyControls.hidden = state.mode !== "weekly";
        if (state.mode === "weekly") {
            elements.weeklyControls.innerHTML = buildWeeklyControlsHtml();
        } else {
            elements.weeklyControls.innerHTML = "";
        }
        let html = "";
        if (state.mode === "weekly") {
            const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
            html = isMobile
                ? buildWeeklyMobileHtml(weeklyOccurrences, state.mobileDayIndex)
                : buildWeeklyDesktopHtml(weeklyOccurrences, highlightedDayIndex);
            elements.empty.textContent = TEXT.noEvents;
            elements.empty.hidden = !!html;
        } else {
            html = buildCalendarHtml(calendarEntries);
            elements.empty.textContent = TEXT.noCalendarEvents;
            elements.empty.hidden = !!html;
        }
        elements.content.innerHTML = html;
    }

    function changeMobileDay(delta) {
        const next = state.mobileDayIndex + delta;
        if (next < 1) {
            state.mobileDayIndex = 7;
        } else if (next > 7) {
            state.mobileDayIndex = 1;
        } else {
            state.mobileDayIndex = next;
        }
        render();
    }

    async function loadData() {
        elements.content.innerHTML = "";
        elements.empty.textContent = TEXT.loading;
        elements.empty.hidden = false;
        try {
            const response = await fetch(DATA_URL, { cache: "no-store" });
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            state.payload = await response.json();
            state.mobileDayIndex = getCurrentDisplayDayIndex();
            render();
        } catch (error) {
            elements.content.innerHTML = "";
            elements.empty.textContent = TEXT.loadFailed;
            elements.empty.hidden = false;
        }
    }

    function handleContentClick(event) {
        const dayShiftButton = event.target.closest("[data-day-shift]");
        if (dayShiftButton) {
            changeMobileDay(Number(dayShiftButton.getAttribute("data-day-shift") || 0));
            return;
        }
        const modalButton = event.target.closest("[data-modal-key]");
        if (modalButton) {
            openModal(modalButton.getAttribute("data-modal-key") || "");
        }
    }

    function handleTouchStart(event) {
        if (state.mode !== "weekly" || window.innerWidth > MOBILE_BREAKPOINT) {
            return;
        }
        const touch = event.changedTouches && event.changedTouches[0];
        if (!touch) {
            return;
        }
        state.swipeStartX = touch.clientX;
        state.swipeStartY = touch.clientY;
    }

    function handleTouchEnd(event) {
        if (state.mode !== "weekly" || window.innerWidth > MOBILE_BREAKPOINT) {
            return;
        }
        const touch = event.changedTouches && event.changedTouches[0];
        if (!touch) {
            return;
        }
        const deltaX = touch.clientX - state.swipeStartX;
        const deltaY = touch.clientY - state.swipeStartY;
        if (Math.abs(deltaX) < 40 || Math.abs(deltaX) < Math.abs(deltaY)) {
            return;
        }
        changeMobileDay(deltaX > 0 ? -1 : 1);
    }

    function bindEvents() {
        elements.weeklyButton.addEventListener("click", function() {
            state.mode = "weekly";
            render();
        });
        elements.calendarButton.addEventListener("click", function() {
            state.mode = "calendar";
            render();
        });
        elements.localTimeToggle.addEventListener("change", function() {
            state.showLocalTime = !!elements.localTimeToggle.checked;
            localStorage.setItem(STORAGE_KEYS.localTime, state.showLocalTime ? "1" : "0");
            state.mobileDayIndex = getCurrentDisplayDayIndex();
            render();
        });
        elements.weeklyControls.addEventListener("change", function(event) {
            const toggle = event.target.closest("[data-hide-all-day]");
            if (!toggle) {
                return;
            }
            state.hideAllDay = !!toggle.checked;
            localStorage.setItem(STORAGE_KEYS.hideAllDay, state.hideAllDay ? "1" : "0");
            render();
        });
        elements.content.addEventListener("click", handleContentClick);
        elements.content.addEventListener("touchstart", handleTouchStart, { passive: true });
        elements.content.addEventListener("touchend", handleTouchEnd, { passive: true });
        elements.modal.addEventListener("click", function(event) {
            if (event.target.closest("[data-close-modal]") || event.target === elements.modalClose) {
                closeModal();
            }
        });
        document.addEventListener("keydown", function(event) {
            if (event.key === "Escape") {
                if (!elements.modal.hidden) {
                    closeModal();
                }
            }
        });
        window.addEventListener("resize", render);
    }

    syncStaticLabels();
    bindEvents();
    loadData();
})();
