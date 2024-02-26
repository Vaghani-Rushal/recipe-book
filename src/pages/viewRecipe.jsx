import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ViewRecipeCard from "../components/templates/cards/viewRecipeCard";
import Loading from "../components/templates/spinner/loading";

export default function ViewRecipe() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState();
  const [loading, setLoading] = useState(false);
  const [storageDataChanged, setStorageDataChanged] = useState(false);

  useEffect(() => {
    setLoading(true);
    const storageData = localStorage.getItem("recipeData");
    setRecipe(JSON.parse(storageData)[id]);
    setLoading(false);
  }, [id, storageDataChanged]);

  return (
    <>
      {loading && <Loading />}

      {recipe && (
        <ViewRecipeCard
          key={id}
          recipe={recipe}
          index={id}
          storageDataChanged={storageDataChanged}
          setStorageDataChanged={setStorageDataChanged}
        />
      )}
    </>
  );
}
