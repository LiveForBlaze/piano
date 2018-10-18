import React, { Component } from 'react';

class ListItem extends Component {
  render() {
    const { data, key } = this.props;
    console.log(data.question_id);
    return (
      <tr>
        <th scope="row">{key}</th>
        <td>{data.owner.display_name}</td>
        <td>{data.title}</td>
        <td>{data.answer_count}</td>
        <td>{data.tags.join(', ')}</td>
      </tr>
    );
  }
}

export default ListItem;
