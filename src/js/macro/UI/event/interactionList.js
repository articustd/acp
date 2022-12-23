import { getScene } from "@GameEngine/Core"
import { logger } from "@util/Logging"
import _ from "lodash"

Macro.add('interactionList', {
    skipArgs: false,
    handler: function () {
        let event = getScene('EventInteraction')

        _.each(event.interactions, (interaction) => {
            let detectTap = false;
            let $btn = $('<button/>').wiki(interaction.name).addClass(interaction.classes).on('click', (event) => {
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

            if (interaction.active)
                showButton($btn)

            interaction.on(`${interaction.name}ActiveChange`, (active) => {
                if (active) {
                    showButton($btn)
                    calcBackgroundSize(interaction, $btn)
                }
                else
                    hideButton($btn)
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

function showButton($ele) {
    $ele.attr('open', true)
}

function hideButton($ele) {
    $ele.removeAttr('open')
    $ele.attr('closing')

    $ele.one('animationend', () => {
        $ele.removeAttr('closing')
    })
}

function calcBackgroundSize({ counter, baseCounter }, $btn) {
    if (counter > 0 && baseCounter > 0) {
        let percent = _.floor((counter / baseCounter) * 100)
        $btn.css({ 'background-size': `${percent}% ${percent}%` })
    } else
        $btn.css({ 'background-size': `0% 0%` })
}