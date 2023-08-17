import React, { useState, useEffect } from 'react';
import './Tooltip.css';

const Tooltip = ({ content }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div
      className="tooltip-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showTooltip && (
        <div className="tooltip-popup">
          <div className="tooltip-content">{content}</div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
