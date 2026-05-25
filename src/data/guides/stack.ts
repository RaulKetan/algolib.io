export const content = `
# Stack Deep Dive & Monotonic Stack Guide

## Introduction: The Super Tall Lego Block Tower

Imagine you are playing on the floor with a big box of colorful Lego blocks. You start building a single, tall tower by snapping blocks on top of each other:
1. You snap a blue block on the table.
2. You snap a yellow block on top of the blue block.
3. You snap a red block on top of the yellow block.

This Lego tower is a perfect physical representation of a **Stack** in computer science!

A Stack is a linear data structure that follows the **Last In, First Out (LIFO)** protocol. This means the block that you put on top last (the red block) is the very first one you have to take off! If you try to pull a block out from the bottom or middle of a tall tower, the whole thing will crash down (*crash-bang!*) and ruin your tower. So you must only take from the top.

Let's compare this to a **Queue** (First In, First Out - FIFO), which is like waiting in a slide line at the playground: the kid who gets in line first goes down the slide first. In a Stack, the last kid to arrive is served first!

### Core Stack Operations
A stack supports three primary operations, which are super fast and run in **\`O(1)\` constant time**:
1. **Push**: Snap a new Lego block onto the top of the tower.
2. **Pop**: Take the topmost Lego block off the tower.
3. **Peek / Top**: Peek at the color of the topmost Lego block without removing it.

\`\`\`
Push(10)      Push(20)      Pop()
 |    |        | 20 |      |    |
 |    |  --->  | 10 | ---> | 10 |
 | 10 |        | 10 |      | 10 |
 ------        ------      ------
\`\`\`

---

## Stack vs. Queue vs. Array

Here is how Stacks stack up against other linear data structures:

| Data Structure | Access / Lookup | Search | Insertion | Deletion | Protocols / Rule |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Stack** | O(1) (Top block only) | O(n) | O(1) (Push) | O(1) (Pop) | LIFO (Last In First Out) |
| **Queue** | O(1) (Front kid only) | O(n) | O(1) (Enqueue) | O(1) (Dequeue) | FIFO (First In First Out) |
| **Array** | O(1) (Direct index) | O(n) | O(n) (O(1) at end) | O(n) (O(1) at end) | Random Access |

### Use Cases of Stacks in Software
Stacks are hidden inside many games and programs you use every day:
* **The Undo Button (Ctrl+Z)**: When you paint or write, every action is pushed onto an \`undo\` stack. When you hit undo, the top action is popped off and erased in reverse order!
* **Syntax Parsing**: Checking if brackets or HTML tags are closed properly (like matching Left and Right Cozy Socks).
* **The System Call Stack**: When a function calls another, the computer pushes variables onto a stack. If a function calls itself too many times without stopping, the tower grows too high and collapses—this is called a **Stack Overflow** error!

---

## Core Algorithmic Patterns and Templates

Let's study the three most common Stack patterns with complete code in Python, Java, C++, and TypeScript.

### Pattern 1: Parentheses & Bracket Validation (The Cozy Socks Matching Game)

Imagine your mom gives you a big pile of cozy winter socks. Each sock is either a **Left Cozy Sock** (like \`(\`, \`[\`, \`{\`) or a **Right Cozy Sock** (like \`)\`, \`]\`, \`}\`). 

As you look through the pile:
1. Every time you see a **Left sock**, you throw it onto a tidy stack on your bed (Push).
2. Every time you see a **Right sock**, you check the top sock of the stack on your bed. It *must* match the Right sock perfectly! (e.g. a right blue sock with a left blue sock).
3. If it matches, you pack them together and remove the left sock from your bed stack (Pop).
4. If it doesn't match, or if you get a right sock but the bed stack is empty, then they are not paired correctly! 
5. At the end, if there are still leftover socks on your bed, the socks are not paired correctly!

#### Complete Implementations

Given a string containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.

#### The Strategy
1. Loop through characters of the string.
2. If we see an opening bracket (\`(\`, \`{\`, \`[\`), **push** it onto the stack.
3. If we see a closing bracket:
   * If the stack is empty, there is no matching opening bracket. Return \`false\`.
   * **Pop** the top element from the stack and verify it matches the closing bracket type. If not, return \`false\`.
4. After the loop, if the stack is empty, return \`true\` (all brackets closed). Otherwise, return \`false\` (some opening brackets remained unclosed).

#### Complete Implementations

##### Python
\`\`\`python
def isValid(s: str) -> bool:
    stack = []
    mapping = {")": "(", "}": "{", "]": "["}
    
    for char in s:
        if char in mapping:
            # Closing bracket
            top_element = stack.pop() if stack else '#'
            if mapping[char] != top_element:
                return False
        else:
            # Opening bracket
            stack.append(char)
            
    return not stack
\`\`\`

##### Java
\`\`\`java
import java.util.Stack;

public class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        
        for (char c : s.toCharArray()) {
            if (c == '(' || c == '{' || c == '[') {
                stack.push(c);
            } else {
                if (stack.isEmpty()) return false;
                char top = stack.pop();
                if (c == ')' && top != '(') return false;
                if (c == '}' && top != '{') return false;
                if (c == ']' && top != '[') return false;
            }
        }
        return stack.isEmpty();
    }
}
\`\`\`

##### C++
\`\`\`cpp
#include <string>
#include <stack>

class Solution {
public:
    bool isValid(std::string s) {
        std::stack<char> st;
        for (char c : s) {
            if (c == '(' || c == '{' || c == '[') {
                st.push(c);
            } else {
                if (st.empty()) return false;
                char top = st.top();
                st.pop();
                if (c == ')' && top != '(') return false;
                if (c == '}' && top != '{') return false;
                if (c == ']' && top != '[') return false;
            }
        }
        return st.empty();
    }
};
\`\`\`

##### TypeScript
\`\`\`typescript
function isValid(s: string): boolean {
  const stack: string[] = [];
  const mapping: Record<string, string> = {
    ")": "(",
    "}": "{",
    "]": "[",
  };

  for (const char of s) {
    if (char in mapping) {
      const top = stack.pop() || "#";
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

### Pattern 2: Min Stack (Constant Time Min Tracking)

Design a stack that supports push, pop, top, and retrieving the minimum element in constant \`O(1)\` time.

#### The Strategy
To get the minimum value in \`O(1)\` time, we cannot scan the stack (which would take \`O(n)\` time). Instead, we use a **secondary helper stack** that keeps track of the minimum value at each stack level.
1. When pushing a value \`X\`, we push it onto the main stack.
2. We push \`min(X, minStack.peek())\` onto our min-tracking stack.
3. When popping, we pop from both stacks.
4. To retrieve the minimum, we simply return the top element of the min-tracking stack.

#### Complete Implementations

##### Python
\`\`\`python
class MinStack:
    def __init__(self):
        self.stack = []
        self.min_stack = []

    def push(self, val: int) -> None:
        self.stack.append(val)
        if not self.min_stack or val <= self.min_stack[-1]:
            self.min_stack.append(val)
        else:
            self.min_stack.append(self.min_stack[-1])

    def pop(self) -> None:
        self.stack.pop()
        self.min_stack.pop()

    def top(self) -> int:
        return self.stack[-1]

    def getMin(self) -> int:
        return self.min_stack[-1]
\`\`\`

##### Java
\`\`\`java
import java.util.Stack;

class MinStack {
    private Stack<Integer> stack = new Stack<>();
    private Stack<Integer> minStack = new Stack<>();

    public void push(int val) {
        stack.push(val);
        if (minStack.isEmpty() || val <= minStack.peek()) {
            minStack.push(val);
        } else {
            minStack.push(minStack.peek());
        }
    }

    public void pop() {
        stack.pop();
        minStack.pop();
    }

    public int top() {
        return stack.peek();
    }

    public int getMin() {
        return minStack.peek();
    }
}
\`\`\`

##### C++
\`\`\`cpp
#include <stack>
#include <algorithm>

class MinStack {
private:
    std::stack<int> st;
    std::stack<int> minSt;

public:
    void push(int val) {
        st.push(val);
        if (minSt.empty() || val <= minSt.top()) {
            minSt.push(val);
        } else {
            minSt.push(minSt.top());
        }
    }

    void pop() {
        st.pop();
        minSt.pop();
    }

    int top() {
        return st.top();
    }

    int getMin() {
        return minSt.top();
    }
};
\`\`\`

##### TypeScript
\`\`\`typescript
class MinStack {
  private stack: number[] = [];
  private minStack: number[] = [];

  push(val: number): void {
    this.stack.push(val);
    if (this.minStack.length === 0 || val <= this.getMin()) {
      this.minStack.push(val);
    } else {
      this.minStack.push(this.getMin());
    }
  }

  pop(): void {
    this.stack.pop();
    this.minStack.pop();
  }

  top(): number {
    return this.stack[this.stack.length - 1];
  }

  getMin(): number {
    return this.minStack[this.minStack.length - 1];
  }
}
\`\`\`

---

### Pattern 3: Monotonic Stack (Next Greater Element)

A **Monotonic Stack** is a stack that maintains its elements in a strictly sorted order (either increasing or decreasing). It is used to solve "Next Greater Element" type queries on range values in \`O(n)\` linear time.

#### The Strategy
Imagine you are standing in a line of people of different heights, looking to the right. For each person, you want to know who is the first person to their right that is taller than them.
1. Loop through the array from left to right.
2. While the stack is not empty and the current element is **greater than** the element corresponding to the index at the top of the stack:
   * We have found the Next Greater Element for the index at the top of the stack!
   * **Pop** the index, write the current element as the answer for that index.
   * Repeat.
3. **Push** the current index onto the stack.

##### Trace Table: \`nums = [2, 1, 2, 4]\`

| Index | Value | Stack State (Indices) | Compare Value with Stack Top Value | Action | Result Array |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **-** | - | \`[]\` | - | Initial State | \`[-1, -1, -1, -1]\` |
| **0** | 2 | \`[0]\` | Stack is empty | Push index 0 | \`[-1, -1, -1, -1]\` |
| **1** | 1 | \`[0, 1]\` | \`1 > nums[0]\` (1 > 2) is False | Push index 1 | \`[-1, -1, -1, -1]\` |
| **2** | 2 | \`[0, 2]\` | \`2 > nums[1]\` (2 > 1) is True | Pop index 1, \`result[1] = 2\`, Push 2 | \`[-1, 2, -1, -1]\` |
| **3** | 4 | \`[]\` | \`4 > nums[2]\` (4 > 2) is True, \`4 > nums[0]\` (4 > 2) is True | Pop index 2, \`result[2] = 4\`, Pop 0, \`result[0] = 4\`, Push 3 | \`[4, 2, 4, -1]\` |

Every element is pushed onto the stack exactly once and popped at most once, which guarantees \`O(n)\` time!

#### Complete Implementations

##### Python
\`\`\`python
def nextGreaterElement(nums: list[int]) -> list[int]:
    result = [-1] * len(nums)
    stack = []  # Stores indices
    
    for i in range(len(nums)):
        while stack and nums[i] > nums[stack[-1]]:
            prev_idx = stack.pop()
            result[prev_idx] = nums[i]
        stack.append(i)
        
    return result
\`\`\`

##### Java
\`\`\`java
import java.util.Arrays;
import java.util.Stack;

public class Solution {
    public int[] nextGreaterElement(int[] nums) {
        int[] result = new int[nums.length];
        Arrays.fill(result, -1);
        Stack<Integer> stack = new Stack<>(); // Stores indices
        
        for (int i = 0; i < nums.length; i++) {
            while (!stack.isEmpty() && nums[i] > nums[stack.peek()]) {
                int prevIdx = stack.pop();
                result[prevIdx] = nums[i];
            }
            stack.push(i);
        }
        return result;
    }
}
\`\`\`

##### C++
\`\`\`cpp
#include <vector>
#include <stack>

class Solution {
public:
    std::vector<int> nextGreaterElement(std::vector<int>& nums) {
        std::vector<int> result(nums.size(), -1);
        std::stack<int> st; // Stores indices
        
        for (int i = 0; i < nums.size(); ++i) {
            while (!st.empty() && nums[i] > nums[st.top()]) {
                int prevIdx = st.top();
                st.pop();
                result[prevIdx] = nums[i];
            }
            st.push(i);
        }
        return result;
    }
};
\`\`\`

##### TypeScript
\`\`\`typescript
function nextGreaterElement(nums: number[]): number[] {
  const result: number[] = new Array(nums.length).fill(-1);
  const stack: number[] = []; // Stores indices

  for (let i = 0; i < nums.length; i++) {
    while (stack.length > 0 && nums[i] > nums[stack[stack.length - 1]]) {
      const prevIdx = stack.pop()!;
      result[prevIdx] = nums[i];
    }
    stack.push(i);
  }

  return result;
}
\`\`\`

---

## Common Interview Pitfalls and Debugging Strategies

Stack programming is simple but has several critical runtime traps:

### 1. Popping from an Empty Stack (Stack Underflow)
* **The Trap**: Calling \`pop()\` or \`peek()\` on an empty stack structure, causing a crash or runtime exception.
* **The Fix**: Always check \`if (!stack.isEmpty())\` or \`if (stack.length > 0)\` before invoking any lookups or deletions.

### 2. Monotonic Stack Index vs. Value Confusions
* **The Trap**: Storing indices in the monotonic stack, but comparing them as values (e.g. \`nums[i] > stack[-1]\` instead of \`nums[i] > nums[stack[-1]]\`).
* **The Fix**: Double-check your array lookups. If your stack stores index coordinates, you must reference the array values: \`nums[stack.top()]\`.

### 3. Stack Overflow in Recursion
* **The Trap**: Writing recursive functions that do not hit a terminating base case, running out of system stack frames.
* **The Fix**: Every recursion path must lead closer to a base case. If recursion depth can exceed ~10,000, rewrite the recursion as an iterative loop utilizing an explicit, heap-allocated Stack structure.

---

## Practice Problems & Website Verifications

Deepen your stack optimization skills by practice solving these problems:
* [Valid Parentheses](/problem/valid-parentheses) — Standard matching brackets using LIFO push/pop.
* [Min Stack](/problem/min-stack) — Retrieve minimum elements in constant time with dual stack configurations.
* [Daily Temperatures](/problem/daily-temperatures) — Apply the monotonic index distance template.
`;
