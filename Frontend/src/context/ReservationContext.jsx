import React, { createContext, useContext, useState, useEffect } from 'react';
import { generateReservationId } from '../data/reservations';

const ReservationContext = createContext(null);

const RESERVATIONS_STORAGE_KEY = 'cafe_adda_reservations_v1';

const INITIAL_MOCK_RESERVATIONS = [
  {
    reservationId: 'RES-8821B',
    name: 'Ashirvad Roy',
    phone: '+91 98450 12345',
    email: 'ashirvad@example.com',
    guests: 2,
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    timeSlot: '07:00 PM',
    occasion: 'Casual Dining / Coffee',
    specialRequests: 'Quiet window booth requested',
    status: 'Confirmed',
    createdAt: new Date().toISOString(),
  },
];

export const ReservationProvider = ({ children }) => {
  const [reservations, setReservations] = useState(() => {
    try {
      const saved = localStorage.getItem(RESERVATIONS_STORAGE_KEY);
      return saved && JSON.parse(saved).length > 0 ? JSON.parse(saved) : INITIAL_MOCK_RESERVATIONS;
    } catch {
      return INITIAL_MOCK_RESERVATIONS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(RESERVATIONS_STORAGE_KEY, JSON.stringify(reservations));
    } catch (e) {
      console.error('Failed to save reservations to localStorage', e);
    }
  }, [reservations]);

  const bookReservation = (details) => {
    const reservationId = generateReservationId();
    const newReservation = {
      reservationId,
      name: details.name,
      phone: details.phone,
      email: details.email || '',
      guests: Number(details.guests) || 2,
      date: details.date,
      timeSlot: details.timeSlot,
      occasion: details.occasion || 'Casual Dining / Coffee',
      specialRequests: details.specialRequests || '',
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
    };

    setReservations((prev) => [newReservation, ...prev]);
    return newReservation;
  };

  const getReservationById = (id) => {
    const clean = (id || '').toUpperCase().trim();
    return reservations.find((r) => r.reservationId.toUpperCase() === clean) || null;
  };

  return (
    <ReservationContext.Provider value={{ reservations, bookReservation, getReservationById }}>
      {children}
    </ReservationContext.Provider>
  );
};

export const useReservation = () => {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error('useReservation must be used within a ReservationProvider');
  }
  return context;
};
