import axios from "axios";
//use postman to check api calls
const API_TOKEN = "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";
const companyNames = [];
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
          q: "hasura",
          sort: "stars",
          order: "desc",
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

/*export default async function getOpenSourceStartups() {
  try {
    const response1 = await axios.get("./companyNames.json");
    const startupNames = response1.data; 


    for (const startupName of startupNames) {

      const response = await axios.get(
        "https://api.github.com/search/repositories",
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json",
          },
          params: {
            q: startupName,
            per_page: 10, // Number of results per page 
            sort: "stars",
            order: "desc",
            page: 1, // Page number 
          },
        }
      );

      console.log(response.data.items);
    }
  } catch (error) {
    console.error(error);
  }
}
*/
