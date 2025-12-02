import React, { useState, useEffect, useRef} from 'react';
import styled, { keyframes } from 'styled-components';
import { CircularProgress } from '@mui/material';

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 40px 20px;
  text-align: center;
`;

const AnimatedText = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.secondary};
  animation: ${pulse} 2s ease-in-out infinite;
`;

const TipCard = styled.div`
  background: ${({ theme }) => theme.card};
  border-radius: 12px;
  padding: 20px;
  max-width: 400px;
  box-shadow: 0 4px 12px ${({ theme }) => theme.shadow};
  animation: ${bounce} 3s ease-in-out infinite;
`;

const TipTitle = styled.h3`
  color: ${({ theme }) => theme.primary};
  margin: 0 0 8px 0;
  font-size: 16px;
`;

const TipText = styled.p`
  color: ${({ theme }) => theme.text_secondary};
  margin: 0;
  font-size: 14px;
  line-height: 1.4;
`;

const ProgressWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const FunLoader = () => {
  const [joke, setJoke] = useState(null);
  const mountedRef = useRef(false);
  const fetchJoke = async () => {
    try {
      let data, totalLength;
      do {
        const response = await fetch('https://v2.jokeapi.dev/joke/Programming,Miscellaneous?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart');
        data = await response.json();
        totalLength = data.type === 'twopart' ? (data.setup + data.delivery).length : data.joke.length;
      } while (totalLength > 300);

      if (data.type === 'twopart') {
        setJoke({ setup: data.setup, delivery: data.delivery });
      } else {
        setJoke({ setup: '😄 Here\'s a joke:', delivery: data.joke });
      }
    } catch (error) {
      setJoke({ setup: '😅 Oops!', delivery: 'Failed to load jokes, but your image is still generating!' });
    }
  };

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      fetchJoke();
    }
    const interval = setInterval(fetchJoke, 7000);
    return () => clearInterval(interval);
  }, []);


  return (
    <LoaderContainer>
      <ProgressWrapper>
        <CircularProgress size={40} />
        <AnimatedText>Loading images...</AnimatedText>
      </ProgressWrapper>
      
      {joke && (
        <TipCard>
          <TipTitle>{joke.setup}</TipTitle>
          <TipText>{joke.delivery}</TipText>
        </TipCard>
      )}
    </LoaderContainer>
  );
};


export default FunLoader;
