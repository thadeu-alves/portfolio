import { useState, useEffect, useRef } from 'react';

const PHRASES = [
  'Full Stack Developer',
  'Desenvolvedor Full Stack',
  'SaaS & AI Agents',
  'TypeScript · Next.js',
  'Node.js Developer',
  'AI Agent Builder',
  'Remote BR/Internacional',
];

interface State {
  phraseIdx: number;
  charIdx: number;
  deleting: boolean;
}

export default function Typewriter() {
  const [displayed, setDisplayed] = useState('');
  const stateRef = useRef<State>({ phraseIdx: 0, charIdx: 0, deleting: false });

  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout>;

    function tick() {
      const s = stateRef.current;
      const phrase = PHRASES[s.phraseIdx];

      if (!s.deleting) {
        const next = s.charIdx + 1;
        setDisplayed(phrase.slice(0, next));
        if (next === phrase.length) {
          stateRef.current = { ...s, charIdx: next, deleting: true };
          timerId = setTimeout(tick, 1600);
        } else {
          stateRef.current = { ...s, charIdx: next };
          timerId = setTimeout(tick, 90);
        }
      } else {
        const next = s.charIdx - 1;
        setDisplayed(phrase.slice(0, next));
        if (next === 0) {
          stateRef.current = {
            phraseIdx: (s.phraseIdx + 1) % PHRASES.length,
            charIdx: 0,
            deleting: false,
          };
          timerId = setTimeout(tick, 90);
        } else {
          stateRef.current = { ...s, charIdx: next };
          timerId = setTimeout(tick, 50);
        }
      }
    }

    timerId = setTimeout(tick, 90);
    return () => clearTimeout(timerId);
  }, []);

  return (
    <h2
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '2px',
        color: '#fff',
        fontSize: '2.5rem',
        fontWeight: 300,
        margin: '10px 0',
        minHeight: '3.5rem',
      }}
    >
      <span>{displayed}</span>
      <span className="tw-cursor" />
    </h2>
  );
}
