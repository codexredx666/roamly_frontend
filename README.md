# Roamly - AI Trip Planner Frontend

A production-grade, modern frontend for an AI-powered trip planning SaaS application built with Next.js 14, TypeScript, and cutting-edge web technologies.

## 🚀 Features

- **AI-Powered Trip Planning**: Chat with AI to create personalized itineraries
- **3D Interactive Maps**: Explore destinations with MapLibre GL JS
- **3D Visualizations**: Rotating globe and animated 3D models using Three.js
- **Modern UI/UX**: Glassmorphism, gradients, and smooth animations
- **Real-time Chat**: Streaming AI responses with typing indicators
- **Trip Management**: Create, view, and manage multiple trips
- **Authentication**: Secure authentication with Clerk
- **Responsive Design**: Works seamlessly on all devices

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: ShadCN UI
- **3D Graphics**: Three.js, @react-three/fiber, @react-three/drei
- **Maps**: MapLibre GL JS
- **Animations**: Framer Motion
- **HTTP Client**: Axios
- **Authentication**: Clerk React SDK
- **Notifications**: React Hot Toast
- **State Management**: React Context API + Zustand

## 📁 Project Structure

```
client/
├── app/
│   ├── layout.tsx              # Root layout with providers
│   ├── page.tsx                # Landing page
│   ├── globals.css             # Global styles
│   ├── sign-in/                # Sign in page
│   ├── sign-up/                # Sign up page
│   ├── dashboard/              # Dashboard with trip list
│   ├── chat/                   # AI chat interface
│   └── trip/[id]/              # Trip details page
├── components/
│   ├── ui/                     # ShadCN UI components
│   ├── Globe.tsx               # 3D rotating globe
│   ├── Map3D.tsx               # Interactive 3D map
│   ├── PlaneModel.tsx          # 3D plane animation
│   ├── HotelModel.tsx          # 3D hotel icon
│   └── ErrorBoundary.tsx       # Error boundary component
├── context/
│   └── TripContext.tsx         # Trip state management
├── services/
│   ├── api.ts                  # Axios client
│   ├── ai.service.ts           # AI chat and trip services
│   ├── places.service.ts       # Places search service
│   └── flights.service.ts  # Flights search service
├── lib/
│   └── utils.ts                # Utility functions
└── public/                     # Static assets
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Clerk account (for authentication)
- Backend API running on `http://localhost:5000` (or configure your own)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd roamly_frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Design Features

- **Dark Mode**: Default dark theme with gradient backgrounds
- **Glassmorphism**: Frosted glass effect on cards
- **Gradients**: Beautiful gradient backgrounds and text
- **Animations**: Smooth page transitions and micro-interactions
- **3D Elements**: Interactive 3D globe and models
- **Responsive**: Mobile-first responsive design

## 📱 Pages

### Landing Page (`/`)
- Hero section with animated 3D globe
- Feature cards
- Call-to-action buttons
- Gradient backgrounds

### Authentication (`/sign-in`, `/sign-up`)
- Clerk prebuilt UI
- Glassmorphism styling
- Seamless integration

### Dashboard (`/dashboard`)
- List of user's trips
- Create new trip button
- Trip cards with animations
- Empty state handling

### Chat (`/chat`)
- ChatGPT-like interface
- Streaming AI responses
- Auto-scrolling messages
- Typing indicators
- Message history

### Trip Details (`/trip/[id]`)
- Left panel: Itinerary, places, hotels, flights, budget tabs
- Right panel: Interactive 3D map
- Animated cards
- Responsive layout

## 🔧 Configuration

### API Base URL

Update `NEXT_PUBLIC_API_BASE_URL` in `.env.local` to point to your backend API.

### Clerk Authentication

1. Sign up at [clerk.com](https://clerk.com)
2. Create a new application
3. Copy your publishable key to `.env.local`
4. Configure allowed redirect URLs in Clerk dashboard

## 🎯 Key Components

### Globe Component
- Rotating 3D Earth with stars background
- Interactive orbit controls
- Smooth animations

### Map3D Component
- MapLibre GL JS integration
- 3D buildings and terrain
- Custom markers for places
- FlyTo animations
- Dark map style

### TripContext
- Global state management
- User authentication state
- Trip data and messages
- API integration

## 🚀 Building for Production

```bash
npm run build
npm start
```

## 📝 API Integration

The frontend expects the following API endpoints:

- `POST /api/ai/chat` - Send chat message
- `POST /api/ai/chat/stream` - Stream chat response
- `GET /api/trips` - Get all trips
- `GET /api/trips/:id` - Get trip by ID
- `POST /api/trips` - Create new trip
- `PATCH /api/trips/:id` - Update trip
- `DELETE /api/trips/:id` - Delete trip
- `GET /api/places/search` - Search places
- `GET /api/flights/search` - Search flights

## 🐛 Troubleshooting

### Map not loading
- Ensure MapLibre GL CSS is imported
- Check browser console for errors
- Verify tile server accessibility

### 3D components not rendering
- Check Three.js dependencies
- Verify WebGL support in browser
- Check console for WebGL errors

### Authentication issues
- Verify Clerk keys in `.env.local`
- Check Clerk dashboard configuration
- Ensure middleware is properly configured

## 📄 License

This project is proprietary and confidential.

## 👥 Contributing

This is a private project. For contributions, please contact the project maintainers.

---

Built with ❤️ using Next.js and modern web technologies.
