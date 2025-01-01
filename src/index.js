const instagramPosts = require("instagram-posts");
const Jimp = require("jimp");

/*
__typename: 'GraphImage',
id: '2207612151164602164',
edge_media_to_caption: { edges: [ [Object] ] },
shortcode: 'B6jA44YAIc0',
edge_media_to_comment: { count: 1 },
comments_disabled: false,
taken_at_timestamp: 1577387897,
dimensions: { height: 1080, width: 1080 },
display_url: 'https://scontent-iad3-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/79367461_203134250724266_8484580996693028001_n.jpg?_nc_ht=scontent-iad3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=eHIzoPN9DaIAX92YE_E&oh=f7c85118220a7efaca98a1a47cd679d4&oe=5EAC83D8',
edge_liked_by: { count: 22 },
edge_media_preview_like: { count: 22 },
location: {
	id: '523486691',
	has_public_page: true,
	name: 'Greenwich Village',
	slug: 'greenwich-village'
},
gating_info: null,
fact_check_overall_rating: null,
fact_check_information: null,
media_preview: 'ACoqS3mIUZ5/GoGtYWckyhCeduORn8e/9asaPHFLujlX51+Ycnlfbnsf51PNp2JzIpAU7MA5P3cE9vbinJ6CS1MtrO3X5jN7dKaLS3IJEpIHXCk/0q3LpTvxvQclsc9ycnp9B+FWLewaFNpZTznjPesm3bQ0sjn32qxEZ3L2J4z+FNzUtzCbeQxk5I7jjrz0/Gq+a0INO3mKMGXqvI/w+h6GtxoUvP3wLjcOgYgAjg8D+feuZZWhbYx5HTjII9QeD/WtCCaTYApbHmAYGfu45/DNJjRpf2cvdnIx/fb/AD1py2SDg5xjH3mz0x/k1izTThcAy7jtOfm6Y5H1zVXzbr1l/wDHqncZLqYxcMB/s/8AoIqhmnOXLEyZLf7Wc/rTKsk3VuI1O5vThtoYg59+me/SpDdynlAsnvkqfYEcDj2qlMoA6CstWIPBxUvXUpae6dE1zcAcRAk9gWP/AOr86ie9lUf6o57j5sfhVW1dvs8pycjGDms8Tyf3m/M/40hklzKZX3MNpwOOe31qtTnYscsST7802qIP/9k=',
owner: { id: '30761730', username: 'zehreads' },
thumbnail_src: 'https://scontent-iad3-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/79367461_203134250724266_8484580996693028001_n.jpg?_nc_ht=scontent-iad3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=eHIzoPN9DaIAX92YE_E&oh=b5aa2c5cca4e43866db933c08bce07b2&oe=5EA1F86F',
thumbnail_resources: [
	{
		src: 'https://scontent-iad3-1.cdninstagram.com/v/t51.2885-15/e35/s150x150/79367461_203134250724266_8484580996693028001_n.jpg?_nc_ht=scontent-iad3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=eHIzoPN9DaIAX92YE_E&oh=71f65a34e44a20d7441df4c6469e8416&oe=5E9E87C8',
		config_width: 150,
		config_height: 150
	},
	...
],
is_video: false,
accessibility_caption: 'Image may contain: text',
comments: 1,
likes: 22,
media: 'https://scontent-iad3-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/79367461_203134250724266_8484580996693028001_n.jpg?_nc_ht=scontent-iad3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=eHIzoPN9DaIAX92YE_E&oh=f7c85118220a7efaca98a1a47cd679d4&oe=5EAC83D8',
text: "⭐⭐⭐⭐ Fantastic read. Melancholic, but one of those reads that make you deeply ponder life and life choices. It's about butlers and English house servants, and thus something completely alien to me, but I can't help but draw parallels to my own life and career. I can see why this one is an easy favorite for a lot of people... it's the kind of book worth studying and discussing at length about.\n" +
	'\n' +
	'#bookstsgram #justread #kazuoishiguro',
time: 1577387897,
type: 'image',
url: 'https://www.instagram.com/p/B6jA44YAIc0',
username: 'zehreads'
*/

const YEARS = [ 2024 ]; // Ignored when manually loaded, but used for the file name
const USERNAME = "zehreads";
const DIMENSIONS = 4096;
const MARGIN = 24;
const GUTTER = 24;
const FILENAME = `${YEARS.join("-")}.png`;
const BACKGROUND_COLOR = 0xffffffff;
const EMPTY_CELL_COLOR = 0x000000ff;
const INCLUDE_WORDS = [ "⭐" ]; // #justread
const EXCLUDE_WORDS = [ "#comics" ];
const MAX_IMAGES = 5000; // Ignored when manually loaded
const USE_MANUALLY_LOADED_DATA = true;

