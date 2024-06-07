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
          className="fixed bottom-0 left-[42%] flex h-[50px] w-[300px]  items-center justify-center rounded-2xl bg-white text-black"
        >
          <p className="text-red-700">Invalid Credentials</p>
        </motion.div>
      )}

      {loggingin && (
        <div className="fixed flex h-full w-full items-end justify-center ">
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
        <div className="rounded-xl bg-white  px-16 py-24  shadow-lg  max-sm:px-8  md:mr-36">
          <div className="text-black">
            <div className="mb-8 flex flex-col items-center">
              <img
                src="/logo.png"
                width="200"
                className="h- rounded-lg object-contain"
                alt=""
              />
            </div>
            <form onSubmit={handleLogin}>
              <div className="mb-4 text-base">
                <input
                  className="e w-full rounded-md border-none  bg-[#d9d9d9] px-6 py-2 text-center text-inherit placeholder-black placeholder:text-sm  "
                  type="text"
                  name="email"
                  placeholder="id@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4 text-base">
                <input
                  className="e rounded-md border-none  bg-[#d9d9d9] px-6 py-2 text-center text-inherit placeholder-black  outline-none "
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
                  className="t   h rounded-md bg-black px-10 py-2 text-white backdrop-blur-md transition-colors duration-300"
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
