# AL-Ghani Real Estate & Builders

Official web application and digital portfolio for **AL-Ghani Real Estate & Builders** — Authorised Sales Partner of Al-Rehman Developers & Town Planners in **Al Rehman Garden Phase 7, Lahore**.

- **Principal / CEO**: Ch. Arshad Arif
- **Location**: Al Rehman Garden Phase 7, Lahore (`H58P+G6, Thikriwala, Pakistan`)
- **Hours**: Open Daily · Closes 10:00 PM
- **Phone / WhatsApp**: `+92 303 0823898` (`0303-0823898`)
- **Google Rating**: 5.0 ★ (12 Verified Reviews)

---

## GitHub Par Publish Karne Ka Tarika (How to Publish on GitHub)

### Method 1: Direct Export from Google AI Studio (Sab se Aasan)
1. AI Studio ke top-right toolbar mein **Export / Save to GitHub** (ya **Download ZIP**) button par click karein.
2. Agar **Save to GitHub** option select karein, to apna GitHub account connect karein aur repository ka naam rakhein (maslan: `al-ghani-real-estate`).
3. Repository create hone ke baad GitHub par jayein -> **Settings** -> **Pages** -> **Build and deployment** -> **Source** mein **GitHub Actions** select karein. Aapki website live link par publish ho jayegi!

### Method 2: Manual Git Commands (Agar ZIP download kiya hai)
Apne computer par ZIP extract karein aur terminal mein yeh commands chalayein:

```bash
git init
git add .
git commit -m "Initial commit: AL-Ghani Real Estate & Builders"
git branch -M main
git remote add origin https://github.com/<YOUR-GITHUB-USERNAME>/<YOUR-REPO-NAME>.git
git push -u origin main
```

---

## Local Development

```bash
npm install
npm run dev
```

Production build banane ke liye:

```bash
npm run build
```
