import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UserProfile } from '../../models/user-profile.model';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    // Profile Actions (Requirement 5)
    'Load Profile': emptyProps(),
    'Load Profile Success': props<{ data: UserProfile }>(),
    'Load Profile Failure': props<{ error: string }>(),

    // Update Profile
    'Update Profile': props<{ changes: Partial<UserProfile> }>(),
    'Update Profile Success': props<{ data: UserProfile }>(),
    'Update Profile Failure': props<{ error: string }>(),

    // Auth Actions (Keeping existing functionality but standardizing)
    'Login': props<{ email: string; password: string }>(),
    'Login Success': props<{ data: UserProfile }>(),
    'Login Failure': props<{ error: string }>(),
    'Logout': emptyProps(),
    'Logout Success': emptyProps(),

    // Utility
    'Set Temp Notice': props<{ message: string }>(),
    'Clear Temp Notice': emptyProps(),
  },
});
