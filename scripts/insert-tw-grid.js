const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");
const indexPath = path.join(root, "index.html");
const snipPath = path.join(root, "tw-wheeler-grid-snippet.html");
let html = fs.readFileSync(indexPath, "utf8");
const hadCRLF = html.includes("\r\n");
if (hadCRLF) html = html.replace(/\r\n/g, "\n");
const snip = fs.readFileSync(snipPath, "utf8").replace(/\r\n/g, "\n");
const needle = `                                            <span>Automatic Emergency Recording</span>
                                        </li>
                                    </ul>
                                </div>
                                <p class="home-vehicle-feature-card__overlay-footer">
                                    <i class="ri-time-line home-vehicle-feature-card__overlay-footer-icon" aria-hidden="true"></i>
                                    Installation time varies
                                </p>
                                <p class="home-vehicle-feature-card__overlay-footer home-vehicle-feature-card__overlay-footer-secondary">
                                    <i class="ri-bank-card-line home-vehicle-feature-card__overlay-footer-icon" aria-hidden="true"></i>
                                    4 Installments
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
                        </div>
                    </div>
                    <nav
                        id="home-vehicles-pagination"`;
if (!html.includes(needle)) {
	console.error("Needle not found");
	process.exit(1);
}
html = html.replace(
	needle,
	`                                            <span>Automatic Emergency Recording</span>
                                        </li>
                                    </ul>
                                </div>
                                <p class="home-vehicle-feature-card__overlay-footer">
                                    <i class="ri-time-line home-vehicle-feature-card__overlay-footer-icon" aria-hidden="true"></i>
                                    Installation time varies
                                </p>
                                <p class="home-vehicle-feature-card__overlay-footer home-vehicle-feature-card__overlay-footer-secondary">
                                    <i class="ri-bank-card-line home-vehicle-feature-card__overlay-footer-icon" aria-hidden="true"></i>
                                    4 Installments
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
                        </div>
                    </div>
${snip}
                    <nav
                        id="home-vehicles-pagination"`
);
fs.writeFileSync(indexPath, hadCRLF ? html.replace(/\n/g, "\r\n") : html, "utf8");
console.log("Inserted two-wheeler grid.");
