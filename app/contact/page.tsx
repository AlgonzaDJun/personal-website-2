"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Mail,
  Phone,
  MapPin,
  Github,
  Instagram,
  Linkedin,
  MessageSquare,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import GoToHome from "@/components/home";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const contactCardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 },
  },
};

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");

    // Simulate form submission
    setTimeout(() => {
      if (Math.random() > 0.2) {
        // 80% success rate for demo
        setFormStatus("success");
      } else {
        setFormStatus("error");
      }
    }, 1500);
  };

  const contactMethods = [
    {
      name: "WhatsApp",
      value: "+62 812-4336-7761",
      icon: <MessageSquare className="h-6 w-6" />,
      color: "from-green-500 to-emerald-500",
      link: "https://wa.me/6281243367761",
    },
    {
      name: "Email",
      value: "algonsadewangga@gmail.com",
      icon: <Mail className="h-6 w-6" />,
      color: "from-blue-500 to-indigo-500",
      link: "mailto:algonsadewangga@gmail.com",
    },
    {
      name: "GitHub",
      value: "github.com/AlgonzaDJun",
      icon: <Github className="h-6 w-6" />,
      color: "from-purple-500 to-pink-500",
      link: "https://github.com/AlgonzaDJun",
    },
    {
      name: "Instagram",
      value: "@algnza",
      icon: <Instagram className="h-6 w-6" />,
      color: "from-orange-500 to-pink-500",
      link: "https://www.instagram.com/algnza/",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white">
      <GoToHome />
      <div className="relative mx-auto max-w-7xl rounded-3xl overflow-hidden bg-gradient-to-br from-slate-950/80 via-slate-900/80 to-emerald-950/80 border border-emerald-900/30 backdrop-blur-sm">
        {/* Corner accents with blue-green gradients */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-blue-600/20 to-emerald-600/20 blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-emerald-600/20 to-blue-600/20 blur-[120px] translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-gradient-to-bl from-blue-500/10 to-emerald-500/10 blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-gradient-to-tr from-emerald-500/10 to-blue-500/10 blur-[100px]" />

        {/* Header section */}
        <div className="relative z-10">
          <div className="h-[30vh] min-h-[250px] flex items-center justify-center relative overflow-hidden">
            {/* Background gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-emerald-900/20" />

            {/* Abstract pattern background */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-emerald-500/20 via-transparent to-transparent" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center z-10 px-4"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-emerald-100">
                Get In Touch
              </h1>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Have a question or want to work together? Feel free to reach
                out!
              </p>
            </motion.div>
          </div>
        </div>

        {/* Main content */}
        <main className="relative z-10 px-6 py-16 md:py-24">
          <div className="max-w-6xl mx-auto">
            {/* Contact methods */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
            >
              {contactMethods.map((method) => (
                <motion.a
                  key={method.name}
                  href={method.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={contactCardVariants}
                  whileHover="hover"
                  className="group"
                >
                  <div className="relative">
                    <div
                      className={`absolute -inset-0.5 rounded-xl bg-gradient-to-r ${method.color} opacity-50 blur-sm group-hover:opacity-100 transition duration-300`}
                    />
                    <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm h-full relative">
                      <CardContent className="p-6 flex flex-col items-center text-center">
                        <div
                          className={`w-16 h-16 rounded-full bg-gradient-to-r ${method.color} flex items-center justify-center mb-4`}
                        >
                          {method.icon}
                        </div>
                        <h3 className="text-xl font-bold mb-2">
                          {method.name}
                        </h3>
                        <p className="text-slate-300">{method.value}</p>
                      </CardContent>
                    </Card>
                  </div>
                </motion.a>
              ))}
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact form */}
              <motion.div variants={fadeIn} initial="hidden" animate="visible">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500 to-emerald-500 opacity-30 blur-sm" />
                  <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm relative">
                    <CardContent className="p-8">
                      <h2 className="text-2xl font-bold mb-6">
                        Send Me a Message
                      </h2>

                      {formStatus === "success" ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-emerald-900/30 border border-emerald-800 rounded-lg p-6 text-center"
                        >
                          <CheckCircle className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
                          <h3 className="text-xl font-bold text-emerald-400 mb-2">
                            Message Sent!
                          </h3>
                          <p className="text-slate-300 mb-4">
                            Thank you for reaching out. I'll get back to you as
                            soon as possible.
                          </p>
                          <Button
                            onClick={() => {
                              setFormStatus("idle");
                              setFormState({
                                name: "",
                                email: "",
                                subject: "",
                                message: "",
                              });
                            }}
                            className="bg-emerald-600 hover:bg-emerald-500"
                          >
                            Send Another Message
                          </Button>
                        </motion.div>
                      ) : formStatus === "error" ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-red-900/30 border border-red-800 rounded-lg p-6 text-center"
                        >
                          <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
                          <h3 className="text-xl font-bold text-red-400 mb-2">
                            Something went wrong
                          </h3>
                          <p className="text-slate-300 mb-4">
                            There was an error sending your message. Please try
                            again.
                          </p>
                          <Button
                            onClick={() => setFormStatus("idle")}
                            className="bg-red-600 hover:bg-red-500"
                          >
                            Try Again
                          </Button>
                        </motion.div>
                      ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <label
                                htmlFor="name"
                                className="text-sm font-medium text-slate-300"
                              >
                                Your Name
                              </label>
                              <Input
                                id="name"
                                name="name"
                                value={formState.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                required
                                className="bg-slate-800/50 border-slate-700 focus-visible:ring-emerald-500"
                              />
                            </div>
                            <div className="space-y-2">
                              <label
                                htmlFor="email"
                                className="text-sm font-medium text-slate-300"
                              >
                                Your Email
                              </label>
                              <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formState.email}
                                onChange={handleChange}
                                placeholder="john@example.com"
                                required
                                className="bg-slate-800/50 border-slate-700 focus-visible:ring-emerald-500"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label
                              htmlFor="subject"
                              className="text-sm font-medium text-slate-300"
                            >
                              Subject
                            </label>
                            <Input
                              id="subject"
                              name="subject"
                              value={formState.subject}
                              onChange={handleChange}
                              placeholder="Project Inquiry"
                              required
                              className="bg-slate-800/50 border-slate-700 focus-visible:ring-emerald-500"
                            />
                          </div>
                          <div className="space-y-2">
                            <label
                              htmlFor="message"
                              className="text-sm font-medium text-slate-300"
                            >
                              Message
                            </label>
                            <Textarea
                              id="message"
                              name="message"
                              value={formState.message}
                              onChange={handleChange}
                              placeholder="Hello, I'd like to discuss a project..."
                              required
                              className="min-h-[150px] bg-slate-800/50 border-slate-700 focus-visible:ring-emerald-500"
                            />
                          </div>
                          <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white border-0"
                            disabled={formStatus === "submitting"}
                          >
                            {formStatus === "submitting" ? (
                              <>
                                <svg
                                  className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                                Sending...
                              </>
                            ) : (
                              <>
                                <Send className="mr-2 h-4 w-4" /> Send Message
                              </>
                            )}
                          </Button>
                        </form>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </motion.div>

              {/* Map and additional info */}
              <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                className="space-y-8"
              >
                {/* Interactive map placeholder */}
                <div className="relative">
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500 to-emerald-500 opacity-30 blur-sm" />
                  <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm relative overflow-hidden h-[300px]">
                    <CardContent className="p-0 h-full">
                      <div className="absolute inset-0 bg-slate-800/50 flex items-center justify-center">
                        <div className="text-center">
                          <MapPin className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
                          <h3 className="text-xl font-bold">Yogyakarta, ID</h3>
                          <p className="text-slate-300">Sleman</p>
                        </div>
                      </div>
                      {/* This would be replaced with an actual map component in a real implementation */}
                      <div className="absolute inset-0 opacity-30 bg-[url('/placeholder.svg?height=600&width=800&text=Map')]"></div>
                    </CardContent>
                  </Card>
                </div>

                {/* Additional contact info */}
                <div className="relative">
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500 to-emerald-500 opacity-30 blur-sm" />
                  <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm relative">
                    <CardContent className="p-8">
                      <h3 className="text-xl font-bold mb-4">Let's Connect</h3>
                      <p className="text-slate-300 mb-6">
                        Whether you have a question about my work, want to
                        discuss a potential project, or just want to say hello,
                        I'd love to hear from you!
                      </p>

                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center">
                            <Phone className="h-5 w-5 text-blue-400" />
                          </div>
                          <div>
                            <p className="text-sm text-slate-400">WhatsApp</p>
                            <p className="font-medium">+62 812-4336-7761</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-emerald-900/50 flex items-center justify-center">
                            <Mail className="h-5 w-5 text-emerald-400" />
                          </div>
                          <div>
                            <p className="text-sm text-slate-400">Email</p>
                            <p className="font-medium">
                              algonsadewangga@gmail.com
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8">
                        <h4 className="text-lg font-medium mb-4">Follow Me</h4>
                        <div className="flex gap-3">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <a
                                  href="https://github.com/AlgonzaDJun"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors"
                                >
                                  <Github size={18} />
                                </a>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>GitHub</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <a
                                  href="https://www.instagram.com/algnza/"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors"
                                >
                                  <Instagram size={18} />
                                </a>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Instagram</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <a
                                  href="https://linkedin.com/in/yourusername"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors"
                                >
                                  <Linkedin size={18} />
                                </a>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>LinkedIn</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <a
                                  href="https://wa.me/6281243367761"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors"
                                >
                                  <MessageSquare size={18} />
                                </a>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>WhatsApp</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
