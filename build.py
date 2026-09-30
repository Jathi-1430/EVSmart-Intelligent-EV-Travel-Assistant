"""Render the Flask app into a static site in ./public (for Netlify, GitHub Pages, etc.)."""
import shutil
from pathlib import Path
from app import app

OUT = Path("public")
PAGES = {"/": "index.html", "/planner": "planner.html", "/charging": "charging.html",
         "/battery": "battery.html", "/emergency": "emergency.html"}

if OUT.exists():
    shutil.rmtree(OUT)
OUT.mkdir()

client = app.test_client()
for url, filename in PAGES.items():
    resp = client.get(url)
    assert resp.status_code == 200, f"{url} -> {resp.status_code}"
    (OUT / filename).write_bytes(resp.data)
    print("built", filename)

shutil.copytree("static", OUT / "static")
print("done -> public/")
