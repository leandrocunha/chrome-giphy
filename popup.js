// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

"use strict";

const input = document.getElementById("input");
const button = document.getElementById("search");
const result = document.getElementById("result");
const giphyApi = "WYW5xOsu511SGfqFoA9wC9E2OReIIxJx";

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
        "&limit=8"
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

          video.setAttribute("id", item.id);
          video.setAttribute("src", item.images.fixed_height_small.mp4);
          video.setAttribute("autoplay", "");
          video.setAttribute("loop", "");
          video.setAttribute("class", "btn");
          video.setAttribute("data-clipboard-text", item.bitly_url);

          div.appendChild(video);
          result.appendChild(div);
        });

        new ClipboardJS(".btn");
      });
  }, 1000);
});
