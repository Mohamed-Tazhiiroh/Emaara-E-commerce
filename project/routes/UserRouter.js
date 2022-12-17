
const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/UserControles')


router.post('/new', userControllers.Registertion)
router.post('/login', userControllers.Login)
router.get('/Get', userControllers.Getallusers)
router.get("/:userID", userControllers.GetOneuser)
router.put("/:userID", userControllers.UpdateUser)
router.delete("/:userID", userControllers.DeleteUser)

module.exports = router;