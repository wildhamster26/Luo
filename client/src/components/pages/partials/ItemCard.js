import React from 'react';
import { Link } from 'react-router-dom';
import api from '../../../api';
import ModalInteraction from './ModalInteraction'
import ReactModal from 'react-modal'
import { Button } from 'reactstrap';
import MapModal from './MapModal'
import CalendarModal from './CalendarModal'

const ItemCard = ({id, name, imgPath, pricePerPeriod, period, description, searchFilter, categories, categoryFilter, reservedDates}) => {
  let catFilt = false
  for (let i = 0; i < categories.length; i++) {
    if (categoryFilter.includes(categories[i])) {
      catFilt = true
    }
  }
  // console.log(description)
  if (((searchFilter !== "" && (name.toLowerCase().includes(searchFilter) || description.toLowerCase().includes(searchFilter))) || catFilt) || (searchFilter === "" && categoryFilter.length === 0)) {
    if (imgPath === undefined || imgPath.length === 0) 
      imgPath = 'https://res.cloudinary.com/wildhamster26/image/upload/v1543699130/folder-name/generic.png'

    let handleClick = () => {
      window.location.assign('/items/'+id);    
    };


      return (
          <div className="itemCard">
            <div className="itemCard-name">
              <h5>{name}</h5>
            </div>
            <div className="itemCard-img-wrapper">
              <img src={imgPath} alt="The item"/>
            </div>
            <div className="itemCard-sub-img">
              <h6>{pricePerPeriod}€ per {period}</h6>
              {api.isLoggedIn() && <CalendarModal itemId={id} reservedDates={reservedDates} linkName="Availability" />}
              {!api.isLoggedIn() && <CalendarModal itemId={id} linkName="Availability" />}
            </div>
            <div>
              <p>{description}<br/><a id="map-modal-link" href="/"><MapModal buttonLabel="Map" /></a></p>
            </div>
            <div className="itemCard-btn-div">
            {api.isLoggedIn() && <button className="btn-second" onClick={handleClick}>Request</button>}
            {!api.isLoggedIn() && <ModalInteraction itemId={id} text="Request" />}
            </div>
        </div>
      )
  } else {
    return (
    <div>
    </div>
    )
  }
}


export default ItemCard