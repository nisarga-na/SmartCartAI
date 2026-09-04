const {
  searchProducts
} = require('../services/aggregators/searchAggregator');

const search = async (req, res) => {
  try {
    const { q } = req.query;

    const results = await searchProducts(q);

    res.status(200).json({
      success: true,
      query: q,
      results
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = { search };