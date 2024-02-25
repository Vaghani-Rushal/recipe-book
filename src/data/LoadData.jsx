import axios from "axios";
import React, { useEffect, useState } from "react";
import defaultRecipeImage from "../assets/recipeCard-image/default-recipe-image.jpg";
import { ThreeCircles } from "react-loader-spinner";

export default function LoadData({ recipeListSize, setIsDataLoaded }) {
  const [loading, setLoading] = useState(false);

  const recipeData = localStorage.getItem("recipeData");

  if (recipeData) {
    setIsDataLoaded(true);
    return <></>;
  }

  useEffect(() => {
    setLoading(true);
    const fetchRecipies = async () => {
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

        const recipeData = response.data.recipes.map((recipe) => {
          return { ...recipe, defaultImage: defaultRecipeImage };
        });

        localStorage.setItem("recipeData", JSON.stringify(recipeData));
        setLoading(false);
        setIsDataLoaded(true);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecipies();
  }, []);

  return (
    <>
      {loading && (
        <>
          <div className="d-flex justify-content-md-center align-items-center vh-100">
            <ThreeCircles
              visible={true}
              height="100"
              width="100"
              color="#4fa94d"
              ariaLabel="three-circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        </>
      )}
    </>
  );
}
