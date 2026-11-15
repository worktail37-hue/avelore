import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, MapPin, Menu, X, Sparkles, User, ShoppingBag, MessageSquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { scrollToSection } from '../utils/scrollHelper';

interface NavbarProps {
  onOpenStoreLocator: () => void;
  onOpenSearch: () => void;
  onOpenConcierge?: () => void;
  onOpenProfile: () => void;
  onOpenScentMatch?: () => void;
  onOpenScentVibe?: () => void;
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenStoreLocator,
  onOpenSearch,
  onOpenConcierge,
  onOpenProfile,
  onOpenScentMatch,
  onOpenScentVibe,
  activeSection = 'home',
}) => {
  const { user, profile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState(activeSection);

  useEffect(() => {
    const handleScroll = () => {
      // ScrollSpy for single-page sections without layout shifts
      const sections = ['home', 'hero', 'exclusive-perfumes', 'shop', 'collections', 'scent-pyramid', 'about', 'faqs', 'contact'];
      for (const sectionId of sections.slice().reverse()) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            setCurrentSection(sectionId === 'hero' ? 'home' : sectionId);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();

    if (location.pathname === '/') {
      scrollToSection(targetId);
      window.history.pushState(null, '', `/#${targetId}`);
    } else {
      navigate(`/#${targetId}`);
      setTimeout(() => {
        scrollToSection(targetId);
      }, 120);
    }
  };

  const handleTriggerScentVibe = () => {
    if (onOpenScentVibe) {
      onOpenScentVibe();
    } else if (onOpenScentMatch) {
      onOpenScentMatch();
    }
  };

  // Primary desktop central navigation items
  const navLinks = [
    { name: 'Home', targetId: 'home', path: '/#home' },
    { name: 'Shop', targetId: 'shop', path: '/#shop' },
    { name: 'Collections', targetId: 'collections', path: '/#collections' },
    { name: 'About', targetId: 'about', path: '/#about' },
    { name: 'FAQs', targetId: 'faqs', path: '/#faqs' },
    { name: 'Contact', targetId: 'contact', path: '/#contact' },
  ];

  // Extended mobile & tablet drawer links so every single section is directly reachable
  const mobileDrawerLinks = [
    { name: 'Home', targetId: 'home', subtitle: 'The House of Avelore' },
    { name: 'Reserve Extraits', targetId: 'exclusive-perfumes', subtitle: '8 Numbered Extraits' },
    { name: 'Shop Catalogue', targetId: 'shop', subtitle: 'All 40 Formulations' },
    { name: 'Collections', targetId: 'collections', subtitle: '4 Curated Chapters' },
    { name: 'Scent Architecture', targetId: 'scent-pyramid', subtitle: 'Top · Heart · Base Notes' },
    { name: 'Atelier & Terroir', targetId: 'about', subtitle: 'Grasse Craftsmanship' },
    { name: 'Clientele FAQs', targetId: 'faqs', subtitle: 'Care & Maceration' },
    { name: 'Concierge & Salons', targetId: 'contact', subtitle: 'Appointments & Inquiries' },
  ];

  return (
    <>
      {/* Centralized, uniform, fixed navbar across Mobile, Tablet, and Desktop */}
      <header className="fixed top-0 left-0 right-0 z-40 h-16 sm:h-20 w-full bg-[#FAF2E1]/95 backdrop-blur-md border-b border-[#3B0000]/10 shadow-[0_4px_20px_rgba(59,0,0,0.03)] text-[#3B0000]">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2">
          
          {/* Zone 1: Brand Wordmark (Left Anchor) */}
          <div className="flex items-center shrink-0 z-10">
            <Link
              to="/"
              onClick={(e) => handleNavClick(e, 'home')}
              className="flex items-center gap-1.5 sm:gap-2 text-lg sm:text-xl md:text-2xl font-display tracking-widest whitespace-nowrap transition-colors group cursor-pointer text-[#3B0000] hover:text-[#520909]"
              aria-label="Avelore Haute Parfumerie - Home"
            >
              <span className="font-extrabold tracking-[0.2em] sm:tracking-[0.22em]">AVELORE</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#3B0000] transition-transform duration-300 group-hover:scale-125" />
            </Link>
          </div>

          {/* Zone 2: Navigation Links Container on Desktop */}
          <div className="hidden lg:flex flex-grow justify-center items-center px-4">
            <nav
              aria-label="Primary navigation"
              className="flex items-center justify-center gap-4 xl:gap-7 text-xs font-bold uppercase tracking-[0.14em] font-display"
            >
              {navLinks.map((link) => {
                const isCurrent =
                  (location.pathname === '/' && currentSection === link.targetId) ||
                  (location.pathname === link.path);

                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={(e) => handleNavClick(e, link.targetId)}
                    className={`relative py-1.5 px-1.5 transition-colors whitespace-nowrap cursor-pointer ${
                      isCurrent
                        ? 'text-[#3B0000]'
                        : 'text-[#3B0000]/65 hover:text-[#3B0000]'
                    }`}
                  >
                    <span className="whitespace-nowrap">{link.name}</span>
                    <span
                      className={`absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-[#3B0000] transition-all duration-200 ${
                        isCurrent ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Zone 3: Actions (Right Anchor) */}
          <div className="flex items-center justify-end gap-1.5 sm:gap-2.5 shrink-0 z-10">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 sm:p-2.5 rounded-full text-[#3B0000] hover:bg-[#3B0000]/10 transition-colors cursor-pointer shrink-0"
              aria-label="Search catalog"
              title="Search fragrances & formulations"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* SCENT VIBE Interface Trigger */}
            <button
              onClick={handleTriggerScentVibe}
              className="group flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-full bg-[#3B0000] text-[#FFD482] hover:bg-[#520909] border border-[#FFD482]/30 shadow-xs hover:shadow-sm active:scale-95 transition-all cursor-pointer text-[11px] sm:text-xs font-display font-bold uppercase tracking-wider shrink-0"
              title="Open Scent Vibe Harmonizer Interface"
              aria-label="Open Scent Vibe Harmonizer Interface"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FFD482] animate-pulse shrink-0" />
              <span>Scent Vibe</span>
            </button>

            {/* Boutiques Locator */}
            <button
              onClick={onOpenStoreLocator}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#3B0000]/20 text-[#3B0000] hover:bg-[#3B0000] hover:text-[#FFD482] hover:border-[#3B0000] transition-all cursor-pointer text-xs font-semibold whitespace-nowrap"
              title="Locate Avelore flagship boutiques"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Boutiques</span>
            </button>

            {/* Patron Profile / Sign In */}
            <button
              onClick={onOpenProfile}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all cursor-pointer text-xs font-semibold whitespace-nowrap ${
                user
                  ? 'bg-[#3B0000] text-[#FFD482] border-[#3B0000]'
                  : 'text-[#3B0000] border-[#3B0000]/20 hover:bg-[#3B0000]/5'
              }`}
              title={user ? `Signed in as ${user.displayName || user.email}` : 'Sign in to Patron Salon'}
            >
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'Patron'}
                  className="w-4 h-4 rounded-full object-cover"
                />
              ) : (
                <User className="w-3.5 h-3.5" />
              )}
              <span>
                {user ? user.displayName?.split(' ')[0] || 'Patron' : 'Patron'}
              </span>
              {profile && profile.favoriteProductIds && profile.favoriteProductIds.length > 0 && (
                <span className="w-4 h-4 rounded-full text-[10px] font-bold bg-[#FFD482] text-[#3B0000] flex items-center justify-center">
                  {profile.favoriteProductIds.length}
                </span>
              )}
            </button>

            {/* Mobile / Tablet Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full text-[#3B0000] hover:bg-[#3B0000]/10 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Scrollable Full-Screen Mobile & Tablet Drawer in Signature Burnt Merlot */}
      <div
        className={`fixed inset-0 z-50 bg-[#3B0000] text-[#FFD482] transition-all duration-300 ease-in-out lg:hidden flex flex-col justify-between overflow-y-auto p-6 sm:p-10 ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-[#FFD482]/20 pb-4 shrink-0">
          <Link
            to="/"
            onClick={(e) => {
              setMobileMenuOpen(false);
              handleNavClick(e, 'home');
            }}
            className="text-xl sm:text-2xl font-display font-extrabold tracking-widest text-[#FFD482]"
          >
            AVELORE
          </Link>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 rounded-full text-[#FFD482]/80 hover:text-[#FFD482] cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Drawer Navigation Links (All 8 key sections) */}
        <nav aria-label="Mobile navigation" className="flex flex-col gap-3 py-5 my-auto">
          {mobileDrawerLinks.map((link, idx) => (
            <button
              key={link.targetId}
              type="button"
              onClick={(e) => {
                setMobileMenuOpen(false);
                handleNavClick(e, link.targetId);
              }}
              className="group flex items-center justify-between py-1.5 border-b border-[#FFD482]/10 text-left cursor-pointer"
            >
              <div>
                <div className="text-lg sm:text-xl font-display font-bold text-[#FFD482] group-hover:text-white transition-colors">
                  {link.name}
                </div>
                <div className="text-[11px] font-sans text-[#FFD482]/60">
                  {link.subtitle}
                </div>
              </div>
              <span className="text-xs font-mono tracking-widest text-[#FFD482]/40">
                0{idx + 1}
              </span>
            </button>
          ))}
        </nav>

        {/* Drawer Footer Actions */}
        <div className="border-t border-[#FFD482]/20 pt-4 flex flex-col gap-2.5 shrink-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                handleTriggerScentVibe();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#FFD482] rounded-full text-xs font-bold text-[#3B0000] uppercase tracking-wider cursor-pointer shadow-md hover:bg-white transition-colors"
            >
              <Sparkles className="w-4 h-4 text-[#3B0000]" />
              <span>Scent Vibe Atelier</span>
            </button>

            {onOpenConcierge && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConcierge();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#520909] border border-[#FFD482]/40 rounded-full text-xs font-bold text-[#FFD482] uppercase tracking-wider cursor-pointer hover:bg-[#FFD482] hover:text-[#3B0000] transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Consult The Nose</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenProfile();
              }}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-[#FAF2E1] rounded-full text-[11px] font-bold text-[#3B0000] uppercase tracking-wider cursor-pointer shadow-sm hover:bg-white transition-colors"
            >
              <User className="w-3.5 h-3.5 text-[#3B0000]" />
              <span className="truncate">{user ? user.displayName?.split(' ')[0] || 'Patron' : 'Patron Salon'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenStoreLocator();
              }}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-[#FFD482]/15 border border-[#FFD482]/30 rounded-full text-[11px] font-bold text-[#FFD482] uppercase tracking-wider cursor-pointer hover:bg-[#FFD482]/25 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Boutiques</span>
            </button>
          </div>

          <p className="text-center text-[10px] text-[#FFD482]/50 tracking-widest font-mono uppercase pt-1">
            Grasse · Paris · Mayfair · New York · Tokyo
          </p>
        </div>
      </div>

      {/* Persistent Mobile & Tablet Bottom Quick-Action Dock (< 1024px) */}
      <nav
        aria-label="Mobile quick actions"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#3B0000]/95 backdrop-blur-md text-[#FFD482] border-t border-[#FFD482]/25 px-2 py-1.5 shadow-[0_-8px_30px_rgba(59,0,0,0.3)]"
      >
        <div className="max-w-md mx-auto grid grid-cols-5 gap-1">
          <button
            type="button"
            onClick={(e) => handleNavClick(e, 'shop')}
            className="flex flex-col items-center justify-center py-1.5 rounded-xl hover:bg-[#FFD482]/10 active:scale-95 transition-all cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-[#FFD482] mb-0.5" />
            <span className="text-[10px] font-display font-bold uppercase tracking-wider">Shop</span>
          </button>

          <button
            type="button"
            onClick={handleTriggerScentVibe}
            className="flex flex-col items-center justify-center py-1.5 rounded-xl hover:bg-[#FFD482]/10 active:scale-95 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#FFD482] mb-0.5" />
            <span className="text-[10px] font-display font-bold uppercase tracking-wider">Scent Vibe</span>
          </button>

          <button
            type="button"
            onClick={() => onOpenConcierge && onOpenConcierge()}
            className="flex flex-col items-center justify-center py-1.5 rounded-xl bg-[#FFD482] text-[#3B0000] shadow-xs active:scale-95 transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-[#3B0000] mb-0.5" />
            <span className="text-[10px] font-display font-extrabold uppercase tracking-wider">The Nose</span>
          </button>

          <button
            type="button"
            onClick={onOpenStoreLocator}
            className="flex flex-col items-center justify-center py-1.5 rounded-xl hover:bg-[#FFD482]/10 active:scale-95 transition-all cursor-pointer"
          >
            <MapPin className="w-4 h-4 text-[#FFD482] mb-0.5" />
            <span className="text-[10px] font-display font-bold uppercase tracking-wider">Boutiques</span>
          </button>

          <button
            type="button"
            onClick={onOpenProfile}
            className="relative flex flex-col items-center justify-center py-1.5 rounded-xl hover:bg-[#FFD482]/10 active:scale-95 transition-all cursor-pointer"
          >
            <User className="w-4 h-4 text-[#FFD482] mb-0.5" />
            <span className="text-[10px] font-display font-bold uppercase tracking-wider">
              {user ? user.displayName?.split(' ')[0] || 'Patron' : 'Patron'}
            </span>
            {profile && profile.favoriteProductIds && profile.favoriteProductIds.length > 0 && (
              <span className="absolute top-1 right-2.5 w-3.5 h-3.5 rounded-full text-[9px] font-bold bg-[#FFD482] text-[#3B0000] flex items-center justify-center">
                {profile.favoriteProductIds.length}
              </span>
            )}
          </button>
        </div>
      </nav>
    </>
  );
};
