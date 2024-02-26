import React, { useEffect, useState } from "react";
import RecipeCard from "../cards/RecipeCard";

export default function RecipeList({ search, isEditable, toggelEdit }) {
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
                  toggelEdit={toggelEdit}
                  setStorageDataChanged={setStorageDataChanged}
                />
              );
            }

            const isIngredient =
              recipe.extendedIngredients
                .map((ingredient) => ingredient.original.toLowerCase())
                .filter((item) =>
                  item.toLowerCase().includes(search.toLowerCase())
                ).length !== 0;

            if (
              isIngredient ||
              recipe.title.toLowerCase().includes(search.toLowerCase())
            ) {
              return (
                <RecipeCard
                  key={index}
                  recipe={recipe}
                  index={index}
                  isEditable={isEditable}
                  toggelEdit={toggelEdit}
                  setStorageDataChanged={setStorageDataChanged}
                />
              );
            }
          })}
        </div>
      </div>
    </>
  );
}
