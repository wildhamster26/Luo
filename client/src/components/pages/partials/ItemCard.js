import React from 'react';
import { Link } from 'react-router-dom';
import api from '../../../api';
import ModalInteraction from './ModalInteraction'
import { Button } from 'reactstrap';
import MapModal from './MapModal'


const ItemCard = ({id, name, pictures, pricePerPeriod, period, description}) => {
  console.log(pictures)
  if (pictures === undefined || pictures.length === 0) 
    pictures = '/images/generic.png'

  let handleClick = () => {
    window.location.assign('/items/'+id);    
  };

  
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
          {api.isLoggedIn() && <Link to={"/items/"+id} >Availability</Link>}
          {!api.isLoggedIn() && <ModalInteraction itemId={id} text="Availability" />}
        </div>
        <div>
          <p>{description}<br/><Link id="map-modal-link" to={"/items/"+id}><MapModal buttonLabel="Map" /></Link></p>
        </div>
        <div className="itemCard-btn-div">
        {api.isLoggedIn() && <Button onClick={handleClick}>Request</Button>}
        {!api.isLoggedIn() && <ModalInteraction itemId={id} text="Request" />}
        </div>
    </div>
  )
}

export default ItemCard;
