import {createReducer, on} from '@ngrx/store';

import {
  addProjectError,
  addProjectSuccess,
  deleteProjectError,
  deleteProjectSuccess,
  loadProjectsError,
  loadProjectsSuccess,
  updateProjectError,
  updateProjectSuccess, updateSelectedTags
} from './projects.actions';
import {Project, ProjectSelection} from '../../entities/projects';
import * as _ from 'underscore'

export const projectsApiInitialState: ReadonlyArray<Project>= []
//@todo: figure out best practices for refactoring this
export const projectsPageInitialState: Readonly<ProjectSelection> = {
  tag_ids: []
}

//@todo: Implement Error Handling
export const projectsApiReducer = createReducer(
  projectsApiInitialState,

  // Receive Load Project Responses
  on(loadProjectsSuccess, (state, { projects }) => projects),

  on(loadProjectsError, (state, { projects }) => projects),

  // Receive Add Project Responses
  on(addProjectSuccess, (state, { project }) => {
    if (_.findWhere(state, {id: project.id}) !== undefined) return state;
      return [
        ...state, project
      ]
    }
  ),

  on(addProjectError, (state) => {
    return state;
  }),

  //Receive Load Project Responses
  on(updateProjectSuccess, (state, { project }) => {
    if (_.findWhere(state, {id: project.id}) !== undefined) return state;
    // Update state
    return _.map(state, (p) => {
      if (p.id === project.id) {
        return project
      }
      return p
    })
  }),

  on(updateProjectError, (state) => {
    return state;
  }),

  //Receive Delete Project Responses
  on(deleteProjectSuccess, (state, { id }) => {
    if (_.findWhere(state, {id: id}) === undefined) return state;
    // Update state
    return state.filter((p) => p.id !== id);
  }),

  on(deleteProjectError, (state) => {
    return state;
  })
)

export const projectsPageReducer = createReducer(
  projectsPageInitialState,

  on(updateSelectedTags, (state, { tag_id } ) => {
    //If the tag isn't present, add it
    if (_.indexOf(state.tag_ids, tag_id) === -1) {
      return {
        ...state,
        tag_ids: [...state.tag_ids, tag_id]
      }
    }
    //Otherwise, remove it
    return{
      ...state,
      tag_ids: state.tag_ids.filter(id => id !== tag_id)
    }
  })
)
