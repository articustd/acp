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
            })

        let $toTopButton = $('<button/>')
            .addClass('events-story button no-border to-top')
            .append($(`<i class="fa fa-angle-double-up fa-2x" aria-hidden="true"/>`))
            .click(() => {
                $container.scrollTop(0)
            })

        story.on('StoryUpdate', ({ idx, snippet }) => {
            $container.append(drawStory(snippet, idx))
            if (!$toBottomButton.hasClass('show'))
                $container.scrollTop($($container).prop('scrollHeight'))
        })

        $container.scroll(() => {
            if ($container.scrollTop() > 200)
                showButton($toTopButton)
            else
                hideButton($toTopButton)

            if ($container.prop('scrollHeight') - $container.scrollTop() > 800)
                showButton($toBottomButton)
            else
                hideButton($toBottomButton)
        })

        _.each(story.storySnippets, (snippet, idx) => {
            $container.append(drawStory(snippet, idx,))
        })

        logger(`ScrollHeight ${$($container).prop('scrollHeight')}`)
        $container.scrollTop($($container).prop('scrollHeight'))

        $(this.output)
            .append($toTopButton)
            .append($toBottomButton)
            .append($container)

    }
})

function showButton($element) {
    $element.addClass('show')
}

function hideButton($element) {
    $element.removeClass('show')
}

function drawStory(snippet, idx) {
    let $desc = $('<div/>').wiki(snippet)
    if (idx % 2 === 0)
        $desc.addClass('gray')
    return $desc
}