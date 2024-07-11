document.getElementById("compareButton").addEventListener("click", () => {
  try {
    chrome.storage.sync.get(["adTitles", "adPrices"], async (data) => {
      const response = await fetch("http://localhost:3000/api/compare-price", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // Uncomment these lines if you want to use stored data
          titles: data.adTitles,
          prices: data.adPrices,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Result:", result);

      document.getElementById("result").innerText = JSON.stringify(
        result.basePrice
      );
    });
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("result").innerText = "Error: " + error.message;
  }
});
