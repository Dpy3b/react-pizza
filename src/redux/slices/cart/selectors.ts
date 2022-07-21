import { RootState } from './../../store';
export const selectCart = (state: RootState) => state.cart;
export const selectCartTotalPrice = (state: RootState) => state.cart.totalPrice;
