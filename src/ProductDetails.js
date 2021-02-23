import React, { useState, useEffect, useContext } from "react";
import {
  NavLink,
  Switch,
  Route,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import useFetch from "./useFetch.js";
import ProductDetailInfo from "./ProductDetailInfo.js";
import ProductDetailNutrition from "./ProductDetailNutrition.js";
import ProductDetailStorage from "./ProductDetailStorage.js";
import { AppContext } from "./AppContext.js";

export default function ProductDetails() {
  const [product, setProduct] = useState({});
  const { get } = useFetch("https://react-tutorial-demo.firebaseio.com/");
  const params = useParams();
  const match = useRouteMatch();
  const { getProductQuantityFromCart } = useContext(AppContext);
  const quantity = getProductQuantityFromCart(product.id);

  useEffect(() => {
    get(`productinfo/id${params.id}.json`)
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => console.log("Could not load product details", error));
  }, [get, params.id]);

  return (
    <div className="product">
      <div className="product-image-container">
        <img
          src={product.image}
          width="100"
          height="100"
          className="product-image"
          alt={product.name}
        />
        {quantity > 0 && (
          <div className="product-quantity-container">
            <div className="product-quantity">{quantity}</div>
          </div>
        )}
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
      </div>

      <div>
        <div className="tabs">
          <ul>
            <li>
              <NavLink exact activeClassName="tab-active" to={match.url}>
                Details
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                activeClassName="tab-active"
                to={match.url + "/nutrition"}
              >
                Nutrition
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                activeClassName="tab-active"
                to={match.url + "/storage"}
              >
                Storage
              </NavLink>
            </li>
          </ul>
        </div>
        <Switch>
          <Route exact path={match.path}>
            <ProductDetailInfo product={product} />
          </Route>

          <Route path={match.path + "/nutrition"}>
            <ProductDetailNutrition nutrition={product.nutrition} />
          </Route>

          <Route path={match.path + "/storage"}>
            <ProductDetailStorage storage={product.storage} />
          </Route>
        </Switch>
      </div>
    </div>
  );
}
