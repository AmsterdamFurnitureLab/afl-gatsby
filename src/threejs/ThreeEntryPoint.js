// Import dependencies
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import modelPath from "../3Dmodels/cabinet3.gltf"
let theModel
const cameraFarZ = 8
const cameraFarX = 6
const cameraFarY = 3.4
function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement
  var width = window.innerWidth
  var height = window.innerHeight
  var canvasPixelWidth = canvas.width / window.devicePixelRatio
  var canvasPixelHeight = canvas.height / window.devicePixelRatio

  const needResize = canvasPixelWidth !== width || canvasPixelHeight !== height
  if (needResize) {
    renderer.setSize(width, height, false)
  }
  return needResize
}

function dumpObject(obj, lines = [], isLast = true, prefix = "") {
  const localPrefix = isLast ? "└─" : "├─"
  lines.push(
    `${prefix}${prefix ? localPrefix : ""}${obj.name || "*no-name*"} [${
      obj.type
    }]`
  )
  const newPrefix = prefix + (isLast ? "  " : "│ ")
  const lastNdx = obj.children.length - 1
  obj.children.forEach((child, ndx) => {
    const isLast = ndx === lastNdx
    dumpObject(child, lines, isLast, newPrefix)
  })
  return lines
}

export default function ThreeEntryPoint(sceneRef) {
  // Create Scene
  const scene = new THREE.Scene()
  const BACKGROUND_COLOR = 0xf2f2f2
  scene.background = new THREE.Color(BACKGROUND_COLOR)
  scene.fog = new THREE.Fog(BACKGROUND_COLOR, 20, 100)

  // Define a camera, set it to fill the browser window and position it
  const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    10000
  )
  camera.position.z = cameraFarZ
  camera.position.x = cameraFarX
  camera.position.y = cameraFarY

  // Define a renderer, and set it to fill the browser window
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.shadowMap.enabled = true
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth * 0.87, 0.87 * window.innerHeight)

  // Get an element from the DOM and append renderer.domElement to it
  sceneRef.appendChild(renderer.domElement)

  // Add controls, targetting the same DOM element
  let controls = new OrbitControls(camera, sceneRef)
  controls.target.set(0, 0, 0)
  controls.rotateSpeed = 0.7
  controls.maxPolarAngle = Math.PI / 2 // niet verder dan vloer
  controls.minPolarAngle = Math.PI / 7 // tot plafond
  controls.enableDamping = true
  controls.enablePan = false
  controls.dampingFactor = 0.8
  controls.update()

  // Create lights, position them, and add them to the scene
  let hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.41)
  hemiLight.position.set(0, 50, 0)

  let dirLight = new THREE.DirectionalLight(0xffffff, 0.84)
  dirLight.position.set(-4, 22, 18)
  dirLight.castShadow = true
  dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024)

  // Floor
  let floorGeometry = new THREE.PlaneGeometry(5000, 5000, 1, 1)
  let floorMaterial = new THREE.MeshPhongMaterial({
    color: 0xeeeeee,
    shininess: 0,
  })

  let floor = new THREE.Mesh(floorGeometry, floorMaterial)
  floor.rotation.x = -0.5 * Math.PI
  floor.receiveShadow = true
  floor.position.y = -1.5

  // Wall
  let wallGeometry = new THREE.PlaneGeometry(5000, 5000, 1, 1)
  let wallMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    shininess: 0,
  })

  let wall = new THREE.Mesh(wallGeometry, wallMaterial)
  wall.receiveShadow = true
  wall.position.z = -0.527

  // Load model and initiate
  let loader = new GLTFLoader()
  loader.load(
    modelPath,
    function(gltf) {
      // if the model is loaded successfully, add it to your scene here
      theModel = gltf.scene

      theModel.traverse(o => {
        if (o.isMesh) {
          o.castShadow = true
          o.receiveShadow = true
        }
      })

      theModel.scale.set(2, 2, 2)
      theModel.position.x = 0
      theModel.position.y = -1.53
      theModel.position.z = 0

      scene.add(theModel)
      // scene.add(gltf.materials);

      // Add hemisphere & directional light to scene
      scene.add(hemiLight)
      scene.add(dirLight)
      scene.add(floor)
      scene.add(wall)

      console.log(dumpObject(theModel).join("\n"))
    },
    undefined,
    function(err) {
      console.error(err)
    }
  )

  // todo: https://tympanus.net/codrops/2019/09/17/how-to-build-a-color-customizer-app-for-a-3d-model-with-three-js/
  //   // Define (or import) your object's geometry
  //   const geometry = new THREE.TorusKnotGeometry(10, 1.3, 500, 6, 6, 20);

  //   // Define your object's material
  //   const material = new THREE.MeshStandardMaterial({
  //     color: 0xfcc742,
  //     emissive: 0x111111,
  //     specular: 0xffffff,
  //     metalness: 1,
  //     roughness: 0.55,
  //   });

  //   // Create the mesh, scale it and add it to the scene
  //   const mesh = new THREE.Mesh(geometry, material);

  //   mesh.scale.x = 0.1;
  //   mesh.scale.y = 0.1;
  //   mesh.scale.z = 0.1;

  //   scene.add(mesh);

  // Create an animate function, which will allow you to render your scene and define any movements
  const animate = function() {
    // mesh.rotation.x += 0.005;
    // mesh.rotation.y += 0.005;
    // mesh.rotation.z += 0.005;

    renderer.render(scene, camera)
    requestAnimationFrame(animate)

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
    }
  }

  // Call the animate function
  animate()
}
