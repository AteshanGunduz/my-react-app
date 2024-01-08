import { useState, useEffect } from "react";

type urlProp = {
  url: string
}

export const useFetch = ({url}: urlProp) => {
  const [products, setProducts] = useState([]);
  const [address, setAddress] = useState([])

  const getProducts = async () => {
    try {
      const response = await fetch(url);
      const productsData = await response.json();
      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getAddress = async () =>{
    try {
      const response = await fetch("https://random-data-api.com/api/v2/addresses?size=5")
      const adressData = await response.json()
      setAddress(adressData)
    } catch (error){
      console.log("Error Address not found");
    }
  } 


  useEffect(() => {
    getProducts();
    getAddress()
  }, []);

  return {products, address};
};
