import { useState, memo} from "react";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  images:[]
};

type ProductProps = {
 pro: Product[]
 handleCount: (value: string, theId: number ) => void
}

const ProductItem = ({pro, handleCount}:ProductProps) => {
    console.log("RENDERED");

    const [imageIndexes, setImageIndexes] = useState<{ [key: number]: number }>({});
    const [amountValues, setAmountValues] = useState("1")

    const handleImageClick = (productId: number) => {
      setImageIndexes((prevIndexes) => {
        const currentImageIndex = prevIndexes[productId] || 0;
        const newIndex = currentImageIndex < pro[productId].images.length - 1 ? currentImageIndex + 1 : 0;
        return {
          ...prevIndexes,
          [productId]: newIndex,
        };
      });
    };
   

  return (
    <div className="flex flex-wrap justify-center">
    {pro.map((product) => (
      <div key={product.id} className="the-products">
        
      <div className="flex flex-col justify-center items-center m-1 p-1 gap-1">
        <h3 className="font-semibold">{product.title}</h3>
        <img src={product.images[imageIndexes[product.id] || 0]} onClick={()=>handleImageClick(product.id)} width="210px"className="cursor-pointer hover:opacity-75"/>
       </div>
        
       
      <div className="flex flex-col justify-center items-center m-1 p-1 gap-1">
        <h4>${product.price}</h4>
        <h3>Amount</h3>
        <select name="amount" onChange={(e)=>{setAmountValues(e.target.value)}}>
          <option value="1" >1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <button className="buy bg-blue-500 text-white p-2 rounded-lg font-semibold m-4 transition ease-in-out bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-orange-500 duration-100 ..." onClick={()=>handleCount(amountValues, product.id)}>Add to Basket</button>
      </div>
    </div>
  ))}
  </div>
  )
}
export default memo(ProductItem)