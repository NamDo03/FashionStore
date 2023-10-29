import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        total: 0,
    },
    reducers: {
        addProduct: (state, action) => {
            const { id, selectedSize, selectedColor } = action.payload;
            const existingProductIndex = state.products.findIndex(
                (product) =>
                    product.id === id &&
                    product.selectedSize === selectedSize &&
                    product.selectedColor === selectedColor
            );

            if (existingProductIndex !== -1) {
                const existingProduct = state.products[existingProductIndex];
                existingProduct.quantity += action.payload.quantity;
            } else {
                state.products.push(action.payload);
            }
            state.total += action.payload.price * action.payload.quantity;
        },

        removeProduct: (state, action) => {
            const { id, selectedSize, selectedColor } = action.payload;

            const removedProductIndex = state.products.findIndex(
                (product) =>
                    product.id === id &&
                    product.selectedSize === selectedSize &&
                    product.selectedColor === selectedColor
            );

            if (removedProductIndex !== -1) {
                const removedProduct = state.products[removedProductIndex];
                state.total -= removedProduct.price * removedProduct.quantity;
                state.products.splice(removedProductIndex, 1);
            }
        },

        increaseQuantity: (state, action) => {
            const { id, selectedSize, selectedColor } = action.payload;
            const product = state.products.find(
                (product) =>
                    product.id === id &&
                    product.selectedSize === selectedSize &&
                    product.selectedColor === selectedColor
            );

            if (product) {
                product.quantity += 1;
                state.total += product.price;
            }
        },

        decreaseQuantity: (state, action) => {
            const { id, selectedSize, selectedColor } = action.payload;
            const product = state.products.find(
                (product) =>
                    product.id === id &&
                    product.selectedSize === selectedSize &&
                    product.selectedColor === selectedColor
            );

            if (product && product.quantity > 1) {
                product.quantity -= 1;
                state.total -= product.price;
            }
        },
        resetCart: (state) => {
            state.products = []
        },
    },
});

export const { addProduct, removeProduct, increaseQuantity, decreaseQuantity, resetCart } = cartSlice.actions;

export default cartSlice.reducer;
