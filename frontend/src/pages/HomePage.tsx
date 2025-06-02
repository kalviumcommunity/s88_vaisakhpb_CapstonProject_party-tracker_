import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Music, Calendar, ArrowRight } from 'lucide-react';
import HeroSection from '../components/home/HeroSection';
import EventCard from '../components/events/EventCard';
import ClubCard from '../components/clubs/ClubCard';
import { useEvents } from '../context/EventsContext';
import { Event } from '../types';

const HomePage: React.FC = () => {
  const { events, fetchEvents } = useEvents();
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [trendingEvents, setTrendingEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  useEffect(() => {
    if (events.length) {
      // Set upcoming events (next 3 days)
      const now = new Date();
      const threeDaysLater = new Date(now);
      threeDaysLater.setDate(now.getDate() + 3);
      
      const upcoming = events
        .filter(event => new Date(event.dateTime) > now && new Date(event.dateTime) < threeDaysLater)
        .sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime())
        .slice(0, 4);
      
      setUpcomingEvents(upcoming);
      
      // Set trending events (by popularity)
      const trending = [...events]
        .sort((a, b) => (b.attendees || 0) - (a.attendees || 0))
        .slice(0, 4);
      
      setTrendingEvents(trending);
    }
  }, [events]);

  return (
    <div className="pt-20">
      <HeroSection />
      
      {/* Event Categories */}
      <section className="py-16 bg-zinc-950">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold mb-12">Find Your Scene</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-purple-900/30 to-purple-600/30 p-8 rounded-xl border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 group">
              <div className="bg-purple-500/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-purple-500/30 transition-all">
                <Music className="h-8 w-8 text-purple-300" />
              </div>
              <h3 className="text-xl font-bold mb-3">Live Music</h3>
              <p className="text-zinc-400 mb-6">Discover local bands, DJs, and music events happening near you.</p>
              <Link to="/events?category=music" className="flex items-center text-purple-400 hover:text-purple-300 group-hover:translate-x-1 transition-all">
                Explore <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            
            <div className="bg-gradient-to-br from-teal-900/30 to-teal-600/30 p-8 rounded-xl border border-teal-500/20 hover:border-teal-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/10 group">
              <div className="bg-teal-500/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-teal-500/30 transition-all">
                <Calendar className="h-8 w-8 text-teal-300" />
              </div>
              <h3 className="text-xl font-bold mb-3">Club Events</h3>
              <p className="text-zinc-400 mb-6">Find the hottest club nights, special events and themed parties.</p>
              <Link to="/events?category=club" className="flex items-center text-teal-400 hover:text-teal-300 group-hover:translate-x-1 transition-all">
                Explore <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            
            <div className="bg-gradient-to-br from-pink-900/30 to-pink-600/30 p-8 rounded-xl border border-pink-500/20 hover:border-pink-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/10 group">
              <div className="bg-pink-500/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-pink-500/30 transition-all">
                <MapPin className="h-8 w-8 text-pink-300" />
              </div>
              <h3 className="text-xl font-bold mb-3">Campus Parties</h3>
              <p className="text-zinc-400 mb-6">Student-only events, campus gatherings, and college nightlife.</p>
              <Link to="/student-zone" className="flex items-center text-pink-400 hover:text-pink-300 group-hover:translate-x-1 transition-all">
                Explore <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Upcoming Events */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Upcoming Events</h2>
            <Link to="/events" className="text-purple-400 hover:text-purple-300 flex items-center">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <p className="text-zinc-400 col-span-4 text-center py-12">Loading upcoming events...</p>
            )}
          </div>
        </div>
      </section>
      
      {/* Trending Events */}
      <section className="py-16 bg-zinc-950/80">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Trending Now</h2>
            <Link to="/events?sort=trending" className="text-purple-400 hover:text-purple-300 flex items-center">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingEvents.length > 0 ? (
              trendingEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <p className="text-zinc-400 col-span-4 text-center py-12">Loading trending events...</p>
            )}
          </div>
        </div>
      </section>
      
      {/* Featured Clubs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Featured Clubs</h2>
            <Link to="/clubs" className="text-purple-400 hover:text-purple-300 flex items-center">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockClubs.map(club => (
              <ClubCard key={club.id} club={club} />
            ))}
          </div>
        </div>
      </section>
      
      {/* App Promo */}
      <section className="py-20 bg-gradient-to-r from-purple-900/70 to-pink-900/70 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Never Miss An Event Again</h2>
            <p className="text-xl text-zinc-300 mb-8">
              Download our mobile app to get real-time notifications about events near you. Available for iOS and Android.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="btn btn-primary">
                Download for iOS
              </button>
              <button className="btn btn-primary">
                Download for Android
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Mock data for clubs
const mockClubs = [
  {
    id: 'club1',
    name: 'Neon Lounge',
    description: 'Upscale nightclub with the best DJs in town',
    location: 'Downtown',
    imageUrl: 'https://images.pexels.com/photos/2114365/pexels-photo-2114365.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.8,
    upcomingEvents: 3
  },
  {
    id: 'club2',
    name: 'The Basement',
    description: 'Underground club featuring techno and house music',
    location: 'Arts District',
    imageUrl: 'https://images.pexels.com/photos/2114366/pexels-photo-2114366.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.5,
    upcomingEvents: 2
  },
  {
    id: 'club3',
    name: 'Skyline Rooftop',
    description: 'Rooftop bar with panoramic city views',
    location: 'Financial District',
    imageUrl: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.9,
    upcomingEvents: 5
  }
];

export default HomePage;