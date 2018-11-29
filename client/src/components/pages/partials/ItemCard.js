import React from 'react'


const ItemCard = ({name, pictures, pricePerPeriod, period, description}) => {
  pictures.length === 0 && (pictures = '/images/generic.png')
  return (
      <div className="itemCard">
        <div className="itemCard-name">
          <h5>{name}</h5>
        </div>
        <div className="itemCard-img-wrapper">
          <img src={pictures} />
        </div>
        <div className="itemCard-sub-img">
          <h6>{pricePerPeriod}€ per {period}</h6>
          <h6><a href="#">Availability</a></h6>
        </div>
        <div>
          <p>{description}</p>
        </div>
        <div className="itemCard-btn-div">
          <button>Request</button>
        </div>
    </div>
  )
}

export default ItemCard
