// import React, { FC, useMemo } from 'react'
// import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
// import { STAT_COLORS } from '../../../constant'
// import { QuestionRadioStatPropsType } from './interface'

// function format(n: number) {
//   return (n * 100).toFixed(2)
// }

// const StatComponent: FC<QuestionRadioStatPropsType> = ({ stat = [] }) => {
//   // count 求和
//   const sum = useMemo(() => {
//     let s = 0
//     stat.forEach(i => (s += i.count))
//     return s
//   }, [stat])

//   return (
//     <div style={{ width: '300px', height: '400px' }}>
//       <ResponsiveContainer width="100%" height="100%">
//         <PieChart>
//           <Pie
//             dataKey="count"
//             data={stat}
//             cx="50%" // x 轴的偏移
//             cy="50%" // y 轴的偏移
//             outerRadius={50} // 饼图的直径
//             fill="#8884d8"
//             label={i => `${i.name}: ${format(i.count / sum)}%`}
//           >
//             {stat.map((i, index) => {
//               return <Cell key={index} fill={STAT_COLORS[index]} />
//             })}
//           </Pie>
//           <Tooltip />
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   )
// }

// export default StatComponent

import React, { FC } from 'react'
import { Pie } from '@ant-design/plots'
import { QuestionRadioStatPropsType } from './interface'

const StatComponent: FC<QuestionRadioStatPropsType> = ({ stat }) => {
  console.log(stat)

  const config = {
    data: [
      { type: '分类一', value: 27 },
      { type: '分类二', value: 25 },
      { type: '分类三', value: 18 },
      { type: '分类四', value: 15 },
    ],
    angleField: 'value',
    colorField: 'type',
    paddingRight: 0,
    innerRadius: 0.6,
    // label: {
    //   text: 'value',
    //   style: {
    //     fontWeight: 'bold',
    //   },
    // },
    legend: {
      color: {
        title: false,
        position: 'bottom',
        rowPadding: 5,
        layout: {
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        },
      },
    },
    annotations: [
      {
        type: 'text',
        style: {
          text: '常用设备',
          x: '50%',
          y: '50%',
          textAlign: 'center',
          fontSize: 16,
          fontStyle: 'bold',
        },
      },
    ],
  }
  return <Pie {...config} />
}

export default StatComponent
