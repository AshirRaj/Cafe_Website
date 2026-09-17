import React from 'react';
import HeroSection from './HeroSection';
import QuickCategories from './QuickCategories';
import PopularPicks from './PopularPicks';
import AboutSnippet from './AboutSnippet';
import ExperienceSection from './ExperienceSection';
import SpecialPromoSection from './SpecialPromoSection';
import HowItWorks from './HowItWorks';
import TestimonialsSection from './TestimonialsSection';
import LocationContactSection from './LocationContactSection';
import FinalCTASection from './FinalCTASection';

export const HomePage = () => {
  return (
    <div className="flex flex-col">
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Quick Menu / Categories */}
      <QuickCategories />

      {/* 3. Popular Customer Favorites */}
      <PopularPicks />

      {/* 4. About Story & Numbers */}
      <AboutSnippet />

      {/* 5. The Café Experience */}
      <ExperienceSection />

      {/* 6. Special Promotional Offer Banner */}
      <SpecialPromoSection />

      {/* 7. How Ordering Works */}
      <HowItWorks />

      {/* 8. Customer Testimonials */}
      <TestimonialsSection />

      {/* 9. Location & Contact Info */}
      <LocationContactSection />

      {/* 10. Final Call to Action */}
      <FinalCTASection />
    </div>
  );
};

export default HomePage;
