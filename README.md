# 🌍 TravelXP - Mini Travel Experience Listing Platform

<div align="center">

![TravelXP Logo](https://img.shields.io/badge/TravelXP-Experience%20Platform-6366f1?style=for-the-badge)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

_A beautiful, modern platform connecting travelers with unique local experiences worldwide_

[Features](#-features-implemented) • [Installation](#-setup-instructions) • [Architecture](#-architecture--key-decisions) • [Screenshots](#-screenshots)

</div>

---

## 📖 Project Overview

**TravelXP** is a full-stack marketplace web application that bridges the gap between travelers seeking authentic experiences and local experience providers who lack online presence. The platform enables:

- **🎯 For Experience Providers:** Create and manage travel experience listings to reach a global audience
- **✈️ For Travelers:** Discover, save, and engage with unique local experiences worldwide
- **🤝 For Both:** A seamless, beautiful interface with real-time interactions and social features

### Business Value

Many small travel businesses (tour guides, activity hosts, local operators) struggle without their own websites. Travelers also find it challenging to discover authentic local experiences. TravelXP solves both problems by providing a centralized, easy-to-use platform.

---

## 🛠️ Tech Stack

### Frontend

- **Next.js 14** - React framework with App Router for modern server/client rendering
- **TypeScript** - Type-safe development for better code quality
- **Tailwind CSS** - Utility-first CSS framework for beautiful, responsive designs
- **Framer Motion** - Smooth animations and transitions
- **React Hook Form** - Efficient form handling
- **React Hot Toast** - Elegant notification system
- **Axios** - HTTP client for API requests
- **date-fns** - Modern date utility library

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Fast, minimalist web framework
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** - Elegant MongoDB object modeling
- **JWT** - Secure authentication tokens
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **Helmet** - Security middleware
- **Morgan** - HTTP request logger

### DevOps & Tools

- **Nodemon** - Auto-restart development server
- **Concurrently** - Run multiple commands simultaneously
- **ESLint** - Code linting
- **Git** - Version control

---

## ✨ Features Implemented

### Core Features (Required) ✅

#### 1. User Authentication

- ✅ User registration with validation
- ✅ Secure login with JWT tokens
- ✅ Persistent authentication across sessions
- ✅ Protected routes and API endpoints
- ✅ Auto-generated user avatars
- ✅ Logout functionality

#### 2. Create Travel Experience Listing

- ✅ Complete listing form with validation
- ✅ Required fields: Title, Location, Image, Description
- ✅ Optional field: Price
- ✅ Real-time form validation
- ✅ Image upload or URL input

#### 3. Public Feed

- ✅ Display all travel experiences
- ✅ Beautiful card-based layout
- ✅ Show: Image, Title, Location, Description, Creator, Time posted
- ✅ Newest to oldest sorting
- ✅ Responsive grid layout (1/2/3 columns)

#### 4. Listing Detail Page

- ✅ Full listing information display
- ✅ Large image showcase
- ✅ Complete description
- ✅ Price display
- ✅ Creator profile information
- ✅ Engagement statistics

### Additional Features (Bonus) ✅

#### 5. Edit Listing

- ✅ Edit own listings only
- ✅ Pre-populated form with current data
- ✅ Update all listing fields
- ✅ Image replacement capability
- ✅ Authorization checks

#### 6. Delete Listing

- ✅ Delete own listings only
- ✅ Confirmation dialog
- ✅ Immediate UI update
- ✅ Authorization checks

#### 7. Search Listings

- ✅ Real-time search functionality
- ✅ Search across title, location, and description
- ✅ Instant results
- ✅ Clean, intuitive search UI
- ✅ Search state management

#### 8. Like Listing

- ✅ Like/unlike toggle functionality
- ✅ Real-time like count updates
- ✅ Visual feedback (heart icon fill)
- ✅ Like persistence

#### 9. Save Listing

- ✅ Save/unsave toggle functionality
- ✅ Dedicated saved listings page
- ✅ Visual feedback (bookmark icon fill)
- ✅ User-specific saved collections

#### 10. Responsive Mobile UI

- ✅ Fully responsive design
- ✅ Mobile-first approach
- ✅ Tablet and desktop optimizations
- ✅ Touch-friendly interactions
- ✅ Hamburger menu for mobile
- ✅ Adaptive layouts

#### 11. Infinite Scroll & Pagination

- ✅ Infinite scroll implementation
- ✅ Load more on scroll
- ✅ Lazy loading for performance
- ✅ Loading states
- ✅ End-of-results indicator
- ✅ Backend pagination support

#### 12. Image Upload

- ✅ Direct file upload support
- ✅ Image URL alternative
- ✅ File size validation (5MB limit)
- ✅ File type validation (images only)
- ✅ Upload progress feedback
- ✅ Image preview before submission

### UI/UX Enhancements 🎨

- ✅ **Beautiful gradient designs** - Modern color schemes throughout
- ✅ **Smooth animations** - Page transitions, hover effects, loading states
- ✅ **Glass morphism effects** - Backdrop blur and transparency
- ✅ **Custom scrollbar** - Themed to match the design
- ✅ **Micro-interactions** - Button scales, icon fills, card lifts
- ✅ **Loading skeletons** - Shimmer effects for better UX
- ✅ **Toast notifications** - User feedback for all actions
- ✅ **Empty states** - Helpful messages and CTAs
- ✅ **Modal dialogs** - Smooth login/register experiences
- ✅ **Profile pages** - User statistics and listing management
- ✅ **Time formatting** - Human-readable timestamps
- ✅ **Image optimization** - Next.js image handling

---

## 🚀 Setup Instructions

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v5 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **Git** - [Download](https://git-scm.com/)
- **npm** or **yarn** package manager

### Installation Steps

#### 1. Clone the Repository

```bash
git clone <repository-url>
cd "Mini Travel Experience Listing Platform"
```

#### 2. Install Dependencies

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

#### 3. Environment Configuration

##### Backend Environment (.env)

Navigate to the `backend` folder and create a `.env` file:

```bash
cd backend
```

Copy the `.env.example` to `.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/travel-experience-platform
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

**Important:** Change the `JWT_SECRET` to a secure random string in production!

##### Frontend Environment (.env.local)

Navigate to the `frontend` folder and create a `.env.local` file:

```bash
cd ../frontend
```

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

#### 4. Start MongoDB

Ensure MongoDB is running on your system:

```bash
# Windows (if installed as service)
net start MongoDB

# macOS (using Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Or run manually
mongod --dbpath /path/to/your/data/directory
```

#### 5. Run the Application

##### Option A: Run Both Servers Concurrently (Recommended)

From the root directory:

```bash
npm run dev
```

This will start:

- Backend server at `http://localhost:5000`
- Frontend application at `http://localhost:3000`

##### Option B: Run Servers Separately

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
```

#### 6. Access the Application

Open your browser and navigate to:

```
http://localhost:3000
```

The API will be running at:

```
http://localhost:5000
```

### 🎉 You're All Set!

You can now:

1. **Register** a new account
2. **Create** your first travel experience listing
3. **Explore** the feed
4. **Like** and **save** interesting experiences
5. **Search** for specific locations or activities

---

## 📁 Project Structure

```
Mini Travel Experience Listing Platform/
├── backend/                      # Express.js backend
│   ├── config/
│   │   └── db.js                # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   └── listingController.js # Listing CRUD operations
│   ├── middleware/
│   │   ├── auth.js              # JWT authentication middleware
│   │   └── upload.js            # Multer file upload config
│   ├── models/
│   │   ├── User.js              # User schema
│   │   └── Listing.js           # Listing schema
│   ├── routes/
│   │   ├── authRoutes.js        # Auth endpoints
│   │   └── listingRoutes.js     # Listing endpoints
│   ├── uploads/                 # Uploaded images storage
│   ├── .env                     # Environment variables
│   ├── server.js                # Express app entry point
│   └── package.json
│
├── frontend/                     # Next.js frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── create/
│   │   │   │   └── page.tsx     # Create listing page
│   │   │   ├── listings/
│   │   │   │   └── [id]/
│   │   │   │       ├── page.tsx      # Listing detail
│   │   │   │       └── edit/
│   │   │   │           └── page.tsx  # Edit listing
│   │   │   ├── profile/
│   │   │   │   └── page.tsx     # User profile
│   │   │   ├── saved/
│   │   │   │   └── page.tsx     # Saved listings
│   │   │   ├── layout.tsx       # Root layout
│   │   │   ├── page.tsx         # Home page (feed)
│   │   │   └── globals.css      # Global styles
│   │   ├── components/
│   │   │   ├── Navbar.tsx       # Navigation bar
│   │   │   ├── ListingCard.tsx  # Listing card component
│   │   │   ├── LoginModal.tsx   # Login modal
│   │   │   └── RegisterModal.tsx # Register modal
│   │   ├── context/
│   │   │   └── AuthContext.tsx  # Auth state management
│   │   └── lib/
│   │       └── api.ts           # Axios API client
│   ├── public/                  # Static assets
│   ├── .env.local              # Frontend environment
│   ├── next.config.js          # Next.js configuration
│   ├── tailwind.config.js      # Tailwind configuration
│   ├── tsconfig.json           # TypeScript configuration
│   └── package.json
│
├── .gitignore
├── package.json                 # Root package.json
└── README.md                    # This file
```

---

## 🏗️ Architecture & Key Decisions

### Technology Stack Rationale

#### Why MERN Stack with Next.js?

1. **MongoDB**
   - **Schema Flexibility:** Perfect for evolving listing structures (easy to add fields like reviews, ratings, etc.)
   - **JSON-Native:** Natural fit for JavaScript/TypeScript ecosystem
   - **Scalability:** Horizontal scaling capabilities for growing user base
   - **Performance:** Fast queries with proper indexing (text search on listings)

2. **Express.js**
   - **Simplicity:** Minimalist framework, easy to understand and maintain
   - **Middleware Ecosystem:** Rich plugin ecosystem (authentication, validation, file uploads)
   - **RESTful API:** Clean, predictable API design
   - **Performance:** Lightweight and fast

3. **Next.js 14 (React)**
   - **App Router:** Modern, file-based routing with server components
   - **SEO Friendly:** Server-side rendering for listing detail pages (important for discoverability)
   - **Performance:** Image optimization, code splitting, and caching out-of-the-box
   - **Developer Experience:** Hot reload, TypeScript support, built-in optimizations
   - **Full-Stack Capabilities:** API routes for server-side logic if needed

4. **Node.js**
   - **JavaScript Everywhere:** Same language for frontend and backend
   - **Fast Development:** Rapid prototyping and iteration
   - **npm Ecosystem:** Largest package registry for quick feature implementation
   - **Non-Blocking I/O:** Perfect for I/O-heavy operations (database queries, file uploads)

5. **Tailwind CSS**
   - **Rapid UI Development:** Utility-first approach speeds up styling
   - **Consistency:** Design system built-in with customizable theme
   - **Performance:** Purges unused CSS, minimal bundle size
   - **Responsive Design:** Mobile-first utilities make responsive design effortless
   - **Customization:** Extended with custom animations and gradients

### Authentication Architecture

#### How Authentication Works

1. **Registration Flow:**

   ```
   User submits credentials → Backend validates → Password hashed with bcrypt (12 rounds)
   → User created in MongoDB → JWT token generated → Token + user data returned to client
   ```

2. **Login Flow:**

   ```
   User submits credentials → Backend finds user by email
   → Password compared with bcrypt → JWT token generated
   → Token + user data returned to client → Token stored in localStorage
   ```

3. **Protected Routes:**

   ```
   Request to protected endpoint → Auth middleware extracts JWT from header
   → Token verified and decoded → User ID retrieved and attached to request
   → Route handler executes with authenticated user context
   ```

4. **Token Management:**
   - **Storage:** JWT stored in localStorage (client-side)
   - **Transmission:** Sent via `Authorization: Bearer <token>` header
   - **Expiration:** 30-day expiration (configurable)
   - **Verification:** Every protected request validates token on server

5. **Security Measures:**
   - Passwords hashed with bcrypt (never stored in plain text)
   - JWT secret stored in environment variables
   - CORS configured to accept requests only from frontend URL
   - Helmet.js for HTTP header security
   - Input validation with express-validator
   - Authorization checks (users can only edit/delete own listings)

### Database Schema Design

#### User Model

```javascript
{
  name: String (required, min 2 chars),
  email: String (required, unique, validated),
  password: String (required, hashed, min 6 chars),
  avatar: String (auto-generated from name),
  savedListings: [ObjectId] (refs to Listing),
  timestamps: true (createdAt, updatedAt)
}
```

#### Listing Model

```javascript
{
  title: String (required, 3-100 chars),
  location: String (required),
  description: String (required, min 10 chars),
  price: Number (optional, min 0),
  image: String (required, URL or file path),
  creator: ObjectId (required, ref to User),
  likes: [ObjectId] (refs to User),
  likesCount: Number (computed from likes array),
  timestamps: true (createdAt, updatedAt)
}
```

**Indexing Strategy:**

- Text index on `title`, `location`, `description` for search functionality
- Index on `createdAt` for efficient newest-first sorting
- Index on `creator` for profile page listing queries

### API Design Decisions

#### RESTful Endpoints

**Authentication:**

- `POST /api/auth/register` - Create new user
- `POST /api/auth/login` - Authenticate user
- `GET /api/auth/me` - Get current user (protected)

**Listings:**

- `GET /api/listings` - Get all listings (with pagination & search)
- `GET /api/listings/:id` - Get single listing
- `POST /api/listings` - Create listing (protected)
- `PUT /api/listings/:id` - Update listing (protected, owner only)
- `DELETE /api/listings/:id` - Delete listing (protected, owner only)
- `POST /api/listings/:id/like` - Toggle like (protected)
- `POST /api/listings/:id/save` - Toggle save (protected)
- `POST /api/listings/upload/image` - Upload image (protected)

**Design Principles:**

- Consistent response format: `{ success: boolean, data: {...}, message: string }`
- HTTP status codes follow standards (200, 201, 400, 401, 404, 500)
- Pagination query params: `?page=1&limit=9`
- Search query param: `?search=bali`

### Frontend Architecture

#### State Management

- **Context API** for global auth state (user, token, login, logout)
- **React Hooks** for local component state
- **localStorage** for token persistence

#### Component Structure

- **Layout Components:** Navbar, Page wrappers
- **Feature Components:** ListingCard, Modals
- **Page Components:** Home, Create, Detail, Edit, Profile, Saved

#### Routing Strategy

- **File-based routing** with Next.js App Router
- **Dynamic routes** for listing details: `/listings/[id]`
- **Nested routes** for edit: `/listings/[id]/edit`
- **Client-side navigation** with Link component

### Performance Optimizations

1. **Infinite Scroll:** Reduces initial load time, loads data on-demand
2. **Image Optimization:** Next.js Image component with lazy loading
3. **Code Splitting:** Automatic code splitting per route
4. **API Response Caching:** MongoDB query optimization
5. **Compression:** Gzip compression on API responses
6. **Debounced Search:** Search triggers after user stops typing

---

## 🔮 Future Improvements

If I had more time, here are the key improvements I would implement:

### 1. Advanced Search & Filtering 🔍

- **Category Tags:** (Adventure, Cultural, Food, Nature, etc.)
- **Price Range Filter:** Slider for min/max price
- **Date Availability:** Calendar picker for booking dates
- **Map Integration:** Google Maps to show listing locations
- **Radius Search:** Find experiences within X km of location

**Why:** Greatly improves discoverability and user experience for travelers with specific needs.

**Implementation:**

```javascript
// Enhanced listing schema
{
  category: [String],
  availableDates: [Date],
  coordinates: { lat: Number, lng: Number },
  maxGroupSize: Number,
  duration: String
}
```

### 2. Real-Time Chat System 💬

- **Direct Messaging:** Travelers can message experience hosts
- **Socket.io Integration:** Real-time message delivery
- **Notification System:** Email/push notifications for new messages
- **Message History:** Persistent conversation storage

**Why:** Enables communication for questions, custom bookings, and relationship building.

**Tech Stack:** Socket.io, Redis (for session management), MongoDB (message storage)

### 3. Review & Rating System ⭐

- **5-Star Ratings:** Overall experience rating
- **Written Reviews:** Detailed feedback
- **Photo Uploads:** Review photos
- **Verified Bookings:** Only users who booked can review
- **Host Responses:** Allow hosts to respond to reviews

**Why:** Builds trust, helps with decision-making, provides valuable feedback to hosts.

**Schema:**

```javascript
{
  listing: ObjectId,
  user: ObjectId,
  rating: Number (1-5),
  review: String,
  photos: [String],
  verifiedBooking: Boolean,
  helpful: [ObjectId], // users who found review helpful
  createdAt: Date
}
```

### 4. Booking & Payment Integration 💳

- **Stripe Integration:** Secure payment processing
- **Booking Management:** Calendar, availability, confirmations
- **Refund Policy:** Flexible cancellation policies
- **Automatic Payouts:** To experience hosts
- **Currency Conversion:** Multi-currency support

**Why:** Completes the marketplace experience, enables actual transactions.

### 5. Enhanced Security & Performance 🔒

- **Rate Limiting:** Prevent API abuse (express-rate-limit)
- **Input Sanitization:** XSS protection (DOMPurify)
- **CSRF Protection:** Token-based validation
- **Image CDN:** Cloudinary or AWS S3 for image hosting
- **Redis Caching:** Cache frequently accessed listings
- **Database Replication:** MongoDB replica sets for reliability

**Why:** Production-ready security and scalability.

### 6. Progressive Web App (PWA) 📱

- **Offline Support:** Service workers for offline browsing
- **Install Prompt:** Add to home screen
- **Push Notifications:** Engagement and updates
- **Background Sync:** Queue actions when offline

**Why:** Native app-like experience without app store distribution.

### 7. Analytics & Insights 📊

- **User Dashboard:** Views, likes, booking stats for hosts
- **Google Analytics:** User behavior tracking
- **A/B Testing:** Test different UI variations
- **Revenue Reports:** Earnings tracking for hosts
- **Popular Destinations:** Data-driven insights

**Why:** Data-driven decisions for both platform and users.

### 8. Internationalization (i18n) 🌐

- **Multi-Language Support:** English, Spanish, French, etc.
- **Currency Localization:** Display prices in local currency
- **Date/Time Formats:** Locale-specific formatting
- **Right-to-Left (RTL):** Support for Arabic, Hebrew

**Why:** Global reach and accessibility.

### 9. Admin Panel 👨‍💼

- **User Management:** View, suspend, delete users
- **Listing Moderation:** Approve/reject listings
- **Analytics Dashboard:** Platform-wide statistics
- **Content Management:** Featured listings, banners
- **Report Management:** Handle user reports

**Why:** Platform management and quality control.

### 10. Social Features 🤝

- **User Profiles:** Full bio, interests, past travels
- **Follow System:** Follow favorite hosts
- **Activity Feed:** See what friends are saving/liking
- **Social Sharing:** Share listings on social media
- **Badges & Achievements:** Gamification

**Why:** Increases engagement and community building.

---

## 🎨 Screenshots

### Home Page - Experience Feed

![Home Page](https://via.placeholder.com/800x500/6366f1/ffffff?text=Beautiful+Feed+with+Search)
_Clean, modern interface with infinite scroll and search_

### Listing Detail Page

![Listing Detail](https://via.placeholder.com/800x500/8b5cf6/ffffff?text=Detailed+Experience+View)
_Comprehensive listing view with all information_

### Create/Edit Listing

![Create Listing](https://via.placeholder.com/800x500/06b6d4/ffffff?text=Intuitive+Listing+Creation)
_User-friendly form with image upload and validation_

### User Profile

![User Profile](https://via.placeholder.com/800x500/10b981/ffffff?text=Profile+with+User+Listings)
_Profile with statistics and listing management_

### Mobile Responsive

![Mobile View](https://via.placeholder.com/400x700/f43f5e/ffffff?text=Fully+Responsive+Design)
_Perfect mobile experience with hamburger menu_

---

## 🧪 Testing the Application

### Test User Accounts

You can create your own accounts or use these test scenarios:

**Scenario 1: New User Journey**

1. Register a new account
2. Create your first listing
3. Browse the feed
4. Like and save other listings
5. View your profile

**Scenario 2: Experience Host**

1. Create multiple listings
2. Edit existing listing
3. Delete a listing
4. View your profile statistics

**Scenario 3: Traveler**

1. Browse and search listings
2. Save favorite experiences
3. View saved listings page
4. Unlike and unsave

### API Testing with Postman/Insomnia

#### Authentication Endpoints

**Register:**

```json
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Login:**

```json
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Get Current User:**

```json
GET http://localhost:5000/api/auth/me
Authorization: Bearer <your_jwt_token>
```

#### Listing Endpoints

**Get All Listings:**

```json
GET http://localhost:5000/api/listings?page=1&limit=9&search=bali
```

**Create Listing:**

```json
POST http://localhost:5000/api/listings
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "title": "Sunset Boat Tour",
  "location": "Bali, Indonesia",
  "description": "Enjoy a beautiful sunset while sailing along the coastline.",
  "price": 45,
  "image": "https://example.com/image.jpg"
}
```

**Like Listing:**

```json
POST http://localhost:5000/api/listings/<listing_id>/like
Authorization: Bearer <your_jwt_token>
```

---

## 🐛 Troubleshooting

### Common Issues

#### MongoDB Connection Error

**Problem:** `MongooseError: connect ECONNREFUSED`
**Solution:**

```bash
# Ensure MongoDB is running
mongod --dbpath /path/to/data

# Or start as service
brew services start mongodb-community  # macOS
sudo systemctl start mongod            # Linux
net start MongoDB                      # Windows
```

#### Port Already in Use

**Problem:** `Error: listen EADDRINUSE: address already in use :::5000`
**Solution:**

```bash
# Find and kill process on port 5000
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5000 | xargs kill -9

# Or change PORT in backend/.env
PORT=5001
```

#### CORS Errors

**Problem:** `Access to XMLHttpRequest blocked by CORS policy`
**Solution:**

- Ensure `CLIENT_URL` in backend `.env` matches frontend URL
- Check CORS configuration in `backend/server.js`
- Clear browser cache

#### Images Not Loading

**Problem:** Uploaded images return 404
**Solution:**

- Check `backend/uploads` folder exists
- Verify file upload permissions
- Ensure `express.static` middleware is configured
- Check image path format (should be `/uploads/filename`)

#### Authentication Not Persisting

**Problem:** User logged out on page refresh
**Solution:**

- Check localStorage for `token`
- Clear browser cache and cookies
- Check browser console for errors
- Verify token isn't expired

---

## 📝 Development Notes

### Project Timeline

This project was built with production-quality standards in mind:

- **Planning & Architecture:** 2 hours
- **Backend Development:** 4 hours
- **Frontend Development:** 8 hours
- **UI/UX Polish:** 4 hours
- **Testing & Documentation:** 2 hours

### Code Quality Standards

- ✅ **TypeScript** for type safety on frontend
- ✅ **ESModules** (import/export) throughout
- ✅ **Async/await** instead of callbacks
- ✅ **Error handling** on all routes
- ✅ **Validation** on inputs
- ✅ **Comments** on complex logic
- ✅ **Consistent naming** conventions
- ✅ **Modular architecture** for maintainability

### Best Practices Followed

1. **Security:** JWT, password hashing, input validation, CORS, Helmet
2. **Performance:** Pagination, indexing, compression, image optimization
3. **UX:** Loading states, error messages, animations, responsive design
4. **Code Organization:** Separation of concerns, DRY principle, clear folder structure
5. **Scalability:** Modular design, database indexing, stateless API

---

## 👨‍💻 Developer

Built with ❤️ by a passionate full-stack developer

**Tech Expertise:**

- Frontend: React, Next.js, TypeScript, Tailwind CSS
- Backend: Node.js, Express, MongoDB, PostgreSQL
- DevOps: Docker, AWS, CI/CD
- Design: Figma, UI/UX principles

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- **Next.js Team** for the amazing framework
- **Vercel** for deployment platform
- **MongoDB** for the database
- **Tailwind Labs** for the CSS framework
- **Framer** for the animation library

---

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Review the [Setup Instructions](#-setup-instructions)
3. Check GitHub issues (if repository is public)

---

<div align="center">

**⭐ If you found this project helpful, please consider giving it a star! ⭐**

Made with 💜 using the MERN Stack + Next.js

</div>
