const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");
const indexPath = path.join(root, "index.html");
const snipPath = path.join(root, "tw-wheeler-grid-snippet.html");

let html = fs.readFileSync(indexPath, "utf8");
const hadCRLF = html.includes("\r\n");
if (hadCRLF) html = html.replace(/\r\n/g, "\n");

const snip = fs.readFileSync(snipPath, "utf8").replace(/\r\n/g, "\n").trimEnd();

const startIdx = html.indexOf(
	'<div\n                        id="home-vehicles-grid-two-wheeler"'
);
const endMarker = "</div>\n                    <nav\n                        id=\"home-vehicles-pagination\"";
const endIdx = html.indexOf(endMarker);
if (startIdx === -1 || endIdx === -1) {
	console.error("Could not find two-wheeler grid or pagination marker.");
	process.exit(1);
}

const out = html.slice(0, startIdx) + snip + "\n                    " + html.slice(endIdx);
fs.writeFileSync(indexPath, hadCRLF ? out.replace(/\n/g, "\r\n") : out, "utf8");
console.log("Replaced #home-vehicles-grid-two-wheeler in index.html");
