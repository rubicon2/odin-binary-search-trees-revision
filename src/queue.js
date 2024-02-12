export default class Queue {
  #queuedItems = [];

  enqueue(item) {
    this.#queuedItems.push(item);
  }

  dequeue() {
    return this.#queuedItems.shift() || null;
  }

  get length() {
    return this.#queuedItems.length;
  }
}
