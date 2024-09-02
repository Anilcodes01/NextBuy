"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    try {
      const response = await axios.post("/api/auth/signup", {
        name,
        email,
        password,
      });

      if (response.status === 200) {
        router.push("/");
      }
    } catch (error) {
      console.log("Error while signing up...");
    }
  };

  return (
    <div className="bg-cyan-100 h-screen flex justify-center items-center">
      <div className="bg-white shadow-2xl rounded-xl  h-auto p-5">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2 w-full items-center">
            <div className="font-bold text-black text-3xl">Sign Up</div>
            <div className="text-black">
              Let's get started with your 30 days free trial
            </div>
          </div>
          <div className="flex flex-col text-black gap-4 w-full">
            <div>
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="rounded border w-full p-2 outline-none  text-md"
                type="text"
                placeholder=" Name"
              />
            </div>
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
              onClick={handleSignup}
              className="text-white rounded w-full bg-black p-2"
            >
              Sign Up
            </button>
            <div className="flex text-center items-center justify-center">
              <div className="text-black">Already have an account?</div>
              <Link className="text-black ml-1" href={"/signin"}>
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
