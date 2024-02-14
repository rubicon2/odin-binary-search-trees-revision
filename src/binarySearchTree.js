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

  delete(data) {
    let currentNode = this.root;
    let parentNode = null;
    while (currentNode) {
      // If this is the node we are looking for...
      if (data === currentNode.data) {
        // If there are no children
        if (!currentNode.left && !currentNode.right) {
          // All this stuff about parent node sucks
          if (parentNode) {
            if (currentNode === parentNode.left) parentNode.left = null;
            else parentNode.right = null;
          } else {
            // If there is no parent, this must be the root we are trying to delete
            this.root = null;
          }
        }

        // If there is one child
        else if (!currentNode.right) {
          if (parentNode) {
            if (currentNode === parentNode.left)
              parentNode.left = currentNode.left;
            else parentNode.right = currentNode.left;
          } else {
            this.root = currentNode.left;
          }
        } else if (!currentNode.left) {
          if (parentNode) {
            if (currentNode === parentNode.left)
              parentNode.left = currentNode.right;
            else parentNode.right = currentNode.right;
          } else {
            this.root = currentNode.right;
          }
        }

        // If there are two children
        else {
          // Copy value from largest node in left subtree - this will be a node with at most one child
          const leftLargest = BinarySearchTree.getLargestValueNode(
            currentNode.left,
          );
          // Delete that node as it only has one child
          this.delete(leftLargest.data);
          // Put data in currentNode
          currentNode.data = leftLargest.data;
        }
        break;
      }

      // If we need to keep looking
      if (data < currentNode.data) {
        parentNode = currentNode;
        currentNode = currentNode.left;
      } else if (data > currentNode.data) {
        parentNode = currentNode;
        currentNode = currentNode.right;
      }
    }
  }

  deleteRec(data, currentNode = this.root) {
    // If called with a null currentNode.left or currentNode.right
    if (!currentNode) return null;
    // If currentNode is not what we are looking for
    if (data < currentNode.data) {
      // If currentNode.left is the one we need to delete, deleteRec will return null
      // but if it isn't the one we need to delete, deleteRec will return currentNode.left unchanged
      currentNode.left = this.deleteRec(data, currentNode.left);
    } else if (data > currentNode.data) {
      currentNode.right = this.deleteRec(data, currentNode.right);
    } else {
      // currentNode must be what we're looking for
      if (currentNode.left && currentNode.right) {
        const leftLargest = BinarySearchTree.getLargestValueNode(
          currentNode.left,
        );
        this.deleteRec(leftLargest.data, currentNode);
        currentNode.data = leftLargest.data;
        return currentNode;
      } else if (!currentNode.left && !currentNode.right) {
        if (currentNode === this.root) this.root = null;
        else return null;
      } else if (!currentNode.right) {
        return currentNode.left;
      } else if (!currentNode.left) {
        return currentNode.right;
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
