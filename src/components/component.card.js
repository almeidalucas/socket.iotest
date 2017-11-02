import React, {Component} from 'react';

import Header from './component.header';
import Game from './component.game';

class Card extends Component {

  constructor(props) {
    super(props);

    this.state = {
      underUp: true,
      underOpacity: 0,
      overUp: true,
      overOpacity: 0,
    };
  }

  componentDidMount() {
    setInterval(() => {
      if (this.state.overOpacity > 0){
        this.setState({
          overOpacity: this.state.overOpacity - 0.1,
        });
      }
      if (this.state.underOpacity > 0){
        this.setState({
          underOpacity: this.state.underOpacity - 0.1,
        });
      }
    }, 100);
  }

  componentWillReceiveProps(nextProps) {
    console.log('this.props', this.props);
    console.log('nextProps', nextProps);

    const {overUp, overOpacity, underUp, underOpacity} = nextProps.market;

    this.setState({overUp, overOpacity, underUp, underOpacity,});
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