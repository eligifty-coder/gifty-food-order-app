import { useReducer } from 'react'
import CartContext from './cart-context'


const defaultCartState = { items: [], totalAmount: 0 }
const cartReducer = (state, action) => {
   switch (action.type) {
      case 'ADD':
         const existingCartItemIndex = state.items.findIndex(item => {
            return item.id === action.item.id
         })
         const existingcartItem = state.items[existingCartItemIndex]
         if (!existingcartItem) {

            return { ...state, items: [...state.items, action.item], totalAmount: state.totalAmount + (action.item.price * action.item.amount) }
         } else {
            const transFormedItem = state.items.map((item, index) => {
               if (index === existingCartItemIndex) {
                  return { ...item, amount: (item.amount + action.item.amount), price: item.price + action.item.price }
               }
               return item
            })
            return { ...state, items: transFormedItem, totalAmount: state.totalAmount + (action.item.price * action.item.amount) }
         }
      case 'CLEAR':
         return {...state, items:[]}
      case 'REMOVE':
         const index = state.items.findIndex(item => {
            return item.id === action.id
         })
         const existingCartItemIndexR = state.items[index]
         const updatedTotalAmount = state.totalAmount - existingCartItemIndexR.price
      
         if (existingCartItemIndexR.amount === 1) {
            const filteredItems = state.items.filter(item => item.id !== action.id)
            return { ...state, items: filteredItems, totalAmount: updatedTotalAmount }
         } else {
            const mappedRemovedAway = state.items.map((item, index) => {
               if (action.id === item.id) {
                  return { ...item, amount: item.amount - 1 }
               }
               return item
            })
            return { ...state, items: mappedRemovedAway, totalAmount: updatedTotalAmount }
         }
      default:
         return state
   }

}
const CartProvider = props => {
   const [cartState, dispatch] = useReducer(cartReducer, defaultCartState)
   // manage states with useState or useReducer and methods in context then pass them as value so different components can use them
   const addItemToCartHandler = (item) => {
      dispatch({ type: 'ADD', item: item })
   }
   const removeItemFromCartHandler = id => {
      dispatch({ type: 'REMOVE', id: id })
   }
   const clearCartHandler = () => {
      dispatch({ type:'CLEAR'})
   }
   const cartContext = {
      items: cartState.items,
      totalAmount: cartState.totalAmount,
      addItem: addItemToCartHandler,
      removeItem: removeItemFromCartHandler,
      clearCart:clearCartHandler
   }
   return <CartContext.Provider value={cartContext}>
      {props.children}
   </CartContext.Provider>
}
export default CartProvider