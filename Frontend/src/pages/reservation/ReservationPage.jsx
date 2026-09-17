import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Users,
  Clock,
  Sparkles,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Armchair,
  CheckCircle2,
} from 'lucide-react';
import SectionHeading from '../../components/common/SectionHeading';
import Input, { Textarea } from '../../components/common/Input';
import Button from '../../components/common/Button';
import TimeSlotPicker from '../../components/reservation/TimeSlotPicker';
import ReservationConfirmationModal from '../../components/reservation/ReservationConfirmationModal';
import { useReservation } from '../../context/ReservationContext';
import { useToast } from '../../context/ToastContext';
import { RESERVATION_OCCASIONS } from '../../data/reservations';
import { CAFE_INFO } from '../../data/cafeInfo';

export const ReservationPage = () => {
  const { bookReservation } = useReservation();
  const { addToast } = useToast();

  const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    guests: 2,
    date: tomorrowStr,
    timeSlot: '07:00 PM',
    occasion: 'Casual Dining / Coffee',
    specialRequests: '',
  });

  const [errors, setErrors] = useState({});
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Please enter your name.';
    if (!form.phone.trim()) newErrors.phone = 'Please enter a valid phone number.';
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!form.date) newErrors.date = 'Please choose a reservation date.';
    if (!form.timeSlot) newErrors.timeSlot = 'Please select an available time slot.';
    if (Number(form.guests) < 1 || Number(form.guests) > 20) {
      newErrors.guests = 'Please select between 1 and 20 guests.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      addToast('Please fill all required reservation fields correctly.', 'error');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const res = bookReservation(form);
      setIsSubmitting(false);
      setConfirmedBooking(res);
      setIsModalOpen(true);
      addToast(`Table reserved for ${form.name} (${res.reservationId})`, 'success');

      // Reset form
      setForm({
        name: '',
        phone: '',
        email: '',
        guests: 2,
        date: tomorrowStr,
        timeSlot: '07:00 PM',
        occasion: 'Casual Dining / Coffee',
        specialRequests: '',
      });
    }, 600);
  };

  return (
    <div className="py-10 sm:py-16 bg-cream-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          subtitle="Table Reservations"
          title="Reserve Your Sanctuary"
          description="Book a dedicated table for morning brew meetings, romantic evenings, or group weekend brunches."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Reservation Form */}
          <div className="lg:col-span-8 bg-white rounded-3xl sm:rounded-[2.5rem] border border-cream-200/90 p-6 sm:p-10 shadow-soft">
            <div className="flex items-center justify-between pb-4 border-b border-cream-200 mb-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-terracotta-600">
                  Instant Table Booking
                </span>
                <h3 className="text-2xl font-serif font-bold text-espresso-900 mt-0.5">
                  Reservation Details
                </h3>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-sage-100 text-sage-800">
                Guaranteed Seating
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Party Size, Date, Occasion */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input
                  label="Number of Guests *"
                  type="number"
                  min="1"
                  max="20"
                  value={form.guests}
                  onChange={(e) => handleInputChange('guests', e.target.value)}
                  error={errors.guests}
                  icon={Users}
                  required
                />

                <Input
                  label="Date *"
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={form.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  error={errors.date}
                  icon={Calendar}
                  required
                />

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-warmgray-700 mb-1.5">
                    Occasion / Type
                  </label>
                  <select
                    value={form.occasion}
                    onChange={(e) => handleInputChange('occasion', e.target.value)}
                    className="w-full bg-cream-50/70 border border-cream-300 rounded-2xl px-3.5 py-3 text-sm text-warmgray-900 focus:bg-white focus:outline-none focus:border-coffee-500 focus:ring-2 focus:ring-coffee-500/20"
                  >
                    {RESERVATION_OCCASIONS.map((occ) => (
                      <option key={occ} value={occ}>
                        {occ}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Time Slot Picker Component */}
              <TimeSlotPicker
                selectedSlot={form.timeSlot}
                onSelectSlot={(slot) => handleInputChange('timeSlot', slot)}
                error={errors.timeSlot}
              />

              {/* Guest Details */}
              <div className="pt-4 border-t border-cream-200 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-warmgray-700">
                  Guest Contact Information
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Full Name *"
                    placeholder="e.g. Pooja Iyer"
                    value={form.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    error={errors.name}
                    required
                  />

                  <Input
                    label="Phone Number (for SMS Confirmation) *"
                    placeholder="+91 98450 12345"
                    value={form.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    error={errors.phone}
                    required
                  />
                </div>

                <Input
                  label="Email Address (Optional)"
                  type="email"
                  placeholder="pooja@example.com"
                  value={form.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  error={errors.email}
                />

                <Textarea
                  label="Special Requests / Seating Preference (Optional)"
                  rows={2}
                  placeholder="e.g. Quiet corner table, high chair for toddler, anniversary flowers..."
                  value={form.specialRequests}
                  onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full font-bold shadow-elevated"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Confirming Reservation...' : 'Confirm Table Booking'}
                </Button>
              </div>
            </form>
          </div>

          {/* Right Info Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Booking Policies */}
            <div className="bg-white rounded-3xl border border-cream-200 p-6 shadow-soft space-y-4 text-xs">
              <h4 className="font-serif font-bold text-espresso-900 text-sm flex items-center gap-2">
                <Armchair className="w-4 h-4 text-coffee-600" /> Reservation Policies
              </h4>
              <ul className="space-y-2 text-warmgray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sage-600 shrink-0 mt-0.5" />
                  <span>Tables are held for up to 15 minutes past scheduled reservation time.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sage-600 shrink-0 mt-0.5" />
                  <span>Standard table duration is 90 minutes during peak evening hours.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sage-600 shrink-0 mt-0.5" />
                  <span>No cancellation fee or advance deposit required.</span>
                </li>
              </ul>
            </div>

            {/* Direct Assistance */}
            <div className="bg-espresso-900 text-cream-50 rounded-3xl p-6 shadow-soft space-y-3 text-xs">
              <span className="text-terracotta-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Host Concierge
              </span>
              <p className="text-cream-200/90 leading-relaxed">
                For parties exceeding 12 guests or bespoke corporate tastings, please call our hospitality desk directly.
              </p>
              <div className="pt-2 flex items-center gap-2 text-sm font-bold text-cream-100">
                <Phone className="w-4 h-4 text-terracotta-400" />
                <span>+91 (80) 4920-8822</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ReservationConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        reservation={confirmedBooking}
      />
    </div>
  );
};

export default ReservationPage;
