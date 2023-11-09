const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 5001;
require("dotenv").config();

// Enable CORS
app.use(cors());

const API_TOKEEN = process.env.API_TOKEN;

app.get("/api", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.github.com/search/repositories",
      {
        headers: {
          Authorization: `Bearer ${API_TOKEEN}`,
          "content-type": "text/plain",
        },
        params: {
          q: "google",
          //q: "airbnb",
          sort: "stars",
          order: "desc",
          page: 1,
        },
      }
    );

    res.json(response.data.items);
  } catch (error) {
    console.error("Error forwarding request to GitHub API:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
