# 🕉️ Naam Jap Counter

A simple, mobile-first web app for counting naam jap with a mala of 108 beads.

**Live demo:** https://devtankcodes.github.io/naam-jap-counter/

## Features

- Choose from multiple mantras/sloks, shown in Devanagari
- One big tap button for easy counting
- Shows current bead (out of 108), malas completed and total jap
- Separate count saved for each mantra (localStorage)
- Vibration on every tap, with a longer pattern when a mala completes
- Screen stays awake while chanting
- Undo and Reset (with confirmation)
- Automatic dark mode

## Tech

Plain HTML, CSS and JavaScript. No frameworks, no build step.

## Run locally

Open `index.html` in a browser. For phone testing, use the GitHub Pages link (vibration and wake lock need HTTPS).

## Add your own mantra

Edit the `mantras` array at the top of `script.js`:

```js
{ id: "my-mantra", name: "Name", text: "Mantra text" }
```

## Roadmap

- [ ] PWA (install on phone, work offline)
- [ ] Daily count and streak
- [ ] Daily target
- [ ] Custom mantras from the UI

## License

MIT