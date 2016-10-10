import React, { Component } from 'react';

export default class Home extends Component {
  enter(e) {
    e.preventDefault();
    let singerName = this.refs.name.value;
  }
  render() {
    return (
      <form className="enter-form" onSubmit={this.enter.bind(this)}>
        <input ref="name"
          className="form-control"
          placeholder="Please enter name"
          required />
        <button type="submit" className="btn btn-primary">Enter</button>
      </form>
    );
  }
}
