require("dotenv").config()
const express = require("express")
const path = require("path")

const app = express()

const PORT = process.env.PORT || 8000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))

require("./routes")(app)

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`)
})
