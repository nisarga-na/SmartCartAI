const axios = require('axios');

async function testRequest() {
  try {
    const response = await axios.get(
      'https://www.bigbasket.com/listing-svc/v1/product/term-completion',
      {
        params: {
          term: 'milk',
          lat: '12.9716',
          lon: '77.5946'
        }
      }
    );

    console.log(response.data);

  } catch (error) {
    console.log('Status:', error.response?.status);
    console.log(error.response?.data);
  }
}

testRequest();