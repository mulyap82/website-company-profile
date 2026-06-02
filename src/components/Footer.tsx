import { Phone, Mail, Instagram, Send } from 'lucide-react';
import logoDapureCakra from '../assets/images/logo dapure cakra .png';
import snackBoxImage from '../assets/images/snack_box_premium_1780047171046.png';
import nasiBoxImage from '../assets/images/nasi_box_premium_1780046604005.png';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  openOrderModal: () => void;
}

export default function Footer({ setActiveTab, openOrderModal }: FooterProps) {
  const instagramPhotos = [
    {
      id: 'ig-1',
      url: snackBoxImage,
      alt: 'Snack Box Premium Dapure Cakra'
    },
    {
      id: 'ig-2',
      url: nasiBoxImage,
      alt: 'Nasi Box Premium Dapure Cakra'
    }
  ];

  return (
    <footer className="bg-[#0b3c1b] text-white pt-16 pb-8 border-t border-[#093015]" id="app-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-12" id="footer-grid">
        {/* Left column - Brand info */}
        <div className="md:col-span-5 flex flex-col gap-6" id="footer-col-brand">
          <div className="flex items-center gap-3">
            <img 
              src={logoDapureCakra} 
              alt="Dapure Cakra Logo" 
              className="h-12 w-auto object-contain bg-white p-1 rounded-lg"
            />
            <span className="font-serif text-2xl font-bold tracking-tight">Dapure Cakra</span>
          </div>
          <p className="text-emerald-100 text-sm leading-relaxed max-w-sm">
            Menyajikan hidangan berkualitas dengan cita rasa autentik untuk melengkapi setiap momen spesial Anda.
          </p>
          {/* Social Icons inside small red circles */}
          <div className="flex items-center gap-3 mt-2" id="footer-social-links">
            <a href="https://www.instagram.com/dapurecakra.pwt/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition font-bold" aria-label="Instagram">
              <Instagram size={14} />
            </a>
            <a href="https://wa.me/6285747273415" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition animate-pulse font-bold" aria-label="WhatsApp">
              <Send size={13} className="rotate-45" />
            </a>
          </div>
        </div>

        {/* Middle column - Pages list */}
        <div className="md:col-span-3 flex flex-col gap-6" id="footer-col-pages">
          <h3 className="text-lg font-serif font-semibold text-emerald-300">Pages</h3>
          <ul className="flex flex-col gap-3 text-sm text-emerald-100">
            <li>
              <button onClick={() => setActiveTab('beranda')} className="hover:text-white transition cursor-pointer">
                Beranda
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('tentang-kami')} className="hover:text-white transition cursor-pointer">
                Tentang Kami
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('menu')} className="hover:text-white transition cursor-pointer">
                Menu
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('kontak')} className="hover:text-white transition cursor-pointer">
                Kontak
              </button>
            </li>
            <li>
              <button onClick={openOrderModal} className="hover:text-white transition cursor-pointer text-yellow-400 font-medium">
                Pesan Antar
              </button>
            </li>
          </ul>
        </div>

        {/* Right column - Instagram grid */}
        <div className="md:col-span-4 flex flex-col gap-6" id="footer-col-instagram">
          <h3 className="text-lg font-serif font-semibold text-emerald-300">Ikuti Kami di Instagram</h3>
          <div className="grid grid-cols-2 gap-2" id="instagram-grid">
            {instagramPhotos.map((photo) => (
              <div key={photo.id} className="relative aspect-square rounded overflow-hidden group">
                <img
                  src={photo.url}
                  alt={photo.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-[#0b3c1b]/30 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                  <Instagram size={18} className="text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-[#093015] text-center" id="footer-copyright">
        <p className="text-xs text-emerald-200/60 leading-relaxed font-sans">
          Copyright © 2026 Digital Bussines Telkom University Purwokerto. All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
