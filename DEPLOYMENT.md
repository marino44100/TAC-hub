# TAC-HUB Deployment Guide

This guide will help you deploy TAC-HUB to Vercel for production use.

## 🚀 Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/tac-hub)

## 📋 Pre-Deployment Checklist

### 1. Prepare Your Repository

```bash
# Clone or ensure you have the latest code
git clone https://github.com/your-username/tac-hub.git
cd tac-hub

# Install dependencies
npm install

# Run optimization script
npm run optimize

# Check deployment readiness
npm run deploy-check

# Test production build locally
npm run preview
```

### 2. Environment Variables

Create a `.env.production` file with the following variables:

```env
NEXT_PUBLIC_APP_NAME=TAC-HUB
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
NODE_ENV=production
```

## 🌐 Vercel Deployment

### Method 1: GitHub Integration (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js configuration

3. **Configure Environment Variables**
   - In Vercel dashboard, go to Project Settings > Environment Variables
   - Add your production environment variables
   - Set `NODE_ENV` to `production`

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy automatically
   - Your site will be available at `https://your-project.vercel.app`

### Method 2: Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

## ⚙️ Configuration Files

The project includes optimized configuration files for Vercel:

### `vercel.json`
```json
{
  "version": 2,
  "name": "tac-hub",
  "framework": "nextjs",
  "regions": ["iad1"]
}
```

### `next.config.js`
- Optimized for Vercel deployment
- Image optimization enabled
- Security headers configured
- Bundle optimization

## 🔧 Build Optimization

### Performance Features
- **Static Generation**: Pages are pre-built for faster loading
- **Image Optimization**: Automatic WebP/AVIF conversion
- **Bundle Splitting**: Optimized JavaScript chunks
- **Compression**: Gzip compression enabled
- **Caching**: Optimized cache headers

### SEO Features
- **Meta Tags**: Complete OpenGraph and Twitter cards
- **Sitemap**: Auto-generated sitemap.xml
- **Robots.txt**: Search engine optimization
- **Structured Data**: JSON-LD for better indexing

### PWA Features
- **Manifest**: Web app manifest for mobile installation
- **Service Worker**: Offline functionality (optional)
- **App Icons**: Multiple icon sizes for different devices

## 🔒 Security

### Headers
- Content Security Policy
- X-Frame-Options
- X-Content-Type-Options
- Referrer Policy
- Strict Transport Security

### Environment Variables
- Sensitive data stored in environment variables
- Production/development environment separation
- No secrets in client-side code

## 📊 Monitoring

### Analytics
- Built-in Vercel Analytics
- Performance monitoring
- Error tracking
- User behavior insights

### Performance
- Core Web Vitals tracking
- Lighthouse CI integration
- Bundle size monitoring
- Load time optimization

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Check for TypeScript errors
   npm run lint
   
   # Test build locally
   npm run build
   ```

2. **Environment Variables Not Working**
   - Ensure variables are prefixed with `NEXT_PUBLIC_` for client-side access
   - Check Vercel dashboard environment variables
   - Redeploy after adding new variables

3. **Images Not Loading**
   - Check `next.config.js` image domains
   - Verify image URLs are accessible
   - Check Vercel function logs

4. **404 Errors**
   - Verify file structure matches Next.js conventions
   - Check dynamic routes configuration
   - Review `vercel.json` routing rules

### Debug Commands

```bash
# Check deployment status
vercel ls

# View deployment logs
vercel logs

# Check build output
npm run build

# Analyze bundle size
npm run build:analyze
```

## 🔄 Continuous Deployment

### Automatic Deployments
- Push to `main` branch triggers production deployment
- Pull requests create preview deployments
- Branch deployments for feature testing

### Deployment Hooks
- Pre-build optimization
- Post-build validation
- Automated testing integration

## 📈 Post-Deployment

### 1. Verify Deployment
- [ ] Site loads correctly
- [ ] All pages accessible
- [ ] Forms submit properly
- [ ] Analytics tracking
- [ ] Mobile responsiveness

### 2. Performance Testing
```bash
# Run Lighthouse audit
npx lighthouse https://your-domain.vercel.app

# Check Core Web Vitals
# Use Google PageSpeed Insights
```

### 3. SEO Validation
- [ ] Meta tags present
- [ ] Sitemap accessible
- [ ] Robots.txt configured
- [ ] Social media previews working

### 4. Security Check
- [ ] HTTPS enabled
- [ ] Security headers active
- [ ] No sensitive data exposed
- [ ] CSP policies working

## 🆘 Support

### Resources
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [TAC-HUB GitHub Issues](https://github.com/your-username/tac-hub/issues)

### Getting Help
1. Check the troubleshooting section above
2. Review Vercel deployment logs
3. Create an issue on GitHub
4. Contact the development team

## 🎉 Success!

Your TAC-HUB platform is now live and ready to empower Congo Basin communities with climate action tools!

### Next Steps
1. Set up custom domain (optional)
2. Configure analytics and monitoring
3. Set up automated backups
4. Plan for scaling and updates
5. Monitor performance and user feedback

---

**Happy Deploying! 🚀**
