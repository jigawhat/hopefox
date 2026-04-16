import React from 'react';
import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import QuoteBanner from '../components/home/QuoteBanner';
import CrisisBanner from '../components/home/CrisisBanner';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <QuoteBanner />
      <CrisisBanner />
    </div>
  );
}