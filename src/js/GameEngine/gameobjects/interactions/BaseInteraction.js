import { GameObjects } from "phaser";
import { logger } from "@util/Logging";
import _ from "lodash";
import { getScene } from "@GameEngine/Core";

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
        this.scene.story.push(_.sample(this.snippetsActive))
        this.scene.story.activateInteractions(this.leadsTo)
    }

    progressOthers() {
        _.each(this.progressInteractions, (name) => {
            _.find(this.scene.interactions, { name }).progress()
        })
    }

    progress(amt = 1) {
        this.counter += amt
    }

    setResourceUse() {
        this.resourceUse = this.scene.getResource(this.resourceUse)

        this.resourceUse.on(`${this.resourceUse.name}TotalChange`, (total)=>{ this.setSnippetActive() })
    }

    setSnippetActive() {
        if (this.resourceUse) {
            let comp = [0, this.resourceUse.total]
            _.each(this.snippets, (snippet, key) => {
                let remainder = this.resourceUse.total - key
                if (remainder >= 0 && remainder < comp[1])
                    comp = [key, remainder]
                return remainder // Remainder is 0, kick out early
            })
            this.snippetsActive = this.snippets[comp[0]]
            return
        }
        this.snippetsActive = this.snippets
    }

    get active() { return this._active }
    set active(active) { this._active = active; this.counter = 0; this.emit(`${this.name}ActiveChange`, active); }

    get cooldown() { return this._cooldown }
    set cooldown(cooldown) { this._cooldown = cooldown; this.emit(`${this.name}CooldownChange`, { cooldown: this.cooldown, baseCooldown: this.baseCooldown }); }

    get counter() { return this._counter }
    set counter(counter) { this._counter = counter; this.emit(`${this.name}CounterChange`, counter); }

    toJSON() {
        return { 
            name: this.name,
            _active: this._active,
            _cooldown: this.cooldown, 
            snippetsActive: this.snippetsActive,
            _counter: this.counter,
        }
    }

    loadData(data) {
        if (data) {
            this._active = data._active
            this._cooldown = data._cooldown
            this.snippetsActive = data.snippetsActive
            this._counter = data._counter
        }
    }
}