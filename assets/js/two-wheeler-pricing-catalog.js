/**
 * Two-Wheeler pricing (Services & Packages + Additional Services).
 * Keys for S&P match getCardTitle() / .home-vehicle-feature-card__overlay-title (normalized lowercase).
 * Replace or merge with API data later; keep shape stable for DB mapping.
 */
(function (global) {
	"use strict";

	const roundSar = (n) => Math.max(0, Math.round(Number(n) / 10) * 10);

	/**
	 * Commuter tier = baseline (aligned with initial two-wheeler grid HTML).
	 * Sport / Cruiser / Touring scale from this — distinct from car Small/Medium/Large tables.
	 */
	const TWO_WHEELER_SP_COMMUTER_BASE = {
		"bright polishing": { current: 590, old: 750 },
		"farexel full polishing": { current: 790, old: 1250 },
		"aqueous bright polishing": { current: 890, old: 1200 },
		"exterior nano ceramic 6 layers": { current: 1890, old: 3000 },
		"full glass nano ceramic": { current: 690, old: 800 },
		"interior nano ceramic": { current: 1290, old: 2500 },
		"paint protection film(full)": { current: 8890, old: 12000 },
		"paint protection film full(matt)": { current: 10890, old: 14500 },
		"full colored protection film": { current: 12390, old: 18000 },
		"farexel basic protection": { current: 1190, old: 2990 },
		"farexel plus protection": { current: 4290, old: 7900 },
		"farexel shield": { current: 12890, old: 17400 },
		"renew it back packages": { current: 1390, old: 2100 },
		"farexel shield(matt)": { current: 14900, old: 19900 },
		"pelable paint": { current: 12990, old: 20000 },
		"black edition pelable paint": { current: 5990, old: 8000 },
		"black roof pelable paint": { current: 3990, old: 8000 },
	};

	const TW_SP_SIZE_MULTIPLIER = {
		commuter: 1.0,
		sport: 1.06,
		cruiser: 1.12,
		touring: 1.18,
	};

	function scaleEntry(entry, mult) {
		return {
			current: roundSar(entry.current * mult),
			old: roundSar(entry.old * mult),
		};
	}

	const TWO_WHEELER_SP_PRICES_BY_SIZE = {};
	Object.keys(TW_SP_SIZE_MULTIPLIER).forEach((size) => {
		const mult = TW_SP_SIZE_MULTIPLIER[size];
		TWO_WHEELER_SP_PRICES_BY_SIZE[size] = {};
		Object.keys(TWO_WHEELER_SP_COMMUTER_BASE).forEach((k) => {
			TWO_WHEELER_SP_PRICES_BY_SIZE[size][k] = scaleEntry(TWO_WHEELER_SP_COMMUTER_BASE[k], mult);
		});
	});

	/**
	 * Additional Services — explicit SAR per size (all differ from car carousel prices).
	 * Keys match data-additional-service-key on two-wheeler additional slides.
	 */
	const TWO_WHEELER_ADDITIONAL_PRICES_BY_SIZE = {
		commuter: {
			engine_wash: { current: 360, old: 470 },
			steam_washing: { current: 240, old: 310 },
			express_washing: { current: 115, old: 150 },
		},
		sport: {
			engine_wash: { current: 385, old: 500 },
			steam_washing: { current: 255, old: 330 },
			express_washing: { current: 125, old: 160 },
		},
		cruiser: {
			engine_wash: { current: 415, old: 535 },
			steam_washing: { current: 275, old: 355 },
			express_washing: { current: 135, old: 172 },
		},
		touring: {
			engine_wash: { current: 450, old: 575 },
			steam_washing: { current: 295, old: 385 },
			express_washing: { current: 145, old: 185 },
		},
	};

	global.TWO_WHEELER_SP_PRICES_BY_SIZE = TWO_WHEELER_SP_PRICES_BY_SIZE;
	global.TWO_WHEELER_ADDITIONAL_PRICES_BY_SIZE = TWO_WHEELER_ADDITIONAL_PRICES_BY_SIZE;
	global.TWO_WHEELER_SP_COMMUTER_BASE = TWO_WHEELER_SP_COMMUTER_BASE;
	global.TW_SP_SIZE_MULTIPLIER = TW_SP_SIZE_MULTIPLIER;
})(typeof window !== "undefined" ? window : globalThis);
