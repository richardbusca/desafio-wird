import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Pokemon } from '../types/types';

export interface PokemonState {
  pokemons: Pokemon[];
  readyForBattlePokemons: Pokemon[]; 
  loading: boolean;
  error: string | null;
  searchTerm: string;
}

const initialState: PokemonState = {
  pokemons: [],
  readyForBattlePokemons: [],
  loading: false,
  error: null,
  searchTerm: ''
};

export const fetchPokemons = createAsyncThunk('pokemon/fetchPokemons', async () => {
  const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
  const pokemonsDetails = await Promise.all(
    response.data.results.map(async (pokemon: any, index: number) => {
      const pokemonResponse = await axios.get(pokemon.url);
      return {
        id: index + 1,
        name: pokemon.name,
        image: pokemonResponse.data.sprites.other.home.front_default,
        height: pokemonResponse.data.height,
        types: pokemonResponse.data.types.map((t: { type: { name: string } }) => t.type.name),
        baseStats: {
          attack: pokemonResponse.data.stats.find((stat: any) => stat.stat.name === 'attack')?.base_stat || 0,
          defense: pokemonResponse.data.stats.find((stat: any) => stat.stat.name === 'defense')?.base_stat || 0,
          specialAttack: pokemonResponse.data.stats.find((stat: any) => stat.stat.name === 'special-attack')?.base_stat || 0,
          specialDefense: pokemonResponse.data.stats.find((stat: any) => stat.stat.name === 'special-defense')?.base_stat || 0,
          speed: pokemonResponse.data.stats.find((stat: any) => stat.stat.name === 'speed')?.base_stat || 0,
        }
      };
    })
  );

  return pokemonsDetails;
});

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setPokemons(state, action: PayloadAction<Pokemon[]>) {
      state.pokemons = action.payload;
    },
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    addReadyForBattlePokemon(state, action: PayloadAction<number>) {
      const id = action.payload;
      const isAlreadyReady = state.readyForBattlePokemons.some(pokemon => pokemon.id === id);
      if (!isAlreadyReady && state.readyForBattlePokemons.length < 6) {
        const pokemonToAdd = state.pokemons.find(pokemon => pokemon.id === id)
        if (pokemonToAdd) {
          state.readyForBattlePokemons.push(pokemonToAdd);
        }
      }
    },
    removeReadyForBattlePokemon(state, action: PayloadAction<number>) {
      const id = action.payload
      state.readyForBattlePokemons = state.readyForBattlePokemons.filter(pokemon => pokemon.id !== id);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPokemons.fulfilled, (state, action: PayloadAction<Pokemon[]>) => {
        state.loading = false;
        state.pokemons = action.payload;
      })
      .addCase(fetchPokemons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error loading Pokémon';
      });
  },
});

export const selectPokemons = (state: { pokemon: PokemonState }) => {
  const { pokemons, searchTerm, readyForBattlePokemons } = state.pokemon;
  const readyForBattleIds = new Set(readyForBattlePokemons.map(pokemon => pokemon.id));
  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) && !readyForBattleIds.has(pokemon.id)
  );
  
  return filteredPokemons.sort((a, b) => a.name.localeCompare(b.name));
};

export const selectIsPokemonReadyForBattle = (state: { pokemon: PokemonState }, pokemonId: number) => {
  return state.pokemon.readyForBattlePokemons.some(pokemon => pokemon.id === pokemonId);
};

export const selectPokemonById = (state: { pokemon: PokemonState }, id: number): Pokemon | undefined => {
  return state.pokemon.pokemons.find(pokemon => pokemon.id === id);
};

export const selectReadyForBattlePokemons = (state: { pokemon: PokemonState }) => state.pokemon.readyForBattlePokemons;
export const selectLoading = (state: { pokemon: PokemonState }) => state.pokemon.loading;
export const selectError = (state: { pokemon: PokemonState }) => state.pokemon.error;
export const selectSearchTerm = (state: { pokemon: PokemonState }) => state.pokemon.searchTerm;
export const { setPokemons, setSearchTerm, addReadyForBattlePokemon, removeReadyForBattlePokemon } = pokemonSlice.actions;

export default pokemonSlice.reducer;
