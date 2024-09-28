import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')



// Scene
const scene = new THREE.Scene()

// fog

const fog = new THREE.Fog('#262837', 1, 15)
scene.fog = fog

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorMetallnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')


const brickColorTexture = textureLoader.load('/textures/bricks/color.jpg')
const brickAmbientTexture = textureLoader.load('/textures/bricks/ambientOccluion.jpg')
const brickNormalexture = textureLoader.load('/textures/bricks/normal.jpg')
const brickRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg')

const grassColorTexture = textureLoader.load('/textures/grass/color.jpg')
const grassAmbientTexture = textureLoader.load('/textures/grass/ambientOccluion.jpg')
const grassNormalexture = textureLoader.load('/textures/grass/normal.jpg')
const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg')

doorColorTexture.colorSpace = THREE.SRGBColorSpace

grassColorTexture.repeat.set(8, 8)
grassAmbientTexture.repeat.set(8, 8)
grassNormalexture.repeat.set(8, 8)
grassRoughnessTexture.repeat.set(8, 8)

grassColorTexture.wrapS = THREE.RepeatWrapping
grassNormalexture.wrapS = THREE.RepeatWrapping
grassNormalexture.wrapS = THREE.RepeatWrapping
grassRoughnessTexture.wrapS = THREE.RepeatWrapping


grassColorTexture.wrapT = THREE.RepeatWrapping
grassNormalexture.wrapT = THREE.RepeatWrapping
grassNormalexture.wrapT = THREE.RepeatWrapping
grassRoughnessTexture.wrapT = THREE.RepeatWrapping



/**
 * House
 */


const house = new THREE.Group()
scene.add(house)

// walls

const walls  = new THREE.Mesh(
  new THREE.BoxGeometry(4, 2.5, 4),
  new 
  THREE.MeshStandardMaterial( {
    map: brickColorTexture,
    aoMap: brickAmbientTexture,
    normalMap: brickNormalexture,
    roughnessMap: brickRoughnessTexture,
  })
) 
walls.geometry.setAttribute('uv2',
  new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2)
)
walls.position.y = 1.25

house.add(walls)

// roof

const roof = new THREE.Mesh(
  new THREE.ConeGeometry(3.5, 1, 4),
  new THREE.MeshStandardMaterial({color: '#b35f45'})
)

roof.position.y  = 3
roof.rotation.y = Math.PI * 1/4
house.add(roof)

const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
  new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    transparent: true,
    alphaMap: doorAlphaTexture,
    aoMap: doorAmbientTexture,
    displacementMap: doorHeightTexture,
    displacementScale: 0.1,
    normalMap: doorNormalTexture,
    metalnessMap: doorMetallnessTexture,
    roughnessMap: doorRoughnessTexture
  })
)
door.geometry.setAttribute('uv2',
  new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
)
door.position.z = 2 + 0.01
door.position.y  = 1

house.add(door)

// bush

const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushmaterial = new THREE.MeshStandardMaterial( {color: '#89c854'})
const bush1 = new THREE.Mesh( bushGeometry, bushmaterial)
const bush2 = new THREE.Mesh( bushGeometry, bushmaterial )
const bush3 = new THREE.Mesh( bushGeometry, bushmaterial)
const bush4 = new THREE.Mesh( bushGeometry, bushmaterial )


bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(0.8, 0.2, 2.2)

bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set(1.4, 0.1, 2.1)

bush4.scale.set(0.15, 0.15, 0.15)
bush4.position.set(-1, 0.05, 2.6)

bush3.scale.set(0.4, 0.4, 0.4)
bush3.position.set(-0.8, 0.1, 2.2)


house.add(bush1, bush2, bush4, bush3)

const grave = new THREE.Group()
scene.add(grave)

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const gravematerial = new THREE.MeshStandardMaterial({color: '#b3b6b1' })

for (var i = 0; i < 60; i++){
  const angle = Math.random() * Math.PI * 2
  const x = Math.sin(angle) * (Math.random() * 6 + 3)
  const z = Math.cos(angle) * (Math.random() * 6 + 3)

  const graveMesh = new THREE.Mesh(graveGeometry, gravematerial)

  graveMesh.position.set(x, 0.3, z)
  graveMesh.rotation.y = (Math.random() - 0.5) * 0.4
  graveMesh.rotation.z = (Math.random() - 0.5) * 0.4
  graveMesh.castShadow = true

  grave.add(graveMesh)
}

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({
      map: grassColorTexture,
      aoMap: grassAmbientTexture,
      normalMap: grassNormalexture,    
      roughnessMap: grassRoughnessTexture,
     })
)
floor.geometry.setAttribute('uv2',
  new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
)

floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
scene.add(floor)

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.12)
moonLight.position.set(4, 5, - 2)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(moonLight)

// Door color

const doorLight = new THREE.PointLight('#ff7d46', 2, 7)
doorLight.position.set(0, 2.2, 2.7)
house.add(doorLight)


// gost

const gosht1 = new THREE.PointLight('#ff00ff', 2, 3)
const gosht2 = new THREE.PointLight('#00ffff', 2, 3)
const gosht3 = new THREE.PointLight('#ffff00')

scene.add(gosht1, gosht2, gosht3)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
// renderer.setPixelRatio(2)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor('#262837')
renderer.shadowMap.enabled = true

moonLight.castShadow = true
door.castShadow = true
gosht1.castShadow = true
gosht2.castShadow = true
gosht3.castShadow = true
walls.castShadow = true
bush1.castShadow = true
bush2.castShadow = true
bush3.castShadow = true
floor.receiveShadow = true


/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    //updateGost

    const gosht1Angle = elapsedTime
    gosht1.position.x = Math.sin(gosht1Angle) * 4
    gosht1.position.z = Math.cos(gosht1Angle) * 4
    gosht1.position.y = Math.cos(elapsedTime * 3) 

    const gosht2Angle = -elapsedTime * 0.32
    gosht2.position.x = Math.sin(gosht2Angle) * 5
    gosht2.position.z = Math.cos(gosht2Angle) * 5
    gosht2.position.y = Math.cos(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)

    const gosht3Angle = -elapsedTime * 0.18
    gosht3.position.x = Math.sin(gosht3Angle) * (7 + Math.sin( elapsedTime * 0.32))
    gosht3.position.z = Math.cos(gosht3Angle) * (7 + Math.sin( elapsedTime * 0.32))
    gosht3.position.y = Math.cos(elapsedTime * 3)



    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()