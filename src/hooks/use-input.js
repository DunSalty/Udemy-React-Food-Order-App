import { useState } from "react";

const useInput = (validate) => {
  const [value, setValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validate(value);
  const inputIsInvalid = !valueIsValid && isTouched;

  const valueChangeHandler = (event) => {
    setValue(event.target.value);
  };

  const valueBlurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setValue("");
    setIsTouched(false);
  };

  return {
    value,
    valueIsValid,
    inputIsInvalid,
    valueChangeHandler,
    valueBlurHandler,
    reset,
  };
};

export default useInput;
