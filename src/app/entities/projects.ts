export type Project = {
  startDate: Date,
  endDate: Date | undefined,
  title: string,
  description: string,
  platform: string,
  tags: string []
};

export const defaultProject = {
  startDate: new Date(),
  endDate: undefined,
  title: 'project_title',
  description: 'What\'s your project?',
  platform: '',
  tags:  []
}
