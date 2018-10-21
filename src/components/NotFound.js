import React, { Component } from 'react';

export class NotFound extends Component {
  render() {
    return (
      <div className="container fade-in">
        <div className="row align-items-center">
          <div className="col">
            <div className="main">
              <h2>Not Found:</h2>
              <h5>
                Emmm... I think this app doesn't have such page... at least I hope so, otherwise there are some propblems I have to solve.
              </h5>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
