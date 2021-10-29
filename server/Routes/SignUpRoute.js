const express = require('express');
const router = express.Router();
const User = require('../Models/Users');
const bcrypt = require('bcrypt');

const {email, username, password, gender, city, state} = req.body;

router.post('/basicInfo', async (req, res, next) =>{
//Check if user exists first
	User.find({ email: req.body.email})
	.exec()
	.then(user => {
		//If user email already exists, post error
		if (user.length >= 1){
			return res.status(409).json({
				message: 'Email address already exists'
			});
			//If user does not exist, continue to creation
			}else {
				bcrypt.hash(password, 10, (err,hash) => {
					if (err) {
						return res.status(500).json({
							error: err
						});
					}
					else{
						const newUser = await User.create({
							email:     email,
							username:  username,
							password:  hash, 
							gender:    gender,
							city:      city,
							state:     state
						});
						newUser.save()
						.then(result => {
							console.log(result);
							res.status(201).json({
								message: 'User Created'
							})
						})
						.catch(err => {
							console.log(err);
							res.status(500).json({
								error: err
							});
						});
					}
				});
			}
		})
	});

//Not sure what this is...
module.exports = router;