import React from 'react'


const ItemCard = ({name, pictures, pricePerPeriod, period, description}) => {
  pictures.length === 0 && (pictures = '/images/generic.png')
  return (
    <div className="itemCard">
      <div className="itemCard-name">
        <h2>{name}</h2>
      </div>
      <div className="itemCard-img-wrapper">
        <img src={pictures} alt="The item"/>
      </div>
      <div className="itemCard-sub-img">
        <h5>{pricePerPeriod}€ per {period}</h5>
        <h5>Availability</h5>
      </div>
      <div>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default ItemCard
