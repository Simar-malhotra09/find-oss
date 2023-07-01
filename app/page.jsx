import React from "react";
import "../styles/globals.css";
import List from "./List/page";
import Link from "next/link";
import Image from "next/image";
import backgroundImage from "./assets/backgroundImage.jpeg";
const Home = () => {
  return (
    <>
      <section className="flex-top items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <p className="blue_gradient mt-4 text-lg font-mono">
            Discover Open Source Startups and contribute to the future of
            innovation.
          </p>
          <p className="mt-4 mb-6 text-gray-600">
            Find-OSS is a platform that brings together a curated collection of
            open source startups from various domains. Explore exciting
            projects, learn from the codebase, and contribute to their
            development. Whether you're a developer, designer, or an enthusiast,
            Find-OSS provides a gateway to the world of open source software,
            where collaboration and innovation thrive.
          </p>

          <Link
            href="/List"
            className="mt-8 px-3 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Get Started
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
