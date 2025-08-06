import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import {provideHttpClient} from '@angular/common/http'
import { userReducer } from './store/reducer';
import { UserEffects } from './store/effect';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideHttpClient(), provideStore({users:userReducer}), provideEffects(UserEffects)]
};
