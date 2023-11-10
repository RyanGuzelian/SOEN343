import React from "react";

const date = new Date().getFullYear()
const Footer = () => {
    return(
        <footer>
            <div>
                <p>&copy; {date} Delivery Service, Inc.</p>
            </div>
        </footer>
    )
}

export default Footer