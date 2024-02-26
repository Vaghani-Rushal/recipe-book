import React, { useEffect, useState } from "react";
import Input from "../form/Input";
import { FormProvider, useForm } from "react-hook-form";
import { login_validation } from "../utils/userValidations";
import { Link, useNavigate } from "react-router-dom";
import { ThreeCircles } from "react-loader-spinner";
import Alert from "../alert/Alert";
import Error404 from "../error/Error404";

export default function LogIn({ setStorageDataChange }) {
  const methods = useForm();
  const navigate = useNavigate();
  const [isCustomerExist, setIsCustomerExist] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    type: "danger",
    message: "Default Alert",
  });

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
        setAlert({ show: true, type: "success", message: "Login successful." });

        localStorage.setItem(
          "customerData",
          JSON.stringify({ isExist: true, name: isEmailExist[0].name })
        );

        methods.reset();
        setTimeout(() => {
          setAlert({ show: false, type: "danger", message: "Default Alert" });
          setStorageDataChange((val) => !val);
          navigate("/");
        }, 2000);
        return;
      }
    }

    setAlert({ show: true, type: "danger", message: "Invalid credentials !" });

    setTimeout(() => {
      setAlert({ show: false, type: "danger", message: "Default Alert" });
    }, 3000);
  });

  useEffect(() => {
    let customerData = localStorage.getItem("customerData");
    if (customerData) customerData = JSON.parse(customerData);
    if (customerData?.isExist) setIsCustomerExist(true);
  }, []);

  return (
    <>
      {isCustomerExist ? (
        <Error404 />
      ) : (
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
                      <button
                        onClick={onSubmit}
                        className="btn btn-primary fs-5"
                      >
                        LogIn
                      </button>
                      <span className="mx-3 fs-6">
                        New to Recipe-Book ?{" "}
                        <Link to="/signup" className="fs-5">
                          SignUp
                        </Link>
                      </span>
                    </div>
                  </div>
                </form>
              </FormProvider>
            </div>
          ) : (
            <div className="d-flex justify-content-md-center align-items-center vh-100">
              <ThreeCircles
                visible={true}
                height="100"
                width="100"
                color="#4fa94d"
                ariaLabel="three-circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          )}
        </>
      )}
    </>
  );
}
