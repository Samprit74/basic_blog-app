import React, { useState, useEffect } from 'react';
import { Recentpost } from '../components/Recentpost';
import './HeroSlideshow.css'; // Ensure this file exists

function Home() {
const beautifulPlaces = [
  "https://images.unsplash.com/photo-1493558103817-58b2924bce98?w=1920&h=1080&auto=format&fit=crop", // Venice canal at sunset
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&h=1080&auto=format&fit=crop", // Maldives beach
  "https://images.unsplash.com/photo-1508923567004-3a6b8004f3d3?w=1920&h=1080&auto=format&fit=crop", // Swiss Alps lake
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&h=1080&auto=format&fit=crop", // Iceland waterfall
  "https://images.unsplash.com/photo-1504973968962-0e7ecbcd2a6b?w=1920&h=1080&auto=format&fit=crop", // Santorini, Greece
  "https://images.unsplash.com/photo-1549887534-4a5c9a4d1c00?w=1920&h=1080&auto=format&fit=crop", // Bali rice terraces
  "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=1920&h=1080&auto=format&fit=crop"  // Northern Lights, Norway
];




  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % beautifulPlaces.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="container-fluid bg-dark hero-section text-center position-relative overflow-hidden">
        {/* Background slideshow */}
        {beautifulPlaces.map((img, index) => (
          <div
            key={index}
            className={`hero-bg-image ${index === currentImage ? 'active' : ''}`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}

        {/* Hero content */}
        <div className="position-relative z-2">
          <h1 className="fs-1 fw-bold text-light">WELCOME TO MY BLOG</h1>
          <p className="text-light fs-5 mt-3">
            Dive into a world of creativity, insights, and inspiration. Discover the extraordinary in the ordinary...
          </p>
        </div>
      </div>

      <div className="container-fluid">
        <br />
        <Recentpost />
      </div>
    </>
  );
}

export default Home;
