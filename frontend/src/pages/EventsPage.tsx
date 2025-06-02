import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, MapPin, Calendar, SlidersHorizontal, Grid, List, X } from 'lucide-react';
import EventCard from '../components/events/EventCard';
import EventListItem from '../components/events/EventListItem';
import { useEvents } from '../context/EventsContext';
import { Event } from '../types';

const EventsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { events, fetchEvents } = useEvents();
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [isGridView, setIsGridView] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    location: searchParams.get('location') || '',
    category: searchParams.get('category') || '',
    date: searchParams.get('date') || '',
    sort: searchParams.get('sort') || 'date'
  });

  // Fetch events on initial load
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Apply filters whenever events or filters change
  useEffect(() => {
    if (events.length) {
      let result = [...events];
      
      // Apply search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        result = result.filter(event => 
          event.title.toLowerCase().includes(searchLower) || 
          event.description.toLowerCase().includes(searchLower)
        );
      }
      
      // Apply location filter
      if (filters.location) {
        result = result.filter(event => 
          event.location.toLowerCase().includes(filters.location.toLowerCase())
        );
      }
      
      // Apply category filter
      if (filters.category) {
        result = result.filter(event => 
          event.category.toLowerCase() === filters.category.toLowerCase()
        );
      }
      
      // Apply date filter
      if (filters.date) {
        const filterDate = new Date(filters.date);
        result = result.filter(event => {
          const eventDate = new Date(event.dateTime);
          return eventDate.toDateString() === filterDate.toDateString();
        });
      }
      
      // Apply sorting
      if (filters.sort === 'date') {
        result.sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());
      } else if (filters.sort === 'popularity') {
        result.sort((a, b) => (b.attendees || 0) - (a.attendees || 0));
      }
      
      setFilteredEvents(result);
    }
  }, [events, filters]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (filters.search) params.set('search', filters.search);
    if (filters.location) params.set('location', filters.location);
    if (filters.category) params.set('category', filters.category);
    if (filters.date) params.set('date', filters.date);
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
      category: '',
      date: '',
      sort: 'date'
    });
  };

  return (
    <div className="pt-20">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-900 to-indigo-900 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Discover Events</h1>
          <p className="text-lg text-zinc-300 max-w-2xl">
            Find parties, concerts, and events happening near you. Filter by date, location, and category.
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
                  placeholder="Search events"
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
                {(filters.location || filters.category || filters.date) && (
                  <span className="bg-purple-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {[filters.location, filters.category, filters.date].filter(Boolean).length}
                  </span>
                )}
              </button>
              
              {(filters.location || filters.category || filters.date || filters.search) && (
                <button 
                  className="text-zinc-400 hover:text-white text-sm flex items-center gap-1"
                  onClick={clearFilters}
                >
                  <X className="h-3 w-3" />
                  Clear filters
                </button>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              <div>
                <select 
                  name="sort"
                  className="input h-10"
                  value={filters.sort}
                  onChange={handleFilterChange}
                >
                  <option value="date">Sort by Date</option>
                  <option value="popularity">Sort by Popularity</option>
                </select>
              </div>
              
              <div className="bg-zinc-800 rounded-lg flex">
                <button 
                  className={`p-2 rounded-l-lg ${isGridView ? 'bg-purple-600 text-white' : 'text-zinc-400 hover:text-white'}`}
                  onClick={() => setIsGridView(true)}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button 
                  className={`p-2 rounded-r-lg ${!isGridView ? 'bg-purple-600 text-white' : 'text-zinc-400 hover:text-white'}`}
                  onClick={() => setIsGridView(false)}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Advanced Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pb-2">
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
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" />
                <input 
                  type="date"
                  name="date"
                  className="input h-10 pl-10 w-full"
                  value={filters.date}
                  onChange={handleFilterChange}
                />
              </div>
              
              <div>
                <select 
                  name="category"
                  className="input h-10 w-full"
                  value={filters.category}
                  onChange={handleFilterChange}
                >
                  <option value="">All Categories</option>
                  <option value="music">Live Music</option>
                  <option value="club">Nightclub</option>
                  <option value="festival">Festival</option>
                  <option value="campus">Campus Party</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Events Listing */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold mb-4">No events found</h3>
              <p className="text-zinc-400 mb-6">
                No events match your current filters. Try adjusting your search criteria.
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
                {filteredEvents.length} {filteredEvents.length === 1 ? 'Event' : 'Events'} Found
              </h2>
              
              {isGridView ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredEvents.map(event => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredEvents.map(event => (
                    <EventListItem key={event.id} event={event} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default EventsPage;