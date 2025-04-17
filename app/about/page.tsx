"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, type Variants } from "framer-motion";
import {
  ArrowRight,
  Code,
  Briefcase,
  GraduationCap,
  Award,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Sample data for education and experience
const education = [
  {
    id: 1,
    degree: "Master of Computer Science",
    institution: "Stanford University",
    location: "California, USA",
    period: "2018 - 2020",
    description:
      "Specialized in Artificial Intelligence and Machine Learning. Thesis on 'Deep Learning Applications in Natural Language Processing'.",
    skills: [
      "Machine Learning",
      "Deep Learning",
      "NLP",
      "Python",
      "TensorFlow",
    ],
  },
  {
    id: 2,
    degree: "Bachelor of Science in Computer Science",
    institution: "Massachusetts Institute of Technology",
    location: "Massachusetts, USA",
    period: "2014 - 2018",
    description:
      "Graduated with honors. Focus on software engineering and data structures. Participated in multiple hackathons and coding competitions.",
    skills: ["Algorithms", "Data Structures", "Java", "C++", "Web Development"],
  },
  {
    id: 3,
    degree: "High School Diploma",
    institution: "International School of Technology",
    location: "New York, USA",
    period: "2010 - 2014",
    description:
      "Advanced placement in Mathematics and Computer Science. Led the school's robotics team to national championship.",
    skills: ["Mathematics", "Basic Programming", "Robotics", "Leadership"],
  },
];

const experience = [
  {
    id: 1,
    position: "Senior Software Engineer",
    company: "Google",
    location: "Mountain View, CA",
    period: "2020 - Present",
    description:
      "Leading a team of 5 engineers working on Google Cloud Platform. Implemented key features that improved system performance by 40%. Mentoring junior developers and contributing to open-source projects.",
    skills: [
      "React",
      "Node.js",
      "Cloud Architecture",
      "Team Leadership",
      "TypeScript",
    ],
  },
  {
    id: 2,
    position: "Full Stack Developer",
    company: "Amazon",
    location: "Seattle, WA",
    period: "2018 - 2020",
    description:
      "Developed and maintained e-commerce applications serving millions of users. Optimized database queries resulting in 30% faster page loads. Collaborated with UX designers to implement responsive interfaces.",
    skills: ["JavaScript", "AWS", "MongoDB", "Express", "React", "Node.js"],
  },
  {
    id: 3,
    position: "Software Engineering Intern",
    company: "Microsoft",
    location: "Redmond, WA",
    period: "Summer 2017",
    description:
      "Worked on the Azure team to develop cloud-based solutions. Created internal tools that streamlined the development workflow. Participated in code reviews and agile development processes.",
    skills: ["C#", ".NET", "Azure", "SQL", "Git"],
  },
];

// Skills data
const skills = [
  { name: "JavaScript", level: 95 },
  { name: "TypeScript", level: 90 },
  { name: "React", level: 92 },
  { name: "Next.js", level: 88 },
  { name: "Node.js", level: 85 },
  { name: "Python", level: 80 },
  { name: "GraphQL", level: 75 },
  { name: "AWS", level: 78 },
  { name: "Docker", level: 70 },
  { name: "UI/UX Design", level: 65 },
];

// Animation variants
const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const timelineVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const timelineItemVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 },
  },
};

const skillBarVariants: Variants = {
  hidden: { width: 0 },
  visible: (level) => ({
    width: `${level}%`,
    transition: { duration: 1, ease: "easeInOut" },
  }),
};

