import { getScene } from "@GameEngine/Core";
import { logger } from "@util/Logging";
import _ from "lodash";
import { Scene } from "phaser";

export class EventInteraction extends Scene {
    interactions
    story
    passives
    passiveSnippets
    passiveMin
    passiveCounter
    resources

    constructor() {
        super("EventInteraction")

        this.passiveSnippets = []
        this.passiveMin = 600 // Have this configurable in the story for when things get really spicy?
        this.passiveCounter = 0
    }

    create(data) {
        this.eventName = data.eventName
        this.passives = data.passives
        
        this.resources = _.map(data.resources, (resource) => {
            return this.add.resource(resource)
        })
        this.interactions = _.map(data.interactions, (interaction) => {
            return this.add.interaction(interaction)
        })
        
        this.story = this.add.story(data.startingDesc)
    }

    update(t, dt) {
        if(this.passiveSnippets.length > 0) {
            this.passiveCounter++
            let rand = _.random(1, 10000)
            if(this.passiveCounter > this.passiveMin && rand > 9990){
                this.story.push(this.getRandomSnippet())
                this.passiveCounter = 0
            }
        }
    }

    changePassiveSnippets(name) {
        this.passiveSnippets = _.find(this.passives, {name}).snippets
        this.passiveCounter = 0
    }

    getRandomSnippet() {
        let snippet = _.sample(this.passiveSnippets)
        if(snippet === _.last(this.story.storySnippets))
            snippet = this.getRandomSnippet()
        return snippet
    }

    toJSON() {
        let interactions = _.map(this.interactions, (interaction) => { return interaction.toJSON() })
        let resources = _.map(this.resources, (resource) => { return resource.toJSON() })
        let story = this.story.toJSON()
        return {
            eventName: this.eventName,
            interactions,
            resources,
            story,
            passiveSnippets: this.passiveSnippets,
            passiveCounter: this.passiveCounter
        }
    }

    loadData(data) {
        this.eventName = data.eventName
        this.passiveSnippets = data.passiveSnippets
        this.passiveCounter = data.passiveCounter
        _.each(data.resources, (resource) => { 
            _.find(this.resources, { name: resource.name }).loadData(resource)
        })
        _.each(data.interactions, (interaction) => { 
            _.find(this.interactions, { name: interaction.name }).loadData(interaction)
        })
        this.story.loadData(data.story)
    }

    getActiveInteractions() { return _.filter(this.interactions, { active: true }) }

    getInteraction(name) { return _.find(this.interactions, { name }) }

    getResource(name) { return _.find(this.resources, { name }) }
}