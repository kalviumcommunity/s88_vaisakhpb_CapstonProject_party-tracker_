import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Star, Share2 } from 'lucide-react';
import EventCard from '../components/events/EventCard';
import { Club, Event } from '../types';
import { useEvents } from '../context/EventsContext';
import { useAuth } from '../context/AuthContext';

const ClubDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { events, fetchEvents } = useEvents();
  const { isAuthenticated } = useAuth();
  const [club, setClub] = useState<Club | null>(null);
  const [clubEvents, setClubEvents] = useState<Event[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState<'about' | 'events' | 'reviews'>('about');

  useEffect(() => {
    // Mock fetch club data
    const foundClub = mockClubs.find(c => c.id === id);
    setClub(foundClub || null);
    
    // Fetch events
    fetchEvents();
  }, [id, fetchEvents]);

  // Filter events for this club
  useEffect(() => {
    if (events.length && club) {
      // In a real app, we would filter by club ID
      // Here we filter by matching club name in the event title or description
      const filtered = events.filter(
        event => event.title.includes(club.name) || event.description.includes(club.name)
      );
      
      setClubEvents(filtered.length ? filtered : mockClubEvents);
    }
  }, [events, club]);

  if (!club) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-t-2 border-b-2 border-teal-500 rounded-full mx-auto mb-4"></div>
          <p className="text-zinc-500">Loading club details...</p>
        </div>
      </div>
    );
  }

  const handleFollow = () => {
    if (isAuthenticated) {
      setIsFollowing(!isFollowing);
    } else {
      // Redirect to login
      window.location.href = '/auth/login?redirect=' + encodeURIComponent(window.location.pathname);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: club.name,
        text: `Check out this club: ${club.name}`,
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
      {/* Club Header Section */}
      <div 
        className="relative bg-cover bg-center h-96"
        style={{
          backgroundImage: `url(${club.imageUrl})`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/80 to-transparent"></div>
        
        <div className="container mx-auto px-4 relative h-full flex flex-col justify-end pb-8">
          <div className="flex items-center mb-2">
            <Star className="h-5 w-5 text-yellow-400 mr-1" />
            <span className="text-white font-medium">{club.rating}</span>
            <span className="text-zinc-400 ml-1">(124 reviews)</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {club.name}
          </h1>
          
          <div className="flex items-center text-zinc-300 mb-6">
            <MapPin className="h-5 w-5 mr-2" />
            <span>{club.location}</span>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <button 
              className={`btn ${isFollowing ? 'bg-teal-600 hover:bg-teal-700' : 'btn-primary'}`}
              onClick={handleFollow}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </button>
            
            <button 
              className="btn btn-outline"
              onClick={handleShare}
            >
              <Share2 className="h-5 w-5 mr-2" />
              Share
            </button>
          </div>
        </div>
      </div>
      
      {/* Navigation Tabs */}
      <div className="bg-zinc-900 border-b border-zinc-800 sticky top-20 z-20">
        <div className="container mx-auto px-4">
          <div className="flex">
            <button 
              className={`px-6 py-4 font-medium ${activeTab === 'about' ? 'text-teal-400 border-b-2 border-teal-400' : 'text-zinc-400 hover:text-white'}`}
              onClick={() => setActiveTab('about')}
            >
              About
            </button>
            <button 
              className={`px-6 py-4 font-medium ${activeTab === 'events' ? 'text-teal-400 border-b-2 border-teal-400' : 'text-zinc-400 hover:text-white'}`}
              onClick={() => setActiveTab('events')}
            >
              Events
            </button>
            <button 
              className={`px-6 py-4 font-medium ${activeTab === 'reviews' ? 'text-teal-400 border-b-2 border-teal-400' : 'text-zinc-400 hover:text-white'}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
            </button>
          </div>
        </div>
      </div>
      
      {/* Club Content */}
      <div className="bg-zinc-900 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {activeTab === 'about' && (
            <div className="flex flex-col md:flex-row gap-8">
              {/* Club Details */}
              <div className="md:w-2/3">
                <div className="bg-zinc-800 rounded-xl p-6 mb-8">
                  <h2 className="text-2xl font-bold mb-4">About {club.name}</h2>
                  <p className="text-zinc-300 mb-6 leading-relaxed">
                    {club.description}
                    {` ${club.name} is one of the premier nightlife destinations in the city, known for its exceptional 
                    music programming, state-of-the-art sound system, and vibrant atmosphere. Since opening its doors, 
                    ${club.name} has hosted some of the biggest names in the music industry and continues to be a favorite 
                    among locals and tourists alike.`}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-zinc-700/50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Hours</h3>
                      <ul className="space-y-1 text-zinc-300">
                        <li className="flex justify-between">
                          <span>Monday - Thursday</span>
                          <span>9:00 PM - 2:00 AM</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Friday - Saturday</span>
                          <span>10:00 PM - 4:00 AM</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Sunday</span>
                          <span>Closed</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-zinc-700/50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Amenities</h3>
                      <ul className="grid grid-cols-2 gap-1 text-zinc-300">
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-teal-400 rounded-full mr-2"></span>
                          Full Bar
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-teal-400 rounded-full mr-2"></span>
                          Dance Floor
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-teal-400 rounded-full mr-2"></span>
                          VIP Section
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-teal-400 rounded-full mr-2"></span>
                          Smoking Area
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-teal-400 rounded-full mr-2"></span>
                          Coat Check
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-teal-400 rounded-full mr-2"></span>
                          Restaurant
                        </li>
                      </ul>
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
                  <h3 className="font-semibold mb-1">{club.name}</h3>
                  <p className="text-zinc-400 mb-4">123 Party Street, {club.location}, NY 10001</p>
                  <button className="btn btn-outline w-full text-sm">
                    Get Directions
                  </button>
                </div>
                
                {/* Photo Gallery */}
                <div className="bg-zinc-800 rounded-xl p-6">
                  <h2 className="text-2xl font-bold mb-4">Photo Gallery</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Array(6).fill(0).map((_, i) => (
                      <div key={i} className="rounded-lg overflow-hidden h-32 bg-zinc-700">
                        <img 
                          src={`https://images.pexels.com/photos/${1190298 + i}/pexels-photo-${1190298 + i}.jpeg?auto=compress&cs=tinysrgb&w=600`} 
                          alt={`Gallery ${i+1}`}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="md:w-1/3">
                {/* Upcoming Events Card */}
                <div className="bg-zinc-800 rounded-xl p-6 mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">Upcoming Events</h3>
                    <Link to="#" onClick={() => setActiveTab('events')} className="text-teal-400 text-sm hover:text-teal-300">
                      View All
                    </Link>
                  </div>
                  
                  <div className="space-y-4">
                    {clubEvents.slice(0, 3).map(event => (
                      <Link key={event.id} to={`/events/${event.id}`} className="flex group">
                        <div className="h-20 w-20 bg-zinc-700 rounded-lg overflow-hidden mr-3 flex-shrink-0">
                          <img 
                            src={event.imageUrl} 
                            alt={event.title}
                            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold group-hover:text-teal-400 transition-colors">
                            {event.title}
                          </h4>
                          <div className="flex items-center text-zinc-400 text-sm">
                            <Calendar className="h-3 w-3 mr-1" /> 
                            {new Date(event.dateTime).toLocaleDateString()}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
                
                {/* Club Stats */}
                <div className="bg-zinc-800 rounded-xl p-6 mb-8">
                  <h3 className="text-xl font-bold mb-4">Stats</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-zinc-700/50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-teal-400 mb-1">4.8</div>
                      <div className="text-sm text-zinc-400">Average Rating</div>
                    </div>
                    <div className="bg-zinc-700/50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-teal-400 mb-1">124</div>
                      <div className="text-sm text-zinc-400">Reviews</div>
                    </div>
                    <div className="bg-zinc-700/50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-teal-400 mb-1">1,250+</div>
                      <div className="text-sm text-zinc-400">Monthly Visitors</div>
                    </div>
                    <div className="bg-zinc-700/50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-teal-400 mb-1">3+</div>
                      <div className="text-sm text-zinc-400">Years Operating</div>
                    </div>
                  </div>
                </div>
                
                {/* Similar Clubs */}
                <div className="bg-zinc-800 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">Similar Clubs</h3>
                  <div className="space-y-4">
                    {mockClubs.filter(c => c.id !== id).slice(0, 3).map(similarClub => (
                      <Link key={similarClub.id} to={`/clubs/${similarClub.id}`} className="flex group">
                        <div className="h-16 w-16 bg-zinc-700 rounded-lg overflow-hidden mr-3 flex-shrink-0">
                          <img 
                            src={similarClub.imageUrl} 
                            alt={similarClub.name}
                            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold group-hover:text-teal-400 transition-colors">
                            {similarClub.name}
                          </h4>
                          <p className="text-zinc-400 text-sm">
                            {similarClub.location}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'events' && (
            <div>
              <h2 className="text-2xl font-bold mb-8">Upcoming Events at {club.name}</h2>
              
              {clubEvents.length === 0 ? (
                <div className="text-center py-12 bg-zinc-800 rounded-xl">
                  <Calendar className="h-16 w-16 text-zinc-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No upcoming events</h3>
                  <p className="text-zinc-400">
                    {club.name} doesn't have any events scheduled at the moment.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {clubEvents.map(event => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              )}
              
              <div className="mt-12 bg-zinc-800 rounded-xl p-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-2">Organizing an event at {club.name}?</h3>
                  <p className="text-zinc-400 mb-6">
                    Submit your event to be listed on our platform and reach thousands of potential attendees.
                  </p>
                  <button className="btn btn-primary">
                    Submit an Event
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Reviews</h2>
                <button className="btn btn-primary">
                  Write a Review
                </button>
              </div>
              
              <div className="bg-zinc-800 rounded-xl p-6 mb-8">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-teal-400 mb-2">{club.rating}</div>
                    <div className="flex items-center justify-center mb-2">
                      {Array(5).fill(0).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-5 w-5 ${i < Math.floor(club.rating) ? 'text-yellow-400' : 'text-zinc-600'}`} 
                          fill={i < Math.floor(club.rating) ? 'currentColor' : 'none'} 
                        />
                      ))}
                    </div>
                    <div className="text-zinc-400 text-sm">124 reviews</div>
                  </div>
                  
                  <div className="flex-grow">
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map(rating => (
                        <div key={rating} className="flex items-center">
                          <div className="text-sm w-12 text-zinc-400">{rating} stars</div>
                          <div className="flex-grow mx-3 bg-zinc-700 rounded-full h-2 overflow-hidden">
                            <div 
                              className="bg-teal-400 h-full" 
                              style={{ 
                                width: `${rating === 5 ? 75 : rating === 4 ? 20 : rating === 3 ? 5 : 0}%` 
                              }}
                            ></div>
                          </div>
                          <div className="text-sm text-zinc-400">
                            {rating === 5 ? 75 : rating === 4 ? 20 : rating === 3 ? 5 : 0}%
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Review List */}
              <div className="space-y-6">
                {mockReviews.map(review => (
                  <div key={review.id} className="bg-zinc-800 rounded-xl p-6">
                    <div className="flex justify-between mb-3">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-teal-600 flex items-center justify-center mr-3">
                          <span className="text-white font-bold">{review.author.charAt(0)}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold">{review.author}</h4>
                          <div className="text-zinc-500 text-sm">
                            {review.date}
                          </div>
                        </div>
                      </div>
                      <div className="flex">
                        {Array(5).fill(0).map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400' : 'text-zinc-600'}`}
                            fill={i < review.rating ? 'currentColor' : 'none'} 
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-zinc-300">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Mock clubs data
const mockClubs = [
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
  }
];

// Mock events data
const mockClubEvents: Event[] = [
  {
    id: 'ce1',
    title: 'Friday Night Fever',
    description: 'Start your weekend with the hottest beats and best drinks in town!',
    location: 'Neon Lounge, Downtown',
    dateTime: '2025-09-12T21:00:00',
    imageUrl: 'https://images.pexels.com/photos/2114365/pexels-photo-2114365.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'club',
    price: 20,
    attendees: 153,
    isHot: true
  },
  {
    id: 'ce2',
    title: 'Saturday Night Lights',
    description: 'Our flagship event with top DJs spinning the latest hits all night long.',
    location: 'Neon Lounge, Downtown',
    dateTime: '2025-09-13T22:00:00',
    imageUrl: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'club',
    price: 25,
    attendees: 210,
    isHot: true
  },
  {
    id: 'ce3',
    title: 'Industry Thursdays',
    description: 'Special night for service industry professionals with drink specials all night.',
    location: 'Neon Lounge, Downtown',
    dateTime: '2025-09-18T21:00:00',
    imageUrl: 'https://images.pexels.com/photos/2114366/pexels-photo-2114366.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'club',
    price: 15,
    attendees: 87
  },
  {
    id: 'ce4',
    title: 'Deep House Sundays',
    description: 'End your weekend with chilled deep house vibes and specialty cocktails.',
    location: 'Neon Lounge, Downtown',
    dateTime: '2025-09-14T20:00:00',
    imageUrl: 'https://images.pexels.com/photos/2282446/pexels-photo-2282446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'club',
    price: 10,
    attendees: 65
  }
];

// Mock reviews
const mockReviews = [
  {
    id: 'r1',
    author: 'Alex Johnson',
    date: 'September 5, 2025',
    rating: 5,
    comment: 'Amazing venue with great sound system and lighting. The DJs they book are always top-notch. Definitely the best club in the city!'
  },
  {
    id: 'r2',
    author: 'Sarah Miller',
    date: 'August 28, 2025',
    rating: 4,
    comment: 'Great atmosphere and music. Drinks are a bit pricey but worth it for the experience. Would recommend!'
  },
  {
    id: 'r3',
    author: 'Mike Thompson',
    date: 'August 15, 2025',
    rating: 5,
    comment: 'Been coming here for years and it never disappoints. Staff is friendly and professional. The sound system is incredible!'
  }
];

export default ClubDetailPage;