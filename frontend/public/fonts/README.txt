Neue Montreal — font files go here
==================================

The site is set up to use Neue Montreal for every section (body + headings).
The font is commercially licensed from Pangram Pangram, so the files are NOT
committed to this repo. You need to add them yourself from your licence.

Drop these four files into this folder, named exactly:

    NeueMontreal-Regular.woff2     (weight 400)
    NeueMontreal-Medium.woff2      (weight 500)
    NeueMontreal-Bold.woff2        (weight 700 — also serves 600 and 800)
    NeueMontreal-Italic.woff2      (weight 400, italic)

Then uncomment this line in src/main.jsx:

    // import './fonts.css'

That file holds the @font-face rules and is intentionally left unimported
until the files exist. Importing it early makes the browser request fonts that
aren't there; because this app uses BrowserRouter, the SPA fallback answers
those requests with index.html and a 200, so the browser tries to parse HTML
as a font and logs "OTS parsing error: invalid sfntVersion: 1008813135"
(0x3C21444F = the ASCII bytes "<!DO").

--font-family / --font-headings in index.css already list 'Neue Montreal'
first, so nothing else needs changing.

Until the files exist the site falls back to Plus Jakarta Sans / Sora, so it
keeps its current appearance rather than dropping to Arial. Once the files are
in place, Neue Montreal takes over automatically on reload.

If you only have .otf or .ttf, convert to .woff2 first — it is roughly half
the size and is what every current browser wants. Any web font converter or
`fonttools` will do it:

    pip install fonttools brotli
    fonttools ttLib.woff2 compress NeueMontreal-Regular.otf

Licence note: only use files covered by your own Neue Montreal licence, and
check that it includes web/@font-face embedding — desktop-only licences do
not permit serving the font from a website.
