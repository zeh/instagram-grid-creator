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

const YEARS = [ 2019 ];
const USERNAME = "zehreads";
const DIMENSIONS = 4096;
const MARGIN = 24;
const GUTTER = 24;
const FILENAME = `${YEARS.join("-")}.png`;
const BACKGROUND_COLOR = 0xffffffff;
const EMPTY_CELL_COLOR = 0x000000ff;

const createImage = async (images) => {
	console.log("Creating image.");
	const image = await new Jimp(DIMENSIONS, DIMENSIONS, BACKGROUND_COLOR);

	const cols = Math.ceil(Math.sqrt(images.length));
	const rows = Math.ceil(images.length / cols);

	console.log(`Image will have ${cols} cols and ${rows} rows.`);

	const w = (DIMENSIONS - MARGIN * 2 - ((cols - 1) * GUTTER)) / cols;
	const h = (DIMENSIONS - MARGIN * 2 - ((rows - 1) * GUTTER)) / rows;

	for (let col = 0; col < cols; col++) {

		const x0 = Math.round(MARGIN + GUTTER * col + w * col);
		const x1 = Math.round(MARGIN + GUTTER * col + w * (col + 1));

		for (let row = 0; row < rows; row++) {
			const y0 = Math.round(MARGIN + GUTTER * row + h * row);
			const y1 = Math.round(MARGIN + GUTTER * row + h * (row + 1));

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
	const images = await instagramPosts(USERNAME, { count: 1000 })

	console.log(`${images.length} total images found.`);
	const validImages = images
		.filter((i) => {
			const imageYear = new Date(i.time * 1000).getFullYear();
			return (
				!i.is_video &&
				i.text.includes("#justread") &&
				YEARS.includes(imageYear)
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
