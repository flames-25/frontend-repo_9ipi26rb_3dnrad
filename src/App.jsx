import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TemplateGallery from './components/TemplateGallery';
import HowItWorks from './components/HowItWorks';
import Builder from './components/Builder';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header />
      <main>
        <Hero />
        <TemplateGallery />
        <HowItWorks />
        <Builder />
      </main>
      <Footer />
    </div>
  );
}

export default App;
