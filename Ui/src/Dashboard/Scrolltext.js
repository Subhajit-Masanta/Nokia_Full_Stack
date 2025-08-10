import React, { useState, useRef, useEffect } from 'react';

// Professional, subtle gradients
const GRADIENTS = [
  // Nokia Blue Primary - matches your main theme
  ['#124191', '#1e40af', '#2563eb'], // Nokia blue gradient
  
  // Professional Complementary Colors
  ['#ea580c', '#f97316', '#fb923c'], // Warm orange (Nokia complement)
  ['#0891b2', '#06b6d4', '#22d3ee'], // Cyan blue (Nokia secondary)
  ['#7c3aed', '#8b5cf6', '#a78bfa'], // Purple (Nokia accent)
  ['#059669', '#10b981', '#34d399'], // Green (Nokia success)
  
  // Sophisticated Neutrals
  ['#374151', '#4b5563', '#6b7280'], // Professional gray
  ['#1f2937', '#374151', '#4b5563'], // Dark professional
  ['#0f172a', '#1e293b', '#334155'], // Deep slate
];


// Example professional factoids
const FACTOIDS = [
  "One-third of all food produced globally is lost or wasted each year.",
  "Reducing food waste is one of the top solutions to climate change.",
  "Food waste generates about 8% of global greenhouse gas emissions.",
  "If food waste were a country, it would be the third largest emitter of greenhouse gases.",
  "Proper storage can significantly extend the shelf life of fresh produce.",
  "Composting food scraps reduces landfill waste and enriches soil.",
  "Smart meal planning helps minimize food waste at home.",
  "Leftovers can be transformed into delicious new meals.",
  "Food banks play a vital role in redistributing surplus food.",
  "Every small action counts in reducing food waste."
];

// Helper to get a random index, different from exclude
function getRandomIndex(length, exclude) {
  let idx;
  do {
    idx = Math.floor(Math.random() * length);
  } while (idx === exclude);
  return idx;
}

export default function Scrolltext() {
  // State for current slide
  const [slide, setSlide] = useState(() => {
    const factIdx = getRandomIndex(FACTOIDS.length, -1);
    const gradIdx = getRandomIndex(GRADIENTS.length, -1);
    const angle = Math.floor(Math.random() * 360);
    return { factIdx, gradIdx, angle };
  });

  const spanRef = useRef(null);

  // Handler for scroll animation end
  useEffect(() => {
    const handleIteration = () => {
      setSlide(prev => {
        const factIdx = getRandomIndex(FACTOIDS.length, prev.factIdx);
        const gradIdx = getRandomIndex(GRADIENTS.length, prev.gradIdx);
        const angle = Math.floor(Math.random() * 360);
        return { factIdx, gradIdx, angle };
      });
    };

    const node = spanRef.current;
    if (node) {
      node.addEventListener('animationiteration', handleIteration);
    }
    return () => {
      if (node) {
        node.removeEventListener('animationiteration', handleIteration);
      }
    };
  }, []);

  const displayText = FACTOIDS[slide.factIdx];
  const grad = GRADIENTS[slide.gradIdx];

  return (
    <div style={{
 whiteSpace: 'nowrap',
  overflow: 'hidden',
  display: 'block',
  width: '100%',
  textAlign: 'center',
  color: '#ffffff',
  background: 'linear-gradient(135deg, rgba(18, 65, 145, 0.92) 0%, rgba(30, 64, 175, 0.95) 50%, rgba(37, 99, 235, 0.88) 100%)',
  backdropFilter: 'blur(8px)',
  fontSize: '1.8rem',
  fontWeight: '700',
  fontFamily: '"Inter", "Segoe UI", Arial, sans-serif',
  padding: '10px 0',
  letterSpacing: '0.8px',
  textShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.5)',
  border: '3px solid rgba(18, 65, 145, 0.4)',
  borderRadius: '20px',
  boxShadow: '0 8px 25px rgba(18, 65, 145, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
  animation: 'scrollHorizontal 20s linear infinite',
  position: 'relative',
    }}>
      <span
        ref={spanRef}
        style={{
          display: 'inline-block',
          paddingLeft: '100%',
          animation: 'scroll 18s linear infinite',
        }}
      >
        {displayText}
      </span>
      <style>
        {`@keyframes scroll {
          0% { transform: translateX(0%);}
          100% { transform: translateX(-100%);}
        }`}
      </style>
    </div>
  );
}
