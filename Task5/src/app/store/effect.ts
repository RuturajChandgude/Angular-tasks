import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "../service/user.service";
import { loadChartData, loadChartDataSuccess } from "./action";
import { map, mergeMap } from "rxjs";


@Injectable()
export class UserEffects{
    action$=inject(Actions)


    constructor(private userService:UserService){}
    
    loadUsers$=createEffect(()=>
    this.action$.pipe(
        ofType(loadChartData),

        mergeMap(()=>
        this.userService.getUser().pipe(
            map((users:any)=>
            loadChartDataSuccess({users})
            )
        )
        )
    )
    )
}