import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { ListTable } from './ListTable';

import { MAX_TAGS, MAX_AUTHERS_QUESTIONS, MAX_PAGESIZE } from '../constants.js'

class ListUI extends Component {
  state = {
    name: '',
    answersOrder: 'desc',
    tag: '',
    data: '',
    dataOrder: 'desc',
    addData: '',
  }
  scrollToQuick = () => {
    const quick = document.getElementById('quick');
    quick.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  handleChangeOrder = () => {
    const { answersOrder, addData } = this.state;
    if ( answersOrder === 'desc') {
      this.changeOrder('1', '-1', addData);
      this.setState({answersOrder: 'asc'});
    } else {
      this.changeOrder('-1', '1', addData);
      this.setState({answersOrder: 'desc'});
    }
  }
  handleChangeDataOrder = () => {
    const { dataOrder, data } = this.state;
    if ( dataOrder === 'desc') {
      this.changeOrder('1', '-1', data);
      this.setState({dataOrder: 'asc'});
    } else {
      this.changeOrder('-1', '1', data);
      this.setState({dataOrder: 'desc'});
    }
  }
  changeOrder = (x, y, obj ) => {
    let tempData = obj.items.slice().sort( function (a, b) {
      if (a.answer_count > b.answer_count) {
        return x;
      }
      if (a.answer_count < b.answer_count) {
        return y;
      }
    });
    obj.items = tempData;
    this.setState({ obj });
  }
  componentDidMount(){
    const { data } = this.props;
    const url = `https://api.stackexchange.com/2.2/search?pagesize=${MAX_PAGESIZE}&order=desc&sort=votes&intitle=${data}&site=stackoverflow`;
    fetch(url)
      .then(d => d.json())
      .then(d => {
        this.setState({
          data: d,
        });
      });
  }
  updateData = (type, value) => {
    let url = '';
    switch (type) {
      case 'tag':
        this.setState({ tag: value });
        url = `https://api.stackexchange.com/2.2/questions?pagesize=${MAX_TAGS}&order=desc&sort=votes&tagged=${value}&site=stackoverflow`;
        fetch(url)
          .then(d => d.json())
          .then(d => {
            this.setState({
              addData: d,
              name: 'TAG',
            });
            this.scrollToQuick();
        });
        break;
      case 'author':
        console.log(value.user_id)
        this.setState({ tag: `${value.display_name} (id: ${value.user_id})` });
        url = `https://api.stackexchange.com/2.2/users/${value.user_id}/questions?pagesize=${MAX_AUTHERS_QUESTIONS}&order=desc&sort=votes&site=stackoverflow`;
        fetch(url)
          .then(d => d.json())
          .then(d => {
            this.setState({
              addData: d,
              name: 'AUTHOR',
            });
            this.scrollToQuick();
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
    const { question } = this.props.location.state;
    const { addData, tag, name, data, dataOrder } = this.state;
    const { t } = this.props;
    return (
      <div className="container fade-in">
        <div className="row align-items-center">
          <div className="col">
            {
              
                <ListTable title={`#${t('list.SEARCH RESULTS')}: ${question}`} dataOrder={dataOrder} data={data} click={this.handleChangeDataOrder} update={this.updateData}/>
            }
            {
              !data && !data.error_message &&
                <div className="main">
                  <h5>
                    {t('list.no data')}
                  </h5>
                </div>
            }
            {
              data.error_message &&
                <div className="main">
                  <h5>
                    {t('list.has error')}:
                  </h5>
                  {data.error_message}
                </div>
            }
        {
          !!addData &&
          <div id='quick'>
            <ListTable title={`#${name}: ${tag}`} dataOrder={dataOrder} data={addData} click={this.handleChangeOrder} update={this.updateData}/>
          </div>
        }
      </div>
    </div>
  </div>
    );
  }
}

export const List = translate('common')(ListUI);
