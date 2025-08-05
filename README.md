![Personal Notes Manager](./Screenshots/login.png)

<div align="center">

  <h1>📒 NotoSpace</h1>

  <p>
    A full-stack MERN application with OAuth authentication and a modern, responsive UI  
    for managing personal notes. <br />
    Built with Uniqueness and Hardwork.
  </p>

</div>


## 🌟 Features

- 🔐 **OAuth Authentication** - Secure Google OAuth 2.0 login system
- 📝 **Full CRUD Operations** - Create, Read, Update, Delete notes with ease
- 🎨 **Modern UI/UX** - Clean and intuitive interface with responsive design
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- 🔒 **Enterprise Security** - JWT-based authentication with protected routes
- ⚡ **Real-time Updates** - Instant synchronization and live notifications
- 🎭 **Smooth Animations** - Fluid transitions and hover effects
- 💾 **Auto-save** - Never lose your work with automatic saving
- 🔍 **Search & Filter** - Find your notes quickly with built-in search

## 🚀 Tech Stack

### Frontend
- **React.js** with Vite for lightning-fast development
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for smooth animations (optional)
- **Axios** for API communication
- **React Router** for client-side routing
- **React Icons** for consistent iconography
- **React Hot Toast** for notifications

### Backend
- **Node.js** runtime environment
- **Express.js** web framework
- **MongoDB** with Mongoose ODM
- **Passport.js** for OAuth authentication
- **JWT** for stateless authentication
- **bcryptjs** for password hashing
- **cors** for cross-origin resource sharing
- **helmet** for security headers

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16.0.0 or higher)
- **npm** (v8.0.0 or higher)
- **MongoDB** (local installation or Atlas account)
- **Git** for version control
- **Google Cloud Console** account for OAuth setup

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/personal-notes-manager.git
cd personal-notes-manager
```

### 2. Install Dependencies

```bash
# Install dependencies for both frontend and backend
npm run install-all

# Or install separately
cd backend && npm install
cd ../frontend && npm install
```

### 3. Environment Configuration

Create `.env` files in both directories with the following configurations:

#### Backend Environment (.env)
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/personal-notes
# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/personal-notes

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_complex
JWT_EXPIRE=7d

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Client URL
CLIENT_URL=http://localhost:3000

# Session Secret (if using sessions)
SESSION_SECRET=your_session_secret_key
```

#### Frontend Environment (.env)
```env
# API Configuration
VITE_API_URL=http://localhost:5000/api
VITE_BACKEND_URL=http://localhost:5000

# Google OAuth
VITE_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com

# App Configuration
VITE_APP_NAME=Personal Notes Manager
VITE_APP_VERSION=1.0.0
```

### 4. Google OAuth Setup

1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google+ API** and **Google OAuth2 API**
4. Navigate to **Credentials** → **Create Credentials** → **OAuth 2.0 Client IDs**
5. Configure the OAuth consent screen
6. Add authorized redirect URIs:
   - `http://localhost:5000/auth/google/callback`
   - `http://localhost:3000/auth/callback`
7. Copy the Client ID and Client Secret to your `.env` files

### 5. Database Setup

#### Local MongoDB
```bash
# Start MongoDB service
sudo systemctl start mongod  # Linux
brew services start mongodb-community  # macOS
```

#### MongoDB Atlas (Recommended)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Set up database user and whitelist IP addresses
4. Get connection string and update `MONGODB_URI`

### 6. Run the Application

```bash
# Development mode (runs both frontend and backend)
npm run dev

# Or run separately
npm run server    # Backend only
npm run client    # Frontend only

# Production build
npm run build
npm run start
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000

## 📁 Project Structure

```
personal-notes-manager/
├── 📁 backend/
│   ├── 📁 config/
│   │   └── passport.js              # Passport OAuth configuration
│   ├── 📁 controllers/
│   │   ├── authController.js        # Authentication logic
│   │   └── notesController.js       # Notes CRUD operations
│   ├── 📁 middleware/
│   │   └── auth.js                  # JWT verification middleware
│   ├── 📁 models/
│   │   ├── Note.js                  # Note schema and model
│   │   └── User.js                  # User schema and model
│   ├── 📁 routes/
│   │   ├── auth.js                  # Authentication routes
│   │   └── notes.js                 # Notes API routes
│   ├── 📁 node_modules/             # Backend dependencies
│   ├── .env                         # Backend environment variables
│   ├── package-lock.json
│   ├── package.json                 # Backend dependencies & scripts
│   └── server.js                    # Express server entry point
├── 📁 frontend/
│   ├── 📁 public/                   # Static assets
│   ├── 📁 src/
│   │   ├── 📁 api/
│   │   │   └── axios.js             # Axios configuration & API calls
│   │   ├── 📁 components/
│   │   │   ├── GoogleLoginButton.jsx   # Google OAuth login component
│   │   │   ├── LoadingSpinner.jsx      # Loading animation component
│   │   │   ├── NoteCard.jsx            # Individual note display
│   │   │   └── NoteModal.jsx           # Note create/edit modal
│   │   ├── 📁 context/
│   │   │   └── AuthContext.jsx         # Authentication state management
│   │   ├── 📁 pages/
│   │   │   └── Dashboard.jsx           # Main dashboard page
│   │   ├── App.jsx                     # Main React component
│   │   ├── index.css                   # Global styles & Tailwind
│   │   └── main.jsx                    # React app entry point
│   ├── .env                            # Frontend environment variables
│   ├── package-lock.json
│   ├── package.json                    # Frontend dependencies & scripts
│   ├── tailwind.config.js              # Tailwind CSS configuration
│   └── vite.config.js                  # Vite build configuration
├── .gitignore
├── package.json                        # Root package.json for scripts
└── README.md
```

## 🛣️ API Reference

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/auth/google` | Initiate Google OAuth flow |
| `GET` | `/auth/google/callback` | Handle OAuth callback |
| `POST` | `/auth/logout` | Logout current user |
| `GET` | `/auth/me` | Get current user profile |
| `POST` | `/auth/refresh` | Refresh JWT token |

