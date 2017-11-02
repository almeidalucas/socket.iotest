import React, {Component} from 'react';

import Header from './component.header';
import Game from './component.game';

class Card extends Component {

  constructor(props) {
    super(props);

    this.state = {
      underUp: true,
      underOpacity: 1,
      overUp: true,
      overOpacity: 1,
    };
  }

  componentDidMount() {
    console.log('Card', this.props);
    setTimeout(() => {
      if (this.state.overOpacity > 0){
        this.setState({
          overUp: true,
          overOpacity: this.state.overOpacity - 0.1,
        });
      }
      if (this.state.underOpacity > 0){
        this.setState({
          underUp: true,
          underOpacity: this.state.underOpacity - 0.1,
        });
      }
    }, 100);
  }

  componentDidUpdate(prevProps, prevState) {

    //console.log('prevProps -> ', prevProps);
    //console.log('prevState -> ', prevState);
    //console.log('Props -> ', this.state);
    //console.log('State -> ', this.props);
  }

  render() {
    const {match, market} = this.props;
    const {team_home, team_visitor,} = match;
    const {odd, over, under, overPercent, underPercent} = market;
    const {overUp, overOpacity, underUp, underOpacity} = this.state;

    return (
      <div className="App">
        <Header odd={odd}/>
        <Game
          team_home={team_home}
          team_visitor={team_visitor}
          odd={odd}
          over={over}
          under={under}
          overPercent={overPercent}
          underPercent={underPercent}
          overUp={overUp}
          overOpacity={overOpacity}
          underUp={underUp}
          underOpacity={underOpacity}
        />
      </div>
    );
  }
}

export default Card;