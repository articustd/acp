import { getScene } from "@GameEngine/Core"
import { logger } from "@util/Logging"
import _ from "lodash"

Macro.add('storyDesc', {
    skipArgs: false,
    handler: function () {
        let story = getScene('EventInteraction').story

        story.on('StoryUpdate', ({ idx, snippet }) => {
            $(this.output).append(drawStory(snippet, idx))
            $(this.output).scrollTop($(this.output).prop('scrollHeight'))
        })

        _.each(story.storySnippets, (snippet, idx) => {
            $(this.output).append(drawStory(snippet, idx,))
        })
    }
})

function drawStory(snippet, idx) {
    let $desc = $('<div/>').wiki(snippet)
    if (idx % 2 === 0)
        $desc.addClass('gray')
    return $desc
}