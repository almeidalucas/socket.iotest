import React from 'react';

import Teams from './component.teams';
import Over from './component.over';
import Under from './component.under';

const Game = ({
                team_home, team_visitor,
                underPercent, underUp, underOpacity, under,
                overPercent, overUp, overOpacity, over,
              }) => {
  return (
    <div className="game">
      <Teams team_home={team_home} team_visitor={team_visitor}/>
      <div className="over-under">
        <Over
          overPercent={overPercent}
          overUp={overUp}
          overOpacity={overOpacity}
          over={over}
        />
        <Under
          underPercent={underPercent}
          underUp={underUp}
          underOpacity={underOpacity}
          under={under}
        />
      </div>
    </div>
  );
};

export default Game;