import React, { useState } from "react";
import Input from "../controllers/form/input";
import { FormProvider, useForm } from "react-hook-form";
import {
  title_validation,
  url_validation,
  servings_validation,
  time_validation,
  instructions_validation,
  ingredients_validation,
} from "../utils/recipeDetailsValidation";
import { useNavigate } from "react-router-dom";
import Alert from "../components/templates/alert/alert";

import Loading from "../components/templates/spinner/loading";
import { LOGIN_ROUTE } from "../constant/route.constant";

export default function AddRecipe() {
  const navigate = useNavigate();
  const methods = useForm();
  const { register } = methods;
  const [alert, setAlert] = useState({
    show: false,
    type: "danger",
    message: "Default Alert",
  });

  const onSubmit = methods.handleSubmit((data) => {
    let loginUserData = localStorage.getItem("loginUserData");
    if (loginUserData) loginUserData = JSON.parse(loginUserData);

    if (!loginUserData?.isExist) {
      setAlert({
        show: true,
        type: "danger",
        message: "Login First!",
      });

      setTimeout(() => {
        setAlert({ show: false, type: "danger", message: "Default Alert" });
        navigate(LOGIN_ROUTE);
      }, 1500);

      return;
    }

    const recipeObj = {
      vegetarian: data.isVeg === "veg",
      servings: data.recipeServing,
      title: data.recipeTitle.trim(),
      image: data.recipeUrl.trim(),
      readyInMinutes: data.recipeTime,
      extendedIngredients: data.recipeIngredients
        .trim()
        .split(",")
        .map((ingredient) => {
          return {
            original: ingredient,
          };
        }),
      analyzedInstructions: new Array({
        steps: data.recipeInstructions
          .trim()
          .split(".")
          .map((instruction) => {
            return { step: instruction };
          }),
      }),
    };

    let recipeData = localStorage.getItem("recipeData");
    recipeData = JSON.parse(recipeData);
    recipeData.unshift(recipeObj);

    localStorage.setItem("recipeData", JSON.stringify(recipeData));

    methods.reset();
    setAlert({
      show: true,
      type: "success",
      message: "Recipe added successfully!",
    });

    setTimeout(() => {
      setAlert({ show: false, type: "danger", message: "Default Alert" });
    }, 1000);
  });

  return (
    <>
      {alert.show && <Alert alert={alert} />}

      {alert.show ? (
        <Loading />
      ) : (
        <div className="container my-5">
          <div className="my-5 row justify-content-center mb-4">
            <div className="col-md-6 text-center fs-1">Add new Recipe</div>
          </div>
          <FormProvider {...methods}>
            <form noValidate onSubmit={(e) => e.preventDefault()}>
              <div className="mb-3 row">
                <div className="col">
                  <Input {...title_validation} />
                </div>

                <div className="col">
                  <Input {...url_validation} />
                </div>
              </div>

              <div className="mb-3 row">
                <div className="col">
                  <Input {...servings_validation} />
                </div>

                <div className="col">
                  <Input {...time_validation} />
                </div>
              </div>

              <div className="mb-3">
                <Input {...ingredients_validation} />
              </div>

              <div className="mb-3">
                <Input {...instructions_validation} />
              </div>

              <div className="mb-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="isVeg"
                    id="veg"
                    value="veg"
                    defaultChecked
                    {...register("isVeg")}
                  />
                  <label className="form-check-label" htmlFor="veg">
                    Veg
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="isVeg"
                    id="non-veg"
                    value="nonveg"
                    {...register("isVeg")}
                  />
                  <label className="form-check-label" htmlFor="non-veg">
                    Non-Veg
                  </label>
                </div>
              </div>

              <button onClick={onSubmit} className="btn btn-primary">
                Add
              </button>
            </form>
          </FormProvider>
        </div>
      )}
    </>
  );
}
