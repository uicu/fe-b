import React from 'react'
import { useLocation, NavLink, useSearchParams } from 'react-router-dom'
import useLoadChannelData from '../hooks/useLoadChannelData'

const TemplatesQueryFilter: React.FC = () => {
  const { channelList } = useLoadChannelData()
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()
  return (
    <>
      <ul className="flex grow justify-start flex-wrap items-center">
        <li>
          <p>分类：</p>
        </li>
        <li>
          <NavLink
            to={pathname}
            className={() => {
              const channelId = searchParams.get('channel')
              const isActive = !channelId
              const styles =
                'text-gray-600 hover:text-gray-900 px-2 flex items-center transition duration-150 ease-in-out'
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
                to={`${pathname}?channel=${item.id}`}
                className={() => {
                  const channelId = searchParams.get('channel')
                  const isActive = channelId === `${item.id}`
                  const styles =
                    'text-gray-600 hover:text-gray-900 px-2 flex items-center transition duration-150 ease-in-out'
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
