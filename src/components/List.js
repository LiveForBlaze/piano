import React, { Component } from 'react';
import ListItem from './ListItem';

class List extends Component {
  render() {
    const { data } = this.props.location.state;
    console.log(data);
    return (
      <table class="table">
        <thead class="thead-dark">
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
            <ListItem data={item} key={i} id={i} />
          );
        })
      }
      </tbody>
    </table>
    );
  }
}

export default List;
