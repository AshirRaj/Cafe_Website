export const TIME_SLOTS = [
  '08:30 AM',
  '09:30 AM',
  '10:30 AM',
  '11:30 AM',
  '12:30 PM',
  '01:30 PM',
  '04:00 PM',
  '05:00 PM',
  '06:00 PM',
  '07:00 PM',
  '08:00 PM',
  '09:00 PM',
];

export const RESERVATION_OCCASIONS = [
  'Casual Dining / Coffee',
  'Work / Meeting Session',
  'Birthday / Celebration',
  'Date / Romantic Evening',
  'Family Brunch',
];

export const generateReservationId = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = 'RES-';
  for (let i = 0; i < 5; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};
