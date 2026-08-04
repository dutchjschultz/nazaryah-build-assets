#!/usr/bin/env python3
"""
nazaryah-social-images  0804 V2

Generates the two share images for a nazaryah.com piece from its title and deck
line: a 1200x630 link-preview card and a 1280x720 YouTube thumbnail.

House look: black ground, thin gold frame, kicker in letterspaced small caps,
title in cream, deck in gold italic, the shofar-and-moon mark lower right,
NAZARYAH.COM lower left. Lettering is Gelasio, a Georgia-metric face under the
Open Font License, so the files are redistributable.

Usage:
    python nazaryah-social-images.py \
        --kicker "THE WATCHMAN'S DESK" \
        --title  "The Wedge Is Quiet" \
        --deck   "Nobody swung anything. The house came apart on its own." \
        --slug   the-wedge-is-quiet \
        --outdir out

Assets are resolved from --assets (default ./assets) and must contain
nazaryah-mark.png plus the four Gelasio faces.
"""

import argparse
import os
from PIL import Image, ImageDraw, ImageFont

BLACK = (8, 8, 8)
CREAM = (244, 238, 226)
GOLD = (198, 150, 42)
GOLD_BRIGHT = (222, 176, 74)
FRAME = (140, 105, 32)

SIZES = {
    "card": (1200, 630),
    "thumb": (1280, 720),
}


def font(assets, face, size):
    return ImageFont.truetype(os.path.join(assets, f"Gelasio-{face}.ttf"), size)


def track_text(draw, xy, text, fnt, fill, tracking=0, anchor_left=True):
    """Draw text with manual letterspacing. Returns the width drawn."""
    x, y = xy
    total = sum(draw.textlength(ch, font=fnt) + tracking for ch in text) - tracking
    if not anchor_left:
        x -= total
    for ch in text:
        draw.text((x, y), ch, font=fnt, fill=fill)
        x += draw.textlength(ch, font=fnt) + tracking
    return total


def wrap(draw, text, fnt, max_w):
    words, lines, cur = text.split(), [], ""
    for w in words:
        trial = (cur + " " + w).strip()
        if draw.textlength(trial, font=fnt) <= max_w:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def build(kind, kicker, title, deck, assets):
    W, H = SIZES[kind]
    scale = W / 1200.0
    img = Image.new("RGB", (W, H), BLACK)
    d = ImageDraw.Draw(img)

    m = int(38 * scale)
    d.rectangle([m, m, W - m, H - m], outline=FRAME, width=max(1, int(2 * scale)))

    pad = int(78 * scale)
    y = int(96 * scale)

    f_kick = font(assets, "SemiBold", int(21 * scale))
    track_text(d, (pad, y), kicker.upper(), f_kick, GOLD, tracking=5.5 * scale)
    y += int(52 * scale)

    title_size = int(78 * scale)
    f_title = font(assets, "Bold", title_size)
    max_w = W - pad * 2 - int(150 * scale)
    lines = wrap(d, title, f_title, max_w)
    while len(lines) > 3 and title_size > 40:
        title_size -= 4
        f_title = font(assets, "Bold", title_size)
        lines = wrap(d, title, f_title, max_w)
    for ln in lines:
        d.text((pad, y), ln, font=f_title, fill=CREAM)
        y += int(title_size * 1.16)

    y += int(18 * scale)
    d.line([pad, y, pad + int(120 * scale), y], fill=GOLD, width=max(1, int(2 * scale)))
    y += int(30 * scale)

    f_deck = font(assets, "Italic", int(31 * scale))
    for ln in wrap(d, deck, f_deck, max_w):
        d.text((pad, y), ln, font=f_deck, fill=GOLD_BRIGHT)
        y += int(42 * scale)

    # mark, lower right
    mark = Image.open(os.path.join(assets, "nazaryah-mark-alpha.png")).convert("RGBA")
    mw = int(W * 0.30)
    mh = int(mark.height * mw / mark.width)
    mark = mark.resize((mw, mh), Image.LANCZOS)
    mx, my = W - m - int(26 * scale) - mw, H - m - int(22 * scale) - mh
    img.paste(mark, (mx, my), mark)
    d = ImageDraw.Draw(img)

    f_dom = font(assets, "SemiBold", int(20 * scale))
    track_text(d, (pad, H - m - int(46 * scale)), "NAZARYAH.COM", f_dom, GOLD,
               tracking=4.5 * scale)
    return img


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--kicker", required=True)
    ap.add_argument("--title", required=True)
    ap.add_argument("--deck", required=True)
    ap.add_argument("--slug", required=True)
    ap.add_argument("--assets", default="assets")
    ap.add_argument("--outdir", default=".")
    a = ap.parse_args()
    os.makedirs(a.outdir, exist_ok=True)
    for kind, suffix in (("card", "card-1200x630"), ("thumb", "thumb-1280x720")):
        img = build(kind, a.kicker, a.title, a.deck, a.assets)
        out = os.path.join(a.outdir, f"{a.slug}-{suffix}.png")
        img.save(out)
        print(out, img.size)


if __name__ == "__main__":
    main()
