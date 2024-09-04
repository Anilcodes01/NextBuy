'use client'
import toast, { Toaster } from 'react-hot-toast';

export default function Footer() {

  const notify = () => toast.error("Failed to subscribe to our Newsletter! ")
    return <div className="text-black mt-4 flex justify-between items-center h-[32vh] bg-slate-200">
        <div className="flex flex-col  ml-16 gap-16">
          <div className="flex flex-col justify-start gap-2">
          <div>
           Subscribe to our Newsletter!
           </div>
            <div className="flex gap-2"> 
                <input className="p-1 border outline-none rounded" type="text" placeholder="Enter your Email"/>
                <button onClick={notify} className="bg-black rounded-full text-sm w-24 p-1 text-white">Subscribe</button>
            </div>

          </div>
          <div>
            <div> &copy; 2024 NextBuy.Inc</div>
            <div>Handcrafted with ❤️ by Anil</div>

          </div>
        </div>
        <div className="flex gap-12 mr-24">
            <div className="flex gap-2 flex-col">
                <div className="font-semibold text-lg">
                Products
                </div>
               <div className="flex flex-col gap-1 items-start text-sm ">
               <button className="hover:underline">Accessories</button>
                <button className="hover:underline">Headphones</button>
                
               </div>
               
                
            </div>
            <div>
            <div className="flex gap-2 flex-col">
                <div className="font-semibold text-lg ">
                Support
                </div>
               <div className="flex flex-col gap-1 items-start text-sm ">
               <button className="hover:underline">Features</button>
                <button className="hover:underline">About Us</button>
                <button className="hover:underline">Contact Us</button>
                
               </div>
               
                
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
}