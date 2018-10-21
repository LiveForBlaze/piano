import React, { Component } from 'react';
import { translate } from 'react-i18next';

export class NavbarUI extends Component {
  handleOnSelectLanguage = (value) => {
    window.localStorage.setItem('locale', value);
    this.props.i18n.changeLanguage(value);
  };
  render() {
    const { t } = this.props;
    return (
      <div className="dropdown absolute">
        <button className="btn dropdown-toggle drop" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {t('main.Language')}
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
          <button className="dropdown-item" type="button" onClick={() => this.handleOnSelectLanguage('ru')}>Русский</button>
          <button className="dropdown-item" type="button" onClick={() => this.handleOnSelectLanguage('en')}>English</button>
        </div>
      </div>
    );
  }
}

export const Navbar = translate('common')(NavbarUI);
