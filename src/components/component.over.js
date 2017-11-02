import React from 'react';

import ArrowDownward from 'material-ui/svg-icons/navigation/arrow-downward';
import ArrowUpward from 'material-ui/svg-icons/navigation/arrow-upward';

const Over = ({overPercent, overUp, overOpacity, over}) => {
  return(
    <div className="over">
      <p className="over-percent">OVER: {overPercent}%</p>
      <p className="over-under-p">
        {overUp ?
          <ArrowUpward style={{fillOpacity: overOpacity, color: '#e7375d',}}/> :
          <ArrowDownward style={{fillOpacity: overOpacity, color: '#e7375d',}}/>
        } £ {over}
      </p>
    </div>
  )
};

export default Over;