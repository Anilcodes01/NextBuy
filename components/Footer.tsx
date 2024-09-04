'use client'
import toast, { Toaster } from 'react-hot-toast';

export default function Footer() {

  const notify = () => toast.error("Failed to subscribe to our Newsletter!");

  return (
    <div className="text-black mt-4 flex flex-col md:flex-row justify-between items-center h-auto bg-slate-200 p-6 md:h-[32vh]">
      <div className="flex flex-col ml-0 md:ml-16 gap-8 md:gap-16 w-full md:w-auto">
        <div className="flex flex-col justify-start gap-2">
          <div>Subscribe to our Newsletter!</div>
          <div className="flex flex-col   md:flex-row  items-center gap-2">
            <input
              className="p-1 border outline-none rounded w-full md:w-auto"
              type="text"
              placeholder="Enter your Email"
            />
            <button
              onClick={notify}
              className="bg-black text-center  rounded-full text-sm w-24 p-1 text-white"
            >
              Subscribe
            </button>
          </div>
        </div>
        <div className="text-center md:text-left">
          <div>&copy; 2024 NextBuy.Inc</div>
          <div>Handcrafted with ❤️ by Anil</div>
        </div>
      </div>
      <div className="flex   md:flex-row justify-center gap-8 md:gap-12 mt-8 md:mt-0 w-full md:w-auto">
        <div className="flex gap-2 flex-col items-center md:items-start">
          <div className="font-semibold text-lg">Products</div>
          <div className="flex flex-col gap-1 items-center md:items-start text-sm">
            <button className="hover:underline">Accessories</button>
            <button className="hover:underline">Headphones</button>
          </div>
        </div>
        <div className="flex gap-2 flex-col items-center md:items-start">
          <div className="font-semibold text-lg">Support</div>
          <div className="flex flex-col gap-1 items-center md:items-start text-sm">
            <button className="hover:underline">Features</button>
            <button className="hover:underline">About Us</button>
            <button className="hover:underline">Contact Us</button>
          </div>
        </div>
      </div>
      <Toaster 
        position="bottom-left"
        toastOptions={{
          style: {
            minWidth: '360px',
          },
        }}
      />
    </div>
  );
}
