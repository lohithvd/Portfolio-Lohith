/*
 * Copyright 2025 Praveen Kumar
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import { projects } from "@/app/config/projects";
import { Button } from "@/app/components/button";

const Projects: React.FC = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [activeSlides, setActiveSlides] = useState<Record<number, number>>({});
  const carouselTimers = useRef<Record<number, NodeJS.Timeout>>({});
  const [slideDirection, setSlideDirection] = useState<
    Record<number, "left" | "right">
  >({});

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Updated slide variants that depend on direction
  const getSlideVariants = (projectId: number) => {
    const direction = slideDirection[projectId] || "right";

    return {
      enter: { x: direction === "right" ? "100%" : "-100%" },
      center: { x: 0 },
      exit: { x: direction === "right" ? "-100%" : "100%" },
    };
  };

  useEffect(() => {
    const initialActiveSlides: Record<number, number> = {};
    const initialDirections: Record<number, "left" | "right"> = {};

    projects.forEach((project) => {
      if (project.carouselImages && project.carouselImages.length > 0) {
        initialActiveSlides[project.id] = 0;
        initialDirections[project.id] = "right"; // Default direction
      }
    });

    setActiveSlides(initialActiveSlides);
    setSlideDirection(initialDirections);

    return () => {
      Object.values(carouselTimers.current).forEach((timer) => {
        clearTimeout(timer);
      });
    };
  }, []);

  useEffect(() => {
    Object.values(carouselTimers.current).forEach((timer) => {
      clearTimeout(timer);
    });

    if (hoveredProject !== null) {
      const project = projects.find((p) => p.id === hoveredProject);

      if (project?.carouselImages && project.carouselImages.length > 1) {
        const startCarousel = () => {
          const interval = project.carouselConfig?.interval || 3000;

          carouselTimers.current[project.id] = setTimeout(() => {
            setSlideDirection((prev) => ({ ...prev, [project.id]: "right" }));
            setActiveSlides((prev) => {
              const nextSlide =
                (prev[project.id] + 1) % project.carouselImages!.length;
              return { ...prev, [project.id]: nextSlide };
            });

            if (project.carouselConfig?.infinite !== false) {
              startCarousel();
            }
          }, interval);
        };

        startCarousel();
      }
    }

    return () => {
      const timersToCleanup = { ...carouselTimers.current };
      Object.values(timersToCleanup).forEach((timer) => {
        clearTimeout(timer);
      });
    };
  }, [hoveredProject, activeSlides]);

  const navigateCarousel = (projectId: number, direction: number) => {
    const project = projects.find((p) => p.id === projectId);
    if (!project?.carouselImages) return;

    if (carouselTimers.current[projectId]) {
      clearTimeout(carouselTimers.current[projectId]);
    }

    // Set animation direction based on navigation direction
    setSlideDirection((prev) => ({
      ...prev,
      [projectId]: direction > 0 ? "right" : "left",
    }));

    const imagesCount = project.carouselImages.length;
    const currentSlide = activeSlides[projectId] || 0;
    let nextSlide = currentSlide + direction;

    if (nextSlide < 0) nextSlide = imagesCount - 1;
    if (nextSlide >= imagesCount) nextSlide = 0;

    setActiveSlides((prev) => ({ ...prev, [projectId]: nextSlide }));

    if (
      hoveredProject === projectId &&
      project.carouselConfig?.infinite !== false
    ) {
      const interval = project.carouselConfig?.interval || 3000;
      // Store the ref value in a local variable for closure
      const timerId = setTimeout(() => {
        // Auto-navigation always goes forward
        setSlideDirection((prev) => ({ ...prev, [projectId]: "right" }));
        setActiveSlides((prev) => {
          const nextAutoSlide =
            (prev[projectId] + 1) % project.carouselImages!.length;
          return { ...prev, [projectId]: nextAutoSlide };
        });
      }, interval);
      
      carouselTimers.current[projectId] = timerId;
    }
  };

  const getTagColor = (tag: string) => {
    const tagColors: Record<string, string> = {
      React: "bg-blue-500/20 text-blue-300 border-blue-500/20",
      "Next.js": "bg-gray-500/20 text-gray-300 border-gray-500/20",
      TypeScript: "bg-blue-600/20 text-blue-300 border-blue-600/20",
      "Tailwind CSS": "bg-cyan-500/20 text-cyan-300 border-cyan-500/20",
      Flutter: "bg-blue-400/20 text-blue-300 border-blue-400/20",
      Riverpod: "bg-purple-500/20 text-purple-300 border-purple-500/20",
      "TMDB API": "bg-red-500/20 text-red-300 border-red-500/20",
      "Method Channels": "bg-green-500/20 text-green-300 border-green-500/20",
      Go: "bg-cyan-600/20 text-cyan-300 border-cyan-600/20",
      PostgreSQL: "bg-blue-700/20 text-blue-300 border-blue-700/20",
      default: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    };

    return tagColors[tag] || tagColors.default;
  };

  return (
    <section id="projects" className="py-24 relative">
      {/* Decorative elements */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
      <div className="absolute -right-20 top-1/3 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl" />
      <div className="absolute -left-20 bottom-1/3 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
              Projects
            </span>
          </h2>
          <div className="mt-4 h-1 w-20 bg-gradient-to-r from-emerald-400 to-blue-500 mx-auto rounded-full" />
          <p className="mt-6 text-gray-300 max-w-2xl mx-auto">
            Here&apos;s a selection of projects that showcase my skills and
            passion for building exceptional digital experiences across
            different platforms.
          </p>
        </motion.div>

        {/* Projects grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              className="group h-full"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div
                className={`bg-gray-800/30 backdrop-blur-sm rounded-2xl overflow-hidden border transition-all duration-500 h-full flex flex-col
                ${
                  hoveredProject === project.id
                    ? "border-emerald-500/50 shadow-xl shadow-emerald-500/10 translate-y-[-5px]"
                    : "border-gray-700/50 shadow-lg shadow-black/20"
                }`}
              >
                {/* Project media with overlay */}
                <div className="relative overflow-hidden aspect-video">
                  {hoveredProject === project.id && project.gifUrl ? (
                    <Image
                      src={project.gifUrl}
                      alt={`${project.title} animation`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  ) : project.carouselImages &&
                    project.carouselImages.length > 0 &&
                    hoveredProject === project.id ? (
                    <>
                      <AnimatePresence initial={false}>
                        <motion.div
                          key={activeSlides[project.id] || 0}
                          variants={getSlideVariants(project.id)}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{
                            x: { duration: 0.4, ease: "easeInOut" },
                          }}
                          className="absolute inset-0"
                        >
                          <Image
                            src={
                              project.carouselImages[
                                activeSlides[project.id] || 0
                              ]
                            }
                            alt={`${project.title} slide ${
                              activeSlides[project.id] || 0
                            }`}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover"
                          />
                        </motion.div>
                      </AnimatePresence>

                      {/* Carousel Navigation */}
                      {project.carouselImages.length > 1 && (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigateCarousel(project.id, -1);
                            }}
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-900/50 p-1 rounded-full backdrop-blur-sm text-white hover:bg-gray-900/70 transition-colors z-10"
                            aria-label="Previous slide"
                          >
                            <ChevronLeft size={16} />
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigateCarousel(project.id, 1);
                            }}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-900/50 p-1 rounded-full backdrop-blur-sm text-white hover:bg-gray-900/70 transition-colors z-10"
                            aria-label="Next slide"
                          >
                            <ChevronRight size={16} />
                          </button>

                          {/* Slide Indicators */}
                          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 z-10">
                            {project.carouselImages.map((_, index) => (
                              <button
                                key={index}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // Set direction based on which indicator was clicked
                                  const currentIndex =
                                    activeSlides[project.id] || 0;
                                  setSlideDirection((prev) => ({
                                    ...prev,
                                    [project.id]:
                                      index > currentIndex ? "right" : "left",
                                  }));
                                  setActiveSlides((prev) => ({
                                    ...prev,
                                    [project.id]: index,
                                  }));
                                }}
                                className={`w-1.5 h-1.5 rounded-full transition-all ${
                                  (activeSlides[project.id] || 0) === index
                                    ? "bg-emerald-400 w-3"
                                    : "bg-gray-400/50"
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    // Display thumbnail by default
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  )}

                  {/* Gradient overlay */}
                  {/* <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" /> */}

                  {/* Project type badge */}
                  {/* {project.type && ( */}
                  {/*   <div className="absolute top-4 right-4 bg-emerald-500/90 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full shadow-lg z-10"> */}
                  {/*     {project.type} */}
                  {/*   </div> */}
                  {/* )} */}
                </div>

                {/* Project content */}
                <div className="p-6 pt-4 flex flex-col flex-grow">
                  {/* Project title with animated underline */}
                  <div className="relative inline-block">
                    <h3 className="text-xl font-semibold text-white mb-1 inline-block">
                      {project.title}
                    </h3>
                  </div>

                  {/* Project description */}
                  <p className="mt-2 text-gray-300 flex-grow">
                    {project.description}
                  </p>

                  {/* Technology tags */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className={`px-2.5 py-1 text-xs rounded-full border ${getTagColor(
                          tag
                        )}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Project links */}
                  <div className="mt-6 flex justify-between items-center">
                    <div className="flex space-x-4">
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-gray-300 hover:text-emerald-400 transition-colors duration-300"
                          aria-label={`View live demo of ${project.title}`}
                        >
                          <ExternalLink size={18} className="mr-1.5" />
                          <span>Live Demo</span>
                        </a>
                      )}

                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-300 hover:text-emerald-400 transition-colors duration-300"
                        aria-label={`View code for ${project.title} on GitHub`}
                      >
                        <Github size={18} className="mr-1.5" />
                        <span>Code</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View more button */}
        <div className="mt-16 text-center">
          <Button
            href="https://github.com/PraveenGongada"
            label="View More Projects"
            icon={<Github size={18} />}
            variant="secondary"
            target="_blank"
            rel="noopener noreferrer"
            iconType="default"
            className="inline-flex"
          />
        </div>
      </div>
    </section>
  );
};

export { Projects };
