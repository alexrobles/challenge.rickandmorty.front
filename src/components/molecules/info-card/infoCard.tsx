import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CharacterReference } from '../../../interfaces/CharacterReference';
import { FaStar } from 'react-icons/fa';
import './infoCard.scss';


const InfoCard = (props : CharacterReference) => {

  const [favorite, setFavorite] = useState(props.favorite);

  const toggleFavorite = () => {
    setFavorite(!favorite);
    // You might want to trigger an API call to update the favorite status in the backend here
  };
  
  return (
    <div className="info-card">
      <img src={props.image} alt={props.name} className="info-card__image" />
      <div className="info-card__details">
        <h2 className="info-card__name" >
          {props.name}
        </h2>
        <p className="info-card__status">
          Status: <span>{props.status}</span>
        </p>
        <p className="info-card__species">
          Species: <span>{props.species}</span>
        </p>
        <p className="info-card__type">
          Type: <span>{props.type}</span>
        </p>
        <p className="info-card__gender">
          Gender: <span>{props.gender}</span>
        </p>
        <p className="info-card__gender">
         <span>{props.species === "Human" ? 'Recomendado' : 'No recomendado'}</span>
        </p>
        <button
          className="info-card__favorite-button"
          onClick={toggleFavorite}
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <FaStar className={favorite ? 'star-icon active' : 'star-icon'} />
        </button>
      </div>
    </div>
  );
};

export default InfoCard;
