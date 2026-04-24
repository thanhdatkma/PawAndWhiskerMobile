import { createAction, props } from '@ngrx/store';
import { UserProfile } from '../../models/user-profile.model';

export const UserActions = {
  login: createAction(
    '[User] Login',
    props<{ email: string; password: string }>(),
  ),
  loginSuccess: createAction(
    '[User] Login Success',
    props<{ profile: UserProfile }>(),
  ),
  loginFailure: createAction(
    '[User] Login Failure',
    props<{ error: string }>(),
  ),

  logout: createAction('[User] Logout'),
  logoutSuccess: createAction('[User] Logout Success'),

  updateProfile: createAction(
    '[User] Update Profile',
    props<{ changes: Partial<UserProfile> }>(),
  ),
  updateProfileSuccess: createAction(
    '[User] Update Profile Success',
    props<{ profile: UserProfile }>(),
  ),
  updateProfileFailure: createAction(
    '[User] Update Profile Failure',
    props<{ error: string }>(),
  ),

  setTempNotice: createAction(
    '[User] Set Temp Notice',
    props<{ message: string }>(),
  ),
  clearTempNotice: createAction('[User] Clear Temp Notice'),
};
