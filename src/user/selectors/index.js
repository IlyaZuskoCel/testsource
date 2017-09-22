export const mapOptions = items => items.map(item => ({label: item.name.trim(), value: item.id, item}));
export const map = items => items.reduce((o, v) => Object.assign(o, {[v.id]: v.name.trim()}), {});

