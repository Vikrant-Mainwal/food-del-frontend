import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "https://food-del-backend-j6pf.onrender.com";
  const [token,setToken] = useState("")
  const [food_list,setFoodList] = useState([])

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
    }
  };
  const removeCartItems = async(itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
    }
  };

  const getTotalCartAmount = () => {
  return Object.keys(cartItems).reduce((total, itemId) => {
    const product = food_list.find(p => p._id === itemId);
    if (!product) return total;
    return total + product.price * cartItems[itemId];
  }, 0);
};

  const fetchFoodList =async()=>{
  const response = await axios.get(url+'/api/food/list')
  setFoodList(response.data.data)
  }

  const loadCartData = async(token)=>{
    const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
    console.log(response.data.cartData)
    setCartItems(response.data.cartData)

  }

  useEffect(()=>{
    async function loadData(){
      await fetchFoodList()

      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"))
        await loadCartData(localStorage.getItem("token"))     
     }
    }
   loadData()
  },[])

  
 

    // Dependency array ensures this runs once when the component mounts
  
  const contextValue = {
    food_list,
    addToCart,
    removeCartItems,
    cartItems,
    setCartItems,
    getTotalCartAmount,
    url,
    token, setToken,setFoodList
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
