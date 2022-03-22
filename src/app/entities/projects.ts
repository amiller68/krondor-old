export type Project = {
  startDate: Date,
  endDate: Date | undefined,
  title: string,
  description: string,
  platform: string,
  tags: string []
};

export type Tag = {
  id: string,
  name: string,
  color: string
}

export const defaultProject: Project = {
  startDate: new Date(),
  endDate: undefined,
  title: 'project_title',
  description: 'What\'s your project?',
  platform: '',
  tags:  []
}

export const defaultTag: Tag = {
  id: 'tag_id',
  name: 'defaultTag',
  color: '0,0,0'
}
