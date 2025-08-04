# Quick Start Guide - CyberNotes

Get your Personal Notes Manager running in minutes! 🚀

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Google OAuth credentials

## 1. Clone and Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd personal-notes-manager

# Run the automated setup
npm run setup
```

This will:
- ✅ Install all dependencies
- ✅ Create environment files
- ✅ Check Node.js version
- ✅ Set up the project structure

## 2. Configure Environment

### Backend Configuration (`backend/.env`)

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/notes_manager
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
CLIENT_URL=http://localhost:3000
NODE_ENV=development
```

### Frontend Configuration (`frontend/.env`)

```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
VITE_BACKEND_URL=http://localhost:5000
```

## 3. Google OAuth Setup (5 minutes)

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/
   - Create a new project or select existing one

2. **Enable APIs**
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API" and enable it

3. **Create OAuth Credentials**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - Choose "Web application"

4. **Configure OAuth**
   - **Authorized JavaScript origins:**
     - `http://localhost:3000`
   - **Authorized redirect URIs:**
     - `http://localhost:5000/auth/google/callback`

5. **Copy Credentials**
   - Copy the Client ID and Client Secret
   - Update your `.env` files

## 4. MongoDB Setup

### Option A: Local MongoDB
```bash
# Install MongoDB locally
# Then start the service
mongod
```

### Option B: MongoDB Atlas (Recommended)
1. Go to https://www.mongodb.com/atlas
2. Create a free cluster
3. Get your connection string
4. Update `MONGODB_URI` in `backend/.env`

## 5. Start the Application

```bash
# Start both backend and frontend
npm run dev
```

The application will be available at:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000

## 6. First Login

1. Open http://localhost:3000
2. Click "Access Neural Interface"
3. Sign in with your Google account
4. Start creating your notes! 📝

## Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Kill processes on ports 3000 and 5000
npx kill-port 3000 5000
```

**MongoDB connection failed:**
- Check if MongoDB is running
- Verify your connection string
- Ensure network access (for Atlas)

**OAuth errors:**
- Verify redirect URIs match exactly
- Check Client ID and Secret
- Ensure Google+ API is enabled

**Dependencies issues:**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### Getting Help

- 📖 Check the full README.md
- 🔍 Look at the console logs
- 🐛 Check browser developer tools
- 💬 Open an issue on GitHub

## Features Overview

- 🔐 **Secure OAuth Login** - Google authentication with JWT-only auth
- 📝 **CRUD Operations** - Create, read, update, delete notes
- 🎨 **Cyberpunk UI** - Beautiful neon-themed interface
- 📱 **Mobile Responsive** - Works on all devices
- 🔍 **Search & Filter** - Find notes quickly
- 📌 **Pin Notes** - Keep important notes at top
- 🎨 **Color Coding** - Organize with different colors
- ⚡ **Real-time Updates** - Instant feedback

## Next Steps

- Customize the cyberpunk theme
- Add more OAuth providers
- Implement note sharing
- Add markdown support
- Create note categories/tags

---

**Happy coding! 🎉**

If you enjoy this project, please give it a ⭐ on GitHub! 