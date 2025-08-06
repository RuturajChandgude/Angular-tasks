import { createReducer ,on} from "@ngrx/store"
import { User } from "./model"
import { loadChartData, loadChartDataSuccess } from "./action"

export interface UserState{
    users:User[],
    loading:boolean
}

export const initialState:UserState={
    users:[],
    loading:false
}

export const userReducer=createReducer(
    initialState,
    on(loadChartData,state=>({
        ...state,loading:true
    })),
    on(loadChartDataSuccess,(state,{users})=>({
        ...state,users,loading:false
    }))
)