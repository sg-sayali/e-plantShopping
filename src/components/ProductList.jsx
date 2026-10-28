import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../redux/CartSlice';
import { plants } from '../data/plants';

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const categories = [...new Set(plants.map((plant) => plant.category))];

  return (
    <main className="plants-page">
      <h1>Our Plants</h1>
      <p>Find the perfect plant for your green space.</p>

      {categories.map((category) => (
        <section key={category} className="plant-category">
          <h2>{category}</h2>

          <div className="plant-grid">
            {plants
              .filter((plant) => plant.category === category)
              .map((plant) => {
                const added = cartItems.some((item) => item.id === plant.id);

                return (
                  <article className="plant-card" key={plant.id}>
                    <img src={plant.image} alt={plant.name} />
                    <h3>{plant.name}</h3>
                    <p>₹{plant.price}</p>
                    <button
                      disabled={added}
                      onClick={() => dispatch(addItem(plant))}
                    >
                      {added ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </article>
                );
              })}
          </div>
        </section>
      ))}
    </main>
  );
}

export default ProductList;