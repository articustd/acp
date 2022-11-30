import { Plugins } from "phaser"
import { BaseResource } from "./BaseResource"

export class ResourcePlugin extends Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager)

        pluginManager.registerGameObject('resource', this.resource)
    }
    resource(data) {return this.updateList.add(new BaseResource(this.scene, data))}
}