import { getScene } from "@GameEngine/Core"
import { logger } from "@util/Logging"

export function showHUD() {
    let story = getScene('EventInteraction').story
    let $container = $('<div/>').attr('id', 'hud')

    $container.append($('<div/>').wiki(`''?EventName''~~?EventVersion~~`).addClass('hud-item'))

    let $menuButton = $('<div/>').append('<i class="fa fa-bars" aria-hidden="true"/>').addClass('button menu-button').attr('title', 'Dev Menu')
    let $saveMenuButton = $('<div/>').append('<i class="fa fa-floppy-o" aria-hidden="true"/>').addClass('button menu-button').attr('title', 'Save/Load Game')
    let $restartMenuButton = $('<div/>').append('<i class="fa fa-power-off" aria-hidden="true"/>').addClass('button menu-button').attr('title', 'Restart Game')
    let $saveStoryMenuButton = $('<div/>').append('<i class="fa fa-book" aria-hidden="true"/>').addClass('button menu-button').attr('title', 'Export Story')

    $saveMenuButton.click(() => { Dialog.close(); UI.saves(); })
    $restartMenuButton.click(() => { Dialog.close(); UI.restart(); })
    $saveStoryMenuButton.click(() => {
        let blob = new Blob([formatStory(story.storySnippets)], { type: "text/plain;charset=utf-8" });
        saveAs(blob, 'story.txt')
    })

    let $tickerEditorButton = createMenuItem(`Ticker Editor`)
    let $drawflowButton = createMenuItem(`Drawflow`)

    let $menuList = $('<ul/>').addClass('menu-list')
    let $menuVersion = $('<div/>').addClass('menu-version').wiki(variables().version)

    $menuList
        .append($tickerEditorButton)
        .append($drawflowButton)

    $menuButton.click(() => {
        Dialog.setup('Menu')

        if (variables().dev)
            devButtons()

        Dialog.append($menuList)
            .append($menuVersion)

        Dialog.open()
    })

    let devButtons = function () {
        $tickerEditorButton.click(() => { Dialog.close(); Engine.play("devRate") })
        $drawflowButton.click(() => { Dialog.close(); Engine.play("drawflow") })
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

function formatStory(storySnippets) {
    return _.join(storySnippets, '\n')
}