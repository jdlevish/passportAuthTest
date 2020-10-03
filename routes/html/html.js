
const router = require('express').Router();
var path = require("path")


// html routes
router.get('/welcome', (req, res) => {
    res.sendFile(path.join(__dirname, "./html/index.html"));
})


module.exports = router;