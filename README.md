# nazaryah-build-assets

Shared artwork, fonts, and build scripts for nazaryah.com. This repository exists
so that share images can be generated from any session without re-uploading
source files. Nothing in it is private: no site code, no keys, no content drafts.

The repository must remain public. A private repository cannot be read by the
tooling that consumes it.

## Contents

```
assets/
  nazaryah-mark.png            shofar-and-moon emblem, black ground, 820x290
  nazaryah-mark-alpha.png      same emblem with the black knocked out
  nazaryah-logo-card.png       full logo card, the master source for the mark
  nazaryah-logo-oval-alpha.png oval lockup with transparent ground
  Gelasio-Regular.ttf
  Gelasio-Italic.ttf
  Gelasio-SemiBold.ttf
  Gelasio-Bold.ttf
art/
  (empty; additional artwork goes here as it is produced)
nazaryah-social-images 0804 V2.py
```

## Typography

Gelasio is a Georgia-metric face released under the SIL Open Font License by the
Gelasio Project Authors. It is redistributable, which Georgia is not, so it
carries the house lettering in every generated image.

## Generating share images

```
python "nazaryah-social-images 0804 V2.py" \
    --kicker "THE WATCHMAN'S DESK" \
    --title  "The Wedge Is Quiet" \
    --deck   "Nobody swung anything. The house came apart on its own." \
    --slug   the-wedge-is-quiet \
    --outdir out
```

Two files are written per piece: a 1200x630 link-preview card and a 1280x720
YouTube thumbnail. The title wraps and steps down in size automatically when it
runs long; the deck line wraps at the same margin.

## House look

Black ground. Thin gold frame inset from the edge. Kicker in letterspaced gold
small caps. Title in cream. A short gold rule beneath the title. Deck line in
gold italic. The emblem sits lower right, NAZARYAH.COM lower left.

## Adding artwork

Drop new files into `art/` and record what each one is for in this file. Raster
art belongs here rather than in the site repository so that image generation and
site deployment stay independent of one another.
