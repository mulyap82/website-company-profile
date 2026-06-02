import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HomeView from './components/HomeView';
import AboutView from './components/AboutView';
import MenuView from './components/MenuView';
import ContactView from './components/ContactView';
import Footer from './components/Footer';
import OrderModal from './components/OrderModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('beranda');
  const [isOrderModalOpen, setIsOrderModalOpen] = useState<boolean>(false);
  const [preselectedItemId, setPreselectedItemId] = useState<string | undefined>(undefined);

  // Scroll to top on active tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeTab]);

  const handlePesanSekarang = () => {
    setPreselectedItemId(undefined);
    setIsOrderModalOpen(true);
  };

  const handleLihatMenu = () => {
    setActiveTab('menu');
  };

  const handleOpenOrderWithItem = (itemId: string) => {
    setPreselectedItemId(itemId);
    setIsOrderModalOpen(true);
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case 'beranda':
        return (
          <HomeView 
            setActiveTab={setActiveTab} 
            openOrderWithItem={handleOpenOrderWithItem} 
          />
        );
      case 'tentang-kami':
        return <AboutView openOrderModal={handlePesanSekarang} />;
      case 'menu':
        return <MenuView openOrderWithItem={handleOpenOrderWithItem} />;
      case 'kontak':
        return <ContactView />;
      default:
        return (
          <HomeView 
            setActiveTab={setActiveTab} 
            openOrderWithItem={handleOpenOrderWithItem} 
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFAF8] flex flex-col justify-between font-sans antialiased text-[#1A1A1A] select-none" id="app-root-container">
      <div>
        {/* Persistent top notification contacts & main navbar navigation */}
        <Navbar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          openOrderModal={handlePesanSekarang} 
        />

        {/* Lemon background Hero banner - only rendered on Home/Beranda page as shown in Image 1 */}
        {activeTab === 'beranda' && (
          <Hero 
            onPesanSekarang={handlePesanSekarang} 
            onLihatMenu={handleLihatMenu} 
          />
        )}

        {/* Dynamic active page context */}
        <main className="w-full flex-grow" id="app-main-content">
          {renderActiveView()}
        </main>
      </div>

      {/* Shared bottom information block & IG Photo feed */}
      <Footer 
        setActiveTab={setActiveTab} 
        openOrderModal={handlePesanSekarang} 
      />

      {/* Floating active cart builder modal drawer */}
      <OrderModal 
        isOpen={isOrderModalOpen} 
        onClose={() => setIsOrderModalOpen(false)} 
        preselectedItemId={preselectedItemId}
      />
    </div>
  );
}
