import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../redux/CartSlice';
import { plants } from '../data/plants';

export const plantsArray = [
  { category: 'Succulents', plants: plants.filter(p => p.category === 'Succulents') },
  { category: 'Air Purifying', plants: plants.filter(p => p.category === 'Air Purifying') },
  { category: 'Flowering Plants', plants: plants.filter(p => p.category === 'Flowering Plants') },
];

export function Navbar({ onNavigate }) {
  const items = useSelector(state => state.cart.items);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="navbar">
      <strong>Paradise Nursery</strong>
      <div className="nav-links">
        <button onClick={() => onNavigate('home')}>Home</button>
        <button onClick={() => onNavigate('plants')}>Plants</button>
        <button onClick={() => onNavigate('cart')}>🛒 Cart ({count})</button>
      </div>
    </nav>
  );
}

export default function ProductList() {
  const dispatch = useDispatch();
  const items = useSelector(state => state.cart.items);
  const addedToCart = Object.fromEntries(items.map(item => [item.name, true]));

  return (
    <main className="plants-page">
      <h1>Our Plants</h1>
      {plantsArray.map(category => (
        <section className="product-list" key={category.category}>
          <h2>{category.category}</h2>
          <div className="plant-grid">
            {category.plants.map(plant => (
              <article className="plant-card" key={plant.id}>
                <img src={plant.image} alt={plant.name} />
                <h3>{plant.name}</h3>
                <p>₹{plant.price}</p>
                <button
                  disabled={Boolean(addedToCart[plant.name])}
                  onClick={() => dispatch(addItem(plant))}
                >
                  {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}
                </button>
              </article>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
