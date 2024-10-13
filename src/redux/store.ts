import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from './pokemonSlice';

const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
  },
});

// Define el tipo de estado de tu tienda
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;