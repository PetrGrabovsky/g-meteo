import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  isMobile: boolean;
  isScrolled: boolean;
}

const initialState: UiState = {
  isMobile: true,
  isScrolled: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setIsMobile(state, action: PayloadAction<boolean>) {
      state.isMobile = action.payload;
    },
    setIsScrolled(state, action: PayloadAction<boolean>) {
      state.isScrolled = action.payload;
    },
  },
});

export const { setIsMobile, setIsScrolled } = uiSlice.actions;
export default uiSlice.reducer;
