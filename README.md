# Dune Bar & Kitchen - Website

A modern, responsive single-page website for **Dune Bar & Kitchen** — an immersive rooftop dining experience located in Jubilee Hills, Hyderabad.

## Features

- **Hero Section** — Full-screen cinematic hero with parallax background and animated text
- **About Section** — Restaurant story with image gallery and feature highlights
- **Menu Highlights** — Signature dishes and cocktails with hover animations
- **Experience Banner** — Full-width parallax call-to-action section
- **Gallery** — Interactive image grid with lightbox viewer
- **Reservations** — Functional booking form with validation and success modal
- **Contact & Location** — Embedded Google Maps and contact details
- **Instagram Integration** — Direct links to [@dunebarandkitchen](https://www.instagram.com/dunebarandkitchen)

## Tech Stack

- **HTML5** — Semantic markup
- **CSS3** — Custom properties, Grid, Flexbox, animations
- **Vanilla JavaScript** — No frameworks, lightweight and fast
- **Google Fonts** — Cormorant Garamond (display) + Inter (body)

## File Structure

```
dune-website/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # All styles
├── js/
│   └── main.js         # All interactivity
├── images/             # Restaurant images
│   ├── hero-interior.jpg
│   ├── rooftop.jpg
│   ├── rooftop2.jpg
│   ├── lounge.jpg
│   ├── bar.jpg
│   ├── terrace.jpg
│   ├── owl-statue.jpg
│   └── lattice.jpg
└── README.md
```

## Getting Started

1. Extract the ZIP file
2. Open `index.html` in any modern web browser
3. No server or build step required — it's a static site

## Customization

### Colors
Edit the CSS variables in `css/style.css`:
```css
:root {
    --color-accent: #d4a853;      /* Gold accent */
    --color-bg: #0c0a09;          /* Dark background */
    --color-text: #fafaf9;        /* Primary text */
}
```

### Images
Replace images in the `images/` folder. Update references in `index.html`.

### Contact Info
Update phone, email, and address in `index.html` within the Contact and Footer sections.

## Browser Support

- Chrome / Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility

- Semantic HTML5 elements
- ARIA labels where needed
- Keyboard navigation support
- Focus-visible styles
- Reduced motion support (`prefers-reduced-motion`)
- Color contrast compliant

## License

Created for Dune Bar & Kitchen. All rights reserved.
