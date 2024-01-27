import { useState } from "react"
import { Product1 } from "../pages/Home"
import { Address } from "../pages/Home"
import { useAddress, useCreateAddress } from "../services/queries"
import { SubmitHandler, useForm } from "react-hook-form"

type ConfirmProps = {
    handleConfirm:()=> void
    handleAddCard:(some:string)=> void
    productsIn: Product1[]
    price: number
    addedTotal: number
    lastDigits: string
}


const Confirm = ({handleConfirm, productsIn, price, addedTotal, handleAddCard, lastDigits}:ConfirmProps) => {
     console.log("Confirm Rendered");
    const [spinToggle, setSpinToggle] = useState<boolean>(false)
    const [addressPage, setAddressPage] = useState<boolean>(false)

    const handleAddClick = ()=>{
        handleAddCard("")
       }

       const handleSpin = () => {
        setSpinToggle(prevState => !prevState)
      };

      const { data, error, isLoading } = useAddress();

      const createAddressMutation = useCreateAddress()
      const {register, handleSubmit} = useForm<Address>()
     
      if (isLoading) {
        console.log('Loading...');
        return <p>Loading...</p>;
      }
      if (error) {
        return <p>Error</p>;
      }

      console.log('Address:', data);

      
       const handleCreateAddressSubmit: SubmitHandler<any> = (data,e) =>{
        e?.preventDefault()
        createAddressMutation.mutate(data)
        setAddressPage(!addressPage)
     }

     const handleAdd = ()=>{
      setAddressPage(!addressPage)
     }
      
   return (
     <div className="last-confirm flex flex-col items-center gap-2">
       <button className="bg-blue-500 text-white p-2 rounded-lg font-semibold" onClick={handleConfirm}>Go Back</button>
       <div>
         <h2 className="font-semibold text-lg text-gray-700">Delivery Adress</h2>
         <div className="text-lg m-1">
         <select name="amount" className="text-blue-800">
          
          {(data as Address[] | undefined)?.map((adds:Address)=>{
            return(
              <option key={adds.id}>{adds.addName}</option>
            )
          })}
          </select>
           {addressPage && (
             <form onSubmit={handleSubmit((data, e) => handleCreateAddressSubmit(data, e))}>
              <div>
             <input placeholder="name" {...register("addName")} />
             </div>
             <div>
             <input placeholder="street" {...register("street")} />
             </div>
             <div>
             <input placeholder="apartment" {...register("apartment")} />
             </div>
             <div>
             <input placeholder="city" {...register("city")} />
             </div>
             <div>
             <input placeholder="country" {...register("country")} />
             </div>
             <button className="bg-orange-400 text-white p-2 rounded-lg font-semibold m-4">Submit</button>
           </form>

           )}
         </div>
         {!addressPage && (
         <button onClick={handleAdd} type="submit" className="bg-orange-400 text-white p-2 rounded-lg font-semibold m-4">Add Address</button>)}
         
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