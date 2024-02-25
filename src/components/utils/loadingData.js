import axios from "axios";
import defaultRecipeImage from "../../assets/recipeCard-image/default-recipe-image.jpg";

export const fetchRecipies = async (recipeListSize) => {
  const options = {
    method: "GET",
    url: "https://api.spoonacular.com/recipes/random",
    params: {
      apiKey: import.meta.env.VITE_REACT_APP_RECIPE_KEY_1,
      number: recipeListSize,
    },
  };

  try {
    const response = await axios.request(options);

    const recipeData = response?.data?.recipes?.map((recipe) => {
      return { ...recipe, defaultImage: defaultRecipeImage };
    });

    localStorage.setItem("recipeData", JSON.stringify(recipeData));
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
