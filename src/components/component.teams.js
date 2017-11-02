import React from 'react';

import TeamHome from './component.team.home';
import TeamVisitor from './component.team.visitor';

const Teams = ({team_home, team_visitor}) => {
  return(
    <div className="teams">
      <TeamHome team_home={team_home} />
      <TeamVisitor team_visitor={team_visitor}/>
    </div>
  )
};

export default Teams;