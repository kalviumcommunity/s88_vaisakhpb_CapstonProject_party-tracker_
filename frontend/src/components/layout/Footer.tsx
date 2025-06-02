import React from 'react';
import { Link } from 'react-router-dom';
import { PartyPopper, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2">
              <PartyPopper className="h-8 w-8 text-purple-500" />
              <span className="text-2xl font-bold text-white">Party<span className="text-purple-500">Tracker</span></span>
            </Link>
            <p className="mt-4 text-zinc-400">
              Discover live and upcoming parties, concerts, and local events in real-time.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-zinc-400 hover:text-purple-400">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-zinc-400 hover:text-purple-400">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-zinc-400 hover:text-purple-400">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Discover</h3>
            <ul className="space-y-2">
              <li><Link to="/events" className="text-zinc-400 hover:text-purple-400">Events</Link></li>
              <li><Link to="/clubs" className="text-zinc-400 hover:text-purple-400">Clubs</Link></li>
              <li><Link to="/student-zone" className="text-zinc-400 hover:text-purple-400">Student Zone</Link></li>
              <li><Link to="/promoters" className="text-zinc-400 hover:text-purple-400">For Promoters</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-zinc-400 hover:text-purple-400">About Us</Link></li>
              <li><Link to="/careers" className="text-zinc-400 hover:text-purple-400">Careers</Link></li>
              <li><Link to="/contact" className="text-zinc-400 hover:text-purple-400">Contact</Link></li>
              <li><Link to="/blog" className="text-zinc-400 hover:text-purple-400">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/terms" className="text-zinc-400 hover:text-purple-400">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-zinc-400 hover:text-purple-400">Privacy Policy</Link></li>
              <li><Link to="/cookies" className="text-zinc-400 hover:text-purple-400">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-zinc-800/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-zinc-500">&copy; {new Date().getFullYear()} PartyTracker. All rights reserved.</p>
          <p className="text-zinc-500 mt-4 md:mt-0">Made with ❤️ for partiers everywhere</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;