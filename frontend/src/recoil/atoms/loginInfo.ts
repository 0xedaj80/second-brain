import { atom } from "recoil";


export const userState = atom({
     key:"userState",
     default:{
         isLoading:true,
         userEmail:null
     }
})

export const refreshState= atom({
    key:"refreshState",
    default:true
})

export const setTag= atom({
    key:"setTag", 
    default:""
})
