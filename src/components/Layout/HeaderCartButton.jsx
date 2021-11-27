import {useContext, useEffect, useState} from 'react'
import CartContext from '../../store/cart-context'
import CartIcon from '../Cart/CartIcon'
import classes from './HeaderCartButton.module.css'
const HeaderCartButton = props => {
   const cartCtx = useContext(CartContext)
   const {items} = cartCtx
   const [btnIsHighlighted, setBtnIsHighlighted]= useState(false)
   useEffect(() => {
      if (items.length === 0) {
         return
      }
      const timer = setTimeout(() => {
         setBtnIsHighlighted(false);
      }, 300);

      return () => {
         clearTimeout(timer);
      };
   }, [items])
   const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;
   const numberOfCartItems = items.reduce((currNumber, item) => {
      return currNumber+ item.amount
   }, 0)
   
   return <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
         <CartIcon/>
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
   </button>
}

export default HeaderCartButton
