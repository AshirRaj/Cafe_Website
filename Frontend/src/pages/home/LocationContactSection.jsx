import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Phone, Mail, ArrowUpRight, Compass } from 'lucide-react';
import { CAFE_INFO } from '../../data/cafeInfo';
import { IMAGES } from '../../assets/images/imageRegistry';
import SectionHeading from '../../components/common/SectionHeading';
import Button from '../../components/common/Button';

export const LocationContactSection = () => {
  return (
    <section className="py-16 sm:py-20 bg-cream-100/50 border-t border-cream-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="Find Your Sanctuary"
          title="Visit Us in Bhubaneswar"
          description="A warm cup and a peaceful seat are waiting for you seven days a week."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Info Card */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-8 sm:p-10 border border-cream-200/90 shadow-soft flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-serif font-bold text-espresso-900">
                Cafe Adda
              </h3>

              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-cream-100 text-coffee-600 flex items-center justify-center shrink-0 border border-cream-200">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-warmgray-500 mb-0.5">
                    Location
                  </h4>
                  <p className="text-sm font-medium text-espresso-900">
                    {CAFE_INFO.address.street}
                  </p>
                  <p className="text-xs text-warmgray-600">
                    {CAFE_INFO.address.area}, {CAFE_INFO.address.city} - {CAFE_INFO.address.pincode}
                  </p>
                  <p className="text-[11px] text-coffee-600 mt-1">
                    {CAFE_INFO.address.landmark}
                  </p>
                </div>
              </div>

              {/* Timings */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-cream-100 text-coffee-600 flex items-center justify-center shrink-0 border border-cream-200">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-warmgray-500 mb-0.5">
                    Operating Hours
                  </h4>
                  {CAFE_INFO.timings.map((t, idx) => (
                    <div key={idx} className="flex items-baseline justify-between gap-4 text-xs">
                      <span className="text-warmgray-600">{t.days}:</span>
                      <span className="font-semibold text-espresso-900">{t.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-cream-100 text-coffee-600 flex items-center justify-center shrink-0 border border-cream-200">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-warmgray-500 mb-0.5">
                    Phone & Inquiries
                  </h4>
                  <p className="text-sm font-semibold text-espresso-900">{CAFE_INFO.contact.phone}</p>
                  <p className="text-xs text-warmgray-600">{CAFE_INFO.contact.email}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-cream-200 flex flex-wrap items-center gap-3">
              <a
                href={CAFE_INFO.address.googleMapUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto"
              >
                <Button variant="primary" size="md" icon={Compass} iconPosition="left">
                  Get Directions
                </Button>
              </a>
              <Link to="/contact" className="w-full sm:w-auto">
                <Button variant="secondary" size="md">
                  Reserve a Table
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Visual Image */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-cream-200 shadow-soft relative min-h-[350px]">
            <img
              src={IMAGES.cafeExterior}
              alt="Cafe Adda Exterior"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso-900/60 via-transparent to-transparent flex items-end p-8">
              <div className="text-cream-50 space-y-1">
                <span className="text-xs uppercase font-semibold text-terracotta-300">
                  Garden Patio & Lounge Seating
                </span>
                <h4 className="text-2xl font-serif font-bold">
                  Spacious indoor & outdoor seating available
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationContactSection;
