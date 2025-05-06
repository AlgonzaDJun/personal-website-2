"use client";

import GoToHome from "@/components/home";
import React, { useState, useEffect } from "react";

const BlogPage = () => {
  const [text, setText] = useState("");
  const fullText = "Under Development";

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        // Reset currentIndex ke 0 untuk memulai ulang animasi
        currentIndex = 0;
      }
    }, 100); // Kecepatan ketikan (ms)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white">
      <GoToHome />
      <div className="relative mx-auto max-w-7xl rounded-3xl overflow-hidden bg-gradient-to-br from-slate-950/80 via-slate-900/80 to-emerald-950/80 border border-emerald-900/30 backdrop-blur-sm">
        {/* Corner accents with blue-green gradients */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-blue-600/20 to-emerald-600/20 blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-emerald-600/20 to-blue-600/20 blur-[120px] translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-gradient-to-bl from-blue-500/10 to-emerald-500/10 blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-gradient-to-tr from-emerald-500/10 to-blue-500/10 blur-[100px]" />

        <main className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-emerald-100">
              {text}
              <span className="animate-pulse">|</span>
            </h1>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BlogPage;
