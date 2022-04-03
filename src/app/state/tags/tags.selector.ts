import { createFeatureSelector } from '@ngrx/store';
import {Tag} from "../../entities/projects";

export const selectTags = createFeatureSelector<ReadonlyArray<Tag>>('tags');
