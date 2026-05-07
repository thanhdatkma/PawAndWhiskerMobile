import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { NewsBriefModel } from '../../models/news-brief.model';

export const HomeActions = createActionGroup({
  source: 'Home',
  events: {
    'Load News Feed': emptyProps(),
    'Load News Feed Success': props<{ newsFeed: NewsBriefModel[]; total: number }>(),
    'Load News Feed Failure': props<{ error: string }>(),
    'Load More News Feed': emptyProps(),
    'Load More News Feed Success': props<{ newsFeed: NewsBriefModel[]; total: number }>(),
    'Load More News Feed Failure': props<{ error: string }>(),
  }
});
