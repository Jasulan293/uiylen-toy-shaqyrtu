export interface WeddingData {
  groomName: string;
  brideName: string;
  monogram: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  city: string;
  venueName: string;
  venueAddress: string;
  mapGisUrl: string;
  mapYandexUrl: string;
  mapGoogleUrl: string;
  heroKicker: string;
  heroHeadline: string;
  heroSubtitle: string;
  invitationText: string;
  parentsText: string;
  heroImage: string;
  ringsImage: string;
  venueImage: string;
  dressCodeDescription: string;
  dressCodeColors: Array<{ name: string; hex: string }>;
  timeline: Array<{ time: string; title: string; desc: string; icon: string }>;
}

export type RSVPStatus = 'attending' | 'with_partner' | 'cannot_attend';

export interface RSVPRecord {
  id: string;
  guestName: string;
  status: RSVPStatus;
  partnerName?: string;
  guestCount: number;
  note?: string;
  createdAt: string;
}

export interface GuestWish {
  id: string;
  author: string;
  message: string;
  createdAt: string;
  likes: number;
}
