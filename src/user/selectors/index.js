

export const selectLeagues = leagues => leagues.map(league=>({label:league.name.trim(), id:league.id}));
export const selectTeams = teams => teams.map(team=>({label:team.name.trim(), id:team.id, id_league:team.id_league}));
