import { useState, useContext } from 'react'
import CartContext from '../../store/cart-context'
import Modal from '../UI/Modal'
import CartItem from './CartItem'
import Checkout from './Checkout'
import classes from './Cart.module.css'
const Cart = props => {
   const [isCheckOut, setIsCheckOut] = useState(false)
   const [httpError, setHttpError] = useState()
   const [isSubmitting, setIsSubmitting] = useState(false)  
   const [didSubmit, setDidSubmit] = useState(false)  
   const cartCtx = useContext(CartContext)
   
   const cartItemRemoveHandler = id => {
      cartCtx.removeItem(id)
   }
   const cartItemAddHandler = item => {
      cartCtx.addItem({...item, amount:1})
   }
   const orderHandler = () => {
      setIsCheckOut(true)
   }
   const sumitOrderHandler = async(userData) => {
      try {
         setIsSubmitting(true)
         const response = await fetch('https://http-request-17-new-default-rtdb.firebaseio.com/orders.json', {
            method: 'post',
            body: JSON.stringify({
               user: userData,
               orderedItems: cartCtx.items,
            })
         })
         if (response.ok) {
            setDidSubmit(true)
            cartCtx.clearCart()
         }
         setIsSubmitting(false)
      } catch (error) {
         setIsSubmitting(false)

         setHttpError(error.message)
         
      }
   }
   const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
   const hasItems = cartCtx.items.length > 0

   const modalActions = <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
      {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
   </div>
   
   const cartItems = <ul className={classes['cart-items']}>{cartCtx.items.map((item) => {
      return <CartItem
         key={item.id}
         name={item.name}
         price={item.price}
         amount={item.amount}
         onRemove={()=>cartItemRemoveHandler(item.id)}
         onAdd={()=>cartItemAddHandler(item)}
      >
         {item.name}
      </CartItem>
   })}</ul>
   const cartModalContent = (<>
      {cartItems}
      <div className={classes.total}>
         <span>
            Total Amount
         </span>
         <span>
            {totalAmount}
         </span>
      </div>
      {isCheckOut && <Checkout
         onConfirm={sumitOrderHandler}
         onCancel={props.onClose}
         isSubmitting={isSubmitting}
         error={httpError}
      />}
      {!isCheckOut && modalActions}
   </>)
   const isSubmittingModalContent = <p>Sending order data...</p>
   const didSubmitModalContent = <>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
         <button className={classes['button']} onClick={props.onClose}>Close</button>
      </div>
   </>
   const errorMessage = <>
      <p>Failed to send data...</p><div className={classes.actions}>
         <button className={classes['button']} onClick={props.onClose}>Close</button>
      </div>
   </>

   return (
      <Modal onClose={props.onClose} >
         { isSubmitting && isSubmittingModalContent}
         {didSubmit && didSubmitModalContent}
         {!httpError && !isSubmitting && !didSubmit && cartModalContent}
         { httpError && errorMessage}

      </Modal>
   )
}

export default Cart
