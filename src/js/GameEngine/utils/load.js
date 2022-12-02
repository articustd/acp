import { addScene, game, getScene, removeScene } from "@GameEngine/Core";
import { logger } from "@util/Logging";
import _ from "lodash";
import * as events from '@js/data/events'

export function loadGameData(GameData) {
    if (!getScene('MainLoop'))
        addScene('MainLoop', true, {})
    getScene('MainLoop').loadData(GameData.MainLoop)

    if (!getScene('EventInteraction'))
        addScene('EventInteraction', true, _.find(events, { eventName: GameData.EventInteraction.eventName }))
    getScene('EventInteraction').loadData(GameData.EventInteraction)
}