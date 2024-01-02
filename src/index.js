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

const YEARS = [ 2023 ]; // Ignored when manually loaded, but used for the file name
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
	const imgs = document.querySelectorAll("[alt*='⭐']");
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
			"url": "https://www.instagram.com/zehreads/p/C1cljLhOWYc/",
			"media": "https://scontent-ord5-2.cdninstagram.com/v/t51.2885-15/414223768_1533516320758834_8466676321041126086_n.jpg?stp=dst-jpg_e35_s1080x1080&_nc_ht=scontent-ord5-2.cdninstagram.com&_nc_cat=110&_nc_ohc=quBOQVT4oqgAX9SVFS6&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfByfnqrFVqjyZ7TBdTWSq2H0spHThavym4mJtREfSUrGw&oe=65984DF2&_nc_sid=8b3546",
			"text": "⭐⭐⭐⭐ Great (albeit short) memoir, full of introspection and interesting thoughts on running.\n\nThis is the book I wanted to read and didn't know. It's an awesome read about running, writing, and the author's own mind. I found myself nodding in agreement to him too many times, thinking \"damn, this guy gets me\". Pretty inspiring as well.\n\nI haven't read any of Murakami's books yet, but after this, I'll really have to!\n\n#bookstagram #justread #murakami #running"
		},
		{
			"url": "https://www.instagram.com/zehreads/p/C1Djmc3NxxX/",
			"media": "https://scontent-ord5-1.cdninstagram.com/v/t51.2885-15/412245465_962604628532829_9089113785722057067_n.jpg?stp=c0.58.1323.1323a_dst-jpg_e35_s640x640_sh0.08&_nc_ht=scontent-ord5-1.cdninstagram.com&_nc_cat=109&_nc_ohc=hx3K0gMi7XsAX-FBrlw&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfBtXHB1291vf2f3TMUzyloSnzRj-lBqNVx0qnajgN8siQ&oe=65978F28&_nc_sid=8b3546",
			"text": "⭐⭐⭐ Informative, yet funny.\n\nAs a kid, of course I loved the idea of colonizing space. As an adult, I was already a bit skeptical about the whole endeavor (before reading the book). Reading it reinforced this feeling: it convinced me it's harder than we're appreciating it for, and even pretty pointless at this time.\n\n#justread #bookstagram #mars #weinersmiths"
		},
		{
			"url": "https://www.instagram.com/zehreads/p/C0HzotCPF8I/",
			"media": "https://scontent-ord5-2.cdninstagram.com/v/t51.2885-15/404287605_624281306373578_4126322371743932833_n.webp?stp=c0.87.1265.1265a_dst-jpg_e35_s640x640_sh0.08&_nc_ht=scontent-ord5-2.cdninstagram.com&_nc_cat=102&_nc_ohc=r_woz3Uag_QAX9WFNQ5&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfBAaOxuN2tq6nYzlhkRfpASDWqVNtsOIEdhyrgBsXtS0Q&oe=6598C9FF&_nc_sid=8b3546",
			"text": "⭐⭐⭐⭐ Fun entry in Andy Weir's own \"MacGyver-in-space\" genre. A bit more fantasy-based than \"The Martian\", but still entertaining: finished it in record time (5 days)!\n\n#justread #bookstagram #hailmary #andyweir"
		},
		{
			"url": "https://www.instagram.com/zehreads/p/Czu7NdwNRJj/",
			"media": "https://scontent-ord5-1.cdninstagram.com/v/t51.2885-15/402853288_329449186451977_3769034128174938375_n.webp?stp=c0.65.1440.1440a_dst-jpg_e35_s640x640_sh0.08&_nc_ht=scontent-ord5-1.cdninstagram.com&_nc_cat=101&_nc_ohc=ZCICkwEe9eEAX8FajmM&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfDEzJoKFYtmG3sXGpyHOXeIyS_ujEa0fUFnCUwNl2-3_Q&oe=6598D7E5&_nc_sid=8b3546",
			"text": "⭐⭐⭐ Eye-opening book about thinking, memory, and problem solving.\n\nI'm conflicted about how to properly review this book. On the one hand, I loved the topic; it was revelatory, and made me understand myself and other people better. For the record, I fit almost perfectly into what she calls a \"spatial thinker\".\n\nOn the other hand, it was a bit all over the place (something the author admits), and never got too deep into some topics, at least not in the way I would have liked. I guess I was expecting something in the molds of \"Quiet\" (Susan Cain), which is not as personal.\n\nStill, valuable data points. The author is legendary and it was great to get an insight on her experience and how she thinks too.\n\n#justread #bookstagram #visualthinking #templegrandin"
		},
		{
			"url": "https://www.instagram.com/zehreads/p/CyteQLuvJin/",
			"media": "https://scontent-ord5-2.cdninstagram.com/v/t51.2885-15/394624284_1218630966205924_3600991567999816782_n.webp?stp=dst-jpg_e35_s640x640_sh0.08&_nc_ht=scontent-ord5-2.cdninstagram.com&_nc_cat=104&_nc_ohc=IR6AJnNtCBcAX8Rp9h3&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfBdTyjf1_B2hZybyofoV2XPOcCtCj8rcmKocNAlKNWmEA&oe=65990463&_nc_sid=8b3546",
			"text": "⭐⭐⭐⭐ Great, inspiring, positive read that respects the reader.\n\nA great introduction of sorts to the guidelines, with a lot of debating of the concepts and ideas from the chosen entries. If anything, I just wish it was longer.\n\n#bookstagram #justread #programming #cpp"
		},
		{
			"url": "https://www.instagram.com/zehreads/p/Cxsolb3L-50/",
			"media": "https://scontent-ord5-1.cdninstagram.com/v/t51.2885-15/383809431_1075194850324172_4444986274981756006_n.webp?stp=c0.104.1440.1440a_dst-jpg_e35_s640x640_sh0.08&_nc_ht=scontent-ord5-1.cdninstagram.com&_nc_cat=108&_nc_ohc=6SlPJbGTM3UAX_wQ4k_&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfBHxNVc6GsMXWnsNEDfvrQAB1pMOhLCy7SZIHsfGXveEQ&oe=6598513A&_nc_sid=8b3546",
			"text": "⭐⭐ This is not a good book.\n\nEgregious formatting errors, duplicated content, irrelevant (verbose) information, yet lack of needed details elsewhere, omitted code examples making some chapters unreadable (I'm not going to type up a URL for every tiny code block), inconsistent style, tangential domain-specific chapters, and actual code errors abound.\n\nI have no clue how this passed any kind of editorial review. The first chapter is already a very obvious disaster in code formatting. I can only assume Packt doesn't employ any sort of editors or reviewers. I already didn't hold them in the highest regard of book quality, but after this, I'll actively avoid them.\n\nI do believe the authors know their domain, but this is sloppy work.\n\n#bookstagram #justread #programming"
		},
		{
			"url": "https://www.instagram.com/zehreads/p/CxI8CpNrxa4/",
			"media": "https://scontent-ord5-2.cdninstagram.com/v/t51.2885-15/378816081_1828521980904710_355752256312511752_n.webp?stp=dst-jpg_e35_s640x640_sh0.08&_nc_ht=scontent-ord5-2.cdninstagram.com&_nc_cat=102&_nc_ohc=7fGYuSCZrDoAX_jnfYA&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfCiEiyjNCjK0hVndV5Tq9RIbaktwzSiMTVCyFwsEfpChQ&oe=65989935&_nc_sid=8b3546",
			"text": "⭐⭐⭐⭐ A bit disjointed, but straight to the point.\n\nOn the one hand, this is how I wish more programming books were written: they assume the reader knows programming already and only needs to learn the topic at hand, rather than describing the universe from scratch before getting to its actual content.\n\nOn the other hand, it jumps seemingly randomly between topics; sometimes with too much detail, sometimes with not enough; sometimes referencing things that won't be introduced until much later, sometimes the opposite.\n\n#bookstagram #justread #c++"
		},
		{
			"url": "https://www.instagram.com/zehreads/p/CvOjvTWtRUO/",
			"media": "https://scontent-ord5-2.cdninstagram.com/v/t51.2885-15/363285460_144859728638599_6454496115236341036_n.webp?stp=dst-jpg_e35_s640x640_sh0.08&_nc_ht=scontent-ord5-2.cdninstagram.com&_nc_cat=107&_nc_ohc=j79rtI6CLNwAX_FPoXs&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfAQFeEzjHSMwmsB90SCU-07WvEnJeyKGwnsnqAhfMBqzA&oe=6598AEB9&_nc_sid=8b3546",
			"text": "⭐⭐⭐⭐ As a fan of id Software, John Romero, and general computer history, I'm biased, but this is totally worth it just for the perspective (from of one of the father's of modern videogames). It's a great complement to \"Masters of Doom\", but from a different perspective (and with some fact corrections of its own).\n\nIt's more personal too. It talks a lot about Romero's upbringing (many surprises there) and overall makes him seem a lot more human, and capable of self reflection, than many would assume. For those who know some of his business history (especially some spectacular failures), it might be eye opening.\n\n#doom #idsoftware #justread #bookstagram"
		},
		{
			"url": "https://www.instagram.com/zehreads/p/Ct2uw8utth6/",
			"media": "https://scontent-ord5-2.cdninstagram.com/v/t51.2885-15/355669616_1004541280543603_3969827969670248967_n.webp?stp=dst-jpg_e35_s640x640_sh0.08&_nc_ht=scontent-ord5-2.cdninstagram.com&_nc_cat=107&_nc_ohc=5EzRfS9TJHoAX-1fZrO&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfB5hMpAKidpFsU6l4PpO994nMcJFKAcmDAWPIBAxpl9xg&oe=659914AF&_nc_sid=8b3546",
			"text": "⭐⭐⭐ Insightful, eye opening, and full of a data. A great way to see running from a different perspective and to learn more about its history in the US.\n\nReminds me a bit of \"Can't hurt me\" by David Goggins (which I also listened to as an audio book during runs), but with a very different vibe and perspectives (given the difference between the authors).\n\n#running #alisonmarielladesir"
		},
		{
			"url": "https://www.instagram.com/zehreads/p/CrZonf2tSOS/",
			"media": "https://scontent-ord5-1.cdninstagram.com/v/t51.2885-15/342533006_651120320187035_429765947120989962_n.webp?stp=dst-jpg_e35_s640x640_sh0.08&_nc_ht=scontent-ord5-1.cdninstagram.com&_nc_cat=111&_nc_ohc=cl5mO9b7_jEAX9uofbS&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfCrquaQGmLLP_jjUhHQGIJF9lNfJJDTTS-Qcm5FQ1eZhw&oe=65987199&_nc_sid=8b3546",
			"text": "⭐⭐⭐ A bit uneven, but a fun, informative read.\n\n#justread #bookstagram"
		},
		{
			"url": "https://www.instagram.com/zehreads/p/CqW6FTltuYJ/",
			"media": "https://scontent-ord5-1.cdninstagram.com/v/t51.2885-15/337917875_207486998568453_6178813459340553040_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&_nc_ht=scontent-ord5-1.cdninstagram.com&_nc_cat=109&_nc_ohc=YFhFfSDJRh0AX_zTs5o&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfA2Dld5Kk6Rc0NZ12bBPgc8ebNZBF3eof__DCLfChJAdw&oe=6597FDBC&_nc_sid=8b3546",
			"text": "⭐⭐⭐⭐ The best in the series.\n\nI wasn't too thrilled with the author's first book, I'll confess. But I think she has found her footing with this third one. It's less space adventure, and more of a feast for the mind, as it's full of novel scenarios that make you wonder. As sci-fi should be.\n\n#justread #bookstagram #scifi"
		},
		{
			"url": "https://www.instagram.com/zehreads/p/CpjK63LtoMD/",
			"media": "https://scontent-ord5-2.cdninstagram.com/v/t51.2885-15/334786530_185574674202556_1449189093702360298_n.webp?stp=dst-jpg_e35_s640x640_sh0.08&_nc_ht=scontent-ord5-2.cdninstagram.com&_nc_cat=104&_nc_ohc=1zFE4YqOgp8AX8gNWFK&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfBW5LQB79UwaF4KIZbR6y8zPdsCTWR9CayO07HcgOcM0w&oe=65988601&_nc_sid=8b3546",
			"text": "⭐⭐⭐⭐ Perfectly introspective, and yet exciting to read.\n\n#justread #bookstagram #scifi"
		},
		{
			"url": "https://www.instagram.com/zehreads/p/CoTqkqXt-TC/",
			"media": "https://scontent-ord5-2.cdninstagram.com/v/t51.2885-15/328965144_655790896443847_2711484405424307644_n.webp?stp=dst-jpg_e35_s640x640_sh0.08&_nc_ht=scontent-ord5-2.cdninstagram.com&_nc_cat=107&_nc_ohc=CfBCA6SzI8IAX8gh_ze&edm=APU89FABAAAA&ccb=7-5&oh=00_AfBnS1PWYIP5LBr1M-Lh71fuGEFbEHVYOzDFc0M8bmQBcQ&oe=6598A0DE&_nc_sid=bc0c2c",
			"text": "⭐⭐⭐ Starts slow, but gets exciting along the way.\n\nNot my favorite sci-fi style, I have to admit. Characters are a bit cartoony and it feels like it was written to be made into a TV series. But I appreciated the novel approach to inter species relationships and mature culture clashes. I think it's the first time I've seen both covered to this extent.\n\nExcited to see where the series goes.\n\n#justread #bookstagram #scifi"
		},
		{
			"url": "https://www.instagram.com/zehreads/p/CnfeNBEvwch/",
			"media": "https://scontent-ord5-1.cdninstagram.com/v/t51.2885-15/325791878_710642824014721_8513080945741218115_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&_nc_ht=scontent-ord5-1.cdninstagram.com&_nc_cat=101&_nc_ohc=osiKlBqJvaAAX_ThjNM&edm=APU89FABAAAA&ccb=7-5&oh=00_AfD7mpb0rs-9-HWS2iOkj7grE34nn9A0BwDZeC1vh3ukDA&oe=6597585C&_nc_sid=bc0c2c",
			"text": "⭐⭐⭐ Ok reference. Some nice tidbits, but a bit uneven and not as \"atomic\" as it advertises.\n\n#justread #bookstagram #kotlin"
		}
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
				INCLUDE_WORDS.every((w) => i.text.includes(w)) &&
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
