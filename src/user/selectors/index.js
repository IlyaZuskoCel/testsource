

export const selectLeagues = data => data.map(item=>({label:item.name, id:item.id}));
export const selectTeams = data => data.map(item=>({label:item.name, id:item.id, leagueId:item.id_league}));
