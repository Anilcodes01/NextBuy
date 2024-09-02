"use client";

import axios from "axios";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignin = async () => {
    if (!email || !password) {
      alert("All fields are required!");
      return;
    }

    setLoading(true);

    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (response?.ok) {
        toast.success('Successfully signed in!')
        router.push("/");
      } else {
        toast.error("Sign-in failed! Please check your credentials.")
      }
    } catch (error) {
      toast.error("Error while signing in...");
    } finally {
      setLoading(false);
    }
  };
  
  const handleGoogleSignin = async () => {
    try {
      await signIn("google", {
        callbackUrl: "/",
      });
      toast.success("Successfully signed in with Google!");
    } catch (error) {
      toast.error("Google sign-in failed!");
    }
  };

  return (
    <div className="bg-cyan-100 h-screen flex justify-center items-center">
     <Toaster position="top-right" reverseOrder={false} />
      <div className="bg-white shadow-2xl rounded-xl  h-auto p-5">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2 w-full items-center">
            <div className="font-bold text-black text-3xl">Login</div>
            <div className="text-black">
              Let's get started with your 30 days free trial
            </div>
          </div>
          <div className="flex flex-col text-black gap-4 w-full">
            <div>
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="rounded border w-full p-2 outline-none text-black text-md"
                type="text"
                placeholder=" Email"
              />
            </div>
            <div>
              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="rounded border w-full p-2 outline-none text-black text-md"
                type="password"
                placeholder=" Password"
              />
            </div>
          </div>
          <div className="text-center flex gap-2 flex-col">
            <button
              disabled={loading}
              onClick={handleSignin}
              className="text-white rounded w-full bg-black p-2"
            >
              {loading ? "Signing in..." : "Signin"}
            </button>
            <div className="flex text-center items-center justify-center">
              <div className="text-black">Don't have an account?</div>
              <Link className="text-black ml-1" href={"/signup"}>
                Signup
              </Link>
            </div>
          
              <div className="text-black">or</div>
            
            <div>
              <button
                onClick={handleGoogleSignin}
                className="text-white bg-black rounded w-full p-2"
              >
                Login with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
