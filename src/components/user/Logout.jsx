import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Logout({ setShowLogoutModal, setCustomer }) {
  const navigate = useNavigate();

  const handleModalLogout = () => {
    localStorage.removeItem("customerData");
    setShowLogoutModal(false);
    setCustomer({ isExist: false });
    navigate("/login");
  };

  return (
    <>
      <Modal show={true} onHide={() => setShowLogoutModal(false)}>
        <Modal.Header closeButton className="text-bg-dark">
          <Modal.Title>Recipe-Book ! Logout</Modal.Title>
        </Modal.Header>

        <form noValidate onSubmit={(e) => e.preventDefault()}>
          <Modal.Body className="text-bg-dark">
            Are you Sure you wanted to Logout !!!
          </Modal.Body>

          <Modal.Footer className="text-bg-dark">
            <Button
              variant="secondary"
              onClick={() => setShowLogoutModal(false)}
            >
              Close
            </Button>
            <Button variant="success" onClick={handleModalLogout}>
              LogOut
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}
