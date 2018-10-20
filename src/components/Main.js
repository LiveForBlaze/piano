import React, { Component } from 'react';
import { withRouter } from 'react-router';

class MainUI extends Component {
  constructor(){
    super();
    this.state = {
      question: '',
      data: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  handleChange(e) {
    this.setState({
      question: [e.target.value],
    })
  }
  handleKeyPress = (event) => {
    if(event.key == 'Enter'){
      this.handleSearch();
    }
  }
  handleSearch() {
    const { question } = this.state;
    const url = `https://api.stackexchange.com/2.2/search?order=desc&sort=votes&intitle=${question}&site=stackoverflow`;
    fetch(url)
      .then(d => d.json())
      .then(d => {
        this.setState({
          data: d,
        });
      });
  }

  render() {
    const { question, data } = this.state;
    if (data) {
      this.props.history.push({
        pathname: '/list',
        state: { data },
      });
    }
    return (
      <div className="container fade-in">
        <div className="row align-items-center height">
          <div className="col">
          <h1><b>#PIANOTEST</b>: <em className="rus">RUSTAM MUKHAMEDOV</em></h1>
            <div className="input-group mb-3 search border-white">
              <input type="text" className="form-control border-white" placeholder="Enter your question" aria-label="Enter your question" aria-describedby="basic-addon2" value={question} onKeyPress={this.handleKeyPress} onChange={this.handleChange} />
              <div className="input-group-append"><button className="btn btn-outline-secondary button" type="button" onClick={this.handleSearch}>Search</button></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export const Main =  withRouter(MainUI);
