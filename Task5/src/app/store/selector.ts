import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./reducer";
import { state } from "@angular/animations";

export const selectUserState=createFeatureSelector<UserState>('users')

export const selectUsers=createSelector(
    selectUserState,
    state=>state.users
)

export const selectLoading=createSelector(
    selectUserState,
    state=>state.loading
)