import React from "react";
import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const [checkout, setCheckout] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const orderHandler = () => {
    setCheckout(true);
  };

  const confirmOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://react-http-49b46-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          userData: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setSubmitted(true);

    cartCtx.clearCart();
  };

  const cartItems = cartCtx.items.map((item) => {
    return (
      <CartItem
        key={item.id}
        name={item.name}
        amount={item.amount}
        price={item.price}
        onRemove={cartItemRemoveHandler.bind(null, item.id)}
        onAdd={cartItemAddHandler.bind(null, item)}
      />
    );
  });

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onHideCart}>
        Close
      </button>
      {hasItems ? (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      ) : (
        ""
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      <ul className={classes["cart-items"]}>{cartItems}</ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {checkout ? (
        <Checkout onCancel={props.onHideCart} onConfirm={confirmOrderHandler} />
      ) : (
        ""
      )}
      {!checkout ? modalActions : ""}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;
  const submittedModalContent = (
    <React.Fragment>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onHideCart}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onHideCart={props.onHideCart}>
      {!isSubmitting && !submitted ? cartModalContent : ""}
      {isSubmitting && !submitted ? isSubmittingModalContent : ""}
      {!isSubmitting && submitted ? submittedModalContent : ""}
    </Modal>
  );
};

export default Cart;
