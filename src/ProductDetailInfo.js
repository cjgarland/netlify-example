import React, { useContext } from "react";
import Button from "./Button.js";
import { AppContext } from "./AppContext.js";

export default function ProductDetailInfo({ product }) {
  const {
    onProductAdd,
    onProductDelete,
    getProductQuantityFromCart,
  } = useContext(AppContext);

  const quantity = getProductQuantityFromCart(product.id);
  return (
    <>
      <p>
        {product.description} sold at <strong>${product.price}</strong> per
        piece.
      </p>
      <Button onClick={() => onProductAdd(product)}>${product.price}</Button>
      {quantity > 0 && (
        <Button
          outline
          onClick={() => onProductDelete(product.id)}
          className="product-delete"
        >
          x
        </Button>
      )}
    </>
  );
}
