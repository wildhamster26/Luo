/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import Map from './Map'



class MapModal extends React.Component {
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
  }

  render() {
    return (
      <div>
        {/* <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button> */}
        <Button onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Item location</ModalHeader>
          <ModalBody>
            <Map location={this.props.location}/>
          </ModalBody>
          {/* <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter> */}
        </Modal>
      </div>
    );
  }
}

export default MapModal;