import type { NextPage } from 'next'
import { useCart } from '../components/CartContext'
import { trpc } from '../utils/trpc'

const Home: NextPage = () => {


  return (
    <div>
      
    </div>
  )
}

export default Home

// const {cart, addToCart, removeFromCart, clearCart} = useCart()
/* {
      cart.length >= 1 ? (
        cart.map(product => (
          <div key={product.id}>
            <h1>{product.name}</h1>
            <p>{product.price}</p>
            <p>{product.quantity}</p>
            <button onClick={() => removeFromCart(product)}>Remove</button>
          </div>
        ))
      ) : (<h1>No products in cart</h1>)
      }
      <button onClick={() => {
        addToCart({ id: 2, name: "Product 1", price: 10, quantity: 1 })
        }}>Add</button> */