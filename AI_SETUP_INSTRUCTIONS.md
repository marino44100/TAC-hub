# 🤖 TAC-HUB AI Assistant Setup Instructions

## 🚨 **Current Issue: AI Running in Fallback Mode**

Your AI assistant is currently showing fallback responses because the OpenAI API key isn't configured properly on Vercel.

## 🔑 **Step 1: Get OpenAI API Key**

1. **Visit**: https://platform.openai.com/api-keys
2. **Sign up/Login** to OpenAI account
3. **Add billing information** (required for API access)
   - Go to Settings → Billing
   - Add payment method
   - Add credits ($5-10 minimum recommended)
4. **Create new API key**:
   - Click "Create new secret key"
   - Name it "TAC-HUB-Production"
   - Copy the key (starts with `sk-proj-...`)
   - **IMPORTANT**: Save it securely - you won't see it again!

## 🚀 **Step 2: Configure Vercel Environment Variables**

### **For Vercel Deployment (MAIN ISSUE):**

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Select your TAC-HUB project**
3. **Navigate**: Settings → Environment Variables
4. **Add new variable**:
   - **Name**: `OPENAI_API_KEY`
   - **Value**: Your actual OpenAI API key (e.g., `sk-proj-abc123...`)
   - **Environments**: Select all (Production, Preview, Development)
5. **Click "Save"**
6. **Redeploy your application**:
   - Go to Deployments tab
   - Click "..." on latest deployment
   - Select "Redeploy"

### **For Local Development:**

1. **Update `.env.local` file**:
   ```
   OPENAI_API_KEY=sk-proj-your-actual-api-key-here
   ```
2. **Restart development server**:
   ```bash
   npm run dev
   ```

## 🔧 **Step 3: Verify Setup**

### **Test Locally:**
1. Start your development server: `npm run dev`
2. Open http://localhost:3000
3. Click the blue chat button (bottom right)
4. Ask: "Tell me about the Congo Basin"
5. Should get detailed AI response (not fallback)

### **Test on Vercel:**
1. Visit your deployed Vercel URL
2. Click the blue chat button
3. Ask any question about climate or Congo Basin
4. Should get intelligent ChatGPT-4 responses

## 🐛 **Troubleshooting**

### **Still Getting Fallback Responses?**

1. **Check Vercel Environment Variables**:
   - Ensure `OPENAI_API_KEY` is set correctly
   - Verify it's enabled for Production environment
   - Make sure there are no extra spaces

2. **Check API Key Validity**:
   - Ensure billing is set up on OpenAI account
   - Verify API key hasn't expired
   - Test API key with a simple curl request

3. **Check Deployment**:
   - Redeploy after adding environment variables
   - Check Vercel function logs for errors
   - Verify the deployment is using latest code

### **Common Issues:**

- **"API key not configured"**: Environment variable not set in Vercel
- **"Invalid API key"**: Wrong key or billing not set up
- **"Rate limit exceeded"**: Too many requests, wait or upgrade plan
- **"Insufficient quota"**: Add more credits to OpenAI account

## 💰 **OpenAI Pricing**

- **GPT-4**: ~$0.03 per 1K tokens input, ~$0.06 per 1K tokens output
- **Typical conversation**: ~$0.01-0.05 per exchange
- **Recommended starting budget**: $10-20 for testing

## 🔒 **Security Best Practices**

1. **Never commit API keys** to version control
2. **Use environment variables** for all secrets
3. **Monitor usage** in OpenAI dashboard
4. **Set usage limits** to prevent unexpected charges
5. **Rotate keys** periodically for security

## ✅ **Expected Behavior After Setup**

Once properly configured, your AI assistant will:

- **Provide detailed responses** about Congo Basin conservation
- **Answer climate questions** with scientific accuracy
- **Help with platform features** and navigation
- **Maintain conversation context** across multiple messages
- **Offer traditional knowledge** insights from African communities
- **Give specific guidance** on TAC-HUB tools and features

## 📞 **Need Help?**

If you're still having issues:

1. **Check Vercel function logs** for detailed error messages
2. **Verify OpenAI account status** and billing
3. **Test API key** with a simple API call
4. **Ensure environment variables** are properly set and deployed

The AI assistant is fully functional once the API key is properly configured!
