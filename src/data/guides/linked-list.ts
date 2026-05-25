export const content = `
# Linked List Guide

## Introduction: The Clue Bottle Treasure Hunt

Imagine you are participating in a neighborhood-wide treasure hunt. When you arrive at the first location—the big oak tree in the park—you don't find all the treasure chests stacked there. Instead, you find a small clue card inside a glass bottle. The card says: *"The next clue is hidden inside the mailbox at 12 Elm Street."* You walk to 12 Elm Street, open the mailbox, and find another card pointing you to *"the red bench behind the library."* You continue this journey, walking from spot to spot, until you reach the final location where the clue card says *"End of Hunt."*

This treasure hunt is the exact real-world model of a **Linked List** in computer science.

### Analogy: The Clue Bottle Hunt
Imagine that neighborhood birthday treasure hunt!
* **The Spot**: In a computer, we call each clue location a **Node**. A node holds your toy (the **Data**, like numbers or words).
* **The Clue**: Inside each node is a note showing where to find the next node. We call this note the **Next Pointer**.
* **The Start and End**: The very first spot is called the **Head**. The last spot points to **null** (which means *"nothing"* or *"end of the hunt"*).
* **How you play**: To find a toy at clue #5, you *must* start at the first clue and walk through them one by one. You cannot skip!

---

### The Lockers vs. The Clue Bottles (Array vs. Linked List)

To truly understand a Linked List, let's compare it to an **Array**. An array is like a contiguous row of school lockers. If Locker #0 is at address 1000, and each locker holds 1 item, Locker #4 is exactly at address 1004. Because the lockers are glued together in a single straight block:
1. You can instantly access any locker if you know its number (this is called **Random Access** or \`O(1)\` access).
2. However, if you want to insert a new locker in the middle, you have to physically slide all the lockers after it to the right, which takes a lot of effort (\`O(n)\` insertion).
3. If you run out of empty lockers on the ends, you have to buy a whole new larger row of lockers and move all your items there.

A **Linked List** is completely different. Its items are scattered randomly throughout the computer's memory (RAM), just like the clue bottles in the neighborhood. They are not glued together. 

Because these nodes are scattered, you cannot calculate where the 5th element is in a single step. You must start at the very first node, which we call the **Head**, read its pointer to get the address of the 2nd node, jump to the 2nd node, read its pointer to find the 3rd, and so on. This journey is called **Traversal**.

---

## Visualizing Node Structures

Let's look at the anatomical differences between the two main flavors of linked lists.

### 1. Singly Linked Lists (The One-Way Train)

#### Analogy: The One-Way Playground Train
Imagine a playground train where each car holds the hand of the car *behind* it.
* Traffic moves in one direction only.
* If you are standing at car C, you cannot see or go back to car B because car C is only holding the hand of car D!
* If you want to go back, you have to start all the way at the front of the train (**Head**) and walk forward again.

\`\`\`
[ Head ] -> [ Node A: Val 10 | Next ] -> [ Node B: Val 20 | Next ] -> [ Node C: Val 30 | null ]
\`\`\`

Here is the standard structural definition of a Singly Linked List Node:

##### Python
\`\`\`python
# Python Implementation
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
\`\`\`

##### Java
\`\`\`java
// Java Implementation
public class ListNode {
    public int val;
    public ListNode next;

    public ListNode(int val) {
        this.val = val;
        this.next = null;
    }

    public ListNode(int val, ListNode next) {
        this.val = val;
        this.next = next;
    }
}
\`\`\`

##### C++
\`\`\`cpp
// C++ Implementation
struct ListNode {
    int val;
    ListNode* next;

    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode* next) : val(x), next(next) {}
};
\`\`\`

##### TypeScript
\`\`\`typescript
// TypeScript Implementation
class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val: number, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}
\`\`\`

### 2. Doubly Linked Lists (The Two-Way Train)

#### Analogy: The Two-Way Playground Train
Imagine a train where every car holds the hands of *both* the car in front of it and the car behind it!
* You can walk forward and backward through the train.
* **The Good Part**: If a car gets broken, you can unhook it and reconnect the other two cars instantly because you can look both ways!
* **The Hard Part**: The train nodes are bigger (require more memory to store two pointers) and take twice as much work to hook up!

\`\`\`
[ Head ] <-> [ Node A: prev | Val 10 | next ] <-> [ Node B: prev | Val 20 | next ] <-> [ Tail ]
\`\`\`

* **Advantage**: If you have a reference to Node B, you can delete it in \`O(1)\` time because you can immediately inspect B's \`prev\` pointer to find Node A and change A's \`next\` pointer.
* **Disadvantage**: Each node requires more memory to store the additional pointer, and writing insertion/deletion algorithms requires twice as much pointer management to ensure the link chains do not break in either direction.

---

## Core Operations & Deep Dive Complexity Analysis

Let's study the complexity profiles of Linked Lists compared to Arrays, detailing why each operation performs the way it does.

| Operation | Array Complexity | Singly Linked List Complexity | Doubly Linked List Complexity |
| :--- | :--- | :--- | :--- |
| **Access / Lookup by Index** | O(1) | O(n) | O(n) |
| **Search by Value** | O(n) | O(n) | O(n) |
| **Insert at Head / Beginning** | O(n) | O(1) | O(1) |
| **Insert at Tail / End** | O(1) (avg) / O(n) (worst) | O(1) (with Tail pointer) / O(n) | O(1) |
| **Delete at Head / Beginning** | O(n) | O(1) | O(1) |
| **Delete in Middle** | O(n) | O(1) (once node is found) | O(1) (once node is found) |

### Detailed Operation Walkthroughs

#### 1. Why Accessing is \`O(n)\`
To access the element at index 4 in a Linked List, we cannot simply use math to calculate its address. We must write a loop that updates a reference node: \`curr = curr.next\` exactly 4 times. In a list of \`N\` nodes, retrieving the last node takes \`N\` steps, resulting in linear \`O(n)\` complexity.

#### 2. Why Insertion/Deletion at the Head is \`O(1)\`
Inserting at the front of an Array requires shifting every other element one slot to the right. In a Linked List, we just buy a new Node, write the address of the current Head into the new node's \`next\` pointer, and point the Head variable to the new node. No elements are moved. This takes exactly the same amount of time regardless of whether the list has 5 nodes or 5 billion nodes.

---

## Crucial Pointer Manipulation Mechanics

Pointer manipulation is notoriously tricky. If you do not assign pointer links in the correct sequence, you will cause a memory leak (freeing nodes in memory while losing their references) or create an infinite loop. Let's walk through the two most common mechanics.

### 1. In-Place Reversal of a Singly Linked List

This is the holy grail of basic pointer manipulation. The objective is to change the direction of every single pointer arrow in the list so that the tail becomes the new head.

#### Analogy: Turning the Train Around
Imagine a line of children holding the shoulder of the child in front of them: \`Me -> Friend1 -> Friend2 -> End\`.
To reverse the line so it faces the opposite direction, we walk down the line, tap each child on the shoulder, and tell them to turn around and hold the shoulder of the child *behind* them instead! 
To do this safely without anyone getting lost, we need three helpers:
1. **The child behind us** (\`prev\`): The person we should turn around and hold onto.
2. **The child we are touching right now** (\`curr\`): The person who is currently turning around.
3. **The child in front of us** (\`nxt\`): We hold onto their address so we don't lose the rest of the line when we let go!

#### The Reversal Walkthrough (ASCII Art)
Suppose we have a list: \`1 -> 2 -> 3 -> null\`.
We need to turn it into: \`null <- 1 <- 2 <- 3 (Head)\`.

We maintain three pointers:
* \`prev\`: The node behind us (initially \`null\`).
* \`curr\`: The node we are currently processing (initially \`1\`).
* \`nxt\`: The node in front of us (used to save the rest of the train before we disconnect \`curr\`).

##### Step 1: Initial State
\`\`\`
prev = null
curr = [1] -> [2] -> [3] -> null
\`\`\`

##### Step 2: Loop Iteration 1
1. Save the next node: \`nxt = curr.next\` (so \`nxt\` is now node \`[2]\`).
2. Reverse the link: \`curr.next = prev\` (node \`[1]\` now points to \`null\`).
3. Slide \`prev\` forward: \`prev = curr\` (so \`prev\` is node \`[1]\`).
4. Slide \`curr\` forward: \`curr = nxt\` (so \`curr\` is node \`[2]\`).

\`\`\`
[1] -> null   (prev is [1])
[2] -> [3] -> null   (curr is [2])
\`\`\`

##### Step 3: Loop Iteration 2
1. Save the next node: \`nxt = curr.next\` (node \`[3]\`).
2. Reverse the link: \`curr.next = prev\` (node \`[2]\` points to \`[1]\`).
3. Slide \`prev\` forward: \`prev = curr\` (node \`[2]\`).
4. Slide \`curr\` forward: \`curr = nxt\` (node \`[3]\`).

\`\`\`
null <- [1] <- [2]   (prev is [2])
[3] -> null         (curr is [3])
\`\`\`

##### Step 4: Loop Iteration 3
1. Save the next node: \`nxt = curr.next\` (\`null\`).
2. Reverse the link: \`curr.next = prev\` (node \`[3]\` points to \`[2]\`).
3. Slide \`prev\` forward: \`prev = curr\` (node \`[3]\`).
4. Slide \`curr\` forward: \`curr = nxt\` (\`null\`).

##### Step 5: Termination
Since \`curr\` is now \`null\`, the loop terminates. We return \`prev\`, which points to node \`[3]\`—our new reversed Head!


[Practice Problem: Reverse Linked List](/problem/reverse-linked-list)

---

## Implementations in 4 Languages

Here is the complete code to reverse a singly linked list in Python, Java, C++, and TypeScript.

##### Python
\`\`\`python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverseList(head: ListNode) -> ListNode:
    prev = None
    curr = head
    while curr:
        nxt = curr.next  # Save next node reference
        curr.next = prev  # Change pointer direction
        prev = curr      # Move prev pointer forward
        curr = nxt       # Move curr pointer forward
    return prev
\`\`\`

##### Java
\`\`\`java
public class Solution {
    public static class ListNode {
        int val;
        ListNode next;
        ListNode(int val) { this.val = val; }
    }

    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode nxt = curr.next; // Save next node reference
            curr.next = prev;        // Change pointer direction
            prev = curr;             // Move prev pointer forward
            curr = nxt;              // Move curr pointer forward
        }
        return prev;
    }
}
\`\`\`

##### C++
\`\`\`cpp
struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode* prev = nullptr;
        ListNode* curr = head;
        while (curr != nullptr) {
            ListNode* nxt = curr->next; // Save next node reference
            curr->next = prev;         // Change pointer direction
            prev = curr;               // Move prev pointer forward
            curr = nxt;                // Move curr pointer forward
        }
        return prev;
    }
};
\`\`\`

##### TypeScript
\`\`\`typescript
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  let curr: ListNode | null = head;
  while (curr !== null) {
    const nxt: ListNode | null = curr.next; // Save next node reference
    curr.next = prev;                       // Change pointer direction
    prev = curr;                            // Move prev pointer forward
    curr = nxt;                             // Move curr pointer forward
  }
  return prev;
}
\`\`\`

---

## Core Algorithmic Patterns and Templates

When tackling linked list problems in interviews, three major patterns solve 90% of the questions.

### Pattern 1: Fast and Slow Pointers (The Tortoise and the Hare)

This pattern uses two pointers moving at different speeds to discover properties of the list.

#### Analogy: Tortoise and Hare on a Circular Track
Imagine two animals, a slow Tortoise and a fast Hare, running down our track.
* **Finding the Middle**: The Hare runs **twice as fast** as the Tortoise. If they both start at the beginning, when the Hare reaches the very end of the track, the Tortoise will be standing **exactly in the middle**!
* **Finding a Cycle (Loop)**: Imagine the track goes in a circle. If the Hare and Tortoise run forever, the fast Hare will eventually catch up and lap the slow Tortoise from behind! If they collide, we know there is a loop in the track. If the Hare reaches a dead end, there is no loop.

#### 1. Finding the Midpoint
If you have a list of length \`N\`, move the \`slow\` pointer 1 step at a time, and the \`fast\` pointer 2 steps at a time. By the time \`fast\` reaches the end of the list, \`slow\` will be pointing exactly at the midpoint node.
* **Application**: Used in Merge Sort for Linked Lists, or checking if a list is a palindrome.


[Practice Problem: Middle of the Linked List](/problem/middle-node)

#### 2. Cycle Detection
If a list has a cycle (meaning the last node points back to an earlier node, forming a loop), a single pointer will traverse it infinitely. If we use a \`slow\` and a \`fast\` pointer, the fast pointer will eventually loop around and collide with the slow pointer. If \`fast\` ever reaches \`null\`, the list has no cycles.


[Practice Problem: Linked List Cycle](/problem/detect-cycle-in-a-linked-list)

##### Cycle Detection Template

##### Python
\`\`\`python
def hasCycle(head: ListNode) -> bool:
    if not head or not head.next:
        return False
        
    slow = head
    fast = head
    
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True  # Fast pointer lapped the slow pointer!
            
    return False
\`\`\`

##### Java
\`\`\`java
public boolean hasCycle(ListNode head) {
    if (head == null || head.next == null) {
        return false;
    }
    
    ListNode slow = head;
    ListNode fast = head;
    
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) {
            return true; // Cycle detected
        }
    }
    
    return false;
}
\`\`\`

##### C++
\`\`\`cpp
bool hasCycle(ListNode *head) {
    if (!head || !head->next) {
        return false;
    }
    
    ListNode *slow = head;
    ListNode *fast = head;
    
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) {
            return true; // Cycle detected
        }
    }
    
    return false;
}
\`\`\`

##### TypeScript
\`\`\`typescript
function hasCycle(head: ListNode | null): boolean {
  if (head === null || head.next === null) {
    return false;
  }

  let slow: ListNode | null = head;
  let fast: ListNode | null = head;

  while (fast !== null && fast.next !== null) {
    slow = slow!.next;
    fast = fast.next.next;
    if (slow === fast) {
      return true; // Cycle detected
    }
  }

  return false;
}
\`\`\`

---

### Pattern 2: The Dummy Node Pattern

When you are creating a new linked list (e.g., merging two sorted lists, adding two numbers represented as lists, or partitioning a list), you often have to write messy conditional checks to determine what the new \`head\` node is.

To avoid this, we instantiate a **Dummy Node** (a node with placeholder data, like \`-1\`) to act as the temporary anchor at the start of our list. We build the list by appending to \`dummy.next\`. Once we are finished, the actual head of our list is simply \`dummy.next\`.

#### Merging Two Sorted Lists Walkthrough
Let's see this in action for merging:
* List 1: \`1 -> 3 -> 5 -> null\`
* List 2: \`2 -> 4 -> 6 -> null\`

[Practice Problem: Merge Two Sorted Lists](/problem/merge-two-sorted-lists)

##### Implementation Template

##### Python
\`\`\`python
def mergeTwoLists(list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
    dummy = ListNode(-1)
    curr = dummy
    
    while list1 and list2:
        if list1.val <= list2.val:
            curr.next = list1
            list1 = list1.next
        else:
            curr.next = list2
            list2 = list2.next
        curr = curr.next
        
    curr.next = list1 if list1 else list2
    return dummy.next
\`\`\`

##### Java
\`\`\`java
public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
    ListNode dummy = new ListNode(-1);
    ListNode curr = dummy;
    
    while (list1 != null && list2 != null) {
        if (list1.val <= list2.val) {
            curr.next = list1;
            list1 = list1.next;
        } else {
            curr.next = list2;
            list2 = list2.next;
        }
        curr = curr.next;
    }
    
    curr.next = (list1 != null) ? list1 : list2;
    return dummy.next;
}
\`\`\`

##### C++
\`\`\`cpp
ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
    ListNode dummy(-1);
    ListNode* curr = &dummy;
    
    while (list1 && list2) {
        if (list1->val <= list2->val) {
            curr->next = list1;
            list1 = list1->next;
        } else {
            curr->next = list2;
            list2 = list2->next;
        }
        curr = curr->next;
    }
    
    curr->next = list1 ? list1 : list2;
    return dummy.next;
}
\`\`\`

##### TypeScript
\`\`\`typescript
function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
  const dummy = new ListNode(-1); // Anchored dummy
  let curr = dummy;

  while (list1 !== null && list2 !== null) {
    if (list1.val <= list2.val) {
      curr.next = list1;
      list1 = list1.next;
    } else {
      curr.next = list2;
      list2 = list2.next;
    }
    curr = curr.next;
  }

  // If one list is longer, attach the rest of it
  curr.next = list1 !== null ? list1 : list2;

  return dummy.next; // Return actual head
}
\`\`\`

##### Trace Table of variables for merging L1: [1, 3] and L2: [2, 4]

| Step | L1 Node | L2 Node | Comparison | Action taken | New List Layout (from Dummy) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **0** | \`[1]\` | \`[2]\` | Initial State | Dummy is set | \`dummy -> null\` |
| **1** | \`[1]\` | \`[2]\` | \`1 <= 2\` (True) | Point \`curr.next\` to L1. Move L1. | \`dummy -> [1]\` |
| **2** | \`[3]\` | \`[2]\` | \`3 <= 2\` (False) | Point \`curr.next\` to L2. Move L2. | \`dummy -> [1] -> [2]\` |
| **3** | \`[3]\` | \`[4]\` | \`3 <= 4\` (True) | Point \`curr.next\` to L1. Move L1. | \`dummy -> [1] -> [2] -> [3]\` |
| **4** | \`null\` | \`[4]\` | L1 is null | Attach remaining L2. Break loop. | \`dummy -> [1] -> [2] -> [3] -> [4]\` |

We return \`dummy.next\` which is node \`[1]\`!

---

### Pattern 3: Node Deletion in \`O(1)\` Time

What if you are asked to delete a node from a singly linked list, but you are **only** given a reference to that specific node (not the head)?
Since it is a singly linked list, you cannot find the previous node to bypass the current node.

* **The Trick**: Copy the data from the next node into the current node, then delete the next node!
* **Example**: To delete node \`[3]\` in \`1 -> 2 -> [3] -> 4 -> 5\`:
  1. Copy value \`4\` into node \`[3]\` (making it \`1 -> 2 -> [4] -> 4 -> 5\`).
  2. Skip the next node: \`node.next = node.next.next\`.
  3. Result: \`1 -> 2 -> 4 -> 5\`.

##### Python
\`\`\`python
def deleteNode(node: ListNode) -> None:
    # Copy next node's value
    node.val = node.next.val
    # Skip next node
    node.next = node.next.next
\`\`\`

##### Java
\`\`\`java
public void deleteNode(ListNode node) {
    // Copy next node's value
    node.val = node.next.val;
    // Skip next node
    node.next = node.next.next;
}
\`\`\`

##### C++
\`\`\`cpp
void deleteNode(ListNode* node) {
    // Copy next node's value
    node->val = node->next->val;
    // Skip next node
    ListNode* temp = node->next;
    node->next = node->next->next;
    delete temp; // Free memory
}
\`\`\`

##### TypeScript
\`\`\`typescript
function deleteNode(node: ListNode): void {
  // Copy next node's value
  node.val = node.next!.val;
  // Skip next node
  node.next = node.next!.next;
}
\`\`\`

---

## Common Interview Pitfalls and Debugging Strategies

1. **The Null Pointer Dereference**:
   * **Symptom**: \`TypeError: Cannot read properties of null (reading 'next')\` or \`AttributeError: 'NoneType' object has no attribute 'next'\`.
   * **Cause**: You attempted to access \`curr.next\` or \`curr.next.next\` when \`curr\` or \`curr.next\` is already \`null\`.
   * **Fix**: Always verify that the node itself is not null in your loop condition before inspecting its pointers: \`while curr and curr.next:\`.

2. **Losing the Rest of the List**:
   * **Symptom**: Your code returns only the first node or a subset of nodes.
   * **Cause**: You re-assigned a node's pointer before saving the rest of the list.
   * **Fix**: Introduce temporary variables to store references to child nodes *before* you change any pointer addresses.

3. **Infinite Loops (Cycle Creation)**:
   * **Symptom**: Your code runs forever and times out.
   * **Cause**: You pointed a node back to a node that precedes it in the sequence.
   * **Fix**: Trace your pointers using a piece of paper. Draw box nodes with pointers and physically redirect them to see if you create closed cycles.

---

## Interactive Practice Problems

Confirm your linked list mastery on our platform:
* [Reverse Linked List](/problem/reverse-linked-list) — Swap pointers in-place to reverse direction.
* [Linked List Cycle](/problem/linked-list-cycle) — Implement tortoise and hare pointer collision logic.
* [Merge Two Sorted Lists](/problem/merge-two-sorted-lists) — Build the dummy node iteration pattern.
`;
