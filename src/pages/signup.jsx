import React, { useEffect, useState } from "react";
import Input from "../controllers/form/input";
import { FormProvider, useForm } from "react-hook-form";
import { signup_validation } from "../utils/userValidations";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../components/templates/alert/alert";
import Loading from "../components/templates/spinner/loading";
import { LOGIN_ROUTE, ROOT_ROUTE } from "../constant/route.constant";

export default function SignUp() {
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
        }, 1500);

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
      navigate(LOGIN_ROUTE);
    }, 1500);
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
                  <button onClick={onSubmit} className="btn btn-primary fs-5">
                    SignUp
                  </button>
                  <span className="mx-3 fs-6">
                    Already have an account ?{" "}
                    <Link to={LOGIN_ROUTE} className="fs-5">
                      LogIn
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
