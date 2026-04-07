/**
 * One-off generator for #home-vehicles-grid-two-wheeler (17 cards).
 * Run: node scripts/gen-two-wheeler-grid.js
 */
const fs = require("fs");
const path = require("path");

const cards = [
	{
		title: "Bright Polishing",
		old: 750,
		current: 590,
		badge: 21,
		img: 1,
		warranty: "—",
		mid: "4 Installments",
		right: "8 Business Hours",
		details: [
			"Smooth Polishing",
			"Remove Washing Circle",
			"Remove Minor Scratches",
		],
	},
	{
		title: "FAREXEL Full Polishing",
		old: 1250,
		current: 790,
		badge: 37,
		img: 2,
		warranty: "—",
		mid: "4 Installments",
		right: "13 Business Hours",
		details: [
			"Bright Polishing (remove minor scratches and washing circles)",
			"Interior Detailing",
		],
	},
	{
		title: "Aqueous Bright Polishing",
		old: 1200,
		current: 890,
		badge: 26,
		img: 3,
		warranty: "—",
		mid: "4 Installments",
		right: "9 Business Hours",
		details: [
			"Sandpaper or Claybar",
			"Smooth Polishing",
			"Remove Washing Circle",
			"Remove Minor Scratches",
			"Paint Correction",
		],
	},
	{
		title: "Exterior Nano Ceramic 6 Layers",
		old: 3000,
		current: 1890,
		badge: 37,
		img: 4,
		warranty: "5 Years Warranty",
		mid: "4 Installments",
		right: "6 Business Hours",
		details: [
			"6 Layers",
			"Fast Shine Polishing",
			"Terms and conditions on Warranty Page",
			"Warranty (5 Years)",
		],
	},
	{
		title: "Full Glass Nano Ceramic",
		old: 800,
		current: 690,
		badge: 14,
		img: 5,
		warranty: "1 Year Warranty",
		mid: "4 Installments",
		right: "2 Business Hours",
		details: ["Full Glass"],
	},
	{
		title: "Interior Nano Ceramic",
		old: 2500,
		current: 1290,
		badge: 48,
		img: 6,
		warranty: "1 Year Warranty",
		mid: "4 Installments",
		right: "6 Business Hours",
		details: ["The car from the inside"],
	},
	{
		title: "Paint Protection Film(Full)",
		old: 12000,
		current: 8890,
		badge: 26,
		img: 7,
		warranty: "10 Years Warranty",
		mid: "4 Installments",
		right: "30 Business Hours",
		details: [
			"Full car body coverage",
			"Self-healing scratch protection",
			"Precision electronic cutting",
			"Resistant to yellowing and weather condition",
			"Provides long-lasting protection for the original paint",
		],
	},
	{
		title: "Paint Protection Film Full(Matt)",
		old: 14500,
		current: 10890,
		badge: 25,
		img: 8,
		warranty: "10 Years Warranty",
		mid: "4 Installments",
		right: "25 Business Hours",
		details: [
			"Full Car Body Coverage",
			"Self-healing scratches protection",
			"Precision electronic cutting",
			"Resistant to yellowing and weather conditions",
			"Gives the paint a luxurious matte finish",
		],
	},
	{
		title: "Full colored protection film",
		old: 18000,
		current: 12390,
		badge: 31,
		img: 1,
		warranty: "10 Years Warranty",
		mid: "4 Installments",
		right: "40 Business Hours",
		details: [
			"Comprehensive protection for all car colors",
			"Resistant to scratches, staining and weather-related damage",
			"Preserves the natural shine of the paint",
		],
	},
	{
		title: "FAREXEL Basic Protection",
		old: 2990,
		current: 1190,
		badge: 60,
		img: 2,
		warranty: "10 Years Warranty",
		mid: "4 Installments",
		right: "18 Business Hours",
		details: ["Partial Protection Film", "Basic Thermal Insulation"],
	},
	{
		title: "FAREXEL Plus Protection",
		old: 7900,
		current: 4290,
		badge: 46,
		img: 3,
		warranty: "10 Years Warranty",
		mid: "4 Installments",
		right: "26 Business Hours",
		details: [
			"Protection Films Introduction",
			"Prime Thermal Insulation",
			"External Nano Ceramic Two Layers",
		],
	},
	{
		title: "FAREXEL Shield",
		old: 17400,
		current: 12890,
		badge: 26,
		img: 4,
		warranty: "10 Years Warranty",
		mid: "4 Installments",
		right: "50 Business Hours",
		details: [
			"Full Car Protection",
			"Prime Thermal Tint",
			"Windshield Protection",
			"Nano Interior",
			"Interior Protection Film",
		],
	},
	{
		title: "Renew It Back Packages",
		old: 2100,
		current: 1390,
		badge: 34,
		img: 5,
		warranty: "—",
		mid: "4 Installments",
		right: "16 Business Hours",
		details: [
			"Interior Polishing",
			"Exterior Polishing (removing scratches and circles)",
			"External Nano Layer",
			"Engine Cleaning",
			"Ozone Sterilization",
			"Treatment of scratches on internal parts",
		],
	},
	{
		title: "FAREXEL Shield(Matt)",
		old: 19900,
		current: 14900,
		badge: 25,
		img: 6,
		warranty: "10 Years Warranty",
		mid: "4 Installments",
		right: "43 Business Hours",
		details: [
			"Full car protection Matte",
			"Prime Thermal Tint",
			"Windshield protection",
			"Nano Interior",
			"Interior Protection Film",
		],
	},
	{
		title: "Pelable Paint",
		old: 20000,
		current: 12990,
		badge: 35,
		img: 7,
		warranty: "3 Years Warranty",
		mid: "4 Installments",
		right: "10 Business Hours",
		details: [
			"Available in a variety of colors that reflects your style",
			"Scratches-resistant and removable later",
		],
	},
	{
		title: "Black Edition Pelable Paint",
		old: 8000,
		current: 5990,
		badge: 25,
		img: 8,
		warranty: "5 Years Warranty",
		mid: "4 Installments",
		right: "24 Business Hours",
		details: [
			"Transform the car for a sporty and luxurious look in black",
			"Flexible rubber protection with the option to remove later",
			"Scratches and weather resistant",
			"Includes mirrors, rims and wheel arches sprayed in black—removable",
		],
	},
	{
		title: "Black Roof Pelable Paint",
		old: 8000,
		current: 3990,
		badge: 50,
		img: 1,
		warranty: "3 Years Warranty",
		mid: "4 Installments",
		right: "1 Working day",
		details: [
			"Temporary black color for the roof with protection for the original paint",
			"Scratch and weather resistant",
			"Easily removable later",
		],
	},
];

