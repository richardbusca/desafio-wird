export interface Pokemon {
  id: number;
  name: string;
  image: string;
  height: number;
  types: string[];
  baseStats: {
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
}