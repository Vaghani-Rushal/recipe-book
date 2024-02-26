import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "../../constant/route.constant";

export default function Logout({
  setShowLogoutModal,
  setIsUserLogin,
  setIsEditable,
  setStorageDataChange,
}) {
  const navigate = useNavigate();

  const handleModalLogout = () => {
    localStorage.removeItem("loginUserData");
    setShowLogoutModal(false);
    setIsUserLogin({ isExist: false });
    setIsEditable(false);
    setStorageDataChange((prev) => !prev);
    navigate({ LOGIN_ROUTE });
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
