# 🚀 FlowSpace – 3D Workspace Manager

A modern, full-stack SaaS-style web application for managing tasks and notes with immersive 3D visuals, smooth animations, and a premium dark-themed UI.

![FlowSpace](https://img.shields.io/badge/FlowSpace-3D%20Workspace-6366f1?style=for-the-badge&logo=react)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite)
![Firebase](https://img.shields.io/badge/Firebase-Auth%20%2B%20Firestore-FFCA28?style=flat-square&logo=firebase)
![Three.js](https://img.shields.io/badge/Three.js-3D%20Graphics-000000?style=flat-square&logo=threedotjs)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-06B6D4?style=flat-square&logo=tailwindcss)

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Folder Structure](#-folder-structure)
- [How It Works](#-how-it-works)
- [Setup & Installation](#-setup--installation)
- [Firebase Configuration](#-firebase-configuration)
- [Running the App](#-running-the-app)
- [Design System](#-design-system)
- [Screenshots](#-screenshots)

---

## 🌟 Overview

**FlowSpace** is a premium web application that combines productivity tools with immersive 3D visuals. It allows users to authenticate via Google, manage tasks with due dates and completion tracking, and write quick notes — all within a visually stunning glassmorphism interface powered by React Three Fiber.

The application follows modern SaaS design principles with a deep dark navy theme, indigo accent colors, ambient glow effects, and floating 3D elements that create an engaging user experience.

---

## ✨ Features

### Authentication
- 🔐 **Google Sign-In** via Firebase Authentication
- 🔄 Persistent login sessions across page refreshes
- 👤 User profile (name, email, avatar) displayed in navbar
- 🚪 One-click logout functionality
- 🛡️ Protected routes — unauthenticated users are redirected to login

### Task Management
- ✅ **Create tasks** with optional due date and time
- ☑️ **Mark tasks as complete** with a tick checkbox (green checkmark + strikethrough)
- ❌ **Delete tasks** with a cross button (appears on hover)
- ⏰ **Overdue detection** — tasks past their due date are highlighted in red
- 📊 **Completion tracking** across the stats dashboard

### Notes System
- 📝 **Create notes** — a separate type for quick text entries
- 🟡 **Amber-themed** note cards to distinguish from tasks
- 📄 Note icon and badge for visual clarity

### Filtering & Organization
- 🗂️ **Filter tabs**: All | Tasks | Notes | Completed
- 📈 **Live stats**: Total items, Tasks count, Notes count, Completed count
- 🕐 **Chronological sorting** — newest items appear first
- 🔄 **Real-time sync** — changes reflect instantly via Firestore listeners

### 3D Visuals
- 🌐 **Animated distorted sphere** using `MeshDistortMaterial`
- 💫 **Floating orbital rings** with slow rotation
- ✨ **Particle field** with 80 animated points
- 🎨 **Ambient lighting** setup (ambient + directional + point lights)
- 🖱️ Subtle mouse interaction with disabled zoom

### UI/UX
- 🌑 **Deep dark navy theme** (`#0b1326` background)
- 🪟 **Glassmorphism cards** with backdrop blur and soft borders
- 🎭 **Framer Motion animations** — fade-ins, scale effects, layout transitions
- ✨ **Hover glow effects** on interactive elements
- 📱 **Responsive design** — works on desktop, tablet, and mobile
- 🔤 **Inter font** from Google Fonts for modern typography

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** | UI framework (component-based architecture) |
| **Vite 8** | Build tool & dev server (fast HMR) |
| **Tailwind CSS v4** | Utility-first CSS with custom theme tokens |
| **Firebase Auth** | Google Sign-In authentication |
| **Cloud Firestore** | NoSQL database for tasks & notes |
| **React Three Fiber** | Declarative 3D graphics (Three.js wrapper) |
| **@react-three/drei** | Three.js helpers (Float, MeshDistortMaterial) |
| **Framer Motion** | Animation library for React |
| **React Router DOM** | Client-side routing |

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────────┐
│                        Browser                           │
│  ┌─────────────────────────────────────────────────────┐ │
│  │                  React Application                  │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────────┐  │ │
│  │  │  Router   │  │  Auth    │  │  3D Canvas       │  │ │
│  │  │  (Pages)  │  │  Context │  │  (R3F + Drei)    │  │ │
│  │  └────┬─────┘  └────┬─────┘  └──────────────────┘  │ │
│  │       │              │                               │ │
│  │  ┌────▼──────────────▼─────┐                        │ │
│  │  │      Components         │                        │ │
│  │  │  Navbar │ TaskInput     │                        │ │
│  │  │  TaskCard │ TaskGrid    │                        │ │
│  │  └────────────┬────────────┘                        │ │
│  │               │                                      │ │
│  │  ┌────────────▼────────────┐                        │ │
│  │  │    Custom Hooks          │                        │ │
│  │  │  useAuth │ useTasks     │                        │ │
│  │  └────────────┬────────────┘                        │ │
│  └───────────────┼─────────────────────────────────────┘ │
│                  │                                        │
│  ┌───────────────▼─────────────────────────────────────┐ │
│  │              Firebase SDK                            │ │
│  │  ┌─────────────────┐  ┌──────────────────────────┐  │ │
│  │  │  Authentication  │  │  Cloud Firestore         │  │ │
│  │  │  (Google SSO)    │  │  (Real-time Database)    │  │ │
│  │  └─────────────────┘  └──────────────────────────┘  │ │
│  └──────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```

---

## 📁 Folder Structure

```
flowspace/
├── public/
│   └── favicon.svg              # Custom FlowSpace favicon
├── src/
│   ├── components/
│   │   ├── HeroCanvas.jsx       # 3D scene (sphere, rings, particles)
│   │   ├── Navbar.jsx           # Top navigation bar with user info
│   │   ├── ProtectedRoute.jsx   # Auth guard for private routes
│   │   ├── TaskCard.jsx         # Individual task/note card component
│   │   ├── TaskGrid.jsx         # Grid layout for cards with animations
│   │   └── TaskInput.jsx        # Input form with type toggle & date picker
│   ├── firebase/
│   │   └── config.js            # Firebase initialization & exports
│   ├── hooks/
│   │   ├── useAuth.jsx          # Authentication context & provider
│   │   └── useTasks.js          # Firestore CRUD operations hook
│   ├── pages/
│   │   ├── Dashboard.jsx        # Main dashboard page
│   │   └── LoginPage.jsx        # Login/landing page
│   ├── App.jsx                  # Root component with routing
│   ├── index.css                # Global styles & design system
│   └── main.jsx                 # React entry point
├── .env                         # Firebase credentials (gitignored)
├── .env.example                 # Template for environment variables
├── .gitignore                   # Git ignore rules
├── firebase.json                # Firebase project configuration
├── firestore.indexes.json       # Firestore composite indexes
├── firestore.rules              # Firestore security rules
├── index.html                   # HTML entry point
├── package.json                 # Dependencies & scripts
├── tailwind.config.js           # Tailwind CSS configuration
└── vite.config.js               # Vite build configuration
```

---

## 🔍 How It Works

### 1. Authentication Flow

```
User clicks "Continue with Google"
        │
        ▼
Firebase Auth → Google OAuth Popup
        │
        ▼
Google returns user credentials
        │
        ▼
Firebase creates/finds user session
        │
        ▼
onAuthStateChanged fires → user state updated
        │
        ▼
React Router redirects to /dashboard
```

**Implementation Details:**
- `useAuth.jsx` creates a React Context that wraps the entire app
- `onAuthStateChanged` listener detects login/logout state changes
- `signInWithPopup` opens Google's OAuth consent screen
- `ProtectedRoute` checks `user` state and redirects if null
- User session persists across refreshes (Firebase handles token storage)

### 2. Task & Note CRUD Operations

**Firestore Document Structure:**
```javascript
// Collection: "tasks"
{
  userId: "F4Tc8Bm2ICN34eCjej0zCMrwg6q2",   // Firebase Auth UID
  text: "Complete project report",             // User input
  type: "task",                                // "task" or "note"
  completed: false,                            // Boolean (tasks only)
  dueDate: "2026-04-25T14:00",               // ISO string (tasks only, optional)
  createdAt: Timestamp                         // Firebase server timestamp
}
```

**Real-time Sync Flow:**
```
User adds a task → addDoc() writes to Firestore
        │
        ▼
Firestore triggers onSnapshot listener
        │
        ▼
Listener callback receives updated docs
        │
        ▼
State updates → React re-renders the grid
```

**Key Operations:**
| Action | Firestore Method | Description |
|---|---|---|
| Add | `addDoc()` | Creates a new document with auto-generated ID |
| Read | `onSnapshot()` | Real-time listener, fires on any change |
| Update | `updateDoc()` | Toggles `completed` field for tasks |
| Delete | `deleteDoc()` | Permanently removes the document |

**Filtering:**
- Query uses `where("userId", "==", userId)` to fetch only the logged-in user's data
- Sorting is done client-side: newest items first based on `createdAt` timestamp
- Filter tabs ("All", "Tasks", "Notes", "Completed") filter the array in-memory

### 3. 3D Scene Rendering

The 3D scene is rendered using **React Three Fiber** (R3F), a React renderer for Three.js:

```
Canvas (fixed position, behind UI)
├── Lighting
│   ├── AmbientLight (soft global light)
│   ├── DirectionalLight × 2 (key + fill)
│   └── PointLight (indigo accent)
├── AnimatedSphere
│   ├── IcosahedronGeometry (subdivided sphere)
│   └── MeshDistortMaterial (animated deformation)
├── FloatingRing × 3
│   ├── TorusGeometry (thin ring)
│   └── StandardMaterial (semi-transparent)
└── Particles
    ├── 80 random points in 3D space
    └── PointsMaterial (small glowing dots)
```

**Animation Details:**
- `useFrame` hook drives per-frame rotation updates
- `Float` component from Drei adds gentle oscillation
- `MeshDistortMaterial` continuously deforms the sphere surface
- Particles rotate slowly as a group
- Canvas is positioned `fixed` with `pointer-events: none` to avoid blocking UI

### 4. Glassmorphism Design System

The UI follows the **"Aether Slate"** design system:

```css
/* Glass Card Formula */
background: rgba(23, 31, 51, 0.6);     /* Semi-transparent dark */
backdrop-filter: blur(20px);             /* Frosted glass effect */
border: 1px solid rgba(70, 69, 84, 0.15); /* Ghost border */
border-radius: 1.5rem;                  /* Rounded XL corners */
```

**Color Palette:**
| Token | Hex | Usage |
|---|---|---|
| Surface | `#0b1326` | Page background |
| Surface Container | `#171f33` | Card backgrounds |
| Primary | `#c0c1ff` | Accent text, glows |
| Primary Container | `#8083ff` | Button gradients |
| On Surface | `#dae2fd` | Primary text |
| Outline Variant | `#464554` | Subtle borders |

### 5. Animation System

**Framer Motion** handles all UI animations:

| Element | Animation | Trigger |
|---|---|---|
| Page content | Fade up (y: 20 → 0, opacity: 0 → 1) | On mount |
| Navbar | Slide down (y: -20 → 0) | On mount |
| Task cards | Scale + slide in (staggered by index) | On mount |
| Card hover | Scale to 1.02, lift by 3px | On hover |
| Card delete | Scale to 0.9, fade out | On exit |
| Login card | Scale from 0.95, spring animation | On mount |
| Filter tabs | Instant color transition | On click |

---

## ⚡ Setup & Installation

### Prerequisites
- **Node.js** 18+ installed
- **npm** or **yarn** package manager
- A **Firebase** account (free Spark plan works)

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd full-stack-project
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Create Environment File
```bash
cp .env.example .env
```

Edit `.env` with your Firebase credentials (see next section).

---

## 🔥 Firebase Configuration

### Step 1: Create a Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Create a project"**
3. Name it (e.g., "flowspace-app")
4. Disable Google Analytics (optional)
5. Click **Create**

### Step 2: Register a Web App
1. In Project Overview, click the **Web** icon (`</>`)
2. Register app name: "FlowSpace"
3. Copy the `firebaseConfig` object
4. Paste the values into your `.env` file:

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

### Step 3: Enable Google Authentication
1. Go to **Authentication** → **Sign-in method**
2. Click **Google**
3. Toggle **Enable** → ON
4. Set your support email
5. Click **Save**

### Step 4: Create Firestore Database
1. Go to **Firestore Database**
2. Click **Create database**
3. Select **Start in test mode**
4. Choose a location (e.g., `nam5` for US)
5. Click **Enable**

### Step 5: Deploy Security Rules (Optional)
```bash
npx firebase-tools deploy --only firestore:rules
npx firebase-tools deploy --only firestore:indexes
```

---

## 🚀 Running the App

### Development
```bash
npm run dev
```
Opens at `http://localhost:5173/`

### Production Build
```bash
npm run build
npm run preview
```

---

## 🎨 Design System

The app uses the **"Aether Slate"** design system generated via Stitch MCP:

- **Philosophy**: Treat the screen as a 3D environment — depth through layers, not borders
- **Colors**: Deep navy base + indigo primary accents
- **Typography**: Inter font with tight letter-spacing for headlines
- **Corners**: XL rounded (1.5rem) for all containers
- **Shadows**: Diffused ambient shadows, never black
- **Borders**: Ghost borders at 15% opacity — felt, not seen
- **Buttons**: Gradient fills with hover glows

---

## 📸 Screenshots

### Login Page
- Deep dark navy background with ambient indigo glow
- Centered glassmorphism card with FlowSpace branding
- 3D animated sphere and floating rings behind the card
- "Continue with Google" authentication button

### Dashboard
- Floating glass navbar with user profile and logout
- Personalized greeting with time-based message
- Stats row: Total, Tasks, Notes, Completed
- Task/Note input with type toggle and date picker
- Filter tabs: All | Tasks | Notes | Completed
- Responsive card grid with hover glow effects
- 3D scene visible behind all content

---

## 📄 License

This project is built for educational purposes as a full-stack web development demonstration.

---

## 👨‍💻 Author

**Parikshit Dahiya**  
Built with ❤️ using React, Firebase, and Three.js
