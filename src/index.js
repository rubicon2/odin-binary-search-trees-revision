import './style.css';

import BinarySearchTree from './binarySearchTree';
import { getRangedRandomInt, getRangedRandomIntArray } from './util';

function printTreeStatus(tree) {
  BinarySearchTree.prettyPrint(tree.root);
  console.log('Is balanced: ', tree.isBalanced());

  console.log('LEVEL ORDER:');
  console.log(tree.levelOrder());

  console.log('PRE ORDER:');
  console.log(tree.preOrder());

  console.log('POST ORDER:');
  console.log(tree.postOrder());

  console.log('IN ORDER:');
  console.log(tree.inOrder());
}

const tree = new BinarySearchTree(getRangedRandomIntArray(0, 100, 50));
printTreeStatus(tree);

for (let i = 0; i < 50; i += 1) {
  tree.insert(getRangedRandomInt(100, 1000));
}

printTreeStatus(tree);

tree.rebalance();

printTreeStatus(tree);
