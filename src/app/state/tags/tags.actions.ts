import { createAction, props } from '@ngrx/store';
import { Tag } from '../../entities/projects';

// Handle Tag Loading
export const loadTags = createAction(
  '[Tags API] Load Tags'
);

export const loadTagsSuccess = createAction(
  '[Tags API] Load Tags Success',
  props<{ tags: ReadonlyArray<Tag> }>()
);

export const loadTagsError = createAction(
  '[Tags API] Load Tags Error',
  props<{ tags: ReadonlyArray<Tag> }>()
);
