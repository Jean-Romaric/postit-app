const express = require("express")
const router = express.Router()

const Note = require("../models/Note")

// CREATE
router.post("/", async (req, res) => {
    try {
        const note = await Note.create(req.body)
        res.status(201).json(note)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// READ ALL
router.get("/", async (req, res) => {
    try {
        const notes = await Note.find()
        res.json(notes)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// DELETE
router.delete("/:id", async (req, res) => {
    try {
        await Note.findByIdAndDelete(req.params.id)
        res.json({ message: "Note supprimée" })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

module.exports = router