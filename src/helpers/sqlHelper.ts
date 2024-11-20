export function parseObject(filters: { [key: string]: any }): Object {
  const whereClause: { [key: string]: any } = {};
  for (const key in filters) {
    if (filters[key] !== undefined) {
      whereClause[key] = filters[key];
    }
  }
  return whereClause;
}
