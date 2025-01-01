const Jimp = require("jimp");

const YEARS = [ "2024" ]; // Ignored when manually loaded, but used for the file name
const USER_ID = "582"; // From `curl https://mastodon.gamedev.place/api/v1/accounts/lookup\?acct\=zeh`
const DIMENSIONS = 4096;
const MARGIN = 24;
const GUTTER = 24;
const FILENAME = `${YEARS.join("-")}.png`;
const BACKGROUND_COLOR = 0xffffffff;
const EMPTY_CELL_COLOR = 0x000000ff;
const INCLUDE_WORDS = [ "⭐" ]; // #justread, #bookstodon
const EXCLUDE_WORDS = [ "#comics", "#yearinreview" ];
const MAX_QUERY_RESULTS = 40; // Max results per query; maximum in the Mastodon API is 40

/*
Instructions to run:

1. Change the `YEARS`
2. `yarn run create`
3. Will create <YEARS>.png (<YEARS>.md is created manually)
*/

// Image is { src, text }
const createImage = async (images) => {
	console.log("Creating image.");
	const image = await new Jimp(DIMENSIONS, DIMENSIONS, BACKGROUND_COLOR);

	const cols = Math.ceil(Math.sqrt(images.length));
	const rows = Math.ceil(images.length / cols);

	console.log(`Image will have ${cols} cols and ${rows} rows.`);

	const w = (DIMENSIONS - MARGIN * 2 - ((cols - 1) * GUTTER)) / cols;
	const h = (DIMENSIONS - MARGIN * 2 - ((rows - 1) * GUTTER)) / rows;

	for (let row = 0; row < rows; row++) {
		const y0 = Math.round(MARGIN + GUTTER * row + h * row);
		const y1 = Math.round(MARGIN + GUTTER * row + h * (row + 1));

		for (let col = 0; col < cols; col++) {
			const x0 = Math.round(MARGIN + GUTTER * col + w * col);
			const x1 = Math.round(MARGIN + GUTTER * col + w * (col + 1));

			const pos = row * cols + col;
			console.log(`Creating image ${pos + 1}/${images.length} at column ${col + 1}, row ${row + 1}...`);

			if (pos < images.length) {
				// Real image
				const src = images[pos].src;
				const thumb = await Jimp.read(src);
				thumb.cover(x1 - x0, y1 - y0, 0, Jimp.RESIZE_BICUBIC);
				image.blit(thumb, x0, y0);
			} else {
				// Filler
				console.log(`  ...used a filler rectangle.`);
				for (let x = x0; x <= x1; x++) {
					for (let y = y0; y <= y1; y++) {
						image.setPixelColor(EMPTY_CELL_COLOR, x, y);
					}
				}
			}
		}
	}

	image.colorType(2); // RGB without alpha channel
	image.write(FILENAME);

	console.log(`File ${FILENAME} created.\n`);
};

const cleanUpHTML = (text) => {
	// Removes HTML tags
	return text
		.replace(/<\/p><p>/g, "\n\n")
		.replace(/(<\w+.*?>|<\/\w+>)/g, "")
		.replace("\n\n\n", "\n\n")
		.trim();
};

// Load all media-specific statuses for a given user and given years
const loadAllStatuses = async () => {
	// More info on the public API: https://docs-p.joinmastodon.org/client/public/
	// Use data: https://mastodon.gamedev.place/api/v1/accounts/582

	const allStatuses = [];
	let lastId = "";

	while (true) {
		// Get all status
		// Ref: https://docs-p.joinmastodon.org/entities/Status/
		const response = await fetch(`https://mastodon.gamedev.place/api/v1/accounts/${USER_ID}/statuses?limit=${MAX_QUERY_RESULTS}&only_media=1&exclude_reblogs=1&exclude_replies=1&max_id=${lastId}`);

		if (!response.ok) {
			throw new Error(`Error getting response: ${response.status}`);
		}

		const newStatuses = await response.json();

		// Add all valid statuses
		const validYearStatuses = newStatuses.filter((p) => YEARS.includes(p.created_at.substr(0, 4)));
		allStatuses.push(...validYearStatuses);

		console.log(`...Fetched ${newStatuses.length} statuses, with ${validYearStatuses.length} valid years.`)

		// If reached the limit of the API, stop loading
		if (newStatuses.length < MAX_QUERY_RESULTS) {
			break;
		}

		// If all statuses belong to old years, stop loading
		if (validYearStatuses.length < newStatuses.length) {
			const oldYearStatuses = newStatuses.filter((p) => YEARS.every((y) => parseInt(y, 10) > parseInt(p.created_at.substr(0, 4), 10)));
			if (oldYearStatuses.length === newStatuses.length) {
				break;
			}
		}

		// Continue from the last one
		lastId = newStatuses[newStatuses.length - 1].id;
	}

	return allStatuses;
};

console.log(`\nLoading statuses for years "${YEARS.join("-")}"...`);
(async () => {
	const statuses = await loadAllStatuses();

	console.log(`Using ${statuses.length} initially valid statuses with media for the given years.`);

	// Ref: https://docs-p.joinmastodon.org/entities/MediaAttachment/

	const validStatuses = statuses
		.filter((s) => s.media_attachments.length === 1)
		.filter((s) => s.media_attachments[0].type === "image")
		.sort((a, b) => a.created_at < b.created_at ? -1 : 1);

	console.log(`Using ${validStatuses.length} valid statuses with a single image.`);

	const images = validStatuses.map((s) => ({
		// This should be `s.text`, but it's not working
		text: cleanUpHTML(s.content),
		src: s.media_attachments[0].url,
	})).filter((i) => (
		INCLUDE_WORDS.every((w) => i.text.includes(w)) &&
		EXCLUDE_WORDS.every((w) => !i.text.includes(w))
	));

	console.log(`Found ${images.length} valid images.\n`);

	console.log("Statistics:");
	console.log(`  5 stars: x${images.filter((i) => i.text.indexOf("\n⭐⭐⭐⭐⭐ ") > -1).length}`);
	console.log(`  4 stars: x${images.filter((i) => i.text.indexOf("\n⭐⭐⭐⭐ ") > -1).length}`);
	console.log(`  3 stars: x${images.filter((i) => i.text.indexOf("\n⭐⭐⭐ ") > -1).length}`);
	console.log(`  2 stars: x${images.filter((i) => i.text.indexOf("\n⭐⭐ ") > -1).length}`);
	console.log(`  1 star:  x${images.filter((i) => i.text.indexOf("\n⭐ ") > -1).length}`);
	console.log("");

	await createImage(images);
})();
