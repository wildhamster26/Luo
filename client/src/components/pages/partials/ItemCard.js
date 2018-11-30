import React from 'react';
import { Link } from 'react-router-dom';
import api from '../../../api';
import ModalInteraction from './ModalInteraction'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import MapModal from './MapModal'


const ItemCard = ({id, name, pictures, pricePerPeriod, period, description}) => {
  pictures.length === 0 && (pictures = '/images/generic.png')
  let handleClick = (e) => {
    console.log("this item's id is:", id);
  }

  let check = ()=>{
    console.log("please log in");
  }

  
  return (
      <div className="itemCard">
        <div className="itemCard-name">
          <h5>{name}</h5>
        </div>
        <div className="itemCard-img-wrapper">
          <img src={pictures} alt="The item"/>
        </div>
        <div className="itemCard-sub-img">
          <h6>{pricePerPeriod}€ per {period}</h6>
          {api.isLoggedIn() && <Link to="/" onClick={handleClick}>Availability</Link>}
          {!api.isLoggedIn() && <Link to="/" onClick={check}>Availability</Link>}
        </div>
        <div>
          <p>{description}<br/><a id="map-modal-link" href="#"><MapModal buttonLabel="Map" /></a></p>
          
        </div>
        <div className="itemCard-btn-div">
        {api.isLoggedIn() && <ModalInteraction itemId={id} text="Request" />}
        {!api.isLoggedIn() && <ModalInteraction itemId={id} onClick={handleClick} text="Request" />}
        </div>
    </div>
  )
}

export default ItemCard
