import React, { useState, useEffect, createContext } from "react";

const AppContext = createContext();

function AppProvider(props) {
  const [cart, setCart] = useState(function () {
    let savedCart = [];
    try {
      savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    } catch (error) {
      savedCart = [];
    }
    return savedCart;
  });

  useEffect(() => {
    if (cart) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  function handleProductDelete(id) {
    const updatedCart = cart.filter((product) => product.id !== id);
    setCart(updatedCart);
  }

  function handleProductAdd(newProduct) {
    // check if item exists
    const existingProduct = cart.find(
      (product) => product.id === newProduct.id
    );
    if (existingProduct) {
      // increase quantity
      const updatedCart = cart.map((product) => {
        if (product.id === newProduct.id) {
          return {
            ...product,
            quantity: product.quantity + 1,
          };
        }
        return product;
      });
      setCart(updatedCart);
    } else {
      // product is new to the cart
      setCart([
        ...cart,
        {
          ...newProduct,
          quantity: 1,
        },
      ]);
    }
  }

  const getCartCount = () =>
    cart.reduce((total, product) => total + product.quantity, 0);
  const getTotalPrice = () =>
    cart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  const getProductFromCart = (id) => cart.find((product) => product.id === id);

  function getProductQuantityFromCart(id) {
    const productFromCart = cart.find((product) => product.id === id);
    return productFromCart ? productFromCart.quantity : 0;
  }

  const cartData = {
    cart,
    onProductAdd: handleProductAdd,
    onProductDelete: handleProductDelete,
    getCartCount,
    getTotalPrice,
    getProductFromCart,
    getProductQuantityFromCart,
  };

  return (
    <AppContext.Provider value={cartData}>{props.children}</AppContext.Provider>
  );
}

export { AppContext, AppProvider };
