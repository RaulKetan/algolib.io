export const content = `
# Binary Trees & BSTs Guide

## Introduction: The Upside-Down Magic Tree

If you click around your computer's files, you are interacting with a **Tree** data structure. At the absolute top, there is a root folder (like \`C:\` on Windows or \`/\` on Mac/Linux). Inside it, you have subfolders like \`Users\`, \`Program Files\`, and \`System\`. Inside \`Users\`, you might have folders like \`Documents\` and \`Downloads\`, and eventually, you reach actual files (like \`photo.jpg\` or \`resume.pdf\`) which cannot contain anything else.

In computer science, a tree is represented **upside down**. The "Root" is at the very top, and the branches grow downwards, splitting into smaller branches until they reach the "Leaves" at the bottom.

### Analogy: Nests in an Upside-Down Tree
Have you ever climbed a tree in a park?
Computer trees are extra magical because they grow **upside-down**! The **Root** of the tree is in the clouds at the very top, and the branches grow downwards.
* **Nodes**: Think of nodes as little bird nests built on the branches. Each nest stores a toy (our **Data**).
* **Edges**: The wooden branches connecting the nests are **Edges**.
* **Parent and Child**: If nest A is directly above nest B, A is the **Parent** and B is the **Child**.
* **Leaves**: A nest at the very bottom that has no branches growing under it is a **Leaf**!

---

### Tree Terminology
Before writing tree code, you must master the vocabulary:
* **Node**: A data container (like a folder or file).
* **Root**: The top-most node in the tree. It has no parent.
* **Edge**: The link or pointer connecting one node to another.
* **Child**: A node directly connected to another node when moving away from the root.
* **Parent**: The node directly above a child node, closer to the root.
* **Leaf**: A node that has no children (the endpoints of the branches).
* **Height**: The number of edges on the longest path from a node to a leaf (the height of a leaf is 0, and the root's height represents the height of the entire tree).
* **Depth**: The number of edges from the root to a specific node (the root's depth is 0).

---

## Binary Trees vs. Binary Search Trees (BST)

The two most common tree structures you will see in technical interviews are **Binary Trees** and **Binary Search Trees (BST)**.

### 1. Binary Trees

#### Analogy: Nests with Two Branches
A tree is a **Binary Tree** if each bird nest has **at most two** branches growing under it (a Left nest and a Right nest). There are no rules about what toys go where—you can throw them in any nest you want!

\`\`\`
       [ Root ]
       /      \
  [ Left ]  [ Right ]
\`\`\`

Here is the standard structural definition of a Binary Tree Node:

##### Python
\`\`\`python
# Python Node Definition
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
\`\`\`

##### Java
\`\`\`java
// Java Node Definition
public class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}
\`\`\`

##### C++
\`\`\`cpp
// C++ Node Definition
struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode* left, TreeNode* right) : val(x), left(left), right(right) {}
};
\`\`\`

##### TypeScript
\`\`\`typescript
// TypeScript Node Definition
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(val: number, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}
\`\`\`

### 2. Binary Search Trees (BST)

#### Analogy: The Number Sorting Game
A **Binary Search Tree** (BST) is super neat because it has a strict rule for how toys are sorted:
1. Every toy in the **left subtree** must be **strictly smaller** than the parent's toy.
2. Every toy in the **right subtree** must be **strictly larger** than the parent's toy.

Imagine you are looking for the number **3** in this tree:
* You start at the top root nest which has a **5**.
* Is 3 smaller or larger than 5? Smaller! So you *know* it must be on the left side. You can ignore the entire right side of the tree!
* You slide down to the left nest which has a **3**. You found it in just two steps!
This rule makes searching super fast because you throw away half the tree with every single step!

A **Binary Search Tree** is a binary tree that maintains a strict sorting property (the **BST Invariant**):
1. The value of every node in the **left subtree** must be **strictly less than** the parent node's value.
2. The value of every node in the **right subtree** must be **strictly greater than** the parent node's value.

This invariant makes search highly efficient. If you want to check if a value exists in a BST, you do not have to scan the entire tree. You look at the current node:
* If the target is smaller, you recursively go left.
* If the target is larger, you recursively go right.

In a balanced BST, this halves the search space at each level, reducing lookup time from \`O(n)\` to \`O(log n)\`, matching the performance of Binary Search on arrays!

---

## BST Operations & Time Complexity

Here is the operational complexity profile for Binary Search Trees:

| Operation | Average Case (Balanced Tree) | Worst Case (Skewed Tree) | Why / Notes |
| :--- | :--- | :--- | :--- |
| **Search** | O(log n) | O(n) | Halves the search space at each step in balanced trees; searches linearly in unbalanced trees. |
| **Insertion** | O(log n) | O(n) | Traverses tree height to find the correct insertion location. |
| **Deletion** | O(log n) | O(n) | Requires searching for node, then rearranging pointers. |

### The Skewed Tree Hazard
If you insert sorted elements into a BST (e.g., \`1, 2, 3, 4, 5\`), the tree becomes a single long branch (a linear list):
\`\`
[1] -> [2] -> [3] -> [4] -> [5]
\`\`
All operations degrade to \`O(n)\`! This is why production systems use self-balancing trees like AVL or Red-Black Trees, which automatically rearrange nodes during insertion to keep the height logarithmic.

---

## Tree Traversals: DFS vs. BFS

Because tree structures are non-linear, we have multiple paths to traverse them. We group traversals into **Depth-First Search (DFS)** and **Breadth-First Search (BFS)**.

### 1. Depth-First Search (DFS)

#### Analogy: Exploring a Deep Cave
Imagine you are exploring a deep cave with multiple branches.
In **Depth-First Search**, you pick one branch and walk **as deep as possible** until you hit a wall at the bottom. Only then do you walk back (backtrack) and try the next branch!
Depending on when we write down the name of the nest we are in, we have three orders:
* **Preorder** (Write name -> Left branch -> Right branch)
* **Inorder** (Left branch -> Write name -> Right branch) — *This reads a BST in perfect sorted order, from smallest to biggest!*
* **Postorder** (Left branch -> Right branch -> Write name) — *Perfect for deleting a tree because you clean the children nests before the parent!*

### 2. Breadth-First Search (BFS) / Level Order Traversal

#### Analogy: Ripples in a Puddle
Imagine you drop a pebble in a puddle of water, and it creates ripples that spread outwards in circles.
In **Breadth-First Search**, you visit nests **level-by-level**, starting at the top root nest, then checking all nests on the first level down, then all nests on the second level down, and so on. You spread out wide before going deep!

---

## Walkthrough of BFS Level Order Traversal

Let's trace a level order traversal of this binary tree:
\`\`\`
      [3]
     /   \
   [9]   [20]
        /    \
      [15]   [7]
\`\`\`

1. **Start**: Push \`[3]\` into queue. Queue: \`[[3]]\`.
2. **Level 0**: Size = 1.
   * Pop \`[3]\`. Children \`[9]\` and \`[20]\` are pushed.
   * Level list: \`[3]\`. Queue: \`[[9], [20]]\`.
3. **Level 1**: Size = 2.
   * Pop \`[9]\`. No children. Queue: \`[[20]]\`.
   * Pop \`[20]\`. Children \`[15]\` and \`[7]\` are pushed. Queue: \`[[15], [7]]\`.
   * Level list: \`[9, 20]\`.
4. **Level 2**: Size = 2.
   * Pop \`[15]\`. No children. Queue: \`[[7]]\`.
   * Pop \`[7]\`. No children. Queue: \`[]\`.
   * Level list: \`[15, 7]\`.
5. **End**: Queue is empty. Result is \`[[3], [9, 20], [15, 7]]\`.

---

## Implementations in 4 Languages

Let's look at the standard implementations of Inorder DFS and Level Order BFS in Python, Java, C++, and TypeScript.

##### Python
\`\`\`python
from collections import deque
from typing import List, Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

# 1. Inorder DFS (Recursive)
def inorder(root: Optional[TreeNode], result: List[int]):
    # Base Case: If the nest is empty, we hit the bottom. Stop going deeper!
    if not root:
        return
        
    # Step 1: Go as deep as possible into the LEFT branch
    inorder(root.left, result)
    
    # Step 2: Record the toy inside the current nest
    result.append(root.val)
    
    # Step 3: Explore the RIGHT branch
    inorder(root.right, result)

# 2. Level Order BFS
def levelOrder(root: Optional[TreeNode]) -> List[List[int]]:
    if not root:
        return []
        
    result = []
    # A queue helps us explore the tree level-by-level (FIFO)
    queue = deque([root])
    
    while queue:
        # How many nests are on this specific level?
        level_size = len(queue)
        current_level = []
        
        # Process every single nest on this level before moving down
        for _ in range(level_size):
            node = queue.popleft()
            current_level.append(node.val)
            
            # If the current nest has children, queue them up for the NEXT level
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
                
        # We finished exploring this level, so we save it
        result.append(current_level)
        
    return result
\`\`\`

##### Java
\`\`\`java
import java.util.*;

public class TreeSolutions {
    public static class TreeNode {
        int val;
        TreeNode left;
        TreeNode right;
        TreeNode(int val) { this.val = val; }
    }

    // 1. Inorder DFS (Recursive)
    public List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        inorderHelper(root, res);
        return res;
    }

    private void inorderHelper(TreeNode node, List<Integer> res) {
        // Base Case: If the nest is empty, we hit the bottom. Stop going deeper!
        if (node == null) return;
        
        // Step 1: Go as deep as possible into the LEFT branch
        inorderHelper(node.left, res);
        
        // Step 2: Record the toy inside the current nest
        res.add(node.val);
        
        // Step 3: Explore the RIGHT branch
        inorderHelper(node.right, res);
    }

    // 2. Level Order BFS
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;
        
        // A queue helps us explore the tree level-by-level (FIFO)
        Queue<TreeNode> queue = new LinkedList<>();
        queue.add(root);
        
        while (!queue.isEmpty()) {
            // How many nests are on this specific level?
            int levelSize = queue.size();
            List<Integer> currentLevel = new ArrayList<>();
            
            // Process every single nest on this level before moving down
            for (int i = 0; i < levelSize; i++) {
                TreeNode node = queue.poll();
                currentLevel.add(node.val);
                
                // If the current nest has children, queue them up for the NEXT level
                if (node.left != null) queue.add(node.left);
                if (node.right != null) queue.add(node.right);
            }
            
            // We finished exploring this level, so we save it
            result.add(currentLevel);
        }
        return result;
    }
}
\`\`\`

##### C++
\`\`\`cpp
#include <vector>
#include <queue>
using namespace std;

struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class TreeSolutions {
public:
    // 1. Inorder DFS
    void inorder(TreeNode* root, vector<int>& res) {
        // Base Case: If the nest is empty, we hit the bottom. Stop going deeper!
        if (!root) return;
        
        // Step 1: Go as deep as possible into the LEFT branch
        inorder(root->left, res);
        
        // Step 2: Record the toy inside the current nest
        res.push_back(root->val);
        
        // Step 3: Explore the RIGHT branch
        inorder(root->right, res);
    }

    // 2. Level Order BFS
    vector<vector<int>> levelOrder(TreeNode* root) {
        vector<vector<int>> result;
        if (!root) return result;
        
        // A queue helps us explore the tree level-by-level (FIFO)
        queue<TreeNode*> q;
        q.push(root);
        
        while (!q.empty()) {
            // How many nests are on this specific level?
            int levelSize = q.size();
            vector<int> currentLevel;
            
            // Process every single nest on this level before moving down
            for (int i = 0; i < levelSize; i++) {
                TreeNode* node = q.front();
                q.pop();
                currentLevel.push_back(node->val);
                
                // If the current nest has children, queue them up for the NEXT level
                if (node->left) q.push(node->left);
                if (node->right) q.push(node->right);
            }
            
            // We finished exploring this level, so we save it
            result.push_back(currentLevel);
        }
        return result;
    }
};
\`\`\`

##### TypeScript
\`\`\`typescript
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// 1. Inorder DFS
function inorder(root: TreeNode | null, result: number[]): void {
  // Base Case: If the nest is empty, we hit the bottom. Stop going deeper!
  if (!root) return;
  
  // Step 1: Go as deep as possible into the LEFT branch
  inorder(root.left, result);
  
  // Step 2: Record the toy inside the current nest
  result.push(root.val);
  
  // Step 3: Explore the RIGHT branch
  inorder(root.right, result);
}

// 2. Level Order BFS
function levelOrder(root: TreeNode | null): number[][] {
  const result: number[][] = [];
  if (!root) return result;
  
  // A queue helps us explore the tree level-by-level (FIFO)
  const queue: TreeNode[] = [root];
  
  while (queue.length > 0) {
    // How many nests are on this specific level?
    const levelSize = queue.length;
    const currentLevel: number[] = [];
    
    // Process every single nest on this level before moving down
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()!;
      currentLevel.push(node.val);
      
      // If the current nest has children, queue them up for the NEXT level
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    
    // We finished exploring this level, so we save it
    result.push(currentLevel);
  }
  return result;
}
\`\`\`

---

## Core Problem Walkthroughs

### 1. Invert a Binary Tree

Inverting a binary tree (creating its mirror image) is the classic interview question.
* **Intuition**: Swap the left and right children of every node in the tree recursively.

##### Invert Tree Implementation

##### Python
\`\`\`python
def invertTree(root: Optional[TreeNode]) -> Optional[TreeNode]:
    # Base Case: If the nest is empty, there is nothing to invert!
    if not root:
        return None
        
    # Swap the left and right child pointers of the current nest
    root.left, root.right = root.right, root.left
    
    # Magically tell our clones to go invert all the nests in the left branch
    invertTree(root.left)
    # Magically tell our clones to go invert all the nests in the right branch
    invertTree(root.right)
    
    return root
\`\`\`

##### Java
\`\`\`java
public TreeNode invertTree(TreeNode root) {
    // Base Case: If the nest is empty, there is nothing to invert!
    if (root == null) return null;
    
    // Swap the left and right child pointers of the current nest
    TreeNode temp = root.left;
    root.left = root.right;
    root.right = temp;
    
    // Magically tell our clones to go invert all the nests in the left branch
    invertTree(root.left);
    // Magically tell our clones to go invert all the nests in the right branch
    invertTree(root.right);
    
    return root;
}
\`\`\`

##### C++
\`\`\`cpp
TreeNode* invertTree(TreeNode* root) {
    // Base Case: If the nest is empty, there is nothing to invert!
    if (!root) return nullptr;
    
    // Swap the left and right child pointers of the current nest
    TreeNode* temp = root->left;
    root->left = root->right;
    root->right = temp;
    
    // Magically tell our clones to go invert all the nests in the left branch
    invertTree(root->left);
    // Magically tell our clones to go invert all the nests in the right branch
    invertTree(root->right);
    
    return root;
}
\`\`\`

##### TypeScript
\`\`\`typescript
function invertTree(root: TreeNode | null): TreeNode | null {
  // Base Case: If the nest is empty, there is nothing to invert!
  if (root === null) return null;
  
  // Swap the left and right child pointers of the current nest
  const temp = root.left;
  root.left = root.right;
  root.right = temp;
  
  // Magically tell our clones to go invert all the nests in the left branch
  invertTree(root.left);
  // Magically tell our clones to go invert all the nests in the right branch
  invertTree(root.right);
  
  return root;
}
\`\`\`

##### Trace Table: Inverting Tree \`[4, 2, 7]\`
We start at root node \`[4]\`.

| Recursion Step | Node Visited | Old Left Pointer | Old Right Pointer | Swapped Action |
| :--- | :--- | :--- | :--- | :--- |
| **1** | \`[4]\` (Root) | \`[2]\` | \`[7]\` | Swapped! Left is now \`[7]\`, Right is now \`[2]\` |
| **2** | \`[7]\` | \`null\` | \`null\` | Swapped nulls (no change). Return \`[7]\` |
| **3** | \`[2]\` | \`null\` | \`null\` | Swapped nulls (no change). Return \`[2]\` |

We return root \`[4]\` which now points to \`7\` on the left and \`2\` on the right.

---

### 2. Lowest Common Ancestor (LCA) in a BST

The **Lowest Common Ancestor** of two nodes \`P\` and \`Q\` is the lowest node in the tree that has both \`P\` and \`Q\` as descendants.

Because it is a BST, we can use the sorting property to find the LCA in a single pass without traversing the whole tree:
* If both \`P\` and \`Q\` have values **strictly smaller** than the current node's value, their ancestor must lie in the **left subtree**. Move left.
* If both \`P\` and \`Q\` have values **strictly larger** than the current node's value, their ancestor must lie in the **right subtree**. Move right.
* If one node is smaller and the other is larger (or one of them is the current node), then the current node is the **LCA split point**!

##### LCA BST Implementation

##### Python
\`\`\`python
def lowestCommonAncestor(root: TreeNode, p: TreeNode, q: TreeNode) -> TreeNode:
    curr = root
    while curr:
        # If BOTH targets are smaller than current, the LCA must be in the LEFT subtree
        if p.val < curr.val and q.val < curr.val:
            curr = curr.left
        # If BOTH targets are larger than current, the LCA must be in the RIGHT subtree
        elif p.val > curr.val and q.val > curr.val:
            curr = curr.right
        # One is smaller, one is larger! We found the exact split point!
        else:
            return curr  
\`\`\`

##### Java
\`\`\`java
public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
    TreeNode curr = root;
    while (curr != null) {
        // If BOTH targets are smaller than current, the LCA must be in the LEFT subtree
        if (p.val < curr.val && q.val < curr.val) {
            curr = curr.left;
        // If BOTH targets are larger than current, the LCA must be in the RIGHT subtree
        } else if (p.val > curr.val && q.val > curr.val) {
            curr = curr.right;
        // One is smaller, one is larger! We found the exact split point!
        } else {
            return curr;
        }
    }
    return null;
}
\`\`\`

##### C++
\`\`\`cpp
TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
    TreeNode* curr = root;
    while (curr) {
        // If BOTH targets are smaller than current, the LCA must be in the LEFT subtree
        if (p->val < curr->val && q->val < curr->val) {
            curr = curr->left;
        // If BOTH targets are larger than current, the LCA must be in the RIGHT subtree
        } else if (p->val > curr->val && q->val > curr->val) {
            curr = curr->right;
        // One is smaller, one is larger! We found the exact split point!
        } else {
            return curr;
        }
    }
    return nullptr;
}
\`\`\`

##### TypeScript
\`\`\`typescript
function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
  let curr = root;
  while (curr !== null) {
    // If BOTH targets are smaller than current, the LCA must be in the LEFT subtree
    if (p!.val < curr.val && q!.val < curr.val) {
      curr = curr.left;
    // If BOTH targets are larger than current, the LCA must be in the RIGHT subtree
    } else if (p!.val > curr.val && q!.val > curr.val) {
      curr = curr.right;
    // One is smaller, one is larger! We found the exact split point!
    } else {
      return curr;
    }
  }
  return null;
}
\`\`\`

---

## Common Interview Pitfalls and Debugging Strategies

1. **Recursion Stack Overflow**:
   * **Symptom**: \`RangeError: Maximum call stack size exceeded\` or \`RecursionError\`.
   * **Cause**: Your base case is missing or incorrect, causing the recursive function to call itself infinitely.
   * **Fix**: Ensure that your recursive calls check if the node is \`null\` first and exit: \`if not node: return\`.

2. **BST Invariant Violation**:
   * **Symptom**: Search fails because nodes are inserted incorrectly.
   * **Cause**: You only compared a node with its immediate children rather than checking that *all* nodes in the left subtree are smaller than the parent.
   * **Fix**: When validating BSTs, pass \`min\` and \`max\` boundaries down the recursion stack to restrict child nodes correctly.

---

## Practice Problems & Interactive Visualizers

Build your confidence by practicing with these real problems on our platform:
* [Invert Binary Tree](/problem/invert-binary-tree) — Recursive swaps of child pointers.
* [Maximum Depth of Binary Tree](/problem/maximum-depth-of-binary-tree) — Compute height bottom-up.
* [Lowest Common Ancestor of a BST](/problem/lowest-common-ancestor-of-a-binary-search-tree) — Trace BST split points.
`;
