/* eslint-disable max-classes-per-file */
class BinaryTreeNode {
  constructor(data, leftNode, rightNode) {
    this.data = data;
    this.left = leftNode;
    this.right = rightNode;
  }
}

export default class BinarySearchTree {
  static buildTree(arr) {
    if (!arr.length) return null;
    const middle = Math.floor(arr.length / 2);
    return new BinaryTreeNode(
      arr[middle],
      BinarySearchTree.buildTree(arr.slice(0, middle)),
      BinarySearchTree.buildTree(arr.slice(middle + 1)),
    );
  }

  constructor(arr) {
    const allUniqueValues = [];
    /* eslint-disable no-restricted-syntax */
    for (const item of arr) {
      if (!allUniqueValues.includes(item)) allUniqueValues.push(item);
    }
    /* eslint-enable no-restricted-syntax */
    const sorted = allUniqueValues.sort((a, b) => a > b);
    this.root = BinarySearchTree.buildTree(sorted);
  }
}
