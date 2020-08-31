module.exports = function (app) {
  app.get("/", (req, res) => {
    res.send("realIndex")
  })

  app.post("/", (req, res) => {
    if (req.body.password == process.env.PASSWORD) {
      res.json({ msg: "OK" })
    } else {
      res.json({ msg: "FORBIDDEN" })
    }
  })
}
