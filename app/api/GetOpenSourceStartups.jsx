import { Octokit } from "@octokit/core";

const API_TOKEN = "";

export const getOpenSourceStartups = async (page, perPage) => {
  const octokit = new Octokit({
    auth: `token ${API_TOKEN}`,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  try {
    const response = await octokit.request("GET /search/users", {
      q: "hasura",
      per_page: perPage,
      page: page,
    });

    return response.data.items;
  } catch (error) {
    console.error("Error fetching open-source startups:", error);
    throw error;
  }
};

/*export default async function getOpenSourceStartups() {
  try {
    const response1 = await axios.get("./companyNames.json");
    const startupNames = response1.data; // Update variable name to startupNames

    // Iterate over the startup names
    for (const startupName of startupNames) {
      // Make an API call to the GitHub API
      const response = await axios.get(
        "https://api.github.com/search/repositories",
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json",
          },
          params: {
            q: startupName,
            per_page: 10, // Number of results per page (adjust as needed)
            sort: "stars",
            order: "desc",
            page: 1, // Page number (adjust as needed)
          },
        }
      );

      // Process the response as needed
      // ... (add your logic here)
      console.log(response.data.items);
    }
  } catch (error) {
    console.error(error);
  }
}
*/
