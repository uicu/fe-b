import React, { FC, useEffect, useRef, useState } from 'react'
import { LineLayer, PolygonLayer, Popup, Scene, Fullscreen, Zoom } from '@antv/l7'
import { Map } from '@antv/l7-maps'
import { useRequest } from 'ahooks'
import { getQuestionStatLocationService } from '../../../../../../services/stat'
import { useParams } from 'react-router-dom'

// function rgbToHex(r: number, g: number, b: number) {
//   const hex = ((r << 16) | (g << 8) | b).toString(16)
//   return `#${new Array(Math.abs(hex.length - 7)).join('0')}${hex}`
// }

// function hexToRgb(hex: string) {
//   const rgb = []
//   for (let i = 1; i < 7; i += 2) {
//     rgb.push(parseInt(`0x${hex.slice(i, i + 2)}`, 16))
//   }
//   return rgb
// }
// /**
//  * 计算渐变过渡色
//  */
// function gradient(startColor: string, endColor: string, step: number) {
//   // 将 hex 转换为rgb
//   const sColor = hexToRgb(startColor)
//   const eColor = hexToRgb(endColor)

//   // 计算R\G\B每一步的差值
//   const rStep = (eColor[0] - sColor[0]) / step
//   const gStep = (eColor[1] - sColor[1]) / step
//   const bStep = (eColor[2] - sColor[2]) / step

//   const gradientColorArr = []
//   for (let i = 0; i < step; i++) {
//     // 计算每一步的hex值
//     gradientColorArr.push(
//       rgbToHex(
//         parseInt(`${rStep * i + sColor[0]}`, 10),
//         parseInt(`${gStep * i + sColor[1]}`, 10),
//         parseInt(`${bStep * i + sColor[2]}`, 10)
//       )
//     )
//   }
//   return gradientColorArr
// }
// const color = gradient('#FFFFD9', '#0C2C84', data.features.length || 1)

let scene: Scene | null = null

const StatMap: FC = () => {
  const { id = '' } = useParams()
  const [list, setList] = useState<Array<{ province: string; count: number }>>([])

  const mapRef = useRef<HTMLDivElement>(null)

  const { loading } = useRequest(
    async () => {
      const res = await getQuestionStatLocationService(id)
      return res
    },
    {
      refreshDeps: [id],
      onSuccess(res) {
        const data = res.data.map((item: { count: string }) => {
          return {
            ...item,
            count: Number(item.count),
          }
        })
        setList(data)
      },
    }
  )

  useEffect(() => {
    // 销毁
    scene && scene.destroy()
    if (!mapRef || !mapRef.current || scene || loading) return
    scene = new Scene({
      id: mapRef.current as HTMLDivElement,
      map: new Map({
        style: 'light',
        center: [107.054293, 35.246265],
        zoom: 1.6,
        minZoom: 1.6,
        maxZoom: 6,
      }),
      logoVisible: false,
    })
    scene.on('loaded', () => {
      fetch('/geo/100000_full.json')
        .then(res => res.json())
        .then(data => {
          data.features = data.features.map((item: { properties: { adcode: string } }) => {
            const code = list.find(i => {
              return i.province === `${item.properties.adcode}`
            })

            if (code) {
              return {
                ...item,
                properties: { ...item.properties, density: code.count },
              }
            }
            return {
              ...item,
              properties: { ...item.properties, density: 0.0 },
            }
          })

          const color = [
            'rgb(255,255,217)',
            'rgb(237,248,177)',
            'rgb(199,233,180)',
            'rgb(127,205,187)',
            'rgb(65,182,196)',
            'rgb(29,145,192)',
            'rgb(34,94,168)',
            'rgb(12,44,132)',
          ]

          const coefficient = (color.length - 1) / list[0].count
          const layer = new PolygonLayer({})
            .source(data)
            .scale('density', {
              type: 'quantile',
            })
            .color('density', value => {
              return color[Math.floor(value * coefficient)]
            })
            .shape('fill')
            .active(true)
          const layer2 = new LineLayer({
            zIndex: 2,
          })
            .source(data)
            .color('#fff')
            .active(true)
            .size(1)
            .style({
              lineType: 'dash',
              dashArray: [2, 2],
            })
          scene?.addLayer(layer)
          scene?.addLayer(layer2)

          const fullscreen = new Fullscreen({
            btnText: '全屏',
            exitBtnText: '退出全屏',
          })
          scene?.addControl(fullscreen)

          const zoom = new Zoom({
            zoomInTitle: '放大',
            zoomOutTitle: '缩小',
          })
          scene?.addControl(zoom)

          layer.on('mousemove', e => {
            const popup = new Popup({
              offsets: [0, 0],
              closeButton: false,
            })
              .setLnglat(e.lngLat)
              .setHTML(
                `<span style="white-space:nowrap;">${e.feature.properties.name}: ${e.feature.properties.density}</span>`
              )
            scene?.addPopup(popup)
          })
        })
    })

    return () => {
      scene = null
    }
  }, [loading, list])

  return <div ref={mapRef} className="h-80 justify-center relative" id="map" />
}

export default StatMap
