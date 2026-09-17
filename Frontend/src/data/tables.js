export const TABLES = [
  { id: 'T01', number: 'T01', name: 'Table 01 (Window Nook)', capacity: '2 Guests', section: 'Window View', status: 'Available' },
  { id: 'T02', number: 'T02', name: 'Table 02 (Window Nook)', capacity: '2 Guests', section: 'Window View', status: 'Occupied' },
  { id: 'T03', number: 'T03', name: 'Table 03 (Sunlit Lounge)', capacity: '4 Guests', section: 'Main Lounge', status: 'Available' },
  { id: 'T04', number: 'T04', name: 'Table 04 (Sunlit Lounge)', capacity: '4 Guests', section: 'Main Lounge', status: 'Available' },
  { id: 'T05', number: 'T05', name: 'Table 05 (Brew Bar Counter)', capacity: '1-2 Guests', section: 'Brew Bar', status: 'Reserved' },
  { id: 'T06', number: 'T06', name: 'Table 06 (Quiet Work Corner)', capacity: '2 Guests', section: 'Work Corner', status: 'Available' },
  { id: 'T07', number: 'T07', name: 'Table 07 (Bookshelf Alcove)', capacity: '4 Guests', section: 'Library', status: 'Available' },
  { id: 'T08', number: 'T08', name: 'Table 08 (Garden Patio)', capacity: '6 Guests', section: 'Outdoor Patio', status: 'Occupied' },
  { id: 'T09', number: 'T09', name: 'Table 09 (Garden Patio)', capacity: '4 Guests', section: 'Outdoor Patio', status: 'Available' },
  { id: 'T10', number: 'T10', name: 'Table 10 (Family Booth)', capacity: '6 Guests', section: 'Main Lounge', status: 'Available' },
];

export const getAvailableTables = () => TABLES.filter((t) => t.status === 'Available');

export const getTableById = (tableId) => TABLES.find((t) => t.id === tableId || t.number === tableId);
