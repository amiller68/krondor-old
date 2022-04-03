import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AuthState} from "./auth.reducer";

export const selectAuthState = createFeatureSelector<Readonly<AuthState>>('authState')

export const selectApiWritePrivilege = createSelector(
  selectAuthState,
  (auth) => {
    return auth.api_write_privilege
  }
)

export const selectLoggedIn = createSelector(
  selectAuthState,
  (auth) => {
    return auth.logged_in
  }
)
