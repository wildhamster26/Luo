/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
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
        <button className="btn-map" onClick={this.toggle}><h6>{this.props.buttonLabel}</h6></button>
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