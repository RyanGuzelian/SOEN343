import React from "react";

const Card = ({ title, imageUrl, body, price, onClick }) => {
    return (
        <div className="card-container" onClick={onClick}>
            <div className="image-container">
                <img src={imageUrl} alt="Card visual"/>
            </div>
            <div className="card-content">
                <div className="card-title">
                    <h3>{title}</h3>
                </div>
                <div className="card-body">
                    <p>{body}</p>
                </div>
                <div className="card-price">
                    {price && <p>Price: ${price}</p>}
                </div>
            </div>
        </div>
    )
}

export default Card;
