

export function asyncHandler(fn) {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      next(new Error(err.message))
    })
  }
}

export const globalHandleError = (err, req, res, next) => {
  if (process.env.MOOD === "DEV") {
    res.json({ message: err.message})
  } else {
    res.json({ message: err.message})
  }
}
