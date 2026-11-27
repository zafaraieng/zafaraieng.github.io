#!/usr/bin/env python3
"""Pad the CALICO scoreboard PNG with white margins.

The screenshot was captured with its right edge cutting the last table
column mid-character (content runs to x=1647 of width 1648, no margin).
Padding cannot restore the lost pixels, but it makes the truncation a
property of the screenshot itself rather than something the lightbox
appears to cause. Keep 8px uniform white border so the table reads as a
contained screenshot inside the lightbox.
"""
from PIL import Image

from pathlib import Path

SRC = Path(__file__).resolve().parent.parent / 'public' / 'certificates' / 'calico-scoreboard.png'
SRC = str(SRC)
PAD = 8

im = Image.open(SRC).convert('RGB')
canvas = Image.new('RGB', (im.width + 2 * PAD, im.height + 2 * PAD), (255, 255, 255))
canvas.paste(im, (PAD, PAD))
canvas.save(SRC)
print('padded:', canvas.size)
