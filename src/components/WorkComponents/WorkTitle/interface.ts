export type WorkTitlePropsType = {
  text?: string
  level?: 1 | 2 | 3 | 4 | 5
  isCenter?: boolean

  onChange?: (newProps: WorkTitlePropsType) => void
  disabled?: boolean
}

export const WorkTitleDefaultProps: WorkTitlePropsType = {
  text: '一行标题',
  level: 1,
  isCenter: false,
}
