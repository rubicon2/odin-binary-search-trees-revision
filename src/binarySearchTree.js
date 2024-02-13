/* eslint-disable  */
import Queue from './queue';
import Stack from './stack';

class BinaryTreeNode {
  constructor(data, leftNode = null, rightNode = null) {
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

  static prettyPrint(node, prefix = '', isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      BinarySearchTree.prettyPrint(
        node.right,
        `${prefix}${isLeft ? '│   ' : '    '}`,
        false,
      );
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      BinarySearchTree.prettyPrint(
        node.left,
        `${prefix}${isLeft ? '    ' : '│   '}`,
        true,
      );
    }
  }

  static getSmallestValueNode(startNode) {
    let currentNode = startNode;
    while (currentNode.left) {
      currentNode = currentNode.left;
    }
    return currentNode;
  }

  static getLargestValueNode(startNode) {
    let currentNode = startNode;
    while (currentNode.right) {
      currentNode = currentNode.right;
    }
    return currentNode;
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

  insert(data) {
    let currentNode = this.root;
    while (currentNode) {
      // Duplicate values are not permitted in binary search trees
      if (data === currentNode.data) break;
      if (data < currentNode.data) {
        if (currentNode.left) currentNode = currentNode.left;
        else {
          currentNode.left = new BinaryTreeNode(data);
          break;
        }
      } else if (data > currentNode.data) {
        if (currentNode.right) currentNode = currentNode.right;
        else {
          currentNode.right = new BinaryTreeNode(data);
          break;
        }
      }
    }
  }

  levelOrder(callback) {
    const queue = new Queue();
    queue.enqueue(this.root);
    while (queue.length) {
      const currentNode = queue.dequeue();
      if (currentNode.left) queue.enqueue(currentNode.left);
      if (currentNode.right) queue.enqueue(currentNode.right);
      callback(currentNode);
    }
  }
}
