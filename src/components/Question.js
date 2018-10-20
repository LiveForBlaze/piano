import React, { Component } from 'react';

class Question extends Component {
  state = {
    data: '',
  }
  componentDidMount() {
    const { question_id } = this.props.location.state.value;
    const url = `https://api.stackexchange.com/2.2/questions/${question_id}/answers?order=desc&sort=activity&site=stackoverflow&filter=withbody`;
    fetch(url)
      .then(d => d.json())
      .then(d => {
        this.setState({
          data: d,
        });
      });
  }
  render() {
    const { value } = this.props.location.state;
    const { data } = this.state;
    console.log(value);
    console.log(data);
    const created = new Date(value.creation_date);
    return (
      <div className="container fade-in">
        <div className="row align-items-center">
          <div className="col">
      <div className="main">
        <h3>{value.title}</h3>
        <h5 className="grey">Author: {value.owner.display_name}</h5>
        <h5 className="grey">Created: {String(created)}</h5>
        <h5 className="answers">Answers ({value.answer_count}):</h5>
        {
          !!data &&
          data.items.map((item, i) => {
              return (
                <div key={i} className="answer">
                  <h4>{`${item.owner.display_name} (reputation: ${item.owner.reputation})`}:</h4>
                  <div className="content" dangerouslySetInnerHTML={{__html: item.body}}></div>
                </div>
              );
          })
        }
      </div>
      </div>
      </div>
      </div>
    );
  }
}

export default Question;
