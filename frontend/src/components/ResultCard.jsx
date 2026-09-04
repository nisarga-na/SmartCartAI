function ResultCard({ result }) {

    if (!result) return null;

    return (

        <div className="result-card">

            <h2>
                🎯 SmartCart Analysis
            </h2>

            <div className="platform-price">

                <span>
                    🟡 Blinkit Total
                </span>

                <strong>
                    {
                        result.strategies
                            ?.blinkitOnly !== null
                            ? `₹${result.strategies.blinkitOnly}`
                            : "Unavailable"
                    }
                </strong>

            </div>

            <div className="platform-price">

                <span>
                    ⚪ Zepto Total
                </span>

                <strong>
                    {
                        result.strategies
                            ?.zeptoOnly !== null
                            ? `₹${result.strategies.zeptoOnly}`
                            : "Unavailable"
                    }
                </strong>

            </div>

            <div className="platform-price best-price">

                <span>
                    🏆 Hybrid SmartCart Total
                </span>

                <strong>
                    ₹{
                        result.strategies
                            ?.cheapestMix
                    }
                </strong>

            </div>

            <h3>

                {result.recommendation}

            </h3>

        </div>
    );
}

export default ResultCard;