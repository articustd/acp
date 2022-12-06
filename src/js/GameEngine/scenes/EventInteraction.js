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
        this.queueMax = data.queueMax
        this.activeQueue = new Queue()

        this.setQueue()
    }

    update(t, dt) {
        if(this.passiveSnippets.length > 0) {
            this.passiveCounter++
            let rand = _.random(1, 10000)
            if(this.passiveCounter > this.passiveMin && rand > 9990){
                this.story.push(this.findSnippet())
                this.passiveCounter = 0
            }
        }
    }

    changePassiveSnippets(name) {
        this.passiveSnippets = _.find(this.passives, {name}).snippets
        this.passiveCounter = 0
    }

    findSnippet() {
        let snippetIdx = this.randSnippet()
        this.activeQueue.enqueue(snippetIdx)
        return this.passiveSnippets[snippetIdx]
    }

    randSnippet() {
        let snippetIdx = _.random(0, this.passiveSnippets.length - 1)    
        if (_.find(this.activeQueue.queue, (o)=>{return o === snippetIdx}) !== undefined)
            snippetIdx = this.randSnippet()
        return snippetIdx
    }

    setQueue() {
        if(this.queueMax)
            this.activeQueue.max = this.queueMax
        else
            this.activeQueue.max = _.floor(this.passiveSnippets.length/2, 0)
        
        this.activeQueue.clear()
    }

    toJSON() {
        let interactions = _.map(this.interactions, (interaction) => { return interaction.toJSON() })
        let resources = _.map(this.resources, (resource) => { return resource.toJSON() })
        let story = this.story.toJSON()
        let activeQueue = this.activeQueue.toJSON()
        return {
            eventName: this.eventName,
            interactions,
            resources,
            story,
            passiveSnippets: this.passiveSnippets,
            passiveCounter: this.passiveCounter,
            activeQueue
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
        this.activeQueue.loadData(data.activeQueue)
    }

    getActiveInteractions() { return _.filter(this.interactions, { active: true }) }

    getInteraction(name) { return _.find(this.interactions, { name }) }

    getResource(name) { return _.find(this.resources, { name }) }
}