import useInput from "../../hooks/use-input";
import classes from "./Checkout.module.css";

const isNotEmpty = (value) => {
  return value.trim() !== "";
};

const isFiveChars = (value) => {
  return value.trim().length === 5;
};

const Checkout = (props) => {
  const {
    value: name,
    valueIsValid: nameIsValid,
    inputIsInvalid: nameInputIsInvalid,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput(isNotEmpty);

  const {
    value: street,
    valueIsValid: streetIsValid,
    inputIsInvalid: streetInputIsInvalid,
    valueChangeHandler: streetChangeHandler,
    valueBlurHandler: streetBlurHandler,
    reset: resetStreet,
  } = useInput(isNotEmpty);

  const {
    value: postal,
    valueIsValid: postalIsValid,
    inputIsInvalid: postalInputIsInvalid,
    valueChangeHandler: postalChangeHandler,
    valueBlurHandler: postalBlurHandler,
    reset: resetPostal,
  } = useInput(isFiveChars);

  const {
    value: city,
    valueIsValid: cityIsValid,
    inputIsInvalid: cityInputIsInvalid,
    valueChangeHandler: cityChangeHandler,
    valueBlurHandler: cityBlurHandler,
    reset: resetCity,
  } = useInput(isNotEmpty);

  let formIsValid = false;

  if (nameIsValid && streetIsValid && postalIsValid && cityIsValid) {
    formIsValid = true;
  }

  const confirmHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    props.onConfirm({ name: name, street: street, postal: postal, city: city });

    resetName();
    resetStreet();
    resetPostal();
    resetCity();
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div
        className={
          nameInputIsInvalid
            ? `${classes.control} ${classes.invalid}`
            : classes.control
        }
      >
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        />
        {nameInputIsInvalid ? (
          <p className={classes["error-text"]}>Name field cannot be empty.</p>
        ) : (
          ""
        )}
      </div>
      <div
        className={
          streetInputIsInvalid
            ? `${classes.control} ${classes.invalid}`
            : classes.control
        }
      >
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={street}
          onChange={streetChangeHandler}
          onBlur={streetBlurHandler}
        />
        {streetInputIsInvalid ? (
          <p className={classes["error-text"]}>Street field cannot be empty.</p>
        ) : (
          ""
        )}
      </div>
      <div
        className={
          postalInputIsInvalid
            ? `${classes.control} ${classes.invalid}`
            : classes.control
        }
      >
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          value={postal}
          onChange={postalChangeHandler}
          onBlur={postalBlurHandler}
        />
        {postalInputIsInvalid ? (
          <p className={classes["error-text"]}>
            Invalid Postal Code (5 chars).
          </p>
        ) : (
          ""
        )}
      </div>
      <div
        className={
          cityInputIsInvalid
            ? `${classes.control} ${classes.invalid}`
            : classes.control
        }
      >
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={city}
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
        />
        {cityInputIsInvalid ? (
          <p className={classes["error-text"]}>City field cannot be empty.</p>
        ) : (
          ""
        )}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
