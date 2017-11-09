import React, { Component } from 'react';
import run from './run';
import { loadBuffer } from 'web-audio-utils';

class App extends Component {
  state = {
    width: 1280,
    height: 640
  };

  componentDidMount() {


    loadBuffer('/andata.mp3')
    .then(buffer => {
      run(this.canvas, buffer);
    });
  }

  render() {
    return (
      <canvas
        ref={e => this.canvas = e}
        width={this.state.width}
        height={this.state.height}
      />
    );
  }
}

export default App;
