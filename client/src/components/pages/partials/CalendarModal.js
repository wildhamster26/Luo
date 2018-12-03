import Calendar from 'react-calendar'
import React from 'react';
import { Modal, ModalHeader, ModalFooter } from 'reactstrap';
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
    console.log('e[1]', (e[1]))
    console.log((Math.floor(((e[1] - e[0] + 1000)/1000)/3600)/24) + " day(s)")
    // let date = new Date(1984, 0, 29)
    // console.log('date', date)
    // console.log('date', date)
    // console.log('typeof(date)', typeof(date))
  }
  
  render() {
    // console.log(this.props.itemId);
    // console.log(this.props.reservedDates[0])
    // console.log(this.props.reservedDates[1])
    return (
      <div id="calendar-modal-div">
        <a onClick={this.toggle}><h6>{this.props.linkName}</h6></a>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>
            Availability
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