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

\`\`\`stack
[10, 20]
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

[Visualize Valid Parentheses in the Interactive Simulator](viz:valid-parentheses)

#### Complete Implementations

##### Python
\`\`\`python
def isValid(s: str) -> bool:
    stack = []
    # Map each right sock to its corresponding left sock
    mapping = {")": "(", "}": "{", "]": "["}
    
    for char in s:
        if char in mapping:
            # It's a closing bracket (Right sock)! 
            # Pop the top of the stack if it exists, otherwise use a dummy '#'
            top_element = stack.pop() if stack else '#'
            # If the popped bracket doesn't match the required left bracket, it's invalid
            if mapping[char] != top_element:
                return False
        else:
            # It's an opening bracket (Left sock)! Throw it onto the stack
            stack.append(char)
            
    # If the stack is perfectly empty at the end, all socks matched!
    return not stack
\`\`\`

##### Java
\`\`\`java
import java.util.Stack;

public class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        
        for (char c : s.toCharArray()) {
            // It's an opening bracket (Left sock)! Throw it onto the stack
            if (c == '(' || c == '{' || c == '[') {
                stack.push(c);
            } else {
                // It's a closing bracket (Right sock)!
                // If the bed is empty, we have a right sock with no left sock. Invalid!
                if (stack.isEmpty()) return false;
                
                // Check if the top left sock matches our current right sock
                char top = stack.pop();
                if (c == ')' && top != '(') return false;
                if (c == '}' && top != '{') return false;
                if (c == ']' && top != '[') return false;
            }
        }
        // If the stack is perfectly empty at the end, all socks matched!
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
            // It's an opening bracket (Left sock)! Throw it onto the stack
            if (c == '(' || c == '{' || c == '[') {
                st.push(c);
            } else {
                // It's a closing bracket (Right sock)!
                // If the bed is empty, we have a right sock with no left sock. Invalid!
                if (st.empty()) return false;
                
                // Check if the top left sock matches our current right sock
                char top = st.top();
                st.pop();
                if (c == ')' && top != '(') return false;
                if (c == '}' && top != '{') return false;
                if (c == ']' && top != '[') return false;
            }
        }
        // If the stack is perfectly empty at the end, all socks matched!
        return st.empty();
    }
};
\`\`\`

##### TypeScript
\`\`\`typescript
function isValid(s: string): boolean {
  const stack: string[] = [];
  // Map each right sock to its corresponding left sock
  const mapping: Record<string, string> = {
    ")": "(",
    "}": "{",
    "]": "[",
  };

  for (const char of s) {
    if (char in mapping) {
      // It's a closing bracket (Right sock)! 
      // Pop the top of the stack if it exists, otherwise use a dummy '#'
      const top = stack.pop() || "#";
      // If the popped bracket doesn't match the required left bracket, it's invalid
      if (mapping[char] !== top) {
        return false;
      }
    } else {
      // It's an opening bracket (Left sock)! Throw it onto the stack
      stack.push(char);
    }
  }

  // If the stack is perfectly empty at the end, all socks matched!
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
        # The secondary stack to keep track of the minimum at every level
        self.min_stack = []

    def push(self, val: int) -> None:
        self.stack.append(val)
        # Push the minimum between the new value and the current minimum
        if not self.min_stack or val <= self.min_stack[-1]:
            self.min_stack.append(val)
        else:
            self.min_stack.append(self.min_stack[-1])

    def pop(self) -> None:
        # Pop from both stacks to keep them perfectly synced!
        self.stack.pop()
        self.min_stack.pop()

    def top(self) -> int:
        return self.stack[-1]

    def getMin(self) -> int:
        # The top of the min_stack is ALWAYS the minimum value
        return self.min_stack[-1]
\`\`\`

##### Java
\`\`\`java
import java.util.Stack;

class MinStack {
    private Stack<Integer> stack = new Stack<>();
    // The secondary stack to keep track of the minimum at every level
    private Stack<Integer> minStack = new Stack<>();

    public void push(int val) {
        stack.push(val);
        // Push the minimum between the new value and the current minimum
        if (minStack.isEmpty() || val <= minStack.peek()) {
            minStack.push(val);
        } else {
            minStack.push(minStack.peek());
        }
    }

    public void pop() {
        // Pop from both stacks to keep them perfectly synced!
        stack.pop();
        minStack.pop();
    }

    public int top() {
        return stack.peek();
    }

    public int getMin() {
        // The top of the minStack is ALWAYS the minimum value
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
    // The secondary stack to keep track of the minimum at every level
    std::stack<int> minSt;

public:
    void push(int val) {
        st.push(val);
        // Push the minimum between the new value and the current minimum
        if (minSt.empty() || val <= minSt.top()) {
            minSt.push(val);
        } else {
            minSt.push(minSt.top());
        }
    }

    void pop() {
        // Pop from both stacks to keep them perfectly synced!
        st.pop();
        minSt.pop();
    }

    int top() {
        return st.top();
    }

    int getMin() {
        // The top of the minSt is ALWAYS the minimum value
        return minSt.top();
    }
};
\`\`\`

##### TypeScript
\`\`\`typescript
class MinStack {
  private stack: number[] = [];
  // The secondary stack to keep track of the minimum at every level
  private minStack: number[] = [];

  push(val: number): void {
    this.stack.push(val);
    // Push the minimum between the new value and the current minimum
    if (this.minStack.length === 0 || val <= this.getMin()) {
      this.minStack.push(val);
    } else {
      this.minStack.push(this.getMin());
    }
  }

  pop(): void {
    // Pop from both stacks to keep them perfectly synced!
    this.stack.pop();
    this.minStack.pop();
  }

  top(): number {
    return this.stack[this.stack.length - 1];
  }

  getMin(): number {
    // The top of the minStack is ALWAYS the minimum value
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
    # Initialize result array with -1 (meaning "not found yet")
    result = [-1] * len(nums)
    stack = []  # Stores indices of the elements, NOT the values!
    
    # Loop through all elements from left to right
    for i in range(len(nums)):
        # While our stack is not empty AND the current person is TALLER 
        # than the person represented by the index at the top of the stack:
        while stack and nums[i] > nums[stack[-1]]:
            # We found the next greater element for the person at 'prev_idx'!
            prev_idx = stack.pop()
            result[prev_idx] = nums[i]
            
        # Push the current person's index onto the stack to find their next greater element later
        stack.append(i)
        
    return result
\`\`\`

##### Java
\`\`\`java
import java.util.Arrays;
import java.util.Stack;

public class Solution {
    public int[] nextGreaterElement(int[] nums) {
        // Initialize result array with -1 (meaning "not found yet")
        int[] result = new int[nums.length];
        Arrays.fill(result, -1);
        Stack<Integer> stack = new Stack<>(); // Stores indices of the elements, NOT the values!
        
        // Loop through all elements from left to right
        for (int i = 0; i < nums.length; i++) {
            // While our stack is not empty AND the current person is TALLER 
            // than the person represented by the index at the top of the stack:
            while (!stack.isEmpty() && nums[i] > nums[stack.peek()]) {
                // We found the next greater element for the person at 'prevIdx'!
                int prevIdx = stack.pop();
                result[prevIdx] = nums[i];
            }
            // Push the current person's index onto the stack to find their next greater element later
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
        // Initialize result array with -1 (meaning "not found yet")
        std::vector<int> result(nums.size(), -1);
        std::stack<int> st; // Stores indices of the elements, NOT the values!
        
        // Loop through all elements from left to right
        for (int i = 0; i < nums.size(); ++i) {
            // While our stack is not empty AND the current person is TALLER 
            // than the person represented by the index at the top of the stack:
            while (!st.empty() && nums[i] > nums[st.top()]) {
                // We found the next greater element for the person at 'prevIdx'!
                int prevIdx = st.top();
                st.pop();
                result[prevIdx] = nums[i];
            }
            // Push the current person's index onto the stack to find their next greater element later
            st.push(i);
        }
        return result;
    }
};
\`\`\`

##### TypeScript
\`\`\`typescript
function nextGreaterElement(nums: number[]): number[] {
  // Initialize result array with -1 (meaning "not found yet")
  const result: number[] = new Array(nums.length).fill(-1);
  const stack: number[] = []; // Stores indices of the elements, NOT the values!

  // Loop through all elements from left to right
  for (let i = 0; i < nums.length; i++) {
    // While our stack is not empty AND the current person is TALLER 
    // than the person represented by the index at the top of the stack:
    while (stack.length > 0 && nums[i] > nums[stack[stack.length - 1]]) {
      // We found the next greater element for the person at 'prevIdx'!
      const prevIdx = stack.pop()!;
      result[prevIdx] = nums[i];
    }
    // Push the current person's index onto the stack to find their next greater element later
    stack.push(i);
  }

  return result;
}
\`\`\`

---

### Pattern 4: Advanced Monotonic Stack (Largest Rectangle in Histogram)

The ultimate test of monotonic stack understanding is calculating the largest rectangular area in a histogram.

#### The Strategy
Imagine a skyline of buildings (the histogram). For any given building, the maximum rectangle that can be formed using its full height is bounded by the first shorter building to its left, and the first shorter building to its right.
1. We maintain a stack of indices, ensuring the heights of these indices remain strictly in **increasing order**.
2. Loop through each bar. If we encounter a bar that is *shorter* than the bar at the top of our stack, we know we have found the **right boundary** for that taller bar!
3. We **pop** the top index. Its height is \`heights[popped_index]\`. Its **left boundary** is the new top of the stack (the nearest shorter bar to the left). Its **right boundary** is our current index \`i\`.
4. We calculate the area: \`height * (right_boundary - left_boundary - 1)\`.
5. We push the current index \`i\` onto the stack and repeat.
6. A dummy height of \`0\` at the end forces all remaining bars in the stack to pop and calculate their areas.

[Visualize Monotonic Stack in the Interactive Simulator](viz:monotonic-stack)

#### Complete Implementations

##### Python
\`\`\`python
def largestRectangleArea(heights: list[int]) -> int:
    max_area = 0
    stack = []  # Stores indices
    
    # We append a 0 to force all remaining bars in the stack to pop at the end
    heights.append(0)
    
    for i in range(len(heights)):
        # While stack is not empty and current bar is shorter than the top of stack
        while stack and heights[i] < heights[stack[-1]]:
            h = heights[stack.pop()]
            # If stack is empty, the width extends from the beginning (0) to i
            w = i if not stack else i - stack[-1] - 1
            max_area = max(max_area, h * w)
            
        stack.append(i)
        
    return max_area
\`\`\`

##### Java
\`\`\`java
import java.util.Stack;

public class Solution {
    public int largestRectangleArea(int[] heights) {
        int maxArea = 0;
        Stack<Integer> stack = new Stack<>();
        
        for (int i = 0; i <= heights.length; i++) {
            int currentHeight = (i == heights.length) ? 0 : heights[i];
            
            // While stack is not empty and current bar is shorter than the top of stack
            while (!stack.isEmpty() && currentHeight < heights[stack.peek()]) {
                int h = heights[stack.pop()];
                // If stack is empty, the width extends from the beginning (0) to i
                int w = stack.isEmpty() ? i : i - stack.peek() - 1;
                maxArea = Math.max(maxArea, h * w);
            }
            stack.push(i);
        }
        
        return maxArea;
    }
}
\`\`\`

##### C++
\`\`\`cpp
#include <vector>
#include <stack>
#include <algorithm>

class Solution {
public:
    int largestRectangleArea(std::vector<int>& heights) {
        int maxArea = 0;
        std::stack<int> st;
        
        for (int i = 0; i <= heights.size(); i++) {
            int currentHeight = (i == heights.size()) ? 0 : heights[i];
            
            // While stack is not empty and current bar is shorter than the top of stack
            while (!st.empty() && currentHeight < heights[st.top()]) {
                int h = heights[st.top()];
                st.pop();
                // If stack is empty, the width extends from the beginning (0) to i
                int w = st.empty() ? i : i - st.top() - 1;
                maxArea = std::max(maxArea, h * w);
            }
            st.push(i);
        }
        
        return maxArea;
    }
};
\`\`\`

##### TypeScript
\`\`\`typescript
function largestRectangleArea(heights: number[]): number {
  let maxArea = 0;
  const stack: number[] = [];
  
  for (let i = 0; i <= heights.length; i++) {
    const currentHeight = i === heights.length ? 0 : heights[i];
    
    // While stack is not empty and current bar is shorter than the top of stack
    while (stack.length > 0 && currentHeight < heights[stack[stack.length - 1]]) {
      const h = heights[stack.pop()!];
      // If stack is empty, the width extends from the beginning (0) to i
      const w = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
      maxArea = Math.max(maxArea, h * w);
    }
    stack.push(i);
  }
  
  return maxArea;
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
* [Largest Rectangle in Histogram](/problem/largest-rectangle-in-histogram) — Advanced monotonic stack boundary detection.
`;
