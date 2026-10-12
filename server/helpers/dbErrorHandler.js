const getErrorMessage = (err) => {
  if (err.code === 11000) return 'A record with this value already exists'
  if (err.name === 'ValidationError') {
    return Object.values(err.errors).map((e) => e.message).join(', ')
  }
  if (err.name === 'CastError') return 'Invalid value for ' + err.path
  return 'Something went wrong'
}

const getStatusCode = (err) => {
  if (err.code === 11000) return 409
  if (err.name === 'ValidationError' || err.name === 'CastError') return 400
  return 500
}

export default { getErrorMessage, getStatusCode }