export default function AboutPage() {
  // Refs for scroll animations
  const bioRef = useRef(null);
  const educationRef = useRef(null);
  const experienceRef = useRef(null);
  const skillsRef = useRef(null);

  // Check if elements are in view
  const bioInView = useInView(bioRef, { once: true, margin: "-100px" });
  const educationInView = useInView(educationRef, {
    once: true,
    margin: "-100px",
  });
  const experienceInView = useInView(experienceRef, {
    once: true,
    margin: "-100px",
  });
  const skillsInView = useInView(skillsRef, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white">
      <div className="relative mx-auto max-w-7xl rounded-3xl overflow-hidden bg-gradient-to-br from-slate-950/80 via-slate-900/80 to-emerald-950/80 border border-emerald-900/30 backdrop-blur-sm">
        {/* Corner accents with blue-green gradients */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-blue-600/20 to-emerald-600/20 blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-emerald-600/20 to-blue-600/20 blur-[120px] translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-gradient-to-bl from-blue-500/10 to-emerald-500/10 blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-gradient-to-tr from-emerald-500/10 to-blue-500/10 blur-[100px]" />

        {/* Header section */}
        <div className="relative z-10">
          <div className="h-[40vh] min-h-[300px] flex items-center justify-center relative overflow-hidden">
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
              style={{
                textAlign: "center",
                zIndex: 10,
                paddingInline: "1rem",
              }}
              //   className="text-center z-10 px-4"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-emerald-100">
                About Me
              </h1>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Full-stack developer passionate about creating beautiful,
                functional, and user-friendly applications
              </p>
            </motion.div>
          </div>
        </div>

        {/* Main content */}
        <main className="relative z-10 px-6 py-16 md:py-24">
          <div className="max-w-5xl mx-auto">
            {/* Bio section */}
            <motion.section
              ref={bioRef}
              initial="hidden"
              animate={bioInView ? "visible" : "hidden"}
              variants={fadeIn}
              className="mb-24"
            >
              <div className="grid md:grid-cols-[2fr,3fr] gap-12 items-center">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500 to-emerald-500 opacity-30 blur-sm" />
                  <div className="relative aspect-square rounded-2xl overflow-hidden border border-slate-800">
                    <Image
                      src="/placeholder.svg?height=400&width=400&text=Profile"
                      alt="Profile"
                      width={400}
                      height={400}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 flex gap-3">
                    <Link
                      href="https://github.com"
                      className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors"
                    >
                      <Github size={18} />
                    </Link>
                    <Link
                      href="https://linkedin.com"
                      className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors"
                    >
                      <Linkedin size={18} />
                    </Link>
                    <Link
                      href="https://twitter.com"
                      className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors"
                    >
                      <Twitter size={18} />
                    </Link>
                  </div>
                </div>
                <div>
                  <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-blue-900/50 to-emerald-900/50 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 text-sm font-medium border border-blue-800/30 mb-4">
                    Hello, I'm John Doe
                  </div>
                  <h2 className="text-3xl font-bold mb-6">
                    A passionate Full-Stack Developer based in San Francisco, CA
                  </h2>
                  <p className="text-slate-300 mb-6">
                    I'm a software engineer with over 5 years of experience in
                    building web applications. My expertise spans across
                    front-end and back-end development, with a focus on creating
                    scalable, efficient, and user-friendly solutions. I'm
                    passionate about clean code, performance optimization, and
                    staying up-to-date with the latest technologies.
                  </p>
                  <p className="text-slate-300 mb-8">
                    When I'm not coding, you can find me hiking in the
                    mountains, reading tech blogs, or contributing to
                    open-source projects. I believe in continuous learning and
                    sharing knowledge with the developer community.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white border-0">
                      Download Resume
                    </Button>
                    <Button
                      variant="outline"
                      className="border-slate-700 text-white hover:bg-slate-800"
                    >
                      Contact Me
                    </Button>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Experience section */}
            <motion.section
              ref={experienceRef}
              initial="hidden"
              animate={experienceInView ? "visible" : "hidden"}
              variants={fadeIn}
              className="mb-24"
            >
              <div className="flex items-center gap-4 mb-12">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600/20 to-emerald-600/20 flex items-center justify-center">
                  <Briefcase className="text-emerald-400" size={24} />
                </div>
                <h2 className="text-3xl font-bold">Work Experience</h2>
              </div>

              <motion.div
                className="relative pl-8 border-l border-slate-700"
                variants={timelineVariants}
              >
                {experience.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className={`relative mb-12 ${
                      index === experience.length - 1 ? "" : ""
                    }`}
                    variants={timelineItemVariants}
                  >
                    {/* Timeline dot */}
                    <div className="absolute -left-[41px] w-[25px] h-[25px] rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-slate-900"></div>
                    </div>

                    <div className="relative">
                      <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-blue-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
                      <Card className="group border-slate-800 bg-slate-900/50 backdrop-blur-sm hover:border-slate-700 transition-all">
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-bold text-white">
                                {item.position}
                              </h3>
                              <p className="text-emerald-400">
                                {item.company} • {item.location}
                              </p>
                            </div>
                            <Badge className="bg-gradient-to-r from-blue-900 to-emerald-900 text-white border-0 mt-2 md:mt-0 w-fit">
                              {item.period}
                            </Badge>
                          </div>
                          <p className="text-slate-300 mb-4">
                            {item.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {item.skills.map((skill) => (
                              <Badge
                                key={skill}
                                variant="outline"
                                className="border-slate-700 text-slate-300"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>

            {/* Education section */}
            <motion.section
              ref={educationRef}
              initial="hidden"
              animate={educationInView ? "visible" : "hidden"}
              variants={fadeIn}
              className="mb-24"
            >
              <div className="flex items-center gap-4 mb-12">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600/20 to-emerald-600/20 flex items-center justify-center">
                  <GraduationCap className="text-blue-400" size={24} />
                </div>
                <h2 className="text-3xl font-bold">Education</h2>
              </div>

              <motion.div
                className="relative pl-8 border-l border-slate-700"
                variants={timelineVariants}
              >
                {education.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className={`relative mb-12 ${
                      index === education.length - 1 ? "" : ""
                    }`}
                    variants={timelineItemVariants}
                  >
                    {/* Timeline dot */}
                    <div className="absolute -left-[41px] w-[25px] h-[25px] rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-slate-900"></div>
                    </div>

                    <div className="relative">
                      <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-blue-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
                      <Card className="group border-slate-800 bg-slate-900/50 backdrop-blur-sm hover:border-slate-700 transition-all">
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-bold text-white">
                                {item.degree}
                              </h3>
                              <p className="text-blue-400">
                                {item.institution} • {item.location}
                              </p>
                            </div>
                            <Badge className="bg-gradient-to-r from-blue-900 to-emerald-900 text-white border-0 mt-2 md:mt-0 w-fit">
                              {item.period}
                            </Badge>
                          </div>
                          <p className="text-slate-300 mb-4">
                            {item.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {item.skills.map((skill) => (
                              <Badge
                                key={skill}
                                variant="outline"
                                className="border-slate-700 text-slate-300"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>

            {/* Skills section */}
            <motion.section
              ref={skillsRef}
              initial="hidden"
              animate={skillsInView ? "visible" : "hidden"}
              variants={fadeIn}
              className="mb-24"
            >
              <div className="flex items-center gap-4 mb-12">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600/20 to-emerald-600/20 flex items-center justify-center">
                  <Code className="text-blue-400" size={24} />
                </div>
                <h2 className="text-3xl font-bold">Skills & Expertise</h2>
              </div>

              <motion.div
                className="grid md:grid-cols-2 gap-8"
                variants={staggerContainer}
              >
                {skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    variants={fadeIn}
                    className="relative"
                  >
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-slate-400">{skill.level}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 to-emerald-500"
                        variants={skillBarVariants}
                        custom={skill.level}
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>

            {/* CTA section */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <div className="relative">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500 to-emerald-500 opacity-30 blur-sm" />
                <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm overflow-hidden">
                  <CardContent className="p-8 md:p-12">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold mb-4">
                          Interested in working together?
                        </h3>
                        <p className="text-slate-300 mb-6">
                          I'm always open to discussing new projects, creative
                          ideas or opportunities to be part of your vision.
                        </p>
                        <Button className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white border-0">
                          Get In Touch <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                      <div className="relative h-full min-h-[200px] rounded-xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-emerald-500/20 animate-pulse" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Award className="h-24 w-24 text-white/20" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.section>
          </div>
        </main>
      </div>
    </div>
  );
}
