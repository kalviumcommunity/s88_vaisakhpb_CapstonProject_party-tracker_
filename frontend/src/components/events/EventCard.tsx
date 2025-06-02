import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { Event } from '../../types';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
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

  return (
    <Link to={`/events/${event.id}`} className="block">
      <div className="bg-zinc-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-zinc-700/50 group hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
          {event.isHot && (
            <div className="absolute top-4 right-4">
              <span className="bg-red-500/90 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
                Hot 🔥
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="p-5">
          <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-purple-400 transition-colors">
            {event.title}
          </h3>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-zinc-400">
              <Calendar className="h-4 w-4 mr-2" />
              <span className="text-sm">{formatDate(event.dateTime)}</span>
            </div>
            <div className="flex items-center text-zinc-400">
              <Clock className="h-4 w-4 mr-2" />
              <span className="text-sm">{formatTime(event.dateTime)}</span>
            </div>
            <div className="flex items-center text-zinc-400">
              <MapPin className="h-4 w-4 mr-2" />
              <span className="text-sm">{event.location}</span>
            </div>
            {event.attendees && (
              <div className="flex items-center text-zinc-400">
                <Users className="h-4 w-4 mr-2" />
                <span className="text-sm">{event.attendees} attending</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            {event.price ? (
              <span className="text-purple-400 font-semibold">
                ${event.price}
              </span>
            ) : (
              <span className="text-green-400 font-medium">Free</span>
            )}
            <span className="inline-flex items-center text-sm text-purple-400 font-medium group-hover:translate-x-1 transition-transform">
              View Details
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;