import React, { useEffect, useState } from "react";
import Input from "../controllers/form/input";
import { FormProvider, useForm } from "react-hook-form";
import { login_validation } from "../utils/userValidations";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../components/templates/alert/alert";
import Loading from "../components/templates/spinner/loading";
import { ROOT_ROUTE, SIGNUP_ROUTE } from "../constant/route.constant";

export default function LogIn({ setStorageDataChange }) {
  const methods = useForm();
  const navigate = useNavigate();
  const [alert, setAlert] = useState({
    show: false,
    type: "danger",
    message: "Default Alert",
  });

  useEffect(() => {
    let loginUserData = localStorage.getItem("loginUserData");
    if (loginUserData) loginUserData = JSON.parse(loginUserData);

    if (loginUserData?.isExist) {
      setAlert({ show: true, type: "success", message: "Already Login." });
      setTimeout(() => {
        setAlert({ show: false, type: "danger", message: "Default Alert" });
        navigate(ROOT_ROUTE);
      }, 1500);
    }
  }, []);

  const onSubmit = methods.handleSubmit((data) => {
    const userObj = {
      email: data.email.trim().toLowerCase(),
      password: data.password,
    };

    let usersData = localStorage.getItem("usersData");

    if (usersData) usersData = JSON.parse(usersData);

    const isEmailExist = usersData?.filter(
      (user) => user.email === userObj.email
    );

    if (isEmailExist?.length) {
      const isValidUser = isEmailExist[0].password === userObj.password;
      if (isValidUser) {
        localStorage.setItem(
          "loginUserData",
          JSON.stringify({ isExist: true, name: isEmailExist[0].name })
        );

        setAlert({ show: true, type: "success", message: "Login successful." });

        methods.reset();
        setTimeout(() => {
          setAlert({ show: false, type: "danger", message: "Default Alert" });
          setStorageDataChange((val) => !val);
          navigate(ROOT_ROUTE);
        }, 1500);
        return;
      }
    }

    setAlert({ show: true, type: "danger", message: "Invalid credentials !" });

    setTimeout(() => {
      setAlert({ show: false, type: "danger", message: "Default Alert" });
    }, 3000);
  });

  return (
    <>
      {alert.show && <Alert alert={alert} />}

      {alert.type === "danger" ? (
        <div className="container my-5">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center text-white-50 fs-2">
              Recipe-Book
            </div>
          </div>
          <div className=" row justify-content-center mb-4">
            <div className="col-md-6 text-center fs-3 text-secondary fw-bold ">
              Login
            </div>
          </div>
          <FormProvider {...methods}>
            <form noValidate onSubmit={(e) => e.preventDefault()}>
              <div className="d-flex justify-content-center align-items-center">
                <div className="mb-3" style={{ width: "25vw" }}>
                  <Input {...login_validation.email} />
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <div className="mb-3" style={{ width: "25vw" }}>
                  <Input {...login_validation.password} />
                </div>
              </div>

              <div className="d-flex justify-content-center align-items-center my-2">
                <div className="" style={{ width: "25vw" }}>
                  <button onClick={onSubmit} className="btn btn-primary fs-5">
                    LogIn
                  </button>
                  <span className="mx-3 fs-6">
                    New to Recipe-Book ?{" "}
                    <Link to={SIGNUP_ROUTE} className="fs-5">
                      SignUp
                    </Link>
                  </span>
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
