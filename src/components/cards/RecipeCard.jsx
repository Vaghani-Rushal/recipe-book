import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaRegClock } from "react-icons/fa6";

import EditModal from "../modal/EditModal";
import veg from "../../assets/recipeCard-image/veg-icon.svg";
import nonveg from "../../assets/recipeCard-image/non-veg-icon.svg";

export default function RecipeCard({
  recipe,
  index,
  isEditable,
  toggelEdit,
  setStorageDataChanged,
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && (
        <EditModal
          recipe={recipe}
          index={index}
          toggelEdit={toggelEdit}
          setShowModal={setShowModal}
          setStorageDataChanged={setStorageDataChanged}
        />
      )}

      <div className="col">
        <div className="card h-100 bg-secondary-subtle">
          <span className="position-absolute top-0 end-0 rounded-3 p-1 translate-middle-y bg-secondary">
            <FaRegClock /> {recipe.readyInMinutes}m
          </span>
          <img src={recipe.image} className="card-img-top" alt="" />
          <div className="card-body">
            <h5 className="card-title">
              {recipe.title}{" "}
              <img
                className="mx-1"
                src={recipe.vegetarian ? veg : nonveg}
                style={{ width: "25px" }}
              />
            </h5>
          </div>
          <div className="card-footer d-flex">
            <Link to={`/viewrecipe/${index}`} className="btn btn-primary">
              Recipe
            </Link>

            {isEditable && (
              <div
                className="btn btn-success mx-2"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                Edit
              </div>
            )}
            <p className="fs-6 my-auto ms-auto">
              Servings: <b>{recipe.servings}</b>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
