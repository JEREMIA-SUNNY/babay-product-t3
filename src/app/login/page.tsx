"use client";

import { useRouter, usePathname } from "next/navigation";
import React, { useState } from "react";
import { setInterval } from "timers";
import { motion } from "framer-motion";
import ThreeDotsWave from "../ThreeDotWave";
function page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [loggingin, setLoggingin] = useState(false);

  const router = useRouter();
  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    const envEmail = process.env.NEXT_PUBLIC_EMAIL;
    const envPassword = process.env.NEXT_PUBLIC_PASSWORD;

    if (email === envEmail && password === envPassword) {
      setLoggingin(true);
      localStorage.setItem("isLoggedIn", "true");
      setInterval(() => {
        setLoggingin(true);
      }, 4000);
      router.push("/");
    } else {
      setLoggingin(false);
      setInvalid(true);
      setInterval(() => {
        setInvalid(false);
      }, 4000);
    }
  };
  return (
    <>
      {invalid && (
        <motion.div
          initial={{ y: 100, opacity: 0, scale: 0.1 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 100, opacity: 0, scale: 0.1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed text-black bottom-0 flex items-center justify-center  left-[42%] w-[300px] h-[50px] rounded-2xl bg-white"
        >
          <p className="text-red-700">Invalid Credentials</p>
        </motion.div>
      )}

      {loggingin && (
        <div className="fixed h-full flex justify-center w-full items-end ">
          <ThreeDotsWave />
        </div>
      )}

      <div
        className="flex h-screen w-full items-center justify-end  bg-gray-900 bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(
          "/banner.jpg")`,
          backgroundPosition: "",
          backgroundRepeat: "none",
        }}
      >
        <div className="rounded-xl bg-white  px-16 py-24  md:mr-36  shadow-lg  max-sm:px-8">
          <div className="text-black">
            <div className="mb-8 flex flex-col items-center">
              <img
                src="/logo.png"
                width="200"
                className="rounded-lg h- object-contain"
                alt=""
              />

              <span className="text-black mt-6">Enter Login Details</span>
            </div>
            <form onSubmit={handleLogin}>
              <div className="mb-4 text-lg">
                <input
                  className="rounded-md border-none e  px-6 py-2 text-center text-inherit placeholder-black bg-[#d9d9d9]  "
                  type="text"
                  name="email"
                  placeholder="id@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4 text-lg">
                <input
                  className="rounded-md border-none e  px-6 py-2 text-center text-inherit placeholder-black bg-[#d9d9d9]  outline-none "
                  type="password"
                  name="password"
                  placeholder="*********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mt-8 flex justify-center text-lg text-black">
                <button
                  type="submit"
                  className="rounded-md   text-white px-10 py-2 t bg-black backdrop-blur-md transition-colors duration-300 h"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
