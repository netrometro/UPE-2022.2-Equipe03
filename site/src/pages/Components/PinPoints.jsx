import React from 'react';
import '../../index.css';
const PinpointsColumn = () => {
  return (
    <div className="pinpoints-column">
      <div className="pinpoint red"><p>Common:$20 </p></div>
      <div className="pinpoint blue"><p>Rare:$100</p></div>
      <div className="pinpoint green"><p>Epic:$150</p></div>
      <div className="pinpoint yellow"><p>Legendary:$500</p></div>
    </div>
  );
};

export default PinpointsColumn;
