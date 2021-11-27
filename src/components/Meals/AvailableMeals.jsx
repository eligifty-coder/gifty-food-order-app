import React, {useState, useEffect} from 'react'
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css'
import MealItem from './MealItem/MealItem';

const DUMMY_MEALS = [
   {
      id: 'm1',
      name: 'Sushi',
      description: 'Finest fish and veggies',
      price: 22.99,
   },
   {
      id: 'm2',
      name: 'Schnitzel',
      description: 'A german specialty!',
      price: 16.5,
   },
   {
      id: 'm3',
      name: 'Barbecue Burger',
      description: 'American, raw, meaty',
      price: 12.99,
   },
   {
      id: 'm4',
      name: 'Green Bowl',
      description: 'Healthy...and green...',
      price: 18.99,
   },
];
const AvailableMeals = () => {
   const [meals, setMeals] = useState([])
   const [isLoading, setIsLoading] = useState(true)
   const [httpError, setHttpError] = useState()
   useEffect(() => {
      const fetchMeals = async () => {
         try {
            const response = await fetch('https://http-request-17-new-default-rtdb.firebaseio.com/meals.json')
            if (!response.ok) {
               throw new Error('Something went wrong!');
            }
            const responseData = await response.json();
            const loadedMeals =[]
            for (const key in responseData) {
               loadedMeals.push({
                  id: key,
                  name: responseData[key].name,
                  description: responseData[key].description,
                  price: responseData[key].price,
               });
            }

            setMeals(loadedMeals);
            setIsLoading(false);
         } catch (error) {
            setIsLoading(false);
            setHttpError(error.message);
         }
      }
      fetchMeals()
   }, [])

   const mealsList = meals.map((meal, index) => {
      return <MealItem
         key={meal.id}
         id={meal.id}
         name={meal.name}
         price={meal.price}
         description={meal.description}
      >
         {meal.name}
      </MealItem>
   })
   if (isLoading) {
      return <section className={classes.MealsLoading}>
         <p>Loading...</p>
      </section>
   }

   if (httpError) {
      return <section className={classes.MealsError}>
         <p>{ httpError}</p>
      </section>
   }
   return (
      <section className={classes.meals}>
         <Card>
            <ul>
               {mealsList}
            </ul>
         </Card>
      </section>
   )
}

export default AvailableMeals
