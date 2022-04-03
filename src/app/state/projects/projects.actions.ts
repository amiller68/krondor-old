import { createAction, props } from '@ngrx/store';
import { Project } from '../../entities/projects';

//Unautheticated Actions:

// Handle Project Loading
export const loadProjects = createAction(
  '[Projects API] Load Projects'
);

export const loadProjectsSuccess = createAction(
  '[Projects API] Load Projects Success',
  props<{ projects: ReadonlyArray<Project> }>()
);

export const loadProjectsError = createAction(
  '[Projects API] Load Projects Error',
  props<{ projects: ReadonlyArray<Project> }>()
);

//Authenticated API actions

//Adding to the projects database
export const addProject = createAction(
  '[Projects API] Add Project',
  props<{ project: Readonly<Project> }>()
);

export const addProjectSuccess = createAction(
  '[Projects API] Add Project Success',
  props<{ project: Readonly<Project> }>()
);

export const addProjectError = createAction(
  '[Projects API] Add Project Error'
);

//Deleting Data from the Projects Database
export const deleteProject = createAction(
  '[Projects API] Delete Project',
  props<{ id: string }>()
);

export const deleteProjectSuccess = createAction(
  '[Projects API] Delete Project Success',
  props<{ id: string }>()
);

export const deleteProjectError = createAction(
  '[Projects API] Delete Project Error'
);

// Adding Data to the Projects Database
export const updateProject = createAction(
  '[Projects API] Update Project',
  props<{ project: Readonly<Project> }>()
);

// Adding Data to the Projects Database
export const updateProjectSuccess = createAction(
  '[Projects API] Update Project',
  props<{ project: Readonly<Project> }>()
);

// Adding Data to the Projects Database
export const updateProjectError = createAction(
  '[Projects API] Update Project'
);

//@todo: Figure out best practice for how to structure this logic
//Projects-Page Actions

//Add to this action as we develop project search
export const updateSelectedTags = (createAction(
  '[Projects Page] Update Selected Tags',
  props<{tag_id: Readonly<string> }>()
))

