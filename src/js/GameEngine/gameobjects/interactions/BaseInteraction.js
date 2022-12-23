import { GameObjects } from "phaser";
import { logger } from "@util/Logging";
import _ from "lodash";
import { getScene } from "@GameEngine/Core";
import { Queue } from "@util/Queue";

export class BaseInteraction extends GameObjects.GameObject {
    _cooldown
    baseCooldown
    interval
    leadsTo
    clear
    snippetsActive
    snippets
    _counter
    baseCounter
    progressInteractions
    passive
    final
    classes

    constructor(scene, interactionData) {
        super(scene, 'Interaction')

        this.clear = false
        this.final = false
        this.burnResource = false
        this.burnAmount = 0
        this._counter = 0
        this.baseCounter = 0
        this.progressInteractions = []
        this.activeQueue = new Queue()

        _.each(interactionData, (value, key) => {
            this[key] = value
        })

        this.setSnippetActive()
        this._cooldown = this.baseCooldown + 1
        this.interval = (this.snippetsActive.length > 1) ? _.floor(this.baseCooldown / this.snippetsActive.length) : this.baseCooldown

        if (interactionData.resourceUse)
            this.setResourceUse()
        if (interactionData.resourceProvide)
            this.resoureProvide = this.scene.getResource(this.resourceProvide)
    }

    preUpdate(t, dt) {
        if (this.cooldown % this.interval === 0)
            this.pushSnippet()
        if (this.cooldown <= this.baseCooldown)
            this.cooldown += 1
    }

    fire() {
        if (this.clear)
            this.scene.story.clearActiveInteractions()
        if (this.singleClear)
            this.active = false
        if (this.passive)
            this.scene.changePassiveSnippets(this.passive)
        if (this.resoureProvide)
            this.resoureProvide.get(this.provideAmount)
        if (this.burnResource)
            this.resourceUse.spend(this.burnAmount)
        this.pushSnippet()
        this.progressOthers()
    }

    isDisabled() {
        return this.counter < this.baseCounter
    }

    pushSnippet() {
        if (this.snippetsActive.length > 0)
            this.scene.story.push(this.findSnippet())
        this.scene.story.activateInteractions(this.leadsTo)
    }

    progressOthers() {
        _.each(this.progressInteractions, (name) => {
            _.find(this.scene.interactions, { name }).progress()
        })
    }

    progress(amt = 1) {
        if (this.resourceUse)
            this.counter = amt
        else
            this.counter += amt
    }

    setResourceUse() {
        this.resourceUse = this.scene.getResource(this.resourceUse)
        if (this.baseCounter > 0)
            this.counter = this.resourceUse.total
        this.resourceUse.on(`${this.resourceUse.name}TotalChange`, (total) => { this.setSnippetActive(); this.progress(total); })
    }

    setSnippetActive() {
        if (!this.snippets) {
            this.snippetsActive = []
            return
        }

        if (this.resourceUse) {
            if (_.isArray(this.snippets)) {
                this.snippetsActive = this.snippets
                this.setQueue()
                return
            }
            if (this.poolSnippets) {
                let pooled = []
                _.each(this.snippets, (snippet, key) => {
                    let remainder = this.resourceUse.total - key
                    if (remainder >= 0)
                        pooled.push(...snippet)
                })
                this.snippetsActive = pooled
                this.setQueue(false)
                return
            }
            let comp = [0, this.resourceUse.total]
            _.each(this.snippets, (snippet, key) => {
                let remainder = this.resourceUse.total - key
                if (remainder >= 0 && remainder < comp[1])
                    comp = [key, remainder]
                return remainder // Remainder is 0, kick out early
            })
            this.snippetsActive = this.snippets[comp[0]]
            this.setQueue()
            return
        }
        this.snippetsActive = this.snippets
        this.setQueue()
    }

    setQueue(empty = true) {
        if (this.queueMax)
            this.activeQueue.max = this.queueMax
        else
            this.activeQueue.max = _.floor(this.snippetsActive.length / 2, 0)

        if (empty)
            this.activeQueue.clear()
    }

    findSnippet() {
        let snippetIdx = this.randSnippet()
        this.activeQueue.enqueue(snippetIdx)
        return this.snippetsActive[snippetIdx]
    }

    randSnippet() {
        let snippetIdx = _.random(0, this.snippetsActive.length - 1)
        if (_.find(this.activeQueue.queue, (o) => { return o === snippetIdx }) !== undefined)
            snippetIdx = this.randSnippet()
        return snippetIdx
    }

    get active() { return this._active }
    set active(active) { this._active = active; this.emit(`${this.name}ActiveChange`, active); }

    get cooldown() { return this._cooldown }
    set cooldown(cooldown) { this._cooldown = cooldown; this.emit(`${this.name}CooldownChange`, { cooldown: this.cooldown, baseCooldown: this.baseCooldown }); }

    get counter() { return this._counter }
    set counter(counter) { this._counter = counter; this.emit(`${this.name}CounterChange`, counter); }

    toJSON() {
        let activeQueue = this.activeQueue.toJSON()
        return {
            name: this.name,
            _active: this._active,
            _cooldown: this.cooldown,
            snippetsActive: this.snippetsActive,
            _counter: this.counter,
            activeQueue
        }
    }

    loadData(data) {
        if (data) {
            this._active = data._active
            this._cooldown = data._cooldown
            this.snippetsActive = data.snippetsActive
            this._counter = data._counter
            this.activeQueue.loadData(data.activeQueue)
        }
    }
}