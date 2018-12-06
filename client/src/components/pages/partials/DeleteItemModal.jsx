import React from 'react';
import { Modal, ModalHeader, ModalFooter } from 'reactstrap';


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
        <button className="item-delete" onClick={this.toggle}><img src="../images/trash (coral).png" alt="delete" width="20px" /></button>
        {/* <Button onClick={this.toggle}><img src="../images/trash.png" alt="delete" width="20px" className="button"/></Button> */}
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>
            Are you sure you want to delete this item?
          </ModalHeader>
          <ModalFooter>
            <button className="btn-second" onClick={this.toggleAndDelete}>Yes</button>
            <button className="btn-second" onClick={this.toggle} >Oops, no</button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}


export default DeleteItemModal;