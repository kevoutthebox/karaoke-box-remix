import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Home extends Component {
  enter(e) {
    e.preventDefault();
    let singerName = this.refs.name.value;
    console.log(singerName)
  }

  handleUser(e) {
    e.preventDefault();
    this.props.fetchData();
    e.stopPropagation();
  }


  render() {
    return (
      <div>
        <form className="enter-form form-group" onSubmit={this.enter.bind(this)}>
          <input ref="name"
            className="form-control"
            placeholder="Please enter name"
            required />
          <button type="submit" className="btn btn-primary">Enter</button>
        </form>
        <button className="btn btn-success" onClick={this.handleUser.bind(this)}>View User Data</button>
      </div>
    );
  }
}

export default connect(null, actions)(Home);
