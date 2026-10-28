import { useState } from 'react';
import { useSelector } from 'react-redux';
import AboutUs from './components/AboutUs';
import ProductList from './components/ProductList';
import CartItem from './components/CartItem';

function App() {
  const [page, setPage] = useState('home');
  const cartItems = useSelector((state) => state.cart.items);

  const cartCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  if (page === 'home') {
    return (
      <main className="landing-page">
        <div className="landing-overlay">
          <h1>Paradise Nursery</h1>
          <p>Bring Nature Home</p>
          <p>Discover beautiful plants for every corner of your home.</p>
          <button onClick={() => setPage('plants')}>Get Started</button>
          <AboutUs />
        </div>
      </main>
    );
  }

  return (
    <>
      <nav className="navbar">
        <button className="brand-button" onClick={() => setPage('home')}>
          Paradise Nursery
        </button>

        <div className="nav-links">
          <button onClick={() => setPage('home')}>Home</button>
          <button onClick={() => setPage('plants')}>Plants</button>
          <button onClick={() => setPage('cart')}>
            Cart ({cartCount})
          </button>
        </div>
      </nav>

      {page === 'plants' && <ProductList />}

      {page === 'cart' && (
        <CartItem onContinueShopping={() => setPage('plants')} />
      )}
    </>
  );
}

export default App;