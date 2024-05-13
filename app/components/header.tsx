"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="z-[999] relative">
      <motion.div
        className="fixed top-0 left-1/2 h-[4.5rem] w-full bg-background rounded-none border border-white border-opacity-[0.1]
        backdrop-blur-[0.5rem] xs:top-6 xs:h-[3.25rem] xs:w-[22rem] xs:rounded-full -translate-x-1/2"
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
        transition={{ duration: 1 }}
      ></motion.div>
      <nav className="flex fixed top-[0.15rem] left-1/2 h-12 -translate-x-1/2 py-2 xs:top-[1.7rem] xs:h-[initial] xs:py-0 w-full">
        <ul
          className="flex flex-wrap items-center justify-center gap-y-1 text-[0.9rem] w-full
        h-3/4"
        >
          <motion.li
            className="p-3 text-md font-mono font-medium text-primary"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            encrypt project
          </motion.li>
          <motion.li
            className="p-3 text-md font-medium"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Link href="https://github.com/PAnanasik" target="_blank">
              pananasik
            </Link>
          </motion.li>
          <motion.li
            className="p-3 text-md font-medium"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Link href="https://github.com/lyakakoy" target="_blank">
              lyakakoy
            </Link>
          </motion.li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
