import { createAction, props } from "@ngrx/store";

import { User } from "./model";
export const loadChartData=createAction('[Chart] Load Chart Data');

export const loadChartDataSuccess=createAction('[Chart] Load Chart Success',
    props<{users:User[]}>()
)
