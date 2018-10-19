import React, { Component } from 'react';
import ListItem from './ListItem';

class List extends Component {
  state = {
    tag: '',
    tagData: '',
  }
  updateData = (value) => {
    this.setState({ tag: value });
    const url = `https://api.stackexchange.com/2.2/questions?order=desc&sort=votes&tagged=${value}&site=stackoverflow`;
    fetch(url)
      .then(d => d.json())
      .then(d => {
        this.setState({
          tagData: d,
        });
      });
  }
  render() {
    const { data } = this.props.location.state;
    const { tagData, tag } = this.state;
    return (
      <div>
      <div className="main">
      <h2>Search results:</h2>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Author</th>
              <th scope="col">Title</th>
              <th scope="col">Answers</th>
              <th scope="col">Tags</th>
            </tr>
          </thead>
          <tbody>
            {
              !!data &&
              data.items.map((item, i) => {
                return (
                  <ListItem data={item} key={i} id={i} updateData={this.updateData} />
                );
              })
            }
          </tbody>
        </table>
        </div>
        {
          !!tagData &&
        <div className="main">
        <h2>Tag: {tag}</h2>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Author</th>
              <th scope="col">Title</th>
              <th scope="col">Answers</th>
              <th scope="col">Tags</th>
            </tr>
          </thead>
          <tbody>
            {
              tagData.items.map((item, j) => {
                return (
                  <ListItem data={item} key={j} id={j} updateData={this.updateData} />
                );
              })
            }
          </tbody>
        </table>
        </div>
      }
      </div>
    );
  }
}

export default List;
