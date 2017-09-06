export const selectLeagues = leagues => leagues.map(league => ({label: league.name.trim(), id: league.id}));
export const selectTeams = teams => teams.map(team => ({
    label: team.name.trim(),
    id: team.id,
    id_league: team.id_league
}));

export const mapOptions = items => items.map(item => ({label: item.name.trim(), value: item.id, item}));
export const map = items => items.reduce((o, v) => Object.assign(o, {[v.id]: v.name.trim()}), {});

