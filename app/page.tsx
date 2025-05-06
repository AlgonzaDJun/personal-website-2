"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, Menu, Github, Eye } from "lucide-react";
import { Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { PortoInterface } from "@/types";

// const projects = [
//   {
//     id: 1,
//     title: "E-Commerce Dashboard",
//     description:
//       "A comprehensive dashboard for online store management with real-time analytics.",
//     image: "/placeholder.svg?height=400&width=600&text=E-Commerce",
//     tags: ["React", "Next.js", "Tailwind CSS", "TypeScript"],
//     demoUrl: "#",
//     githubUrl: "#",
//     featured: true,
//   },
//   {
//     id: 2,
//     title: "AI Content Generator",
//     description:
//       "An AI-powered application that generates marketing content based on user prompts.",
//     image: "/placeholder.svg?height=200&width=200&text=AI App",
//     tags: ["OpenAI", "React", "Node.js"],
//     demoUrl: "#",
//     githubUrl: "#",
//     featured: false,
//   },
//   {
//     id: 3,
//     title: "Fitness Tracker",
//     description:
//       "Mobile-first application for tracking workouts and nutrition with progress visualization.",
//     image: "/placeholder.svg?height=200&width=200&text=Fitness",
//     tags: ["React Native", "Firebase", "Chart.js"],
//     demoUrl: "#",
//     githubUrl: "#",
//     featured: false,
//   },
//   {
//     id: 4,
//     title: "Social Media Platform",
//     description:
//       "A community platform with real-time messaging and content sharing capabilities.",
//     image: "/placeholder.svg?height=200&width=200&text=Social",
//     tags: ["Next.js", "Socket.io", "MongoDB"],
//     demoUrl: "#",
//     githubUrl: "#",
//     featured: false,
//   },
// ];

export default function Home() {
  const { data, isLoading } = useSWR<{ portos: PortoInterface[] }>(
    "/api/portos",
    fetcher
  );
  
  console.log(data)

  const [activeTag, setActiveTag] = useState<string | null>(null);
  const featuredProject = data && data.portos.find((p) => p.featured);
  const otherProjects = data && data.portos.filter((p) => !p.featured) || []

  // Filter projects by tag if a tag is selected
  const filteredProjects = activeTag
    ? otherProjects.filter((p) => p.tags.includes(activeTag))
    : otherProjects;

  // Get all unique tags
  const allTags = Array.from(
    new Set(data && data.portos.flatMap((p) => p.tags))
  );

  if (isLoading) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 flex items-center justify-center">
      <div className="relative">
        {/* Gradient background effects */}
        <div className="absolute -inset-20 rounded-full bg-gradient-to-r from-blue-600/20 to-emerald-600/20 blur-[100px]" />
        <div className="absolute -inset-20 rounded-full bg-gradient-to-l from-emerald-600/20 to-blue-600/20 blur-[100px]" />
        
        {/* Loading spinner */}
        <div className="relative flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
          <div className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            Loading...
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white">
      <div className="relative mx-auto max-w-7xl rounded-3xl overflow-hidden bg-gradient-to-br from-slate-950/80 via-slate-900/80 to-emerald-950/80 border border-emerald-900/30 backdrop-blur-sm">
        {/* Corner accents with blue-green gradients */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-blue-600/20 to-emerald-600/20 blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-emerald-600/20 to-blue-600/20 blur-[120px] translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-gradient-to-bl from-blue-500/10 to-emerald-500/10 blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-gradient-to-tr from-emerald-500/10 to-blue-500/10 blur-[100px]" />

        <header className="relative z-10 flex items-center justify-between p-6">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-xl"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center">
                <span className="text-white">A</span>
              </div>
              AL
            </Link>

            <div className="relative hidden md:flex items-center">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <Input
                placeholder="Search projects..."
                className="w-[300px] pl-10 bg-slate-900/50 border-slate-800 focus-visible:ring-emerald-500"
              />
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-slate-300 hover:text-white transition"
            >
              Projects
            </Link>
            <Link
              href="/about"
              className="text-slate-300 hover:text-white transition"
            >
              About
            </Link>
            <Link
              href="/blog"
              className="text-slate-300 hover:text-white transition"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="text-slate-300 hover:text-white transition"
            >
              Contact
            </Link>
            <Button className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white border-0">
              Get in Touch
            </Button>
          </nav>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-slate-900 border-slate-800"
            >
              <div className="flex flex-col gap-6">
                <Link
                  href="/"
                  className="flex items-center gap-2 font-bold text-xl"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <span className="text-white">P</span>
                  </div>
                  Portfolio
                </Link>

                <nav className="flex flex-col gap-4">
                  <Link
                    href="/"
                    className="text-slate-300 hover:text-white transition py-2"
                  >
                    Projects
                  </Link>
                  <Link
                    href="/about"
                    className="text-slate-300 hover:text-white transition py-2"
                  >
                    About
                  </Link>
                  <Link
                    href="/blog"
                    className="text-slate-300 hover:text-white transition py-2"
                  >
                    Blog
                  </Link>
                  <Link
                    href="/contact"
                    className="text-slate-300 hover:text-white transition py-2"
                  >
                    Contact
                  </Link>
                  <Button className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white border-0 mt-2">
                    Get in Touch
                  </Button>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </header>

        <main className="relative z-10 px-6 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-blue-900/50 to-emerald-900/50 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 text-sm font-medium border border-blue-800/30">
                Full-Stack Developer
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-emerald-100">
                Hi, There <br /> Welcome to my Personal Website
              </h1>

              <p className="text-slate-400 text-lg md:text-xl max-w-md">
                I build modern web applications with attention to detail,
                focusing on performance, accessibility, and user experience.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white border-0">
                  View Projects
                </Button>
                <Button
                  variant="outline"
                  className="border-slate-700 text-white hover:bg-slate-800"
                >
                  Contact Me
                </Button>
              </div>
            </div>

            {featuredProject && (
              <div className="relative group">
                {/* Gradient border effect */}
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-blue-500 to-emerald-500 opacity-30 blur-sm group-hover:opacity-100 transition duration-300 group-hover:duration-200" />

                <Card className="relative rounded-2xl overflow-hidden border-slate-800 bg-slate-900/50 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-[-4px]">
                  <div className="relative">
                    <Image
                      src={featuredProject.images[0].url || "/placeholder.svg"}
                      alt={featuredProject.title}
                      width={600}
                      height={400}
                      className="w-full h-auto aspect-[4/3] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex gap-4">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="rounded-full"
                          asChild
                        >
                          <Link target="_blank" href={featuredProject.webLink}>
                            <Eye className="mr-2 h-4 w-4" />
                            Live Demo
                          </Link>
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="rounded-full"
                          asChild
                        >
                          <Link target="_blank" href={featuredProject.gitLink}>
                            <Github className="mr-2 h-4 w-4" />
                            Code
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl font-bold">
                          {featuredProject.title}
                        </CardTitle>
                        <CardDescription className="text-slate-400">
                          {featuredProject.description}
                        </CardDescription>
                      </div>
                      <Badge className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500">
                        Featured
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardFooter className="flex flex-wrap gap-2">
                    {featuredProject.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-slate-800 hover:bg-slate-700"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </CardFooter>
                </Card>
              </div>
            )}
          </div>

          <div className="mt-20">
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">More Projects</h2>
                <div className="flex gap-2 overflow-x-auto pb-2 max-w-[50vw]">
                  <Badge
                    variant={activeTag === null ? "default" : "outline"}
                    className={`cursor-pointer ${
                      activeTag === null
                        ? "bg-gradient-to-r from-blue-600 to-emerald-600"
                        : "hover:bg-slate-800"
                    }`}
                    onClick={() => setActiveTag(null)}
                  >
                    All
                  </Badge>
                  {allTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant={activeTag === tag ? "default" : "outline"}
                      className={`cursor-pointer ${
                        activeTag === tag
                          ? "bg-gradient-to-r from-blue-600 to-emerald-600"
                          : "hover:bg-slate-800"
                      }`}
                      onClick={() => setActiveTag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <div key={project._id} className="group relative">
                    <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-blue-500 to-emerald-500 opacity-0 group-hover:opacity-30 blur-sm transition duration-300" />

                    <Card className="relative h-full rounded-xl overflow-hidden border-slate-800 bg-slate-900/50 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-[-4px]">
                      <div className="relative">
                        <Image
                          src={project.images[0].url || "/placeholder.svg"}
                          alt={project.title}
                          width={400}
                          height={225}
                          className="w-full h-auto aspect-video object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="secondary"
                              className="rounded-full w-9 h-9 p-0"
                              asChild
                            >
                              <Link target="_blank" href={project.webLink}>
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">Live Demo</span>
                              </Link>
                            </Button>
                            <Button
                              size="sm"
                              variant="secondary"
                              className="rounded-full w-9 h-9 p-0"
                              asChild
                            >
                              <Link target="_blank" href={project.gitLink}>
                                <Github className="h-4 w-4" />
                                <span className="sr-only">GitHub</span>
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-lg font-bold">
                          {project.title}
                        </CardTitle>
                        <CardDescription className="text-slate-400 line-clamp-2">
                          {project.description}
                        </CardDescription>
                      </CardHeader>
                      <CardFooter className="flex flex-wrap gap-1">
                        {project.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="bg-slate-800 text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {/* {project.tags.length > 3 && (
                          <Badge
                            variant="secondary"
                            className="bg-slate-800 text-xs"
                          >
                            +{project.tags.length - 3}
                          </Badge>
                        )} */}
                      </CardFooter>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
