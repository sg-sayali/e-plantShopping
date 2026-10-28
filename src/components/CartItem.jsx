import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from '../redux/CartSlice';

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.items);
  const costOf = item => item.cost ?? item.price;

  const total = cart.reduce((sum, item) => sum + costOf(item) * item.quantity, 0);

  const handleIncrement = item => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleDecrement = item => {
    if (item.quantity <= 1) dispatch(removeItem(item.name));
    else dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
  };

  const handleRemove = item => dispatch(removeItem(item.name));

  return (
    <main className="cart-page cart-container">
      <h1>Your Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty. Add some beautiful plants!</p>
      ) : (
        <>
          {cart.map(item => (
            <article className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div className="cart-details">
                <h3>{item.name}</h3>
                <p>Unit price: ₹{costOf(item)}</p>
                <p>Subtotal: ₹{costOf(item) * item.quantity}</p>
                <div className="quantity-controls">
                  <button onClick={() => handleDecrement(item)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrement(item)}>+</button>
                </div>
                <button className="cart-item-delete" onClick={() => handleRemove(item)}>
                  Delete
                </button>
              </div>
            </article>
          ))}
          <h2>Total: ₹{total}</h2>
          <button onClick={() => window.alert('Coming Soon')}>Checkout</button>
        </>
      )}
      <button className="get-started-button" onClick={onContinueShopping}>
        Continue Shopping
      </button>
    </main>
  );
}

export default CartItem;
