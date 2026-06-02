import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, HelpCircle, ChevronDown, CheckCircle, Clock } from 'lucide-react';

export default function ContactView() {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  // FAQ data
  const faqsList = [
    {
      q: 'Apakah ada minimal pemesanan (minimum order) katering?',
      a: 'Untuk pesanan nasi boks (catering) kami menyarankan minimal pemesanan 10 boks, sedangkan untuk snack box minimal 15 boks. Hal ini untuk mempertahankan kualitas bahan baku sediaan segar langsung dari pasar.'
    },
    {
      q: 'Berapa hari sebelum acara pemesanan harus dikonfirmasi?',
      a: 'Paling lambat konfirmasi pesanan (disertai pembayaran tanda jadi/DP) dilakukan H-3 sebelum acara untuk porsi reguler, dan H-7 untuk acara besar seperti pernikahan atau reuni akbar.'
    },
    {
      q: 'Bagaimana metode pembayaran di Dapure Cakra?',
      a: 'Kami menerima pembayaran panjar (Down Payment) sebesar 50% melalui transfer Bank (BCA atau Bank Mandiri) maupun tunai di lokasi dapur utama kami. Pelunasan dapat diselesaikan saat pengiriman makanan di lokasi acara.'
    },
    {
      q: 'Apakah biaya kirim gratis untuk wilayah Purwokerto?',
      a: 'Ya! Kami menyediakan layanan gratis ongkos kirim (Free Ongkir) untuk wilayah dalam kota Purwokerto dengan minimal pemesanan tertentu. Untuk wilayah luar kota Banyumas, ongkos kirim disesuaikan dengan jarak tempuh.'
    }
  ];

  const [activeFaq, setActiveFaq] = useState<number | null>(0); // Default open first FAQ

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSending(true);

    // Build the query WhatsApp message
    const formattedQuery = `*Halo Dapure Cakra! Saya ingin bertanya mengenai katering/kuliner:*\n\n` +
      `• *Nama:* ${name}\n` +
      `• *Subjek/Kepentingan:* ${subject}\n` +
      `• *Kontak:* ${contactInfo}\n\n` +
      `*Pesan/Pertanyaan:*\n_${message}_`;

    const encoded = encodeURIComponent(formattedQuery);
    setTimeout(() => {
      setSending(false);
      setSentSuccess(true);
      
      // Open WhatsApp
      window.open(`https://wa.me/6285747273415?text=${encoded}`, '_blank', 'noopener,noreferrer');

      setTimeout(() => {
        setSentSuccess(false);
        setName('');
        setSubject('');
        setContactInfo('');
        setMessage('');
      }, 3000);
    }, 1200);
  };

  return (
    <div className="bg-[#FAF9F6] py-16 px-4 md:px-8 w-full" id="contact-view-container">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Page title and description */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="font-serif text-4xl sm:text-5xl font-black text-[#1A1A1A]">Hubungi Kami</h2>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed font-sans">
            Ada pertanyaan tentang menu kustom, harga khusus porsi besar, atau pemesanan darurat? Staf ramah kami siap merespons via WA / Telepon kapan saja.
          </p>
        </div>

        {/* Info grids + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Direct info grids */}
          <div className="lg:col-span-5 flex flex-col justify-between" id="contact-info-left-col">
            <div className="flex flex-col h-full justify-between gap-6">
              <div className="space-y-4 flex flex-col flex-1">
                <h3 className="font-serif text-2xl font-bold text-gray-900 pb-2 border-b border-gray-200">
                  Informasi Kontak
                </h3>

                <div className="space-y-4 font-sans text-sm sm:text-base text-gray-700 flex flex-col flex-1 justify-between">
                  
                  <div className="bg-white p-5 rounded-xl border border-gray-150 flex gap-4 shadow-xs items-center flex-1">
                    <div className="p-3 rounded-lg bg-red-50 text-red-600 shrink-0 self-start">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <span className="font-bold text-gray-950 block mb-1 text-sm sm:text-base">Dapur Utama</span>
                      <p className="text-gray-650 leading-relaxed text-xs sm:text-sm">
                        Gg. Guyub, Purwokerto Wetan, Kec. Purwokerto Tim., Kabupaten Banyumas, Jawa Tengah 53111
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-xl border border-gray-150 flex gap-4 shadow-xs items-center flex-1">
                    <div className="p-3 rounded-lg bg-red-50 text-red-600 shrink-0 self-start">
                      <Phone size={20} />
                    </div>
                    <div>
                      <span className="font-bold text-gray-950 block mb-1 text-sm sm:text-base">Telepon & WhatsApp</span>
                      <a href="tel:085747273415" className="text-red-650 font-bold text-sm sm:text-base block hover:underline">
                        085747273415
                      </a>
                      <p className="text-xs text-gray-500 mt-1">Senin - Minggu (06:00 - 21:00 WIB)</p>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-xl border border-gray-150 flex gap-4 shadow-xs items-center flex-1">
                    <div className="p-3 rounded-lg bg-red-50 text-red-600 shrink-0 self-start">
                      <Mail size={20} />
                    </div>
                    <div>
                      <span className="font-bold text-gray-950 block mb-1 text-sm sm:text-base">Surel Resensi</span>
                      <a href="mailto:dapurecakra.pwt@gmail.com" className="text-gray-800 hover:text-red-600 block text-sm sm:text-base font-bold">
                        dapurecakra.pwt@gmail.com
                      </a>
                    </div>
                  </div>

                </div>
              </div>

              {/* Simulating operational map hours */}
              <div className="bg-[#0b3c1b] text-white p-5 rounded-xl flex gap-3.5 items-start mt-auto">
                <Clock size={22} className="text-emerald-300 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="text-xs sm:text-sm font-bold font-serif text-emerald-300 uppercase tracking-widest block font-sans">Layanan Darurat</span>
                  <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                    Untuk katering dadakan (misalnya acara duka atau rapat kabinet mendadak <span className="underline">di bawah H-1</span>), mohon segera telepon telepon langsung ke 085747273415 agar dapat dijadwalkan secepat kilat!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-gray-150 shadow-sm flex flex-col justify-between" id="contact-inquiry-right-col">
            <div className="flex flex-col h-full justify-between">
              <h3 className="font-serif text-2xl font-bold text-gray-900 pb-2 border-b border-gray-200 mb-6">
                Kirimkan Pesanyaan Anda
              </h3>

              {sentSuccess ? (
                <div className="p-8 text-center flex flex-col items-center justify-center gap-4 bg-emerald-50 rounded-xl border border-emerald-100 my-auto">
                  <CheckCircle size={48} className="text-emerald-500" />
                  <div>
                    <span className="text-lg font-bold text-emerald-900 block">Pertanyaan Dikirim ke WA!</span>
                    <p className="text-sm text-emerald-700 mt-2">
                      Staf admin Dapure Cakra akan segera merespons chat Anda dalam waktu kurang dari 5 menit. Terima kasih atas ketertarikan Anda.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-gray-650 mb-1.5">Nama Lengkap <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          placeholder="Contoh: Ibu Rina Amalia"
                          className="w-full text-sm px-4 py-3 rounded-lg border border-gray-250 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 bg-gray-50/20"
                        />
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-gray-650 mb-1.5">Kontak Anda (WhatsApp/Email) <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          value={contactInfo}
                          onChange={(e) => setContactInfo(e.target.value)}
                          required
                          placeholder="Contoh: 0852xxxxxxxx"
                          className="w-full text-sm px-4 py-3 rounded-lg border border-gray-255 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 bg-gray-50/20"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-650 mb-1.5">Subjek Pertanyaan <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                        placeholder="Contoh: Tanya harga kustom nasi kotak reuni 100 porsi"
                        className="w-full text-sm px-4 py-3 rounded-lg border border-gray-250 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 bg-gray-50/20"
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-650 mb-1.5">Isi Pesan / Kebutuhan Acara <span className="text-red-500">*</span></label>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        rows={4}
                        placeholder="Tuliskan secara ringkas pertanyaan Anda, misal: pilihan lauk sayur bento porsi kustom, request nasi tumpeng mini untuk ulang tahun anak, dll."
                        className="w-full text-sm px-4 py-3 rounded-lg border border-gray-250 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 bg-gray-50/20 resize-none flex-1 min-h-[100px]"
                      ></textarea>
                    </div>
                  </div>

                  <div className="pt-4 mt-auto">
                    <button
                      type="submit"
                      disabled={sending}
                      className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:bg-gray-400"
                    >
                      {sending ? (
                        <span className="text-sm">Menyiapkan Chat...</span>
                      ) : (
                        <>
                          <Send size={15} />
                          <span className="text-sm font-bold">Kirim Pertanyaan</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>
        </div>

        {/* SECTION FAQ ACCODIONS */}
        <div className="bg-white border border-gray-150 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs max-w-4xl mx-auto" id="faqs-block">
          <div className="text-center space-y-2 mb-6">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-2">
              <HelpCircle size={24} />
            </div>
            <h3 className="font-serif text-2xl font-bold text-gray-900">Pertanyaan Umum (FAQs)</h3>
            <p className="text-sm text-gray-500 max-w-sm mx-auto">Kami merangkum jawaban pertanyaan yang sering kami terima di lapangan.</p>
          </div>

          <div className="space-y-3" id="faqs-accordion-list">
            {faqsList.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div key={index} className="border border-gray-100 rounded-xl overflow-hidden hover:border-gray-200 transition">
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full p-4 flex items-center justify-between text-left font-bold text-sm sm:text-base text-gray-800 hover:bg-gray-50/50 cursor-pointer transition select-none"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown size={18} className={`text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isOpen && (
                    <div className="p-4 pt-1 pb-5 border-t border-gray-50 bg-[#FCFAF7] text-sm leading-relaxed text-gray-650">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
