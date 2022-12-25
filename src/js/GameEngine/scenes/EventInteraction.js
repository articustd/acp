import { getScene } from "@GameEngine/Core";
import { logger } from "@util/Logging";
import { Queue } from "@util/Queue";
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

        this.passiveSnippets = null
        this.passiveGlobalSnippets = null
        this.passiveMin = 600 // Have this configurable in the story for when things get really spicy?
        this.passiveCounter = 0
        this.passiveGlobalCounter = 0
    }

    create(data) {
        this.eventName = data.eventName
        this.resources = _.map(data.resources, (resource) => {
            return this.add.resource(resource)
        })
        this.passives = _.map(data.passives, (passive) => {
            return this.add.interaction(passive)
        })
        this.interactions = _.map(data.interactions, (interaction) => {
            return this.add.interaction(interaction)
        })

        this.story = this.add.story(data.startingDesc)

        this.activePassiveQueue = new Queue()
        this.activePassiveGlobalQueue = new Queue()
    }

    update(t, dt) {
        if (this.passiveSnippets) {
            this.passiveCounter++
            let rand = _.random(1, 10000)
            if (this.passiveCounter > this.passiveMin && rand > 9990) {
                this.passiveSnippets.fire()
                this.passiveCounter = 0
            }
        }
        if (this.passiveGlobalSnippets) {
            this.passiveGlobalCounter++
            let rand = _.random(1, 10000)
            if (this.passiveGlobalCounter > this.passiveMin * 2 && rand > 9990) {
                this.passiveGlobalSnippets.fire()
                this.passiveGlobalCounter = 0
            }
        }
    }

    changePassiveSnippets(name) {
        this.passiveSnippets = _.find(this.passives, { name })
        this.passiveCounter = 0
    }

    changePassiveGlobalSnippets(name) {
        this.passiveGlobalSnippets = _.find(this.passives, { name })
        this.passiveGlobalCounter = 0
    }

    toJSON() {
        let interactions = _.map(this.interactions, (interaction) => { return interaction.toJSON() })
        let resources = _.map(this.resources, (resource) => { return resource.toJSON() })
        let passives = _.map(this.passives, (passive) => { return passive.toJSON() })
        let story = this.story.toJSON()
        return {
            eventName: this.eventName,
            interactions,
            resources,
            passives,
            story,
            passiveSnippets: this.passiveSnippets ? this.passiveSnippets.name : 'Back',
            passiveGlobalSnippets: this.passiveGlobalSnippets ? this.passiveGlobalSnippets.name : 'Back',
            passiveCounter: this.passiveCounter,
            passiveGlobalCounter: this.passiveGlobalCounter
        }
    }

    loadData(data) {
        logger(data)
        this.eventName = data.eventName
        this.passiveCounter = data.passiveCounter
        this.passiveGlobalCounter = data.passiveGlobalCounter
        _.each(data.resources, (resource) => {
            _.find(this.resources, { name: resource.name }).loadData(resource)
        })
        _.each(data.interactions, (interaction) => {
            _.find(this.interactions, { name: interaction.name }).loadData(interaction)
        })
        _.each(data.passives, (passive) => {
            _.find(this.passives, { name: passive.name }).loadData(passive)
        })

        this.changePassiveSnippets(data.passiveSnippets)
        this.changePassiveGlobalSnippets(data.passiveGlobalSnippets)

        this.story.loadData(data.story)
    }

    getActiveInteractions() { return _.filter(this.interactions, { active: true }) }

    getInteraction(name) { return _.find(this.interactions, { name }) }

    getResource(name) { return _.find(this.resources, { name }) }
}