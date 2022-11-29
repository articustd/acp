import { getScene } from "@GameEngine/Core"
import { saveAs } from "file-saver"
import { logger } from "@util/Logging"
import _ from "lodash"

Macro.add('saveStory', {
    skipArgs: false,
    handler: function () {
        let story = getScene('EventInteraction').story

        let $button = $('<button/>').css({'margin-left': '5px'}).wiki('Save Story').click(()=>{
            // navigator.clipboard.writeText(formatStory(story.storySnippets));
            let blob = new Blob([formatStory(story.storySnippets)], {type: "text/plain;charset=utf-8"});
            saveAs(blob,'story.txt')
        })

        $(this.output).append($button)
    }
})

function formatStory(storySnippets) {
    return _.join(storySnippets, '\n')
}