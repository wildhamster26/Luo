import React from 'react';
import { Link } from 'react-router-dom';
import api from '../../../api';
import ModalInteraction from './ModalInteraction'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import MapModal from './MapModal'

const ItemCard = ({name, id, pictures, pricePerPeriod, period, description, searchFilter}) => {
  if (name.toLowerCase().includes(searchFilter)) {
    pictures.length === 0 && (pictures = '/images/generic.png')
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
            {api.isLoggedIn() && <Link to="/" >Availability</Link>}
            {!api.isLoggedIn() && <ModalInteraction itemId={id} text="Availability" />}
          </div>
          <div>
            <p>{description}<br/><a id="map-modal-link" href="#"><MapModal buttonLabel="Map" /></a></p>
          </div>
          <div className="itemCard-btn-div">
            {api.isLoggedIn() && <Button>Request</Button>}
            {!api.isLoggedIn() && <ModalInteraction itemId={id} text="Request" />}
          </div>
      </div>
    )
  } else {
    return null
  }
}


export default ItemCard

