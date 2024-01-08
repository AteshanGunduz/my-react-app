import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar';
import { useState, useEffect, ChangeEvent } from 'react';
import ProductItem from '../components/ProductItem';
import Confirm from '../components/Confirm';
import AddCard from '../components/AddCard';


export type Address = {
  street_name: string;
  street_address: string;
  building_number: string;
  state: string;
  postcode: string;
}


export type Product1 = {
  id: number;
  title: string;
  price: number;
  description: string;
  images:[] 
  amount: number
};

type ProductWithAmount = Product1 & { amount: number };


type HomeProps = {
    products: Product1[] 
    address: Address[]
  };


const Home = ({products, address}:HomeProps) => {

      const [pro, setPro] = useState(products)
      const [filter, setFilter] = useState(false)

      const [count, setCount] = useState(0)

      const [basketToggle, setBasketToggle] = useState(false)
      const [basketClass, setBasketClass] = useState("")
      const [productsIn, setProductsIn] = useState<Product1[]>([])
      const [price, setPrice] = useState(0)

      const [confirm, setConfirm] = useState(false)
      const [cardToggle, setCardToggle] = useState(false)

      const[lastDigits, setLastDigits] = useState("")


      //Display Default
      useEffect(() => {
        setPro(products)
      }, [products])

      //Search Handle
      const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const filteredProduct = products.filter((product) =>
          product.title.toLowerCase().startsWith(e.target.value.toLowerCase())
        );
        setPro(filteredProduct);
        if (e.target.value.trim() === "") {
          setPro(products)
        }
      };
     
      // Filter Handles
      const handleClick = ()=>{
        setFilter(!filter)
      }
      
      const handleLow = ()=>{
        const sortedProducts = [...products].sort((a, b) => a.price - b.price)
        setPro(sortedProducts)
        setFilter(false)
      }
  
      const handleHigh = ()=>{
        const sortedProducts = [...products].sort((a, b) => b.price - a.price)
        setPro(sortedProducts)
        setFilter(false)
      }
  
      const handleDefault = ()=>{
        const defaultProducts = [...products];
        setPro(defaultProducts)
        setFilter(false)
      }

      //Basket Handles
      //Updates the count, finds the matching ids, if matching ids is not included previous create new array of them. Add amount to their objects
      //and update the price accordingly to that amount

      const handleCount = (value: string, theId: number) => {
        

        const filteredProduct = pro.find((product) => theId === product.id);
        
        if (filteredProduct && productsIn.some((product) => product.id === filteredProduct.id)) {
          return productsIn
        } else {
          setCount((prevCount) => prevCount + +value); 
          setProductsIn((prevProductsIn) => {
            const updatedProductsIn: (Product1 | ProductWithAmount)[] = [...prevProductsIn, { ...filteredProduct, amount: +value } as ProductWithAmount];
        
            const totalPrice = updatedProductsIn.reduce(
              (total, product) => total + (product.price) * product.amount,
              0
            );
        
        setPrice(() => totalPrice)
    
        return updatedProductsIn
      });
    }

      };

      const addedTotal = price + 5
      
      // Class Handles when clicked basket

      const handleBasketClick = ()=>{
        setBasketToggle(!basketToggle)
        if(basketClass === ""){
        setBasketClass("toggled-bg")
       } else {
        setBasketClass("")
       }
      }
      
      const handleBack = ()=>{
        setBasketToggle(false)
        if(basketClass === ""){
          setBasketClass("toggled-bg")
         } else {
          setBasketClass("")
         }
         setCount(() => {
          const totalCount = productsIn.reduce((total, product) => total + +product.amount, 0);
          return totalCount;
        });
         
      }

      // Deletes selected product from basket arranges the final price
      const handleBasketDelete = (id:number): void=>{
        const updatedProductsIn = productsIn.filter((product)=>{
          return !(product.id == id)
        })
    
        setProductsIn(updatedProductsIn)
    
        const totalPrice = updatedProductsIn.reduce(
          (total, product) => total + product.price * product.amount,
          0
        );
    
        setPrice(()=>totalPrice)
      }
      

      
      function handleBasketAmount(e: ChangeEvent<HTMLSelectElement>, id: number): void {
        const newAmount = parseInt(e.target.value, 10);
      
        setProductsIn((prevProductsIn) => {
          const updatedProductsIn: (Product1 | ProductWithAmount)[] = prevProductsIn.map((product) =>
            product.id === id ? { ...product, amount: newAmount } : product
          );
      
          const totalPrice = updatedProductsIn.reduce(
            (total, product) => total + product.price * (product.amount || 1), 
            0
          );
      
          setPrice(totalPrice)
          return updatedProductsIn
        });
      }


      // Close basket open Confirm
      const handleConfirm = ()=>{
        setBasketToggle(!basketToggle)
        setConfirm(!confirm)
       }
     // Open AddCard page
       const handleAddCard = (last4digit: string)=>{
        setCardToggle(!cardToggle)
        setLastDigits(last4digit)
      }
    



  return (
    <>
    <Navbar />
    <section className='section '>
    <Outlet/>
      <div className={`flex flex-col items-center ${basketClass}`}>
          <div className="filter-basket flex justify-between m-10">
              <div className="flex justift-start items-start ml-2">
              <div className='rounded-lg border-solid border-2 border-orange-400 bg-white m-2'>
            <input type="text" className=' m-1 pl-1 ' onChange={handleChange} placeholder='Search for products'/>
            </div>
              <p className='p-2 cursor-pointer font-semibold'  onClick={handleClick}>Filter 📅</p>
              {filter && (
                  <div className="ml-2 flex flex-col justify-start items-start font-semibold p-1 gap-1">
                    <button onClick={handleDefault}>Featured</button>
                    <button onClick={handleHigh}>High to Low</button>
                    <button onClick={handleLow}>Low to High</button>
                  </div>                
              )}
              
              
              </div> 
              <button className={`text-3xl font-semibold ${(count>0) ? "animate-bounce" : ""} `} onClick={handleBasketClick}>🧺<span className='text-lg m-2'>{count}</span></button>
               
         </div>
         
        </div>
        <div className={`flex flex-wrap justify-center ${basketClass}`}>
        {pro.map((product) => (
        <ProductItem key={product.id} product={product} handleCount={handleCount}/>
      ))}
      </div>
      {basketToggle && (
      <div className="basket-page flex flex-col items-center gap-3">
        <button onClick={handleBack} className="back-shopping bg-blue-500 text-white p-2 rounded-lg font-semibold">Back to Shopping</button>
        {price >  0 ? (<div className='text-gray-500'>Wonderful Choise</div>) : (<div className='text-gray-500'>Basket is Empty</div>) }
        {productsIn.map((product) => (
        <div className="purchase-products flex flex-col justify-center items-center gap-2 p-4 " key={product.id}>
          <div className="product-info">
          <img src={((product.images as unknown) as string[])[0]} width="200px"/>
          <div>
          <div className="sss">
          <h4 className='font-semibold'>{product.title}</h4>
          <p>Large</p>
          <p className='font-semibold'>${product.price}</p>
          <select name="amount" value={product.amount} id="amount" onChange={(e)=>handleBasketAmount(e,product.id)}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
        </select>
        </div>
          </div>
          <button onClick={()=>handleBasketDelete(product.id)}>🗑️</button>
          </div>
        </div>
      ))}
      <div className="confirm-container flex flex-col gap-3">
      {price> 0 ? (<p>Shipping Price: $5</p>): "" }
       
       <h4 className='font-semibold'>Total Price: ${price> 0 ? addedTotal-5 : 0 }</h4>
       <button onClick={handleConfirm}  className="confirm-purchase bg-blue-500 text-white p-2 rounded-lg font-semibold">Confirm Purchase</button>
       </div>
      </div>
    )}
    {confirm && (
    <div>
     <Confirm lastDigits={lastDigits} handleConfirm={handleConfirm} handleAddCard={handleAddCard} productsIn={productsIn} price={price} addedTotal={addedTotal} address={address}/>
    </div>
    )}
    {cardToggle && (
    <div className="the-card">
     <AddCard handleAddCard={handleAddCard} />
    </div>
    )}
    </section>
    </>
  )
}

export default Home;
