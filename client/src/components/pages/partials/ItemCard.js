import React from 'react';
import { Link } from 'react-router-dom';
import api from '../../../api';
import ModalInteraction from './ModalInteraction'
// import { Button } from 'reactstrap';
import MapModal from './MapModal'
import CalendarModal from './CalendarModal'
import DeleteItemModal from './DeleteItemModal'


const ItemCard = ({updateDeleteItem, id, owner, name, imgPath, location, pricePerPeriod, period, description, searchFilter, categories, categoryFilter, reservedDates}) => {

  let catFilt = false
  for (let i = 0; i < categories.length; i++) {
    if (categoryFilter.includes(categories[i].toLowerCase())) {
      catFilt = true
    }
  }
  var pickedDays = ""

  let requestItem = () => {
    if (pickedDays === "") {
      alert("Please pick some dates.");
    } else {
      api.requestItem(id, pickedDays)
      .then(res =>{
        console.log(res)
        alert("The owner has been contacted with your email.");
      });

    }
  }

  let getPickedDays = (e) => {
    pickedDays = e
  }

  if (((searchFilter !== "" && (name.toLowerCase().includes(searchFilter) || description.toLowerCase().includes(searchFilter))) || catFilt) || (searchFilter === "" && categoryFilter.length === 0)) {
    if (imgPath === undefined || imgPath.length === 0) 
      imgPath = 'https://res.cloudinary.com/wildhamster26/image/upload/v1543699130/folder-name/generic.png'

    let deleteItem = () => {
      api.deleteItem(id)
      .then(res => {
        console.log(res);
        updateDeleteItem();
      });
    };

      return (
          <div className="itemCard">
            <div className="itemCard-img-wrapper">
              <img src={imgPath} alt="The item"/>
            </div>
            <div className="itemCard-name">
              <h5>{name}</h5>
            </div>
            <div className="itemCard-sub-img">
              <h6>{pricePerPeriod}€ per {period}</h6>
              {api.isLoggedIn() && <CalendarModal pickedDays={(e) => {getPickedDays(e)}} itemId={id} reservedDates={reservedDates} linkName="Availability" />}
              {!api.isLoggedIn() && <CalendarModal itemId={id} linkName="Availability" />}
            </div>
            <div>
              <div className="map-modal-div">{description}<br/><MapModal buttonLabel="Map" location={location} /></div>
            </div>
            <div className="itemCard-btn-div">
              {api.isLoggedIn() && <button className="btn-second" onClick={requestItem}>Request</button>}
              {!api.isLoggedIn() && <button className="btn-second"><ModalInteraction itemId={id} text="Request" /></button>}
              <div className="editAndDelete">
                {api.isLoggedIn() && (JSON.parse(localStorage.getItem('user'))._id === owner._id) && <button className="item-edit"><Link to={`/items/${id}/edit`}><img src="../images/edit 0F7173.png" alt="delete" width="20px" /></Link></button>}
                {api.isLoggedIn() && (JSON.parse(localStorage.getItem('user'))._id === owner._id) && <DeleteItemModal deleteItem={deleteItem} itemId={id}/>}
              </div>
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


export default ItemCard;