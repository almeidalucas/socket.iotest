import React from 'react';

import Title from './component.title';
import Odd from './component.odd';
import GameTime from './component.game.time';

const Header = ({odd}) => {
  return(
    <header className="App-header">
      <Title />
      <Odd odd={odd} />
      <GameTime />
    </header>
  )
};

export default Header;