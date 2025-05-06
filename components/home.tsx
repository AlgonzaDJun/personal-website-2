import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const GoToHome = () => {
  return (
    <div className="fixed bottom-4 left-4 z-50 md:left-8 lg:left-12 animate-float">
      <Link href="/">
        <Button className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white border-0 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl">
          Home
        </Button>
      </Link>
    </div>
  );
};

export default GoToHome;
