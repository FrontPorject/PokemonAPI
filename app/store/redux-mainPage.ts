import { createSlice, PayloadAction} from "@reduxjs/toolkit";

interface types {
    info: {results: Record<string, string>[]} | null;
    SpecificInfo: Record<string,{sprites?:Record<string,{dream_world:Record<string,{front_default?: string}>}>}>;
    openComponent: boolean;
    NameOfModal: string;
  }
const initialState : types = {info:null , SpecificInfo:{} , openComponent:false , NameOfModal:""}
const AllInfoSlice = createSlice({
    name:'apiInfo',
    initialState: initialState,
    reducers: {
        setSpecificInfo:(state, action: PayloadAction<{ name: string; data:{sprites?:Record<string,{dream_world:Record<string,{front_default: string}>}>} }>)=>{
            const { name, data } = action.payload;
            state.SpecificInfo[name] = data;
        },
        setInfo:(state,action)=>{
            state.info = action.payload;
        },
        setOpenComponent:(state,action)=>{
            state.openComponent = action.payload
        },
        setNameForModal:(state,action)=>{
            state.NameOfModal = action.payload
        },

    }

});
export const { setInfo, setSpecificInfo , setOpenComponent , setNameForModal} = AllInfoSlice.actions;
export default AllInfoSlice;