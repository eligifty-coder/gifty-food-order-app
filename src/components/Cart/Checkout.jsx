import {useRef, useState} from 'react'
import classes from './Checkout.module.css'
const isEmpty =  value => value.trim() ===''
const isFiveChars = value =>value.trim().length ===5
const Checkout = (props) => {
   const [formInputValidity, setFormInputValidity] = useState({
      name:{isTouched:false,isValid:false},
      street: { isTouched: false, isValid: false },
      city: { isTouched: false, isValid: false },
      postalCode: { isTouched: false, isValid: false },
   })
   
   const nameInputRef = useRef()
   const streetInputRef = useRef()
   const postalInputRef = useRef()
   const cityInputRef = useRef()

   const confirmHandler = event => {
      event.preventDefault()
     
      const enteredName = nameInputRef.current.value
      const enteredStreet = streetInputRef.current.value
      const enteredPostal = postalInputRef.current.value
      const enteredCity = cityInputRef.current.value
      const enteredNameIsValid = !isEmpty(enteredName)
      const enteredStreetIsValid = !isEmpty(enteredStreet)
      const enteredPostalIsValid = isFiveChars(enteredPostal)
      const enteredCityIsValid = !isEmpty(enteredCity)
      setFormInputValidity({
         name: { isTouched: true, isValid: !enteredNameIsValid ?false:true},
         street: { isTouched: true, isValid: !enteredStreetIsValid ? false : true},
         postalCode: { isTouched: true, isValid: !enteredPostalIsValid ? false : true},
         city: { isTouched: true, isValid: !enteredCityIsValid ? false : true},
      })
      const formIsValid =
         enteredNameIsValid &&
         enteredStreetIsValid &&
         enteredPostalIsValid &&
         enteredCityIsValid
      if (!formIsValid) {
         return
      }
      props.onConfirm({
         name: enteredName,
         street: enteredStreet,
         city:enteredCity,
         postalCode: enteredPostal,
      })
   }
   const nameCheckValidity = formInputValidity.name.isTouched && !formInputValidity.name.isValid
   const streetValidity = formInputValidity.street.isTouched &&  !formInputValidity.street.isValid
   const postalValidity = formInputValidity.postalCode.isTouched &&  !formInputValidity.postalCode.isValid
   const cityValidity = formInputValidity.city.isTouched &&  !formInputValidity.city.isValid
   
   return (
      <form onSubmit={confirmHandler} className={classes.form}>
         <div className={`${classes.control} ${nameCheckValidity? classes.invalid:''}`}>
            <label htmlFor="name">Your  Name</label>
            <input type="text" id="name" ref={nameInputRef} />
            {nameCheckValidity &&<p>Please enter a valid name</p>}
         </div>
         <div className={`${classes.control} ${streetValidity && classes.invalid}`}>
            <label htmlFor="street">Street</label>
            <input type="text" id="street" ref={streetInputRef} />
            {streetValidity && <p>Please enter a valid street</p>}
         </div>
         <div className={`${classes.control} ${postalValidity && classes.invalid}`}>
            <label htmlFor="postal">Postal Code</label>
            <input type="text" id="postal" ref={postalInputRef} />
            {postalValidity && <p>Please enter a valid postal code (5 characters long.)</p>}
         </div>
         <div className={`${classes.control} ${cityValidity && classes.invalid}`}>
            <label htmlFor="city">City</label>
            <input type="text" id="city" ref={cityInputRef} />
            {cityValidity && <p>Please enter a valid city</p>}
         </div>
         <div className={classes.actions}>
            <button type='button' onClick={props.onCancel}>Cancel</button>
            <button >Confirm</button>
         </div>
      </form>
   )
}

export default Checkout
