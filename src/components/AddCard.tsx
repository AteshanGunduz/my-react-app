import { useEffect, useState } from "react"

type AddCardProps = {
    handleAddCard: (addedCardNumber:string)=>void
}


const AddCard = ({handleAddCard}: AddCardProps) => {

  const [cardNumber, setCardNumber] = useState("")
  const [name, setName] = useState("")
  const [valid, setValid] = useState("")
  const [cvc, setCvc] = useState("")

  const [accountName, setAccountName] = useState("")
  const [email, setEmail] = useState("")
  const [cardBack, setCardBack] =useState(false)

  const [addedCardNumber, setAddedCardNumber] = useState("")

    const handleBackToConfirm = ()=>{
        handleAddCard("")
    }

    const handleClickCvc = ()=>{
        setCardBack(true)
    }

    const handleClickFront = ()=>{
        setCardBack(false)
    }

    const handleSubmit = () => {
        if (
          accountName.trim() === '' ||
          email.trim() === '' ||
          cardNumber.trim() === '' ||
          name.trim() === '' ||
          valid.trim() === '' ||
          cvc.trim() === ''
        ) {
          alert('Please fill out all required fields');
          return;
        }
      
        handleAddCard(cardNumber.slice(12));
      }

  const formatCardNumber = (input: string) => {
    const formattedInput = input.replace(/\D/g, ''); // Remove non-numeric characters
    const parts = formattedInput.match(/[\s\S]{1,4}/g) || []; // Split into groups of four digits
    return parts.join(' '); // Join the groups with a space
  };

  const formatCvc = (input: string) => {
    const formattedInput = input.replace(/\D/g, '');
    return formattedInput
  };

  const formatValidThru = (input: string) => {
    const formattedInput = input.replace(/\D/g, ''); 
    const month = formattedInput.substring(0, 2);
    const year = formattedInput.substring(2, 4);
    return `${month}/${year}`;
  };

  const handleReset = ()=>{
    setName("")
    setValid("")
    setCardNumber("")
    setCvc("")
    setAccountName("")
    setEmail("")
  }


  return (
    <div className="payment-container rounded-xl flex flex-col justify-center items-center">
      <button className="bg-blue-500 text-white p-2 rounded-lg font-semibold m-3" onClick={handleBackToConfirm}>Go Back</button>
      <h2 className="mb-4 font-semibold text-lg text-gray-600">Add your payment adress</h2>
      {!cardBack ? (
         <div className="card rounded-xl flex flex-col justify-center items-center gap-8">
         <div id="card-img"className="card-special flex flex justify-between items-center">
           <img src="/chip.png" alt="" width="50px"/>
           <img src="/ma_symbol.svg" alt="" width="90px" />
         </div>
         <div className="number-card">
           <h2 className="text-xl font-bold mr-10">{formatCardNumber(cardNumber)} </h2>
         </div>
         <div className="card-special flex justify-between items-center">
            <h2 className="text-lg font-semibold">{name}</h2>
            <h3 className="font-semibold">{formatValidThru(valid)}</h3>
         </div>
       </div>

      ) : (
        <div className="card-back rounded-xl flex flex-col justify-center items-center ">
        <div className="card-black">
        </div>
        <div className="card-cvc">
          <h2 className="text-md font-bold mr-6 mt-2">{formatCvc(cvc)}</h2>
        </div>
        <div className="flex justify-between items-center m-2">
        <img src="/ma_symbol.svg" alt="" width="90px" />
        </div>
      </div>
      )}
   
      <div className="card-inputs flex justify-evenly mt-4 p-2">
        <div className="input-containers">
        <input type="text" value={accountName} placeholder=" Name your Card" onChange={(e)=>{setAccountName(e.target.value)}}/>
        </div>
        <div className="input-containers">
        <input type="email" value={email} placeholder=" Your Email" onChange={(e)=>{setEmail(e.target.value)}}/>
        </div>
      </div>
      <div className="flex flex-col justify-evenly ">
        <div className="input-containers">
        <input className="mb-2" maxLength={16} type="text" value={cardNumber} placeholder=" Card Number" onFocus={handleClickFront} onChange={(e)=>{setCardNumber(e.target.value)}} />
        </div>
        <div className="input-containers">
        <input type="text" placeholder=" Name on the Card" maxLength={25} value={name} onFocus={handleClickFront} onChange={(e) => { const updatedValue = e.target.value.replace(/[^a-zA-Z\s]/g, '');
        setName(updatedValue);
        }}/>
        </div>

      </div>
      <div className="special-card-inputs flex justify-evenly">
        <div className="input-containers">
        <input type="text" maxLength={5} value={valid} placeholder=" Valid Thru" onFocus={handleClickFront} onChange={(e)=>{setValid(e.target.value)}}/>
        </div>
        <div className="input-containers">
        <input type="text" maxLength={3} value={cvc} placeholder=" CVC" onFocus={handleClickCvc} onChange={(e)=>{setCvc(e.target.value)}}/>
     </div>

      </div>
      <div className="flex justify-center">
        <button type="submit" className=" bg-blue-500 text-white p-2 rounded-lg font-semibold m-4" onClick={handleSubmit} >Submit</button>
        <button className=" bg-blue-500 text-white p-2 rounded-lg font-semibold m-4" onClick={handleReset}>Reset</button>
      </div>
    </div>
  )
}
export default AddCard