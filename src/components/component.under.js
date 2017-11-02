import React from 'react';

import ArrowDownward from 'material-ui/svg-icons/navigation/arrow-downward';
import ArrowUpward from 'material-ui/svg-icons/navigation/arrow-upward';

const Under = ({underPercent, underUp, underOpacity, under}) => {
  return(
    <div className="under">
      <p className="under-percent">UNDER: {underPercent}%</p>
      <p className="over-under-p">
        {underUp ?
          <ArrowUpward style={{fillOpacity: underOpacity, color: '#7320ea',}}/> :
          <ArrowDownward style={{fillOpacity: underOpacity, color: '#7320ea',}}/>
        } £ {under}
      </p>
    </div>
  )
};

export default Under;