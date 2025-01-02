# Mastodon Grid Creator

Small script to create a grid-like image based on a user's ~~Instagram~~ Mastodon feed using Node.js.

## Usage

Install:

```bash
yarn install
```

Run:

```bash
yarn run create
```

By default, the script tries searching for images of a particular year and with a particular tag, for my own user. Edit `index.js` to change the user or search pattern.

## Acknowledgments

Uses the [Mastodon public API](https://docs-p.joinmastodon.org/client/public/) to load a user's images and [Jimp](https://github.com/oliver-moran/jimp) to generate the final image.

I created this script so I could create galleries of yearly #justread posts (like [this](https://mastodon.gamedev.place/@zeh/111683687853306480)) without having to rely on sketchy or bloated third-party apps.
