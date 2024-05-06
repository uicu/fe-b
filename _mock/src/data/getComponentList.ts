/**
 * @description 生成组件列表
 */

function getComponentList() {
  return [
    // Info
    {
      fe_id: 'c1', // 注意，由于统计页，左侧和中间需要数据完全一直，所以要写死 fe_id ，不能用 Random.id()
      type: 'workInfo', // 组件类型，不能重复，前后端统一好
      title: '问卷信息',
      page: 1,
      isHidden: false,
      isLocked: false,
      props: { title: '问卷标题', desc: '问卷描述...' },
    },
    // Title
    {
      fe_id: 'c2',
      type: 'workTitle', // 组件类型，不能重复，前后端统一好
      title: '标题',
      page: 1,
      isHidden: false,
      isLocked: false,
      props: { text: '个人信息调研', level: 1, isCenter: false },
    },
    // Input
    {
      fe_id: 'c3',
      type: 'workInput',
      title: '输入框1',
      page: 1,
      isHidden: false,
      isLocked: false,
      props: { title: '你的姓名', placeholder: '请输入姓名...' },
    },
    // Input
    {
      fe_id: 'c4',
      type: 'workInput',
      title: '输入框2',
      page: 1,
      isHidden: false,
      isLocked: false,
      props: { title: '你的电话', placeholder: '请输入电话...' },
    },
    // Textarea
    {
      fe_id: 'c5',
      type: 'workTextarea',
      title: '多行输入',
      page: 1,
      isHidden: false,
      isLocked: false,
      props: { title: '你的爱好', placeholder: '请输入...' },
    },
    // Paragraph
    {
      fe_id: 'c6',
      type: 'workParagraph',
      title: '段落',
      page: 1,
      isHidden: false,
      isLocked: false,
      props: {
        text: '{"ops":[{"attributes": {"width": "78","color": "#f06666"},"insert": {"image": "http://e.hiphotos.baidu.com/image/pic/item/a1ec08fa513d2697e542494057fbb2fb4316d81e.jpg"}},{"attributes":{"color":"#f06666"},"insert":"为"},{"insert":"了"},{"attributes":{"bold":true},"insert":"给您"},{"insert":"提\\n供"},{"attributes":{"link":"https://www.uicu.club/"},"insert":"更好的"},{"insert":"服务\\n"}]}',
        isCenter: false,
      },
    },
    // Radio
    {
      fe_id: 'c7',
      type: 'workRadio',
      title: '单选',
      page: 1,
      isHidden: false,
      isLocked: false,
      props: {
        title: '单选标题',
        isVertical: false,
        options: [
          { value: 'item1', text: '选项1' },
          { value: 'item2', text: '选项2' },
          { value: 'item3', text: '选项3' },
        ],
        value: '',
      },
    },
    // Checkbox
    {
      fe_id: 'c8',
      type: 'workCheckbox',
      title: '多选',
      page: 1,
      isHidden: false,
      isLocked: false,
      props: {
        title: '多选标题',
        isVertical: false,
        list: [
          { value: 'item1', text: '选项1', checked: true },
          { value: 'item2', text: '选项2', checked: false },
          { value: 'item3', text: '选项3', checked: false },
        ],
      },
    },
    // Textarea
    {
      fe_id: 'c9',
      type: 'workTextarea',
      title: '多行输入',
      page: 2,
      isHidden: false,
      isLocked: false,
      props: { title: '你的爱好', placeholder: '请输入...' },
    },
    // Radio
    {
      fe_id: 'c10',
      type: 'workRadio',
      title: '单选',
      page: 2,
      isHidden: false,
      isLocked: false,
      props: {
        title: '单选标题',
        isVertical: false,
        options: [
          { value: 'item1', text: '选项1' },
          { value: 'item2', text: '选项2' },
          { value: 'item3', text: '选项3' },
        ],
        value: '',
      },
    },
    // Radio
    {
      fe_id: 'c11',
      type: 'workRadio',
      title: '单选',
      page: 2,
      isHidden: false,
      isLocked: false,
      props: {
        title: '单选标题',
        isVertical: false,
        options: [
          { value: 'item1', text: '选项1' },
          { value: 'item2', text: '选项2' },
          { value: 'item3', text: '选项3' },
        ],
        value: '',
      },
    },
    // Radio
    {
      fe_id: 'c12',
      type: 'workRadio',
      title: '单选',
      page: 2,
      isHidden: false,
      isLocked: false,
      props: {
        title: '单选标题',
        isVertical: false,
        options: [
          { value: 'item1', text: '选项1' },
          { value: 'item2', text: '选项2' },
          { value: 'item3', text: '选项3' },
        ],
        value: '',
      },
    },
    // Radio
    {
      fe_id: 'c13',
      type: 'workRadio',
      title: '单选',
      page: 2,
      isHidden: false,
      isLocked: false,
      props: {
        title: '单选标题',
        isVertical: false,
        options: [
          { value: 'item1', text: '选项1' },
          { value: 'item2', text: '选项2' },
          { value: 'item3', text: '选项3' },
        ],
        value: '',
      },
    },
    // Radio
    {
      fe_id: 'c14',
      type: 'workRadio',
      title: '单选',
      page: 2,
      isHidden: false,
      isLocked: false,
      props: {
        title: '单选标题',
        isVertical: false,
        options: [
          { value: 'item1', text: '选项1' },
          { value: 'item2', text: '选项2' },
          { value: 'item3', text: '选项3' },
        ],
        value: '',
      },
    },
    // Radio
    {
      fe_id: 'c15',
      type: 'workRadio',
      title: '单选',
      page: 2,
      isHidden: false,
      isLocked: false,
      props: {
        title: '单选标题',
        isVertical: false,
        options: [
          { value: 'item1', text: '选项1' },
          { value: 'item2', text: '选项2' },
          { value: 'item3', text: '选项3' },
        ],
        value: '',
      },
    },
    // Radio
    {
      fe_id: 'c16',
      type: 'workRadio',
      title: '单选',
      page: 2,
      isHidden: false,
      isLocked: false,
      props: {
        title: '单选标题',
        isVertical: false,
        options: [
          { value: 'item1', text: '选项1' },
          { value: 'item2', text: '选项2' },
          { value: 'item3', text: '选项3' },
        ],
        value: '',
      },
    },
    // Radio
    {
      fe_id: 'c17',
      type: 'workRadio',
      title: '单选',
      page: 2,
      isHidden: false,
      isLocked: false,
      props: {
        title: '单选标题',
        isVertical: false,
        options: [
          { value: 'item1', text: '选项1' },
          { value: 'item2', text: '选项2' },
          { value: 'item3', text: '选项3' },
        ],
        value: '',
      },
    },
    // Radio
    {
      fe_id: 'c18',
      type: 'workRadio',
      title: '单选',
      page: 2,
      isHidden: false,
      isLocked: false,
      props: {
        title: '单选标题',
        isVertical: false,
        options: [
          { value: 'item1', text: '选项1' },
          { value: 'item2', text: '选项2' },
          { value: 'item3', text: '选项3' },
        ],
        value: '',
      },
    },
    // Radio
    {
      fe_id: 'c19',
      type: 'workRadio',
      title: '单选',
      page: 2,
      isHidden: false,
      isLocked: false,
      props: {
        title: '单选标题',
        isVertical: false,
        options: [
          { value: 'item1', text: '选项1' },
          { value: 'item2', text: '选项2' },
          { value: 'item3', text: '选项3' },
        ],
        value: '',
      },
    },
    // Radio
    {
      fe_id: 'c20',
      type: 'workRadio',
      title: '单选',
      page: 2,
      isHidden: false,
      isLocked: false,
      props: {
        title: '单选标题',
        isVertical: false,
        options: [
          { value: 'item1', text: '选项1' },
          { value: 'item2', text: '选项2' },
          { value: 'item3', text: '选项3' },
        ],
        value: '',
      },
    },
    // Radio
    {
      fe_id: 'c21',
      type: 'workRadio',
      title: '单选',
      page: 2,
      isHidden: false,
      isLocked: false,
      props: {
        title: '单选标题',
        isVertical: false,
        options: [
          { value: 'item1', text: '选项1' },
          { value: 'item2', text: '选项2' },
          { value: 'item3', text: '选项3' },
        ],
        value: '',
      },
    },
    // Radio
    {
      fe_id: 'c22',
      type: 'workRadio',
      title: '单选',
      page: 2,
      isHidden: false,
      isLocked: false,
      props: {
        title: '单选标题',
        isVertical: false,
        options: [
          { value: 'item1', text: '选项1' },
          { value: 'item2', text: '选项2' },
          { value: 'item3', text: '选项3' },
        ],
        value: '',
      },
    },
    // Input
    {
      fe_id: 'c23',
      type: 'workInput',
      title: '输入框1',
      page: 3,
      isHidden: false,
      isLocked: false,
      props: { title: '你的姓名', placeholder: '请输入姓名...' },
    },
    {
      fe_id: 'last',
      type: 'workInfo', // 组件类型，不能重复，前后端统一好
      title: '最后一页',
      page: -1,
      isHidden: false,
      isLocked: false,
      props: { title: '问卷到此结束，感谢您的参与！', desc: '问卷描述...' },
    },
  ]
}

export default getComponentList
