const Torte = require("../models/Torte.model");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const router = require("express").Router();
const Comment=require("../models/Comment.model");
const fileUploader = require("../config/cloudinary.config");

router.post('/tortes',isAuthenticated, (req, res) => {
    const { name, description, size, category,image } = req.body

    if (!name || !description) {
        res.json({ message: "Please fill in all mandetory Fields" })
        return
    }

    Torte.create({ name: name, description: description, category: category,image })
        .then((newTorte) => {
            res.json({ message: "Torte Successfully Created" })
        })
        .catch((err) => {
            res.json(err)
        })
})
router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
    // console.log("file is: ", req.file)
   
    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }
     // Get the URL of the uploaded file and send it as a response.
  // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend
  
  res.json({ fileUrl: req.file.path });
});

//GET
router.get('/tortes', (req, res) => {

    Torte.find()
        .then((allTortes) => {
            res.json(allTortes)

        })
        .catch((err) => {
            res.json(err)
        })

})

router.get('/tortes/:id', (req, res) => {
    const { id } = req.params

    Torte.findById(id)
        .then((oneTorte) => {
            res.json(oneTorte)
        })
        .catch((err) => {
            res.json(err)
        })

})

router.put('/tortes/:id', (req, res) => {
    const { id } = req.params
    const { name, sizes, prices, description, category, image } = req.body

    console.log(req.body)
    Torte.findByIdAndUpdate(id, { name, sizes, prices, description, category, image }, { new: true })
        .then((updatedTorte) => {
            res.json(updatedTorte)
        })
        .catch(err => {
            res.json(err)
        })

})

router.delete('/tortes/:id', (req, res) => {

    Torte.findByIdAndDelete(req.params.id)
        .then((deletedTorte) => {
            if (!deletedTorte) {
                res.json({ message: "Torte Not Found" })
                return
            }
            res.json({ message: "Torte deleted" })
        })
        .catch((err) => {
            res.json(err)
        })

})


module.exports = router;