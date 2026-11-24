/** Pure inventory view helpers. The source inventory is never mutated. */
export function filterInventory(items, { query = '', category = 'all', sort = 'default' } = {}, getInfo = () => ({})) {
  const normalizedQuery = String(query).trim().toLocaleLowerCase('ru');
  const result = [...(Array.isArray(items) ? items : [])].filter(item => {
    if (!item || typeof item.name !== 'string') return false;
    const info = getInfo(item.name) || {};
    const matchesQuery = !normalizedQuery
      || item.name.toLocaleLowerCase('ru').includes(normalizedQuery)
      || String(info.description || '').toLocaleLowerCase('ru').includes(normalizedQuery);
    const matchesCategory = category === 'all' || info.category === category;
    return matchesQuery && matchesCategory;
  });

  if (sort === 'name') result.sort((a, b) => a.name.localeCompare(b.name, 'ru'));
  if (sort === 'freshness') result.sort((a, b) => (b.freshness ?? 100) - (a.freshness ?? 100));
  return result;
}
