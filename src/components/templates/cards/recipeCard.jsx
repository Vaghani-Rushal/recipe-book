import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegClock } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

import EditModal from "../../../controllers/modals/editModal";
import veg from "../../../assets/images/veg-icon.svg";
import nonveg from "../../../assets/images/non-veg-icon.svg";
import DeleteModal from "../../../controllers/modals/deleteModal";

export default function RecipeCard({
  recipe,
  index,
  isEditable,
  setStorageDataChanged,
}) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <>
      {showEditModal && (
        <EditModal
          recipe={recipe}
          index={index}
          setShowModal={setShowEditModal}
          setStorageDataChanged={setStorageDataChanged}
        />
      )}

      {showDeleteModal && (
        <DeleteModal
          index={index}
          setShowModal={setShowDeleteModal}
          setStorageDataChanged={setStorageDataChanged}
        />
      )}

      <div className="col">
        <div className="card h-100 bg-secondary-subtle">
          <span
            className={`position-absolute top-0 end-0 rounded-3 p-1 translate-middle-y ${
              isEditable ? "" : "bg-info-subtle"
            }`}
          >
            {!isEditable ? (
              <span>
                <FaRegClock /> {recipe?.readyInMinutes}m
              </span>
            ) : (
              <div
                className="btn btn-danger"
                onClick={() => {
                  setShowDeleteModal(true);
                }}
              >
                <MdDelete /> Delete
              </div>
            )}
          </span>

          <img src={recipe?.image} className="card-img-top" alt="" />
          <div className="card-body">
            <h5 className="card-title">
              {recipe.title}{" "}
              <img
                className="mx-1"
                src={recipe?.vegetarian ? veg : nonveg}
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
                  setShowEditModal(true);
                }}
              >
                Edit
              </div>
            )}
            <p className="fs-6 my-auto ms-auto">
              Servings: <b>{recipe?.servings}</b>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
