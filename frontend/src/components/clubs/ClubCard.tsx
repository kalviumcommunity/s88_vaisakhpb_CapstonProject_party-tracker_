import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Calendar } from 'lucide-react';
import { Club } from '../../types';

interface ClubCardProps {
  club: Club;
}

const ClubCard: React.FC<ClubCardProps> = ({ club }) => {
  return (
    <div className="card group hover:transform hover:scale-[1.02] transition-all duration-300">
      <div className="relative overflow-hidden h-48">
        <img 
          src={club.imageUrl} 
          alt={club.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-purple-300 transition-colors">
            {club.name}
          </h3>
          <div className="flex items-center text-sm text-zinc-300">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{club.location}</span>
          </div>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 mr-1" />
            <span className="text-white font-medium">{club.rating}</span>
            <span className="text-zinc-500 text-sm ml-1">/ 5.0</span>
          </div>
          
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-1 text-teal-500" />
            <span className="text-teal-500 font-medium">{club.upcomingEvents} upcoming</span>
          </div>
        </div>
        
        <p className="text-zinc-400 mb-4 line-clamp-2">
          {club.description}
        </p>
        
        <Link 
          to={`/clubs/${club.id}`}
          className="btn btn-outline w-full text-sm font-medium group-hover:text-purple-400 group-hover:border-purple-400/30"
        >
          View Club
        </Link>
      </div>
    </div>
  );
};

export default ClubCard;