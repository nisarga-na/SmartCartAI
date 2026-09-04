import { useState } from "react";
import "../styles/Home.css";

import {
  searchProducts,
  optimizeCart,
  selectProduct
} from "../services/api";

function Home() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  //---------------------------------------
  // SEARCH PRODUCTS
  //---------------------------------------

  async function handleSearch() {
    if (query.trim() === "") {
      setProducts([]);
      return;
    }

    setLoading(true);

    try {
      const data = await searchProducts(query);

      setProducts(data.products || []);
    }
    catch (error) {
      console.error(error);
    }

    setLoading(false);
  }

  //---------------------------------------
  // TRENDING SEARCH
  //---------------------------------------

  function quickSearch(item) {
    setQuery(item);

    setTimeout(() => {
      handleSearch();
    }, 100);
  }

  //---------------------------------------
  // ADD TO CART
  //---------------------------------------

  async function handleSelectProduct(
    product
  ) {

    try {

      const data =
        await selectProduct(
          product.id
        );

      const exists =
        cart.find(
          item =>
            item.productId ===
            data.productId
        );

      if (exists) {

        alert(
          "Already in cart"
        );

        return;
      }

      const newItem = {

        productId:
          data.productId,

        product:
          product.name,

        quantity:
          1
      };

      setCart([
        ...cart,
        newItem
      ]);

      setQuery("");
      setProducts([]);
      setResult(null);
    }

    catch (error) {

      console.error(error);

      alert(
        "Selection failed"
      );
    }
  }

  //---------------------------------------
  // QUANTITY
  //---------------------------------------

  function increaseQuantity(
    productName
  ) {

    const updated =
      cart.map(
        item =>
          item.product === productName
            ? {
                ...item,
                quantity:
                  item.quantity + 1
              }
            : item
      );

    setCart(updated);
  }

  function decreaseQuantity(
    productName
  ) {

    const updated =
      cart.map(
        item =>
          item.product === productName
            ? {
                ...item,
                quantity:
                  item.quantity > 1
                    ? item.quantity - 1
                    : 1
              }
            : item
      );

    setCart(updated);
  }

  //---------------------------------------
  // REMOVE PRODUCT
  //---------------------------------------

  function removeProduct(
    productName
  ) {

    const updated =
      cart.filter(
        item =>
          item.product !==
          productName
      );

    setCart(updated);
  }

  //---------------------------------------
  // OPTIMIZE
  //---------------------------------------

  async function handleOptimize() {

    if (
      cart.length === 0
    ) {

      alert(
        "Cart is empty"
      );

      return;
    }

    try {

      const data =
        await optimizeCart(
          cart
        );

      setResult(data);
    }

    catch (error) {

      console.error(error);

      alert(
        "Optimization failed"
      );
    }
  }

  return (

    <div className="home-container">

      <div className="card">

        {/* HERO */}

        <h1 className="title">
          🛒 SmartCart AI
        </h1>

        <p className="subtitle">
          Compare grocery prices across platforms instantly and save money.
        </p>
        <div className="hero-banner">
    🥛 Milk • 🍚 Rice • 🍞 Bread • 🥬 Vegetables • 🛒 Smart Savings
</div>

        {/* SEARCH */}

        <div className="search-container">

          <input
            className="search-input"
            placeholder="Search Milk, Rice, Atta, Bread..."
            value={query}
            onChange={(e) =>
              setQuery(
                e.target.value
              )
            }
            onKeyDown={(e) => {

              if (
                e.key === "Enter"
              ) {

                handleSearch();
              }
            }}
          />

          <button
            className="search-btn"
            onClick={handleSearch}
          >
            🔍 Search
          </button>

        </div>

        {/* TRENDING */}

        <div className="trending">

          <span>
            🔥 Trending:
          </span>

          <button
            onClick={() =>
              quickSearch(
                "milk"
              )
            }
          >
            Milk
          </button>

          <button
            onClick={() =>
              quickSearch(
                "rice"
              )
            }
          >
            Rice
          </button>

          <button
            onClick={() =>
              quickSearch(
                "atta"
              )
            }
          >
            Atta
          </button>

          <button
            onClick={() =>
              quickSearch(
                "bread"
              )
            }
          >
            Bread
          </button>

          <button
            onClick={() =>
              quickSearch(
                "maggi"
              )
            }
          >
            Maggi
          </button>

        </div>

        {/* LOADING */}

        {
          loading &&
          (
            <p>
              Searching products...
            </p>
          )
        }

        {/* SEARCH RESULTS */}

        {
          products.length > 0 &&
          (
            <>
              <h3>
                🛍 Search Results
              </h3>

              <div className="product-cards">

                {
                  products.map(
                    (
                      item,
                      index
                    ) => (

                      <div
                        key={index}
                        className="product-card"
                      >

                        <h4>
                          {item.name}
                        </h4>


                        <button
                          className="select-btn"
                          onClick={() =>
                            handleSelectProduct(
                              item
                            )
                          }
                        >
                          Add To Cart 🛒
                        </button>

                      </div>
                    )
                  )
                }

              </div>
            </>
          )
        }

        {/* CART */}

        <h3>
          🛒 Shopping Cart
          (
          {cart.length}
          )
        </h3>

        <div className="cart-section">

          {
            cart.map(
              (
                item,
                index
              ) => (

                <div
                  key={index}
                  className="cart-row"
                >

                  <p>
                    {item.product}
                  </p>

                  <div className="qty-controls">

                    <button
                      onClick={() =>
                        decreaseQuantity(
                          item.product
                        )
                      }
                    >
                      -
                    </button>

                    <span>
                      {
                        item.quantity
                      }
                    </span>

                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.product
                        )
                      }
                    >
                      +
                    </button>

                    <button
                      className="remove-btn"
                      onClick={() =>
                        removeProduct(
                          item.product
                        )
                      }
                    >
                      ❌
                    </button>

                  </div>

                </div>
              )
            )
          }

        </div>

        {/* OPTIMIZE */}

        <button
          className="optimize-btn"
          onClick={
            handleOptimize
          }
        >
          💰 Find Cheapest Cart
        </button>

        {/* RESULTS */}

        {
          result &&
          (
            <div className="result-card">

              <h2>
                🎯 SmartCart Analysis
              </h2>

              <div className="platform-price">

                <span>
                  🟡 Blinkit Total
                </span>

                <strong>
                  {
                    result.strategies
                      ?.blinkitOnly !== null
                      ? `₹${result.strategies.blinkitOnly}`
                      : "Unavailable"
                  }
                </strong>

              </div>

              <div className="platform-price">

                <span>
                  ⚪ Zepto Total
                </span>

                <strong>
                  {
                    result.strategies
                      ?.zeptoOnly !== null
                      ? `₹${result.strategies.zeptoOnly}`
                      : "Unavailable"
                  }
                </strong>

              </div>

              <div className="platform-price best-price">

                <span>
                  🏆 Hybrid SmartCart Total
                </span>

                <strong>
                  ₹{
                    result.strategies
                      ?.cheapestMix
                  }
                </strong>

              </div>

              <h3>
                {
                  result.recommendation
                }
              </h3>

            </div>
          )
        }

      </div>

    </div>
  );
}

export default Home;