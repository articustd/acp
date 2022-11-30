import { getScene } from "@GameEngine/Core";

Template.add('EventName', function() {
    return getScene('EventInteraction').name
})