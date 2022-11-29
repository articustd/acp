import { getScene } from "@GameEngine/Core"
import { logger } from "@util/Logging"

export function showHUD() {
    let $container = $('<div/>').attr('id', 'hud')
    let $menuButton = $('<div/>').wiki(`Menu`).addClass('menuButton').addClass('button')

    let $saveButton = createMenuItem(`Saves`)
    let $restartButton = createMenuItem(`Restart`)

    let $tickerEditorButton = createMenuItem(`Ticker Editor`)
    let $eventTestButton = createMenuItem(`Event Test`)
    let $drawflowButton = createMenuItem(`Drawflow`)

    let $menuList = $('<ul/>').addClass('menu-list')
        .append($saveButton)
        .append($restartButton)
    let $menuVersion = $('<div/>').addClass('menu-version').wiki(variables().version)

    if (variables().dev)
        $menuList.append($tickerEditorButton)
            // .append($eventTestButton)
            .append($drawflowButton)

    $menuButton.click(() => {
        Dialog.setup('Menu')

        $saveButton.click(() => { Dialog.close(); UI.saves(); })
        $restartButton.click(() => { Dialog.close(); UI.restart(); })

        if (variables().dev)
            devButtons()

        Dialog.append($menuList)
            .append($menuVersion)

        Dialog.open()
    })

    let devButtons = function () {
        $tickerEditorButton.click(() => { Dialog.close(); Engine.play("devRate") })
        $eventTestButton.click(() => { Dialog.close(); Engine.play("eventScenario") })
        $drawflowButton.click(() => { Dialog.close(); Engine.play("drawflow") })
    }
    
    $container.append($('<div/>').wiki(`''Kobold''<div><<koboldAvailableCounter>>/<<koboldPopCounter>></div>`).addClass('hudItem'))
    $container.append($menuButton)

    $('#passages').before($container)
}

function createMenuItem(text) {
    return $('<li/>').append($('<div/>').addClass('button').wiki(text))
}