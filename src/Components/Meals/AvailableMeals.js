import { useEffect, useState } from "react";

import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [mealsList, setMealsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      let meals = [];
      try {
        const response = await fetch(
          "https://react-http-49b46-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json"
        );

        if (!response.ok) {
          throw new Error("Request Failed!");
        }

        const data = await response.json();
        for (const id in data) {
          meals.push({
            id: id,
            name: data[id].name,
            description: data[id].description,
            price: data[id].price,
          });
        }
      } catch (error) {
        setIsLoading(false)
        setHasError(error.message || "Error");
      }

      setMealsList(meals);
      setIsLoading(false);
    };

    fetchMeals();
  }, []);

  const meals = mealsList.map((meal) => {
    return (
      <MealItem
        id={meal.id}
        key={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    );
  });

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (hasError) {
    return (
      <section className={classes.MealsError}>
        <p>{hasError}</p>
      </section>
    );
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{meals}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
