export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  dateTime: string;
  imageUrl: string;
  category: string;
  price?: number;
  attendees?: number;
  isHot?: boolean;
}

export interface Club {
  id: string;
  name: string;
  description: string;
  location: string;
  imageUrl: string;
  rating: number;
  upcomingEvents: number;
}

export interface FigmaDesign {
  id: string;
  name: string;
  url: string;
  lastModified: string;
  owner: string;
  team: string;
}