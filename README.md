# 🌙 Memecoin Clock - Time Travel Portal

An interactive memecoin news and stats dashboard with a beautiful time-travel clock. Jump to any date and time to see memecoin market data and news from that moment!

## ✨ Features

- **⏰ Interactive Time Portal**: Select any date and time to view historical memecoin data
- **📊 Live Memecoin Stats**: Real-time prices, market caps, and 7-day performance charts for top memecoins
- **📰 Breaking News**: Latest news articles about memecoins from multiple sources
- **🌈 Stunning UI**: Neon-themed crypto aesthetic with smooth animations
- **📱 Fully Responsive**: Works perfectly on mobile, tablet, and desktop
- **⚡ Production Ready**: Built with Next.js 14, optimized for Vercel deployment

## 🚀 Quick Start

### 1. Clone or Download
```bash
# Option A: Clone from GitHub (if you uploaded it)
git clone <your-repo-url> memecoin-clock
cd memecoin-clock

# Option B: Copy the folder manually
# Just copy the entire memecoin-clock folder to your desired location
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
```bash
# Copy the example file
cp .env.example .env.local

# Edit .env.local and add your API keys (optional)
# The app works without keys but will show mock data
nano .env.local
```

### 4. Run Locally
```bash
npm run dev
```

Visit `http://localhost:3000` in your browser!

## 🔑 API Keys (Optional)

### NewsAPI (for real news articles)
1. Go to [newsapi.org](https://newsapi.org)
2. Sign up for a free account
3. Copy your API key
4. Add to `.env.local`:
```
NEXT_PUBLIC_NEWS_API_KEY=your_key_here
```

**Without this key**, the app shows realistic mock news data, so it still works great!

### CoinGecko API (for memecoin data)
✅ **No API key needed!** The app uses the free public CoinGecko API

## 🎨 Design Highlights

- **Neon Aesthetic**: Cyan, magenta, and pink glowing text effects
- **Smooth Animations**: Fade-ins, glowing effects, and hover transitions
- **Dark Theme**: Easy on the eyes with cyberpunk vibes
- **Interactive Clock**: Drag-and-drop style time selection with quick jump buttons
- **Responsive Grid**: Adapts perfectly to any screen size

## 📂 Project Structure

```
memecoin-clock/
├── src/
│   ├── app/
│   │   ├── layout.jsx          # Root layout
│   │   ├── page.jsx            # Main dashboard
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── InteractiveClock.jsx # Time selector component
│   │   ├── MemecoinCard.jsx    # Coin display card
│   │   └── NewsCard.jsx        # News article card
│   ├── pages/
│   │   └── api/
│   │       ├── memecoins.js    # Coin data endpoint
│   │       └── news.js         # News endpoint
│   ├── lib/
│   │   └── utils.js            # API calls and helpers
│   └── styles/
│       └── globals.css         # Global styles
├── public/                      # Static assets
├── package.json
├── next.config.js
├── tailwind.config.js
└── .env.example
```

## 🌐 Deploy on Vercel

### Option 1: GitHub Integration (Recommended)
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Select your GitHub repository
5. Add environment variables in project settings
6. Click "Deploy" - Done! 🎉

### Option 2: Direct Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project folder
vercel
```

### Option 3: Vercel Dashboard Upload
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select "Other" > "Create from GitHub"
4. Or drag-and-drop the folder

## 🔧 Commands

```bash
# Development
npm run dev          # Start dev server (localhost:3000)

# Production
npm run build        # Build for production
npm run start        # Start production server

# Linting
npm run lint         # Check code quality
```

## 📱 Mobile Optimization

- Touch-friendly buttons and inputs
- Responsive grid (1 col mobile, 2 cols tablet, 3 cols desktop)
- Optimized font sizes for readability
- Smooth scrolling and touch interactions

## 🎯 Memcoins Tracked

The dashboard includes real-time data for:
- 🐕 Dogecoin (DOGE)
- 🐶 Shiba Inu (SHIB)
- 🐸 Pepe (PEPE)
- 🔥 Floki (FLOKI)
- 💣 Bonk (BONK)
- 👶 Baby Doge Coin
- 🏯 Kabosu
- 🎸 Brett

Add more coins by editing `MEMECOINS` in `src/lib/utils.js`

## 🎨 Customization

### Change Colors
Edit `tailwind.config.js`:
```js
colors: {
  neon: {
    blue: '#00f0ff',     // Cyan
    purple: '#ff00ff',   // Magenta
    pink: '#ff006e',     // Hot pink
    green: '#39ff14',    // Lime
    yellow: '#ffff00',   // Yellow
  },
}
```

### Change Fonts
Update font imports in `src/styles/globals.css` and `tailwind.config.js`

### Change Animations
Modify keyframes in `tailwind.config.js`

## 📊 Data Sources

- **Prices & Stats**: [CoinGecko API](https://www.coingecko.com/api) (free, no auth)
- **News**: [NewsAPI.org](https://newsapi.org) (free tier available)
- **Charts**: SVG sparklines (built-in)

## ⚡ Performance

- ✅ Server-side API calls (fast & secure)
- ✅ Optimized images with Next.js Image component
- ✅ CSS animations (hardware accelerated)
- ✅ Responsive design (mobile-first)
- ✅ Vercel CDN (global distribution)

## 🐛 Troubleshooting

### "Data not loading"
1. Check internet connection
2. Verify API keys in `.env.local`
3. Check browser console for errors (F12)
4. Try opening in incognito mode

### "News not showing"
- Without NewsAPI key, you'll see mock data (by design!)
- Add your key to `.env.local` to see real news

### "Styles not loading"
```bash
# Reinstall dependencies
rm -rf node_modules
npm install

# Clear Next.js cache
rm -rf .next
npm run dev
```

## 📝 License

MIT - Free to use and modify!

## 🚀 Next Steps

1. **Setup**: Follow "Quick Start" above
2. **Customize**: Edit colors, add more coins, change text
3. **Deploy**: Push to GitHub and connect to Vercel
4. **Share**: Send the link to friends!

## 💬 Support

- Check `.env.example` for configuration
- Review component files for JSDoc comments
- Next.js docs: [nextjs.org](https://nextjs.org)
- Tailwind CSS: [tailwindcss.com](https://tailwindcss.com)

---

**Built with ❤️ for the memecoin community** 🚀
