# Vexora Estates

A modern, fully functional real estate website built with React, JavaScript, and Tailwind CSS. Features high-quality animations, responsive design, and a complete property browsing experience.

![Vexora Estates](https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200)

## Features

- **Landing Page**: Hero section with animated banners, "Who We Are" section, and featured properties
- **Property Listings**: Grid/List view with advanced filtering by price, location, size, bedrooms, and status
- **Property Details**: Full property information with image gallery slider, features list, and contact options
- **Contact Page**: Contact form with WhatsApp integration, direct call button, and form submission confirmation
- **Responsive Design**: Fully responsive for mobile, tablet, and desktop devices
- **Smooth Animations**: Page transitions, hover effects, and scroll animations using Framer Motion

## Tech Stack

- **React 19** - Frontend framework
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd vexora
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
vexora/
├── public/
│   └── images/           # Static images (upload vexora-logo.png here)
├── src/
│   ├── components/       # Reusable components
│   │   ├── Layout.jsx    # Page layout wrapper
│   │   ├── Navbar.jsx    # Navigation header
│   │   ├── Footer.jsx    # Site footer
│   │   ├── UnitCard.jsx  # Property card component
│   │   └── ImageGallery.jsx  # Image slider component
│   ├── data/
│   │   └── units.js      # Property data storage
│   ├── pages/
│   │   ├── Home.jsx      # Landing page
│   │   ├── Units.jsx     # Property listings
│   │   ├── UnitDetail.jsx # Property detail page
│   │   └── Contact.jsx   # Contact page
│   ├── App.js            # Main app component
│   ├── index.css         # Tailwind + custom styles
│   └── App.css           # Component styles
├── tailwind.config.js    # Tailwind configuration
└── package.json          # Dependencies
```

## Logo Integration

**Important**: To display your custom logo, upload an image named `vexora-logo.png` to the `public/images/` folder.

Until the logo is uploaded, the site will display a styled "V" placeholder in the header and footer.

## Data Structure

Property data is stored in `src/data/units.js`. Each property includes:

- Title and description
- Price and payment plans
- Location and city
- Bedrooms, bathrooms, and size
- Property type and status
- Images array
- Features list
- Developer information

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme:
- Primary colors: Primary-500 to Primary-900
- Gold accents: Gold-400 to Gold-600

### Contact Information
Update contact details in:
- `src/components/Footer.jsx`
- `src/pages/Contact.jsx`
- `src/pages/UnitDetail.jsx`

### Property Data
Modify or add properties in `src/data/units.js`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is created for Vexora Estates.

## Contact

For support or inquiries:
- Email: info@vexora.com
- Phone: +20 123 456 7890
