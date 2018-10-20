import React, { Component } from 'react';
import ListItem from './ListItem';
import Question from './Question';

class List extends Component {
  state = {
    name: '',
    tag: '',
    addData: '',
  }
  updateData = (type, value) => {
    let url = ''
    switch (type) {
      case 'tag':
        this.setState({ tag: value });
        url = `https://api.stackexchange.com/2.2/questions?order=desc&sort=votes&tagged=${value}&site=stackoverflow`;
        fetch(url)
          .then(d => d.json())
          .then(d => {
            this.setState({
              addData: d,
              name: 'TAG',
            });
        });
        break;
      case 'author':
        console.log(value.user_id)
        this.setState({ tag: `${value.display_name} (id: ${value.user_id})` });
        url = `https://api.stackexchange.com/2.2/users/${value.user_id}/questions?order=desc&sort=votes&site=stackoverflow`;
        fetch(url)
          .then(d => d.json())
          .then(d => {
            this.setState({
              addData: d,
              name: 'AUTHOR',
            });
        });
        break;
        case 'title':
          console.log(value);
          this.props.history.push({
            pathname: '/question',
            state: { value },
          });
          break;
      default:
    }
    console.log(this.state.addData)
  }

  render() {
    const { data } = this.props.location.state;
    const { addData, tag, name } = this.state;
    console.log(addData);
    return (
      <div className="container fade-in">
        <div className="row align-items-center">
          <div className="col">
      <div className="main">
      <h3><b>#SEARCH RESULTS:</b></h3>
        <table className="table border-0">
          <thead className="thead">
            <tr className="head">
              <td scope="col"><h6>AUTHOR</h6></td>
              <td scope="col"><h6>Title</h6></td>
              <td scope="col"><h6>Answers</h6></td>
              <td scope="col"><h6>Tags</h6></td>
            </tr>
          </thead>
          <tbody>
            {
              !!data &&
              data.items.map((item, i) => {
                if(i<10) {
                  return (
                    <ListItem data={item} key={i} id={i} updateData={this.updateData} />
                  );
                }
              })
            }
          </tbody>
        </table>
        </div>
        {
          !!addData &&
        <div className="main">
        <h3><b>#{name}: {tag}</b></h3>
        <table className="table border-0">
          <thead className="thead-dark">
            <tr className="head">
              <td scope="col"><h6>AUTHOR</h6></td>
              <td scope="col"><h6>Title</h6></td>
              <td scope="col"><h6>Answers</h6></td>
              <td scope="col"><h6>Tags</h6></td>
            </tr>
          </thead>
          <tbody>
            {
              addData.items.map((item, j) => {
                if(j<10) {
                  return (
                    <ListItem data={item} key={j} id={j} updateData={this.updateData} />
                  );
                }
              })
            }
          </tbody>
        </table>
        </div>
      }
      </div>
    </div>
  </div>
    );
  }
}

export default List;
