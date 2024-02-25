import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ViewRecipeCard from "../cards/viewRecipeCard";
import { ThreeCircles } from "react-loader-spinner";

export default function ViewRecipe() {
  const { recipeIndex } = useParams();
  const [recipe, setRecipe] = useState();
  const [loading, setLoading] = useState(false);
  const [storageDataChanged, setStorageDataChanged] = useState(false);

  useEffect(() => {
    setLoading(true);
    const storageData = localStorage.getItem("recipeData");
    setRecipe(JSON.parse(storageData)[recipeIndex]);
    setLoading(false);
  }, [recipeIndex, storageDataChanged]);

  return (
    <>
      {loading && (
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
      )}

      {recipe && (
        <ViewRecipeCard
          key={recipeIndex}
          recipe={recipe}
          index={recipeIndex}
          storageDataChanged={storageDataChanged}
          setStorageDataChanged={setStorageDataChanged}
        />
      )}
    </>
  );
}
