import axios from "axios";

const API_TOKEN = "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";
export const getOpenSourceStartups = async (page, perPage) => {
  try {
    const response = await axios.get(
      "https://api.github.com/search/repositories",
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
        params: {
          q: "cpp",
          per_page: perPage,
          sort: "stars",
          order: "desc",
          page: page,
        },
      }
    );

    return response.data.items;
  } catch (error) {
    console.error("Error fetching open-source startups:", error);
    throw error;
  }
};
