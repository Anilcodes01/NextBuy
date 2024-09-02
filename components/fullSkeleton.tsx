
import Appbar from "@/components/appbar"


export default function Skeleton()  {
    return  <div className="bg-white min-h-screen">
    <div>
      <Appbar />
    </div>
    <div className="p-8  flex justify-around text-black">
        <div className="border p-4 rounded-lg w-1/3 shadow-lg bg-white">
          
        <div className="h-[60vh] bg-gray-200 rounded  w-full mb-4"></div>
        </div>
        <div className="w-1/2">
        <div className="h-12 bg-gray-200 rounded  w-2/3 mb-4"></div>
        <div className="h-8 bg-gray-200 rounded  w-48 mb-5"></div>
        <div className="h-6 bg-gray-200 rounded   w-full mb-3"></div>
        <div className="h-6 bg-gray-200 rounded   w-full mb-3"></div>
        <div className="h-6 bg-gray-200 rounded  w-full mb-4"></div>
          <button className="bg-gray-200 h-10 rounded-full text-white w-full p-2 mt-4"></button>
        </div>
      </div>

    <div className="h-48 bg-gray-200   w-full "></div>
  </div>
  
}



// <div role="status" class="max-w-sm animate-pulse">
//     <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
//     <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
//     <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
//     <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
//     <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
//     <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
//     <span class="sr-only">Loading...</span>
// </div>

