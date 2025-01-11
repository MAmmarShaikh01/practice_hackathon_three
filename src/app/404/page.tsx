import Image from 'next/image'

export default function AboutUs() { 
  return (
    <div className="min-h-screen ">
<header className="text-center justify-center flex bg-[#F6F5FF] mb-12 h-32 sm:h-[286px] flex-col ">
            <h1 className="text-4xl font-bold text-[#151875] ml-2 ">404 Not Found</h1>
            <p className="text-[#8A8FB9]">
              Home &gt; Pages &gt; <span className="text-blue-600">404 Not Found</span>
            </p>
          </header>

    <div className='flex justify-center items-center w-full flex-col'>
          <Image
          
          src={'/image.png'}
          width={500}
          height={500}
          alt='hi'
          className='w-3/4'
          
          />
        <h1 className='text-[#151875] text-2xl font-700 my-10'> The page you requested was not found!</h1>
          </div>
      {/* Main Content */}
      
    </div>
  )
}
