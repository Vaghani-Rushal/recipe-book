import React from "react";
import { findInputError } from "../../utils/findInputError";
import { isFormInvalid } from "../../utils/isFormInvalid";
import { useFormContext } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { MdError } from "react-icons/md";

export default function Input({
  label,
  id,
  type,
  multiline,
  name,
  defaultValue,
  placeholder,
  validation,
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const inputErrors = findInputError(errors, name);
  const isInvalid = isFormInvalid(inputErrors);

  return (
    <>
      {label && (
        <label htmlFor={name} className="form-label">
          {label}
        </label>
      )}

      {multiline ? (
        <textarea
          id={id}
          type={type}
          defaultValue={defaultValue}
          name={name}
          className="form-control"
          placeholder={placeholder}
          {...register(`${name}`, validation)}
          rows={3}
        ></textarea>
      ) : (
        <input
          id={id}
          type={type}
          defaultValue={defaultValue}
          name={name}
          placeholder={placeholder}
          className="form-control"
          {...register(name, validation)}
        />
      )}

      <AnimatePresence mode="wait" initial={false}>
        {isInvalid && (
          <InputError
            message={inputErrors.error.message}
            key={inputErrors.error.message}
          />
        )}
      </AnimatePresence>
    </>
  );
}

const InputError = ({ message }) => {
  return (
    <motion.p
      className="d-inline align-items-center gap-1 px-2 font-weight-semibold text-danger  rounded-md"
      {...framer_error}
    >
      <MdError /> {message}
    </motion.p>
  );
};

const framer_error = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.2 },
};
