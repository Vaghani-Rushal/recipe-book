import React, { useEffect, useState } from "react";
import veg from "../../../assets/images/veg-icon.svg";
import nonveg from "../../../assets/images/non-veg-icon.svg";
import EditModal from "../../../controllers/modals/editModal";

export default function ViewRecipeCard({
  recipe,
  index,
  setStorageDataChanged,
}) {
  const [showModal, setShowModal] = useState(false);
  const [isUserLogin, setIsUserLogin] = useState(false);

  const instructions = recipe.analyzedInstructions[0].steps.map(
    (instruction) => instruction.step
  );

  useEffect(() => {
    let userLoginData = localStorage.getItem("userLoginData");
    if (userLoginData) userLoginData = JSON.parse(userLoginData);

    if (userLoginData?.isExist) {
      setIsUserLogin(true);
    }
  }, []);

  return (
    <>
      {showModal && (
        <EditModal
          recipe={recipe}
          index={index}
          setShowModal={setShowModal}
          setStorageDataChanged={setStorageDataChanged}
        />
      )}

      <div className="mx-5 my-5">
        <div className="row">
          <span className="col fs-1 fw-bold text-secondary">
            {recipe.title}{" "}
            <img
              className="mx-1"
              src={recipe.vegetarian ? veg : nonveg}
              style={{ width: "30px" }}
            />{" "}
          </span>
          {isUserLogin && (
            <div
              className={`col-1 btn btn-success fs-5 m-2 `}
              onClick={() => {
                setShowModal(true);
              }}
            >
              Edit
            </div>
          )}
        </div>
        <div className="d-flex mx-4 my-4">
          <div className="d-flex align-items-center justify-content-center">
            <img
              className="rounded-4 "
              src={recipe.image}
              alt=""
              style={{ maxWidth: "40rem", height: "35rem" }}
            />
          </div>
          <div className="my-1 mx-4">
            <span className=" fs-2 fw-bold text-secondary">Ingredients </span>
            <span className="text-secondary fs-3">
              (Servings for <b>{recipe.servings}</b>)
            </span>
            <div className="d-flex flex-wrap my-3">
              {recipe.extendedIngredients.map((ingredient, index) => (
                <span
                  key={`${index}-ingredient`}
                  className="fs-5 text-dark-emphasis bg-black m-1 px-3 py-2 rounded-4"
                >
                  {ingredient.original}
                </span>
              ))}
            </div>
          </div>
        </div>
        <span className=" fs-2 fw-bold text-secondary">Instructions </span>
        <span className="text-secondary fs-3">
          (Cooking Time : <b>{recipe.readyInMinutes} min</b>)
        </span>
        <div className="my-4 mx-2">
          {instructions.map((instruction, index) => {
            return (
              <div key={`${index}-instruction`} className="d-flex">
                <div className="d-flex align-items-center">
                  <span className="fs-5 text-light bg-black m-1 px-3 py-2 rounded-circle">
                    {index + 1}
                  </span>
                </div>
                <span className="d-flex flex-wrap fs-5 text-white-50 bg-black m-1 px-3 py-2 rounded-4">
                  {instruction}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
