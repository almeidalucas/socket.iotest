import _ from 'lodash';

export const fetchMatch = (socket, competition) => {
  socket.on('/match', (res) => {
    let exist = false;

    _.forEach(competition, (item) => {
      if (res.betfair_event_id === item.match.betfair_event_id) {
        item.match = res;
        exist = true;
      }
    });

    if (!exist) {
      let newCompetition = {match: res, market: undefined};
      this.setState({competition: _.concat(competition, newCompetition)}, () => {
        console.log('Competition', this.state.competition);
      });
    }
  });
};