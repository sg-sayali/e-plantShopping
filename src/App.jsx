import { useState } from 'react';
import AboutUs from './components/AboutUs';
import ProductList, { Navbar } from './components/ProductList';
import CartItem from './components/CartItem';

function App() {
  const [showProductList, setShowProductList] = useState(false);
  const [page, setPage] = useState('home');

  const handleGetStartedClick = () => {
    setShowProductList(true);
    setPage('plants');
  };

  const handleNavigate = (nextPage) => {
    setPage(nextPage);
    if (nextPage === 'plants') setShowProductList(true);
  };

  if (page === 'home') {
    return (
      <main className="background-image app-container">
        <div className="landing-overlay">
          <h1>Welcome to Paradise Nursery</h1>
          <p>Bring Nature Home</p>
          <p>Discover beautiful plants for every corner of your home.</p>
          <button className="get-started-button" onClick={handleGetStartedClick}>
            Get Started
          </button>
          <AboutUs />
        </div>
      </main>
    );
  }

  return (
    <>
      <Navbar onNavigate={handleNavigate} />
      {page === 'plants' && showProductList && <ProductList />}
      {page === 'cart' && <CartItem onContinueShopping={() => handleNavigate('plants')} />}
    </>
  );
}

export default App;
