import React from 'react';
import Image from 'next/image';

export default function Page() {
  return (
    <div>
<header className="text-center justify-center flex bg-[#F6F5FF] mb-12 h-32 sm:h-[286px] flex-col ">
            <h1 className="text-4xl font-bold text-[#151875] ml-2 ">My Account</h1>

          </header>





    <div className="flex items-center justify-center h-screen flex-col">
        
      <form className="bg-white shadow-xl w-[300px] sm:w-[544px] h-[450px] sm:h-[474px] flex flex-col border p-7 mt-10 mb-10">
        {/* Login Heading */}
        <h1 className="text-3xl font-black text-center pb-2 mb-3">Sign up</h1>
        <p className="text-[#9096B2] text-[17px] text-center mb-10">Please Sign up using account detail bellow.</p>
     
      <div className="space-y-5 flex flex-col"> 
    <input 
    type="email"
    placeholder="Email Address"
    required
    className="text-[#9096B2] text-base border rounded-sm outline-none h-[52px] p-2 "
    >
    </input>

    <input 
    type="password"
    placeholder="Password"
    className="text-[#9096B2] text-base border rounded-sm outline-none h-[52px] p-2 "
    title='password should be atleast 8 character'
    pattern=".{5,}" 
    required
    >
    </input>
    
    </div>
    <br/>
    <button className="bg-[#FB2E86] hover:bg-[#FB2E90] text-white flex justify-center items-center font-bold h-[47px]">
        Sign up
    </button>


      </form>

<div className="">
<Image
src="/27.png"
width={904}
height={93}
alt="images"

/>
</div>


    </div>
    </div>
  );
}
