import React, { useEffect, useState } from "react";
import axios from "axios";
import defaultRecipeImage from "./assets/images/default-recipe-image.jpg";
import { RECEPIE_LIST_SIZE } from "./constant/route.constant";
import Index from "./routes/index";

export default function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const recipeData = localStorage.getItem("recipeData");
    if (!recipeData) {
      fetchRecipes(RECEPIE_LIST_SIZE);
    }
  }, []);

  async function fetchRecipes(recipeListSize) {
    setLoading(true);
    const options = {
      method: "GET",
      url: "https://api.spoonacular.com/recipes/random",
      params: {
        apiKey: import.meta.env.VITE_REACT_APP_RECIPE_KEY_4,
        number: recipeListSize,
      },
    };

    try {
      const response = await axios.request(options);

      const recipeData = response?.data?.recipes?.map((recipe) => {
        return { ...recipe, defaultImage: defaultRecipeImage };
      });

      localStorage.setItem("recipeData", JSON.stringify(recipeData));
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, [1000]);
    }
  }

  return (
    <>
      <Index loading={loading} />
    </>
  );
}
