import { getScene } from "@GameEngine/Core"
import { logger } from "@util/Logging"
import _ from "lodash"

Macro.add('storyDesc', {
    skipArgs: false,
    handler: function () {
        let story = getScene('EventInteraction').story
        let $container = $(`<div>`).addClass("events-story body")

        let $toBottomButton = $('<button/>')
            .addClass('events-story button no-border to-bottom')
            .append($(`<i class="fa fa-angle-double-down fa-2x" aria-hidden="true"/>`))
            .click(() => {
                $container.scrollTop($($container).prop('scrollHeight'))
                hideButton($toBottomButton)
            })

        let $toTopButton = $('<button/>')
            .addClass('events-story button no-border to-top')
            .append($(`<i class="fa fa-angle-double-up fa-2x" aria-hidden="true"/>`))
            .click(() => {
                $container.scrollTop(0)
                hideButton($toTopButton)
            })

        let $newAlert = $('<button/>')
            .addClass('events-story button no-border to-left warning')
            .append($(`<i class="fa fa-exclamation fa-lg" aria-hidden="true"/>`))
            .click(() => {
                $container.scrollTop($($container).prop('scrollHeight'))
                hideButton($newAlert)
            })

        story.on('StoryUpdate', ({ idx, snippet }) => {
            $container.append(drawStory(snippet, idx,'new'))
            if (!$toBottomButton.hasClass('show'))
                $container.scrollTop($($container).prop('scrollHeight'))
            else
                showButton($newAlert)
        })

        $container.scroll(() => {
            if ($container.scrollTop() > 200)
                showButton($toTopButton)
            else
                hideButton($toTopButton)

            if ($container.prop('scrollHeight') - $container.scrollTop() > $container.height() + 100)
                showButton($toBottomButton)
            else {
                hideButton($toBottomButton)
                hideButton($newAlert)
            }
        })

        _.each(story.storySnippets, (snippet, idx) => {
            $container.append(drawStory(snippet, idx, 'load'))
        })

        $(this.output)
            .append($toTopButton)
            .append($toBottomButton)
            .append($newAlert)
            .append($container)

        checkRendered($container)
    }
})

function showButton($element) {
    $element.addClass('show')
}

function hideButton($element) {
    $element.removeClass('show')
}

function drawStory(snippet, idx, snippetAni) {
    let $desc = $('<div/>').wiki(snippet)
    if(snippetAni)
        $desc.addClass(snippetAni)
    $desc.on("transitionend MSTransitionEnd webkitTransitionEnd oTransitionEnd", () => { $desc.removeClass('new') })
    if (idx % 2 === 0)
        $desc.addClass('gray')
    return $desc
}

function checkRendered($container) {
    if ($container.prop('scrollHeight') === 0)
        setTimeout(checkRendered, 10, $container)
    else
        $container.scrollTop($container.prop('scrollHeight'))
}