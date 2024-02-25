import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logout from "../user/Logout";

export default function Header({
  search,
  setSearch,
  isEditable,
  toggelEdit,
  storageDataChange,
  setStorageDataChange,
}) {
  const [customer, setCustomer] = useState({ isExist: false });
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    let customerData = localStorage.getItem("customerData");

    if (customerData) {
      customerData = JSON.parse(customerData);

      if (customerData.isExist) {
        setCustomer({ ...customerData });
      }
    }
  }, [storageDataChange]);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-black navbar-dark row text-center"
        style={{ minHeight: "70px" }}
      >
        <div className="container-fluid">
          <Link className="col-2 navbar-brand text-light" to="/">
            Recipe-Book
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="col-6 navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link text-light"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/addrecipe" className="nav-link text-light">
                  Add new Recipe
                </Link>
              </li>

              {customer?.isExist && (
                <li className="nav-item">
                  <Link
                    to="/"
                    onClick={() => toggelEdit(!isEditable)}
                    className="nav-link text-light"
                  >
                    {!isEditable ? "Edit Recipes" : "Disable Edit"}
                  </Link>
                </li>
              )}

              <li className="nav-item">
                <Link className="nav-link text-light" to="/aboutus">
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/contactus">
                  Contact Us
                </Link>
              </li>
            </ul>

            <div className="col-4 nav-item mx-3">
              <div className="d-flex">
                <input
                  className="form-control me-2"
                  value={search}
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={(event) => setSearch(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      event.target.blur();
                    }
                  }}
                />

                {customer?.isExist ? (
                  <>
                    <Link
                      className="mx-2 btn btn-outline-primary"
                      type="button"
                      onClick={handleLogout}
                    >
                      LogOut
                    </Link>
                    <span className="mx-2 fs-4">{customer.name}</span>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="mx-2 btn btn-outline-primary"
                      type="button"
                    >
                      LogIn
                    </Link>
                    <Link
                      to="/signup"
                      className="mx-2 btn btn-primary"
                      type="button"
                    >
                      SignUp
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {showLogoutModal && (
        <Logout
          setShowLogoutModal={setShowLogoutModal}
          setCustomer={setCustomer}
        />
      )}
    </>
  );
}
