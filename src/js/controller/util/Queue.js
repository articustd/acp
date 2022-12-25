export class Queue {
    constructor(max = -1) {
        this.max = max
        this.queue = []
    }

    setMax(max) { this.max = max }

    first() { return this.queue[0] }
    last() { return this.queue.lastItem }

    enqueue(node) {
        this.queue.push(node)
        if ((this.max > 0 && this.queue.length > this.max) || this.max === 0)
            this.dequeue()
    }

    dequeue() {
        return this.queue.shift()
    }

    clear() {
        this.queue = []
    }

    loadData(data) {
        this.clear()
        this.max = data.max
        this.queue = data.queue
    }

    toJSON() {
        return {max: this.max, queue:this.queue}
    }
}