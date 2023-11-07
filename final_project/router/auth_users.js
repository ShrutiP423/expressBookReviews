const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [{username:"test",password: "test123"}];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
let regex = /^[a-zA-Z0-9_-]{3,16}$/;
if(regex.test(username)){
   return true
}
return false
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
let user = users.filter(user=> user.username===username && user.password === password);
if(user.length > 0){
return true;
}
return false
}

//only registered users can login

regd_users.post("/customer/login", (req, res) => {
  //Write your code here
  if (authenticatedUser) {
      res.json({ message: "Customer successfully logged in" });
  }
  res.json({ message: "Not authenticated" })
});

// Add a book review

regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const label = parseInt(req.params.isbn);
  const { review } = req.query;

  if (!review) {
    res.status(400).json({ error: 'Review is required' });
  } else if (books[label]) {
    books[label].review = review;
    res.json({ message: 'The review for the book with ISBN ' + `${label}` + ' has been added/updated'});
  } else {
    res.status(404).json({ error: 'Book not found' });
  }

});


regd_users.delete("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const label = parseInt(req.params.isbn);

  if (books[label]) {
    books[label].review = ''; // Delete the review by setting it to an empty string
    res.json({ message: 'Reviews for ISBN ' + `${label}` +  ' posted by the user test deleted.' });
  } else {
    res.status(404).json({ error: 'Book not found' });
  }

});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
