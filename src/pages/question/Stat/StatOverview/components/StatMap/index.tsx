import React, { FC, useEffect, useRef } from 'react'
import { LineLayer, PolygonLayer, Popup, Scene } from '@antv/l7'
import { Map } from '@antv/l7-maps'

let scene: Scene | null = null

const StatMap: FC = () => {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapRef || !mapRef.current || scene) return
    scene = new Scene({
      id: mapRef.current as HTMLDivElement,
      map: new Map({
        style: 'light',
        center: [107.054293, 35.246265],
        zoom: 1.6,
        minZoom: 1.6,
        maxZoom: 3,
      }),
      logoVisible: false,
    })
    scene.on('loaded', () => {
      fetch('/geo/100000_full.json')
        .then(res => res.json())
        .then(data => {
          data.features = data.features.map((item: { properties: any }) => {
            return {
              ...item,
              properties: { ...item.properties, density: Math.random() },
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
          const layer = new PolygonLayer({})
            .source(data)
            .scale('density', {
              type: 'quantile',
            })
            .color('density', color)
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

          layer.on('mousemove', e => {
            const popup = new Popup({
              offsets: [0, 0],
              closeButton: false,
            })
              .setLnglat(e.lngLat)
              .setHTML(`<span>${e.feature.properties.name}: ${e.feature.properties.density}</span>`)
            scene?.addPopup(popup)
          })
        })
    })

    return () => {
      scene = null
    }
  })

  return <div ref={mapRef} className="h-80 justify-center relative" id="map" />
}

export default StatMap
