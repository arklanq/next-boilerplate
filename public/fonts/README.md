# Bundled fonts

Geist 1.800 and Geist Mono 1.701, copyright 2024 The Geist Project Authors, are distributed under the [SIL Open Font License 1.1](OFL.txt). Both are upright variable fonts with a `wght` axis of 100–900, including Latin, Latin Extended and all Polish letters. The app retains its existing ranges: sans 300–800 and mono 300–900.

The source is pinned to Google Fonts commit [`9e25e2ba265e5298f70f6182dd4e8a3ebf1b9123`](https://github.com/google/fonts/tree/9e25e2ba265e5298f70f6182dd4e8a3ebf1b9123). These versions match the Google Fonts versions served when bundled. Mono 1.701 includes the upstream fix that removes unintended programming ligatures from 1.700.

| File | Source at the pinned commit | SHA-256 of source TTF | SHA-256 of bundled WOFF2 |
| --- | --- | --- | --- |
| `Geist.woff2` | [`ofl/geist/Geist[wght].ttf`](https://github.com/google/fonts/blob/9e25e2ba265e5298f70f6182dd4e8a3ebf1b9123/ofl/geist/Geist%5Bwght%5D.ttf) | `73894e0448cae90a92b6c2f8732b7bb9acb7b94c418bff559dad4a18e1de9659` | `2ffebe993e969069a9789d15164b7715d42491b5835516c5e3b935d5f81b05f1` |
| `GeistMono.woff2` | [`ofl/geistmono/GeistMono[wght].ttf`](https://github.com/google/fonts/blob/9e25e2ba265e5298f70f6182dd4e8a3ebf1b9123/ofl/geistmono/GeistMono%5Bwght%5D.ttf) | `d00e590b8eb3a59acc329b2d044fd143ae935090b7da33199ebee27cc7de8196` | `09853cd11045cf50e8ac07faf08bd5420f181b924f4c65b93b8ee49259a03734` |

Only the container format was changed, using fontTools 4.60.2 with Brotli 1.2.1. No glyphs, metrics, features or variable axes were edited or subsetted. Source timestamps are preserved so repeated conversions produce identical bytes. To repeat the conversion with those versions installed, download the pinned TTF files and run:

```python
from fontTools.ttLib import TTFont

for family in ("Geist", "GeistMono"):
    font = TTFont(f"{family}[wght].ttf", recalcTimestamp=False)
    font.flavor = "woff2"
    font.save(f"{family}.woff2")
```

[`fonts.ts`](../../src/config/fonts/fonts.ts) uses `next/font/local` to emit and preload the fonts with the existing CSS variables and `display: swap`. The license remains in `public` so standalone production output includes it too. Do not replace these imports with build-time Google downloads: a Google CSS font URL containing `&` triggers the Next.js 16.4.2 Turbopack font query parser invariant. Committing the fonts removes that changing external input from both development and production builds.
