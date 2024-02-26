import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LogoutModal from "../../../controllers/modals/logoutModal";
import {
  ABOUTUS_ROUTE,
  ADD_RECIPE_ROUTE,
  CONTACTUS_ROUTE,
  LOGIN_ROUTE,
  ROOT_ROUTE,
  SIGNUP_ROUTE,
} from "../../../constant/route.constant";

export default function Header({
  search,
  setSearch,
  isEditable,
  setIsEditable,
  storageDataChange,
  setStorageDataChange,
}) {
  const [isUserLogin, setIsUserLogin] = useState({ isExist: false });
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    let loginUserData = localStorage.getItem("loginUserData");

    if (loginUserData) {
      loginUserData = JSON.parse(loginUserData);

      if (loginUserData.isExist) {
        setIsUserLogin({ ...loginUserData });
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
          <Link className="col-2 navbar-brand text-light" to={ROOT_ROUTE}>
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
                  to={ROOT_ROUTE}
                >
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link to={ADD_RECIPE_ROUTE} className="nav-link text-light">
                  Add new Recipe
                </Link>
              </li>

              {isUserLogin?.isExist && (
                <li className="nav-item">
                  <Link
                    to={ROOT_ROUTE}
                    onClick={() => setIsEditable(!isEditable)}
                    className="nav-link text-light"
                  >
                    {!isEditable ? "Edit Recipes" : "Disable Edit"}
                  </Link>
                </li>
              )}

              <li className="nav-item">
                <Link className="nav-link text-light" to={ABOUTUS_ROUTE}>
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to={CONTACTUS_ROUTE}>
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

                {isUserLogin?.isExist ? (
                  <>
                    <Link
                      className="mx-2 btn btn-outline-primary"
                      type="button"
                      onClick={handleLogout}
                    >
                      LogOut
                    </Link>
                    <span className="mx-2 fs-4">{isUserLogin.name}</span>
                  </>
                ) : (
                  <>
                    <Link
                      to={LOGIN_ROUTE}
                      className="mx-2 btn btn-outline-primary"
                      type="button"
                    >
                      LogIn
                    </Link>
                    <Link
                      to={SIGNUP_ROUTE}
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
        <LogoutModal
          setShowLogoutModal={setShowLogoutModal}
          setIsUserLogin={setIsUserLogin}
          setIsEditable={setIsEditable}
          setStorageDataChange={setStorageDataChange}
        />
      )}
    </>
  );
}
