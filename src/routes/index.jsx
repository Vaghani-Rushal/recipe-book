import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "../components/ui/header/header";
import RecipeList from "../pages/recipeList";
import ViewRecipe from "../pages/viewRecipe";
import AddRecipe from "../pages/addRecipe";
import Error404 from "../components/templates/error/error404";
import MaintanacePage from "../components/ui/maintancePages/maintancePage";
import LogIn from "../pages/login";
import Signup from "../pages/signup";
import Loading from "../components/templates/spinner/loading";

import {
  ABOUTUS_ROUTE,
  ADD_RECIPE_ROUTE,
  CONTACTUS_ROUTE,
  INVALID_ROUTE,
  LOGIN_ROUTE,
  ROOT_ROUTE,
  SIGNUP_ROUTE,
  VIEW_RECIPE_ROUTE,
} from "../constant/route.constant";

export default function Index({ loading }) {
  const [search, setSearch] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [storageDataChange, setStorageDataChange] = useState(false);
  const [isUserLogin, setIsUserLogin] = useState(false);

  useEffect(() => {
    let loginUserData = localStorage.getItem("loginUserData");
    if (loginUserData) loginUserData = JSON.parse(loginUserData);

    if (loginUserData?.isExist) {
      setIsUserLogin(true);
      return;
    }

    setIsUserLogin(false);
  }, [storageDataChange]);

  return (
    <>
      <BrowserRouter>
        <div>
          <Header
            search={search}
            setSearch={setSearch}
            isEditable={isEditable}
            setIsEditable={setIsEditable}
            storageDataChange={storageDataChange}
            setStorageDataChange={setStorageDataChange}
          />

          {loading ? (
            <Loading />
          ) : (
            <div className="container">
              <Routes>
                <Route
                  path={ROOT_ROUTE}
                  element={
                    <RecipeList
                      search={search}
                      isEditable={isEditable}
                      setIsEditable={setIsEditable}
                    />
                  }
                />
                <Route path={VIEW_RECIPE_ROUTE} element={<ViewRecipe />} />
                <Route
                  path={LOGIN_ROUTE}
                  element={
                    <LogIn setStorageDataChange={setStorageDataChange} />
                  }
                />
                <Route path={SIGNUP_ROUTE} element={<Signup />} />
                <Route path={ABOUTUS_ROUTE} element={<MaintanacePage />} />
                <Route path={CONTACTUS_ROUTE} element={<MaintanacePage />} />
                <Route path={INVALID_ROUTE} element={<Error404 />} />
                <Route
                  path={ADD_RECIPE_ROUTE}
                  element={
                    isUserLogin ? <AddRecipe /> : <Navigate to={LOGIN_ROUTE} />
                  }
                />
              </Routes>
            </div>
          )}
        </div>
      </BrowserRouter>
    </>
  );
}
