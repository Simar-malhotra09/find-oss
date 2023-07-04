"use client";

import React, { useEffect, useState } from "react";
import { getOpenSourceStartups } from "@app/api/GetOpenSourceStartups";

const List = () => {
  const [startups, setStartups] = useState([]); //Hydrate orgs
  const [loading, setLoading] = useState(true); // Loading animation
  const [hoveredRepo, setHoveredRepo] = useState(null); // Display stars on hover

  useEffect(() => {
    const fetchData = async () => {
      try {
        const openSourceStartups = await getOpenSourceStartups();
        setStartups(openSourceStartups);
        setLoading(false);
      } catch (error) {
        // Handle error
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRepoHover = (repo) => {
    setHoveredRepo(repo);
  };

  const formatStars = (stargazersCount) => {
    if (stargazersCount >= 1000) {
      return `${(stargazersCount / 1000).toFixed(1)}k`;
    }
    return stargazersCount.toString();
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4 flex justify-center">
        List of Open Source Startups
      </h1>
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="rounded-full animate-spin h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <ul className="space-y-4">
          {startups && startups.length > 0 ? (
            startups.map((startup) => (
              <li
                key={startup.id}
                className="flex items-center justify-between rounded-md shadow-md p-4 bg-slate-100"
                onMouseEnter={() => handleRepoHover(startup)}
                onMouseLeave={() => handleRepoHover(null)}
              >
                <span className="text-lg font-medium font-mono">
                  <a href={startup.html_url} target="_blank">
                    {startup.name}
                  </a>
                </span>
                <span className="text-gray-500 ml-2">
                  Stars: {formatStars(startup.stargazers_count)}
                </span>
                {hoveredRepo && hoveredRepo.id === startup.id && (
                  <>
                    <a
                      href={startup.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      GitHub Repo
                    </a>
                  </>
                )}
              </li>
            ))
          ) : (
            <p className="flex text-center justify-center pt-4">
              No startups found.
            </p>
          )}
        </ul>
      )}
    </div>
  );
};

export default List;
