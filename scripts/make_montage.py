"""Build side-by-side montages of professor CV pages for design analysis."""
from PIL import Image
import sys

def montage(files, out, sep=12):
    imgs = [Image.open(f) for f in files]
    h = max(i.height for i in imgs)
    w = sum(i.width for i in imgs) + sep * (len(imgs) + 1)
    m = Image.new("RGB", (w, h), (120, 120, 120))
    x = sep
    for i in imgs:
        m.paste(i, (x, 0))
        x += i.width + sep
    m.save(out, quality=82)
    print(out, m.size)

base = "/tmp/profre/"
montage(
    [base + f for f in ["abdeslam-01.jpg", "pathak-01.jpg", "feifei-01.jpg", "kaiwei-01.jpg"]],
    base + "montage-p1.jpg",
)
montage(
    [base + f for f in ["abdeslam-02.jpg", "pathak-02.jpg", "feifei-02.jpg", "kaiwei-02.jpg"]],
    base + "montage-p2.jpg",
)
