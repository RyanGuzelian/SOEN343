import React from "react";

const Card = ({title, imageUrl, body, price}) => {
    return (
        <div className="card-container">
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
            </div>
            <div className="btn">
                <button>
                    {price}
                </button>
            </div>
        </div>
    )
}

export default Card