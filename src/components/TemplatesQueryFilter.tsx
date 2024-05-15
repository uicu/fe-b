import React from 'react'
import { NavLink } from 'react-router-dom'
import useLoadChannelData from '../hooks/useLoadChannelData'

const TemplatesQueryFilter: React.FC = () => {
  const { channelList } = useLoadChannelData()
  return (
    <>
      <ul className="flex grow justify-start flex-wrap items-center">
        <li>
          <p>分类：</p>
        </li>
        <li>
          <NavLink
            to="/templates/all"
            className={({ isActive }) => {
              const styles =
                'text-gray-600 hover:text-gray-900 px-1 flex items-center transition duration-150 ease-in-out'
              return isActive ? `text-purple-600 ${styles}` : `${styles}`
            }}
          >
            全部
          </NavLink>
        </li>
        {channelList.map(item => {
          return (
            <li key={item.id}>
              <NavLink
                to="/"
                className={({ isActive }) => {
                  const styles =
                    'text-gray-600 hover:text-gray-900 px-1 flex items-center transition duration-150 ease-in-out'
                  return isActive ? `text-purple-600 ${styles}` : `${styles}`
                }}
              >
                {item.name}
              </NavLink>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default TemplatesQueryFilter