function esc(s) {
	return String(s)
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");
}

function cardHtml(c, idx) {
	const id = `home-vehicle-feature-card-tw-${String(idx + 1).padStart(2, "0")}`;
	const overlayId = `${id}-overlay`;
	const titleId = `${id}-overlay-title`;
	const img = `assets/images/vehicles/vehicle${c.img}.jpg`;
	const warrantyLabel = c.warranty === "—" ? "Warranty N/A" : esc(c.warranty);
	const li = c.details.map((d) => `                                        <li class="home-vehicle-feature-card__overlay-item">
                                            <span class="home-vehicle-feature-card__overlay-check" aria-hidden="true">
                                                <i class="ri-check-line"></i>
                                            </span>
                                            <span>${esc(d)}</span>
                                        </li>`).join("\n");

	return `                        <div
                            class="home-vehicle-feature-card home-vehicle-feature-card--two-wheeler group flex h-full min-h-0 min-w-0 flex-col rounded-[15px] bg-[#171E20]"
                        >
                            <a
                                href="vehicle-details.html"
                                class="home-tw-card__media block overflow-hidden rounded-[15px]"
                            >
                                <img
                                    src="${img}"
                                    class="home-tw-card__img rounded-[15px] transition-all duration-300 ease-in-out group-hover:scale-110"
                                    alt="${esc(c.title)}"
                                >
                                <span class="home-vehicle-discount-badge" aria-hidden="true">${c.badge}% OFF</span>
                            </a>
                            <div class="home-tw-card__body flex min-h-0 flex-1 flex-col p-[20px] md:p-[25px] lg:p-[30px]">
                                <div class="mb-[15px] flex justify-between gap-[15px] rounded-[10px] border border-white/10 bg-white/5 px-[12px] py-[10px] md:mb-[20px] lg:mb-[25px]">
                                    <div class="min-w-0">
                                        <h3 class="!text-white text-base md:text-lg lg:text-xl leading-[1.2] mb-[5px]">
                                            <a
                                                href="vehicle-details.html"
                                                class="hover:text-primary"
                                            >
                                                ${esc(c.title)}
                                            </a>
                                        </h3>
                                        <span class="block font-medium text-[#bbbbbb]">
                                            Commuter
                                        </span>
                                    </div>
                                    <div class="flex-shrink-0 ltr:text-right rtl:text-left">
                                        <span class="block font-bold text-primary mb-[5px] text-base md:text-lg lg:text-xl leading-[1.2]">
                                            SAR ${c.current}
                                        </span>
                                        <span class="block font-medium text-[#bbbbbb] text-13 md:text-sm line-through">
                                            SAR ${c.old}
                                        </span>
                                    </div>
                                </div>
                                <div class="home-tw-card__features grid grid-cols-2 gap-x-[12px] gap-y-[10px] text-center">
                                    <div class="min-w-0">
                                        <div class="mb-[5px] leading-none text-white text-[35px]">
                                            <i class="ri-shield-check-line" aria-hidden="true"></i>
                                        </div>
                                        <span class="block text-13 font-medium leading-[1.35] text-[#bbbbbb] md:text-sm">
                                            ${warrantyLabel}
                                        </span>
                                    </div>
                                    <div class="min-w-0">
                                        <div class="mb-[5px] leading-none text-white text-[35px]">
                                            <i class="ri-bank-card-line" aria-hidden="true"></i>
                                        </div>
                                        <span class="block text-13 font-medium leading-[1.35] text-[#bbbbbb] md:text-sm">
                                            ${esc(c.mid)}
                                        </span>
                                    </div>
                                </div>
                                <div class="home-tw-card__actions mt-auto flex flex-wrap items-center justify-between gap-[15px] pt-[20px] md:pt-[25px] lg:pt-[30px]">
                                    <a
                                        href="vehicles.php"
                                        class="primary-btn"
                                    >
                                        <span>
                                            Book Now
                                        </span>
                                        <i class="ri-calendar-check-line !bg-white !text-black dark:!bg-dark dark:!text-white"></i>
                                    </a>
                                    <button
                                        type="button"
                                        class="home-vehicle-feature-card__see-details inline-flex items-center gap-[8px] text-15 md:text-base lg:text-lg xl:text-xl font-medium text-white hover:text-primary bg-transparent border-0 cursor-pointer p-0"
                                        data-home-vehicle-details-open
                                        aria-expanded="false"
                                        aria-controls="${overlayId}"
                                    >
                                        <span>See Details</span>
                                        <i class="ri-arrow-right-line" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div>
                            <div
                                id="${overlayId}"
                                class="home-vehicle-feature-card__overlay"
                                role="dialog"
                                aria-modal="true"
                                aria-labelledby="${titleId}"
                                aria-hidden="true"
                            >
                                <button
                                    type="button"
                                    class="home-vehicle-feature-card__overlay-close"
                                    data-home-vehicle-details-close
                                    aria-label="Close service details"
                                >
                                    <i class="ri-arrow-down-s-line text-lg" aria-hidden="true"></i>
                                </button>
                                <h3
                                    id="${titleId}"
                                    class="home-vehicle-feature-card__overlay-title"
                                >
                                    ${esc(c.title)}
                                </h3>
                                <div class="home-vehicle-feature-card__overlay-body">
                                    <p class="text-[#bbbbbb] text-sm mb-[12px]">Service details</p>
                                    <ul class="home-vehicle-feature-card__overlay-list">
${li}
                                    </ul>
                                </div>
                                <p class="home-vehicle-feature-card__overlay-footer">
                                    <i class="ri-time-line home-vehicle-feature-card__overlay-footer-icon" aria-hidden="true"></i>
                                    ${esc(c.right)}
                                </p>
                                <p class="home-vehicle-feature-card__overlay-footer home-vehicle-feature-card__overlay-footer-secondary">
                                    <i class="ri-bank-card-line home-vehicle-feature-card__overlay-footer-icon" aria-hidden="true"></i>
                                    ${esc(c.mid)}
                                </p>
                                <button
                                    type="button"
                                    class="home-vehicle-feature-card__overlay-bottom-close"
                                    data-home-vehicle-details-close
                                    aria-label="Close service details"
                                >
                                    Close
                                </button>
                            </div>
                        </div>`;
}

const body = cards.map((c, i) => cardHtml(c, i)).join("\n");
const out = `                    <div
                        id="home-vehicles-grid-two-wheeler"
                        class="hidden grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 items-stretch gap-[25px]"
                    >
${body}
                    </div>`;

const outPath = path.join(__dirname, "..", "tw-wheeler-grid-snippet.html");
fs.writeFileSync(outPath, out, "utf8");
console.log("Wrote", outPath);
