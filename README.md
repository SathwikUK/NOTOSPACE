# Personal Notes Manager - Cyberpunk Edition

A full-stack MERN application with OAuth authentication and a cyberpunk-themed UI for managing personal notes.

## Features

- 🔐 **OAuth Authentication** - Google OAuth login
- 📝 **CRUD Operations** - Create, Read, Update, Delete notes
- 🎨 **Cyberpunk UI** - Modern, responsive design with Tailwind CSS
- 📱 **Mobile Responsive** - Works perfectly on all devices
- 🔒 **Secure** - JWT-only authentication with protected routes
- ⚡ **Real-time** - Instant updates and notifications

## Tech Stack

### Frontend
- React.js with Vite
- Tailwind CSS
- Axios for API calls
- React Router for navigation
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Passport.js for OAuth
- JWT-only authentication (no sessions/cookies)
- bcryptjs for password hashing

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Google OAuth credentials

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd personal-notes-manager
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Environment Configuration**

   Create `.env` files in both backend and frontend directories:

   **Backend (.env)**
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   CLIENT_URL=http://localhost:3000
   ```

   **Frontend (.env)**
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_GOOGLE_CLIENT_ID=your_google_client_id
   VITE_BACKEND_URL=http://localhost:5000
   ```

4. **Google OAuth Setup**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URIs:
     - `http://localhost:5000/auth/google/callback` (for backend)
     - `http://localhost:3000` (for frontend)

5. **Database Setup**
   - Set up MongoDB (local or Atlas)
   - Update MONGODB_URI in backend .env file

6. **Run the application**
   ```bash
   npm run dev
   ```

   This will start both backend (port 5000) and frontend (port 3000)

## API Endpoints

### Authentication
- `GET /auth/google` - Initiate Google OAuth
- `GET /auth/google/callback` - OAuth callback
- `GET /auth/logout` - Logout user
- `GET /auth/me` - Get current user

### Notes
- `GET /api/notes` - Get user's notes
- `POST /api/notes` - Create new note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note

## Project Structure

```
personal-notes-manager/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── utils/
│   └── package.json
├── package.json
└── README.md
```

## Features in Detail

### Authentication Flow
1. User clicks "Login with Google"
2. Redirected to Google OAuth
3. After successful authentication, user is redirected back
4. JWT token is generated and stored
5. User can access protected routes

### Notes Management
- Create notes with title and content
- View all user's notes in a grid layout
- Edit existing notes inline
- Delete notes with confirmation
- Real-time updates

### UI/UX Features
- Cyberpunk theme with neon colors
- Responsive grid layout
- Smooth animations and transitions
- Loading states and error handling
- Toast notifications for user feedback

## Security Features

- JWT token-based authentication
- Protected API routes
- User-specific data isolation
- Secure OAuth implementation
- Input validation and sanitization

## Deployment

### Backend Deployment
- Deploy to Heroku, Railway, or similar
- Set environment variables
- Configure MongoDB Atlas

### Frontend Deployment
- Build the React app: `npm run build`
- Deploy to Vercel, Netlify, or similar
- Update API URLs for production

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for learning and development. 