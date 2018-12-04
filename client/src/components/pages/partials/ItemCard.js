import React from 'react';
import { Link } from 'react-router-dom';
import api from '../../../api';
import ModalInteraction from './ModalInteraction'
// import ReactModal from 'react-modal'
// import { Button } from 'reactstrap';
import MapModal from './MapModal'
import CalendarModal from './CalendarModal'
import DeleteItemModal from './DeleteItemModal'

// const ItemCard = ({id, name, imgPath, pricePerPeriod, period, description, searchFilter, categories, categoryFilter, reservedDates}) => {


const ItemCard = ({id, owner, name, imgPath, pricePerPeriod, period, description, searchFilter, categories, categoryFilter, reservedDates, updateDeleteItem}) => {
  let catFilt = false
  for (let i = 0; i < categories.length; i++) {
    if (categoryFilter.includes(categories[i])) {
      catFilt = true
    }
  }
  var pickedDays = "not updated"

  let requestItem = () => {
    api.requestItem(id, pickedDays)
    .then(res =>{
      alert("The owner has been contacted with your email.");
    });
  }

  let getPickedDays = (e) => {
    pickedDays = e
  }

  if (((searchFilter !== "" && (name.toLowerCase().includes(searchFilter) || description.toLowerCase().includes(searchFilter))) || catFilt) || (searchFilter === "" && categoryFilter.length === 0)) {
    if (imgPath === undefined || imgPath.length === 0) 
      imgPath = 'https://res.cloudinary.com/wildhamster26/image/upload/v1543699130/folder-name/generic.png'

    let handleClick = () => {
      window.location.assign('/items/'+id);    
    };

    let deleteItem = () => {
      api.deleteItem(id)
      .then(res => {
        console.log(res);
        updateDeleteItem()
      });
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
              {api.isLoggedIn() && <CalendarModal pickedDays={(e) => {getPickedDays(e)}} itemId={id} reservedDates={reservedDates} linkName="Availability" />}
              {!api.isLoggedIn() && <CalendarModal itemId={id} linkName="Availability" />}
            </div>
            <div>
              <div className="map-modal-div">{description}<br/><MapModal buttonLabel="Map" /></div>
            </div>
            <div className="itemCard-btn-div">
              {/* {api.isLoggedIn() && <button className="btn-second" onClick={handleClick}>Request</button>} */}
              {api.isLoggedIn() && <button className="btn-second" onClick={requestItem}>Request</button>}
              {!api.isLoggedIn() && <ModalInteraction itemId={id} text="Request" />}
              {api.isLoggedIn() && (JSON.parse(localStorage.getItem('user'))._id === owner._id) && <DeleteItemModal deleteItem={deleteItem} itemId={id}/>}
              <Link className="itemCard-btn-div" to={`/items/${id}/edit`}><img src="../images/edit.png" alt="edit" width="20px" /></Link>
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