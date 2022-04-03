import { createAction, props } from '@ngrx/store';

// Handle Project Loading
export const login = createAction(
  '[Auth API] Login'
);

export const loginSuccess = createAction(
  '[Auth API] Login Success'
);

export const loginError = createAction(
  '[Auth API] Login Error'
);

// Handle Project Loading
export const logout = createAction(
  '[Auth API] Logout',
  //Not sure how this is typed
  props<{redirect: any}>()
);

export const logoutSuccess = createAction(
  '[Auth API] Logout Success'
);

export const logoutError = createAction(
  '[Auth API] Logout Error'
);

export const checkApiWritePrivilege = createAction(
  '[Auth API] Check Write Privilege',
)

export const updateApiWritePrivilege = createAction(
  '[Auth API] Update Write Privilege',
  props<{privilege: boolean}>()
)