/*
1. Load https://www.instagram.com/zehreads/
2. Scroll down a bunch, just to get the right ones for the year
3. Run in the console:

(async () => {
	const imgs = document.querySelectorAll("[alt*='Photo by Zeh']");
	const postURLs = Array.from(imgs).map((i) => ({
		url: "https://www.instagram.com" + i.parentNode.parentNode.parentNode.attributes["href"].value,
		media: i.attributes.src.value,
		text: i.attributes.alt.value,
	}));
	console.log(postURLs);
})();

4. Copy the result, excluding the other years manually
*/
const getInstagramPostsManually = async () => {
	return [
		{
			"url": "https://www.instagram.com/zehreads/p/DDdde4ctvCa/",
			"media": "https://scontent-lga3-1.cdninstagram.com/v/t51.29350-15/469713663_1141308384095583_6784073175955515250_n.jpg?se=-1&stp=dst-jpegr_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMDgweDEwODAuaGRyLmYyOTM1MC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_cat=103&_nc_ohc=40KFZH1ITUUQ7kNvgFy54mD&_nc_gid=a489b86997454d558e1540ea01fea2f7&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzUyMTEwMDE0OTIxODAxMzMzOA%3D%3D.3-ccb7-5&oh=00_AYBravkyZoCxXLAF_tIgImMXoDFVMLWpMomkCm_-3BnWKg&oe=677A8FBE&_nc_sid=7a9f4b",
			"text": "Photo by Zeh Fernando in Park Slope, Brooklyn, N.Y.. May be an image of text."
		},
		{
			"url": "https://www.instagram.com/zehreads/p/C-yuMFhtxUq/",
			"media": "https://scontent-lga3-1.cdninstagram.com/v/t39.30808-6/456143602_18451152313041731_6602789459058281560_n.webp?cb=30a688f7-586271b6&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE0NDAuc2RyLmYzMDgwOC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_cat=111&_nc_ohc=AqpVpRUzg3kQ7kNvgEwMTg1&_nc_gid=a489b86997454d558e1540ea01fea2f7&edm=AP4sbd4AAAAA&ccb=7-5&ig_cache_key=MzQzNzAxMjYwNjM0NDY5NzEzMA%3D%3D.3-ccb7-5-cb30a688f7-586271b6&oh=00_AYBpQr4OgqttHaz6IXByFgHWVZwQmLvHUfGQ5YfkWbHWbA&oe=677A8985&_nc_sid=7a9f4b",
			"text": "Photo by Zeh Fernando in Park Slope."
		},
		{
			"url": "https://www.instagram.com/zehreads/p/C91EpXetncU/",
			"media": "https://scontent-lga3-3.cdninstagram.com/v/t51.29350-15/452646459_1066422065081584_8576975734615741997_n.webp?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE0NDAuc2RyLmYyOTM1MC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=scontent-lga3-3.cdninstagram.com&_nc_cat=104&_nc_ohc=5D5YEstSYaQQ7kNvgF29H5I&_nc_gid=a489b86997454d558e1540ea01fea2f7&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzQxOTY1OTkyNjk1MzY4NjgwNA%3D%3D.3-ccb7-5&oh=00_AYDR6IEvrcLU2NgHy2fvmIxk25bInUKtEB4YQ4yQUc59Mg&oe=677A9375&_nc_sid=7a9f4b",
			"text": "Photo by Zeh Fernando in Park Slope."
		},
		{
			"url": "https://www.instagram.com/zehreads/p/C9gWt-9NvqV/",
			"media": "https://scontent-lga3-2.cdninstagram.com/v/t51.29350-15/451859723_1024496838580740_5343882143904766265_n.jpg?se=-1&stp=dst-jpegr_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE0NDQuaGRyLmYyOTM1MC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=scontent-lga3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=nkJYWYSL7t8Q7kNvgE6HEbf&_nc_gid=a489b86997454d558e1540ea01fea2f7&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzQxMzgyODQzNDU0NTUzOTczMw%3D%3D.3-ccb7-5&oh=00_AYAUlO0Vbt3Q8ecHQ6MfVzCUElLTILiR5ZEtk8z2UmQSCQ&oe=677A8CDA&_nc_sid=7a9f4b",
			"text": "Photo by Zeh Fernando in Smith-9th Sts Station."
		},
		{
			"url": "https://www.instagram.com/zehreads/p/C8-eWiDPhOc/",
			"media": "https://scontent-lga3-2.cdninstagram.com/v/t51.29350-15/449746075_441776405484345_3602607541937955336_n.jpg?se=-1&stp=dst-jpegr_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE0NDAuaGRyLmYyOTM1MC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=scontent-lga3-2.cdninstagram.com&_nc_cat=109&_nc_ohc=JA5KP4gkXIQQ7kNvgGn3GT7&_nc_gid=a489b86997454d558e1540ea01fea2f7&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzQwNDI5MTg1ODEyNDExNjg5Mg%3D%3D.3-ccb7-5&oh=00_AYBzTWNQdVyqiiS4GmN2ayLLY_qNkqfWlyOtQuu0uO19EA&oe=677A6116&_nc_sid=7a9f4b",
			"text": "Photo by Zeh Fernando in Grand Isle, Vermont."
		},
		{
			"url": "https://www.instagram.com/zehreads/p/C6r_Z8itIXM/",
			"media": "https://scontent-lga3-1.cdninstagram.com/v/t51.29350-15/442438746_1591704441621896_4886718926903237067_n.jpg?se=-1&stp=dst-jpegr_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE0NDAuaGRyLmYyOTM1MC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=3fI1QPIvbhYQ7kNvgGkj2xA&_nc_gid=a489b86997454d558e1540ea01fea2f7&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzM2MzA2MDQwNjY4NjA5MDcwMA%3D%3D.3-ccb7-5&oh=00_AYBVftMFBxKINylaT-QAd-4gwizH0aukADsfRgVsxcuoDw&oe=677A76D5&_nc_sid=7a9f4b",
			"text": "Photo by Zeh Fernando in Moynihan Train Hall at New York Penn Station."
		},
		{
			"url": "https://www.instagram.com/zehreads/p/C49eoJbtKe-/",
			"media": "https://scontent-lga3-3.cdninstagram.com/v/t51.29350-15/434357736_1354356071958208_2877372894070343123_n.jpg?se=-1&stp=dst-jpegr_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE0NDAuaGRyLmYyOTM1MC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=scontent-lga3-3.cdninstagram.com&_nc_cat=104&_nc_ohc=usdlg76bDvcQ7kNvgGdQ3Cz&_nc_gid=a489b86997454d558e1540ea01fea2f7&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzMzMTk1Mzk5OTYyNjkzODMwMg%3D%3D.3-ccb7-5&oh=00_AYAWq65GtbP7MWO6U0OMDKcgRIWXe-c1QpuYOhiNHp7Ayw&oe=677A7F83&_nc_sid=7a9f4b",
			"text": "Photo by Zeh Fernando in Atlantic Avenue–Barclays Center."
		},
		{
			"url": "https://www.instagram.com/zehreads/p/C282ZYrN6sN/",
			"media": "https://scontent-lga3-1.cdninstagram.com/v/t51.29350-15/425204667_307379581890455_8685934378402351260_n.jpg?se=-1&stp=dst-jpegr_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE0NDAuaGRyLmYyOTM1MC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_cat=111&_nc_ohc=j7h4Iw2u12UQ7kNvgHf2_LS&_nc_gid=a489b86997454d558e1540ea01fea2f7&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzI5NTc0ODI2NjMyMTc1MDc5Nw%3D%3D.3-ccb7-5&oh=00_AYB4sYpnqQG39QDQJSSzupAHSYpE_jvuaXEB4dJJwshqPQ&oe=677A6C0A&_nc_sid=7a9f4b",
			"text": "Photo by Zeh Fernando in Park Slope."
		},
	].map((i, index) => ({ ...i, time: -index }));
};

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
				const src = images[pos].media;
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

