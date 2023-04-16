export type PokemonType =
  | 'grass'
  | 'water'
  | 'fire'
  | 'electric'
  | 'normal'
  | 'fairy'
  | 'dragon'
  | 'ghost'
  | 'ground'
  | 'psychic'
  | 'ice'
  | 'poison'
  | 'bug'
  | 'flying'
  | 'fighting'
  | 'rock'
  | 'steel'
  | 'dark'

export const pokemons: { name: string; type: PokemonType }[] = [
  {
    name: 'Bulbasaur',
    type: 'grass',
  },
  {
    name: 'Squirtle',
    type: 'water',
  },
  {
    name: 'Charmander',
    type: 'fire',
  },
  {
    name: 'Pikachu',
    type: 'electric',
  },
  {
    name: 'Eevee',
    type: 'normal',
  },
  {
    name: 'Onix',
    type: 'rock',
  },
  {
    name: 'Growlithe',
    type: 'fire',
  },
  {
    name: 'Ghastly',
    type: 'ghost',
  },
  {
    name: 'Machop',
    type: 'fighting',
  },
  {
    name: 'Arbok',
    type: 'poison',
  },
  {
    name: 'Sandslash',
    type: 'ground',
  },
  {
    name: 'Vulpix',
    type: 'fire',
  },
  {
    name: 'Psyduck',
    type: 'water',
  },
  {
    name: 'Clefairy',
    type: 'fairy',
  },
  {
    name: 'Hitmonlee',
    type: 'fighting',
  },
  {
    name: 'Dratini',
    type: 'dragon',
  },
  {
    name: 'Jynx',
    type: 'ice',
  },
  {
    name: 'Mew',
    type: 'psychic',
  },
  {
    name: 'Jigglypuff',
    type: 'normal',
  },
  {
    name: 'Snorlax',
    type: 'normal',
  },
  {
    name: 'Dewgong',
    type: 'ice',
  },
  {
    name: 'Gengar',
    type: 'ghost',
  },
  {
    name: 'Magikarp',
    type: 'water',
  },
  {
    name: 'Poliwag',
    type: 'water',
  },
  {
    name: 'Houndour',
    type: 'fire',
  },
  {
    name: 'Pidgey',
    type: 'flying',
  },
  {
    name: 'Ponyta',
    type: 'fire',
  },
  {
    name: 'Shellder',
    type: 'ice',
  },
  {
    name: 'Oddish',
    type: 'grass',
  },
]
