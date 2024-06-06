const router = require("express").Router()
// const {login,singup} =require('../controller/AuthController')

const {login} = require('../controller/AuthController')
// const r = require("../middleware/require")


router.post("/login",login);
// router.post("/signup",singup)

// router.get("/refresh",refrshTokenController)

// router.post("/loginn",loginn)


module.exports = router;