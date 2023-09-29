"use client";

import { NavBar } from "@/components/commons/nav-bar";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className='relative flex flex-col w-full min-h-screen max-h-screen items-center dark:bg-gray-900'>
      <NavBar />
      <main className="h-screen flex items-center justify-center flex-col px-8">
        <motion.h1 initial={{opacity: 0}} animate={{opacity: 1}} exit={{ opacity: 0 }} className="text-6xl font-bold mb-4 text-center opacity-80 dark:text-gray-200">Star Wars API Explorer</motion.h1>
        <motion.h2 className="text-2xl font-bold mb-8 text-center dark:text-gray-200">Explore the Star Wars universe.</motion.h2>
        <motion.p className="text-center dark:text-gray-200">Start by selecting one of the categories</motion.p>
      </main>
    </div>
  )
}
