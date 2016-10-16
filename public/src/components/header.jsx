import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends Component {

  renderHamburger() {
    return (
      <button type="button" className="collapsed navbar-toggle" data-toggle="collapse"
       data-target="#bs-nav" aria-expanded="false">
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
    )
  }

  renderLeftLinkTags() {
    return [
      <li className="nav-item">
        <Link className="nav-item" to="/about">About</Link>
      </li>,
      <li className="nav-item">
        <Link className="nav-item" to="contact">Contact</Link>
      </li>
    ];
  }
  renderRightLinkTags() {
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
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            {this.renderHamburger()}
            <Link to="/" className="navbar-brand"><span className="glyphicon glyphicon-volume-up" aria-hidden="true"></span> Karaoke-Box</Link>
          </div>
          <div className="collapse navbar-collapse" id="bs-nav">
            <ul className="nav navbar-nav">
              {this.renderLeftLinkTags()}
            </ul>
            <ul className="nav navbar-nav navbar-right">
              {this.renderRightLinkTags()}
            </ul>
          </div>
        </div>
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
