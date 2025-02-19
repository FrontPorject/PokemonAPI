import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  value: number;
  items: { name: string; count: number }[];
}

const initialState: CounterState = {
  value: 0,
  items: JSON.parse(localStorage.getItem('items') || '')
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement:(state) => {
      state.value = state.value > 0 ? state.value - 1 : 0;
    },
    reset: (state) => {
      state.value = 0;
    },
    setCount: (state, action: PayloadAction<{ name: string; count: number }>) => {
      const newItem = state.items.find((item) => item.name === action.payload.name);
      if (newItem && action.payload.count > 0) {
        newItem.count = action.payload.count;
      } else if(action.payload.count > 0) {
        state.items.push(action.payload);
      }
      localStorage.setItem('items', JSON.stringify(state.items));
    },
    deleteProduct:(state, action: PayloadAction<{ name: string; count: number }>) => {
      const Item = state.items.find((item) => item.name === action.payload.name);
      if (Item) {
        state.items = state.items.filter((item) => item.name !== action.payload.name);
      }
      localStorage.setItem('items', JSON.stringify(state.items));
    },
  },
});

export const { increment, decrement, reset , setCount , deleteProduct } = counterSlice.actions;
export default counterSlice.reducer;
