export const login_validation = {
  email: {
    name: "email",
    label: "Email",
    type: "email",
    id: "email",
    placeholder: "Enter your email",
    validation: {
      required: {
        value: true,
        message: "Email is required",
      },
      pattern: {
        value: /^\S+@\S+$/i,
        message: "Enter a valid email address",
      },
    },
  },
  password: {
    name: "password",
    label: "Password",
    type: "password",
    id: "password",
    placeholder: "Enter your password",
    validation: {
      required: {
        value: true,
        message: "Password is required",
      },
      minLength: {
        value: 6,
        message: "Password must be at least 6 characters long",
      },
    },
  },
};

export const signup_validation = {
  name: {
    name: "name",
    label: "Name",
    type: "text",
    id: "name",
    placeholder: "Enter your name",
    validation: {
      required: {
        value: true,
        message: "Name is required",
      },
    },
  },
  email: {
    name: "email",
    label: "Email",
    type: "email",
    id: "email",
    placeholder: "Enter your email",
    validation: {
      required: {
        value: true,
        message: "Email is required",
      },
      pattern: {
        value: /^\S+@\S+$/i,
        message: "Enter a valid email address",
      },
    },
  },
  password: {
    name: "password",
    label: "Password",
    type: "password",
    id: "password",
    placeholder: "Enter your password",
    validation: {
      required: {
        value: true,
        message: "Password is required",
      },
      minLength: {
        value: 8,
        message: "Password must be at least 8 characters long",
      },
      pattern: {
        value:
          /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/,
        message:
          "Password must include at least one capital letter, one number, and one special symbol",
      },
    },
  },
  confirmPassword: {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    id: "confirmPassword",
    placeholder: "Confirm your password",
    validation: {
      required: {
        value: true,
        message: "Confirm Password is required",
      },
      validate: {
        matchesPreviousPassword: (value, values) => {
          return value === values.password || "Passwords do not match";
        },
      },
    },
  },
};
