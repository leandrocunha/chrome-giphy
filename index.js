var GphApiClient = require("giphy-js-sdk-core");
client = GphApiClient("WYW5xOsu511SGfqFoA9wC9E2OReIIxJx");

/// Gif Search
client
  .search("gifs", { q: "cats" })
  .then(response => {
    response.data.forEach(gifObject => {
      console.log(gifObject);
    });
  })
  .catch(err => {});

/// Sticker Search
client
  .search("stickers", { q: "cats" })
  .then(response => console.log(response))
  .catch(err => console.log(err));
