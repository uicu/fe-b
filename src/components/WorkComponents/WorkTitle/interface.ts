export type WorkTitlePropsType = {
  text?: string
  level?: 1 | 2 | 3 | 4 | 5
  textAlign?: string
  onChange?: (newProps: WorkTitlePropsType) => void
  disabled?: boolean
}

export const WorkTitleDefaultProps: WorkTitlePropsType = {
  text: '副标题',
  level: 1,
  textAlign: 'left',
}
