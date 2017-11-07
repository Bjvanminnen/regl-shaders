import React, { Component } from 'react';
import run from './run';

class App extends Component {
  state = {
    width: 1280,
    height: 640
  };

  componentDidMount() {
    run(this.canvas);
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
