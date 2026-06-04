# 🚀 Deployment Guide

## Deploying to Vercel (Recommended)

### Step 1: Push to GitHub
```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: memecoin-clock dashboard"

# Add remote (replace with your GitHub URL)
git remote add origin https://github.com/YOUR_USERNAME/memecoin-clock.git

# Push
git branch -M main
git push -u origin main
```

### Step 2: Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click **"+ New Project"**
3. Select **"Import Git Repository"**
4. Paste your GitHub repository URL
5. Click **"Import"**

### Step 3: Environment Variables
1. In Vercel project settings, go to **Settings > Environment Variables**
2. Add your variables:
   - **Key**: `NEXT_PUBLIC_NEWS_API_KEY`
   - **Value**: Your NewsAPI key (get at https://newsapi.org)
3. Click **"Save"**

### Step 4: Deploy
1. Click **"Deploy"**
2. Wait for build to complete (2-3 minutes)
3. Get your live URL! 🎉

---

## Custom Domain (Optional)

1. In Vercel project: **Settings > Domains**
2. Add your domain
3. Follow DNS instructions from your domain provider
4. Takes 5-10 minutes to propagate

---

## Environment Variables for Vercel

| Key | Value | Required |
|-----|-------|----------|
| `NEXT_PUBLIC_NEWS_API_KEY` | Your NewsAPI key | ❌ No (shows mock data) |

Get free NewsAPI key: https://newsapi.org

---

## Local Development

```bash
# Install
npm install

# Create .env.local
cp .env.example .env.local

# Edit with your keys
nano .env.local

# Run
npm run dev

# Visit http://localhost:3000
```

---

## Troubleshooting

### Build fails
```bash
# Clear cache locally
rm -rf .next node_modules
npm install
npm run build
```

### Vercel build fails
- Check build logs in Vercel dashboard
- Ensure all environment variables are set
- Verify Node.js version (should be 18+)

### News not showing
- Without `NEXT_PUBLIC_NEWS_API_KEY`, mock data displays
- Get free key: https://newsapi.org
- Add to Vercel environment variables

---

## Advanced Deployment Options

### Using Vercel CLI
```bash
# Install
npm i -g vercel

# Deploy from project folder
vercel

# For production
vercel --prod
```

### Docker (for other platforms)
```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## Performance Tips

- **Caching**: Set aggressive caching headers in `vercel.json`
- **Images**: Use Vercel Image Optimization
- **API Calls**: Add caching to avoid rate limits
- **CDN**: Vercel automatically uses their global CDN

---

## Monitoring

1. **Vercel Analytics**: Enable in project settings
2. **Error Tracking**: Check Vercel logs
3. **Performance**: Use Web Vitals dashboard

---

## Need Help?

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Issues**: Check browser console (F12) for errors

---

**Your site is now live! 🚀**
