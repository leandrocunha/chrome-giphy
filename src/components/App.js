import React, { Fragment } from "react";
import GphApiClient from "giphy-js-sdk-core";

import config from "../config";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this.giphy = GphApiClient(config.giphyApiKey);
  }

  componentDidMount() {
    this.giphy
      .search("gifs", { q: "cats", limit: 5 })
      .then(response => this.setState({ ...response }))
      .catch(err => {});
  }

  render() {
    const { data } = this.state;

    return (
      <Fragment>
        <h1>Hello, World!</h1>
        {data.map(item => (
          <img key={item.id} src={item.images.downsized.url} />
        ))}
      </Fragment>
    );
  }
}

export default App;
