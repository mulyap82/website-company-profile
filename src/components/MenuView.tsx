import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Star, AlertCircle } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { menuItems, MenuItem } from '../types';

interface MenuViewProps {
  openOrderWithItem: (itemId: string) => void;
}

type CategoryType = 'all' | 'nasi-box' | 'snack-box' | 'tumpeng' | 'bolen' | 'brownies';

export default function MenuView({ openOrderWithItem }: MenuViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');

  const categories = [
    { id: 'all', label: 'Semua Menu' },
    { id: 'nasi-box', label: 'Nasi Box' },
    { id: 'snack-box', label: 'Snack Box' },
    { id: 'tumpeng', label: 'Tumpeng' },
    { id: 'bolen', label: 'Bolen' },
    { id: 'brownies', label: 'Brownies' }
  ];

  // Filter menu items logic
  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price).replace('Rp', 'Rp ');
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'nasi-box': return 'Nasi Box';
      case 'snack-box': return 'Snack Box';
      case 'tumpeng': return 'Tumpeng';
      case 'bolen': return 'Bolen';
      case 'brownies': return 'Brownies';
      default: return cat;
    }
  };

  // Dedicated high-quality PDF builder mimicking corporate flyer exactly
  const downloadCatalogPDF = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageHeight = doc.internal.pageSize.height;
    let y = 50;

    const drawHeader = (pageNumber: number) => {
      // Top header banner background
      doc.setFillColor(11, 60, 27); // Deep Emerald green #0b3c1b
      doc.rect(0, 0, 210, 36, 'F');
      
      // Fine Red accent line
      doc.setFillColor(155, 44, 44); // Red Maroon #9B2C2C
      doc.rect(0, 36, 210, 2, 'F');

      // Brand Title
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(22);
      doc.text('DAPURE CAKRA', 15, 17);
      
      // Brand Slogan
      doc.setFontSize(9.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(230, 240, 230);
      doc.text('Catering Premium & Kuliner Lezat Khas Purwokerto', 15, 24);
      
      doc.setFontSize(8);
      doc.setTextColor(200, 220, 200);
      doc.text('Gg. Guyub, Purwokerto Wetan, Kec. Purwokerto Timur', 15, 30);

      // Contact detail column on right
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.text('Hubungi Pemesanan:', 195, 12, { align: 'right' });
      doc.setFont('helvetica', 'normal');
      doc.text('WA: 085747273415', 195, 17, { align: 'right' });
      doc.text('IG: @dapurecakra.pwt', 195, 22, { align: 'right' });
      doc.text('Sajian Terbaik untuk Setiap Acara Anda', 195, 27, { align: 'right' });
    };

    const drawFooter = (pageNumber: number, totalPages: number) => {
      // Draw subtle separator lines and green footer block
      doc.setFillColor(11, 60, 27); // Forest Green
      doc.rect(0, pageHeight - 14, 210, 14, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.text('Copyright © 2026 Dapure Cakra Purwokerto. All Rights Reserved.', 15, pageHeight - 6);
      doc.text(`Halaman ${pageNumber} dari ${totalPages}`, 195, pageHeight - 6, { align: 'right' });
    };

    // Draw first page header
    drawHeader(1);

    const groupOrder = ['nasi-box', 'snack-box', 'tumpeng', 'bolen', 'brownies'];
    const printGroups: Record<string, string> = {
      'nasi-box': 'NASI BOX',
      'snack-box': 'SNACK BOX',
      'tumpeng': 'TUMPENG',
      'bolen': 'BOLEN / PASTRY',
      'brownies': 'FUDGY BROWNIES'
    };

    groupOrder.forEach((catId) => {
      const items = menuItems.filter(item => item.category === catId);
      if (items.length === 0) return;

      // Group header checklist collision
      if (y + 24 > pageHeight - 20) {
        doc.addPage();
        y = 45;
        drawHeader(doc.getCurrentPageInfo().pageNumber);
      }

      // Render group/category band beautifully
      doc.setFillColor(242, 237, 230); // light warm background
      doc.rect(15, y, 180, 8, 'F');
      
      // Border around band
      doc.setDrawColor(210, 205, 195);
      doc.line(15, y, 195, y);
      doc.line(15, y + 8, 195, y + 8);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10.5);
      doc.setTextColor(11, 60, 27); // Deep Green
      doc.text(printGroups[catId], 20, y + 5.5);
      y += 13;

      items.forEach(item => {
        // Safe check description vertical space
        const descriptionLines = doc.splitTextToSize(item.description, 130);
        const itemHeight = Math.max(12, 6 + descriptionLines.length * 4.5) + 6;

        if (y + itemHeight > pageHeight - 20) {
          doc.addPage();
          y = 45;
          drawHeader(doc.getCurrentPageInfo().pageNumber);

          // Continuation Group Header Indicator
          doc.setFillColor(242, 237, 230);
          doc.rect(15, y, 180, 7, 'F');
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(9);
          doc.setTextColor(11, 60, 27);
          doc.text(`${printGroups[catId]} (Lanjutan)`, 20, y + 4.5);
          y += 11;
        }

        // Horizontal thin separator
        doc.setDrawColor(240, 240, 238);
        doc.line(15, y, 195, y);

        // Name
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9.5);
        doc.setTextColor(40, 40, 40);
        doc.text(item.name, 18, y + 6);

        // Price formatting
        const priceStr = new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
          minimumFractionDigits: 0,
        }).format(item.price).replace('Rp', 'Rp ');

        doc.setFont('helvetica', 'bold');
        doc.setTextColor(155, 44, 44); // Maroon Corporate
        doc.text(priceStr, 192, y + 6, { align: 'right' });

        // Description
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(85, 85, 85);
        
        let descY = y + 11.5;
        descriptionLines.forEach((line: string) => {
          doc.text(line, 18, descY);
          descY += 4.5;
        });

        y = descY + 3;
      });

      y += 5;
    });

    const pageCount = doc.getCurrentPageInfo().pageNumber;
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      drawFooter(i, pageCount);
    }

    doc.save('Katalog-Dapure-Cakra-Purwokerto.pdf');
  };

  return (
    <section className="bg-[#FAF9F6] py-16 px-4 md:px-8 w-full block" id="menu-view">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Title Block */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="font-serif text-4xl sm:text-5xl font-black text-[#1A1A1A]">Menu Hidangan Kami</h2>
          <p className="text-sm sm:text-base text-gray-500 font-sans leading-relaxed">
            Sajian premium dari Dapure Cakra Purwokerto dengan cita rasa autentik, bahan-bahan segar pilihan kualitas terbaik untuk menunjang kebutuhan konsumsi Anda.
          </p>
        </div>

        {/* Categories navigation and Catalog PDF download row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pb-2" id="menu-actions-row">
          {/* Filter Navigation Tabs */}
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-2 max-w-full" id="category-tabs-container">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as CategoryType)}
                  className={`px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-full cursor-pointer transition-all ${
                    isActive
                      ? 'bg-[#9B2C2C] text-white shadow-md shadow-red-900/10'
                      : 'bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-900 border border-gray-200'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Download PDF button matching branding guidelines */}
          <button
            onClick={downloadCatalogPDF}
            className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm rounded-full shadow-md flex items-center gap-2 transition hover:scale-102 active:scale-98 cursor-pointer shrink-0"
            id="download-pdf-catalog-btn"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 16l-5-5h3V4h4v7h3l-5 5zm9-4v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6h2v6h14v-6h2z" />
            </svg>
            <span className="text-xs sm:text-sm">Unduh Katalog PDF</span>
          </button>
        </div>

        {/* Real-time Order Cart Tip alert */}
        <div className="bg-yellow-50 border border-yellow-100 p-5 rounded-xl w-full flex items-start gap-3 shadow-xs" id="tips-alert-banner">
          <AlertCircle className="text-yellow-650 shrink-0 mt-1" size={18} />
          <div className="text-sm text-yellow-800 space-y-1 leading-relaxed">
            <span className="font-bold text-sm sm:text-base">Tips Pemesanan Acara / Katering:</span>
            <p className="text-xs sm:text-sm mt-0.5">
              Anda dapat mengklik <span className="underline font-semibold">Pesan</span> di bawah ini pada paket apa pun untuk memuatnya ke dalam generator nota otomatis chat WhatsApp kami. Anda bebas memadukan porsi, menambahkan porsi kue brownies/bolen, serta melakukan request kustom untuk menu lainnya sesuai kebutuhan agenda rapat atau nikahan Anda!
            </p>
          </div>
        </div>

        {/* Menu Items Grid with Framer Motion animations */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-4"
          layout
          id="menu-items-grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-150 flex flex-col group justify-between hover:shadow-lg transition-all duration-300"
                id={`menu-card-${item.id}`}
              >
                {/* Upper part: Food image with tag overlay */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-[#9B2C2C] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    {getCategoryLabel(item.category)}
                  </div>
                  <div className="absolute top-3 right-3 bg-white/95 text-yellow-600 p-1.5 w-8 h-8 rounded-full flex items-center justify-center shadow-sm">
                    <Star size={14} strokeWidth={3} className="fill-current" />
                  </div>
                </div>

                {/* Bottom part: Info card backing with gray overlay as shown in image 3 */}
                <div className="p-5.5 bg-[#F6F6F6] flex-1 flex flex-col justify-between space-y-4 border-t border-gray-100">
                  <div className="space-y-2 flex-1">
                    <h3 className="font-serif text-lg sm:text-xl font-black text-gray-900 group-hover:text-red-700 transition">
                      {item.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-650 leading-relaxed font-sans min-h-[46px]">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3.5 border-t border-gray-200/50 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-gray-500 uppercase tracking-wider block font-sans font-semibold">Harga Saji</span>
                      <span className="text-base sm:text-lg font-bold text-red-600 font-serif whitespace-nowrap">
                        {formatPrice(item.price)}
                      </span>
                    </div>

                    <button
                      onClick={() => openOrderWithItem(item.id)}
                      className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold rounded-lg shadow-sm transition-all duration-200 cursor-pointer flex items-center gap-1.5 shrink-0"
                    >
                      <ShoppingBag size={14} />
                      Pesan
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State if category contains no products */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-neutral-100 max-w-md mx-auto space-y-3">
            <span className="text-4xl">☕</span>
            <h3 className="text-lg font-bold text-gray-900">Menu Belum Tersedia</h3>
            <p className="text-sm text-gray-500 max-w-xs mx-auto leading-relaxed">
              Kami sedang meracik variasi minuman segar & sup hangat di dapur utama. Silakan hubungi kami langsung untuk request kustom!
            </p>
          </div>
        )}

      </div>
    </section>
  );
}
