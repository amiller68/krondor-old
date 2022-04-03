import { createSelector, createFeatureSelector } from '@ngrx/store';
import {Project, ProjectSelection} from "../../entities/projects";
import * as _ from 'underscore';

export const selectProjects = createFeatureSelector<ReadonlyArray<Project>>('projectsApi');

export const selectProjectPageState = createFeatureSelector<Readonly<ProjectSelection>>('projectsPage');

export const selectFocusedProjects = createSelector(
  selectProjects,
  selectProjectPageState,
  (projects, projectsPageState) => {
    console.log("Selecting Projects...")
    if (projectsPageState.tag_ids.length === 0) {
      console.log("Sending all")
      return projects
    }
    let filteredProjects: Project[] = _.filter(projects, (p) => {
      return _.intersection(p.tags, projectsPageState.tag_ids).length > 0;
    })
    console.log("Filtered Projects: ", filteredProjects)
    return filteredProjects
  }
)

export const selectProjectsLoaded = createSelector(
  selectProjectPageState,
  (projectsPageState) => {
    console.log("Selecting Projects...")
    return projectsPageState.is_loaded
  }
)
