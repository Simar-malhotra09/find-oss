import axios from "axios";

/* export const getOpenSourceStartups = async () => {
  try {
    const response = await axios.get("http://localhost:5001/api");
    return response.data;
  } catch (error) {
    console.error("Error fetching open-source startups:", error);
    throw error;
  }
}; 
*/
export const getOpenSourceStartups = async () => {
  try {
    // Import the JSON file directly
    const companyNames = require("../../scraper/companyNames.json");
    return companyNames;
  } catch (error) {
    console.error("Error fetching open-source startups:", error);
    throw error;
  }
};
