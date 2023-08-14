export const getInnerGlowMaterial = () => {
  return new THREE.ShaderMaterial({
    uniforms: {
      color1: {
        value: new THREE.Color("red")
      },
      color2: {
        value: new THREE.Color("purple")
      },
      bboxMin: {
        value: geometry.boundingBox.min
      },
      bboxMax: {
        value: geometry.boundingBox.max
      }
    },
    vertexShader: `
    uniform vec3 bboxMin;
    uniform vec3 bboxMax;
  
    varying vec2 vUv;

    void main() {
      vUv.y = (position.y - bboxMin.y) / (bboxMax.y - bboxMin.y);
      vUv.x = (position.x - bboxMin.x) / (bboxMax.x - bboxMin.x);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
  `,
    fragmentShader: `
    uniform vec3 color1;
    uniform vec3 color2;
  
    varying vec2 vUv;
    
    void main() {
      
      gl_FragColor = vec4(mix(color1, color2, vUv.x+vUv.y), 1.0);
    }
  `
  });
};
