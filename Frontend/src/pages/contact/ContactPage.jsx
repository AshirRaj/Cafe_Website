import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Calendar,
  Users,
  Compass,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { CAFE_INFO } from '../../data/cafeInfo';
import { useToast } from '../../context/ToastContext';
import SectionHeading from '../../components/common/SectionHeading';
import Input, { Textarea } from '../../components/common/Input';
import Button from '../../components/common/Button';

export const ContactPage = () => {
  const { addToast } = useToast();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    guests: '2',
    date: '2026-09-18',
    time: '18:00',
    type: 'reservation', // 'reservation' | 'inquiry' | 'catering'
    message: '',
  });

  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      addToast('Please provide your name and phone number', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      addToast(
        form.type === 'reservation'
          ? `Table reservation request for ${form.guests} guests sent! We will confirm via SMS.`
          : `Thank you, ${form.name}! Your message has been received.`,
        'success'
      );
      setForm({
        name: '',
        phone: '',
        email: '',
        guests: '2',
        date: '2026-09-18',
        time: '18:00',
        type: 'reservation',
        message: '',
      });
    }, 600);
  };

  return (
    <div className="py-10 sm:py-16 bg-cream-50 min-h-screen space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          subtitle="Connect With Us"
          title="Get in Touch & Reserve a Table"
          description="Whether you're planning a quiet coffee date, a group brunch, or have a question, we’d love to hear from you."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Contact Info & Hours */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Location & Timings Card */}
            <div className="bg-white rounded-3xl border border-cream-200/90 p-6 sm:p-8 shadow-soft space-y-6">
              <h3 className="text-xl font-serif font-bold text-espresso-900 pb-2 border-b border-cream-200">
                Café Information
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-cream-100 text-coffee-600 flex items-center justify-center shrink-0 border border-cream-200">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-espresso-900 uppercase tracking-wider text-[10px] mb-0.5">
                      Our Address
                    </h4>
                    <p className="text-warmgray-700 font-medium">
                      {CAFE_INFO.address.street}
                    </p>
                    <p className="text-warmgray-500">
                      {CAFE_INFO.address.area}, {CAFE_INFO.address.city} - {CAFE_INFO.address.pincode}
                    </p>
                    <p className="text-coffee-600 text-[11px] mt-1">
                      {CAFE_INFO.address.landmark}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-cream-100 text-coffee-600 flex items-center justify-center shrink-0 border border-cream-200">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-espresso-900 uppercase tracking-wider text-[10px] mb-0.5">
                      Direct Phone
                    </h4>
                    <p className="text-warmgray-900 font-semibold">{CAFE_INFO.contact.phone}</p>
                    <p className="text-warmgray-500">{CAFE_INFO.contact.mobile} (Mobile / WhatsApp)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-cream-100 text-coffee-600 flex items-center justify-center shrink-0 border border-cream-200">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-espresso-900 uppercase tracking-wider text-[10px] mb-0.5">
                      Email Inquiries
                    </h4>
                    <p className="text-warmgray-700 font-medium">{CAFE_INFO.contact.email}</p>
                    <p className="text-warmgray-500">{CAFE_INFO.contact.reservations}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-cream-100 text-coffee-600 flex items-center justify-center shrink-0 border border-cream-200">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="w-full">
                    <h4 className="font-bold text-espresso-900 uppercase tracking-wider text-[10px] mb-1">
                      Opening Hours
                    </h4>
                    <div className="space-y-1 text-xs">
                      {CAFE_INFO.timings.map((t, idx) => (
                        <div key={idx} className="flex justify-between text-warmgray-600">
                          <span>{t.days}</span>
                          <span className="font-semibold text-espresso-900">{t.hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={CAFE_INFO.address.googleMapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full"
                >
                  <Button variant="outline" size="md" className="w-full" icon={Compass} iconPosition="left">
                    Open in Google Maps
                  </Button>
                </a>
              </div>
            </div>

            {/* Quick Amenities Callout */}
            <div className="bg-espresso-900 text-cream-50 rounded-3xl p-6 shadow-soft space-y-2 text-xs">
              <span className="text-terracotta-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Guest Amenities
              </span>
              <p className="text-cream-200/90 leading-relaxed">
                High-speed 300 Mbps Wi-Fi • Dedicated Power Outlets • Valet Parking • Pet-Friendly Outdoor Patio • Wheelchair Accessible
              </p>
            </div>
          </div>

          {/* Right: Interactive Reservation & Message Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-cream-200/90 p-6 sm:p-10 shadow-soft">
            <h3 className="text-2xl font-serif font-bold text-espresso-900 mb-1">
              Table Reservation & Inquiry
            </h3>
            <p className="text-xs text-warmgray-500 mb-6">
              Fill in your details below and our concierge team will confirm your seating within 15 minutes.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Type Switcher */}
              <div className="grid grid-cols-3 gap-2 p-1 bg-cream-100 rounded-2xl border border-cream-200 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, type: 'reservation' })}
                  className={`py-2 rounded-xl transition-all ${
                    form.type === 'reservation'
                      ? 'bg-espresso-900 text-white shadow-soft'
                      : 'text-warmgray-600 hover:text-espresso-900'
                  }`}
                >
                  Table Booking
                </button>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, type: 'catering' })}
                  className={`py-2 rounded-xl transition-all ${
                    form.type === 'catering'
                      ? 'bg-espresso-900 text-white shadow-soft'
                      : 'text-warmgray-600 hover:text-espresso-900'
                  }`}
                >
                  Events / Catering
                </button>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, type: 'inquiry' })}
                  className={`py-2 rounded-xl transition-all ${
                    form.type === 'inquiry'
                      ? 'bg-espresso-900 text-white shadow-soft'
                      : 'text-warmgray-600 hover:text-espresso-900'
                  }`}
                >
                  General Message
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Your Full Name"
                  placeholder="e.g. Pooja Iyer"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
                <Input
                  label="Contact Phone"
                  placeholder="+91 98450 00000"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required
                />
              </div>

              <Input
                label="Email Address"
                type="email"
                placeholder="pooja@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />

              {form.type === 'reservation' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Input
                    label="Guests"
                    type="number"
                    min="1"
                    max="20"
                    value={form.guests}
                    onChange={(e) => setForm({ ...form, guests: e.target.value })}
                  />
                  <Input
                    label="Date"
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                  />
                  <Input
                    label="Preferred Time"
                    type="time"
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                  />
                </div>
              )}

              <Textarea
                label="Special Requests or Questions"
                rows={3}
                placeholder="Any dietary requirements, birthday celebration notes, or corner table preference..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
                icon={Send}
                iconPosition="right"
              >
                {isSubmitting ? 'Sending Request...' : 'Submit Request'}
              </Button>
            </form>
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="pt-16 max-w-4xl mx-auto">
          <SectionHeading
            subtitle="Common Questions"
            title="Frequently Asked Questions"
            description="Everything you need to know about visiting, reservations, and specialty beans."
          />

          <div className="space-y-3">
            {CAFE_INFO.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-cream-200/90 shadow-soft overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif font-semibold text-espresso-900 text-sm sm:text-base hover:text-coffee-600 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-warmgray-400 shrink-0 transform transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-coffee-600' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-warmgray-600 leading-relaxed border-t border-cream-100">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
