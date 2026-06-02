import { motion } from 'motion/react';
import { ChefHat, Box, Cookie, Cake } from 'lucide-react';
import { services, testimonials } from '../types';

interface HomeViewProps {
  setActiveTab: (tab: string) => void;
  openOrderWithItem?: (itemId: string) => void;
}

export default function HomeView({ setActiveTab, openOrderWithItem }: HomeViewProps) {
  const menuCategoriesList = [
    {
      id: 'catering',
      title: 'Catering',
      desc: 'Layanan catering dengan pilihan menu lengkap dan cita rasa berkualitas, cocok untuk berbagai acara',
      icon: <ChefHat size={32} className="text-[#9B2C2C]" />,
    },
    {
      id: 'snack-box',
      title: 'Snack Box',
      desc: 'Snack box yang dikemas rapi, ideal untuk meeting, seminar, dan berbagai kegiatan.',
      icon: <Box size={32} className="text-[#9B2C2C]" />,
    },
    {
      id: 'pastry',
      title: 'Pastry',
      desc: 'Beragam pastry segar dengan tekstur lembut dan rasa premium, cocok sebagai teman santai.',
      icon: <Cookie size={32} className="text-[#9B2C2C]" />,
    },
    {
      id: 'cake',
      title: 'Cake',
      desc: 'Kue spesial dengan tampilan menarik dan rasa istimewa, sempurna untuk merayakan berbagai momen penting.',
      icon: <Cake size={32} className="text-[#9B2C2C]" />,
    },
  ];

  return (
    <div className="w-full flex flex-col space-y-0" id="home-view-container">
      
      {/* SECTION: MENU KAMI PREVIEW */}
      <section className="bg-white py-16 px-4 md:px-8 max-w-7xl mx-auto w-full" id="menu-kami-preview">
        <div className="text-center space-y-3 mb-12">
          <h2 className="font-serif text-3xl md:text-4.5xl font-black text-[#1A1A1A]">Menu Kami</h2>
          <p className="text-sm sm:text-base text-gray-500 max-w-lg mx-auto">
            Nikmati berbagai menu pilihan dengan cita rasa terbaik, cocok untuk segala suasana.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="menu-categories-grid">
          {menuCategoriesList.map((cat, idx) => (
            <motion.div
              key={cat.id}
              className="border border-neutral-150 rounded-2xl p-6.5 flex flex-col items-center text-center space-y-4 hover:shadow-lg hover:border-red-100 transition-all bg-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
                {cat.icon}
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-gray-900">{cat.title}</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed flex-1">
                {cat.desc}
              </p>
              <button
                onClick={() => setActiveTab('menu')}
                className="text-xs sm:text-sm font-bold text-red-600 hover:text-red-700 hover:underline pt-2 cursor-pointer inline-flex items-center gap-1.5 transition-colors"
              >
                Lihat Menu
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION: LAYANAN YANG KAMI SEDIAKAN */}
      <section className="bg-[#0b3c1b] text-white py-20 px-4 md:px-8 w-full" id="layanan-sediakan">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="space-y-3">
            <h2 className="font-serif text-3xl md:text-4.5xl font-bold tracking-tight">
              Layanan yang Kami <br />Sediakan
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="services-grid">
            {services.map((service, idx) => (
              <motion.div
                key={service.id}
                className="flex flex-col space-y-4"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="aspect-square w-full rounded-2xl overflow-hidden shadow-md">
                  <img
                     src={service.image}
                     alt={service.title}
                     className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                     referrerPolicy="no-referrer"
                  />
                </div>
                <h3 className="font-serif text-lg md:text-xl font-bold">{service.title}</h3>
                <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: KATA MEREKA TESTIMONIALS */}
      <section className="bg-[#FBFAF8] py-20 px-4 md:px-8 w-full" id="testimonials-section">
        <div className="max-w-7xl mx-auto border border-neutral-300 rounded-3xl p-6 sm:p-10 md:p-12 relative bg-white" id="testimonials-frame">
          
          {/* Decorative frame corners */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-neutral-400" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-neutral-400" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-neutral-400" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-neutral-400" />

          {/* Centered structured heading overlay in thin border box like image 1 */}
          <div className="flex justify-center -mt-12 sm:-mt-16 mb-12">
            <div className="px-8 py-2 bg-[#FBFAF8] border border-neutral-300 shadow-sm rounded-full">
              <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#1A1A1A] tracking-wide">Kata Mereka</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6" id="testimonials-card-grid">
            {testimonials.map((testi, idx) => (
              <motion.div
                key={testi.id}
                className="bg-[#F4F4F4] rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm border border-neutral-100 hover:-translate-y-1 transition duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
              >
                <div className="space-y-3">
                  <span className="text-base sm:text-lg font-bold text-red-600 block">
                    &ldquo;{testi.quote}&rdquo;
                  </span>
                  <p className="text-sm text-gray-750 leading-relaxed font-sans">
                    {testi.message}
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-gray-200">
                  <img
                    src={testi.avatar}
                    alt={testi.name}
                    className="w-10 h-10 object-cover rounded-full border border-gray-300 bg-white"
                    referrerPolicy="no-referrer"
                  />
                  <div className="overflow-hidden">
                    <span className="text-sm sm:text-base font-bold text-gray-900 block truncate">{testi.name}</span>
                    <span className="text-xs text-gray-500 block truncate font-mono">{testi.role}</span>
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
