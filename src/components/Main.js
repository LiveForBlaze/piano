import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Main extends Component {
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

  handleSearch() {
    const { question } = this.state;
    const url = `https://api.stackexchange.com/2.2/search?order=desc&sort=activity&intitle=${question}&site=stackoverflow`;
    fetch(url)
      .then(d => d.json())
      .then(d => {
        this.setState({
          data: d,
        })
      });
  }

  render() {
    const { question, data } = this.state;
    console.log(data);
    if (data) {
      return (
        <Redirect to={{
          pathname: `/list`,
          state: { data },
        }}
        />
      )
    }
    return (
      <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="Enter your question" aria-label="Enter your question" aria-describedby="basic-addon2" value={question} onChange={this.handleChange} />
        <div className="input-group-append"><button className="btn btn-outline-secondary" type="button" onClick={this.handleSearch}>Search</button></div>
      </div>
    );
  }
}

export default Main;
