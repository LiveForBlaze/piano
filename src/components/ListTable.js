import React, { Component } from 'react';
import { ListItem } from './ListItem';
import { translate } from 'react-i18next';

class ListTableUI extends Component {
  shouldComponentUpdate(nextProps) {
    return !this.props.currentUser || !nextProps.currentUser;
  }
  render() {
    const { title, click, dataOrder, data, update, t} = this.props;
    return (
      <div className="main">
        <h3>{title}</h3>
        <table className="table border-0">
          <thead className="thead">
            <tr className="head">
              <td><h6>{t('list.Author')}</h6></td>
              <td><h6>{t('list.Title')}</h6></td>
              <td className={dataOrder === 'desc' ? `sort ${t('list.sort')}` : `sort ${t('list.sort')} up`}><h6 onClick={click} className="sort-link">{t('list.Answers')}</h6></td>
              <td><h6>{t('list.Tags')}</h6></td>
            </tr>
          </thead>
          <tbody>
            {
              !!data && data.items &&
              data.items.map((item, i) => {
                  return (
                    <ListItem data={item} key={i} id={i} updateData={update} />
                  );
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export const ListTable = translate('common')(ListTableUI)
