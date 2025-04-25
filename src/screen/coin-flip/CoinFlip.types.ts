export type CoinResult = 'Heads' | 'Tails' | null;

export interface CoinProps {
  $isFlipping: boolean;
  $loops: number;
  $finalPosition: string;
}

export interface CoinFlipResultProps {
  isTails: boolean;
  loops: number;
  position: string;
}
