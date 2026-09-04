const axios = require("axios");

async function test() {
  try {
    const response = await axios.post(
      "https://blinkit.com/v1/layout/search?q=milk&search_type=type_to_search"
    );

    console.log("SUCCESS");
    console.log(response.data);
  } catch (error) {
    console.log("ERROR");

    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
}

test();