import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UserProfile } from '../../models/user-profile.model';
import { RegisterPayload } from '../../services/auth.service';
import { UpdateProfilePayload } from '../../services/user.service';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    // Profile Actions
    'Load Profile': emptyProps(),
    'Load Profile Success': props<{ data: UserProfile }>(),
    'Load Profile Failure': props<{ error: string }>(),

    // Update Profile
    'Update Profile': props<{ payload: UpdateProfilePayload }>(),
    'Update Profile Success': props<{ data: UserProfile }>(),
    'Update Profile Failure': props<{ error: string }>(),

    // Update Avatar
    'Update Avatar': props<{ file: File }>(),
    'Update Avatar Success': props<{ avatar_url: string }>(),
    'Update Avatar Failure': props<{ error: string }>(),

    // Register
    'Register': props<{ payload: RegisterPayload }>(),
    'Register Success': props<{ data: UserProfile; token: string }>(),
    'Register Failure': props<{ error: string }>(),

    // Auth
    'Login': props<{ email: string; password: string }>(),
    'Login Success': props<{ data: UserProfile; token: string }>(),
    'Login Failure': props<{ error: string }>(),
    'Logout': emptyProps(),
    'Logout Success': emptyProps(),

    // Session restore
    'Restore Session': props<{ data: UserProfile }>(),

    // Utility
    'Set Temp Notice': props<{ message: string }>(),
    'Clear Temp Notice': emptyProps(),
  },
});
