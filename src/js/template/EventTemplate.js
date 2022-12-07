import { getScene } from "@GameEngine/Core";

Template.add('EventName', function() {
    return getScene('EventInteraction').eventName
})

Template.add('EventVersion', function() {
    return variables().version
})