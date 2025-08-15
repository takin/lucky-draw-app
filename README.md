# 🎰 PrizeWheelSpin - Live Draw Event Application

A modern, interactive web application for conducting live draw events with animated spinning wheel, sound effects, and real-time winner tracking.

## 🎯 Overview

PrizeWheelSpin is designed for community events, corporate functions, and any occasion requiring fair and engaging random selection. The application features a visually appealing spinning wheel with sound effects, winner history tracking, and sponsor showcase capabilities.

## ✨ Features

### 🎲 Core Functionality

- **Interactive Spinning Wheel**: Animated number selection with smooth transitions
- **Customizable Participant Count**: Set up to 1000 participants
- **Real-time Winner Tracking**: Automatic recording of winners with timestamps
- **Winner History**: View and manage all previous winners
- **Reset Functionality**: Clear history and start fresh draws

### 🎵 Audio Experience

- **Spinning Sound Effects**: Dynamic ticking sounds during wheel animation
- **Winner Celebration**: Exciting confetti-like sound effects for winners
- **Sound Toggle**: Enable/disable audio effects as needed
- **Web Audio API**: High-quality, low-latency sound generation

### 🎨 Visual Design

- **Modern UI**: Clean, responsive design with gradient backgrounds
- **Animated Elements**: Smooth transitions and hover effects
- **Winner Popup**: Celebratory modal with confetti animation
- **Sponsor Showcase**: Dedicated section for sponsor logos and information
- **Mobile Responsive**: Works seamlessly on all device sizes

### 🏆 Event Features

- **Live Draw Mode**: Perfect for real-time events
- **Winner Display**: Large, prominent winner number display
- **Event Branding**: Customizable header with event details
- **Professional Presentation**: Suitable for corporate and community events

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd PrizeWheelSpin
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🛠️ Technology Stack

### Frontend

- **React 18**: Modern React with hooks and functional components
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Smooth animations and transitions
- **Radix UI**: Accessible component primitives
- **Lucide React**: Beautiful icon library

### Backend

- **Express.js**: Node.js web framework
- **TypeScript**: Type-safe server development
- **Drizzle ORM**: Type-safe database operations
- **Neon Database**: Serverless PostgreSQL

### Audio

- **Web Audio API**: High-performance audio generation
- **Custom Sound Synthesis**: Programmatically generated sound effects

## 📁 Project Structure

```
PrizeWheelSpin/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── SpinWheel.tsx      # Main spinning wheel component
│   │   │   ├── WinnersHistory.tsx # Winner tracking component
│   │   │   ├── SponsorGrid.tsx    # Sponsor showcase component
│   │   │   └── ui/         # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility libraries
│   │   └── main.tsx        # Application entry point
│   ├── public/             # Static assets
│   └── index.html          # HTML template
├── server/                 # Backend Express server
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   └── vite.ts            # Vite integration
├── shared/                 # Shared types and schemas
└── package.json           # Project dependencies
```

## 🎮 How to Use

### Setting Up Participants

1. Enter the total number of participants (2-1000)
2. Click "Update" to set the participant count
3. The spinning wheel will be ready for draws

### Conducting a Draw

1. Click "PUTAR NOMOR" to start the spinning animation
2. Watch the animated number changes for 4 seconds
3. A winner will be selected and displayed
4. The winner is automatically added to the history

### Managing Winners

- View all previous winners in the Winners History section
- Clear the history using the "Clear History" button
- Winners are displayed with timestamps

### Audio Controls

- Toggle sound effects on/off using the sound button
- Spinning sounds play during the animation
- Celebration sounds play when a winner is selected

## 🎨 Customization

### Event Branding

- Update the header text in `client/src/pages/home.tsx`
- Modify colors and styling in the component files
- Add your event logo to the public directory

### Sound Effects

- Customize audio in `client/src/components/SpinWheel.tsx`
- Modify frequencies, durations, and sound types
- Add new sound effects as needed

### Styling

- Use Tailwind CSS classes for styling
- Modify the design system in `tailwind.config.ts`
- Update component themes and colors

## 🚀 Deployment

### Production Build

```bash
npm run build
npm start
```

### Environment Variables

- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment mode (development/production)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎉 Acknowledgments

- Built with modern web technologies
- Designed for community engagement
- Perfect for live events and celebrations

---

**Made with ❤️ for creating memorable moments**
