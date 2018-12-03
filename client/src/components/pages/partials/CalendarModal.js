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
      // reservedDates: props.reservedDates,
      reservedDates: ["Fri Dec 07 2018 00:00:00 GMT+0100 (Central European Standard Time)","Wed Dec 05 2018 00:00:00 GMT+0100 (Central European Standard Time)"],
      pickedDays: []
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
    localStorage.setItem("itemId", this.props.itemId);
  }

  handleClickedDay = (e) => {
    let pickedDaysArr = [...this.state.pickedDays]
    if (!JSON.stringify(pickedDaysArr).includes(JSON.stringify(e))){
      pickedDaysArr.push(e)
    } else {
      pickedDaysArr = pickedDaysArr.filter(day => (JSON.stringify(day) !== JSON.stringify(e)))
    }
    this.setState({
      pickedDays: pickedDaysArr
    })


  }

  handleSubmittedDays = () => {
    if (this.state.pickedDays.length !== 0) {
      console.log(this.state.pickedDays)
    }
  }
  
  render() {
    return (
      <div id="calendar-modal-div">
        <a onClick={this.toggle}><h6>{this.props.linkName}</h6></a>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>
            Availability
          </ModalHeader>
          <div id="availability-calendar">
            <Calendar  tileDisabled={({activeStartDate, date, view }) => this.state.reservedDates.includes(date.toString())} selectRange={false} tileClassName={({ date, view }) => (view === 'month' && JSON.stringify(this.state.pickedDays).includes(JSON.stringify(date.toJSON())) ? 'react-calendar__tile--active--custom' : "")} onClickDay={(e) => this.handleClickedDay(e)} />
          </div>
          <ModalFooter>
            {!api.isLoggedIn() && <Link to="/login" >Sure - Let's sign up!</Link>}
            {api.isLoggedIn() && <button className="btn-second" onClick={() => this.handleSubmittedDays()}>Pick dates</button>}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalInteraction;