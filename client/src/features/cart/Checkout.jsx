import React from 'react'
import CheckoutSummary from "../cart/CartSummary";
import Recipient from './Recipient'

const Checkout = () => {
  return (
    <>
      <div className="bg-[#2F2F2F] text-white wrapper grid lg:grid-cols-3 gap-[20px]">
        <Recipient />
       <CheckoutSummary/>
      </div>
    </>
  );
}

export default Checkout