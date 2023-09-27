import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import produce from 'immer'
import cloneDeep from 'lodash.clonedeep'
import { nanoid } from 'nanoid'
import { arrayMove } from '@dnd-kit/sortable'
import { ComponentPropsType } from '../../components/QuestionComponents'
import { getNextSelectedId, insertNewComponent } from './utils'

export type ComponentInfoType = {
  fe_id: string // 前端生成的 id ，服务端 Mongodb 不认这种格式，所以自定义一个 fe_id
  type: string
  title: string
  page: number
  isHidden?: boolean
  isLocked?: boolean
  props: ComponentPropsType
}

export type PresentType = {
  selectedId: string
  componentList: Array<ComponentInfoType>
  copiedComponent: ComponentInfoType | null
  currentPage: number
  pageTotal: number
}

export type ComponentsStateType = {
  present: PresentType
  past: Array<PresentType>
  future: Array<PresentType>
}

const INIT_STATE: ComponentsStateType = {
  present: {
    // 当前选择的组件
    selectedId: '',
    // 组件列表
    componentList: [],
    // 用于拷贝暂存
    copiedComponent: null,
    // 当前所在page，-1代表结束页
    currentPage: 1,
    // 总page
    pageTotal: 1,
  },
  past: [],
  future: [],
}

export const componentsSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    // 历史记录压栈
    pushPast: produce((draft: ComponentsStateType) => {
      // Undo/Redo功能
      draft.past.push(cloneDeep(draft.present))
    }),

    // 撤销
    undoComponents: produce((draft: ComponentsStateType) => {
      if (draft.past.length > 0) {
        const previousValue = draft.past.pop() as PresentType
        draft.future.push(draft.present)
        draft.present = previousValue
      }
    }),
    // 重做
    redoComponents: produce((draft: ComponentsStateType) => {
      if (draft.future.length > 0) {
        const nextValue = draft.future.pop() as PresentType
        draft.past.push(draft.present)
        draft.present = nextValue
      }
    }),
    // 重置组件
    resetComponents: produce((draft: ComponentsStateType, action: PayloadAction<PresentType>) => {
      draft.present = action.payload
    }),

    // 修改 selectedId
    changeSelectedId: produce((draft: ComponentsStateType, action: PayloadAction<string>) => {
      draft.present.selectedId = action.payload
    }),

    // 添加新组件
    addComponent: produce(
      (draft: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
        const newComponent = action.payload
        insertNewComponent(draft, newComponent)
      }
    ),

    // 修改组件属性
    changeComponentProps: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>
      ) => {
        const { fe_id, newProps } = action.payload
        // 当前要修改属性的这个组件
        const curComp = draft.present.componentList.find(c => c.fe_id === fe_id)
        if (curComp) {
          curComp.props = {
            ...curComp.props,
            ...newProps,
          }
        }
      }
    ),

    // 删除选中的组件
    removeSelectedComponent: produce((draft: ComponentsStateType) => {
      const { componentList = [], selectedId: removedId } = draft.present

      // 重新计算 selectedId
      const newSelectedId = getNextSelectedId(removedId, componentList)
      draft.present.selectedId = newSelectedId

      const index = componentList.findIndex(c => c.fe_id === removedId)
      componentList.splice(index, 1)
    }),

    // 隐藏/显示 组件
    changeComponentHidden: produce(
      (draft: ComponentsStateType, action: PayloadAction<{ fe_id: string; isHidden: boolean }>) => {
        const { componentList = [] } = draft.present
        const { fe_id, isHidden } = action.payload

        // 重新计算 selectedId
        let newSelectedId = ''
        if (isHidden) {
          // 要隐藏
          newSelectedId = getNextSelectedId(fe_id, componentList)
        } else {
          // 要显示
          newSelectedId = fe_id
        }
        draft.present.selectedId = newSelectedId

        const curComp = componentList.find(c => c.fe_id === fe_id)
        if (curComp) {
          curComp.isHidden = isHidden
        }
      }
    ),

    // 锁定/解锁 组件
    toggleComponentLocked: produce(
      (draft: ComponentsStateType, action: PayloadAction<{ fe_id: string }>) => {
        const { fe_id } = action.payload

        const curComp = draft.present.componentList.find(c => c.fe_id === fe_id)
        if (curComp) {
          curComp.isLocked = !curComp.isLocked
        }
      }
    ),

    // 拷贝当前选中的组件
    copySelectedComponent: produce((draft: ComponentsStateType) => {
      const { selectedId, componentList = [] } = draft.present
      const selectedComponent = componentList.find(c => c.fe_id === selectedId)
      if (selectedComponent == null) return
      draft.present.copiedComponent = cloneDeep(selectedComponent) // 深拷贝
    }),

    // 粘贴组件
    pasteCopiedComponent: produce(
      (draft: ComponentsStateType, action: PayloadAction<{ page: number }>) => {
        const { copiedComponent } = draft.present
        if (copiedComponent == null) return

        // 要把 fe_id 给修改了，重要！！
        copiedComponent.fe_id = nanoid()

        // 粘贴到当前选择的页上
        const { page } = action.payload
        copiedComponent.page = page
        // 插入 copiedComponent
        insertNewComponent(draft, copiedComponent)
      }
    ),

    // 选中上一个
    selectPrevComponent: produce((draft: ComponentsStateType) => {
      const { selectedId, componentList } = draft.present
      const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId)

      if (selectedIndex < 0) return // 未选中组件
      if (selectedIndex <= 0) return // 已经选中了第一个，无法在向上选中

      draft.present.selectedId = componentList[selectedIndex - 1].fe_id
    }),

    // 选中下一个
    selectNextComponent: produce((draft: ComponentsStateType) => {
      const { selectedId, componentList } = draft.present
      const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId)

      if (selectedIndex < 0) return // 未选中组件
      if (selectedIndex + 1 === componentList.length) return // 已经选中了最后一个，无法再向下选中

      draft.present.selectedId = componentList[selectedIndex + 1].fe_id
    }),

    // 修改组件标题
    changeComponentTitle: produce(
      (draft: ComponentsStateType, action: PayloadAction<{ fe_id: string; title: string }>) => {
        const { title, fe_id } = action.payload
        const curComp = draft.present.componentList.find(c => c.fe_id === fe_id)
        if (curComp) curComp.title = title
      }
    ),

    // 移动组件位置
    moveComponent: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<{ oldIndex: number; newIndex: number }>
      ) => {
        const { componentList: curComponentList } = draft.present
        const { oldIndex, newIndex } = action.payload

        draft.present.componentList = arrayMove(curComponentList, oldIndex, newIndex)
      }
    ),

    // 替换组件列表
    replaceComponent: produce(
      (draft: ComponentsStateType, action: PayloadAction<Array<ComponentInfoType>>) => {
        draft.present.componentList = action.payload
      }
    ),
    // 修改当前页
    changeCurrentPage: produce((draft: ComponentsStateType, action: PayloadAction<number>) => {
      draft.present.currentPage = action.payload
    }),

    // 修改页总数
    changePageTotal: produce((draft: ComponentsStateType, action: PayloadAction<number>) => {
      draft.present.pageTotal = action.payload
    }),
  },
})

export const {
  pushPast,
  undoComponents,
  redoComponents,
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
  selectPrevComponent,
  selectNextComponent,
  changeComponentTitle,
  moveComponent,
  replaceComponent,
  changeCurrentPage,
  changePageTotal,
} = componentsSlice.actions

export default componentsSlice.reducer
