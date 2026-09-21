export const getPagination = (page, limit) => {
  const offset = (page - 1) * limit
  return { limit, offset }
}

export const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: items } = data
  const currentPage = page ? +page : 1
  const totalPages = Math.ceil(totalItems / limit)

  return { totalItems, items, totalPages, currentPage }
}
