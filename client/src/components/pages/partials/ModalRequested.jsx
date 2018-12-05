import React from 'react';
import { Modal, ModalHeader, ModalFooter } from 'reactstrap';
import {Link } from 'react-router-dom'

class ModalRequested extends React.Component {
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
        <a onClick={this.toggle}>{this.props.text}</a>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>
            An email has been sent to the owner of this item with your request.
          </ModalHeader>
          <ModalFooter>
            <Link to="/login" ><p></p></Link>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalRequested;