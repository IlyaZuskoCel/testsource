export const mapOptions = (items, getSearch) => items.map(item => ({
    label: item.name.trim(),
    value: item.id,
    search: getSearch ? getSearch(item) : '',
    item
}));
export const map = items => items.reduce((o, v) => Object.assign(o, {[v.id]: v.name.trim()}), {});

