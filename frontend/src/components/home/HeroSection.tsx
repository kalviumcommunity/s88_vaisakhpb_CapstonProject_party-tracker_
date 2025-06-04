import React, { useEffect, useRef } from 'react';
import { Search, Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle effect
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      
      constructor() {
        const width = canvas?.width ?? 0;
        const height = canvas?.height ?? 0;
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        
        // Colors that match our theme
        const colors = ['#7C3AED', '#0D9488', '#EC4899'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        const width = canvas?.width ?? 0;
        const height = canvas?.height ?? 0;
        if (this.x > width) this.x = 0;
        if (this.x < 0) this.x = width;
        if (this.y > height) this.y = 0;
        if (this.y < 0) this.y = height;
      }
      
      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Create particles
    const particlesArray: Particle[] = [];
    const numberOfParticles = 50;
    
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
    }
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0" 
        style={{ zIndex: 1 }}
      />
      
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/90 to-purple-900/70"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Discover The <span className="text-gradient">Perfect Party</span> Tonight
          </h1>
          <p className="text-xl md:text-2xl text-zinc-300 mb-8 max-w-2xl">
            Find live events, clubs, and campus parties happening near you. Never miss out on the fun again!
          </p>
          
          <div className="bg-zinc-900/80 backdrop-blur-md p-4 rounded-xl mb-8 shadow-xl border border-white/10">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" />
                <input 
                  type="text" 
                  placeholder="Search events, clubs, or artists" 
                  className="input pl-10 w-full"
                />
              </div>
              
              <div className="relative md:w-48">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" />
                <select className="input pl-10 w-full appearance-none">
                  <option>Location</option>
                  <option>New York</option>
                  <option>Los Angeles</option>
                  <option>Miami</option>
                  <option>Las Vegas</option>
                </select>
              </div>
              
              <div className="relative md:w-48">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" />
                <input
                  type="date" 
                  className="input pl-10 w-full"
                />
              </div>
              
              <button className="btn btn-primary min-w-24">
                Search
              </button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Link to="/events?category=music" className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-sm transition-all">
              Live Music
            </Link>
            <Link to="/events?category=club" className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-sm transition-all">
              Nightclubs
            </Link>
            <Link to="/events?category=festival" className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-sm transition-all">
              Festivals
            </Link>
            <Link to="/events?category=rooftop" className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-sm transition-all">
              Rooftop Parties
            </Link>
            <Link to="/student-zone" className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-sm transition-all">
              Student Events
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;