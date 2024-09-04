"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Appbar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleDropdownClose = () => {
    setDropdownOpen(false);
  };

  const handleNavToggle = () => {
    setNavOpen(!navOpen);
  };

  return (
    <div className="relative h-16 bg-white text-black shadow-2xl flex items-center justify-between px-4 sm:px-8">
      <div
        onClick={() => {
          router.push("/");
        }}
        className="cursor-pointer font-bold text-xl sm:text-2xl"
      >
        NextBuy
      </div>

      <div className="flex items-center">
        <div className="hidden sm:flex gap-8">
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
          <button
            onClick={() => {
              router.push("/aboutUs");
            }}
          >
            About Us
          </button>
          <button
            onClick={() => {
              router.push("/cart");
            }}
          >
            Cart
          </button>
        </div>

        <div className="relative flex items-center ml-4 sm:ml-8">
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
                  className="absolute right-0 mt-2 sm:mt-48 w-48 bg-white border rounded-lg shadow-lg"
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
                        });
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
                router.push("/signup");
              }}
              className="hidden sm:block"
            >
              Signup
            </div>
          )}
        </div>

        <div className="sm:hidden ml-4">
          <button onClick={handleNavToggle} className="text-2xl">
            ☰
          </button>
        </div>
      </div>

      {navOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-2xl flex flex-col items-start p-4 sm:hidden">
          <button
            onClick={() => {
              router.push("/");
              setNavOpen(false);
            }}
            className="mb-2 hover:bg-slate-100 w-full p-1  text-left"
          >
            Home
          </button>
          <button
            onClick={() => {
              router.push("/allproducts");
              setNavOpen(false);
            }}
            className="mb-2 hover:bg-slate-100 w-full p-1  text-left"
          >
            Products
          </button>
          <button
            onClick={() => {
              router.push("/aboutUs");
              setNavOpen(false);
            }}
            className="mb-2 hover:bg-slate-100 w-full p-1  text-left"
          >
            About Us
          </button>
          <button
            onClick={() => {
              router.push("/cart");
              setNavOpen(false);
            }}
            className="mb-2 hover:bg-slate-100 w-full p-1  text-left"
          >
            Cart
          </button>
          {!session?.user && (
            <button
              onClick={() => {
                router.push("/signup");
                setNavOpen(false);
              }}
              className="mt-2"
            >
              Signup
            </button>
          )}
        </div>
      )}
    </div>
  );
}
