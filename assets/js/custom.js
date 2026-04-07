(function () {
	"use strict";

	// Helpers
	const $ = (sel, root = document) => root.querySelector(sel);
	const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

	/** Home Vehicles: filter cards by service tab (wired from pagination block). */
	let applyHomeVehicleServiceFilter = () => {};
	/** Home Vehicles: Car + Small + Services&Packages card pricing (wired from pagination block). */
	let refreshHomeVehiclePricing = () => {};
	/** Swiper instance for location promo cards (initialized when Swiper loads). */
	let homeLocationsSwiperInstance = null;
	/** Two-Wheeler + Additional Services: Engine Wash / Steam Wash / Express Wash carousel. */
	let homeTwoWheelerAdditionalSwiperInstance = null;

	/** When Additional Services tabs target the two-wheeler swiper, slide to the matching card (manifest order). */
	let syncHomeAdditionalServicesTabView = () => {};

	/** Swap vehicles grid ↔ Additional Services location swiper(s). */
	const syncHomeVehiclesGridView = () => {
		const t = ($("#home-vehicle-type")?.value || "").trim();
		const s = ($("#home-vehicle-size")?.value || "").trim();
		const c = ($("#home-service-category")?.value || "").trim();
		const sizeOkCar = ["small", "medium", "large"].includes(s);
		const sizeOkTw = ["commuter", "sport", "cruiser", "touring"].includes(s);

		const showCarAdditionalServices =
			t === "car" && sizeOkCar && c === "additional_services";
		const showTwoWheelerAdditionalServices =
			t === "two_wheeler" && sizeOkTw && c === "additional_services";
		const showTwoWheelerServicesPackages =
			t === "two_wheeler" && sizeOkTw && c === "services_packages";

		const vehGrid = $("#home-vehicles-grid");
		const twGrid = $("#home-vehicles-grid-two-wheeler");
		const locWrap = $("#home-vehicles-locations-wrap");
		const locWrapTw = $("#home-vehicles-locations-wrap-two-wheeler");
		const pag = $("#home-vehicles-pagination");
		const explore = $("#home-vehicles-explore-wrap");
		if (!vehGrid || !locWrap) return;

		const showAnyAdditional = showCarAdditionalServices || showTwoWheelerAdditionalServices;

		vehGrid.classList.toggle("hidden", showAnyAdditional || showTwoWheelerServicesPackages);
		twGrid?.classList.toggle("hidden", !showTwoWheelerServicesPackages || showAnyAdditional);
		locWrap.classList.toggle("hidden", !showCarAdditionalServices);
		locWrapTw?.classList.toggle("hidden", !showTwoWheelerAdditionalServices);
		pag?.classList.toggle("hidden", showAnyAdditional);
		explore?.classList.toggle("hidden", showAnyAdditional);

		if (homeLocationsSwiperInstance) {
			if (showCarAdditionalServices) {
				requestAnimationFrame(() => {
					homeLocationsSwiperInstance.update();
					homeLocationsSwiperInstance.autoplay?.start();
				});
			} else {
				homeLocationsSwiperInstance.autoplay?.stop();
			}
		}
		if (homeTwoWheelerAdditionalSwiperInstance) {
			if (showTwoWheelerAdditionalServices) {
				requestAnimationFrame(() => {
					homeTwoWheelerAdditionalSwiperInstance.update();
					homeTwoWheelerAdditionalSwiperInstance.autoplay?.start();
				});
			} else {
				homeTwoWheelerAdditionalSwiperInstance.autoplay?.stop();
			}
		}

		const activeTab = document.querySelector(
			'#home-service-item-tabs a[data-service-item][aria-current="true"]'
		);
		syncHomeAdditionalServicesTabView(activeTab?.dataset?.serviceItem || "all");

		refreshHomeVehiclePricing?.();
	};

	// Preloader
	const preloader = $("#preloader");
	if (preloader) {
		window.addEventListener("load", () => {
			preloader.classList.add("hidden");
		});
	}

	// Navbar Sticky
	const navbar = $("#navbar");
	if (navbar) {
		window.addEventListener("scroll", () => {
			navbar.classList.toggle("navbar-sticky", window.scrollY >= 120);
		});
	}

	// Search Box
	const searchBtn = $("#searchBtn");
	const searchBox = $("#searchBox");
	if (searchBtn && searchBox) {
		searchBtn.addEventListener("click", () => {
			searchBtn.classList.toggle("active");
			searchBox.classList.toggle("active");
		});
	}

	// Menu Toggle Button (Sidebar Modal)
	const toggles = $$(".navbar-burger-toggle");
	const menu = $(".sidebar-modal");
	const backdrop = $(".backdrop");
	const closeBtn = menu ? $("button", menu) : null;
	if (toggles.length && menu && backdrop) {
		const openMenu = () => {
			menu.classList.add("show");
			backdrop.classList.add("show");
		};
		const closeMenu = () => {
			menu.classList.remove("show");
			backdrop.classList.remove("show");
		};
		toggles.forEach((btn) => btn.addEventListener("click", openMenu));
		closeBtn?.addEventListener("click", closeMenu);
		backdrop.addEventListener("click", closeMenu);
	}

	// Menu Toggle Button (Dashboard Sidebar Modal)
	const dashboardSidebar = document.querySelector(".dashboard-sidebar");
	const dashboardSidebarToggles = document.querySelectorAll(".dashboard-sidebar-toggle");
	if (dashboardSidebar && dashboardSidebarToggles.length) {
		dashboardSidebarToggles.forEach((btn) => {
			btn.addEventListener("click", () => {
			dashboardSidebar.classList.toggle("show");
			});
		});
	}

	// ScrollCue
	if (typeof scrollCue !== "undefined") {
		scrollCue.init();
	}

	// Swiper Sliders (only init if wrapper exists)
	if (typeof Swiper !== "undefined") {

		// Vehicles Swiper
		if ($(".vehiclesSwiper")) {
			new Swiper(".vehiclesSwiper", {
				loop: true,
				slidesPerView: 1,
				spaceBetween: 25,
				autoplay: {
					delay: 3500,
					disableOnInteraction: false
				},
				breakpoints: {
					1280: {
						slidesPerView: 2
					}
				},
				pagination: {
					el: ".vehicles-swiper-pagination",
					clickable: true
				},
			});
		}

		// Testimonials Swiper
		if ($(".testimonialsSwiper")) {
			new Swiper(".testimonialsSwiper", {
				loop: true,
				slidesPerView: 1,
				spaceBetween: 25,
				autoplay: {
					delay: 3500,
					disableOnInteraction: false
				},
				breakpoints: {
					640: {
						slidesPerView: 2
					},
					1024: {
						slidesPerView: 3
					},
					1536: {
						slidesPerView: 4
					},
				},
				pagination: {
					el: ".testimonials-swiper-pagination",
					clickable: true
				},
			});
		}

		// Reviews Swiper
		if ($(".reviewsSwiper")) {
			new Swiper(".reviewsSwiper", {
				loop: true,
				slidesPerView: 1,
				spaceBetween: 25,
				autoplay: {
					delay: 3500,
					disableOnInteraction: false
				},
				breakpoints: {
					640: {
						slidesPerView: 2
					},
					1024: {
						slidesPerView: 3
					},
					1536: {
						slidesPerView: 4
					},
				},
				pagination: {
					el: ".reviews-swiper-pagination",
					clickable: true
				},
			});
		}

		// Location cards under Vehicles: autoplay carousel; slide widths match service grid (1 / 2 / 3 columns)
		if ($(".homeLocationsSwiper")) {
			homeLocationsSwiperInstance = new Swiper(".homeLocationsSwiper", {
				loop: true,
				slidesPerView: 1,
				spaceBetween: 25,
				autoplay: {
					delay: 3500,
					disableOnInteraction: false
				},
				breakpoints: {
					768: {
						slidesPerView: 2
					},
					1280: {
						slidesPerView: 3
					}
				},
				pagination: {
					el: ".home-locations-swiper-pagination",
					clickable: true
				},
				observer: true,
				observeParents: true,
				watchOverflow: true
			});
		}

		// Two-Wheeler Additional Services: same layout as car block; 3 slides (see HOME_ADDITIONAL_SERVICES_MANIFEST)
		if ($(".homeTwoWheelerAdditionalSwiper")) {
			homeTwoWheelerAdditionalSwiperInstance = new Swiper(".homeTwoWheelerAdditionalSwiper", {
				loop: false,
				slidesPerView: 1,
				spaceBetween: 25,
				autoplay: {
					delay: 3500,
					disableOnInteraction: false
				},
				breakpoints: {
					768: {
						slidesPerView: 2
					},
					1280: {
						slidesPerView: 3
					}
				},
				pagination: {
					el: ".home-two-wheeler-locations-swiper-pagination",
					clickable: true
				},
				observer: true,
				observeParents: true,
				watchOverflow: true
			});
		}

		syncHomeAdditionalServicesTabView = (serviceItem) => {
			const t = ($("#home-vehicle-type")?.value || "").trim();
			const s = ($("#home-vehicle-size")?.value || "").trim();
			const c = ($("#home-service-category")?.value || "").trim();
			if (
				t !== "two_wheeler" ||
				!["commuter", "sport", "cruiser", "touring"].includes(s) ||
				c !== "additional_services"
			) {
				return;
			}
			if (!homeTwoWheelerAdditionalSwiperInstance) return;
			const keys =
				window.HOME_ADDITIONAL_SERVICES_MANIFEST?.two_wheeler?.additional_services?.serviceItemKeys;
			if (!keys?.length) return;
			const key = serviceItem || "all";
			if (key === "all") {
				homeTwoWheelerAdditionalSwiperInstance.slideTo(0, 0);
				return;
			}
			const idx = keys.indexOf(key);
			if (idx >= 0) homeTwoWheelerAdditionalSwiperInstance.slideTo(idx, 0);
		};

	}

	// Accordion
	$$(".accordion").forEach((accordion) => {
		const items = $$(".accordion-item", accordion);
		items.forEach((item) => {
			const toggle = $(".accordion-toggle", item);
			const panel = $(".accordion-panel", item);
			if (!toggle || !panel) return;
			toggle.addEventListener("click", () => {
				// Close only within this accordion
				items.forEach((i) => {
					i.classList.remove("active");
					$(".accordion-panel", i)?.classList.add("hidden");
				});
				// Open clicked item
				item.classList.add("active");
				panel.classList.remove("hidden");
			});
		});
	});

	// Tabs (multiple groups)
	$$(".tabs").forEach((tabsBlock) => {
		const navLinks = $$(".nav-link", tabsBlock);
		const tabPanes = $$(".tab-pane", tabsBlock);
		if (!navLinks.length || !tabPanes.length) return;
		navLinks.forEach((btn, idx) => {
			btn.addEventListener("click", () => {
				navLinks.forEach((link) => link.classList.remove("active"));
				tabPanes.forEach((pane) => pane.classList.remove("active"));
				btn.classList.add("active");
				tabPanes[idx]?.classList.add("active");
			});
		});
	});

	// Home Vehicles Filter (dependent dropdown/buttons)
	const homeVehicleType = $("#home-vehicle-type");
	const homeVehicleSize = $("#home-vehicle-size");
	const homeVehicleSizeLabel = $("#home-vehicle-size-label");
	const homeServiceCategory = $("#home-service-category");
	const homeServiceItemsTabs = $("#home-service-item-tabs");
	if (homeVehicleType && homeVehicleSize && homeVehicleSizeLabel && homeServiceCategory && homeServiceItemsTabs) {
		const vehicleSizeByType = {
			car: [
				{ value: "small", label: "Small" },
				{ value: "medium", label: "Medium" },
				{ value: "large", label: "Large" },
			],
			two_wheeler: [
				{ value: "commuter", label: "Commuter" },
				{ value: "sport", label: "Sport" },
				{ value: "cruiser", label: "Cruiser" },
				{ value: "touring", label: "Touring" },
			],
		};

		const serviceValuesByCategoryAndVehicleType = {
			services_packages: {
				car: [
				{ value: "", label: "Choose Value" },
				{ value: "all", label: "All" },
				{ value: "best_sellers", label: "Best Sellers" },
				{ value: "polishing", label: "Polishing" },
				{ value: "thermal_tint", label: "Thermal Tint" },
					{ value: "nano_ceramic", label: "Nano Ceramic" },
				{ value: "ppf", label: "PPF" },
				{ value: "packages", label: "Packages" },
				{ value: "peelable_paint", label: "Peelable Paint" },
				{ value: "dash_cam", label: "Dash Cam" },
			],
				two_wheeler: [
					{ value: "", label: "Choose Value" },
					{ value: "all", label: "All" },
					{ value: "best_sellers", label: "Best Sellers" },
					{ value: "polishing", label: "Polishing" },
					{ value: "nano_ceramic", label: "Nano Ceramic" },
					{ value: "ppf", label: "PPF" },
					{ value: "packages", label: "Packages" },
					{ value: "peelable_paint", label: "Peelable Paint" },
				],
			},
			additional_services: {
				car: [
				{ value: "", label: "Choose Value" },
				{ value: "all", label: "All" },
					{ value: "interior_detailing", label: "Interior Detailing" },
				{ value: "engine_wash", label: "Engine Wash" },
				{ value: "ozone_sterilization", label: "Ozone Sterilization" },
				{ value: "removing_thermal_tint", label: "Removing Thermal Tint" },
				{ value: "removing_full_ppf", label: "Removing Full PPF" },
					{ value: "interior_stretches_correction", label: "Interior Stretches Correction" },
					{ value: "steam_washing", label: "Steam Washing" },
					{ value: "express_washing", label: "Express Washing" },
				],
				two_wheeler: [
					{ value: "", label: "Choose Value" },
					{ value: "all", label: "All" },
					{ value: "engine_wash", label: "Engine Wash" },
				{ value: "steam_washing", label: "Steam Washing" },
				{ value: "express_washing", label: "Express Washing" },
			],
			},
		};

		const classes = {
			active:
				"inline-block font-medium bg-primary border border-primary text-white rounded-[5px] py-[6px] md:py-[8px] px-[15px] md:px-[19px]",
			inactive:
				"inline-block font-medium border border-[#D9D9D9]/30 text-white rounded-[5px] py-[6px] md:py-[8px] px-[15px] md:px-[19px] hover:bg-primary hover:border-primary",
		};

		const setSelectOptions = (selectEl, options) => {
			selectEl.innerHTML = "";
			options.forEach((opt) => {
				const o = document.createElement("option");
				o.value = opt.value;
				o.textContent = opt.label;
				selectEl.appendChild(o);
			});
			selectEl.value = "";
		};

		const syncHomeServiceCategoryOptions = () => {
			// Services dropdown should not show its options until Vehicle Size is selected.
			const hasSize = !!homeVehicleSize.value;
			if (!hasSize) {
				setSelectOptions(homeServiceCategory, [{ value: "", label: "Choose Value" }]);
				return;
			}

			setSelectOptions(homeServiceCategory, [
				{ value: "", label: "Choose Value" },
				{ value: "services_packages", label: "Services & Packages" },
				{ value: "additional_services", label: "Additional Services" },
			]);
		};

		const syncVehicleSizeType = () => {
			const type = homeVehicleType.value;
			if (type === "car") {
				homeVehicleSizeLabel.textContent = "Select Vehicle Size";
				setSelectOptions(homeVehicleSize, [{ value: "", label: "Choose Value" }, ...vehicleSizeByType.car]);
				return;
			}

			if (type === "two_wheeler") {
				homeVehicleSizeLabel.textContent = "Select Two-Wheeler Type";
				setSelectOptions(homeVehicleSize, [
					{ value: "", label: "Choose Value" },
					...vehicleSizeByType.two_wheeler,
				]);
				return;
			}

			homeVehicleSizeLabel.textContent = "Select Vehicle Size";
			setSelectOptions(homeVehicleSize, [{ value: "", label: "Choose Value" }]);
		};

		const renderHomeServiceItems = () => {
			// Default behavior:
			// - If Services dropdown is NOT selected yet, always show the default Car + Services&Packages list.
			// - This prevents switching the service buttons just by changing Vehicle Type.
			const serviceCategorySelected = homeServiceCategory.value;
			const vehicleTypeSelected = homeVehicleType.value;

			const vehicleTypeForItems = serviceCategorySelected ? vehicleTypeSelected || "car" : "car";
			const serviceCategoryForItems = serviceCategorySelected ? serviceCategorySelected : "services_packages";

			homeServiceItemsTabs.innerHTML = "";

			const opts =
				serviceValuesByCategoryAndVehicleType?.[serviceCategoryForItems]?.[vehicleTypeForItems] || [
					{ value: "", label: "Choose Value" },
				];
			const filtered = opts.filter((o) => o.value);

			if (!filtered.length) {
				// Nothing to render.
				return;
			}

			const activeOpt = filtered.find((o) => o.value === "all") || filtered[0];

			filtered.forEach((opt) => {
				const a = document.createElement("a");
				a.href = "#";
				a.textContent = opt.label;
				a.dataset.serviceItem = opt.value;
				a.dataset.serviceCategory = serviceCategoryForItems;
				a.className = opt.value === activeOpt.value ? classes.active : classes.inactive;
				if (opt.value === activeOpt.value) a.setAttribute("aria-current", "true");
				homeServiceItemsTabs.appendChild(a);
			});
			applyHomeVehicleServiceFilter("all");
		};

		homeServiceItemsTabs.addEventListener("click", (e) => {
			const tab = e.target.closest("a[data-service-item]");
			if (!tab) return;
			e.preventDefault();
			const serviceItem = tab.dataset.serviceItem;
			if (!serviceItem) return;
			$$("a[data-service-item]", homeServiceItemsTabs).forEach((el) => {
				el.className = el === tab ? classes.active : classes.inactive;
				if (el === tab) el.setAttribute("aria-current", "true");
				else el.removeAttribute("aria-current");
			});
			applyHomeVehicleServiceFilter(serviceItem);
			syncHomeAdditionalServicesTabView(serviceItem);
		});

		// Init + update on change (dropdowns start at Choose Value; cards use Car + Small + S&P via getEffectiveHomeVehicleFilters)
		syncVehicleSizeType();
		syncHomeServiceCategoryOptions();
		renderHomeServiceItems();
		syncHomeVehiclesGridView();

		homeVehicleType.addEventListener("change", () => {
			syncVehicleSizeType();
			syncHomeServiceCategoryOptions();
			renderHomeServiceItems();
			refreshHomeVehiclePricing();
			syncHomeVehiclesGridView();
		});
		homeVehicleSize.addEventListener("change", () => {
			syncHomeServiceCategoryOptions();
			renderHomeServiceItems();
			refreshHomeVehiclePricing();
			syncHomeVehiclesGridView();
		});
		homeServiceCategory.addEventListener("change", () => {
			renderHomeServiceItems();
			refreshHomeVehiclePricing();
			syncHomeVehiclesGridView();
		});
	}

	// Home Vehicles: service filter + pagination (6 per page, up to 36 cards)
	const homeVehiclesPagination = $("#home-vehicles-pagination");
	const homeVehiclesGrid = $("#home-vehicles-grid");
	const homeTwoWheelerGrid = $("#home-vehicles-grid-two-wheeler");
	if (homeVehiclesPagination && homeVehiclesGrid) {
		const perPage = 6;
		const targetTotalCards = 36;

		const isTwoWheelerServicesPackagesView = () => {
			const t = ($("#home-vehicle-type")?.value || "").trim();
			const s = ($("#home-vehicle-size")?.value || "").trim();
			const c = ($("#home-service-category")?.value || "").trim();
			return (
				t === "two_wheeler" &&
				["commuter", "sport", "cruiser", "touring"].includes(s) &&
				c === "services_packages"
			);
		};

		const normalizeTitle = (raw) =>
			String(raw || "")
				.replace(/\s+/g, " ")
				.trim()
				.toLowerCase();

		const getCardTitle = (card) => {
			const titleEl = card.querySelector(".home-vehicle-feature-card__overlay-title");
			return normalizeTitle(titleEl?.textContent || "");
		};

		// Keys match data-service-item on tabs (services_packages / car). Titles match index.html overlay headings.
		const serviceTitlesByFilterKey = {
			all: null,
			best_sellers: [
				"basic thermal tint",
				"prime thermal tint",
				"renew it back package",
				"renew it back packages",
				"farexel basic protection",
				"farexel plus protection",
				"paint protection film(full)",
				"farexel shield",
			],
			polishing: ["bright polishing", "farexel full polishing", "aqueous bright polishing"],
			thermal_tint: [
				"basic thermal tint",
				"prime thermal tint",
				"premium thermal tint",
				"windshield protection film",
			],
			nano_ceramic: [
				"exterior nano ceramic 6 layers",
				"full glass nano ceramic",
				"interior nano ceramic",
			],
			ppf: [
				"paint protection film(partial)",
				"paint protection film(half)",
				"paint protection film(full front)",
				"paint protection film(full)",
				"paint protection film full(matt)",
				"full colored protection film",
				"interior protection film",
			],
			packages: [
				"renew it back packages",
				"farexel basic protection",
				"farexel plus protection",
				"farexel shield",
				"farexel shield(matt)",
			],
			peelable_paint: [
				"pelable paint",
				"black edition pelable paint",
				"black roof pelable paint",
			],
			dash_cam: [
				"ddpai n5 dual dash cam front and rear camera 140°",
				"70mai x800 4k dash cam front and rear camera 360°",
			],
		};

		/** Two-Wheeler + Commuter|Sport|Cruiser|Touring + Services & Packages — 17 overlay titles (see #home-vehicles-grid-two-wheeler). */
		const serviceTitlesByFilterKeyTwoWheeler = {
			all: null,
			best_sellers: [
				"bright polishing",
				"farexel full polishing",
				"farexel shield",
				"paint protection film(full)",
				"renew it back packages",
				"farexel basic protection",
				"pelable paint",
			],
			polishing: ["bright polishing", "farexel full polishing", "aqueous bright polishing"],
			thermal_tint: [],
			nano_ceramic: [
				"exterior nano ceramic 6 layers",
				"full glass nano ceramic",
				"interior nano ceramic",
			],
			ppf: [
				"paint protection film(full)",
				"paint protection film full(matt)",
				"full colored protection film",
			],
			packages: [
				"renew it back packages",
				"farexel basic protection",
				"farexel plus protection",
				"farexel shield",
				"farexel shield(matt)",
			],
			peelable_paint: [
				"pelable paint",
				"black edition pelable paint",
				"black roof pelable paint",
			],
			dash_cam: [],
		};

		const getCarCards = () => {
			const all = Array.from(homeVehiclesGrid.children).filter((el) => el.classList.contains("group"));
			return all.slice(0, Math.min(targetTotalCards, all.length));
		};

		const getTwoWheelerCards = () =>
			Array.from(homeTwoWheelerGrid?.children || []).filter((el) => el.classList.contains("group"));

		const getCards = () =>
			isTwoWheelerServicesPackagesView() ? getTwoWheelerCards() : getCarCards();

		const cards = getCarCards();

		/** Car + Small / Medium / Large + Services & Packages: current / old price (USD, no decimals in source). */
		const carSmallPricesByTab = {
			best_sellers: {
				"basic thermal tint": { current: 890, old: 1200 },
				"prime thermal tint": { current: 1290, old: 1900 },
				"renew it back package": { current: 1390, old: 2100 },
				"renew it back packages": { current: 1390, old: 2100 },
				"farexel basic protection": { current: 1990, old: 2900 },
				"farexel plus protection": { current: 4290, old: 7900 },
				"paint protection film(full)": { current: 8890, old: 12000 },
				"farexel shield": { current: 12890, old: 17400 },
			},
			polishing: {
				"bright polishing": { current: 590, old: 750 },
				"farexel full polishing": { current: 690, old: 1100 },
				"aqueous bright polishing": { current: 790, old: 1050 },
			},
			thermal_tint: {
				"basic thermal tint": { current: 890, old: 1200 },
				"prime thermal tint": { current: 1290, old: 1900 },
				"premium thermal tint": { current: 2290, old: 2900 },
				"windshield protection film": { current: 890, old: 1000 },
			},
			nano_ceramic: {
				"exterior nano ceramic 6 layers": { current: 1890, old: 3000 },
				"full glass nano ceramic": { current: 690, old: 800 },
				"interior nano ceramic": { current: 1290, old: 2500 },
			},
			ppf: {
				"paint protection film(partial)": { current: 1290, old: 1700 },
				"paint protection film(half)": { current: 1790, old: 2100 },
				"paint protection film(full front)": { current: 2990, old: 4000 },
				"paint protection film(full)": { current: 8890, old: 12000 },
				"paint protection film full(matt)": { current: 10890, old: 14500 },
				"full colored protection film": { current: 12390, old: 18000 },
				"interior protection film": { current: 1190, old: 1500 },
			},
			packages: {
				"renew it back packages": { current: 1390, old: 2100 },
				"renew it back package": { current: 1390, old: 2100 },
				"farexel basic protection": { current: 1190, old: 2900 },
				"farexel plus protection": { current: 4290, old: 7900 },
				"farexel shield": { current: 12890, old: 17400 },
				"farexel shield(matt)": { current: 14890, old: 19900 },
			},
			peelable_paint: {
				"pelable paint": { current: 12990, old: 20000 },
				"black edition pelable paint": { current: 5990, old: 800 },
				"black roof pelable paint": { current: 3990, old: 8000 },
			},
			dash_cam: {
				"ddpai n5 dual dash cam front and rear camera 140°": { current: 890, old: 1500 },
				"70mai x800 4k dash cam front and rear camera 360°": { current: 1590, old: 2500 },
			},
		};

		const carMediumPricesByTab = {
			best_sellers: {
				"basic thermal tint": { current: 990, old: 1300 },
				"prime thermal tint": { current: 1390, old: 2000 },
				"renew it back package": { current: 1490, old: 2350 },
				"renew it back packages": { current: 1490, old: 2350 },
				"farexel basic protection": { current: 2990, old: 3100 },
				"farexel plus protection": { current: 4890, old: 9300 },
				"paint protection film(full)": { current: 10590, old: 14000 },
				"farexel shield": { current: 13890, old: 19800 },
			},
			polishing: {
				"bright polishing": { current: 690, old: 850 },
				"farexel full polishing": { current: 790, old: 1250 },
				"aqueous bright polishing": { current: 890, old: 1200 },
			},
			thermal_tint: {
				"basic thermal tint": { current: 990, old: 1300 },
				"prime thermal tint": { current: 1390, old: 2000 },
				"premium thermal tint": { current: 2390, old: 3100 },
				"windshield protection film": { current: 990, old: 1000 },
			},
			nano_ceramic: {
				"exterior nano ceramic 6 layers": { current: 2290, old: 3200 },
				"full glass nano ceramic": { current: 790, old: 900 },
				"interior nano ceramic": { current: 1390, old: 2700 },
			},
			ppf: {
				"paint protection film(partial)": { current: 1390, old: 1800 },
				"paint protection film(half)": { current: 1890, old: 2200 },
				"paint protection film(full front)": { current: 3490, old: 5000 },
				"paint protection film(full)": { current: 10590, old: 14000 },
				"paint protection film full(matt)": { current: 12590, old: 16500 },
				"full colored protection film": { current: 12890, old: 20000 },
				"interior protection film": { current: 1390, old: 1700 },
			},
			packages: {
				"renew it back packages": { current: 1490, old: 2350 },
				"renew it back package": { current: 1490, old: 2350 },
				"farexel basic protection": { current: 2190, old: 3100 },
				"farexel plus protection": { current: 4890, old: 9300 },
				"farexel shield": { current: 13800, old: 19800 },
				"farexel shield(matt)": { current: 15890, old: 22300 },
			},
			peelable_paint: {
				"pelable paint": { current: 14990, old: 22000 },
				"black edition pelable paint": { current: 6990, old: 1000 },
				"black roof pelable paint": { current: 4990, old: 9000 },
			},
			dash_cam: {
				"ddpai n5 dual dash cam front and rear camera 140°": { current: 890, old: 1500 },
				"70mai x800 4k dash cam front and rear camera 360°": { current: 1590, old: 2500 },
			},
		};

		const carLargePricesByTab = {
			best_sellers: {
				"basic thermal tint": { current: 1090, old: 1500 },
				"prime thermal tint": { current: 1490, old: 2200 },
				"renew it back package": { current: 1590, old: 2650 },
				"renew it back packages": { current: 1590, old: 2650 },
				"farexel basic protection": { current: 2390, old: 3450 },
				"farexel plus protection": { current: 5490, old: 10700 },
				"paint protection film(full)": { current: 11590, old: 16000 },
				"farexel shield": { current: 14890, old: 22300 },
			},
			polishing: {
				"bright polishing": { current: 790, old: 950 },
				"farexel full polishing": { current: 890, old: 1450 },
				"aqueous bright polishing": { current: 890, old: 1300 },
			},
			thermal_tint: {
				"basic thermal tint": { current: 1090, old: 1500 },
				"prime thermal tint": { current: 1490, old: 2200 },
				"premium thermal tint": { current: 2490, old: 3300 },
				"windshield protection film": { current: 1090, old: 1200 },
			},
			nano_ceramic: {
				"exterior nano ceramic 6 layers": { current: 2490, old: 3400 },
				"full glass nano ceramic": { current: 890, old: 1000 },
				"interior nano ceramic": { current: 1490, old: 2900 },
			},
			ppf: {
				"paint protection film(partial)": { current: 1490, old: 1950 },
				"paint protection film(half)": { current: 1990, old: 2350 },
				"paint protection film(full front)": { current: 3990, old: 6000 },
				"paint protection film(full)": { current: 11590, old: 16000 },
				"paint protection film full(matt)": { current: 13390, old: 18500 },
				"full colored protection film": { current: 13390, old: 22000 },
				"interior protection film": { current: 1590, old: 1900 },
			},
			packages: {
				"renew it back packages": { current: 1590, old: 2650 },
				"renew it back package": { current: 1590, old: 2650 },
				"farexel basic protection": { current: 2390, old: 3450 },
				"farexel plus protection": { current: 5490, old: 10700 },
				"farexel shield": { current: 14890, old: 22300 },
				"farexel shield(matt)": { current: 16890, old: 24800 },
			},
			peelable_paint: {
				"pelable paint": { current: 16990, old: 24000 },
				"black edition pelable paint": { current: 7990, old: 1200 },
				"black roof pelable paint": { current: 5990, old: 10000 },
			},
			dash_cam: {
				"ddpai n5 dual dash cam front and rear camera 140°": { current: 890, old: 1500 },
				"70mai x800 4k dash cam front and rear camera 360°": { current: 1590, old: 2500 },
			},
		};

		const mergeOrderForAllTab = [
			"polishing",
			"thermal_tint",
			"nano_ceramic",
			"ppf",
			"peelable_paint",
			"dash_cam",
			"packages",
			"best_sellers",
		];
		const mergedAllSmallCarPrices = {};
		mergeOrderForAllTab.forEach((k) => {
			Object.assign(mergedAllSmallCarPrices, carSmallPricesByTab[k]);
		});

		const mergedAllMediumCarPrices = {};
		mergeOrderForAllTab.forEach((k) => {
			Object.assign(mergedAllMediumCarPrices, carMediumPricesByTab[k]);
		});

		const mergedAllLargeCarPrices = {};
		mergeOrderForAllTab.forEach((k) => {
			Object.assign(mergedAllLargeCarPrices, carLargePricesByTab[k]);
		});

		const fmtSar = (n) => `SAR ${n}`;

		const captureHomeCardDefaultPrices = () => {
			[...getCarCards(), ...getTwoWheelerCards()].forEach((card) => {
				if (card.dataset.homePriceCaptured === "1") return;
				const priceCol = card.querySelector(".ltr\\:text-right") || card.querySelector(".rtl\\:text-left");
				const currentEl = priceCol?.querySelector(".text-primary");
				const oldEl = priceCol?.querySelector(".line-through");
				if (!currentEl) return;
				card.dataset.homePriceDefaultCurrent = currentEl.textContent.trim();
				card.dataset.homePriceDefaultOld = oldEl ? oldEl.textContent.trim() : "";
				card.dataset.homePriceCaptured = "1";
			});
		};

		captureHomeCardDefaultPrices();

		const captureHomeTwoWheelerAdditionalDefaultPrices = () => {
			const grid = $("#home-vehicles-locations-grid-two-wheeler");
			if (!grid) return;
			grid.querySelectorAll(".swiper-slide[data-additional-service-key]").forEach((slide) => {
				if (slide.dataset.homeTwAdditionalPriceCaptured === "1") return;
				const col = slide.querySelector(".home-additional-card__prices");
				const cur = col?.querySelector(".text-primary");
				const old = col?.querySelector(".line-through");
				if (!cur) return;
				slide.dataset.homeTwAdditionalDefaultCurrent = cur.textContent.trim();
				slide.dataset.homeTwAdditionalDefaultOld = old ? old.textContent.trim() : "";
				const badge = slide.querySelector(".home-additional-card__discount-badge");
				if (badge) slide.dataset.homeTwAdditionalDefaultBadge = badge.textContent.trim();
				slide.dataset.homeTwAdditionalPriceCaptured = "1";
			});
		};
		captureHomeTwoWheelerAdditionalDefaultPrices();

		let currentFilterKey = "all";

		/**
		 * When all dropdowns are "Choose Value", or Car with unset size/category, behave as Car + Small + Services & Packages.
		 * Explicit Two-Wheeler never uses car package pricing.
		 */
		const getEffectiveHomeVehicleFilters = () => {
			const t = ($("#home-vehicle-type")?.value || "").trim();
			const s = ($("#home-vehicle-size")?.value || "").trim();
			const c = ($("#home-service-category")?.value || "").trim();

			if (t === "two_wheeler") {
				const twSizes = ["commuter", "sport", "cruiser", "touring"];
				const labelMap = {
					commuter: "Commuter",
					sport: "Sport",
					cruiser: "Cruiser",
					touring: "Touring",
				};
				if (twSizes.includes(s) && c === "services_packages") {
					return {
						useCarPackagesPricing: false,
						labelText: null,
						twoWheelerSizeLabel: labelMap[s] || null,
					};
				}
				return { useCarPackagesPricing: false, labelText: null, twoWheelerSizeLabel: null };
			}

			const effType = t || "car";
			const effCat = c || "services_packages";
			const effSize = s || "small";

			const useCarPackagesPricing =
				effType === "car" &&
				effCat === "services_packages" &&
				(effSize === "small" || effSize === "medium" || effSize === "large");

			let labelText = null;
			if (effType === "car" && effCat === "services_packages") {
				if (effSize === "small") labelText = "Small Vehicles";
				else if (effSize === "medium") labelText = "Mid-Size Vehicles";
				else if (effSize === "large") labelText = "Large Vehicles";
			}

			return { useCarPackagesPricing, effSize, labelText, twoWheelerSizeLabel: null };
		};

		const applyVehiclePricing = () => {
			const { useCarPackagesPricing, effSize } = getEffectiveHomeVehicleFilters();

			getCarCards().forEach((card) => {
				const priceCol = card.querySelector(".ltr\\:text-right") || card.querySelector(".rtl\\:text-left");
				const currentEl = priceCol?.querySelector(".text-primary");
				const oldEl = priceCol?.querySelector(".line-through");
				if (!currentEl || card.dataset.homePriceCaptured !== "1") return;

				const restore = () => {
					currentEl.textContent = card.dataset.homePriceDefaultCurrent;
					if (oldEl) oldEl.textContent = card.dataset.homePriceDefaultOld || "";
				};

				if (!useCarPackagesPricing) {
					restore();
					return;
				}

				let tabMaps = carSmallPricesByTab;
				let mergedAll = mergedAllSmallCarPrices;
				if (effSize === "medium") {
					tabMaps = carMediumPricesByTab;
					mergedAll = mergedAllMediumCarPrices;
				} else if (effSize === "large") {
					tabMaps = carLargePricesByTab;
					mergedAll = mergedAllLargeCarPrices;
				}

				const title = getCardTitle(card);
				const tabMap =
					currentFilterKey === "all" ? mergedAll : tabMaps[currentFilterKey];
				const entry = tabMap?.[title];
				if (!entry) {
					restore();
					return;
				}
				currentEl.textContent = fmtSar(entry.current);
				if (oldEl) oldEl.textContent = fmtSar(entry.old);
			});
		};

		const twSpSizes = ["commuter", "sport", "cruiser", "touring"];
		const twoWheelerServiceImagePaths = [
			"assets/images/bike_service_images/Bike1.jpg",
			"assets/images/bike_service_images/Bike2.jpg",
			"assets/images/bike_service_images/Bike3.jpg",
			"assets/images/bike_service_images/Bike4.jpg",
			"assets/images/bike_service_images/Bike5.jpg",
			"assets/images/bike_service_images/Bike6.jpg",
			"assets/images/bike_service_images/Bike7.jpg",
			"assets/images/bike_service_images/Bike8.jpg",
			"assets/images/bike_service_images/Bike9.jpg",
		];

		const applyTwoWheelerServicesPackagesPricing = () => {
			const t = ($("#home-vehicle-type")?.value || "").trim();
			const s = ($("#home-vehicle-size")?.value || "").trim();
			const c = ($("#home-service-category")?.value || "").trim();
			const bySize = window.TWO_WHEELER_SP_PRICES_BY_SIZE?.[s];

			const restoreTwCard = (card) => {
				const priceCol =
					card.querySelector(".ltr\\:text-right") || card.querySelector(".rtl\\:text-left");
				const currentEl = priceCol?.querySelector(".text-primary");
				const oldEl = priceCol?.querySelector(".line-through");
				if (!currentEl || card.dataset.homePriceCaptured !== "1") return;
				currentEl.textContent = card.dataset.homePriceDefaultCurrent;
				if (oldEl) oldEl.textContent = card.dataset.homePriceDefaultOld || "";
			};

			getTwoWheelerCards().forEach((card) => {
				if (t !== "two_wheeler" || c !== "services_packages" || !twSpSizes.includes(s) || !bySize) {
					restoreTwCard(card);
					return;
				}

				const priceCol =
					card.querySelector(".ltr\\:text-right") || card.querySelector(".rtl\\:text-left");
				const currentEl = priceCol?.querySelector(".text-primary");
				const oldEl = priceCol?.querySelector(".line-through");
				if (!currentEl || card.dataset.homePriceCaptured !== "1") return;

				const title = getCardTitle(card);
				const allowed = serviceTitlesByFilterKeyTwoWheeler[currentFilterKey];
				let entry = null;
				if (currentFilterKey === "all") {
					entry = bySize[title];
				} else if (allowed && allowed.length) {
					entry = allowed.includes(title) ? bySize[title] : null;
				}

				if (!entry) {
					restoreTwCard(card);
					return;
				}
				currentEl.textContent = fmtSar(entry.current);
				if (oldEl) oldEl.textContent = fmtSar(entry.old);
			});
		};

		const applyTwoWheelerAdditionalServicesPricing = () => {
			const grid = $("#home-vehicles-locations-grid-two-wheeler");
			if (!grid) return;
			const t = ($("#home-vehicle-type")?.value || "").trim();
			const s = ($("#home-vehicle-size")?.value || "").trim();
			const c = ($("#home-service-category")?.value || "").trim();

			const restoreSlide = (slide) => {
				if (slide.dataset.homeTwAdditionalPriceCaptured !== "1") return;
				const col = slide.querySelector(".home-additional-card__prices");
				const cur = col?.querySelector(".text-primary");
				const old = col?.querySelector(".line-through");
				if (cur) cur.textContent = slide.dataset.homeTwAdditionalDefaultCurrent || "";
				if (old) old.textContent = slide.dataset.homeTwAdditionalDefaultOld || "";
				const badge = slide.querySelector(".home-additional-card__discount-badge");
				if (badge) {
					const def = slide.dataset.homeTwAdditionalDefaultBadge;
					if (def) badge.textContent = def;
					badge.removeAttribute("hidden");
				}
			};

			if (t !== "two_wheeler" || c !== "additional_services" || !twSpSizes.includes(s)) {
				grid.querySelectorAll(".swiper-slide[data-additional-service-key]").forEach(restoreSlide);
				return;
			}

			const prices = window.TWO_WHEELER_ADDITIONAL_PRICES_BY_SIZE?.[s];
			if (!prices) {
				grid.querySelectorAll(".swiper-slide[data-additional-service-key]").forEach(restoreSlide);
				return;
			}

			grid.querySelectorAll(".swiper-slide[data-additional-service-key]").forEach((slide) => {
				const key = slide.dataset.additionalServiceKey;
				const entry = prices[key];
				if (!entry) {
					restoreSlide(slide);
					return;
				}
				const col = slide.querySelector(".home-additional-card__prices");
				const cur = col?.querySelector(".text-primary");
				const old = col?.querySelector(".line-through");
				if (cur) cur.textContent = fmtSar(entry.current);
				if (old) old.textContent = fmtSar(entry.old);
				const badge = slide.querySelector(".home-additional-card__discount-badge");
				if (badge) {
					const pct = Math.round(((entry.old - entry.current) / entry.old) * 100);
					if (pct > 0) {
						badge.textContent = `${pct}% OFF`;
						badge.removeAttribute("hidden");
					} else {
						badge.setAttribute("hidden", "");
					}
				}
			});
		};

		const applyTwoWheelerServiceCardImages = () => {
			const t = ($("#home-vehicle-type")?.value || "").trim();
			const s = ($("#home-vehicle-size")?.value || "").trim();
			const c = ($("#home-service-category")?.value || "").trim();
			const shouldUseBikeImages =
				t === "two_wheeler" &&
				twSpSizes.includes(s) &&
				(c === "services_packages" || c === "additional_services");

			getTwoWheelerCards().forEach((card, index) => {
				const img = card.querySelector(":scope > a img");
				if (!img) return;
				if (card.dataset.homeImageDefaultCaptured !== "1") {
					card.dataset.homeImageDefaultSrc = img.getAttribute("src") || "";
					card.dataset.homeImageDefaultCaptured = "1";
				}
				const defaultSrc = card.dataset.homeImageDefaultSrc || "";
				const bikeSrc = twoWheelerServiceImagePaths[index % twoWheelerServiceImagePaths.length];
				img.setAttribute("src", shouldUseBikeImages ? bikeSrc : defaultSrc);
			});
		};

		const applyTwoWheelerAdditionalServiceCardImages = () => {
			const t = ($("#home-vehicle-type")?.value || "").trim();
			const s = ($("#home-vehicle-size")?.value || "").trim();
			const c = ($("#home-service-category")?.value || "").trim();
			const shouldUseBikeImages =
				t === "two_wheeler" &&
				twSpSizes.includes(s) &&
				c === "additional_services";
			const grid = $("#home-vehicles-locations-grid-two-wheeler");
			if (!grid) return;

			grid.querySelectorAll(".swiper-slide").forEach((slide, index) => {
				const img = slide.querySelector("img");
				if (!img) return;
				if (slide.dataset.homeImageDefaultCaptured !== "1") {
					slide.dataset.homeImageDefaultSrc = img.getAttribute("src") || "";
					slide.dataset.homeImageDefaultCaptured = "1";
				}
				const defaultSrc = slide.dataset.homeImageDefaultSrc || "";
				const bikeSrc = twoWheelerServiceImagePaths[index % twoWheelerServiceImagePaths.length];
				img.setAttribute("src", shouldUseBikeImages ? bikeSrc : defaultSrc);
			});
		};

		const applyHomeVehicleCardSizeLabels = () => {
			const { labelText, twoWheelerSizeLabel } = getEffectiveHomeVehicleFilters();

			getCarCards().forEach((card) => {
				const labelEl = card.querySelector("h3")?.nextElementSibling;
				if (!labelEl || labelEl.tagName !== "SPAN") return;
				if (card.dataset.homeVehicleSizeLabelCaptured !== "1") {
					card.dataset.homeVehicleSizeLabelDefault = labelEl.textContent.trim();
					card.dataset.homeVehicleSizeLabelCaptured = "1";
				}
				const def = card.dataset.homeVehicleSizeLabelDefault || "Large Vehicle";
				labelEl.textContent = labelText || def;
			});

			getTwoWheelerCards().forEach((card) => {
				const labelEl = card.querySelector("h3")?.nextElementSibling;
				if (!labelEl || labelEl.tagName !== "SPAN") return;
				if (card.dataset.homeVehicleSizeLabelCaptured !== "1") {
					card.dataset.homeVehicleSizeLabelDefault = labelEl.textContent.trim();
					card.dataset.homeVehicleSizeLabelCaptured = "1";
				}
				const def = card.dataset.homeVehicleSizeLabelDefault || "Commuter";
				labelEl.textContent = twoWheelerSizeLabel || def;
			});
		};

		/** Top-right "% OFF" on hero image from old/current in the same maps as applyVehiclePricing (rounded percent). */
		const applyHomeVehicleDiscountBadges = () => {
			const { useCarPackagesPricing, effSize } = getEffectiveHomeVehicleFilters();

			let tabMaps = carSmallPricesByTab;
			let mergedAll = mergedAllSmallCarPrices;
			if (effSize === "medium") {
				tabMaps = carMediumPricesByTab;
				mergedAll = mergedAllMediumCarPrices;
			} else if (effSize === "large") {
				tabMaps = carLargePricesByTab;
				mergedAll = mergedAllLargeCarPrices;
			}

			getCarCards().forEach((card) => {
				const mediaLink = card.querySelector(":scope > a");
				if (!mediaLink || !mediaLink.querySelector("img")) return;

				let badge = mediaLink.querySelector(".home-vehicle-discount-badge");
				if (!badge) {
					badge = document.createElement("span");
					badge.className = "home-vehicle-discount-badge";
					badge.setAttribute("aria-hidden", "true");
					mediaLink.appendChild(badge);
				}

				if (!useCarPackagesPricing) {
					badge.setAttribute("hidden", "");
					return;
				}

				const title = getCardTitle(card);
				const tabMap =
					currentFilterKey === "all" ? mergedAll : tabMaps[currentFilterKey];
				const entry = tabMap?.[title];
				if (
					!entry ||
					typeof entry.old !== "number" ||
					typeof entry.current !== "number" ||
					entry.old <= 0 ||
					entry.current >= entry.old
				) {
					badge.setAttribute("hidden", "");
					return;
				}

				const pct = Math.round(((entry.old - entry.current) / entry.old) * 100);
				if (pct <= 0) {
					badge.setAttribute("hidden", "");
					return;
				}

				badge.removeAttribute("hidden");
				badge.textContent = `${pct}% OFF`;
			});

			getTwoWheelerCards().forEach((card) => {
				const mediaLink = card.querySelector(":scope > a");
				if (!mediaLink || !mediaLink.querySelector("img")) return;

				let badge = mediaLink.querySelector(".home-vehicle-discount-badge");
				if (!badge) {
					badge = document.createElement("span");
					badge.className = "home-vehicle-discount-badge";
					badge.setAttribute("aria-hidden", "true");
					mediaLink.appendChild(badge);
				}

				const t = ($("#home-vehicle-type")?.value || "").trim();
				const s = ($("#home-vehicle-size")?.value || "").trim();
				const c = ($("#home-service-category")?.value || "").trim();
				if (t !== "two_wheeler" || c !== "services_packages" || !twSpSizes.includes(s)) {
					badge.setAttribute("hidden", "");
					return;
				}

				const bySize = window.TWO_WHEELER_SP_PRICES_BY_SIZE?.[s];
				if (!bySize) {
					badge.setAttribute("hidden", "");
					return;
				}

				const title = getCardTitle(card);
				const allowed = serviceTitlesByFilterKeyTwoWheeler[currentFilterKey];
				let entry = null;
				if (currentFilterKey === "all") {
					entry = bySize[title];
				} else if (allowed && allowed.length) {
					entry = allowed.includes(title) ? bySize[title] : null;
				}

				if (
					!entry ||
					typeof entry.old !== "number" ||
					typeof entry.current !== "number" ||
					entry.old <= 0 ||
					entry.current >= entry.old
				) {
					badge.setAttribute("hidden", "");
					return;
				}

				const pct = Math.round(((entry.old - entry.current) / entry.old) * 100);
				if (pct <= 0) {
					badge.setAttribute("hidden", "");
					return;
				}

				badge.removeAttribute("hidden");
				badge.textContent = `${pct}% OFF`;
			});
		};

		const refreshHomeVehicleSurface = () => {
			applyVehiclePricing();
			applyTwoWheelerServicesPackagesPricing();
			applyHomeVehicleCardSizeLabels();
			applyTwoWheelerAdditionalServicesPricing();
			applyTwoWheelerServiceCardImages();
			applyTwoWheelerAdditionalServiceCardImages();
			applyHomeVehicleDiscountBadges();
		};

		const arrowBase =
			"w-[40px] md:w-[45px] lg:w-[50px] h-[40px] md:h-[45px] lg:h-[50px] rounded-[5px] text-xl text-white bg-[#171E20] flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-primary hover:text-white";
		const pageInactiveBase =
			"font-medium w-[40px] md:w-[45px] lg:w-[50px] h-[40px] md:h-[45px] lg:h-[50px] rounded-[5px] text-base md:text-lg bg-[#171E20] text-white flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-primary hover:text-white";
		const pageActiveBase =
			"font-medium w-[40px] md:w-[45px] lg:w-[50px] h-[40px] md:h-[45px] lg:h-[50px] rounded-[5px] text-base md:text-lg bg-primary text-white flex items-center justify-center";

		const ul = homeVehiclesPagination.querySelector("ul");
		if (ul && cards.length) {
			let activePage = 1;

			const getFilteredCards = () => {
				const map = isTwoWheelerServicesPackagesView()
					? serviceTitlesByFilterKeyTwoWheeler
					: serviceTitlesByFilterKey;
				const allowed = map[currentFilterKey];
				const list = getCards();
				if (!allowed) return list.slice();
				const allow = new Set(allowed);
				return list.filter((card) => allow.has(getCardTitle(card)));
			};

			const renderCards = () => {
				const filtered = getFilteredCards();
				const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
				if (activePage > totalPages) activePage = totalPages;
				const start = (activePage - 1) * perPage;
				const end = start + perPage;
				const pageSlice = new Set(filtered.slice(start, end));
				getCards().forEach((card) => {
					const inFilter = filtered.includes(card);
					const onPage = pageSlice.has(card);
					card.classList.toggle("hidden", !inFilter || !onPage);
				});
				return totalPages;
			};

			const renderPagination = (totalPages) => {
				ul.innerHTML = "";

				const mkLi = (child) => {
					const li = document.createElement("li");
					li.appendChild(child);
					return li;
				};

				const prevA = document.createElement("a");
				prevA.href = "javascript:void(0);";
				prevA.className = arrowBase;
				prevA.innerHTML = '<i class="ri-arrow-left-line"></i>';
				prevA.dataset.page = String(Math.max(1, activePage - 1));
				ul.appendChild(mkLi(prevA));

				for (let p = 1; p <= totalPages; p++) {
					if (p === activePage) {
						const span = document.createElement("span");
						span.className = pageActiveBase;
						span.textContent = String(p);
						ul.appendChild(mkLi(span));
					} else {
						const a = document.createElement("a");
						a.href = "javascript:void(0);";
						a.className = pageInactiveBase;
						a.textContent = String(p);
						a.dataset.page = String(p);
						ul.appendChild(mkLi(a));
					}
				}

				const nextA = document.createElement("a");
				nextA.href = "javascript:void(0);";
				nextA.className = arrowBase;
				nextA.innerHTML = '<i class="ri-arrow-right-line"></i>';
				nextA.dataset.page = String(Math.min(totalPages, activePage + 1));
				ul.appendChild(mkLi(nextA));
			};

			const refresh = () => {
				const totalPages = renderCards();
				renderPagination(totalPages);
				refreshHomeVehicleSurface();
			};

			refreshHomeVehiclePricing = refresh;

			applyHomeVehicleServiceFilter = (filterKey) => {
				const filterMap = isTwoWheelerServicesPackagesView()
					? serviceTitlesByFilterKeyTwoWheeler
					: serviceTitlesByFilterKey;
				const key = filterMap.hasOwnProperty(filterKey) ? filterKey : "all";
				currentFilterKey = key;
				activePage = 1;
				refresh();
			};

			ul.addEventListener("click", (e) => {
				const target = e.target?.closest("a");
				if (!target) return;
				const page = parseInt(target.dataset.page, 10);
				if (!Number.isFinite(page)) return;
				const totalPages = Math.max(1, Math.ceil(getFilteredCards().length / perPage));
				const nextPage = Math.max(1, Math.min(totalPages, page));
				if (nextPage === activePage) return;
				activePage = nextPage;
				refresh();
			});

			applyHomeVehicleServiceFilter("all");
		} else if (cards.length) {
			refreshHomeVehiclePricing = refreshHomeVehicleSurface;
			refreshHomeVehicleSurface();
		}
	}

	// Date & Time Picker (multiple inputs)
	$$('input[type="date"], input[type="time"]').forEach((input) => {
		input.addEventListener("focus", () => {
			input.showPicker?.();
		});
	});

	// Countdown (multiple, auto stop) — match fixed dates or duration-from-now
	const countdowns = $$(".countdown[data-countdown], .countdown[data-countdown-duration-ms]");
	if (countdowns.length) {
		const pad2 = (n) => String(n).padStart(2, "0");
		countdowns.forEach((wrap) => {
			const durationMs = wrap.getAttribute("data-countdown-duration-ms");
			let targetTime = NaN;
			if (durationMs != null && durationMs !== "") {
				const ms = parseInt(durationMs, 10);
				if (!Number.isNaN(ms)) targetTime = Date.now() + ms;
			} else {
				const targetStr = wrap.getAttribute("data-countdown");
				targetTime = targetStr ? new Date(targetStr).getTime() : NaN;
			}
			const daysEl = $("[data-days]", wrap);
			const hoursEl = $("[data-hours]", wrap);
			const minutesEl = $("[data-minutes]", wrap);
			const secondsEl = $("[data-seconds]", wrap);
			if (Number.isNaN(targetTime) || !daysEl || !hoursEl || !minutesEl || !secondsEl) return;
			let timerId = null;
			const update = () => {
				const diff = targetTime - Date.now();
				if (diff <= 0) {
					daysEl.textContent = "00";
					hoursEl.textContent = "00";
					minutesEl.textContent = "00";
					secondsEl.textContent = "00";
					if (timerId) clearInterval(timerId);
					return;
				}
				const days = Math.floor(diff / (1000 * 60 * 60 * 24));
				const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
				const minutes = Math.floor((diff / (1000 * 60)) % 60);
				const seconds = Math.floor((diff / 1000) % 60);
				daysEl.textContent = pad2(days);
				hoursEl.textContent = pad2(hours);
				minutesEl.textContent = pad2(minutes);
				secondsEl.textContent = pad2(seconds);
			};
			update();
			timerId = setInterval(update, 1000);
		});
	}

	// Quantity Counter
	document.querySelectorAll(".qty-counter-input").forEach(counter => {
		const input = counter.querySelector("input[type='number']");
		const minusBtn = counter.querySelector(".qty-minus");
		const plusBtn = counter.querySelector(".qty-plus");
		plusBtn.addEventListener("click", () => {
			const current = parseInt(input.value, 10) || 0;
			input.value = current + 1;
		});
		minusBtn.addEventListener("click", () => {
			const min = parseInt(input.min, 10) || 0;
			const current = parseInt(input.value, 10) || 0;
			if (current > min) {
				input.value = current - 1;
			}
		});
	});

	// Dark/Light Toggle (applies class to <html>)
	const lightDarkToggle = $("#lightDarkToggle");
	if (lightDarkToggle) {
		const html = document.documentElement;
		const icon = $("i", lightDarkToggle);
		const savedTheme = localStorage.getItem("rentq_template");
		if (savedTheme) {
			html.classList.remove("light", "dark");
			html.classList.add(savedTheme);
			if (icon) icon.className = savedTheme === "dark" ? "ri-sun-fill" : "ri-moon-fill";
		}
		lightDarkToggle.addEventListener("click", () => {
			const isDark = html.classList.contains("dark");
			html.classList.remove(isDark ? "dark" : "light");
			html.classList.add(isDark ? "light" : "dark");
			localStorage.setItem("rentq_template", isDark ? "light" : "dark");
			if (icon) icon.className = isDark ? "ri-moon-fill" : "ri-sun-fill";
		});
	}

	// LTR/RTL Toggle
	const rtlToggleBtn = $("#ltrRtlToggle");
	if (rtlToggleBtn) {
		const htmlTag = document.documentElement;
		const icon = $("i", rtlToggleBtn);
		const savedDirection = localStorage.getItem("textDirection") || "ltr";
		htmlTag.setAttribute("dir", savedDirection);
		if (icon) icon.className = savedDirection === "rtl" ? "ri-english-input" : "ri-translate";
		rtlToggleBtn.addEventListener("click", () => {
			const current = htmlTag.getAttribute("dir") || "ltr";
			const newDir = current === "ltr" ? "rtl" : "ltr";
			htmlTag.setAttribute("dir", newDir);
			localStorage.setItem("textDirection", newDir);
			if (icon) icon.className = newDir === "rtl" ? "ri-english-input" : "ri-translate";
		});
	}

	// Back to Top
	const backToTopBtn = $("#backToTopBtn");
	if (backToTopBtn) {
		window.addEventListener("scroll", () => {
			backToTopBtn.classList.toggle("show", window.scrollY > 300);
		});
		backToTopBtn.addEventListener("click", () => {
			window.scrollTo({ top: 0, behavior: "smooth" });
		});
	}

	// Sidebar Navbar Menu (Accordion)
	const sidebar = $(".sidebar-navbar-nav");
	if (sidebar) {
		const list = $$(".nav-item", sidebar);
		function accordionHandler(e) {
			e.stopPropagation();
			const item = this;
			if (item.classList.contains("active")) {
				item.classList.remove("active");
				return;
			}
			// keep parent active behavior if needed
			if (item.parentElement?.parentElement?.classList.contains("active")) {
				item.classList.add("active");
				return;
			}
			list.forEach((li) => li.classList.remove("active"));
			item.classList.add("active");
		}
		list.forEach((li) => li.addEventListener("click", accordionHandler));
	}

	// Home - vehicle/service cards: full-card glass "See Details" overlay
	const cards = $$(".home-vehicle-feature-card");
	if (cards.length) {
		let activeCard = null;

		const setOpen = (card, open) => {
			const overlay = card.querySelector(".home-vehicle-feature-card__overlay");
			const openBtn = card.querySelector("[data-home-vehicle-details-open]");
			card.classList.toggle("is-details-open", open);
			if (overlay) overlay.setAttribute("aria-hidden", open ? "false" : "true");
			if (openBtn) openBtn.setAttribute("aria-expanded", open ? "true" : "false");
		};

		cards.forEach((card) => {
			const openBtn = card.querySelector("[data-home-vehicle-details-open]");
			const closeBtns = $$(".home-vehicle-feature-card__overlay-close, [data-home-vehicle-details-close]", card);

			openBtn?.addEventListener("click", (e) => {
				e.preventDefault();
				if (activeCard && activeCard !== card) setOpen(activeCard, false);
				activeCard = card;
				setOpen(card, true);
			});

			closeBtns.forEach((btn) => {
				btn.addEventListener("click", (e) => {
					e.preventDefault();
					setOpen(card, false);
					if (activeCard === card) activeCard = null;
				});
			});
		});

		document.addEventListener("keydown", (e) => {
			if (e.key !== "Escape") return;
			if (activeCard) setOpen(activeCard, false);
			activeCard = null;
		});
	}

})();