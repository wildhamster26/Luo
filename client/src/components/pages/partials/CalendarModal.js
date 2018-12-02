import Calendar from 'react-calendar'
import React from 'react';
import { Button, Modal, ModalHeader, ModalFooter } from 'reactstrap';
import {Link } from 'react-router-dom'
import api from '../../../api';

class ModalInteraction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemId: props.itemId,
      modal: false,
      buttonLabel: "",
      pickedDates: null
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
    localStorage.setItem("itemId", this.props.itemId);
  }
  
  handleRange = (e) => {
    this.setState({
      pickedDates: e
    })
    console.log('e[0]', (e[0]))
    console.log('e[0]', typeof(e[0]))
    let date = new Date(1984, 0, 29)
    console.log('date', date)
    console.log('date', date)
    console.log('typeof(date)', typeof(date))
    


  }
  
  render() {
    // console.log(this.props.itemId);
    return (
      <div id="calendar-modal-div">
        <a onClick={this.toggle}><h6>{this.props.linkName}</h6></a>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>
            <h4>Availability</h4>
          </ModalHeader>
          <div id="availability-calendar">
            <Calendar selectRange={true} onChange={(e) => this.handleRange(e)} />
          </div>
          <ModalFooter>
            {!api.isLoggedIn() && <Link to="/login" >Sure - Let's sign up!</Link>}
            {api.isLoggedIn() && <button className="btn-second">Pick dates</button>}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalInteraction;