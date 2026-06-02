import { useState, FormEvent } from 'react';
import { X, Plus, Minus, Send, CheckCircle2, ShoppingCart } from 'lucide-react';
import { menuItems } from '../types';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedItemId?: string;
}

export default function OrderModal({ isOpen, onClose, preselectedItemId }: OrderModalProps) {
  // Quantities state
  const [quantities, setQuantities] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    menuItems.forEach((item) => {
      initial[item.id] = item.id === preselectedItemId ? 5 : 0; // Default count 5 if preselected
    });
    return initial;
  });

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleIncrement = (id: string) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleDecrement = (id: string) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) - 1),
    }));
  };

  // Calculate items ordered and total price
  const activeItems = Object.entries(quantities)
    .filter(([_, qty]) => (qty as number) > 0)
    .map(([id, qty]) => {
      const item = menuItems.find((m) => m.id === id);
      return { item, qty: qty as number };
    })
    .filter((entry): entry is { item: typeof menuItems[0]; qty: number } => entry.item !== undefined);

  const totalPrice = activeItems.reduce((acc, entry) => acc + entry.item.price * entry.qty, 0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (activeItems.length === 0) {
      alert('Silakan pilih minimal 1 item terlebih dahulu!');
      return;
    }

    if (!customerName || !phone || !address || !date) {
      alert('Silakan lengkapi formulir Anda!');
      return;
    }

    // Build perfect WhatsApp text
    let messageText = `*Halo Dapure Cakra! Saya ingin memesan catering/kuliner:*\n\n`;
    
    activeItems.forEach((entry, idx) => {
      messageText += `${idx + 1}. *${entry.item.name}* (Qty: ${entry.qty}) - _${formatPrice(entry.item.price * entry.qty)}_\n`;
    });

    messageText += `\n*Total Tagihan:* *${formatPrice(totalPrice)}*\n\n`;
    messageText += `*Detail Kontak & Pengiriman:*\n`;
    messageText += `• Nama Pemesan: ${customerName}\n`;
    messageText += `• No WhatsApp: ${phone}\n`;
    messageText += `• Tanggal Pengiriman: ${date}\n`;
    messageText += `• Alamat Lengkap: ${address}\n`;
    if (notes.trim()) {
      messageText += `• Catatan Tambahan: ${notes}\n`;
    }
    
    messageText += `\n_Terima kasih! Mohon segera konfirmasi pesanan saya._`;

    // Encode text for URL
    const encodedMessage = encodeURIComponent(messageText);
    const whatsappURL = `https://wa.me/6285747273415?text=${encodedMessage}`;

    // Redirect to Whatsapp
    window.open(whatsappURL, '_blank', 'noopener,noreferrer');
    
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in" id="order-modal-backdrop">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col relative" id="order-modal-box">
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-2xl">
          <div className="flex items-center gap-2">
            <ShoppingCart className="text-red-600" size={20} />
            <h2 className="text-lg font-serif font-bold text-gray-900">Form Pemesanan Dapure Cakra</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 px-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition cursor-pointer"
            id="close-modal-btn"
          >
            <X size={20} />
          </button>
        </div>

        {submitted ? (
          <div className="p-10 text-center flex flex-col items-center gap-4 justify-center flex-1">
            <CheckCircle2 size={64} className="text-emerald-500 animate-bounce" />
            <span className="font-serif text-2xl font-bold text-gray-900">Pesanan Berhasil Disiapkan!</span>
            <p className="text-gray-600 max-w-sm">
              Kami sedang mengalihkan Anda ke WhatsApp. Mohon mengirimkan pesan otomatis yang terbuat untuk menyelesaikan kesepakatan bento/catering Anda.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              {/* Item Selector Section */}
              <div className="space-y-3">
                <span className="text-sm font-semibold text-gray-700 block">Pilih Menu Hidangan</span>
                <p className="text-xs text-gray-500">Sesuaikan jumlah pesanan paket box/pastry/cake yang Anda butuhkan (Minimum pesanan catering disarankan 5-10 box).</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2 max-h-56 overflow-y-auto border border-gray-100 rounded-xl p-3 bg-gray-50/50">
                  {menuItems.map((item) => {
                    const qty = quantities[item.id] || 0;
                    return (
                      <div key={item.id} className="bg-white p-3 rounded-lg border border-gray-150 flex items-center justify-between gap-3 shadow-xs">
                        <div className="flex items-center gap-2.5 overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-10 h-10 object-cover rounded"
                            referrerPolicy="no-referrer"
                          />
                          <div className="truncate">
                            <span className="font-semibold text-xs text-gray-900 block truncate">{item.name}</span>
                            <span className="text-[11px] font-medium text-red-600 font-mono block">{formatPrice(item.price)}</span>
                          </div>
                        </div>
                        {/* Quantity Counter */}
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleDecrement(item.id)}
                            className="w-6 h-6 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center font-bold text-sm transition"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-5 text-center text-xs font-bold font-mono text-gray-900">{qty}</span>
                          <button
                            type="button"
                            onClick={() => handleIncrement(item.id)}
                            className="w-6 h-6 rounded bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center font-bold text-sm transition"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Selected List Summary */}
              {activeItems.length > 0 && (
                <div className="bg-red-50/40 border border-red-100/55 p-4 rounded-xl space-y-2">
                  <span className="text-xs font-bold text-[#9B2C2C] uppercase tracking-wider block">Ringkasan Pesanan</span>
                  <div className="space-y-1.5 max-h-24 overflow-y-auto">
                    {activeItems.map((entry) => (
                      <div key={entry.item.id} className="flex justify-between text-xs text-gray-800">
                        <span>{entry.item.name} <span className="text-gray-500">x{entry.qty}</span></span>
                        <span className="font-medium font-mono">{formatPrice(entry.item.price * entry.qty)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-red-100 flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-900">Total Tagihan (Estimasi):</span>
                    <span className="text-sm font-bold text-red-600 font-mono">{formatPrice(totalPrice)}</span>
                  </div>
                </div>
              )}

              {/* Form Inputs */}
              <div className="space-y-4 pt-2">
                <span className="text-sm font-semibold text-gray-700 block">Formulir Pengiriman</span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Nama Pemesan <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      required
                      placeholder="Masukkan nama Anda"
                      className="w-full text-xs px-3 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Nomor WhatsApp <span className="text-red-500">*</span></label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      placeholder="Contoh: 08123456xxx"
                      className="w-full text-xs px-3 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Tanggal & Jam Pengiriman <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    placeholder="Contoh: 15 Juni 2026, Jam 10:00 Pagi"
                    className="w-full text-xs px-3 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Alamat Lengkap Pengiriman <span className="text-red-500">*</span></label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    rows={2}
                    placeholder="Contoh: Jalan Kemerdekaan No. 12, Purwokerto Wetan, Banyumas (Depan RSOP)"
                    className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition resize-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Catatan Tambahan (Opsional)</label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Misal: Sambal minta dipisah, minta sayur tauge dikurangi"
                    className="w-full text-xs px-3 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition"
                  />
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-5 border-t border-gray-100 flex items-center justify-between bg-gray-50 rounded-b-2xl">
              <span className="text-[11px] text-gray-500">Membuka WhatsApp ketika tombol pesanan diklik</span>
              <button
                type="submit"
                className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold shadow-md transition flex items-center gap-2 cursor-pointer"
              >
                <Send size={14} />
                Kirim via WhatsApp
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
