import { getScene } from "@GameEngine/Core"

Macro.add('gameStart', {
    skipArgs: false,
    handler: function () {
        variables().started = true
    }
})