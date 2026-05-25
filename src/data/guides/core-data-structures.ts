export const content = `
# Core Data Structures Overview

## Introduction: The Magical Toy Playroom

Imagine you walk into a toy room where all the Lego blocks, storybooks, teddy bears, and crayons are thrown in a big messy pile on the floor. If you want to find your favorite blue Lego brick, you have to search through the whole pile! That takes a lot of time and makes you tired.

To make it tidy and fast to find things, you use different organizers: a row of cubbies, a treasure chest, a label book, a stack of plates, or a line for a water slide.

In computers, **Data Structures** are exactly these drawers, cupboards, and baskets! They are clever ways we arrange information in computer memory (RAM) so we can find, add, or remove things super fast. 

Choosing the right container means your program can find information instantly (\`O(1)\` complexity), while selecting the wrong one means your program has to search through a giant messy pile, wasting time and computing cycles (\`O(n)\` complexity).

Let us explore the 6 fundamental data structures every programmer must master, explained with simple analogies that even an 8-year-old can master, packed with complexity analysis, and complete with implementation templates in Python, Java, C++, and TypeScript!

---

## 1. Array (The Cubby Row)

### Analogy: The Cubby Row
![Array Analogy - The Cubby Row](https://dkebbjneobjtmuzzrsdo.supabase.co/storage/v1/object/public/guides/fundamental/array.webp)

Imagine a long row of toy cubbies glued together in a straight line. Each cubby has a number: 0, 1, 2, 3, and so on.
* **Finding things**: If you know a toy is in cubby #3, you walk straight to it and grab it! It takes just one quick step (\`O(1)\`).
* **Adding things**: What if you want to squeeze a new cubby right in the middle? You can't! Since they are glued together, you have to move all the toys in the cubbies to the right by one slot to make space, which takes a lot of work (\`O(n)\`).
* **Running out of space**: If you fill up all the cubbies and want more, you have to buy a whole new, bigger set of cubbies and copy all your toys over to the new row!

### 💻 Array Deep Dive (For Older Coders)
An **Array** is a contiguous block of memory cells. Contiguous means the cells are placed directly next to each other in memory, with absolutely no gaps.

Because cells are sequential, finding any item is basic math: \`Address = StartAddress + (Index * ElementSize)\`. The CPU does this math in a single step, meaning reading or writing a value by index takes **\`O(1)\` constant time**. This makes arrays the bedrock of modern hardware caching and fast index-based lookups.

However, this static layout has trade-offs. If you want to insert a new element at index \`2\`, you must walk down the row and slide every element after index \`2\` one slot to the right, which takes **\`O(n)\` linear time**. Dynamic arrays (like \`ArrayList\` in Java or \`vector\` in C++) handle resizing automatically by allocating a new, larger block of memory (usually double the current capacity) and copying all elements over when capacity is reached. This resizing operation is expensive but occurs infrequently, resulting in an **\`O(1)\` amortized insertion time** at the end of the array.

### Complexity Profile: Array
| Operation | Time Complexity | Notes / Why |
| :--- | :--- | :--- |
| **Read / Write by Index** | O(1) | Instant lookup via offset math. |
| **Search by Value (Unsorted)** | O(n) | Must scan from beginning to end in the worst case. |
| **Insert / Delete at End** | O(1) (Amortized) | Fast push/pop, occasional memory reallocation. |
| **Insert / Delete in Middle** | O(n) | Must shift all subsequent elements to maintain continuity. |

### Code Implementations: Array

#### Python
\`\`\`python
def scan_array(nums):
    # O(1) read by index, O(n) scan
    total = 0
    for i in range(len(nums)):
        val = nums[i]  # Constant time lookup
        total += val
    return total
\`\`\`

#### Java
\`\`\`java
public class ArrayScan {
    public static int scanArray(int[] nums) {
        int total = 0;
        for (int i = 0; i < nums.length; i++) {
            int val = nums[i]; // Constant time lookup
            total += val;
        }
        return total;
    }
}
\`\`\`

#### C++
\`\`\`cpp
#include <vector>

int scanArray(const std::vector<int>& nums) {
    int total = 0;
    for (size_t i = 0; i < nums.size(); ++i) {
        int val = nums[i]; // Constant time lookup
        total += val;
    }
    return total;
}
\`\`\`

#### TypeScript
\`\`\`typescript
function scanArray(nums: number[]): number {
  let total = 0;
  for (let i = 0; i < nums.length; i++) {
    const val = nums[i]; // Constant time lookup
    total += val;
  }
  return total;
}
\`\`\`

---

## 2. Linked List (The Clue Bottle Treasure Hunt)

### Analogy: The Treasure Hunt List
![Linked List Analogy - The Treasure Hunt List](https://dkebbjneobjtmuzzrsdo.supabase.co/storage/v1/object/public/guides/fundamental/fundamental-linkelist.webp)

Imagine you are on a birthday treasure hunt! You start at the first clue card under the big oak tree (we call this the **Head**). The clue card doesn't have the treasure, but it has a note saying: *"Go look inside the microwave."* You run to the microwave, find card #2, which says: *"Go look under the bed."*
* **The Chain**: In a computer, we call each clue card location a **Node**. Each node holds a toy (the **Data**) and a note showing where the next node is hidden (the **Next Pointer**).
* **Finding things**: To find the 5th toy, you *must* start at the first card and follow them one by one. You cannot skip! That takes time (\`O(n)\`).
* **Adding/Removing**: It is super easy to add a new clue card in the middle! You don't slide any toys around. You just rewrite the note on one card to point to your new card, and make your new card point to the next one. It takes just one quick step (\`O(1)\`).

### 💻 Linked List Deep Dive (For Older Coders)
A **Linked List** is a non-contiguous sequence of **Nodes**. Each node contains a value (the data) and a pointer reference (\`next\`) containing the memory address of the next node. Because nodes are scattered anywhere in memory, we do not have index offsets. Accessing the N-th node requires traversing the links sequentially from the head, resulting in **\`O(n)\` linear access time**.

The huge advantage of linked lists is pointer flexibility. If you want to insert or delete a node in the middle, you do not shift memory. You simply re-route pointers: make node A point to the new node C, and make node C point to node B. This makes insertions and deletions **\`O(1)\` constant time** once you have a pointer to the location, making them popular for queue back-ends and buffer implementations.

### Complexity Profile: Linked List
| Operation | Time Complexity | Notes / Why |
| :--- | :--- | :--- |
| **Access / Search by Index** | O(n) | Must traverse sequentially node-by-node. |
| **Insert / Delete at Head** | O(1) | Instant link update, no elements shifted. |
| **Insert / Delete at Pointer** | O(1) | Re-routing references takes constant steps. |

### Code Implementations: Linked List

#### Python
\`\`\`python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverseList(head: ListNode) -> ListNode:
    # Reverse pointers in O(1) auxiliary space
    prev = None
    curr = head
    while curr:
        nxt = curr.next  # Save reference to next node
        curr.next = prev # Reverse the link
        prev = curr      # Move prev forward
        curr = nxt       # Move curr forward
    return prev
\`\`\`

#### Java
\`\`\`java
public class ListNode {
    int val;
    ListNode next;
    ListNode(int val) { this.val = val; }
}

class LinkedListSolver {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode nxt = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nxt;
        }
        return prev;
    }
}
\`\`\`

#### C++
\`\`\`cpp
struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

class LinkedListSolver {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode* prev = nullptr;
        ListNode* curr = head;
        while (curr != nullptr) {
            ListNode* nxt = curr->next;
            curr->next = prev;
            prev = curr;
            curr = nxt;
        }
        return prev;
    }
};
\`\`\`

#### TypeScript
\`\`\`typescript
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  let curr = head;
  while (curr !== null) {
    const nxt: ListNode | null = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nxt;
  }
  return prev;
}
\`\`\`

---

## 3. Hash Map / HashSet (The Magical Label Book)

### Analogy: The Magical Toy Label Book
![Hash Map Analogy - The Magical Toy Label Book](https://dkebbjneobjtmuzzrsdo.supabase.co/storage/v1/object/public/guides/fundamental/fundatmenta-hasmap.webp)

Imagine you have a magical notebook. Whenever you want to store a toy's secret hiding spot, you write the toy's name (the **Key**, like *"Teddy Bear"*) on a page, and next to it, you write where it is (the **Value**, like *"Under the bed"*).
* **Magical Lookup**: When you want to find your Teddy Bear, you don't flip through page 1, page 2, page 3... You just say the magic word: *"Teddy Bear!"* and the book instantly flies open to the exact page (\`O(1)\`). It takes only one quick step!
* **Oops, a Collision!**: Sometimes, the magic spell tries to put two different toys on the same page. We call this a **Collision** (like two kids trying to sit on the same chair!). When this happens, the book has them share the page by making a little chain of toys on that page.

### 💻 Hash Map Deep Dive (For Older Coders)
A **Hash Map** (or Dictionary) maps keys to values using a mathematical formula called a **Hash Function**. The hash function takes your key (like a string of characters) and converts it into a numerical index. It then reads or writes the value at that specific index in a backing array. This index mapping takes **\`O(1)\` average time** for lookups, insertions, and deletions.

What if two different keys generate the same number? This is called a **Hash Collision**. Modern hash maps handle this by creating chains (linked lists or red-black trees) inside each index bucket. If your hash function is poor or your map is crowded (high load factor), many items end up in the same bucket, degrading lookup times to **\`O(n)\` worst-case time**.

### Complexity Profile: Hash Map
| Operation | Time Complexity | Notes / Why |
| :--- | :--- | :--- |
| **Lookup Key Value** | O(1) | Hash function maps key directly to bucket index (average). |
| **Insert Key-Value Pair** | O(1) | Computes hash and appends to bucket. |
| **Delete Key Entry** | O(1) | Locates index bucket and removes element. |
| **Worst-Case Operations** | O(n) | Occurs during hash collision storms when many keys map to the same bucket. |

### Code Implementations: Hash Map

#### Python
\`\`\`python
def two_sum_hash(nums, target):
    # O(n) time, O(n) space
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []
\`\`\`

#### Java
\`\`\`java
import java.util.HashMap;
import java.util.Map;

public class HashSolver {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (seen.containsKey(complement)) {
                return new int[] { seen.get(complement), i };
            }
            seen.put(nums[i], i);
        }
        return new int[] {};
    }
}
\`\`\`

#### C++
\`\`\`cpp
#include <vector>
#include <unordered_map>

class HashSolver {
public:
    std::vector<int> twoSum(std::vector<int>& nums, int target) {
        std::unordered_map<int, int> seen;
        for (int i = 0; i < nums.size(); ++i) {
            int complement = target - nums[i];
            if (seen.find(complement) != seen.end()) {
                return {seen[complement], i};
            }
            seen[nums[i]] = i;
        }
        return {};
    }
};
\`\`\`

#### TypeScript
\`\`\`typescript
function twoSumHash(nums: number[], target: number): number[] {
  const seen = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) {
      return [seen.get(complement)!, i];
    }
    seen.set(nums[i], i);
  }
  return [];
}
\`\`\`

---

## 4. Stack (The Waffle / Pancake Tower)

### Analogy: The Waffle Pancake Tower
![Stack Analogy - The Waffle Pancake Tower](https://dkebbjneobjtmuzzrsdo.supabase.co/storage/v1/object/public/guides/fundamental/fundamental-stack.webp)

Imagine a high stack of warm, delicious chocolate-chip pancakes!
* **Adding**: When you cook a new pancake, you place it on the very top of the pile (we call this **Push**).
* **Removing**: When you want to eat one, you must take the pancake sitting on the very top of the pile (we call this **Pop**).
* **The Rule**: If you try to pull a pancake out from the middle or the bottom, the whole tower collapses! In computer science, we call this **Last-In, First-Out (LIFO)**. The last pancake made is the very first one you eat!

### 💻 Stack Deep Dive (For Older Coders)
A **Stack** is a linear structure governed by the **Last-In, First-Out (LIFO)** rule. The last element pushed onto the stack is the first element popped off. Because all operations are restricted to the head of the list, both \`push\` and \`pop\` execute in **\`O(1)\` constant time**.

Stacks are critical in computers. The CPU uses a "Call Stack" to track active functions and local variables. In algorithms, stacks are used to parse matching brackets, reverse histories (like the browser back button), evaluate calculator formulas, and implement **Monotonic Stacks** (retaining sorted order to identify next greater elements).

### Complexity Profile: Stack
| Operation | Time Complexity | Notes / Why |
| :--- | :--- | :--- |
| **Push (Insert at Top)** | O(1) | Pushed directly onto top level. |
| **Pop (Remove from Top)** | O(1) | Removed from top level. |
| **Peek (View Top Element)** | O(1) | Inspects top level without removal. |
| **Access / Search Middle** | O(n) | Requires popping all elements above it. |

### Code Implementations: Stack

#### Python
\`\`\`python
def isValidParentheses(s: str) -> bool:
    stack = []
    mapping = {")": "(", "}": "{", "]": "["}
    for char in s:
        if char in mapping:
            top = stack.pop() if stack else '#'
            if mapping[char] != top:
                return False
        else:
            stack.append(char)
    return len(stack) == 0
\`\`\`

#### Java
\`\`\`java
import java.util.Stack;

public class StackSolver {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == ')' && !stack.isEmpty() && stack.peek() == '(') {
                stack.pop();
            } else if (c == '}' && !stack.isEmpty() && stack.peek() == '{') {
                stack.pop();
            } else if (c == ']' && !stack.isEmpty() && stack.peek() == '[') {
                stack.pop();
            } else {
                stack.push(c);
            }
        }
        return stack.isEmpty();
    }
}
\`\`\`

#### C++
\`\`\`cpp
#include <string>
#include <stack>

class StackSolver {
public:
    bool isValid(std::string s) {
        std::stack<char> st;
        for (char c : s) {
            if (c == '(' || c == '{' || c == '[') {
                st.push(c);
            } else {
                if (st.empty()) return false;
                if (c == ')' && st.top() != '(') return false;
                if (c == '}' && st.top() != '{') return false;
                if (c == ']' && st.top() != '[') return false;
                st.pop();
            }
        }
        return st.empty();
    }
};
\`\`\`

#### TypeScript
\`\`\`typescript
function isValidParentheses(s: string): boolean {
  const stack: string[] = [];
  const mapping: Record<string, string> = { ")": "(", "}": "{", "]": "[" };
  for (const char of s) {
    if (char in mapping) {
      const top = stack.length > 0 ? stack.pop() : "#";
      if (mapping[char] !== top) {
        return false;
      }
    } else {
      stack.push(char);
    }
  }
  return stack.length === 0;
}
\`\`\`

---

## 5. Queue (The Giant Water Slide Line)

### Analogy: The Water Slide Line
![Queue Analogy - The Water Slide Line](https://dkebbjneobjtmuzzrsdo.supabase.co/storage/v1/object/public/guides/fundamental/queue.webp)

Imagine you and your friends are waiting in a line for the giant, awesome water slide at the park!
* **Sliding down**: The kid standing at the very front of the line gets to go down the slide first (we call this **Dequeue**).
* **Waiting in line**: When a new kid arrives, they have to walk to the very back of the line (we call this **Enqueue**). No cutting in the middle is allowed!
* **The Rule**: In computer science, we call this **First-In, First-Out (FIFO)**. The first kid who gets in line is the first one who gets to slide!

### 💻 Queue Deep Dive (For Older Coders)
A **Queue** is a linear structure based on the **First-In, First-Out (FIFO)** principle. The first item inserted is the first item removed. Queues support two main operations: \`enqueue\` (adding to the back) and \`dequeue\` (removing from the front), both taking **\`O(1)\` time**.

Queues are used in asynchronous environments (buffers, print jobs, routing systems) to schedule tasks fairly. In algorithm interviews, queues are the central structure for performing a **Breadth-First Search (BFS)** traversal on trees and graphs, allowing nodes to be visited layer-by-layer in concentric circles.

### Complexity Profile: Queue
| Operation | Time Complexity | Notes / Why |
| :--- | :--- | :--- |
| **Enqueue (Insert at Rear)** | O(1) | Enters the back of the queue. |
| **Dequeue (Remove from Front)** | O(1) | Exits the front of the queue. |
| **Peek Front Element** | O(1) | Inspects the next element to dequeue. |
| **Access / Search Middle** | O(n) | Requires dequeuing items in front. |

### Code Implementations: Queue

#### Python
\`\`\`python
from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def levelOrder(root: TreeNode) -> list[list[int]]:
    if not root:
        return []
    result = []
    queue = deque([root])  # Double-ended queue for O(1) pops
    
    while queue:
        level_size = len(queue)
        current_level = []
        for _ in range(level_size):
            node = queue.popleft()  # Dequeue from front
            current_level.append(node.val)
            if node.left:
                queue.append(node.left)  # Enqueue left child
            if node.right:
                queue.append(node.right) # Enqueue right child
        result.append(current_level)
    return result
\`\`\`

#### Java
\`\`\`java
import java.util.*;

public class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
}

class QueueSolver {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;
        Queue<TreeNode> queue = new LinkedList<>();
        queue.add(root);
        
        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            List<Integer> currentLevel = new ArrayList<>();
            for (int i = 0; i < levelSize; i++) {
                TreeNode node = queue.poll(); // Dequeue
                currentLevel.add(node.val);
                if (node.left != null) queue.add(node.left);
                if (node.right != null) queue.add(node.right);
            }
            result.add(currentLevel);
        }
        return result;
    }
}
\`\`\`

#### C++
\`\`\`cpp
#include <vector>
#include <queue>

struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
};

class QueueSolver {
public:
    std::vector<std::vector<int>> levelOrder(TreeNode* root) {
        std::vector<std::vector<int>> result;
        if (!root) return result;
        std::queue<TreeNode*> q;
        q.push(root);
        
        while (!q.empty()) {
            int levelSize = q.size();
            std::vector<int> currentLevel;
            for (int i = 0; i < levelSize; ++i) {
                TreeNode* node = q.front();
                q.pop(); // Dequeue
                currentLevel.push_back(node->val);
                if (node->left) q.push(node->left);
                if (node->right) q.push(node->right);
            }
            result.push_back(currentLevel);
        }
        return result;
    }
};
\`\`\`

#### TypeScript
\`\`\`typescript
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

function levelOrder(root: TreeNode | null): number[][] {
  if (!root) return [];
  const result: number[][] = [];
  const queue: TreeNode[] = [root];
  
  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel: number[] = [];
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()!; // Dequeue from front
      currentLevel.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(currentLevel);
  }
  return result;
}
\`\`\`

---

## 6. Heap / Priority Queue (The Priority Line)

### Analogy: The Amusement Park VIP Line
![Heap Analogy - The Priority Line](https://dkebbjneobjtmuzzrsdo.supabase.co/storage/v1/object/public/guides/fundamental/heap-prioriy.webp)

Imagine you are at the doctor's office waiting room. A kid with a tiny papercut gets there first and sits down. But suddenly, another kid with a broken arm runs in. Even though the papercut kid was first, the doctor helps the broken-arm kid first because it is a bigger emergency!
* **Importance First**: A **Heap** is a special line where the most important or urgent item always goes to the front of the line automatically.
* **Min-Heap vs. Max-Heap**: In a **Min-Heap**, the smallest number is treated as the most important and stays at the top. In a **Max-Heap**, the biggest number is at the top.
* **Bubble and Slide**: Whenever you add a new item or remove the top one, the items slide up or down like a kid on a slide until everyone is in the correct order of importance!

### 💻 Heap Deep Dive (For Older Coders)
A **Heap** is a specialized tree structure (usually a complete binary tree stored inside an array) that maintains the "Heap Property". In a **Min-Heap**, the parent node is always smaller than or equal to its child nodes, putting the absolute minimum value at the root. In a **Max-Heap**, the parent is always larger, putting the maximum at the root.

We can peek at the minimum or maximum instantly in **\`O(1)\` time**. However, extracting it or inserting a new element requires restoring the tree order. The element moves up or down the height of the tree (sifting), which takes **\`O(log n)\` logarithmic time**. Heaps are the default tool for scheduling processes, finding K-th largest values, and merging sorted data streams.

### Complexity Profile: Heap
| Operation | Time Complexity | Notes / Why |
| :--- | :--- | :--- |
| **Peek Min / Max** | O(1) | Root element is always minimum or maximum. |
| **Insert Element** | O(log n) | Element is inserted at end, then sifted up. |
| **Pop Min / Max** | O(log n) | Swaps root with last element, then sifts down. |
| **Build Heap (from Array)** | O(n) | Bottom-up heapify runs in linear time. |

### Code Implementations: Heap

#### Python
\`\`\`python
import heapq
from collections import Counter

def topKFrequent(nums: list[int], k: int) -> list[int]:
    # Count frequencies O(n)
    counts = Counter(nums)
    
    # Maintain a min-heap of size K -> O(n log k) time
    heap = []
    for num, freq in counts.items():
        heapq.heappush(heap, (freq, num))
        if len(heap) > k:
            heapq.heappop(heap) # Pop element with lowest frequency
            
    return [item[1] for item in heap]
\`\`\`

#### Java
\`\`\`java
import java.util.*;

class HeapSolver {
    public int[] topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> count = new HashMap<>();
        for (int n: nums) {
            count.put(n, count.getOrDefault(n, 0) + 1);
        }

        // Min-heap based on frequency
        PriorityQueue<Integer> heap = new PriorityQueue<>((n1, n2) -> count.get(n1) - count.get(n2));

        for (int n: count.keySet()) {
            heap.add(n);
            if (heap.size() > k) heap.poll(); // Remove least frequent
        }

        int[] top = new int[k];
        for(int i = k - 1; i >= 0; --i) {
            top[i] = heap.poll();
        }
        return top;
    }
}
\`\`\`

#### C++
\`\`\`cpp
#include <vector>
#include <unordered_map>
#include <queue>

class HeapSolver {
public:
    std::vector<int> topKFrequent(std::vector<int>& nums, int k) {
        std::unordered_map<int, int> counts;
        for (int num : nums) counts[num]++;

        // Min-heap storing pairs: {frequency, num}
        std::priority_queue<std::pair<int, int>, std::vector<std::pair<int, int>>, std::greater<std::pair<int, int>>> heap;

        for (auto& entry : counts) {
            heap.push({entry.second, entry.first});
            if (heap.size() > k) {
                heap.pop(); // Remove least frequent
            }
        }

        std::vector<int> result;
        while (!heap.empty()) {
            result.push_back(heap.top().second);
            heap.pop();
        }
        return result;
    }
};
\`\`\`

#### TypeScript
\`\`\`typescript
// Mock implementation of a Min-Heap element mapping in JS/TS
function topKFrequent(nums: number[], k: number): number[] {
  const counts = new Map<number, number>();
  for (const num of nums) {
    counts.set(num, (counts.get(num) || 0) + 1);
  }

  // Sorting array of entries (simple workaround for missing JS built-in heap)
  const sorted = Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
  return sorted.slice(0, k).map(entry => entry[0]);
}
\`\`\`

---

## Summary Comparison Cheat Sheet

Each data structure occupies a specific niche. There is no "perfect" container — only the correct container for your specific read, write, and search requirements. Review this high-level cheat sheet to quickly identify which tool fits your algorithm best:

| Data Structure | Access (Index) | Search (Value) | Insertion (Avg) | Deletion (Avg) |
| :--- | :--- | :--- | :--- | :--- |
| **Array** | O(1) | O(n) | O(n) | O(n) |
| **Linked List** | O(n) | O(n) | O(1) | O(1) |
| **Hash Map** | — | O(1) | O(1) | O(1) |
| **Stack** | — | — | O(1) | O(1) |
| **Queue** | — | — | O(1) | O(1) |
| **Heap** | — | O(1) (Peek) | O(log n) | O(log n) |

Before starting any coding interview challenge, ask yourself: *How is data being written, read, and deleted?* If search speed is critical, use a **Hash Map**. If memory locality and direct index iteration are priority, use an **Array**. If you are modeling recursive processes or nesting, pick a **Stack**. Master these patterns, and your data structure choice will become second nature!

---

## Practice Problems & Website Verifications

Confirm your understanding of core data structures by practicing these problems:
* [Two Sum](/problem/two-sum) — Utilize a Hash Map for fast value checks.
* [Valid Parentheses](/problem/valid-parentheses) — Practice LIFO stack checking on nested characters.
`;
