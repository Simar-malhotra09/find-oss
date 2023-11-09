import axios from "axios";

export const getOpenSourceStartups = async () => {
  try {
    const response = await axios.get("http://localhost:5001/api");
    return response.data;
  } catch (error) {
    console.error("Error fetching open-source startups:", error);
    throw error;
  }
};

// So we still have to see how to parse through the json file
// I tried a few things before, and none of them worked, but with
// the backend up now hopefully should be able to make some progress
