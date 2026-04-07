/**
 * Home — Additional Services: which services appear per vehicle context.
 * Static today; later replace this file with JSON from your API or inline from the server template.
 *
 * serviceItem keys must match:
 * - HTML data-additional-service-key on each swiper slide
 * - serviceValuesByCategoryAndVehicleType.additional_services.two_wheeler in custom.js
 */
(function (global) {
	"use strict";

	global.HOME_ADDITIONAL_SERVICES_MANIFEST = {
		car: {
			additional_services: {
				/** Car swiper lists all slides in DOM order (see #home-vehicles-locations-grid). */
				mode: "all_slides",
			},
		},
		two_wheeler: {
			additional_services: {
				/** Subset of services; order = slide order in #home-vehicles-locations-grid-two-wheeler */
				serviceItemKeys: ["engine_wash", "steam_washing", "express_washing"],
			},
		},
	};
})(typeof window !== "undefined" ? window : globalThis);
