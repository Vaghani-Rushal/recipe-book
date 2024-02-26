import React, { useEffect, useState } from "react";
import Input from "../form/Input";
import { FormProvider, useForm } from "react-hook-form";
import { signup_validation } from "../utils/userValidations";
import { Link, useNavigate } from "react-router-dom";
import { ThreeCircles } from "react-loader-spinner";
import Alert from "../alert/Alert";
import Error404 from "../error/Error404";

export default function SignUp() {
  const methods = useForm();
  const navigate = useNavigate();
  const [isCustomerExist, setIsCustomerExist] = useState(false);

  const [alert, setAlert] = useState({
    show: false,
    type: "danger",
    message: "Default Alert",
  });

  useEffect(() => {
    let customerData = localStorage.getItem("customerData");
    if (customerData) customerData = JSON.parse(customerData);
    if (customerData?.isExist) setIsCustomerExist(true);
  }, []);

  const onSubmit = methods.handleSubmit((data) => {
    const newUserObj = {
      name: data.name.trim().toLowerCase(),
      email: data.email.trim().toLowerCase(),
      password: data.password,
    };

    let usersData = localStorage.getItem("usersData");

    if (!usersData) {
      usersData = new Array(newUserObj);
      localStorage.setItem("usersData", JSON.stringify(usersData));
    } else {
      usersData = JSON.parse(usersData);
      const isEmailExist = usersData.filter(
        (user) => user.email === newUserObj.email
      ).length;

      if (isEmailExist) {
        setAlert({
          show: true,
          type: "danger",
          message: "Email alreay exist.",
        });

        setTimeout(() => {
          setAlert({ show: false, type: "danger", message: "Default Alert" });
        }, 2000);

        return;
      } else {
        usersData.push(newUserObj);
        localStorage.setItem("usersData", JSON.stringify(usersData));
      }
    }

    setAlert({
      show: true,
      type: "success",
      message: "SignUp successfuly !",
    });

    methods.reset();
    setTimeout(() => {
      setAlert({ show: false, type: "danger", message: "Default Alert" });
      navigate("/login");
    }, 2000);
  });

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
                  Signup
                </div>
              </div>
              <FormProvider {...methods}>
                <form noValidate onSubmit={(e) => e.preventDefault()}>
                  <div className="d-flex justify-content-center align-items-center">
                    <div className="mb-3" style={{ width: "25vw" }}>
                      <Input {...signup_validation.name} />
                    </div>
                  </div>
                  <div className="d-flex justify-content-center align-items-center">
                    <div className="mb-3" style={{ width: "25vw" }}>
                      <Input {...signup_validation.email} />
                    </div>
                  </div>
                  <div className="d-flex justify-content-center align-items-center">
                    <div className="mb-3" style={{ width: "25vw" }}>
                      <Input {...signup_validation.password} />
                    </div>
                  </div>
                  <div className="d-flex justify-content-center align-items-center">
                    <div className="mb-3" style={{ width: "25vw" }}>
                      <Input {...signup_validation.confirmPassword} />
                    </div>
                  </div>

                  <div className="d-flex justify-content-center align-items-center my-2">
                    <div className="" style={{ width: "25vw" }}>
                      <button
                        onClick={onSubmit}
                        className="btn btn-primary fs-5"
                      >
                        SignUp
                      </button>
                      <span className="mx-3 fs-6">
                        Already have an account ?{" "}
                        <Link to="/login" className="fs-5">
                          LogIn
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
