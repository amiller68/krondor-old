import { createReducer, on } from '@ngrx/store';

import {loadTagsError, loadTagsSuccess} from './tags.actions';
import { Tag } from '../../entities/projects';

export const initialState: ReadonlyArray<Tag> = [];

export const tagsReducer = createReducer(
  initialState,
  on(loadTagsSuccess, (state, { tags }) => tags),
  on(loadTagsError, (state, { tags }) => tags)
);
