import { useDispatch, useSelector } from 'react-redux';
import {
  removeItem,
  updateQuantity,
} from '../redux/CartSlice';

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main className="cart-page">
      <h1>Your Shopping Cart</h1>

      {items.length === 0 ? (
        <p>Your cart is empty. Add some beautiful plants!</p>
      ) : (
        <>
          {items.map((item) => (
            <article className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div className="cart-details">
                <h3>{item.name}</h3>
                <p>Unit price: ₹{item.price}</p>
                <p>Subtotal: ₹{item.price * item.quantity}</p>

                <div className="quantity-controls">
                  <button
                    disabled={item.quantity <= 1}
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          id: item.id,
                          quantity: item.quantity - 1,
                        })
                      )
                    }
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          id: item.id,
                          quantity: item.quantity + 1,
                        })
                      )
                    }
                  >
                    +
                  </button>
                </div>

                <button
                  className="remove-button"
                  onClick={() => dispatch(removeItem(item.id))}
                >
                  Delete
                </button>
              </div>
            </article>
          ))}

          <h2>Total: ₹{total}</h2>
          <button onClick={() => alert('Coming Soon!')}>
            Checkout
          </button>
        </>
      )}

      <button className="secondary-button" onClick={onContinueShopping}>
        Continue Shopping
      </button>
    </main>
  );
}

export default CartItem;