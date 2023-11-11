"use client";

import React, { useEffect, useState } from "react";
import { getOpenSourceStartups } from "@app/api/GetOpenSourceStartups";

const List = () => {
  const [startups, setStartups] = useState([]); // Hydrate repo cards
  const [loading, setLoading] = useState(true); // Loading animation
  const [hoveredRepo, setHoveredRepo] = useState(null); // Display stars on hover

  useEffect(() => {
    const fetchData = async () => {
      try {
        const openSourceStartups = await getOpenSourceStartups();
        setStartups(openSourceStartups);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRepoHover = (repo) => {
    setHoveredRepo(repo);
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4 flex justify-center">
        List of Open Source Startups
      </h1>

      {/* Loading animation. */}
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="rounded-full animate-spin h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <>
          <ul className="space-y-4">
            {startups && startups.length > 0 ? (
              startups.map((startup) => (
                <li
                  key={startup.id}
                  className="flex items-center justify-between rounded-md shadow-md p-4 bg-slate-100 relative group"
                  /* Display repo link only when hovering over */
                  onMouseEnter={() => handleRepoHover(startup)}
                  onMouseLeave={() => handleRepoHover(null)}
                >
                  {/* Displaying Card*/}
                  <span className="text-lg font-medium font-mono">
                    {startup.name}
                  </span>

                  {hoveredRepo && hoveredRepo.id === startup.id && (
                    <div className="absolute top-0 right-0 transform translate-y-[-10px] p-2 bg-gray-400 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {startup.desc}
                    </div>
                  )}
                </li>
              ))
            ) : (
              <p className="flex text-center justify-center pt-4">
                No startups found.
              </p>
            )}
          </ul>
        </>
      )}
    </div>
  );
};

export default List;
