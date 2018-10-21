import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { translate } from 'react-i18next';
import '../App.css';

require('es6-promise').polyfill();
require('isomorphic-fetch');

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
  componentDidMount(){
    window.addEventListener("keyup", function(e){ if(e.keyCode === 27) window.history.go(-1); }, false);
  }
  handleChange(e) {
    this.setState({
      question: [e.target.value],
    })
  }
  handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      this.handleSearch();
    }
  }
  handleSearch() {
    const { question } = this.state;
    this.setState({
      data: question,
    });
  }
  render() {
    const { question, data } = this.state;
    const { t } = this.props
    if (data) {
      this.props.history.push({
        pathname: '/list',
        state: { data, question },
      });
    }
    return (
      <div className="container fade-in">
        <div className="row align-items-center height">
          <div className="col">
          <h1><b>#PIANOTEST</b>: <a href="https://www.instagram.com/rustam_blaze_mukhamedov/" className="rus">{t('main.RUSTAM MUKHAMEDOV')}</a></h1>
            <div className="input-group mb-3 search border-red">
              <input type="text" className="form-control border-grey" placeholder={t('main.Enter your question')} aria-label="Enter your question" aria-describedby="basic-addon2" value={question} onKeyPress={this.handleKeyPress} onChange={this.handleChange} />
              <div className="input-group-append"><button className="btn btn-outline-secondary button" type="button" onClick={this.handleSearch}>{t('main.Search')}</button></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export const Main =  translate('common')(withRouter(MainUI));
