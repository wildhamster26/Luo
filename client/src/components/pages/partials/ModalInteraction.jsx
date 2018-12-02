import React from 'react';
import { Button, Modal, ModalHeader, ModalFooter } from 'reactstrap';
import {Link } from 'react-router-dom'

class ModalInteraction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      buttonLabel: ""
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
    localStorage.setItem("itemId", this.props.itemId);
  }
  
  
  render() {
    // console.log(this.props.itemId);
    return (
      <div>
        <a onClick={this.toggle}><h6>{this.props.text}</h6></a>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>
            Please log in or sign up to do that.
          </ModalHeader>
          <ModalFooter>
            <Link to="/login" >Sure - Let's sign up!</Link>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalInteraction;