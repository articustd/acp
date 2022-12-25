import { getScene } from "@GameEngine/Core";

Template.add('EventName', function() {
    return getScene('EventInteraction').eventName
})

Template.add('EventVersion', function() {
    return variables().version
})

Template.add('SubLevel', function() {
    return variables().subLevel
})