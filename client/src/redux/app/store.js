import { configureStore } from "@reduxjs/toolkit";
import cartslice from "../feature/cartslice";

export const store = configureStore({
    reducer:{
        allCart:cartslice
    }
})