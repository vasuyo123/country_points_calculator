import React, { useState, useEffect } from 'react';
import './Tooltip.css';

const Tooltip = ({ content, onClose }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    setShowTooltip(Boolean(content));
  }, [content]);

  const handleCloseClick = (e) => {
    e.stopPropagation();
    setShowTooltip(false);
    onClose();
  };

  return (
    <div className="tooltip-container">
      {showTooltip && (
        <div className="tooltip-popup">
          <span className="close-icon" onClick={handleCloseClick} role="img" aria-label="Close">
            &times;
          </span>
          <div className="tooltip-content">{content}</div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
