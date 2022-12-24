import { getScene } from "@GameEngine/Core"
import { exportStory } from "@GameEngine/utils/storyExport"
import { logger } from "@util/Logging"

export function showHUD() {
    let event = getScene('EventInteraction')
    let mainLoop = getScene('MainLoop')
    let $container = $('<div/>').attr('id', 'hud')

    $container.append($('<div/>').wiki(`''?EventName''~~?EventVersion~~`).addClass('hud-item'))

    let $menuButton = $('<div/>').append('<i class="fa fa-bars" aria-hidden="true"/>').addClass('button menu-button right').attr('title', 'Cheat Menu')
    let $saveMenuButton = $('<div/>').append('<i class="fa fa-floppy-o" aria-hidden="true"/>').addClass('button menu-button no-radius').attr('title', 'Save/Load Game')
    let $restartMenuButton = $('<div/>').append('<i class="fa fa-power-off" aria-hidden="true"/>').addClass('button menu-button right').attr('title', 'Restart Game')
    let $saveStoryMenuButton = $('<div/>').append('<i class="fa fa-book" aria-hidden="true"/>').addClass('button menu-button no-radius').attr('title', 'Export Story')

    $saveMenuButton.click(() => { Dialog.close(); UI.saves(); })
    $restartMenuButton.click(() => { Dialog.close(); UI.restart(); })
    $saveStoryMenuButton.click(() => {
        let blob = new Blob([exportStory(event)], { type: "text/plain;charset=utf-8" });
        saveAs(blob, `${event.eventName}.txt`)
    })

    let $tickerEditorButton = createMenuItem(`Ticker Editor`)
    let $drawflowButton = createMenuItem(`Drawflow`)

    let $resourceBarCheatCheckBox = $('<input/>', { type: 'checkbox', id: 'resourceBarCheat', value: mainLoop.cheats.resourceShow })
    let $resourceBarCheat = $('<li/>').append($('<div/>')
        .append($resourceBarCheatCheckBox)
        .append($('<label/>', { for: 'resourceBarCheat', text: 'Show Resource Bar' })))

    let $menuList = $('<ul/>').addClass('menu-list')
    let $menuVersion = $('<div/>').addClass('menu-version').wiki(variables().version)

    $menuList
        .append($resourceBarCheat)
    // .append($tickerEditorButton)
    // .append($drawflowButton)

    $menuButton.click(() => {
        Dialog.setup('Cheats')

        if (variables().dev)
            devButtons()

        Dialog.append($menuList)
            .append($menuVersion)
        
        $resourceBarCheatCheckBox.prop('checked', mainLoop.cheats.resourceShow)
        
        Dialog.open()
    })

    let devButtons = function () {
        $tickerEditorButton.click(() => { Dialog.close(); Engine.play("devRate") })
        $drawflowButton.click(() => { Dialog.close(); Engine.play("drawflow") })
        $resourceBarCheatCheckBox.change((el) => { mainLoop.cheats = { ...mainLoop.cheats, resourceShow: el.target.checked } })
    }

    $container
        .append($saveStoryMenuButton)
        .append($saveMenuButton)
        .append($restartMenuButton)

    if (variables().dev)
        $container.append($menuButton)

    $('#passages').before($container)
}

function createMenuItem(text) {
    return $('<li/>').append($('<div/>').addClass('button').wiki(text))
}