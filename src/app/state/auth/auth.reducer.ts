import {createReducer, on} from '@ngrx/store';
import {loginSuccess, logoutSuccess, updateApiWritePrivilege} from "./auth.actions";

export interface AuthState {
  logged_in: boolean,
  api_write_privilege: boolean
}

export const initialAuthState: Readonly<AuthState> = {
  logged_in: false,
  api_write_privilege: false
};

//@todo: Implement Error Handling
export const authReducer = createReducer(
  initialAuthState,

  on(loginSuccess, (state) => ({...state, logged_in: true })),

  on(logoutSuccess, (state) => ({...state, logged_in: false })),

  on(updateApiWritePrivilege, (state, { privilege }) => ({...state, api_write_privilege: privilege }))
)
