import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const [Search, setSearch] = useState("");
  const [ShowSearch, setShowSearch] = useState(false);
  const [CartItems, setCartItems] = useState({});
  const [products, setproducts] = useState([]);
  const [token, settoken] = useState("");
  const navigate = useNavigate();

  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const AddToCart = async (itemId, size) => {
    let CartData = structuredClone(CartItems);
    if (!size) {
      toast.error("Please Add a Size");
      return;
    }

    if (CartData[itemId]) {
      if (CartData[itemId][size]) {
        CartData[itemId][size] += 1;
      } else {
        CartData[itemId][size] = 1;
      }
    } else {
      CartData[itemId] = {};
      CartData[itemId][size] = 1;
    }

    setCartItems(CartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId, size },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message)
      }
    }
  };

  //cart quantity function
  const getCartQuantity = () => {
    let totalQuantity = 0;
    for (const items in CartItems) {
      for (const item in CartItems[items]) {
        try {
          if (CartItems[items][item] > 0) {
            totalQuantity += CartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalQuantity;
  };

  //update quantity function
  const updateQuantity = async ( itemId, size, quantity ) => {
    let cartData = structuredClone(CartItems);
    cartData[itemId][size] = quantity;

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, size, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  //get product quantity
  const getCartAmmount = () => {
    let totalAmmount = 0;
    for (const items in CartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in CartItems[items]) {
        try {
          if (CartItems[items][item]) {
            totalAmmount += itemInfo.price * CartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalAmmount;
  };

  //get product data
  const getProductData = async () => {
    try {
      const responce = await axios.get(backendUrl + "/api/product/list");
      if (responce.data.success) {
        setproducts(responce.data.products);
      } else {
        toast.error(responce.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getUserCart = async ( token ) => {
    try {
      const responce = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        { headers: { token } }
      );
      if (responce.data.success) {
        setCartItems(responce.data.cartData);
        
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      settoken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
    }
  }, []);

  const value = {
    products,
    currency,
    delivery_fee,
    Search,
    setSearch,
    ShowSearch,
    setShowSearch,
    AddToCart,
    CartItems,
    setCartItems,
    getCartQuantity,
    updateQuantity,
    getCartAmmount,
    navigate,
    backendUrl,
    settoken,
    token,
  };
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
