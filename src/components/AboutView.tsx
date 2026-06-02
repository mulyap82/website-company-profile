import { motion } from 'motion/react';
import { Phone, Mail, MapPin, ExternalLink } from 'lucide-react';
import { testimonials } from '../types';

import logoAlIrsyad from '../assets/images/alirsyad_logo.png';
import logoUnsoed from '../assets/images/Logo-UNSOED.png';
import logoRsop from '../assets/images/RSOP-PARIPURNA-LOGO_copu.png';
import logoTup from '../assets/images/Logo-TUP.png';
import snackBoxImage from '../assets/images/snack_box_premium_1780047171046.png';

interface AboutViewProps {
  openOrderModal: () => void;
}

export default function AboutView({ openOrderModal }: AboutViewProps) {
  // Real uploaded client/partner logos
  const clientLogos = [
    {
      id: 'al-irsyad',
      name: 'SDIT Al Irsyad Al Islamiyyah Purwokerto',
      logo: (
        <img
          src={logoAlIrsyad}
          alt="Logo SDIT Al Irsyad Al Islamiyyah Purwokerto"
          className="h-20 sm:h-24 md:h-28 lg:h-32 w-auto object-contain transform hover:scale-105 transition duration-300 drop-shadow-md"
        />
      )
    },
    {
      id: 'unsoed',
      name: 'Universitas Jenderal Soedirman',
      logo: (
        <img
          src={logoUnsoed}
          alt="Logo Universitas Jenderal Soedirman"
          className="h-20 sm:h-24 md:h-28 lg:h-32 w-auto object-contain transform hover:scale-105 transition duration-300 drop-shadow-md"
        />
      )
    },
    {
      id: 'rsop',
      name: 'Rumah Sakit Orthopaedi Purwokerto',
      logo: (
        <img
          src={logoRsop}
          alt="Logo Rumah Sakit Orthopaedi Purwokerto"
          className="h-20 sm:h-24 md:h-28 lg:h-32 w-auto object-contain transform hover:scale-105 transition duration-300 drop-shadow-md"
        />
      )
    },
    {
      id: 'telkom',
      name: 'Telkom University Purwokerto',
      logo: (
        <img
          src={logoTup}
          alt="Logo Telkom University Purwokerto"
          className="h-20 sm:h-24 md:h-28 lg:h-32 w-auto object-contain transform hover:scale-105 transition duration-300 drop-shadow-md"
        />
      )
    }
  ];

  return (
    <div className="w-full" id="about-view-container">
      {/* SECTION 1: ABOUT DETAILS (SPLIT IMAGE & COPY WITH RED CALLOUT) */}
      <section className="bg-white py-16 px-4 md:px-8 max-w-7xl mx-auto" id="about-details">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Block - Image */}
          <motion.div 
            className="w-full rounded-2xl overflow-hidden shadow-xl border border-neutral-100 aspect-4/3"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={snackBoxImage}
              alt="Snack Box Premium Dapure Cakra"
              className="w-full h-full object-cover hover:scale-102 transition duration-500"
            />
          </motion.div>

          {/* Right Block - Copy Info & Maroon Card */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="font-serif text-3xl md:text-4.5xl font-black text-[#1A1A1A] leading-tight">
              Hidangan Terbaik untuk Setiap Momen
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-gray-700 leading-relaxed font-sans">
              <p>
                Dapure Cakra hadir dengan komitmen menghadirkan hidangan berkualitas yang menggabungkan cita rasa rumahan dengan standar pelayanan terbaik. Kami percaya bahwa setiap sajian bukan hanya tentang rasa, tetapi juga tentang pengalaman yang berkesan.
              </p>
              <p>
                Di Dapure Cakra, kami tidak hanya menyajikan makanan, tetapi juga menghadirkan kehangatan dalam setiap hidangan. Dengan bahan pilihan, proses yang higienis, dan pelayanan yang ramah, kami siap menjadi bagian dari setiap momen spesial Anda.
              </p>
            </div>

            {/* MAROON BOOKING CALLOUT */}
            <div className="bg-[#9B2C2C] text-white p-6 rounded-2xl shadow-lg space-y-4" id="about-maroon-callout">
              <span className="text-lg font-serif font-bold block pb-1 border-b border-white/20">
                Ayo Pesan Sekarang!
              </span>
              
              <ul className="space-y-3.5 text-sm sm:text-base" id="about-contact-list">
                <li className="flex items-center gap-3">
                  <a href="tel:085747273415" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition flex items-center justify-center shrink-0">
                    <Phone size={16} className="text-red-100" />
                  </a>
                  <a href="tel:085747273415" className="hover:underline hover:text-red-100 font-semibold">
                    085747273415
                  </a>
                </li>

                <li className="flex items-center gap-3">
                  <a href="mailto:dapurecakra.pwt@gmail.com" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition flex items-center justify-center shrink-0">
                    <Mail size={16} className="text-red-100" />
                  </a>
                  <a href="mailto:dapurecakra.pwt@gmail.com" className="hover:underline hover:text-red-100 max-w-xs truncate font-semibold">
                    dapurecakra.pwt@gmail.com
                  </a>
                </li>

                <li className="flex items-start gap-3">
                  <div className="p-2 bg-white/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin size={16} className="text-red-100" />
                  </div>
                  <span className="text-gray-100 leading-relaxed font-sans text-xs sm:text-sm">
                    Gg. Guyub, Purwokerto Wetan, Kec. Purwokerto Tim., Kabupaten Banyumas, Jawa Tengah 53111
                  </span>
                </li>
              </ul>

              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <button
                  onClick={openOrderModal}
                  className="w-full py-2.5 bg-white text-[#9B2C2C] text-sm font-bold rounded-lg hover:bg-red-50 transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  Buat Pesanan
                </button>
                <a
                  href="https://maps.google.com/?q=Gg.+Guyub,+Purwokerto+Wetan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 border border-white/40 text-white text-sm font-bold rounded-lg hover:bg-white/10 transition flex items-center justify-center gap-1.5"
                >
                  <ExternalLink size={14} />
                  Buka Google Maps
                </a>
              </div>
            </div>

          </motion.div>
        </div>
      </section>

      {/* SECTION 2: TRUSTED MILESTONE (DARK GREEN SOCIAL PROOF SECTION) */}
      <section className="bg-[#0b3c1b] text-white py-16 px-4 md:px-8 w-full block" id="trusted-milestone">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          
          <div className="space-y-2">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Sudah terjual <span className="text-yellow-400">10.000+</span> box.
            </h2>
            <p className="text-sm sm:text-base text-emerald-100 opacity-90 tracking-wide font-sans">
              Terima kasih Untuk Kepercayaan Anda Selama Ini.
            </p>
          </div>

          {/* Flex wrap/grid layout replicating the logo images shown */}
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-14 pt-4 px-4 bg-[#093216]/55 py-10 rounded-3xl border border-emerald-800" id="client-logos-pills">
            {clientLogos.map((client) => (
              <div key={client.id} className="text-white hover:text-yellow-400 transition" title={client.name}>
                {client.logo}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 3: KATA MEREKA TESTIMONIALS */}
      <section className="bg-[#FBFAF8] py-20 px-4 md:px-8 w-full" id="about-testimonials">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="font-serif text-3xl md:text-4.5xl font-black text-[#1A1A1A] tracking-tight">Kata Mereka</h2>
            <p className="text-sm sm:text-base text-gray-500 max-w-md mx-auto">
              Kesaksian tulus dari sahabat institusi, medis, akademisi, dan pendidik di Purwokerto yang mempercayakan kuliner bento boksnya pada kami.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="about-testi-grid">
            {testimonials.map((testi, idx) => (
              <motion.div
                key={testi.id}
                className="bg-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-md border border-neutral-100 hover:-translate-y-1 transition duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
              >
                <div className="space-y-3">
                  <span className="text-base sm:text-lg font-bold text-red-600 block">
                    &ldquo;{testi.quote}&rdquo;
                  </span>
                  <p className="text-sm text-gray-750 leading-relaxed font-sans font-medium">
                    {testi.message}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-150">
                  <div>
                    <span className="text-sm sm:text-base font-bold text-gray-900 block">{testi.name}</span>
                    <span className="text-xs text-gray-500 block font-mono font-bold">{testi.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
