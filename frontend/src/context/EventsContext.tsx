import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Event } from '../types';

interface EventsContextType {
  events: Event[];
  fetchEvents: () => void;
  getEventById: (id: string) => Event | null;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

interface EventsProviderProps {
  children: ReactNode;
}

export const EventsProvider: React.FC<EventsProviderProps> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([]);

  // Fetch events on initial load
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    // In a real app, we would fetch from an API
    // For this demo, we'll use mock data
    setEvents(mockEvents);
  };

  const getEventById = (id: string): Event | null => {
    // Find event by ID
    return mockEvents.find(event => event.id === id) || null;
  };

  const value = {
    events,
    fetchEvents,
    getEventById,
  };

  return <EventsContext.Provider value={value}>{children}</EventsContext.Provider>;
};

export const useEvents = (): EventsContextType => {
  const context = useContext(EventsContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventsProvider');
  }
  return context;
};

// Mock events data
const mockEvents: Event[] = [
  {
    id: 'event1',
    title: 'Summer Vibes Festival',
    description: 'The biggest electronic music festival of the summer featuring top DJs from around the world.',
    location: 'Riverside Park',
    dateTime: '2025-08-15T14:00:00',
    imageUrl: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'festival',
    price: 75,
    attendees: 350,
    isHot: true
  },
  {
    id: 'event2',
    title: 'Techno Tuesdays',
    description: 'Underground techno night featuring local DJs and international guests.',
    location: 'The Basement',
    dateTime: '2025-08-18T22:00:00',
    imageUrl: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'club',
    price: 15,
    attendees: 120
  },
  {
    id: 'event3',
    title: 'Rooftop Sunset Sessions',
    description: 'Enjoy beautiful sunset views with deep house and cocktails on our panoramic rooftop.',
    location: 'Skyline Bar',
    dateTime: '2025-08-20T18:00:00',
    imageUrl: 'https://images.pexels.com/photos/2114365/pexels-photo-2114365.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'rooftop',
    price: 25,
    attendees: 200,
    isHot: true
  },
  {
    id: 'event4',
    title: 'Hip Hop Thursdays',
    description: 'Weekly hip hop night with the best DJs spinning classic and current hits.',
    location: 'Vinyl Room',
    dateTime: '2025-08-22T21:00:00',
    imageUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'club',
    price: 10,
    attendees: 150
  },
  {
    id: 'event5',
    title: 'End of Summer Bash',
    description: 'Say goodbye to summer with this all-day beach party featuring multiple stages and food vendors.',
    location: 'Oceanside Beach',
    dateTime: '2025-08-30T12:00:00',
    imageUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'festival',
    price: 45,
    attendees: 500,
    isHot: true
  },
  {
    id: 'event6',
    title: 'Jazz Night',
    description: 'Intimate jazz performances by local musicians in a cozy setting.',
    location: 'Blue Note Lounge',
    dateTime: '2025-08-17T19:30:00',
    imageUrl: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'music',
    price: 20,
    attendees: 80
  },
  {
    id: 'event7',
    title: 'Freshman Welcome Party',
    description: 'The biggest welcome party for all freshman students. DJ, drinks, and good vibes!',
    location: 'Student Union Building',
    dateTime: '2025-09-15T20:00:00',
    imageUrl: 'https://images.pexels.com/photos/1154189/pexels-photo-1154189.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'campus',
    attendees: 230,
    isHot: true
  },
  {
    id: 'event8',
    title: 'Friday Night Fever',
    description: 'Start your weekend with the hottest beats and best drinks in town!',
    location: 'Neon Lounge, Downtown',
    dateTime: '2025-09-12T21:00:00',
    imageUrl: 'https://images.pexels.com/photos/2114365/pexels-photo-2114365.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'club',
    price: 20,
    attendees: 153,
    isHot: true
  }
];