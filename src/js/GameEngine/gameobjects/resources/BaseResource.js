import { logger } from "@util/Logging";
import _ from "lodash";
import { GameObjects } from "phaser";

export class BaseResource extends GameObjects.GameObject {
    _total
    maxAmount

    constructor(scene, data) {
        super(scene, 'Resource')

        this.name = data.name
        this._total = 0
        this.maxAmount = data.maxAmount
    }

    preUpdate() { // NECESSARYEVIL I'm only here so phaser doesn't throw a fit, please don't delete me
    }

    get total() { return this._total }
    set total(total) { this._total = total; this.emit(`${this.name}TotalChange`, total); }

    spend(amt) {
        if (this.total < amt)
            return

        this.total -= amt
    }

    get(amt) {
        if (!this.enoughSpace(amt))
            return false

        this.total += amt
        return true
    }

    enoughAvailable(amt) {
        return this.total >= amt
    }

    enoughSpace(amt) {
        return (!_.isNull(this.maxAmount) && (this.maxAmount - this.total) >= amt) || _.isNull(this.maxAmount)
    }

    toJSON() {
        return {
            name: this.name,
            active: this.active,
            total: this._total,
            maxAmount: this.maxAmount
        }
    }

    loadData(data) {
        if (data) {
            this.active = data.active
            this._total = data.total
            this.maxAmount = data.maxAmount
        }
    }
}