import React, {useEffect, useState} from 'react';
import './App.scss';
import COLORS_ARRAY from "./colorsArray";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import {faQuoteLeft} from '@fortawesome/free-solid-svg-icons'
import {faQuoteRight} from '@fortawesome/free-solid-svg-icons'

let quotesUrl = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

function App() {
  const [quote, setQuote] = useState("Work expands so as to fill the time available for its completion.");
  const [author, setAuthor] = useState("Cyril N. Parkinson");
  const [quotesArray, setQuotesArray] = useState(null);
  const [accentColor, setAccentColor] = useState("#282c34");
  
  const fetchQuotes = async (url) => {
    const response = await fetch(url);
    const parsedJSON = await response.json();
    setQuotesArray(parsedJSON.quotes);
  }

  useEffect(() => {
    fetchQuotes(quotesUrl)
  })

  const getRandomQuote = () => {
    let randomInteger = Math.floor(quotesArray.length * Math.random());
    setAccentColor(COLORS_ARRAY[randomInteger]);
    setQuote(quotesArray[randomInteger].quote);
    setAuthor(quotesArray[randomInteger].author);
  };

  return (
    <div className="App">
      <header className="App-header" style={{backgroundColor: accentColor, color: accentColor}}>
      <div id="quote-box" style={{color: accentColor}}>
        <h2 id="text">
          <span id="quote-icon"><FontAwesomeIcon icon={faQuoteLeft} /></span>
          {quote}
          <span id="quote-icon"><FontAwesomeIcon icon={faQuoteRight} /></span>
        </h2>
        <p id="author">- {author}</p>
        
        <div className="buttons">
          <a id="tweet-quote" style={{backgroundColor: accentColor}} 
            href={encodeURI(`https://www.twitter.com/intent/tweet?text=${quote} -${author}`)}>
            <FontAwesomeIcon icon={faTwitter} /></a>
          <button id="new-quote" style={{backgroundColor: accentColor}} onClick={() => getRandomQuote()}>New Quote</button>
        </div>
      
      </div>
      </header>
    </div>
  );
}

export default App;
