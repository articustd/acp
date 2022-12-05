import * as events from '@js/data/events'
import { logger } from '@util/Logging'

export function exportStory(event) {
    let header = getEventHeader(event)
    let body = formatStory(event.story)
    return (header + body)
}

function formatStory(story) {
    return _.join(story.storySnippets, '\n---\n')
}

function getEventHeader(event) {
    let currDate = new Date()
    return `${event.eventName}\n${currDate.toString()}\n\n`
}

function getEvent(eventName) {
    return _.find(events, { eventName })
}