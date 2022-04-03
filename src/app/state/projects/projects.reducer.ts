import {createReducer, on} from '@ngrx/store';

import {
  addProjectError,
  addProjectSuccess,
  deleteProjectError,
  deleteProjectSuccess,
  loadProjectsError,
  loadProjectsSuccess, updateLoadingStatus,
  updateProjectError,
  updateProjectSuccess, updateSelectedTags
} from './projects.actions';
import {Project, ProjectSelection} from '../../entities/projects';
import * as _ from 'underscore'

export const projectsApiInitialState: ReadonlyArray<Project>= []
//@todo: figure out best practices for refactoring this
export const projectsPageInitialState: Readonly<ProjectSelection> = {
  tag_ids: [],
  is_loaded: true
}

//@todo: Implement Error Handling
export const projectsApiReducer = createReducer(
  projectsApiInitialState,

  // Receive Load Project Responses
  on(loadProjectsSuccess, (state, { projects }) => projects),

  on(loadProjectsError, (state, { projects }) => projects),

  // Receive Add Project Responses
  on(addProjectSuccess, (state, { project }) => {
    if (_.findWhere(state, {_id: project._id}) !== undefined) return state;
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
    if (_.findWhere(state, {_id: project._id}) !== undefined) return state;
    // Update state
    return _.map(state, (p) => {
      if (p._id === project._id) {
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
    if (_.findWhere(state, {_id: id}) === undefined) return state;
    // Update state
    return state.filter((p) => p._id !== id);
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
  }),

  on(updateLoadingStatus, (state, {loading_status}) => {
    console.log("Updating Load Status: ", loading_status)
    return {
      ...state,
      is_loaded: loading_status
    }
  })
)
