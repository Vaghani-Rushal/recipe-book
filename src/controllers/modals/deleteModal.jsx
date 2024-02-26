import React from "react";
import { Button, Modal } from "react-bootstrap";

export default function DeleteModal({
  index,
  setShowModal,
  setStorageDataChanged,
}) {
  const handleDelete = () => {
    let recipeData = JSON.parse(localStorage.getItem("recipeData"));

    recipeData = recipeData.filter((recipe, i) => i !== index);
    localStorage.setItem("recipeData", JSON.stringify(recipeData));
    setStorageDataChanged((prev) => !prev);
    setShowModal(false);
  };

  return (
    <>
      <Modal show={true} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton className="text-bg-dark">
          <Modal.Title>Recipe-Book ! Delete Recipe</Modal.Title>
        </Modal.Header>

        <form noValidate onSubmit={(e) => e.preventDefault()}>
          <Modal.Body className="text-bg-dark">
            Are you Sure you wanted to Delete Recipe !!!
          </Modal.Body>

          <Modal.Footer className="text-bg-dark">
            <Button
              variant="secondary"
              onClick={() => setShowLogoutModal(false)}
            >
              Close
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}
