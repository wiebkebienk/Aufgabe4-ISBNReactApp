import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react'
const { isbn10Checksum, isbn13Checksum } = require('isbn-check/src/isbn-check');
let bookISBN = require('node-isbn');

function App() {

  const [isbnNum, ISBNString] = useState('');
  let [result] = useState('');
  const [bookInfo] = useState(null);

  let authors = [];
  let thumbnailLink = '';

  function Check(button) {
    ISBNString(button.target.value)
  }

  function checkISBN(isbnNum) {
    if (isbnNum.length === 10) {
      result = isbn10Checksum(isbnNum.slice(0, -1));
    }
    if (isbnNum.length === 13) {
      result = isbn13Checksum(isbnNum.slice(0, -1));
    }
    console.log(result);

    if (result == isbnNum.slice(-1)) {
      result('');
      isbn.provider(['openlibrary']).resolve(isbnString, function (err, book) {
        if (err) {
          result('ISBN is valid but book was not found');
          setBookInfo();
        } else {
          setBookInfo();
        }
      });
    } 
    else {
      result('ISBN invalid');
      setBookInfo();
    }
    }
    if (bookInfo) {
      authors = bookInfo.authors.map((author, index) =>
        <li key={index}>{author}</li>
      );
      thumbnailLink = bookInfo.imageLinks.thumbnail;
    }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>ISBN-Checker</h1>
        <input type="text" value={isbnNum} onInput={Check}></input>
        <button onClick={() => checkISBN(isbnNum)}>Check ISBN</button>
        <p style={{color: result === 'ISBN valid' ? "green" : "red" }}>{result}</p>
        <div>
          <h3>{bookInfo ? bookInfo.title : ''}</h3>
          <ul>{authors}</ul>
          <p>{bookInfo ? bookInfo.description : ''}</p>
          <img src={thumbnailLink} />
        </div>
      </header>
    </div>
  );
}

export default App;
