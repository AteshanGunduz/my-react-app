import { useState } from "react"
import { Product1 } from "../pages/Home"
import { Address } from "../pages/Home"

type ConfirmProps = {
    handleConfirm:()=> void
    handleAddCard:(some:string)=> void
    productsIn: Product1[]
    price: number
    addedTotal: number
    address: Address[]
    lastDigits: string
}


const Confirm = ({handleConfirm, productsIn, price, addedTotal, address, handleAddCard, lastDigits}:ConfirmProps) => {
     console.log("Confirm Rendered");
    const [spinToggle, setSpinToggle] = useState<boolean>(false)

    const handleAddClick = ()=>{
        handleAddCard("")
       }

       const handleSpin = (event: React.MouseEvent<HTMLButtonElement>) => {
        setSpinToggle(prevState => !prevState)
      };
 
 
   return (
     <div className="last-confirm flex flex-col items-center gap-2">
       <button className="bg-blue-500 text-white p-2 rounded-lg font-semibold" onClick={handleConfirm}>Go Back</button>
       <div>
         <h2 className="font-semibold text-lg text-gray-700">Delivery Adress</h2>
         <div className="text-lg m-1">
         <p>{address[0].street_name}</p>
         <p>{address[0].street_address}{address[0].state}</p>
         <p>{address[0].building_number}{address[0].postcode}</p>
         </div>
         <button className="bg-orange-400 text-white p-2 rounded-lg font-semibold m-4">Change Address</button>
       </div>
       <div>
          <h2 className="font-semibold text-lg text-gray-700">Payment Method</h2>
          <div>
           <h4>This Card will be used <span className="font-semibold text-blue-600">...{lastDigits}</span></h4>
          </div>
          <div>
          </div>
          <button onClick={handleAddClick} className="bg-orange-400 text-white p-2 rounded-lg font-semibold m-4">Change Card</button>
       </div>
       <div>
          <div>
          </div>
          <h2 className="font-semibold">Estimated Delivery : 23th - 26th Sep </h2>
          <div id="bb">
            {productsIn.map((product) => (
              <div className="purchase-products flex flex-col items-center p-4 m-3" key={product.id}>
                <div className="product-info">
                <img src={((product.images as unknown) as string[])[0]} width="200px"/>
                <div>
                <div className="sss">
                 <h4 className="font-semibold">{product.title}</h4>
                 <p>Gift Card: No</p>
                 <p>${product.price}</p>
                 <p>Amount: {product.amount}</p>
               </div>
              </div>
             </div>
            </div>
          ))}
        </div>
       </div>
       <div>
          <div>
              <div className="flex flex-col gap-2">
                 {price> 0 ? (<p>Shipping Price: $5</p>): "" }
                 <h2 className="font-semibold text-xl">Total Price ${addedTotal}</h2>
                 <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam maxime porro labore optio dolorem eligendi quia iste quo maiores repellendus.</p>
              </div>
          </div>
          {!spinToggle ? (<button onClick={handleSpin} className="bg-blue-500 text-white p-3 rounded-lg font-semibold m-4 " id="buy-now">Buy Now</button>):(<div className="flex justify-center">
            <button onClick={handleSpin} className="bg-blue-500 text-white p-3 rounded-lg font-semibold m-4 flex justify-center items-center" id="buy-now">Processing<div className="animate-spin  w-9 ml-1 " >🦴</div></button>
            </div>)}
          
       </div>
     </div>
   )
 }
 export default Confirm