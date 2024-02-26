import React, { useEffect, useState } from "react";
import RecipeCard from "../components/templates/cards/recipeCard";
import Loading from "../components/templates/spinner/loading";

export default function RecipeList({ search, isEditable, setIsEditable }) {
  const [recipeList, setRecipeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [storageDataChanged, setStorageDataChanged] = useState(false);

  useEffect(() => {
    setLoading(true);
    const data = localStorage.getItem("recipeData");
    setRecipeList(JSON.parse(data));
    setLoading(false);
  }, [storageDataChanged]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="container mb-5">
          <div className="row row-cols-1 row-cols-md-4 g-4 mt-4">
            {recipeList.map((recipe, index) => {
              if (search.length === 0) {
                return (
                  <RecipeCard
                    key={index}
                    recipe={recipe}
                    index={index}
                    isEditable={isEditable}
                    setIsEditable={setIsEditable}
                    setStorageDataChanged={setStorageDataChanged}
                  />
                );
              }

              const isIngredient =
                recipe?.extendedIngredients
                  .map((ingredient) => ingredient?.original.toLowerCase())
                  .filter((item) =>
                    item.toLowerCase().includes(search.toLowerCase())
                  ).length !== 0;

              if (
                isIngredient ||
                recipe?.title.toLowerCase().includes(search.toLowerCase())
              ) {
                return (
                  <RecipeCard
                    key={index}
                    recipe={recipe}
                    index={index}
                    isEditable={isEditable}
                    setIsEditable={setIsEditable}
                    setStorageDataChanged={setStorageDataChanged}
                  />
                );
              }
            })}
          </div>
        </div>
      )}
    </>
  );
}
