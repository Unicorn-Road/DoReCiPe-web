# App Store Connect API Setup

This guide will help you configure the App Store Connect API to display app metrics in your admin dashboard.

## Prerequisites

- Admin access to App Store Connect
- Team Admin or Account Holder role

## Step 1: Create API Key in App Store Connect

1. Go to [App Store Connect](https://appstoreconnect.apple.com)
2. Navigate to **Users and Access** > **Integrations** > **App Store Connect API**
3. Click the **+** button to generate a new key
4. Configure the key:
   - **Name**: `DoReCiPe Dashboard API`
   - **Access**: Select **Admin** (or minimum required permissions)
5. Click **Generate**
6. **Download the API Key** (`.p8` file) - you can only download this once!
7. Note the following from the key details page:
   - **Issuer ID** (format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)
   - **Key ID** (format: `XXXXXXXXXX`)

## Step 2: Get Your App ID

1. In App Store Connect, go to **My Apps**
2. Select **Do-Re-Ci-Pe**
3. In the URL, find your App ID (numerical):
   - Example: `https://appstoreconnect.apple.com/apps/6745566524/...`
   - Your App ID is: `6745566524`

## Step 3: Configure Environment Variables

Add these variables to your `.env.local` file:

```bash
# App Store Connect API Credentials
APPSTORE_ISSUER_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
APPSTORE_KEY_ID=XXXXXXXXXX
APPSTORE_APP_ID=6745566524
APPSTORE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
MIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQg...
(paste full contents of .p8 file here)
...
-----END PRIVATE KEY-----"
```

### Important Notes:

1. **Private Key Format**: 
   - Open the `.p8` file in a text editor
   - Copy the entire contents including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`
   - Wrap it in double quotes
   - Keep the newlines as-is (they will be handled automatically)

2. **Security**:
   - Never commit `.env.local` to version control
   - The `.gitignore` already excludes this file
   - In Vercel, add these as environment variables in project settings

## Step 4: Deploy Environment Variables to Vercel

1. Go to your [Vercel project settings](https://vercel.com/dashboard)
2. Navigate to **Settings** > **Environment Variables**
3. Add each variable:
   - `APPSTORE_ISSUER_ID`
   - `APPSTORE_KEY_ID`
   - `APPSTORE_APP_ID`
   - `APPSTORE_PRIVATE_KEY`
4. Make sure to select **Production**, **Preview**, and **Development** environments
5. Click **Save**
6. Redeploy your app for changes to take effect

## Step 5: Verify Integration

1. Log into your admin dashboard: `https://dorecipe.app/admin/dashboard`
2. Look for the **📱 App Store Performance** section
3. If credentials are configured correctly, you'll see:
   - Total downloads (from App Analytics)
   - App rating and reviews
   - Revenue data
   - Crash-free rate
   - Recent customer reviews

### Troubleshooting

**"App Store Connect API credentials not configured"**
- Verify all environment variables are set correctly
- Check that the private key includes the full content with header/footer
- Restart your dev server (`npm run dev`)

**"Failed to fetch App Store data"**
- Check the browser console or server logs for detailed error messages
- Verify your API key has the correct permissions in App Store Connect
- Ensure your App ID is correct

**No data showing**
- App Store Connect Analytics has a 24-48 hour delay
- Some metrics require sufficient app usage to display
- Sales/Revenue data may require additional Reporter API configuration

## Available Metrics

The dashboard currently displays:

### From App Store Connect API:
- **App Info**: Current version, release date
- **Ratings & Reviews**: Average rating, count, distribution, recent reviews

### Analytics Data (Requires Additional Setup):
- **Downloads**: Daily/Weekly/Monthly install counts
- **Revenue**: In-app purchases and subscriptions
- **Crashes**: Crash-free percentage
- **Version Adoption**: % of users on latest version

## Advanced: Sales & Trends Data

For detailed download and revenue data, you may need to:

1. Use the **App Store Connect Reporter** tool
2. Download daily/weekly reports programmatically
3. Process CSV files and store in your database
4. See: https://developer.apple.com/documentation/appstoreconnectapi/sales_and_trends

## API Reference

- [App Store Connect API Documentation](https://developer.apple.com/documentation/appstoreconnectapi)
- [App Analytics](https://developer.apple.com/documentation/appstoreconnectapi/app_analytics)
- [Customer Reviews](https://developer.apple.com/documentation/appstoreconnectapi/customer_reviews)
- [Sales and Trends](https://developer.apple.com/documentation/appstoreconnectapi/sales_and_trends)

## Support

If you need help with setup, contact your development team or refer to Apple's official documentation.
