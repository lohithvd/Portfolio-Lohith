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

"use client";

import React, { useEffect, useMemo, useState, memo } from "react";
import { Cloud, fetchSimpleIcons, renderSimpleIcon } from "react-icon-cloud";
import type { SimpleIcon } from "react-icon-cloud";
import { skills } from "@/app/config/skills";
import Image from "next/image";

interface IconData {
  simpleIcons: Record<string, SimpleIcon>;
  [key: string]: unknown;
}

const extractIconSlugs = () => {
  const iconMapping: Record<string, string> = {
    React: "react",
    "Next.js": "nextdotjs",
    TypeScript: "typescript",
    JavaScript: "javascript",
    "Tailwind CSS": "tailwindcss",
    Flutter: "flutter",
    "React Native": "react",
    Java: "java",
    Swift: "swift",
    Go: "go",
    Nvim: "neovim",
    "Node.js": "nodedotjs",
    Express: "express",
    PostgreSQL: "postgresql",
    Firebase: "firebase",
    Redis: "redis",
    Kubernetes: "kubernetes",
    Helm: "helm",
    Jenkins: "jenkins",
    "GitHub Actions": "githubactions",
    AWS: "amazonaws",
    Prometheus: "prometheus",
    Grafana: "grafana",
    Kibana: "kibana",
    Logstash: "logstash",
    ElasticSearch: "elasticsearch",
    Kafka: "apachekafka",
  };

  const slugs = skills
    .flatMap((category) => category.technologies)
    .map(
      (tech) =>
        iconMapping[tech.name] || tech.name.toLowerCase().replace(/\s+/g, "")
    )
    .filter(Boolean);

  return [...new Set(slugs)];
};

const cloudProps = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
      transform: "scale(0.9)",
    },
  },
  options: {
    reverse: true,
    depth: 0.8,
    wheelZoom: false,
    imageScale: 1.4,
    activeCursor: "default",
    initial: [0.1, -0.1],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: "#000",
    maxSpeed: 0.04,
    minSpeed: 0.02,
    radiusX: 0.95,
    radiusY: 0.95,
    radiusZ: 0.95,
  },
};

const renderCustomIcon = (icon: SimpleIcon, theme: string) => {
  const bgHex = theme === "light" ? "#f3f2ef" : "#080510";
  const fallbackHex = theme === "light" ? "#6e6e73" : "#ffffff";
  const minContrastRatio = theme === "dark" ? 2 : 1.2;

  return renderSimpleIcon({
    icon,
    bgHex,
    fallbackHex,
    minContrastRatio,
    size: 28,
    aProps: {
      href: undefined,
      target: undefined,
      rel: undefined,
      onClick: (e: React.MouseEvent) => e.preventDefault(),
    },
  });
};

const TechSphereComponent = () => {
  const [data, setData] = useState<IconData | null>(null);
  const [loading, setLoading] = useState(true);
  const iconSlugs = useMemo(() => extractIconSlugs(), []);

  const theme = "dark";

  useEffect(() => {
    if (iconSlugs.length > 0) {
      setLoading(true);
      fetchSimpleIcons({ slugs: iconSlugs })
        .then((result) => {
          setData(result);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching icons:", error);
          setLoading(false);
        });
    }
  }, [iconSlugs]);

  const renderedIcons = useMemo(() => {
    if (!data) return null;
    return Object.values(data.simpleIcons).map((icon) =>
      renderCustomIcon(icon as SimpleIcon, theme)
    );
  }, [data, theme]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 bg-emerald-500/20 rounded-full"></div>
          <p className="mt-4 text-gray-400">Loading skills...</p>
        </div>
      </div>
    );
  }

  const customImages: string[] = [];

  const iconCount = renderedIcons ? renderedIcons.length : 0;
  console.log(`Rendering tech sphere with ${iconCount} technologies`);

  return (
    <div className="w-full h-full flex items-center justify-center">
      {renderedIcons && (
        <Cloud {...cloudProps}>
          <>
            <>{renderedIcons}</>
            {customImages.length > 0 &&
              customImages.map((image, index) => (
                <a key={index} href="#" onClick={(e) => e.preventDefault()}>
                  <Image src={image} alt="Custom icon" width={36} height={36} />
                </a>
              ))}
          </>
        </Cloud>
      )}
    </div>
  );
};

const TechSphere = memo(TechSphereComponent);

export { TechSphere };
