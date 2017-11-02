import React, {Component} from 'react';
import './App.css';
import io from 'socket.io-client';
import _ from 'lodash';

import Card from './components/component.card';

class App extends Component {

  constructor(props) {
    super();

    this.state = {
      competition: [],
      match: [],
      market: [],
    };

    const socket = io('http://188.166.85.23:49160');

    socket.on('/match', (res) => {
      const {competition} = this.state;
      let exist = false;

      let newMarket = {
        odd: 'Carregando...',
        overUp: false,
        overOpacity: 0,
        over: 0,
        underUp: false,
        underOpacity: false,
        under: 0,
      };

      _.forEach(competition, (item, idx) => {
        const {competition} = this.state;
        if (res.betfair_event_id === item.match.betfair_event_id) {
          if (item.event_id !== undefined) {
            newMarket = item.market;
          }

          this.setState({
            competition: [
              ..._.slice(competition, 0, idx),
              {match: res, market: newMarket},
              ..._.slice(competition, idx + 1, competition.length)],
          }, () => {
            console.log('Competition', this.state.competition);
          });
          exist = true;
        }
      });

      if (!exist) {
        this.setState({
          competition: _.concat(competition, {
            match: res,
            market: newMarket,
          }),
        }, () => {
          console.log('Match', this.state.competition);
        });
      }
    });

    socket.on('/market', (res) => {
      const {competition} = this.state;
      const {market, match} = competition;
      let exist = false;

      let overAtb = 0, overAtl = 0, underAtb = 0, underAtl = 0, over = 0, under = 0;
      _.forEach(res.overUnder15.over.atb, (item) => {
        overAtb += item.price;
      });
      _.forEach(res.overUnder15.over.atl, (item) => {
        overAtl += item.price;
      });
      _.forEach(res.overUnder15.under.atb, (item) => {
        underAtb += item.price;
      });
      _.forEach(res.overUnder15.under.atl, (item) => {
        underAtl += item.price;
      });

      _.forEach(competition, (item, idx) => {
        if (item.match.betfair_event_id === res.event_id) {
          const sumOver = overAtb + overAtl, sumUnder = underAtb + underAtl;
          let overOpacity = 1, overUp = true, underOpacity = 1, underUp = true;

          /*if (item !== null) {
            if (sumOver > item.over) {
              overOpacity = 1;
              overUp = false;
            } else if (sumOver < item.over) {
              overOpacity = 1;
              overUp = true;
            } else {
              overOpacity = item.overOpacity;
              overUp = item.overUp;
            }

            if (sumUnder > item.under) {
              underOpacity = 1;
              underUp = false;
            } else if (sumUnder < item.under) {
              underOpacity = 1;
              underUp = true;
            } else {
              underOpacity = item.underOpacity;
              underUp = item.underUp;
            }
          }*/

          over = overAtb + overAtl;
          under = underAtb + underAtl;

          this.setState({
            competition: [
              ..._.slice(competition, 0, idx),
              {
                match: item.match,
                market: {
                  ...res,
                  overOpacity,
                  overUp,
                  underOpacity,
                  underUp,
                  over: Number(over).toFixed(2),
                  under: Number(under).toFixed(2),
                  odd: Number(res.overUnder15.over.bdatb[0].price).toFixed(2),
                  overPercent: Number(100 * over / (over + under)).toFixed(2),
                  underPercent: Number(100 * under / (over + under)).toFixed(2),
                },
              },
              ..._.slice(competition, idx + 1, competition.length)],
          }, () => {
            console.log('Competition Market', this.state.competition);
          });
          exist = true;
        }
      });
    });
  }

  componentDidMount() {
  }

  render() {
    const {competition} = this.state;

    return (
      <div>
        {
          competition.map((item, idx) => {
            return (<Card key={item.match.betfair_event_id} match={item.match} market={item.market}/>);
          })
        }
      </div>
    );
  }
}

export default App;