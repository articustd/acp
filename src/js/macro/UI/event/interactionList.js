import { getScene } from "@GameEngine/Core"
import { logger } from "@util/Logging"
import _ from "lodash"

Macro.add('interactionList', {
    skipArgs: false,
    handler: function () {
        let event = getScene('EventInteraction')

        _.each(event.interactions, (interaction) => {
            let detectTap = false;
            let $btn = $('<button/>').wiki(interaction.name).on('click', (event) => {
                if (event.type == "click") detectTap = true;
                if (detectTap) {
                    interaction.fire()
                    let $scrollContainer = $('.events-story .body')
                    $scrollContainer.scrollTop($($scrollContainer).prop('scrollHeight'))
                    if (interaction.final) {
                        let $returnBtn = $('<button/>').wiki('Return').click(() => {
                            Engine.play(variables().return)
                        })
                        $(this.output).append($returnBtn)
                    }
                    $btn.blur()
                }
                event.preventDefault()
            })

            $btn.on('touchend touchstart touchmove', function () {
                detectTap = false; // Detects all touch events
            });

            if (!interaction.active)
                $btn.addClass('hide')
            else
                $btn.addClass(interaction.classes)

            interaction.on(`${interaction.name}ActiveChange`, (active) => {
                if (active)
                    $btn.removeClass('hide')
                else
                    $btn.addClass('hide')
            })

            interaction.on(`${interaction.name}CounterChange`, (counter) => {
                calcBackgroundSize(interaction, $btn)
                $btn.prop('disabled', interaction.isDisabled())
                if (interaction.isDisabled())
                    $btn.removeClass(interaction.classes)
                else
                    $btn.addClass(interaction.classes)
            })

            calcBackgroundSize(interaction, $btn)
            $btn.prop('disabled', interaction.isDisabled())
            if (interaction.isDisabled())
                $btn.removeClass(interaction.classes)
            else
                $btn.addClass(interaction.classes)
            $(this.output).append($btn)
        })
    }
})

function calcBackgroundSize({ counter, baseCounter }, $btn) {
    if (counter > 0 && baseCounter > 0) {
        let percent = _.floor((counter / baseCounter) * 100)
        $btn.css({ 'background-size': `${percent}% ${percent}%` })
    } else
        $btn.css({ 'background-size': `0% 0%` })
}