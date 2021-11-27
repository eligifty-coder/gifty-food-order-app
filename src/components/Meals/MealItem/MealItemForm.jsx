import { useRef, useState} from 'react'
import Input from '../../UI/Input'
import classes from './MealItemForm.module.css'

const MealItemForm = props => {
   const [amountIsValid, setAmountIsValid] = useState(true)
   const amountInputRef = useRef()
   const submitHandler = event => {
      event.preventDefault()
  
      const enteredAmount = amountInputRef.current.value
      const enteredAmountNumer = +enteredAmount
      if (enteredAmount.trim().length === 0 || enteredAmountNumer < 1 || enteredAmountNumer > 5) {
         setAmountIsValid(false)
         return
      }
      props.onAddCart(enteredAmountNumer)
   }
   return (
      <form className={classes.form} onSubmit={submitHandler} >
         <Input
            label='Amount'
            ref={amountInputRef}
            input={{type: 'number',
            min:'1',
            max:'5',
            step:'1',
            defaultValue: '1',
            id: 'amout_' + props.id
         }}
         />
         <button>+ Add</button>
         {!amountIsValid && <p> Please enter a valid amount (1-5)</p>}
      </form>
   )
}

export default MealItemForm
