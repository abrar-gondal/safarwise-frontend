# SafarWise Frontend 🌍

A modern travel booking platform for Pakistan tourism built with React + TypeScript.

## 🔗 Live Demo
[https://safarwise-frontend.vercel.app](https://safarwise-frontend.vercel.app)

## 🛠️ Built With
- React 18
- TypeScript
- Vite
- Axios

## ✨ Features
- Browse Pakistan travel packages
- User authentication (Login/Register)
- Package booking system
- AI chatbot (Safi) for travel assistance
- Forgot/Reset password with OTP
- User dashboard with booking history
- Admin panel for managing bookings
- Favorites/saved packages
- Responsive design

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation
```bash
git clone https://github.com/abrar-gondal/safarwise-frontend.git
cd safarwise-frontend
npm install
```

### Environment Variables
Create a `.env` file in root:
```env
VITE_API_URL=https://safarwise-backend-production.up.railway.app/api
VITE_CHATBOT_URL=https://abrar00-safarwise-chatbot.hf.space
```

### Run Locally
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

## 📁 Project Structure
src/
├── components/     # Reusable components
├── pages/          # All pages
├── api.ts          # API calls to backend
├── AppContext.tsx   # Global state
├── data/           # Static data
└── types/          # TypeScript types

## 🌐 Deployment
Deployed on **Vercel** with automatic deployments on every push to main branch.

## 👨‍💻 Developer
Abrar Gondal
