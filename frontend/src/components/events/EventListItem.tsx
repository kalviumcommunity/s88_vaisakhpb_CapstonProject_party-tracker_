import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, ArrowRight } from 'lucide-react';
import { Event } from '../../types';

interface EventListItemProps {
  event: Event;
}

const EventListItem: React.FC<EventListItemProps> = ({ event }) => {
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
    <div className="card group hover:transform hover:scale-[1.01] transition-all duration-300">
      <div className="flex flex-col md:flex-row">
        <div className="relative md:w-1/4 overflow-hidden">
          <img 
            src={event.imageUrl} 
            alt={event.title} 
            className="w-full h-40 md:h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute top-0 right-0 bg-purple-600 text-white py-1 px-3 text-sm font-semibold">
            {event.category}
          </div>
          {event.isHot && (
            <div className="absolute bottom-0 left-0 bg-pink-600 text-white py-1 px-3 text-sm font-semibold">
              🔥 Hot
            </div>
          )}
        </div>
        
        <div className="p-5 md:w-3/4 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold group-hover:text-purple-400 transition-colors">
              {event.title}
            </h3>
            <span className="bg-zinc-800 text-white text-sm px-3 py-1 rounded-full">
              ${event.price || 'Free'}
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4 text-sm">
            <div className="flex items-center text-zinc-400">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{formatDate(event.dateTime)}</span>
            </div>
            <div className="flex items-center text-zinc-400">
              <Clock className="h-4 w-4 mr-1" />
              <span>{formatTime(event.dateTime)}</span>
            </div>
            <div className="flex items-center text-zinc-400">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{event.location}</span>
            </div>
          </div>
          
          <p className="text-zinc-500 mb-4 line-clamp-2 flex-grow">
            {event.description}
          </p>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center text-sm">
              <Users className="h-4 w-4 mr-1 text-teal-500" />
              <span className="text-teal-500 font-medium">{event.attendees || 0} attending</span>
            </div>
            
            <Link 
              to={`/events/${event.id}`}
              className="btn btn-outline flex items-center gap-1 text-sm py-1.5 px-4 group-hover:text-purple-400 group-hover:border-purple-400/30"
            >
              View Details
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventListItem;