import React, { useState } from 'react';
import { HeroSection } from '../components/HeroSection';
import { StyleStatementSection } from '../components/StyleStatementSection';
import { ExclusivePerfumesSection } from '../components/ExclusivePerfumesSection';
import { CategoryShowcase } from '../components/CategoryShowcase';
import { ScentNotesExplorer } from '../components/ScentNotesExplorer';
import { Shop } from './Shop';
import { Collections } from './Collections';
import { CraftsmanshipStrip } from '../components/CraftsmanshipStrip';
import { About } from './About';
import { PressAndJournal } from '../components/PressAndJournal';
import { FAQSection } from '../components/FAQSection';
import { Contact } from './Contact';
import { FinalCtaBanner } from '../components/FinalCtaBanner';
import { Product } from '../data/siteData';
import { SEO } from '../components/SEO';

interface HomeProps {
  onQuickView: (product: Product) => void;
  onFindInStore: (product: Product) => void;
  onOpenStoreLocator: () => void;
  onOpenScentVibeQuiz?: () => void;
}

export const Home: React.FC<HomeProps> = ({
  onQuickView,
  onFindInStore,
  onOpenStoreLocator,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const handleSelectCategory = (cat: string) => {
    setSelectedCategory(cat);
  };

  return (
    <div className="w-full bg-[#FAF2E1]">
      <SEO
        title="Avelore | Luxury Perfumes, Body, Home & Beauty"
        description="Avelore is an independent luxury fragrance house crafting artisanal perfumes, body and bath care, botanical beauty, and home scents with rare Grasse harvests."
        canonicalPath="/"
      />

      {/* 1. Hero Interactive Stage (Responsive Mobile, Tablet & Desktop) */}
      <HeroSection
        onQuickView={onQuickView}
        onSelectCategory={handleSelectCategory}
      />

      {/* 1.5. Crawlable Introduction Section */}
      <section className="relative py-12 sm:py-20 bg-[#FAF2E1] border-b border-[#3B0000]/10" aria-label="About Avelore Fragrance House">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-[#7E4A4A] font-display font-bold block mb-3">
            The Olfactory Manifesto
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-[#3B0000] tracking-tight mb-5 sm:mb-6">
            Fine fragrance, body rituals &amp; botanical beauty <span className="font-serif italic font-normal text-[#7E4A4A]">composed with intention.</span>
          </h2>
          <p className="text-sm sm:text-lg text-[#3B0000]/80 font-sans leading-relaxed text-pretty">
            Avelore is an independent luxury fragrance house founded at the intersection of French botanical heritage and contemporary artistic perfumery. We compose artisanal fine fragrance, nourishing body &amp; bath rituals, evocative scented candles, and clean botanical cosmetics from single-estate harvests. Every formulation pairs rare natural extracts—from Grasse centifolia roses to wild Peloponnese sage and aged amber resins—with meticulous maceration in French oak. Free from fleeting trends and synthetic fillers, our scents possess enduring presence and quiet intimacy designed to become your personal signature.
          </p>
        </div>
      </section>

      {/* 2. Style Statement & Philosophy */}
      <StyleStatementSection />

      {/* 3. EXCLUSIVE PERFUMES */}
      <div id="exclusive-perfumes">
        <ExclusivePerfumesSection
          onQuickView={onQuickView}
          onFindInStore={onFindInStore}
        />
      </div>

      {/* 4. Category Showcase Disciplines */}
      <CategoryShowcase onSelectCategory={handleSelectCategory} />

      {/* 5. Interactive Scent Notes Pyramid */}
      <div id="scent-pyramid">
        <ScentNotesExplorer onQuickView={onQuickView} />
      </div>

      {/* 6. Catalogue & Formulations Sections */}
      <Shop
        onQuickView={onQuickView}
        onFindInStore={onFindInStore}
        initialCategory={selectedCategory}
      />

      {/* 7. Four Collection Chapters */}
      <Collections
        onQuickView={onQuickView}
        onFindInStore={onFindInStore}
      />

      {/* 8. Craftsmanship Marquee & Stats Strip */}
      <CraftsmanshipStrip />

      {/* 9. Atelier History, Chronology & Terroir Ethics */}
      <About onOpenStoreLocator={onOpenStoreLocator} />

      {/* 10. Critical Reception & Journal Chronicles */}
      <PressAndJournal />

      {/* 10.5. Dedicated FAQs Section */}
      <FAQSection />

      {/* 11. Concierge Form & Flagship Salons */}
      <Contact onOpenStoreLocator={onOpenStoreLocator} />

      {/* 12. Final Brand Invitation Banner */}
      <FinalCtaBanner onOpenStoreLocator={onOpenStoreLocator} />
    </div>
  );
};
