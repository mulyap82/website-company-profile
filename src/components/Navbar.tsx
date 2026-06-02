import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import logoDapureCakra from '../assets/images/logo dapure cakra .png';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openOrderModal: () => void;
}

export default function Navbar({ activeTab, setActiveTab, openOrderModal }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const tabs = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'tentang-kami', label: 'Tentang Kami' },
    { id: 'menu', label: 'Menu' },
    { id: 'kontak', label: 'Kontak' },
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsOpen(false);
  };

  return (
    <header className="w-full flex flex-col z-50 bg-white shadow-sm sticky top-0" id="app-header">
      {/* Main Bar */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between" id="main-navbar">
        {/* Brand Logo */}
        <button 
          onClick={() => handleTabClick('beranda')}
          className="flex items-center gap-3 group focus:outline-none text-left"
          id="brand-logo"
        >
          <img 
            src={logoDapureCakra} 
            alt="Dapure Cakra Logo" 
            className="h-10 sm:h-12 w-auto object-contain group-hover:scale-105 transition-transform"
          />
          <div>
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#1A1A1A] block">
              Dapure Cakra
            </span>
          </div>
        </button>

        {/* Desktop Navigation Items */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`nav-${tab.id}`}
                onClick={() => handleTabClick(tab.id)}
                className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-full cursor-pointer transition-all ${
                  isActive
                    ? 'bg-[#E7E2DB] text-neutral-800 shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
          <button 
            onClick={openOrderModal}
            className="ml-2 px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-full bg-red-600 text-white shadow hover:bg-red-700 transition"
          >
            Pesan
          </button>
        </nav>

        {/* Mobile controls (hamburger toggle and immediate order call-to-action) */}
        <div className="flex md:hidden items-center gap-2">
          <button 
            onClick={openOrderModal}
            className="px-3 py-1.5 text-xs font-semibold rounded-full bg-red-600 text-white shadow hover:bg-red-700 transition"
          >
            Pesan
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 rounded-lg text-neutral-600 hover:text-neutral-950 focus:outline-none border border-neutral-200"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu block */}
      {isOpen && (
        <div className="md:hidden w-full bg-white border-t border-neutral-100 py-2 px-4 flex flex-col gap-1 shadow-inner">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#E7E2DB] text-neutral-900 font-bold'
                    : 'text-neutral-600 hover:bg-neutral-50'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
