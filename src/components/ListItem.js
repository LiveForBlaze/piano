import React, { Component } from 'react';

class ListItem extends Component {
  render() {
    const { data, id, updateData } = this.props;
    return (
      <tr>
        <th scope="row">{id}</th>
        <td>{data.owner.display_name}</td>
        <td>{data.title}</td>
        <td>{data.answer_count}</td>
        <td>
          {
            data.tags.map((item, i) => {
              return <div key={i} onClick={() => {updateData(item)}}>{item}</div>
            })
          }
        </td>
      </tr>
    );
  }
}

export default ListItem;