console.log(`\nLoading images for years "${YEARS.join("-")}"...`);
(async () => {
	const images = USE_MANUALLY_LOADED_DATA ? await getInstagramPostsManually() : await instagramPosts(USERNAME, { count: MAX_IMAGES })

	console.log(`${images.length} total images found.`);
	const validImages = images
		.filter((i) => {
			const imageYear = new Date(i.time * 1000).getFullYear();
			return (
				(USE_MANUALLY_LOADED_DATA || !i.is_video) &&
				(USE_MANUALLY_LOADED_DATA || INCLUDE_WORDS.every((w) => i.text.includes(w))) &&
				EXCLUDE_WORDS.every((w) => !i.text.includes(w)) &&
				(USE_MANUALLY_LOADED_DATA || YEARS.includes(imageYear))
			);
		})
		.sort((a, b) => a.time - b.time);

	console.log(`${validImages.length} valid images.\n`);

	console.log("Statistics:");
	console.log(`  5 stars: x${validImages.filter((i) => i.text.startsWith("⭐⭐⭐⭐⭐ ")).length}`);
	console.log(`  4 stars: x${validImages.filter((i) => i.text.startsWith("⭐⭐⭐⭐ ")).length}`);
	console.log(`  3 stars: x${validImages.filter((i) => i.text.startsWith("⭐⭐⭐ ")).length}`);
	console.log(`  2 stars: x${validImages.filter((i) => i.text.startsWith("⭐⭐ ")).length}`);
	console.log(`  1 star:  x${validImages.filter((i) => i.text.startsWith("⭐ ")).length}`);
	console.log("");

	await createImage(validImages);
})();
