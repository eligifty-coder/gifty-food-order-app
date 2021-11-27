import { useState } from 'react';
import CartProvider from './store/CartProvider'
import Header from './components/Layout/Header'
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart'

function App() {
  const [cartIsShown, setCartIsShown] = useState(false)
  const showcartHandler = () => {
    setCartIsShown(true)
  }
  const hideCartHandler = () => {
    setCartIsShown(false)
  }
  return <CartProvider>
    {cartIsShown && <Cart
      onClose={hideCartHandler}
    />}
    <Header onShowCart={showcartHandler} />
    <main>
      <Meals />
    </main>
  </CartProvider>
}

export default App;
// create the context with react.createContext in a new file
// you can add your intended values in the createContext which aids autocomplete
// in the component where yu have most of your features displayed, for eg App component, import the context file (that is where you defined react.createContext, LET'S CALL it reactContext) , wrapp the app component in the reactContext.Provider then add the object of the different methods and propsyou want your features to consume as the value.
