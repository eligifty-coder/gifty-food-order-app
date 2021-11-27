import React, { useContext }from 'react'
import CartContext from '../../../store/cart-context'
import classes from './MealItem.module.css'
import MealItemForm from './MealItemForm'

const MealItem = props => {
   const cartCtx = useContext(CartContext)
   const price = `$${props.price.toFixed(2)}`
   const addToCartHandler = amount => {
      const item = {
         id: props.id,
         price: props.price,
         amount,
         name: props.name
      }
      cartCtx.addItem(item)
   }
   return (
      <li className={classes.meal}>
         <div>
            <h3>{ props.name}</h3>
            <div className={classes.description}>{ props.description}</div>
            <div className={classes.price}>{price}</div>
         </div>
         <div>
            <MealItemForm
               id={props.id}
               onAddCart={addToCartHandler}
            />
         </div>
      </li>
   )
}

export default MealItem
