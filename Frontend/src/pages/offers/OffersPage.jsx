import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tag, Copy, Check, Sparkles, Clock, ArrowRight } from 'lucide-react';
import { OFFERS } from '../../data/offers';
import { useToast } from '../../context/ToastContext';
import { useCart } from '../../context/CartContext';
import SectionHeading from '../../components/common/SectionHeading';
import Button from '../../components/common/Button';

export const OffersPage = () => {
  const { addToast } = useToast();
  const { applyPromoCode } = useCart();
  const [copiedCode, setCopiedCode] = useState('');

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    applyPromoCode(code);
    addToast(`Coupon code ${code} copied & applied to your cart!`, 'success');

    setTimeout(() => {
      setCopiedCode('');
    }, 2000);
  };

  return (
    <div className="py-10 sm:py-16 bg-cream-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <SectionHeading
          subtitle="Exclusive Privileges"
          title="Special Offers & Combos"
          description="Enjoy artisanal coffee pairings, breakfast bundles, and exclusive seasonal savings."
        />

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {OFFERS.map((offer, idx) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.35 }}
              className="bg-white rounded-3xl border border-cream-200/90 overflow-hidden shadow-soft hover:shadow-soft-lg transition-all duration-300 flex flex-col justify-between"
            >
              {/* Offer Visual Banner */}
              <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-cream-100">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso-900/80 via-espresso-900/30 to-transparent" />
                
                {/* Tag Pill */}
                <div className="absolute top-4 left-4">
                  <span className={`text-[10px] uppercase font-bold px-3 py-1 rounded-full shadow-soft ${offer.badgeColor}`}>
                    {offer.tag}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-cream-50">
                  <h3 className="text-xl sm:text-2xl font-serif font-bold leading-tight">
                    {offer.title}
                  </h3>
                </div>
              </div>

              {/* Offer Details */}
              <div className="p-6 sm:p-7 space-y-4 flex-grow flex flex-col justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-coffee-600">
                    {offer.subtitle}
                  </p>
                  <p className="text-xs text-warmgray-600 mt-2 leading-relaxed">
                    {offer.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-warmgray-500 mt-3 pt-3 border-t border-cream-100">
                    <Clock className="w-3.5 h-3.5 text-coffee-600" />
                    <span>Validity: {offer.validTill} (Min order: ₹{offer.minOrder})</span>
                  </div>
                </div>

                {/* Promo Code & Action Box */}
                <div className="pt-4 border-t border-cream-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="flex items-center justify-between sm:justify-start gap-2 bg-cream-100 px-3.5 py-2 rounded-2xl border border-cream-300 font-mono text-xs font-bold text-espresso-900">
                    <Tag className="w-4 h-4 text-coffee-600" />
                    <span>{offer.code}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant={copiedCode === offer.code ? 'secondary' : 'primary'}
                      size="sm"
                      onClick={() => handleCopyCode(offer.code)}
                      icon={copiedCode === offer.code ? Check : Copy}
                      iconPosition="left"
                    >
                      {copiedCode === offer.code ? 'Applied!' : 'Copy Code'}
                    </Button>
                    <Link to="/menu">
                      <Button variant="outline" size="sm" icon={ArrowRight} iconPosition="right">
                        Order
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OffersPage;