### Notes Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/notes` | Get all user notes | ✅ |
| `GET` | `/api/notes/:id` | Get specific note | ✅ |
| `POST` | `/api/notes` | Create new note | ✅ |
| `PUT` | `/api/notes/:id` | Update existing note | ✅ |
| `DELETE` | `/api/notes/:id` | Delete note | ✅ |
| `GET` | `/api/notes/search?q=query` | Search notes | ✅ |

### Request/Response Examples

#### Create Note
```javascript
// POST /api/notes
{
  "title": "My Personal Note",
  "content": "This is the content of my note...",
  "tags": ["personal", "ideas"],
  "category": "general"
}

// Response
{
  "success": true,
  "data": {
    "_id": "60f...",
    "title": "My Personal Note",
    "content": "This is the content of my note...",
    "tags": ["personal", "ideas"],
    "category": "general",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

## 🎨 Design Features

### Modern Interface
- Clean and minimalist design
- Intuitive user experience
- Responsive grid layout
- Smooth animations and transitions

### Color Scheme
- Professional and clean color palette
- High contrast for accessibility
- Consistent theming throughout

### Typography
- Modern, readable fonts
- Proper hierarchy and spacing
- Mobile-optimized text sizes

## 🔐 Security Features

- **JWT Authentication** - Stateless, secure token-based auth
- **Password Hashing** - bcrypt with salt rounds
- **Input Validation** - Server-side validation for all inputs
- **Rate Limiting** - Protection against brute force attacks
- **CORS Configuration** - Controlled cross-origin requests
- **Helmet.js** - Security headers
- **Data Sanitization** - XSS protection
- **MongoDB Injection Protection** - Query sanitization



### Environment Variables for Production

Update your production environment variables:
```env
# Backend
MONGODB_URI=your_production_mongodb_uri
CLIENT_URL=https://your-frontend-domain.com

# Frontend
VITE_API_URL=https://your-backend-domain.com/api
VITE_BACKEND_URL=https://your-backend-domain.com
```


## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running locally
   - Check connection string format
   - Verify network access for Atlas

2. **OAuth Not Working**
   - Verify Google Client ID/Secret
   - Check redirect URIs configuration
   - Ensure APIs are enabled in Google Console

3. **CORS Errors**
   - Check CLIENT_URL in backend .env
   - Verify API URLs in frontend .env

4. **JWT Token Issues**
   - Check JWT_SECRET is set
   - Verify token expiration settings


## 📸 Workflow



<table>
  <tr>
    <td width="50%" align="center">
      <img src="./Screenshots/login.png" alt="Landing Page" />
      <p><strong>Landing Page</strong></p>
    </td>
    <td width="50%" align="center">
      <img src="./Screenshots/dashboard.png" alt="Login Process" />
      <p><strong>Dashboard</strong></p>
    </td>
  </tr>
  <tr>
    <td width="50%" align="center">
      <img src="./Screenshots/view.png" alt="Registration Page" />
      <p><strong>Notes Viewing</strong></p>
    </td>
    <td width="50%" align="center">
      <img src="./Screenshots/editnote.png" alt="Dashboard Overview" />
      <p><strong>Edit Notes</strong></p>
    </td>
  </tr>
  <tr>
    <td width="50%" align="center">
      <img src="./Screenshots/gridview.png" alt="Real-time Chat Interface" />
      <p><strong>Grid changing </strong></p>
    </td>
    <td width="50%" align="center">
      <img src="./Screenshots/createnote.png" alt="Group Creation Page" />
      <p><strong>Create a Note</strong></p>
    </td>
  </tr>
  <tr>
    <td width="50%" align="center">
      <img src="./Screenshots/delete.png" alt="Admin Panel - User Management" />
      <p><strong>Delete a note</strong></p>
    </td>
    <td width="50%" align="center">
      <img src="./Screenshots/logout.png" alt="Admin Panel - Content Management" />
      <p><strong>Logout</strong></p>
    </td>
  </tr>
  
</table>



## 🌐 Live Demo

<div align="left">
  <a href="https://notospace.vercel.app/" target="_blank">
    <img src="./Screenshots/login.png" alt="Live Demo" width="200" />
  </a>
  <p><strong>Click the image above to view the live demo</strong></p>
</div>




## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines
- Follow ESLint configuration
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📫 Contact

<div align="left">
  <a href="https://www.instagram.com/SathwikUK" target="_blank">
    <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram" width="40" />
  </a>&nbsp;&nbsp;
  <a href="https://www.linkedin.com/in/sathwikUK" target="_blank">
    <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" width="40" />
  </a>&nbsp;&nbsp;
  <a href="https://github.com/SathwikUK" target="_blank">
    <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub" width="40" />
  </a>&nbsp;&nbsp;
  <a href="mailto:sathwiksampengala@gmail.com" target="_blank">
    <img src="https://img.icons8.com/color/48/000000/new-post.png" alt="Email" width="40" />
  </a>
</div>

**Made with uniqueness and hardwork**

*Ready to organize your thoughts? Clone this repo and start your note-taking journey!*


