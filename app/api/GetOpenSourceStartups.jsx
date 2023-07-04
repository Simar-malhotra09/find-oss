import axios from "axios";

const API_TOKEN = "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";
export const getOpenSourceStartups = async () => {
  try {
    const response = await axios.get(
      "https://api.github.com/search/repositories",
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "content-type": "text/plain",
        },
        params: {
          q: "cpp",
          //sort: "stars",
          //order: "desc",
          page: 1,
        },
      }
    );

    return response.data.items;
  } catch (error) {
    console.error("Error fetching open-source startups:", error);
    throw error;
  }
};

// This works for now I am getting the first page when
// I look up cpp on github consistent with the api Get req.
