import React from 'react';

const PopUp = ({ open, children }) => {
    return open ? (
        <div className="pop-up-layer">
            <div className="pop-up">{children}</div>
        </div>
    ) : null;
};

export default PopUp;
