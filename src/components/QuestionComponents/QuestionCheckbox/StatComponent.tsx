// import React, { FC } from 'react'
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
// import { QuestionCheckboxStatPropsType } from './interface'

// const StatComponent: FC<QuestionCheckboxStatPropsType> = ({ stat }) => {
//   return (
//     <div style={{ width: '400px', height: '300px' }}>
//       <ResponsiveContainer width="100%" height="100%">
//         <BarChart
//           width={400}
//           height={300}
//           data={stat}
//           margin={{
//             top: 5,
//             right: 30,
//             left: 0,
//             bottom: 5,
//           }}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="name" />
//           <YAxis />
//           <Tooltip />
//           {/* <Legend /> */}
//           <Bar dataKey="count" fill="#8884d8" />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   )
// }

// export default StatComponent

import React, { FC } from 'react'
import { Column } from '@ant-design/plots'
import { QuestionCheckboxStatPropsType } from './interface'

const StatComponent: FC<QuestionCheckboxStatPropsType> = ({ stat }) => {
  console.log(stat)

  const config = {
    data: [
      {
        城市: '七台河',
        销售额: 52827.32,
      },
      {
        城市: '万县',
        销售额: 16921.576,
      },
      {
        城市: '三亚',
        销售额: 22698.396,
      },
      {
        城市: '三岔子',
        销售额: 3262.98,
      },
      {
        城市: '三明',
        销售额: 1458.8,
      },
      {
        城市: '上梅',
        销售额: 11704.476,
      },
      {
        城市: '上海',
        销售额: 582450.5679999999,
      },
      {
        城市: '上虞',
        销售额: 10672.872,
      },
    ],
    xField: '城市',
    yField: '销售额',
    scrollbar: {
      x: {
        ratio: 1, // 注意：带滚动条柱状图
      },
    },
  }
  return <Column {...config} />
}

export default StatComponent
