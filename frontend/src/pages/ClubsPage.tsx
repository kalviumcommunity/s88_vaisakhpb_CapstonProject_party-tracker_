import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, MapPin, Star, SlidersHorizontal, X } from 'lucide-react';
import ClubCard from '../components/clubs/ClubCard';
import { Club } from '../types';

const ClubsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredClubs, setFilteredClubs] = useState<Club[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    location: searchParams.get('location') || '',
    rating: searchParams.get('rating') || '',
    sort: searchParams.get('sort') || 'alphabetical'
  });

  useEffect(() => {
    // Apply filters to clubs
    let result = [...mockClubs];
    
    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(club => 
        club.name.toLowerCase().includes(searchLower) || 
        club.description.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply location filter
    if (filters.location) {
      result = result.filter(club => 
        club.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    // Apply rating filter
    if (filters.rating) {
      const minRating = parseFloat(filters.rating);
      result = result.filter(club => club.rating >= minRating);
    }
    
    // Apply sorting
    if (filters.sort === 'alphabetical') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filters.sort === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (filters.sort === 'events') {
      result.sort((a, b) => b.upcomingEvents - a.upcomingEvents);
    }
    
    setFilteredClubs(result);
  }, [filters]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (filters.search) params.set('search', filters.search);
    if (filters.location) params.set('location', filters.location);
    if (filters.rating) params.set('rating', filters.rating);
    if (filters.sort) params.set('sort', filters.sort);
    
    setSearchParams(params);
  }, [filters, setSearchParams]);

  // Handle filter changes
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      search: '',
      location: '',
      rating: '',
      sort: 'alphabetical'
    });
  };

  return (
    <div className="pt-20">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-900 to-blue-900 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Club Directory</h1>
          <p className="text-lg text-zinc-300 max-w-2xl">
            Discover the best clubs, venues, and event spaces in your area. 
            Follow your favorites to never miss an event.
          </p>
        </div>
      </div>
      
      {/* Filters Section */}
      <div className="bg-zinc-950 sticky top-20 z-20 border-b border-zinc-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4 flex-grow">
              <div className="relative flex-grow max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" />
                <input 
                  type="text"
                  name="search"
                  placeholder="Search clubs"
                  className="input h-10 pl-10 w-full"
                  value={filters.search}
                  onChange={handleFilterChange}
                />
              </div>
              
              <button 
                className="flex items-center gap-2 text-zinc-300 hover:text-white bg-zinc-800 px-4 py-2 rounded-lg transition-colors"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {(filters.location || filters.rating) && (
                  <span className="bg-teal-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {[filters.location, filters.rating].filter(Boolean).length}
                  </span>
                )}
              </button>
              
              {(filters.location || filters.rating || filters.search) && (
                <button 
                  className="text-zinc-400 hover:text-white text-sm flex items-center gap-1"
                  onClick={clearFilters}
                >
                  <X className="h-3 w-3" />
                  Clear filters
                </button>
              )}
            </div>
            
            <div>
              <select 
                name="sort"
                className="input h-10"
                value={filters.sort}
                onChange={handleFilterChange}
              >
                <option value="alphabetical">Sort by Name</option>
                <option value="rating">Sort by Rating</option>
                <option value="events">Sort by Upcoming Events</option>
              </select>
            </div>
          </div>
          
          {/* Advanced Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pb-2">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" />
                <input 
                  type="text"
                  name="location"
                  placeholder="Location"
                  className="input h-10 pl-10 w-full"
                  value={filters.location}
                  onChange={handleFilterChange}
                />
              </div>
              
              <div className="relative">
                <Star className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" />
                <select 
                  name="rating"
                  className="input h-10 pl-10 w-full"
                  value={filters.rating}
                  onChange={handleFilterChange}
                >
                  <option value="">All Ratings</option>
                  <option value="4.5">4.5+ Stars</option>
                  <option value="4">4+ Stars</option>
                  <option value="3">3+ Stars</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Clubs Listing */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredClubs.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold mb-4">No clubs found</h3>
              <p className="text-zinc-400 mb-6">
                No clubs match your current filters. Try adjusting your search criteria.
              </p>
              <button 
                className="btn btn-primary"
                onClick={clearFilters}
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-semibold mb-6">
                {filteredClubs.length} {filteredClubs.length === 1 ? 'Club' : 'Clubs'} Found
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredClubs.map(club => (
                  <ClubCard key={club.id} club={club} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
      
      {/* Become a Partner */}
      <section className="py-16 bg-zinc-950">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-zinc-900 to-teal-900/30 p-8 rounded-xl border border-teal-500/20">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Own a Venue or Club?</h2>
              <p className="text-zinc-300 mb-6">
                Partner with PartyTracker to promote your events and reach thousands of party-goers in your area.
              </p>
              <button className="btn btn-primary">
                Become a Partner
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Mock clubs data
const mockClubs: Club[] = [
  {
    id: 'club1',
    name: 'Neon Lounge',
    description: 'Upscale nightclub with the best DJs in town',
    location: 'Downtown',
    imageUrl: 'https://images.pexels.com/photos/2114365/pexels-photo-2114365.jpeg?auto=compress&cs=tinysrgb&w=1600',
    rating: 4.8,
    upcomingEvents: 3
  },
  {
    id: 'club2',
    name: 'The Basement',
    description: 'Underground club featuring techno and house music',
    location: 'Arts District',
    imageUrl: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1600',
    rating: 4.5,
    upcomingEvents: 2
  },
  {
    id: 'club3',
    name: 'Skyline Rooftop',
    description: 'Rooftop bar with panoramic city views',
    location: 'Financial District',
    imageUrl: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=1600',
    rating: 4.9,
    upcomingEvents: 5
  },
  {
    id: 'club4',
    name: 'Vinyl Room',
    description: 'Retro-style club with vinyl DJs and classic cocktails',
    location: 'Downtown',
    imageUrl: 'https://images.pexels.com/photos/2282446/pexels-photo-2282446.jpeg?auto=compress&cs=tinysrgb&w=1600',
    rating: 4.3,
    upcomingEvents: 1
  },
  {
    id: 'club5',
    name: 'Echo Warehouse',
    description: 'Massive warehouse venue for electronic music events',
    location: 'Industrial District',
    imageUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1600',
    rating: 4.7,
    upcomingEvents: 4
  },
  {
    id: 'club6',
    name: 'The Jazz Corner',
    description: 'Intimate jazz club with live performances every night',
    location: 'Arts District',
    imageUrl: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1600',
    rating: 4.6,
    upcomingEvents: 7
  }
];

export default ClubsPage;