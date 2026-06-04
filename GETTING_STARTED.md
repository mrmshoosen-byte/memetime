# 📋 Getting Started Checklist

## ✅ Pre-Setup

- [ ] Have **Node.js 18+** installed ([download](https://nodejs.org))
- [ ] Have **npm** installed (comes with Node.js)
- [ ] Have a text editor (VS Code recommended)
- [ ] Have **Git** installed (for version control)

Check versions:
```bash
node --version   # Should be v18 or higher
npm --version    # Should be 8 or higher
git --version    # Should show version
```

---

## 🚀 Quick Setup (2 minutes)

### Linux/Mac
```bash
chmod +x setup.sh
./setup.sh
```

### Windows
```bash
setup.bat
```

### Manual
```bash
npm install
cp .env.example .env.local
npm run dev
```

---

## 📦 Project Structure

After setup, your folder should look like:
```
memecoin-clock/
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # React components
│   ├── pages/            # API routes
│   ├── lib/              # Utility functions
│   └── styles/           # CSS files
├── public/               # Static files
├── node_modules/         # Dependencies (auto-created)
├── package.json          # Project config
├── next.config.js        # Next.js config
├── tailwind.config.js    # Tailwind config
├── vercel.json           # Vercel config
├── .env.example          # Env template
├── .gitignore            # Git ignore
├── README.md             # Documentation
└── DEPLOYMENT.md         # Deployment guide
```

---

## 🎯 Common Commands

| Command | What it does |
|---------|-------------|
| `npm run dev` | Start local server (localhost:3000) |
| `npm run build` | Prepare for production |
| `npm run start` | Run production build |
| `npm run lint` | Check code quality |
| `npm install` | Install dependencies |

---

## 🔐 Environment Setup

### Option 1: Without NewsAPI (Works, shows demo data)
```bash
# Just run it!
npm run dev
```

### Option 2: With Real News
1. Go to https://newsapi.org
2. Sign up (free)
3. Copy your API key
4. Edit `.env.local`:
```
NEXT_PUBLIC_NEWS_API_KEY=your_key_here
```
5. Restart dev server

---

## 🌐 Local Testing

```bash
# Terminal 1 - Start dev server
npm run dev

# Terminal 2 (optional) - Test API endpoints
curl http://localhost:3000/api/memecoins
curl http://localhost:3000/api/news
```

Visit: http://localhost:3000

---

## 🐛 Troubleshooting

### Issue: "npm: command not found"
**Solution**: Install Node.js from https://nodejs.org

### Issue: Port 3000 already in use
**Solution**: Change port in terminal
```bash
PORT=3001 npm run dev
```

### Issue: Module not found errors
**Solution**: Reinstall dependencies
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: API calls failing
**Solution**: 
1. Check internet connection
2. Check API status (CoinGecko, NewsAPI)
3. Check browser console (F12) for errors
4. Try incognito/private mode

### Issue: Styles not loading
**Solution**: Clear cache
```bash
rm -rf .next
npm run dev
```

### Issue: Build fails locally
```bash
# Full clean reinstall
rm -rf node_modules package-lock.json .next
npm install
npm run build
```

---

## 📱 Browser Testing

Open your browser to http://localhost:3000

### Test responsive design:
- F12 (Developer Tools)
- Click device icon (top-left)
- Test Mobile, Tablet, Desktop

### Test different times:
- Click clock to expand
- Select different dates
- Change times
- Watch data update

### Test news:
- Scroll to news section
- Click "Read Article" links
- Should open in new tab

---

## 🎨 Customization Ideas

### Change Colors
Edit `tailwind.config.js` → `colors.neon`

### Add More Coins
Edit `src/lib/utils.js` → `MEMECOINS` object

### Change Text
Edit component files (look for static text in JSX)

### Add More News Sources
Edit `src/lib/utils.js` → `fetchMemecoinNews()` function

---

## 📊 Performance Checklist

- [ ] Local build time < 30s
- [ ] Page loads in < 2s
- [ ] API responses < 1s
- [ ] No console errors
- [ ] Responsive on all devices

---

## 🚀 Ready to Deploy?

See **DEPLOYMENT.md** for:
- ✅ Push to GitHub
- ✅ Connect to Vercel
- ✅ Add environment variables
- ✅ Go live in 5 minutes

---

## 📚 Learning Resources

- **Next.js**: https://nextjs.org/learn
- **Tailwind CSS**: https://tailwindcss.com/docs
- **React**: https://react.dev
- **APIs**: https://coingecko.com/api/docs, https://newsapi.org/docs

---

## 💡 Pro Tips

1. **Use VS Code** - Better experience with Next.js
2. **Enable auto-save** - Settings > Files: Auto Save
3. **Use Git** - `git commit` before big changes
4. **Keep `.env.local`** - Don't share with others
5. **Read error messages** - Usually tells you what's wrong

---

## ✨ Success Signs

You'll know everything works when:
- ✅ npm run dev starts without errors
- ✅ Browser opens to http://localhost:3000
- ✅ Clock displays with smooth animations
- ✅ Memecoin cards show with prices
- ✅ News section displays articles
- ✅ Time selection works smoothly
- ✅ Responsive design adapts to screen size

---

## 🎉 You're All Set!

**Next Steps:**
1. Run `npm run dev`
2. Explore the dashboard
3. Customize it to your liking
4. Deploy to Vercel
5. Share with friends!

---

**Questions?** Check:
1. Browser console (F12)
2. Terminal output
3. README.md
4. DEPLOYMENT.md
5. Next.js docs

**Happy hacking! 🚀**
