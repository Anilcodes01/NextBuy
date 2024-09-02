"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Appbar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleDropdownClose = () => {
    setDropdownOpen(false);
  };

  return (
    <div className="relative h-16 bg-white text-black shadow-2xl flex items-center justify-between">
      <div
        onClick={() => {
          router.push("/");
        }}
        className="ml-16 cursor-pointer font-bold text-2xl"
      >
        NextBuy
      </div>
      <div className="flex gap-8 mr-16">
        <button
          onClick={() => {
            router.push("/");
          }}
        >
          Home
        </button>
        <button
          onClick={() => {
            router.push("/allproducts");
          }}
        >
          Products
        </button>
       
        <button onClick={() => {
          router.push('/aboutUs')
        }}>About Us</button>
        <button
          onClick={() => {
            router.push("/cart");
          }}
        >
          Cart
        </button>
        <div className="relative cursor-pointer flex items-center">
          {session?.user ? (
            <>
              <div onClick={handleDropdownToggle} className="flex items-center">
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt="User Profile Picture"
                    width={28}
                    height={28}
                    className="rounded-full border"
                  />
                ) : (
                  <div className="flex items-center justify-center h-7 w-7 rounded-full border bg-gray-200 text-black">
                    {session.user.name?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              {dropdownOpen && (
                <div
                  className="absolute right-0 mt-48 w-48 bg-white border rounded-lg shadow-lg"
                  onMouseLeave={handleDropdownClose}
                >
                  <div className="p-4 flex flex-col items-center">
                    {session.user.image && (
                      <Image
                        src={session.user.image}
                        alt="User Profile Picture"
                        width={40}
                        height={40}
                        className="rounded-full border"
                      />
                    )}
                    <div className="mt-2 text-center">
                      <p className="font-bold">{session.user.name}</p>
                      <p className="text-sm text-gray-600">{session.user.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        signOut({
                          callbackUrl: '/signin'
                        })
                     
                        handleDropdownClose();
                      }}
                      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div
              onClick={() => {
                router.push("/signin");
              }}
            >
              Signin
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
