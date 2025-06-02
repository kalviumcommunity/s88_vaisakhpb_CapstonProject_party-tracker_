import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Share2, Heart, Flag, Ticket, CheckCircle, ChevronRight } from 'lucide-react';
import { useEvents } from '../context/EventsContext';
import { useAuth } from '../context/AuthContext';
import { Event } from '../types';

const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getEventById } = useEvents();
  const { isAuthenticated } = useAuth();
  const [event, setEvent] = useState<Event | null>(null);
  const [isAttending, setIsAttending] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (id) {
      const eventData = getEventById(id);
      setEvent(eventData);
    }
  }, [id, getEventById]);

  if (!event) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-t-2 border-b-2 border-purple-500 rounded-full mx-auto mb-4"></div>
          <p className="text-zinc-500">Loading event details...</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  const handleAttend = () => {
    if (isAuthenticated) {
      setIsAttending(!isAttending);
    } else {
      // Redirect to login
      window.location.href = '/auth/login?redirect=' + encodeURIComponent(window.location.pathname);
    }
  };

  const handleSave = () => {
    if (isAuthenticated) {
      setIsSaved(!isSaved);
    } else {
      // Redirect to login
      window.location.href = '/auth/login?redirect=' + encodeURIComponent(window.location.pathname);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: `Check out this event: ${event.title}`,
        url: window.location.href
      });
    } else {
      // Fallback copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="pt-20">
      {/* Event Header Section */}
      <div 
        className="relative bg-cover bg-center h-96"
        style={{
          backgroundImage: `url(${event.imageUrl})`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/80 to-transparent"></div>
        
        <div className="container mx-auto px-4 relative h-full flex flex-col justify-end pb-8">
          <div className="bg-purple-600 text-white py-1 px-3 text-sm font-semibold inline-block mb-4 rounded">
            {event.category}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {event.title}
          </h1>
          
          <div className="flex flex-wrap gap-6 mb-4">
            <div className="flex items-center text-zinc-300">
              <Calendar className="h-5 w-5 mr-2" />
              <span>{formatDate(event.dateTime)}</span>
            </div>
            
            <div className="flex items-center text-zinc-300">
              <Clock className="h-5 w-5 mr-2" />
              <span>{formatTime(event.dateTime)}</span>
            </div>
            
            <div className="flex items-center text-zinc-300">
              <MapPin className="h-5 w-5 mr-2" />
              <span>{event.location}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center">
              <div className="flex -space-x-4">
                {/* Mock attendee avatars */}
                <div className="w-10 h-10 rounded-full bg-purple-600 border-2 border-zinc-900 flex items-center justify-center">
                  <span className="text-white font-bold">JD</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-teal-600 border-2 border-zinc-900 flex items-center justify-center">
                  <span className="text-white font-bold">AM</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-pink-600 border-2 border-zinc-900 flex items-center justify-center">
                  <span className="text-white font-bold">TS</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-zinc-800 border-2 border-zinc-900 flex items-center justify-center">
                  <span className="text-white font-bold">+{(event.attendees || 0) - 3}</span>
                </div>
              </div>
              <span className="ml-4 text-zinc-300">
                <span className="font-semibold">{event.attendees || 0}</span> attending
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Event Content */}
      <div className="bg-zinc-900">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Event Details */}
            <div className="md:w-2/3">
              <div className="bg-zinc-800 rounded-xl p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">About This Event</h2>
                <p className="text-zinc-300 mb-4 leading-relaxed">
                  {event.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="bg-zinc-700 px-3 py-1 rounded-full text-sm">Music</span>
                  <span className="bg-zinc-700 px-3 py-1 rounded-full text-sm">Nightlife</span>
                  <span className="bg-zinc-700 px-3 py-1 rounded-full text-sm">Party</span>
                </div>
              </div>
              
              {/* Lineup Section */}
              <div className="bg-zinc-800 rounded-xl p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">Lineup</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full bg-purple-600 flex items-center justify-center mr-4">
                      <span className="text-white font-bold">DJ</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">DJ Electro</h3>
                      <p className="text-zinc-400 text-sm">Headliner</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full bg-pink-600 flex items-center justify-center mr-4">
                      <span className="text-white font-bold">DJ</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">DJ Mirage</h3>
                      <p className="text-zinc-400 text-sm">Opening Set</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Location Section */}
              <div className="bg-zinc-800 rounded-xl p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">Location</h2>
                <div className="bg-zinc-700 h-60 rounded-lg mb-4 flex items-center justify-center">
                  {/* This would be a Google Map in a real app */}
                  <MapPin className="h-12 w-12 text-zinc-500" />
                </div>
                <h3 className="font-semibold mb-1">{event.location}</h3>
                <p className="text-zinc-400 mb-4">123 Party Street, New York, NY 10001</p>
                <button className="btn btn-outline w-full text-sm">
                  Get Directions
                </button>
              </div>
              
              {/* Organizer */}
              <div className="bg-zinc-800 rounded-xl p-6">
                <h2 className="text-2xl font-bold mb-4">Organizer</h2>
                <div className="flex items-center">
                  <div className="h-16 w-16 rounded-full bg-teal-600 flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-xl">NC</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Neon Club Productions</h3>
                    <p className="text-zinc-400 mb-2">Premier event organizer with 150+ events</p>
                    <Link to="/organizers/neon-club" className="text-purple-400 hover:text-purple-300 text-sm flex items-center">
                      View Profile <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="md:w-1/3">
              {/* Actions Card */}
              <div className="bg-zinc-800 rounded-xl p-6 mb-8 sticky top-28">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold">${event.price || 'Free'}</h3>
                  {event.isHot && (
                    <span className="bg-pink-600 text-white py-1 px-3 text-sm font-semibold rounded">
                      🔥 Hot
                    </span>
                  )}
                </div>
                
                <div className="space-y-4 mb-6">
                  <button 
                    className={`btn w-full ${isAttending ? 'bg-green-600 hover:bg-green-700' : 'btn-primary'}`}
                    onClick={handleAttend}
                  >
                    {isAttending ? (
                      <>
                        <CheckCircle className="h-5 w-5 mr-2" />
                        Attending
                      </>
                    ) : (
                      <>
                        <Ticket className="h-5 w-5 mr-2" />
                        Attend
                      </>
                    )}
                  </button>
                  
                  <button 
                    className={`btn btn-outline w-full ${isSaved ? 'text-pink-400 border-pink-400/30' : ''}`}
                    onClick={handleSave}
                  >
                    <Heart className={`h-5 w-5 mr-2 ${isSaved ? 'fill-pink-400' : ''}`} />
                    {isSaved ? 'Saved' : 'Save'}
                  </button>
                  
                  <button 
                    className="btn btn-outline w-full"
                    onClick={handleShare}
                  >
                    <Share2 className="h-5 w-5 mr-2" />
                    Share
                  </button>
                </div>
                
                <div className="border-t border-zinc-700 pt-4">
                  <button className="flex items-center text-zinc-400 hover:text-zinc-300 text-sm">
                    <Flag className="h-4 w-4 mr-2" />
                    Report Event
                  </button>
                </div>
              </div>
              
              {/* Similar Events */}
              <div className="bg-zinc-800 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">Similar Events</h3>
                <div className="space-y-4">
                  {mockSimilarEvents.map(similarEvent => (
                    <Link key={similarEvent.id} to={`/events/${similarEvent.id}`} className="flex group">
                      <div className="h-20 w-20 bg-zinc-700 rounded-lg overflow-hidden mr-3 flex-shrink-0">
                        <img 
                          src={similarEvent.imageUrl} 
                          alt={similarEvent.title}
                          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold group-hover:text-purple-400 transition-colors">
                          {similarEvent.title}
                        </h4>
                        <p className="text-zinc-400 text-sm mb-1">
                          {formatDate(similarEvent.dateTime)}
                        </p>
                        <p className="text-zinc-500 text-sm">
                          {similarEvent.location}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Mock similar events
const mockSimilarEvents = [
  {
    id: 'similar1',
    title: 'Techno Tuesday',
    dateTime: '2025-09-22T20:00:00',
    location: 'Underground Club',
    imageUrl: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'similar2',
    title: 'Friday Night Lights',
    dateTime: '2025-09-25T21:00:00',
    location: 'Rooftop Bar',
    imageUrl: 'https://images.pexels.com/photos/2114365/pexels-photo-2114365.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'similar3',
    title: 'Saturday Dance Party',
    dateTime: '2025-09-26T22:00:00',
    location: 'The Warehouse',
    imageUrl: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];

export default EventDetailPage;