import * as React from 'react';

import './styles.scss';

export default class Header extends React.Component {
  render() {
    return (
        <div className="header">
          <a href="/">Books</a>
        </div>
    );
  }
}
