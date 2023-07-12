"use client";

import React, { useEffect, useState } from "react";
import { getOpenSourceStartups } from "@app/api/GetOpenSourceStartups";

const List = () => {
  const [startups, setStartups] = useState([]); // Hydrate orgs field
  const [loading, setLoading] = useState(true); // Loading animation
  const [hoveredRepo, setHoveredRepo] = useState(null); // Display stars on hover
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [organizationsPerPage, setOrganizationsPerPage] = useState(10); // Organizations per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const openSourceStartups = await getOpenSourceStartups(
          currentPage,
          organizationsPerPage
        );
        setStartups(openSourceStartups);
        setLoading(false);
      } catch (error) {
        // Handle error
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, organizationsPerPage]);

  const handleRepoHover = (repo) => {
    setHoveredRepo(repo);
  };

  /*Format starcount eg  2,612 => '2.6k' */
  const formatStars = (stargazersCount) => {
    if (stargazersCount) {
      if (stargazersCount >= 1000) {
        return `${(stargazersCount / 1000).toFixed(1)}k`;
      }
      return stargazersCount.toString();
    }
    return "N/A"; // Return a default value if stargazersCount is undefined
  };

  /* Update pages with previous and next buttons*/
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const previousPage = () => {
    setCurrentPage(currentPage - 1);
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
                  className="flex items-center justify-between rounded-md shadow-md p-4 bg-slate-100"
                  /* Display repo link only when hovering over */
                  onMouseEnter={() => handleRepoHover(startup)}
                  onMouseLeave={() => handleRepoHover(null)}
                >
                  {/* Displaying Card*/}
                  <span className="text-lg font-medium font-mono">
                    <a
                      href={startup.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
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

          {/* Redundecy condition check that need to be removed.  */}
          {/* Don't want to display buttons when no orgs found */}
          {startups && startups.length > 0 ? (
            <div className="flex justify-center mt-4">
              <button
                onClick={previousPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
              >
                Previous
              </button>
              <button
                onClick={nextPage}
                className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
              >
                Next
              </button>
              <button className="px-4 py-2 bg-teal-300 text-white rounded-full mr-2">
                {currentPage}
              </button>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default List;
