import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { NewsBriefModel } from '../../models/news-brief.model';

export const HomeActions = createActionGroup({
  source: 'Home',
  events: {
    'Load News Feed': emptyProps(),
    'Load News Feed Success': props<{ newsFeed: NewsBriefModel[] }>(),
    'Load News Feed Failure': props<{ error: string }>(),
  }
});
