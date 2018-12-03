import React from 'react';
import { Button, Modal, ModalHeader, ModalFooter } from 'reactstrap';


class DeleteItemModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      buttonLabel: ""
    };

    this.toggle = this.toggle.bind(this);
    this.toggleAndDelete = this.toggleAndDelete.bind(this);
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  toggleAndDelete() {
    this.props.deleteItem()
    this.toggle()
  }
  
  
  render() {
    return (
      <div>
        <Button onClick={this.toggle}><img src="../images/trash.png" alt="delete" width="20px" /></Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>
            Are you sure you want to delete this item?
          </ModalHeader>
          <ModalFooter>
            <Button  onClick={this.toggleAndDelete}>Yes.</Button>
            <Button onClick={this.toggle} >Oops, no.</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}


export default DeleteItemModal;