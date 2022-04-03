export type Project = {
  _id: string,
  startDate: Date,
  endDate: Date | undefined,
  title: string,
  description: string,
  platform: string,
  tags: string []
};

export type Tag = {
  _id: string,
  name: string,
  color: string
}

export const defaultProject: Project = {
  _id: '',
  startDate: new Date(),
  endDate: undefined,
  title: 'Project Title',
  description: '# What\'s your project?',
  platform: '',
  tags:  []
}

export const defaultTag: Tag = {
  _id: 'tag_id',
  name: 'defaultTag',
  color: '0,0,0'
}

export interface ProjectSelection {
  tag_ids: string[],
  is_loaded: boolean
}
