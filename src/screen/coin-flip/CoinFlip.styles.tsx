import styled, { css, keyframes } from 'styled-components';
import { CoinProps } from './CoinFlip.types';
import { COIN_CONFIG } from '@/utils';

export const CoinContainer = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  margin-bottom: 30px;
`;

export const flipAnimation = keyframes`
  from {
    transform: rotateY(0deg);
    background-position: 0px center;
  }
  to {
    transform: rotateY(360deg);
    background-position: -1200px center;
  }
`;

export const Coin = styled.div<CoinProps>`
  width: 100px;
  height: 100px;
  background-image: url('/coin-spritesheet.svg');
  background-size: 1200px 100px;
  background-position: ${(props) => props.$finalPosition} center;
  background-repeat: no-repeat;
  transform-style: preserve-3d;
  perspective: 1000px;

  animation: ${({ $isFlipping, $loops }) =>
    $isFlipping
      ? css`
          ${flipAnimation} ${COIN_CONFIG.FLIP_DURATION}ms steps(12) ${$loops}
        `
      : 'none'};
`;

export const Button = styled.button`
  background-color: #4a90e2;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px;
  margin-right: 10px;

  &:hover {
    background-color: #3a80d2;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

export const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 300px;
  margin: 20px auto;
  font-size: 16px;
`;

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StatValue = styled.span`
  font-weight: bold;
  color: '#B8860B';
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const ResetButton = styled(Button)`
  background-color: #e74c3c;

  &:hover {
    background-color: #c0392b;
  }
`;

export const CoinWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
