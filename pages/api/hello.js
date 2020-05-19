export default (req, res) => {
  req.log.info('/api/hello')
  res.statusCode = 200
  res.json({ msg: 'hi there' })
}
