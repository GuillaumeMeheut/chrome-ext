// Content script to extract ad data from the page
console.log("test");

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", afterDOMLoaded);
} else {
  afterDOMLoaded();
}

function afterDOMLoaded() {
  console.log("DOMContentLoaded");
  const adTitlesElmnt = document.querySelectorAll(
    `p[data-qa-id="aditem_title"]`
  );
  const adPriceElmnt = document.querySelectorAll(
    `p[data-test-id="price"] > span`
  );

  const adTitles = [...adTitlesElmnt].map(
    (titleElement) => titleElement.innerText
  );
  const adPrices = [...adPriceElmnt].map(
    (priceElement) => priceElement.innerText
  );

  console.log(adTitles, adPrices);

  chrome.storage.sync.set({
    adTitles,
    adPrices,
  });
}
