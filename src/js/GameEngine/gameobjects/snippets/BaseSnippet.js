import { GameObjects } from "phaser";


export class BaseSnippet extends GameObjects.GameObject {
    active
    snippet

    constructor(scene, snippetData) {
        super(scene, 'Snippet')

    }

    preUpdate() {}

    toJSON() {

    }

    loadData() {

    }
}