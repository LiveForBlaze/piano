import React, { Component } from 'react';

class ListItem extends Component {
  render() {
    const { data, id, updateData } = this.props;
    return (
      <tr>
        <td><span className="link" onClick={() => {updateData('author', data.owner)}}>{data.owner.display_name}</span></td>
        <td><span className="link" onClick={() => {updateData('title', data)}}>{data.title}</span></td>
        <td><span className="link" onClick={() => {updateData('title', data)}}>{data.answer_count}</span></td>
        <td>
          {
            data.tags.map((item, i) => {
                return <div key={i}><span className="link" onClick={() => {updateData('tag', item)}}>{item}</span></div>
            })
          }
        </td>
      </tr>
    );
  }
}

export default ListItem;
