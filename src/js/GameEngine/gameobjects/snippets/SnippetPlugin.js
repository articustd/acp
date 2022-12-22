import { logger } from "@util/Logging"
import { Plugins } from "phaser"
import { BaseSnippet } from "./BaseSnippet"

export class SnippetPlugin extends Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager)

        pluginManager.registerGameObject('snippet', this.snippet)
    }

    snippet(snippetData) { return this.updateList.add(new BaseSnippet(this.scene, snippetData)) }
}