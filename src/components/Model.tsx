'use client';
import { MODEL_CONFIG } from '@/utils';
import React, { ReactNode, useMemo, useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

interface ModalProps {
  isOpen: boolean;
  children: ReactNode;
  onClose?: () => void;
  title?: string;
}

const coinFlip = keyframes`
  0% {
    transform: translateY(0) rotateY(0deg);
    animation-timing-function: ease-in;
  }
  50% {
    transform: translateY(-100px) rotateY(900deg);
    animation-timing-function: ease-out;
  }
  100% {
    transform: translateY(0) rotateY(1800deg);
  }
`;

const ModalBackdrop = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow: hidden;
  backdrop-filter: blur(2px);
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 24px;
  border-radius: 12px;
  width: 85%;
  max-width: 550px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  position: relative;
  z-index: 2;
  border: 1px solid rgba(255, 215, 0, 0.3);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const ModalTitle = styled.h2`
  margin: 0;
  color: #333;
  font-size: 1.5rem;
  font-weight: 600;
`;

const ModalBody = styled.div`
  padding: 10px 0;
`;

const CoinsContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  perspective: 1000px;
`;

const Coin = styled.div<{
  $size: number;
  $posX: number;
  $posY: number;
  $delay: number;
  $duration: number;
}>`
  position: absolute;
  width: ${({ $size }) => `${$size}px`};
  height: ${({ $size }) => `${$size}px`};
  left: ${({ $posX }) => `${$posX}%`};
  top: ${({ $posY }) => `${$posY}%`};
  border-radius: 50%;
  background: linear-gradient(
    145deg,
    ${MODEL_CONFIG.COLOR.SHADOW},
    ${MODEL_CONFIG.COLOR.MAIN},
    ${MODEL_CONFIG.COLOR.HIGHLIGHT}
  );
  box-shadow:
    0 0 15px rgba(255, 215, 0, 0.6),
    inset 0 -3px 6px rgba(0, 0, 0, 0.2);
  animation: ${coinFlip} ${({ $duration }) => `${$duration}s`} ease-in-out
    infinite;
  animation-delay: ${({ $delay }) => `${$delay}s`};
  transform-style: preserve-3d;

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: linear-gradient(
      145deg,
      ${MODEL_CONFIG.COLOR.SHADOW},
      ${MODEL_CONFIG.COLOR.MAIN}
    );
    transform: translateZ(-1px);
    box-shadow: inset 0 3px 6px rgba(255, 255, 255, 0.3);
  }

  &::after {
    content: '★';
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${({ $size }) => `${$size * 0.4}px`};
    color: ${MODEL_CONFIG.COLOR.MAIN};
    text-shadow:
      1px 1px 1px rgba(0, 0, 0, 0.3),
      -1px -1px 1px rgba(255, 255, 255, 0.3);
    backface-visibility: hidden;
    transform: rotateY(180deg);
    background: linear-gradient(
      145deg,
      ${MODEL_CONFIG.COLOR.HIGHLIGHT},
      ${MODEL_CONFIG.COLOR.MAIN},
      ${MODEL_CONFIG.COLOR.SHADOW}
    );
    border-radius: 50%;
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
  }
`;

interface CoinConfig {
  size: number;
  posX: number;
  posY: number;
  delay: number;
  duration: number;
  key: number;
}

const Modal: React.FC<ModalProps> = ({
  isOpen = true,
  onClose = () => null,
  title,
  children,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const coins = useMemo<CoinConfig[]>(() => {
    if (!mounted) return [];

    return Array.from({ length: MODEL_CONFIG.COIN_COUNT }, (_, index) => ({
      size:
        Math.random() * (MODEL_CONFIG.SIZE.MAX - MODEL_CONFIG.SIZE.MIN) +
        MODEL_CONFIG.SIZE.MIN,
      posX: Math.random() * 100,
      posY: Math.random() * 100,
      delay: Math.random() * MODEL_CONFIG.ANIMATION.DELAY.MAX,
      duration:
        Math.random() *
          (MODEL_CONFIG.ANIMATION.DURATION.MAX -
            MODEL_CONFIG.ANIMATION.DURATION.MIN) +
        MODEL_CONFIG.ANIMATION.DURATION.MIN,
      key: index,
    }));
  }, [mounted]);

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  if (!isOpen) return null;

  return (
    <ModalBackdrop $isOpen={isOpen} onClick={onClose}>
      <CoinsContainer>
        {coins.map((coin) => (
          <Coin
            key={coin.key}
            $size={coin.size}
            $posX={coin.posX}
            $posY={coin.posY}
            $delay={coin.delay}
            $duration={coin.duration}
          />
        ))}
      </CoinsContainer>
      <ModalContent onClick={handleContentClick}>
        {title && (
          <ModalHeader>
            <ModalTitle>{title}</ModalTitle>
          </ModalHeader>
        )}
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default Modal;
