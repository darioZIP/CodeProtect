/* Testo animato per il paragrafo sotto il titolo in homepage. */
/* Fonte: https://www.use-scramble.dev/ /*
/* Ho rimosso parte del codice in quanto l'animazione originale era in loop */

import { useScramble } from 'use-scramble'; // Import the appropriate library

const ScrambleText = ({ text, speed, overdrive }) => {
  // Use the 'text' prop to scramble the text
  const { ref } = useScramble({
    text: text,
    tick: 3,
    chance: 0.25,
    speed: speed,
    overdrive: overdrive,
  });

  // Return the scrambled text within a paragraph element
  return <p ref={ref} />;
};

export default ScrambleText;
