/* eslint-disable  */
import Queue from './queue';

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
    for (const item of arr) {
      if (!allUniqueValues.includes(item)) allUniqueValues.push(item);
    }
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

  delete(data, currentNode = this.root) {
    // If called with a null currentNode.left or currentNode.right
    if (!currentNode) return null;
    // If currentNode is not what we are looking for
    if (data < currentNode.data) {
      // If currentNode.left is the one we need to delete, deleteRec will return null
      // but if it isn't the one we need to delete, deleteRec will return currentNode.left unchanged
      currentNode.left = this.delete(data, currentNode.left);
    } else if (data > currentNode.data) {
      currentNode.right = this.delete(data, currentNode.right);
    } else {
      // currentNode must be what we're looking for
      if (currentNode.left && currentNode.right) {
        const leftLargest = BinarySearchTree.getLargestValueNode(
          currentNode.left,
        );
        this.delete(leftLargest.data, currentNode);
        currentNode.data = leftLargest.data;
        return currentNode;
      } else if (!currentNode.left && !currentNode.right) {
        if (currentNode === this.root) this.root = null;
        else return null;
      } else if (!currentNode.right) {
        if (currentNode === this.root) this.root = currentNode.left;
        else return currentNode.left;
      } else if (!currentNode.left) {
        if (currentNode === this.root) this.root = currentNode.right;
        else return currentNode.right;
      }
    }
    // If current node is not the one we want to delete, just return it to the parent unchanged
    return currentNode;
  }

  find(data) {
    let currentNode = this.root;
    while (currentNode) {
      if (data === currentNode.data) return currentNode;
      else if (data < currentNode.data) currentNode = currentNode.left;
      else currentNode = currentNode.right;
    }
    // If not found
    return null;
  }

  levelOrder(callback) {
    // If all nodes have been deleted
    if (!this.root) return null;
    // Would be more concise to have one version of loop but I prefer to do
    // one 'if (callback)' at the start of the function instead of sprinkled throughout.
    // Is more consistent with other traversal functions and easier to read, I think.
    const queue = new Queue();
    queue.enqueue(this.root);
    if (callback) {
      while (queue.length) {
        const currentNode = queue.dequeue();
        if (currentNode.left) queue.enqueue(currentNode.left);
        if (currentNode.right) queue.enqueue(currentNode.right);
        callback(currentNode);
      }
    } else {
      const treeValues = [];
      while (queue.length) {
        const currentNode = queue.dequeue();
        if (currentNode.left) queue.enqueue(currentNode.left);
        if (currentNode.right) queue.enqueue(currentNode.right);
        treeValues.push(currentNode.data);
      }
      return treeValues;
    }
  }

  inOrder(callback, currentNode = this.root) {
    // If all nodes have been deleted
    if (!this.root) return null;
    if (callback) {
      if (!currentNode) return;
      this.inOrder(callback, currentNode.left);
      callback(currentNode);
      this.inOrder(callback, currentNode.right);
    } else {
      if (!currentNode) return [];
      const treeValues = [];
      treeValues.push(...this.inOrder(null, currentNode.left));
      treeValues.push(currentNode.data);
      treeValues.push(...this.inOrder(null, currentNode.right));
      return treeValues;
    }
  }

  preOrder(callback, currentNode = this.root) {
    // If all nodes have been deleted
    if (!this.root) return null;
    if (callback) {
      if (!currentNode) return;
      callback(currentNode);
      this.preOrder(callback, currentNode.left);
      this.preOrder(callback, currentNode.right);
    } else {
      if (!currentNode) return [];
      const treeValues = [currentNode.data];
      treeValues.push(...this.preOrder(null, currentNode.left));
      treeValues.push(...this.preOrder(null, currentNode.right));
      return treeValues;
    }
  }

  postOrder(callback, currentNode = this.root) {
    // If all nodes have been deleted
    if (!this.root) return null;
    if (callback) {
      if (!currentNode) return;
      this.postOrder(callback, currentNode.left);
      this.postOrder(callback, currentNode.right);
      callback(currentNode);
    } else {
      if (!currentNode) return [];
      const treeValues = [];
      treeValues.push(...this.postOrder(null, currentNode.left));
      treeValues.push(...this.postOrder(null, currentNode.right));
      treeValues.push(currentNode.data);
      return treeValues;
    }
  }

  height(node) {
    if (!node) return -1;
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    return leftHeight > rightHeight ? 1 + leftHeight : 1 + rightHeight;
  }

  depth(node) {
    let currentNode = this.root;
    let level = 0;
    while (currentNode) {
      if (node === currentNode) return level;
      if (node.data < currentNode.data) currentNode = currentNode.left;
      else if (node.data > currentNode.data) currentNode = currentNode.right;
      level += 1;
    }
    // If node is somehow not within binary search tree
    return null;
  }

  isBalanced() {
    const allNodes = [];
    this.inOrder((node) => {
      allNodes.push(node);
    });
    for (const node of allNodes) {
      const leftHeight = this.height(node.left);
      const rightHeight = this.height(node.right);
      if (Math.abs(leftHeight - rightHeight) > 1) return false;
    }
    return true;
  }

  rebalance() {
    this.root = BinarySearchTree.buildTree(this.inOrder());
  }
}
