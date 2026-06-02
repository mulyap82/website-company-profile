import { motion } from 'motion/react';

interface HeroProps {
  onPesanSekarang: () => void;
  onLihatMenu: () => void;
}

export default function Hero({ onPesanSekarang, onLihatMenu }: HeroProps) {
  return (
    <section className="relative w-full min-h-[500px] md:min-h-[600px] bg-neutral-100 flex items-center justify-center overflow-hidden py-16 px-4" id="hero-section">
      {/* Background image matching the lemony, fresh ingredients of Image 1 */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1600&auto=format&fit=crop"
          alt="Dapure Cakra Gourmet Background"
          className="w-full h-full object-cover scale-102 filter brightness-[0.93] contrast-[0.98]"
          referrerPolicy="no-referrer"
        />
        {/* Soft elegant white/translucent radial gradient overlay for text readability but keeping the bright fresh look */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/45 to-white/70" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-7" id="hero-content">
        {/* Animated Headline in custom Lora font */}
        <motion.h1 
          className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1A1A] leading-[1.15] tracking-tight max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          “Dari Dapur Kami, <span className="text-[#9B2C2C]">untuk</span> Kebahagiaan Anda”
        </motion.h1>

        {/* Subtitle list */}
        <motion.p 
          className="text-sm md:text-base text-gray-800 font-sans max-w-xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Menyajikan hidangan berkualitas dengan cita rasa autentik untuk melengkapi setiap momen spesial Anda
        </motion.p>

        {/* Buttons */}
        <motion.div 
          className="flex flex-row items-center justify-center gap-4 pt-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <button
            onClick={onPesanSekarang}
            className="px-6 md:px-8 py-3 rounded-full bg-red-600 font-semibold text-white text-xs md:text-sm hover:bg-red-700 active:scale-95 transition-all shadow-md hover:shadow-lg cursor-pointer"
            id="hero-pesan-sekarang"
          >
            Pesan Sekarang
          </button>
          
          <button
            onClick={onLihatMenu}
            className="px-6 md:px-8 py-3 rounded-full border border-neutral-800 bg-transparent text-neutral-800 font-semibold text-xs md:text-sm hover:bg-neutral-900 hover:text-white active:scale-95 transition-all cursor-pointer"
            id="hero-lihat-menu"
          >
            Lihat Menu
          </button>
        </motion.div>
      </div>
    </section>
  );
}
