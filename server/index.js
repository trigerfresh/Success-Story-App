const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(express());
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/success')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));


const userSchema = mongoose.Schema({
	name : String,
	company : String,
	pkg : String,
});

const User = mongoose.model('users', userSchema);

app.post('/save', async(req, res)=>{
	const {name, company, pkg} = req.body;
	const user = new User({name, company, pkg})
	try{
		await user.save();
		res.status(201).send('Data save successful');
	}catch(err){
		res.status(500).send('Error while saving data : ', err);
	}
})

app.listen(5000, ()=>{console.log('Running @ 5000')})