# Instagram Grid Creator

Small script to create a grid-like image based on a user's Instagram feed.

## Usage

Install:

```bash
yarn install
```

Run:

```bash
yarn run
```

By default, the script tries searching for images of a particular year and with a particular tag, for my own user (`zehreads`). Edit `index.js` to change the user or search pattern.

## Acknowledgments

Uses [instagram-posts](https://github.com/kevva/instagram-posts) to load a user's Instagram images and [Jimp](https://github.com/oliver-moran/jimp) to generate the final image.

I created this script so I could create galleries of yearly #justread posts (like [this](https://www.instagram.com/p/BsHCzd2ho3v/)) without having to rely on sketchy third-party apps.
