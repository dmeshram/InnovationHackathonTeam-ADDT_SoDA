import React, { useState, useEffect } from "react";
import styles from "./ProgrammingModule.module.css";

const initialPairs = [
  { id: 1, front: "let", back: "Declare a variable" },
  { id: 2, front: "const", back: "Immutable variable" },
  { id: 3, front: "===", back: "Strict equality" },
  { id: 4, front: "NaN", back: "Not a Number" },
];

const createShuffledDeck = () => {
  const deck = [...initialPairs.flatMap(pair => [
    { id: pair.id + "a", pairId: pair.id, content: pair.front },
    { id: pair.id + "b", pairId: pair.id, content: pair.back },
  ])];
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

const MemoryMatchGame = () => {
  const [deck, setDeck] = useState(createShuffledDeck);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);

  const handleFlip = (cardId) => {
    if (flipped.length === 2 || flipped.includes(cardId)) return;
    setFlipped(prev => [...prev, cardId]);
  };

  useEffect(() => {
    if (flipped.length === 2) {
      const [card1, card2] = flipped.map(id => deck.find(c => c.id === id));
      if (card1.pairId === card2.pairId) {
        setMatched(prev => [...prev, card1.pairId]);
      }
      setTimeout(() => setFlipped([]), 1000);
    }
  }, [flipped, deck]);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>🧠 Match the Programming Terms</h2>
        <div className={styles.grid}>
          {deck.map(card => {
            const isFlipped = flipped.includes(card.id) || matched.includes(card.pairId);
            return (
              <div
                key={card.id}
                className={`${styles.flipCard} ${isFlipped ? styles.flipped : ""}`}
                onClick={() => handleFlip(card.id)}
              >
                <div className={styles.flipCardInner}>
                  <div className={styles.flipCardFront}>?</div>
                  <div className={styles.flipCardBack}>{card.content}</div>
                </div>
              </div>
            );
          })}
        </div>
        {matched.length === initialPairs.length && <p>🎉 All matched!</p>}
      </div>
    </div>
  );
};

export default MemoryMatchGame;
