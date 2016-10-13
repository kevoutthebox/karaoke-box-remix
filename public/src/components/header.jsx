import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends Component {
  renderLinkTags() {
    //if autenticated display link to signout
    if (this.props.authenticated) {
      return (
        <li className="nav-item">
          <Link className="nav-link" to="/signout">Sign Out</Link>
        </li>
      );
      //if not authenticated display links to login or signup
    } else {
      return [
        <li className="nav-item" key={1}>
          <Link className="nav-link" to="/login">Login</Link>
        </li>,
        <li className="nav-item" key={2}>
          <Link className="nav-link" to="/signup">Signup</Link>
        </li>
      ];
    }
  }

  render() {
    return (
      <nav className="navbar navbar-light">
        <Link to="/" className="navbar-brand">Return to Main</Link>
        <ul className="nav navbar-nav">
          {this.renderLinkTags()}
        </ul>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated : state.auth.authenticated
  };
}

export default connect(mapStateToProps)(Header);
