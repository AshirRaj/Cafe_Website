import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Calendar, Clock, Users, MapPin, Sparkles } from 'lucide-react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { CAFE_INFO } from '../../data/cafeInfo';

export const ReservationConfirmationModal = ({
  isOpen,
  onClose,
  reservation,
}) => {
  if (!reservation) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-md">
      <div className="text-center space-y-4 pt-2">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-16 h-16 rounded-full bg-sage-100 text-sage-700 flex items-center justify-center mx-auto border-2 border-sage-500/30 shadow-soft"
        >
          <CheckCircle2 className="w-8 h-8" />
        </motion.div>

        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-sage-700">
            Booking Confirmed
          </span>
          <h3 className="text-2xl font-serif font-bold text-espresso-900 mt-0.5">
            Table Reserved!
          </h3>
          <p className="text-xs text-warmgray-500 mt-1">
            Reference ID: <strong className="text-espresso-900 font-mono">{reservation.reservationId}</strong>
          </p>
        </div>

        {/* Details Box */}
        <div className="bg-cream-50 rounded-2xl p-4 border border-cream-200 text-xs space-y-2.5 text-left">
          <div className="flex items-center justify-between">
            <span className="text-warmgray-500">Guest Name:</span>
            <span className="font-semibold text-espresso-900">{reservation.name}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-warmgray-500 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-coffee-600" /> Date:
            </span>
            <span className="font-semibold text-espresso-900">{reservation.date}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-warmgray-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-coffee-600" /> Time Slot:
            </span>
            <span className="font-semibold text-espresso-900">{reservation.timeSlot}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-warmgray-500 flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-coffee-600" /> Party Size:
            </span>
            <span className="font-semibold text-espresso-900">{reservation.guests} Guests</span>
          </div>
          {reservation.occasion && (
            <div className="flex items-center justify-between">
              <span className="text-warmgray-500">Occasion:</span>
              <span className="font-semibold text-espresso-900">{reservation.occasion}</span>
            </div>
          )}
        </div>

        {/* Location snippet */}
        <div className="text-[11px] text-warmgray-500 flex items-center justify-center gap-1.5 pt-1">
          <MapPin className="w-3.5 h-3.5 text-terracotta-500 shrink-0" />
          <span>{CAFE_INFO.address.street}, {CAFE_INFO.address.area}</span>
        </div>

        <div className="pt-3">
          <Button variant="primary" size="md" className="w-full" onClick={onClose}>
            Done & Return to Café
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ReservationConfirmationModal;
