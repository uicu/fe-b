import React, { useEffect, FC } from 'react'
import * as THREE from 'three'
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const Three: FC = () => {
  useEffect(() => {
    // 创建场景
    const scene = new THREE.Scene()

    // 创建相机
    const camera = new THREE.PerspectiveCamera(
      45, // 视角
      window.innerWidth / window.innerHeight, // 宽高比
      0.1, // 近平面
      1000 // 远平面
    )

    // 创建渲染器
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    // 创建几何体
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    // 创建材质
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    const parentMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 })
    // 创建网格(物体)
    const parentCube = new THREE.Mesh(geometry, parentMaterial)
    const cube = new THREE.Mesh(geometry, material)
    parentCube.add(cube)
    // 物体位移
    parentCube.position.set(-3, 0, 0)
    // 物体旋转 2PI等于360度
    parentCube.rotation.x = Math.PI / 4
    // parentCube.scale.set(2, 2, 2)

    // cube.position.x = 2;
    cube.position.set(3, 0, 0)
    // 设置立方体的放大
    // cube.scale.set(2, 2, 2)

    // 绕着x轴旋转
    cube.rotation.x = Math.PI / 4

    // 将网格添加到场景中
    scene.add(parentCube)

    // 设置相机位置
    camera.position.z = 5
    camera.position.y = 2
    camera.position.x = 2
    // 设置相机看向哪里
    camera.lookAt(0, 0, 0)

    // 添加世界坐标辅助器
    const axesHelper = new THREE.AxesHelper(5)
    scene.add(axesHelper)

    // 添加轨道控制器
    const controls = new OrbitControls(camera, renderer.domElement)
    // 设置带阻尼的惯性
    controls.enableDamping = true
    // 设置阻尼系数
    controls.dampingFactor = 0.05
    // 设置旋转速度
    controls.autoRotate = true

    // 渲染函数
    function animate() {
      controls.update()
      requestAnimationFrame(animate)
      // 旋转
      // cube.rotation.x += 0.01
      // cube.rotation.y += 0.01
      // 渲染
      renderer.render(scene, camera)
    }
    animate()

    // 监听窗口变化
    window.addEventListener('resize', () => {
      // 重置渲染器宽高比
      renderer.setSize(window.innerWidth, window.innerHeight)
      // 重置相机宽高比
      camera.aspect = window.innerWidth / window.innerHeight
      // 更新相机投影矩阵
      camera.updateProjectionMatrix()
    })

    const btn = document.createElement('button')
    btn.innerHTML = '点击全屏'
    btn.style.position = 'absolute'
    btn.style.top = '10px'
    btn.style.left = '10px'
    btn.style.zIndex = '999'
    btn.onclick = function () {
      // 全屏
      document.body.requestFullscreen()
      console.log('全屏')
    }
    document.body.appendChild(btn)

    // 退出全屏的按钮
    const exitBtn = document.createElement('button')
    exitBtn.innerHTML = '退出全屏'
    exitBtn.style.position = 'absolute'
    exitBtn.style.top = '10px'
    exitBtn.style.left = '100px'
    exitBtn.style.zIndex = '999'
    exitBtn.onclick = function () {
      // 退出全屏
      document.exitFullscreen()
      console.log('退出全屏')
    }
    document.body.appendChild(exitBtn)
  }, [])

  return <div className="App">11212</div>
}

export default Three
