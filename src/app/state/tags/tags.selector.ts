import { createSelector, createFeatureSelector } from '@ngrx/store';
import {Tag} from "../../entities/projects";

export const selectTags = createFeatureSelector<ReadonlyArray<Tag>>('tags');

// export const selectTagsFeature = createSelector(
//   selectTags,
//   (tags) => {
//     return tags;
//   }
// );
