import React, {Component} from 'react';
import './App.css';
import io from 'socket.io-client';
import ArrowDownward from 'material-ui/svg-icons/navigation/arrow-downward';
import ArrowUpward from 'material-ui/svg-icons/navigation/arrow-upward';


class App extends Component {

  constructor(props) {
    super();

    this.state = {
      match: undefined,
      market: undefined,
      team_home: 'Carregando...',
      team_visitor: 'Caregando...',
      odd: 'Carregando...',
      over: 0,
      under: 0,
      overUp: true,
      underUp: true,
      overOpacity: 0,
      underOpacity: 0,
    };

    const socket = io('http://188.166.85.23:49160');

    socket.on('/match', (res) => {
      const {match} = this.state;
      const {team_home, team_visitor} = res;
      if (match === undefined) {
        this.setState({match: res, team_home, team_visitor}, () => {});
      }
    });

    socket.on('/market', (res) => {
      const {market, match} = this.state;
      if (market === undefined && match !== undefined && match.betfair_event_id === res.event_id) {
        this.setState({market: res}, () => {
          const {market} = this.state;

          let overAtb = 0, overAtl = 0, underAtb = 0, underAtl = 0;
          this.state.market.overUnder15.over.atb.map((item) => {
            overAtb += item.price;
          });
          market.overUnder15.over.atl.map((item) => {
            overAtl += item.price;
          });
          market.overUnder15.under.atb.map((item) => {
            underAtb += item.price;
          });
          market.overUnder15.under.atl.map((item) => {
            underAtl += item.price;
          });

          this.setState({overOpacity: 1, overUp: true, underOpacity: 1, underUp: true,});

          this.setState(
            {
              over: Number(overAtb + overAtl).toFixed(2),
              under: Number(underAtb + underAtl).toFixed(2),
              odd: Number(market.overUnder15.over.bdatb[0].price).toFixed(2),
            },
            () => {
            },
          );
        });
      } else if (market !== undefined && match.betfair_event_id === res.event_id) {
        this.setState({market: res}, () => {
          const {market, over, under} = this.state;

          let overAtb = 0, overAtl = 0, underAtb = 0, underAtl = 0;
          this.state.market.overUnder15.over.atb.map((item) => {
            overAtb += item.price;
          });
          market.overUnder15.over.atl.map((item) => {
            overAtl += item.price;
          });
          market.overUnder15.under.atb.map((item) => {
            underAtb += item.price;
          });
          market.overUnder15.under.atl.map((item) => {
            underAtl += item.price;
          });

          const sumOver = overAtb + overAtl, sumUnder = underAtb + underAtl;

          if (sumOver > over) this.setState({overOpacity: 1, overUp: false,});
          else if(sumOver < over) this.setState({overOpacity: 1, overUp: true,});

          if (sumUnder > under) this.setState({underOpacity: 1, underUp: false,});
          else if(sumUnder < under) this.setState({underOpacity: 1, underUp: true,});

          this.setState(
            {
              over: Number(sumOver).toFixed(2),
              under: Number(sumUnder).toFixed(2),
              odd: Number(market.overUnder15.over.bdatb[0].price).toFixed(2),
            },
            () => {
            },
          );
        });
      }
    });
  }

  componentDidMount() {
    setInterval(() => {
      const {underOpacity, overOpacity} = this.state;

      if (underOpacity > 0) this.setState({underOpacity: underOpacity - 0.1});
      if (overOpacity > 0) this.setState({overOpacity: overOpacity - 0.1});
    }, 100);
  }

  render() {
    const {over, under, odd, team_home, team_visitor, overUp, underUp, overOpacity, underOpacity} = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <div className="top-line">
            <span className="header-live">LIVE</span>
          </div>
          <div className="odd-block">
            <h1 className="App-title">ODD: {odd}</h1>
          </div>
          <div className="bop-line">
            <span className="header-time">22:12</span>
          </div>
        </header>
        <div className="game">
          <div className="teams">
            <div className="team">
              <p>{team_home}</p>
              <span>1</span>
            </div>
            <div className="team">
              <span>1</span>
              <p>{team_visitor}</p>
            </div>
          </div>
          <div className="over-under">
            <div className="over">
              <p className="over-percent">OVER: 18%</p>
              <p className="over-under-p">{overUp ? <ArrowUpward style={{fillOpacity: overOpacity, color: '#e7375d',}} /> : <ArrowDownward style={{fillOpacity: overOpacity, color: '#e7375d',}} />} £ {over}</p>
            </div>
            <div className="under">
              <p className="under-percent">UNDER: 86%</p>
              <p className="over-under-p">{underUp ? <ArrowUpward style={{fillOpacity: underOpacity, color: '#7320ea',}} /> : <ArrowDownward style={{fillOpacity: underOpacity, color: '#7320ea',}} />} £ {under}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
