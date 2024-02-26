import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Input from "../form/input";
import { FormProvider, useForm } from "react-hook-form";
import {
  title_validation,
  url_validation,
  servings_validation,
  time_validation,
  instructions_validation,
  ingredients_validation,
} from "../../utils/recipeDetailsValidation";
import Alert from "react-bootstrap/Alert";
import Loading from "../../components/templates/spinner/loading";

export default function EditModal({
  recipe,
  index,
  setShowModal,
  setStorageDataChanged,
}) {
  const methods = useForm();
  const { register } = methods;
  const [alert, setAlert] = useState({
    show: false,
    type: "danger",
    message: "Default Alert",
  });

  const initialValues = {
    title: recipe?.title,
    imageUrl: recipe?.image,
    time: recipe?.readyInMinutes,
    serving: recipe?.servings,
    ingredients: recipe?.extendedIngredients
      .map((ingredient) => ingredient?.original)
      .join(","),
    instructions: recipe?.analyzedInstructions[0]?.steps
      .map((instruction) => instruction?.step)
      .join(""),
    isVeg: recipe?.vegetarian,
  };

  const onSubmit = methods.handleSubmit((data) => {
    const instructions = data.recipeInstructions.trim().split(".");
    const lastIndex = instructions.length - 1;

    const mappedInstructions = instructions.map((instruction, index) => {
      if (index === lastIndex) {
        return { step: instruction.trim() };
      } else {
        return { step: instruction.trim() + "." };
      }
    });

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
        steps: mappedInstructions,
      }),
    };

    let recipeData = JSON.parse(localStorage.getItem("recipeData"));
    recipeData = recipeData.map((recipe, i) => {
      if (i == index) {
        return recipeObj;
      }
      return recipe;
    });

    localStorage.setItem("recipeData", JSON.stringify(recipeData));
    if (setStorageDataChanged) setStorageDataChanged((prev) => !prev);

    setAlert({ show: true, type: "success", message: "Changes are Saved." });

    setTimeout(() => {
      setAlert({ show: false, type: "danger", message: "Default Alert" });
      setShowModal(false);
    }, 1500);
  });

  return (
    <>
      <Modal show={true} onHide={() => setShowModal(false)} size="xl">
        <Modal.Header closeButton={!alert.show} className="text-bg-dark">
          <Modal.Title>Edit Recipe</Modal.Title>
        </Modal.Header>
        <FormProvider {...methods}>
          <form noValidate onSubmit={(e) => e.preventDefault()}>
            <Modal.Body className="text-bg-dark">
              {alert.show ? (
                <Loading isEditModal={true} />
              ) : (
                <>
                  <div className="mb-3 row">
                    <div className="col">
                      <Input
                        {...title_validation}
                        defaultValue={initialValues.title}
                      />
                    </div>

                    <div className="col">
                      <Input
                        {...url_validation}
                        defaultValue={initialValues.imageUrl}
                      />
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <div className="col">
                      <Input
                        {...servings_validation}
                        defaultValue={initialValues.serving}
                      />
                    </div>

                    <div className="col">
                      <Input
                        {...time_validation}
                        defaultValue={initialValues.time}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <Input
                      {...ingredients_validation}
                      defaultValue={initialValues.ingredients}
                    />
                  </div>

                  <div className="mb-3">
                    <Input
                      {...instructions_validation}
                      defaultValue={initialValues.instructions}
                    />
                  </div>

                  <div className="mb-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="isVeg"
                        id="veg"
                        value="veg"
                        defaultChecked={initialValues.isVeg}
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
                        defaultChecked={!initialValues.isVeg}
                        {...register("isVeg")}
                      />
                      <label className="form-check-label" htmlFor="non-veg">
                        Non-Veg
                      </label>
                    </div>
                  </div>
                </>
              )}
            </Modal.Body>

            <Modal.Footer className="text-bg-dark">
              {alert.show ? (
                <Alert
                  variant={"success"}
                  className="p-2 mx-3 align-item-center"
                >
                  Changes are being Saved.
                </Alert>
              ) : (
                <>
                  <Button
                    disabled={alert.show}
                    variant="secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </Button>
                  <Button
                    disabled={alert.show}
                    variant="success"
                    onClick={onSubmit}
                  >
                    Save changes
                  </Button>
                </>
              )}
            </Modal.Footer>
          </form>
        </FormProvider>{" "}
      </Modal>
    </>
  );
}
