import * as THREE from 'three'
import { BLOOM_LAYER } from "./config/renderConfig.js";
import { starTypes } from './config/starDistribution.js';

const texture = new THREE.TextureLoader().load('./resources/sprite120.png')
const material = new THREE.SpriteMaterial({map: texture, color: '#ffffff'})

const materials = starTypes.color.map((color) => new THREE.SpriteMaterial({map: texture, color: color}))

export class Star {
    constructor(position) {
        this.position = position
        this.starType = this.generateStarType()
        this.obj = null
    }

    generateStarType() {
        let num = Math.random() * 100.0
        let pct = starTypes.percentage
        for (let i = 0; i <pct.length ; i++) {
            num -= pct[i]
            if (num < 0) {
                return i
            }
        }
        return 0
    }

    toThreeObject(scene) {
        let star = new THREE.Sprite(materials[this.startType])
        star.layers.set(BLOOM_LAYER)

        star.scale.multiplyScalar(starTypes.size[this.startType])
        star.position.copy(this.position)

        this.obj = star
        scene.add(star)
    }
}