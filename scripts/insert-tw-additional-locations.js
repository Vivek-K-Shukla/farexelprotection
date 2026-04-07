const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");
const indexPath = path.join(root, "index.html");
const snipPath = path.join(__dirname, "tw-additional-locations-snippet.html");

let html = fs.readFileSync(indexPath, "utf8");
const hadCRLF = html.includes("\r\n");
if (hadCRLF) html = html.replace(/\r\n/g, "\n");

const snip = fs.readFileSync(snipPath, "utf8").replace(/\r\n/g, "\n");

const needle = `                    </div>
                    </div>
                    <div id="home-vehicles-grid" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[25px]">`;

if (!html.includes(needle)) {
	console.error("Insert needle not found.");
	process.exit(1);
}

html = html.replace(
	needle,
	`                    </div>
                    </div>
${snip}
                    <div id="home-vehicles-grid" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[25px]">`
);

fs.writeFileSync(indexPath, hadCRLF ? html.replace(/\n/g, "\r\n") : html, "utf8");
console.log("Inserted two-wheeler additional locations block.");
