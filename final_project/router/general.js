const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  let {username, password} = req.body;
  let user = Object.values(users).filter(user => user.useranme === username)
  if(user.length > 0){
      res.json({message: "User already exists",user});
  }
  users.push(username,password)
  res.json({message: "Customer successfully registered. Now you can login"})
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  const response = { books: books };
  res.json(response);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const label = parseInt(req.params.isbn);

  if (books[label]) {
    res.json(books[label]);
  } else {
    res.status(404).json({ error: 'Book not found' });
  }

  return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let author = req.params.author;
  if (author) {
    const filteredBooks = Object.values(books).filter(book => book.author === author);
    const response = { booksbyauthor: filteredBooks };
    res.json(response);
  } else {
    res.status(400).json({ error: 'Missing author parameter' });
  }

  return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  let title = req.params.title;
  if (title) {
    const filteredBooks = Object.values(books).filter(book => book.title === title);
    const response = { booksbytitle: filteredBooks };
    res.json(response);
  } else {
    res.status(400).json({ error: 'Missing author parameter' });
  }

  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const label = parseInt(req.params.isbn);

  if (books[label]) {
    res.json(books[label].reviews);
  } else {
    res.status(404).json({ error: 'Book not found' });
  }

  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
