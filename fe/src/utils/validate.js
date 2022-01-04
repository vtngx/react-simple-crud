export const validateField = (data, field) => {
  if (field === 'name' && !data.trim())
    return 'Name cannot be blank.'

  if (field === 'price') {
    if (!String(data).trim())
      return 'Price cannot be blank.'

    if (!parseFloat(String(data).trim()))
      return 'Price must be a number.'
  }

  if (field === 'category' && !data.trim())
    return 'Category cannot be blank.'

  return null
}