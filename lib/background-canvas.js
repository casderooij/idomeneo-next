import { InstancedBufferAttribute, InstancedMesh, Object3D, OrthographicCamera, PlaneBufferGeometry, Scene, ShaderMaterial, TextureLoader, WebGLRenderer } from "three";
import SourceCanvas from "./source-canvas";
import { debounce } from './utils';

const map = '/images/background/map_1.png';

export default class BackgroundCanvas {
  constructor() {
    
    this.tick = 0;
    
    this.setup();
    this.resize();
    this.addMesh();

    this.render = this.render.bind(this);
    this.render();
  }

  setup() {
    this.canvas = document.querySelector('#background-canvas');
    this.renderer = new WebGLRenderer({ canvas: this.canvas });

    this.renderer.setClearColor('#000000', 1);

    const aspect = 1;
    const zoom = 0.5;
    this.camera = new OrthographicCamera(
      -zoom * aspect,
      zoom * aspect,
      zoom,
      -zoom,
      1,
      2
    );
    this.camera.position.z = 1;
    this.camera.lookAt(0, 0, 0);

    this.scene = new Scene();

    window.addEventListener('resize', debounce(() => {
      this.resize();
    }, 400));
  }

  resize() {
    if (this.windowWidth != window.innerWidth) {
      // Resize renderer
      if (window.innerWidth < window.innerHeight) {
        if (window.innerWidth <= 600) {
          this.rendererSize = window.innerWidth * 1.8;
        }
      } else {
        this.rendererSize = window.innerHeight;
      }

      // Set pixel size and reset mesh with new pixelsize
      if (window.innerWidth <= 600 || window.innerHeight <= 600) {
        this.pixelGrid = 50;
        this.cellSize = 1 / this.pixelGrid;
        this.sourceCanvas = new SourceCanvas(this.pixelGrid);
        this.resetMesh();
      } else {
        this.pixelGrid = 40;
        this.cellSize = 1 / this.pixelGrid;
        this.sourceCanvas = new SourceCanvas(this.pixelGrid);
        this.resetMesh();
      }
      this.renderer.setSize(this.rendererSize, this.rendererSize);
    }

    this.windowWidth = window.innerWidth;
  }

  addMesh() {
    this.planeGeo = new PlaneBufferGeometry(this.cellSize, this.cellSize);
    this.planeMat = new ShaderMaterial({
      extensions: {
        derivatives: '#extension GL_OES_standard_derivatives : enable',
      },
      vertexShader: `
        attribute float aInstanceScale;
        attribute float aScaleAlpha;

        varying vec2 vUv;
        varying float vScale;
        varying float vScaleAlpha;

        void main() {
          vUv = uv;
          vScale = aInstanceScale;
          vScaleAlpha = aScaleAlpha;
          gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying float vScale;
        varying float vScaleAlpha;
        
        uniform sampler2D t;

        void main() {
          float size = 32.;
          vec2 newUV = vUv;
          newUV.x = vUv.x / size + floor((vScale - vScaleAlpha) * size) / size;
          gl_FragColor = texture2D(t, newUV) - vec4(0.0, 0.5, 0.5, 0.0);
        }
      `,
      uniforms: {
        t: {
          type: 't',
          value: new TextureLoader().load(map),
        },
      },
    });
    this.plane = new InstancedMesh(this.planeGeo, this.planeMat, this.pixelGrid ** 2);

    const dummy = new Object3D();
    let count = 0;
    const scales = new Float32Array(this.pixelGrid ** 2).fill(0);
    const alphaScales = new Float32Array(this.pixelGrid ** 2);
    for (let y = 0; y < this.pixelGrid; y++) {
      for (let x = 0; x < this.pixelGrid; x++) {
        const offset = (this.cellSize * this.pixelGrid / 2) - (this.cellSize / 2);

        const xa = Math.ceil(((x / this.pixelGrid - 0.5) * 2) * 100) / 100;
        const ya = Math.ceil(((y / this.pixelGrid - 0.5) * 2) * 100) / 100;
        const b = Math.ceil(((xa ** 10) + (ya ** 20)) * 100) / 100;
        alphaScales.set([b], count);

        dummy.position.set(x * this.cellSize - offset, -y * this.cellSize + offset);
        dummy.updateMatrix();
        this.plane.setMatrixAt(count++, dummy.matrix);
      }
    }

    this.plane.geometry.setAttribute('aInstanceScale', new InstancedBufferAttribute(scales, 1));
    this.plane.geometry.setAttribute('aScaleAlpha', new InstancedBufferAttribute(alphaScales, 1));
    this.plane.instanceMatrix.needsUpdate = true;

    this.scene.add(this.plane);
  }

  removeMesh() {
    this.plane.geometry.dispose();
    this.plane.material.dispose();
    this.scene.remove(this.plane);
  }

  resetMesh() {
    if (this.plane) {
      this.removeMesh();

      this.addMesh();
    }
  }

  render() {
    requestAnimationFrame(this.render);

    this.tick++;

    this.sourceCanvas.update(this.tick);

    const scales = new Float32Array(this.pixelGrid ** 2);
    const imageData = this.sourceCanvas.ctx.getImageData(0, 0, this.pixelGrid, this.pixelGrid);

    for (let i = 0; i < imageData.data.length; i += 4) {
      scales.set([imageData.data[i] / 255], i / 4);
    }
    this.plane.geometry.attributes.aInstanceScale.array = scales;
    this.plane.geometry.attributes.aInstanceScale.needsUpdate = true;

    this.renderer.render(this.scene, this.camera);
  }
}