import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { School, Lock, Users, Calendar, MapPin, Tag } from 'lucide-react';
import EventCard from '../components/events/EventCard';
import { Event } from '../types';

const StudentZonePage: React.FC = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [college, setCollege] = useState('');
  const [email, setEmail] = useState('');

  // Mock student events data
  const studentEvents: Event[] = [
    {
      id: 'se1',
      title: 'Campus Spring Fest 2025',
      description: 'The biggest student party of the year with live music, food, and games!',
      dateTime: '2025-06-15T18:00:00',
      location: 'University Main Square',
      imageUrl: '/images/spring-fest.jpg',
      category: 'Festival',
      price: 15,
      attendees: 500,
    },
    {
      id: 'se2',
      title: 'Graduation Night Party',
      description: 'Celebrate with the class of 2025! DJ, dance floor, and memories.',
      dateTime: '2025-06-20T20:00:00',
      location: 'Grand Hall',
      imageUrl: '/images/grad-party.jpg',
      category: 'Party',
      price: 25,
      attendees: 300,
    },
    {
      id: 'se3',
      title: 'Inter-College Music Festival',
      description: 'Showcase your talent or enjoy amazing performances!',
      dateTime: '2025-06-25T17:00:00',
      location: 'College Auditorium',
      imageUrl: '/images/music-fest.jpg',
      category: 'Music',
      price: 10,
      attendees: 400,
    },
  ];

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would send a verification email
    if (email.endsWith('.edu')) {
      setIsVerified(true);
    } else {
      alert('Please enter a valid college email address (.edu)');
    }
  };

  if (!isVerified) {
    return (
      <div className="pt-20 min-h-screen bg-zinc-900">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-pink-900 to-purple-900 py-16 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,#000000_25%,transparent_25%,transparent_75%,#000000_75%,#000000),linear-gradient(45deg,#000000_25%,transparent_25%,transparent_75%,#000000_75%,#000000)] bg-[length:20px_20px] bg-[position:0_0,10px_10px]"></div>
          </div>
          <div className="container mx-auto px-4 relative">
            <div className="max-w-2xl mx-auto text-center">
              <School className="h-16 w-16 text-pink-400 mx-auto mb-6 animate-bounce" />
              <h1 className="text-4xl font-bold mb-4">Student Zone</h1>
              <p className="text-lg text-zinc-300">
                Your exclusive access to campus parties and student-only events. 
                Verify your student status to continue.
              </p>
            </div>
          </div>
        </div>
        
        {/* Verification Form */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto">
              <div className="bg-zinc-800/50 backdrop-blur-sm rounded-xl p-8 border border-zinc-700/50 shadow-xl">
                <div className="text-center mb-8">
                  <Lock className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold mb-2">Student Verification</h2>
                  <p className="text-zinc-400">
                    Please verify your student status with your college email address.
                  </p>
                </div>
                
                <form onSubmit={handleVerify} className="space-y-6">
                  <div>
                    <label htmlFor="college" className="block text-sm font-medium text-zinc-300 mb-2">
                      College/University
                    </label>
                    <select 
                      id="college"
                      className="input w-full bg-zinc-900"
                      value={college}
                      onChange={(e) => setCollege(e.target.value)}
                      required
                    >
                      <option value="">Select your college/university</option>
                      <option value="nyu">New York University</option>
                      <option value="columbia">Columbia University</option>
                      <option value="harvard">Harvard University</option>
                      <option value="stanford">Stanford University</option>
                      <option value="mit">MIT</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
                      College Email Address
                    </label>
                    <input 
                      type="email"
                      id="email"
                      placeholder="youremail@college.edu"
                      className="input w-full bg-zinc-900"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <p className="text-xs text-zinc-500 mt-1">
                      We'll send a verification link to this email.
                    </p>
                  </div>
                  
                  <button 
                    type="submit"
                    className="btn btn-primary w-full py-3"
                  >
                    Verify Student Status
                  </button>
                </form>
                
                <p className="text-center text-zinc-500 text-xs mt-6">
                  By continuing, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>

              {/* Benefits Section */}
              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-zinc-800/30 backdrop-blur-sm rounded-xl p-6 border border-zinc-700/30">
                  <Users className="h-8 w-8 text-purple-500 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Exclusive Events</h3>
                  <p className="text-zinc-400 text-sm">
                    Access student-only parties and events on your campus.
                  </p>
                </div>
                <div className="bg-zinc-800/30 backdrop-blur-sm rounded-xl p-6 border border-zinc-700/30">
                  <Tag className="h-8 w-8 text-pink-500 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Student Discounts</h3>
                  <p className="text-zinc-400 text-sm">
                    Get special pricing and deals exclusive to students.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-zinc-900">
      {/* Verified Student Header */}
      <div className="bg-gradient-to-r from-purple-900 to-pink-900 py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Student Zone</h1>
              <p className="text-zinc-300">Exclusive events for verified students</p>
            </div>
            <div className="bg-zinc-800/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-zinc-700/50">
              <p className="text-sm text-zinc-300">Verified Student</p>
              <p className="text-xs text-zinc-400">{email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Student Events */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Upcoming Student Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studentEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Campus Parties Section */}
      <section className="py-12 bg-zinc-800/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Campus Party Calendar</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {studentEvents.map((event) => (
              <div key={event.id} className="bg-zinc-800/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-700/50">
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-purple-600/20 text-purple-400 p-3 rounded-lg">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <span className="text-sm text-zinc-400">
                    {new Date(event.dateTime).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                <div className="flex items-center text-zinc-400 text-sm mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  {event.location}
                </div>
                <p className="text-zinc-500 text-sm mb-4">{event.description}</p>
                <Link
                  to={`/events/${event.id}`}
                  className="text-purple-400 hover:text-purple-300 text-sm font-medium"
                >
                  Learn more →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudentZonePage;