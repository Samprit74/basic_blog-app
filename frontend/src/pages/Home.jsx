import React, { useState, useEffect } from 'react';
import { Recentpost } from '../components/Recentpost';
import Footer from './Footer';
import './HeroSlideshow.css'; // Keep all styles here

function Home() {
  const beautifulPlaces = [
    "https://images.unsplash.com/photo-1493558103817-58b2924bce98?w=1920&h=1080&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&h=1080&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1508923567004-3a6b8004f3d3?w=1920&h=1080&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&h=1080&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1504973968962-0e7ecbcd2a6b?w=1920&h=1080&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1549887534-4a5c9a4d1c00?w=1920&h=1080&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=1920&h=1080&auto=format&fit=crop"
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % beautifulPlaces.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div className="container-fluid hero-section text-center position-relative overflow-hidden">
        {beautifulPlaces.map((img, index) => (
          <div
            key={index}
            className={`hero-bg-image ${index === currentImage ? 'active' : ''}`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}

        <div className="position-relative z-2 hero-content fade-in">
          <h1 className="hero-title">Welcome to GeoGlimpse</h1>
          <p className="hero-subtitle">
            Dive into a world of creativity, insights, and inspiration.<br />
            Discover the extraordinary in the ordinary...
          </p>
        </div>
      </div>

      <div className="container-fluid mt-5">
        <Recentpost />
      </div>

      <Footer />
    </>
  );
}

export default Home;
