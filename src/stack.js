export default class Stack {
  #stackedItems = [];

  push(item) {
    this.#stackedItems.push(item);
  }

  pop() {
    return this.#stackedItems.pop() || null;
  }

  // RE: naming this - torn between consistency with array and queue but stack length just sounds odd
  get size() {
    return this.#stackedItems.length;
  }
}
