'use client';

import { useCallback, useState } from "react";
import { COIN_CONFIG } from "@/utils";
import { Button, ButtonContainer, Coin, CoinContainer, CoinWrapper, ResetButton,  StatItem, StatsContainer, StatValue } from "./CoinFlip.styles";
import { CoinFlipResultProps } from "./CoinFlip.types";
import Modal from "@/components/Model";

const CoinFlipper: React.FC = () => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [loops, setLoops] = useState(1);
  const [finalPosition, setFinalPosition] = useState('0px');
  const [stats, setStats] = useState({
    flipCount: 0,
    headCount: 0,
    tailCount: 0,
  });

  const calculateFlipResult = useCallback((): CoinFlipResultProps => {
    const isTails = Math.random() > 0.5;
    const randomLoops = Math.floor(Math.random() * (COIN_CONFIG.MAX_LOOPS - COIN_CONFIG.MIN_LOOPS + 1)) + COIN_CONFIG.MIN_LOOPS;
    const position = isTails ? `-${COIN_CONFIG.FRAME_WIDTH * 8}px` : '0px';

    return { isTails, loops: randomLoops, position };
  }, []);

  const updateStats = useCallback((isTails: boolean) => {
    setStats(prev => ({
      flipCount: prev.flipCount + 1,
      headCount: isTails ? prev.headCount : prev.headCount + 1,
      tailCount: isTails ? prev.tailCount + 1 : prev.tailCount,
    }));
  }, []);

  const flipCoin = useCallback(() => {
    if (isFlipping) return;

    setIsFlipping(true);
    const { isTails, loops, position } = calculateFlipResult();

    setLoops(loops);
    setFinalPosition(position);

    setTimeout(() => {
      setIsFlipping(false);
      updateStats(isTails);
    }, COIN_CONFIG.FLIP_DURATION * loops);
  }, [isFlipping, calculateFlipResult, updateStats]);

  const resetStats = useCallback(() => {
    setStats({
      flipCount: 0,
      headCount: 0,
      tailCount: 0,
    });
    setFinalPosition('0px');
  }, []);

  return (
    <Modal isOpen={true}>
      <CoinWrapper>
      <CoinContainer>
        <Coin 
          $isFlipping={isFlipping} 
          $loops={loops}
          $finalPosition={finalPosition}
        />
      </CoinContainer>
      
      <ButtonContainer>
        <Button onClick={flipCoin} disabled={isFlipping}>
          {isFlipping ? 'Flipping...' : 'Flip Coin'}
        </Button>
        <ResetButton onClick={resetStats} disabled={isFlipping}>
          Reset
        </ResetButton>
      </ButtonContainer>

      <StatsContainer>
        <StatItem>
          <p>Flips</p>
          <StatValue>{stats.flipCount}</StatValue>
        </StatItem>
        <StatItem>
          <p>Heads</p>
          <StatValue>{stats.headCount}</StatValue>
        </StatItem>
        <StatItem>
          <p>Tails</p>
          <StatValue>{stats.tailCount}</StatValue>
        </StatItem>
        </StatsContainer>
        </CoinWrapper>
    </Modal>
  );
};

export default CoinFlipper;