import React, { useEffect, useState } from 'react';
import './App.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons';
import COLORS_ARRAY from './colorsArray';
import quotesDB from './quotes.json';

function App() {
  const [quote, setQuote] = useState(
    'Work expands so as to fill the time available for its completion.',
  );
  const [author, setAuthor] = useState('Cyril N. Parkinson');
  const [quotesArray, setQuotesArray] = useState(null);
  const [txtColor, setTextColor] = useState('#282c34');
  const [bgColor, setBackgroundColor] = useState('#282c34');
  const [btColor, setButtonColor] = useState('#282c34');
  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    setQuotesArray(quotesDB.quotes);
  });

  const animate = () => {
    setBounce(true);
    setTimeout(() => setBounce(false), 2000);
  };

  const getRandomQuote = () => {
    const randomNumberAccent = Math.floor(quotesArray.length * Math.random());
    const randomNumberBackground = Math.floor(quotesArray.length * Math.random());
    const randomNumberButtons = Math.floor(quotesArray.length * Math.random());
    setTextColor(COLORS_ARRAY[randomNumberAccent]);
    setBackgroundColor(COLORS_ARRAY[randomNumberBackground]);
    setButtonColor(COLORS_ARRAY[randomNumberButtons]);
    setQuote(quotesArray[randomNumberButtons].quote);
    setAuthor(quotesArray[randomNumberButtons].author);
    animate();
  };

  return (
    <div className="App">
      <header
        className="App-header"
        style={{ backgroundColor: bgColor, color: txtColor }}
      >
        <div id="quote-box" className={bounce ? 'bounce' : null} style={{ color: txtColor }}>
          <h2 id="text">
            <span id="quote-icon">
              <FontAwesomeIcon icon={faQuoteLeft} />
            </span>
            {quote}
            <span id="quote-icon">
              <FontAwesomeIcon icon={faQuoteRight} />
            </span>
          </h2>
          <p id="author">
            -
            {author}
          </p>

          <div className="buttons">
            <a
              id="tweet-quote"
              style={{ backgroundColor: btColor }}
              href={encodeURI(
                `https://www.twitter.com/intent/tweet?text=${quote} -${author}`,
              )}
            >
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <button
              type="button"
              id="new-quote"
              style={{ backgroundColor: btColor }}
              onClick={() => getRandomQuote()}
              disabled={bounce}
            >
              <b>New Quote</b>
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
