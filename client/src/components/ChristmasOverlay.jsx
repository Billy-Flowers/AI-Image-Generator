import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import bellSound from '../assets/christmas-bells.mp3'

const fall = keyframes`
  0% { transform: translateY(-100vh) rotate(0deg); }
  100% { transform: translateY(100vh) rotate(360deg); }
`;

const swing = keyframes`
  0%, 100% { transform: rotate(-10deg); }
  50% { transform: rotate(10deg); }
`;

const OverlayContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 1000;
  overflow: hidden;
`;

const Snowflake = styled.div`
  position: absolute;
  color: white;
  font-size: ${props => props.size}px;
  animation: ${fall} ${props => props.duration}s linear infinite;
  animation-delay: ${props => props.delay}s;
  left: ${props => props.left}%;
`;

const ChristmasBells = styled.div`
  position: fixed;
  top: 10px;
  right: 20px;
  font-size: 24px;
  animation: ${swing} 2s ease-in-out infinite;
  cursor: pointer;
  pointer-events: auto;
  z-index: 1001;
  user-select: none;
`;

const ChristmasOverlay = () => {
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowAnimation(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const snowflakes = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: Math.random() * 10 + 10,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2,
    symbol: ['❄️', '⭐', '🎄', ][Math.floor(Math.random() * 3)]
  }));

  const playBellSound = () => {
    const audio = new Audio(bellSound);
    audio.volume = 0.3;
    audio.play().catch(console.log);
    };

  return (
    <OverlayContainer>
      <ChristmasBells onClick={playBellSound}>🔔🎄</ChristmasBells>
      {showAnimation && snowflakes.map(flake => (
        <Snowflake
          key={flake.id}
          left={flake.left}
          size={flake.size}
          duration={flake.duration}
          delay={flake.delay}
        >
          {flake.symbol}
        </Snowflake>
      ))}
    </OverlayContainer>
  );
};

export default ChristmasOverlay;
