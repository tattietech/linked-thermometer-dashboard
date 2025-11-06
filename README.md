# Linked Thermometer Dashboard

A real-time dashboard for monitoring temperature and humidity data from multiple IoT sensors. The application displays sensor readings in an elegant, responsive interface with automatic refresh capabilities and visual indicators for temperature conditions.

## Features

- Real-time temperature and humidity monitoring from multiple sensors
- Automatic data refresh every 60 seconds
- Manual refresh capability
- Visual temperature indicators (Cool, Warm, Hot)
- Humidity display with progress bars
- Timestamp tracking with relative time formatting
- Stale data detection and alerts
- Responsive design for mobile and desktop
- Dark mode support
- Loading states with skeleton screens
- Error handling and retry functionality

## Technology Stack

### Core Framework
- **Next.js 16.0.1** - React framework with App Router
- **React 19.2.0** - UI library
- **TypeScript 5** - Type-safe JavaScript

### Styling
- **Tailwind CSS 4** - Utility-first CSS framework
- **PostCSS** - CSS processing

### Development Tools
- **ESLint 9** - Code linting with Next.js configuration
- **Next.js Font Optimization** - Automatic font optimization with Geist font family

## Project Structure

```
linked-thermometer-dashboard/
├── app/
│   ├── api/
│   │   └── route.tsx          # API endpoint proxy for sensor data
│   ├── layout.tsx             # Root layout with metadata
│   ├── page.tsx               # Home page with SensorList component
│   └── globals.css            # Global styles
├── components/
│   └── SensorList.tsx         # Main sensor display component
├── public/                    # Static assets
├── next.config.ts             # Next.js configuration
├── tailwind.config.js         # Tailwind CSS configuration
└── package.json               # Project dependencies
```

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
API_ENDPOINT=your_api_endpoint_url
API_KEY=your_api_key
```

- `API_ENDPOINT`: The URL of your upstream sensor API
- `API_KEY`: Authentication key for the sensor API

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/tattietech/linked-thermometer-dashboard.git
cd linked-thermometer-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your API credentials
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the dashboard.

The page will automatically reload when you make changes to the code.

### Building for Production

Build the application for production:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

### Linting

Run the linter to check code quality:

```bash
npm run lint
```

## API Integration

The application fetches sensor data from an external API through a Next.js API route (`/app/api/route.tsx`). The API route:

- Acts as a proxy to the upstream sensor API
- Adds authentication headers using environment variables
- Implements cache control for real-time data
- Handles errors gracefully with appropriate HTTP status codes

### Expected API Response Format

The upstream API should return an array of sensor objects:

```json
[
  {
    "deviceName": "Sensor Name",
    "temperature": 23.5,
    "humidity": 45.2,
    "timeStamp": "2025-11-06T12:00:00Z"
  }
]
```

## Deployment

This application is configured for deployment on Azure Web Apps with the following configuration:

- Build command runs during deployment (`SCM_DO_BUILD_DURING_DEPLOYMENT=true`)
- Compatible with any Node.js hosting platform that supports Next.js
- Recommended platforms: Vercel, Azure Web Apps, AWS, or any Node.js host

### Vercel Deployment

The easiest deployment option is [Vercel](https://vercel.com):

1. Push your code to a Git repository
2. Import the project in Vercel
3. Configure environment variables
4. Deploy

## License

This project is private and proprietary.
