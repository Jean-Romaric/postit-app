const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const connectDB = require("./config/db")

dotenv.config()
const dns = require('dns');
dns.setServers(['1.1.1.1', '8.8.8.8'])



const app = express()

connectDB()

app.use(cors())
app.use(express.json())

// 👉 importer les routes
const noteRoutes = require("./routes/noteRoutes")

// 👉 utiliser les routes
app.use("/notes", noteRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log("Serveur lancé"))