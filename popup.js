// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

"use strict";

const input = document.getElementById("input");
const button = document.getElementById("search");
const result = document.getElementById("result");
const giphyApi = "WYW5xOsu511SGfqFoA9wC9E2OReIIxJx";
const limit = 20;

input.focus();

button.addEventListener("click", function() {
  const inputValue = input.value;
  const loading = document.createElement("p");

  result.innerHTML = "";
  loading.innerText = "loading...";
  result.appendChild(loading);

  setTimeout(function() {
    fetch(
      "http://api.giphy.com/v1/gifs/search?q=" +
        inputValue +
        "&api_key=" +
        giphyApi +
        "&limit=" +
        limit
    )
      .then(response => response.json())
      .then(body => {
        if (!body.data.length) {
          loading.innerHTML = "no gif found";
          return;
        }

        result.removeChild(loading);

        body.data.map(item => {
          const div = document.createElement("div");
          const video = document.createElement("video");

          div.setAttribute("class", "grid-item");
          div.style.height = item.images.fixed_width_small_still.height + "px";
          div.style.width = item.images.fixed_width_small_still.width + "px";

          video.setAttribute("id", item.id);
          video.setAttribute("src", item.images.downsized_small.mp4);
          video.setAttribute("autoplay", "");
          video.setAttribute("loop", "");
          video.setAttribute("class", "btn");
          video.setAttribute("data-clipboard-text", item.bitly_url);

          div.appendChild(video);
          result.appendChild(div);
        });

        const btnClipboard = new ClipboardJS(".btn");
        const iso = new Isotope(result, {
          itemSelector: ".grid-item",
          masonry: {
            columnWidth: 100,
            gutter: 5
          }
        });
        iso.appended(result);
        iso.layout();
      });
  }, 1000);
});
