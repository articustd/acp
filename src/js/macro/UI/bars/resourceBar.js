import { getScene } from "@GameEngine/Core"
import { logger } from "@util/Logging"
import _ from "lodash"

Macro.add('resourceBar', {
    skipArgs: false,
    handler: function () {
        let resourceName = 'Attraction'
        let resource = getScene('EventInteraction').getResource(resourceName)
        let $container = $('<div/>').addClass('bar-container')
        let $barContainer = $('<div/>').addClass('resource-bar')
        let $barText = $('<span/>').addClass('tick-bar-text-diff')
        let $bar = $('<div/>').addClass('tick-bar-simple').css({ 'width': getWidth(resource.total, resource.maxAmount)})
        
        resource.on(`${resourceName}TotalChange`, function (total) { 
            logger({total})
            $bar.css({ 'width': getWidth(total, resource.maxAmount) }) 
        })
        
        $barText.wiki(resourceName)

        $container
            .append($barContainer)
            .append($barText)
            .append($bar)
            .appendTo(this.output)
    }
})

function getWidth(curr, max) {
    return (curr > 0) ? _.round((curr / max) * 100, 2)+'%' : '0%'
}