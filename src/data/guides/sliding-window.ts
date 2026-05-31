export const content = `
# Sliding Window Deep Dive Guide

## Introduction: The Magical Camera Frame

Imagine you are holding a long strip of paper containing cute little animal drawings: *"Dog, Cat, Monkey, Panda, Lion, Tiger, Bear"*. You are holding a cardboard cutout of a camera frame that is exactly wide enough to see **3 animals at once** (so it shows *"Dog, Cat, Monkey"*).

If you want to find the features of every group of 3 adjacent animals:

* **The Squeaky-Squeak Way (Brute Force)**: You place the frame over the first 3 animals (*Dog, Cat, Monkey*) and read them. Then you lift the frame, shift it one slot to the right, place it back down, and read all 3 animals all over again (*Cat, Monkey, Panda*). If the strip is 1,000,000 animals long and your frame is 50,000 animals wide, you will perform 50 billion checks! In computer science, this is \`O(n * k)\` time. That is so slow, you'd fall asleep!
* **The Sliding Window Way (Sliding the Frame)**: Instead of lifting the frame, you just **slide it smoothly** one slot to the right! As you slide it:
  1. The animal on the far left exit (*"Dog"*) slides out of the frame.
  2. The animal on the far right entry (*"Panda"*) slides into the frame.
  3. The middle animals (*"Cat"* and *"Monkey"*) stay inside, and you **don't need to look at them again**!

By only subtracting the one that left and adding the one that entered, you get the new answer instantly! This takes a single pass: a super fast \`O(n)\` time, regardless of how wide the frame is!

In computer science, **Sliding Window** is a neat optimization where we convert nested loops on arrays or strings into a single linear pass by sliding a frame represented by two pointers (\`left\` and \`right\`).

---

## Anatomy of a Sliding Window

We group sliding window problems into two fun types:

### 1. Fixed-Size Window (The Steady Frame)
The width of our camera frame is constant (let's call it \`K\`).
* **How it works**: Pointers \`left\` and \`right\` stay at a fixed distance: \`right - left + 1 = K\`.
* **Action**: As the frame slides, add \`nums[right]\` to your bag, subtract \`nums[left]\` from your bag, and move both pointers by 1!

\`\`\`
Initial Window (Size 3):
[ 4,   2,   1,   7,   8,   1,   2 ]
  ^         ^
left      right  (sum = 4 + 2 + 1 = 7)

Slide Window:
[ 4,   2,   1,   7,   8,   1,   2 ]
       ^         ^
     left      right  (new_sum = old_sum - 4 + 7 = 10)
\`\`\`

### 2. Variable/Dynamic-Size Window (The Stretchy Window)
The width of our window grows or shrinks like a rubber band depending on the toys inside!
* **How it works**: Pointers start together: \`left = 0\`, \`right = 0\`.
* **Stretching Right**: You move \`right\` forward to make the window bigger, looking for more toys until you break a rule (like getting a duplicate toy).
* **Squeezing Left**: When you break a rule, you move \`left\` forward to make the window smaller, until the toys inside are valid again!
* **Finding the Best Size**: We measure the biggest or smallest size (\`right - left + 1\`) during the valid states.

\`\`\`
Stretching Right:
[ A,   B,   C,   A,   B ]
 ^           ^
left       right  (Bag = {A, B, C}, Perfect!)

Too Many A's! (Squeezing Left):
[ A,   B,   C,   A,   B ]
       ^         ^
     left      right  (Bag = {B, C, A}, Happy again!)
\`\`\`

---

## Operations & Complexity Profile

Here is how the Sliding Window speeds up contiguous scanning:


| Operation / Subarray Scenario | Brute Force Complexity | Sliding Window Complexity | Auxiliary Space (Brute Force) | Auxiliary Space (Sliding Window) |
| :--- | :--- | :--- | :--- | :--- |
| **Max Sum Subarray of size K** | O(n * k) | O(n) | O(1) | O(1) |
| **Longest Substring without Duplicates** | O(n^2) | O(n) | O(min(n, m)) | O(min(n, m)) (Hash Set) |
| **Longest Subarray with Sum <= S** | O(n^2) | O(n) | O(1) | O(1) |
| **Minimum Window Substring** | O(n^3) | O(n) | O(1) | O(k) (Hash Map) |

---

## Core Algorithmic Patterns and Templates

Let's explore the three most common Sliding Window patterns with complete code in Python, Java, C++, and TypeScript.

### Pattern 1: Fixed-Size Window (Maximum Sum Subarray of Size K)

Given an array of positive integers and a number \`K\`, find the maximum sum of any contiguous subarray of size \`K\`.

#### The Strategy
1. Calculate the sum of the first \`K\` elements.
2. Initialize \`max_sum = current_sum\`.
3. Slide the window from index \`K\` to the end of the array. At each step, add the entering element and subtract the exiting element.
4. Update \`max_sum = max(max_sum, current_sum)\`.

#### Complete Implementations

##### Python
\`\`\`python
def maxSubarraySum(nums: list[int], k: int) -> int:
    if len(nums) < k:
        return 0
        
    # Build the initial window of size K
    window_sum = sum(nums[:k])
    max_sum = window_sum
    
    # Slide the window one element at a time
    for i in range(k, len(nums)):
        # To get the new window sum, add the new element coming into the frame
        # and subtract the old element falling out of the frame
        window_sum += nums[i] - nums[i - k]  
        max_sum = max(max_sum, window_sum)
        
    return max_sum
\`\`\`

##### Java
\`\`\`java
public class Solution {
    public int maxSubarraySum(int[] nums, int k) {
        if (nums == null || nums.length < k) {
            return 0;
        }
        
        // Build the initial window of size K
        int windowSum = 0;
        for (int i = 0; i < k; i++) {
            windowSum += nums[i];
        }
        
        int maxSum = windowSum;
        
        // Slide the window one element at a time
        for (int i = k; i < nums.length; i++) {
            // To get the new window sum, add the new element coming into the frame
            // and subtract the old element falling out of the frame
            windowSum += nums[i] - nums[i - k]; 
            maxSum = Math.max(maxSum, windowSum);
        }
        
        return maxSum;
    }
}
\`\`\`

##### C++
\`\`\`cpp
#include <vector>
#include <numeric>
#include <algorithm>

class Solution {
public:
    int maxSubarraySum(std::vector<int>& nums, int k) {
        if (nums.size() < k) return 0;
        
        // Build the initial window of size K
        int windowSum = std::accumulate(nums.begin(), nums.begin() + k, 0);
        int maxSum = windowSum;
        
        // Slide the window one element at a time
        for (size_t i = k; i < nums.size(); ++i) {
            // To get the new window sum, add the new element coming into the frame
            // and subtract the old element falling out of the frame
            windowSum += nums[i] - nums[i - k]; 
            maxSum = std::max(maxSum, windowSum);
        }
        
        return maxSum;
    }
};
\`\`\`

##### TypeScript
\`\`\`typescript
function maxSubarraySum(nums: number[], k: number): number {
  if (nums.length < k) return 0;

  // Build the initial window of size K
  let windowSum = 0;
  for (let i = 0; i < k; i++) {
    windowSum += nums[i];
  }

  let maxSum = windowSum;

  // Slide the window one element at a time
  for (let i = k; i < nums.length; i++) {
    // To get the new window sum, add the new element coming into the frame
    // and subtract the old element falling out of the frame
    windowSum += nums[i] - nums[i - k]; 
    maxSum = Math.max(maxSum, windowSum);
  }

  return maxSum;
}
\`\`\`

---

### Pattern 2: Dynamic Window (Longest Substring Without Repeating Characters)

Given a string \`s\`, find the length of the longest substring without repeating characters.

#### The Strategy
1. Initialize a Hash Set to track characters currently inside the window.
2. Initialize pointers: \`left = 0\`, \`max_len = 0\`.
3. Loop \`right\` from \`0\` to the end of the string.
4. If \`s[right]\` is already in the set (a duplicate), shrink the window from the left by removing \`s[left]\` from the set and incrementing \`left\` until the duplicate character is gone.
5. Add \`s[right]\` to the set.
6. Calculate window size: \`right - left + 1\` and update \`max_len\`.

##### Trace Table: \`s = "abcabcbb"\`

| Right | Char | Hash Set State | Action | Left Index | Window Length (\`r - l + 1\`) | Max Length |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **0** | 'a' | \`{'a'}\` | Add to set | 0 | 1 | 1 |
| **1** | 'b' | \`{'a', 'b'}\` | Add to set | 0 | 2 | 2 |
| **2** | 'c' | \`{'a', 'b', 'c'}\` | Add to set | 0 | 3 | 3 |
| **3** | 'a' | \`{'b', 'c', 'a'}\` | Duplicate 'a': remove \`s[0]\`, \`l++\` | 1 | 3 | 3 |
| **4** | 'b' | \`{'c', 'a', 'b'}\` | Duplicate 'b': remove \`s[1]\`, \`l++\` | 2 | 3 | 3 |
| **5** | 'c' | \`{'a', 'b', 'c'}\` | Duplicate 'c': remove \`s[2]\`, \`l++\` | 3 | 3 | 3 |
| **6** | 'b' | \`{'b'}\` | Duplicate 'b': remove \`s[3], s[4]\`, \`l+=2\` | 5 | 2 | 3 |
| **7** | 'b' | \`{'b'}\` | Duplicate 'b': remove \`s[5], s[6]\`, \`l+=2\` | 7 | 1 | 3 |

#### Complete Implementations

##### Python
\`\`\`python
def lengthOfLongestSubstring(s: str) -> int:
    char_set = set()
    left = 0
    max_len = 0
    
    # The 'right' pointer stretches the window to the right, hunting for new characters
    for right in range(len(s)):
        # If we hit a duplicate character, our window is breaking the rules!
        # We must squeeze the window from the left until the duplicate is gone.
        while s[right] in char_set:
            char_set.remove(s[left])
            left += 1
            
        # The window is valid again, so we can add the new character
        char_set.add(s[right])
        max_len = max(max_len, right - left + 1)
        
    return max_len
\`\`\`

##### Java
\`\`\`java
import java.util.HashSet;
import java.util.Set;

public class Solution {
    public int lengthOfLongestSubstring(String s) {
        Set<Character> charSet = new HashSet<>();
        int left = 0;
        int maxLen = 0;
        
        // The 'right' pointer stretches the window to the right, hunting for new characters
        for (int right = 0; right < s.length(); right++) {
            // If we hit a duplicate character, our window is breaking the rules!
            // We must squeeze the window from the left until the duplicate is gone.
            while (charSet.contains(s.charAt(right))) {
                charSet.remove(s.charAt(left));
                left++;
            }
            // The window is valid again, so we can add the new character
            charSet.add(s.charAt(right));
            maxLen = Math.max(maxLen, right - left + 1);
        }
        
        return maxLen;
    }
}
\`\`\`

##### C++
\`\`\`cpp
#include <string>
#include <unordered_set>
#include <algorithm>

class Solution {
public:
    int lengthOfLongestSubstring(std::string s) {
        std::unordered_set<char> charSet;
        int left = 0;
        int maxLen = 0;
        
        // The 'right' pointer stretches the window to the right, hunting for new characters
        for (int right = 0; right < s.length(); ++right) {
            // If we hit a duplicate character, our window is breaking the rules!
            // We must squeeze the window from the left until the duplicate is gone.
            while (charSet.find(s[right]) != charSet.end()) {
                charSet.erase(s[left]);
                left++;
            }
            // The window is valid again, so we can add the new character
            charSet.insert(s[right]);
            maxLen = std::max(maxLen, right - left + 1);
        }
        
        return maxLen;
    }
};
\`\`\`

##### TypeScript
\`\`\`typescript
function lengthOfLongestSubstring(s: string): number {
  const charSet = new Set<string>();
  let left = 0;
  let maxLen = 0;

  // The 'right' pointer stretches the window to the right, hunting for new characters
  for (let right = 0; right < s.length; right++) {
    // If we hit a duplicate character, our window is breaking the rules!
    // We must squeeze the window from the left until the duplicate is gone.
    while (charSet.has(s[right])) {
      charSet.delete(s[left]);
      left++;
    }
    // The window is valid again, so we can add the new character
    charSet.add(s[right]);
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}
\`\`\`

---

### Pattern 3: Dynamic Window with Map (Minimum Window Substring)

Given two strings \`s\` and \`t\`, return the minimum window substring of \`s\` such that every character in \`t\` (including duplicates) is included in the window.

#### The Strategy
1. Use a Hash Map \`countT\` to record character counts for string \`t\`.
2. Maintain a Hash Map \`window\` to record character counts of the current substring in \`s\`.
3. Track the number of characters that have met their target frequency: \`have = 0\` and \`need = countT.size()\`.
4. Expand the window by moving \`right\` forward. If \`s[right]\` is a target character, increment its count in \`window\`. If its count matches \`countT\`, increment \`have\`.
5. While \`have == need\`, update the minimum window answer, then shrink the window from the left by removing \`s[left]\`, decrementing its count in \`window\`, and updating \`have\` if its count falls below target, then incrementing \`left\`.

#### Complete Implementations

##### Python
\`\`\`python
def minWindow(s: str, t: str) -> str:
    if not t or not s:
        return ""
        
    # Build a dictionary to map the target string characters to their required counts
    dict_t = {}
    for c in t:
        dict_t[c] = dict_t.get(c, 0) + 1
        
    required = len(dict_t)
    left, right = 0, 0
    formed = 0 # Tracks how many unique characters have met their target frequency
    window_counts = {}
    
    # ans: [window_length, left_index, right_index]
    ans = float("inf"), None, None
    
    # Expand the window to the right, bringing characters into our frame
    while right < len(s):
        character = s[right]
        window_counts[character] = window_counts.get(character, 0) + 1
        
        # If this character reached the exact required amount, we formed one target!
        if character in dict_t and window_counts[character] == dict_t[character]:
            formed += 1
            
        # If all targets are met, the window is valid! 
        # Now, shrink it from the left to find the absolute minimum size.
        while left <= right and formed == required:
            character = s[left]
            
            # Save smallest window
            if right - left + 1 < ans[0]:
                ans = (right - left + 1, left, right)
                
            # Remove the left character from our frame
            window_counts[character] -= 1
            # If removing this character breaks our valid window, we lose a formed target
            if character in dict_t and window_counts[character] < dict_t[character]:
                formed -= 1
                
            left += 1
            
        right += 1
        
    return "" if ans[0] == float("inf") else s[ans[1]:ans[2] + 1]
\`\`\`

##### Java
\`\`\`java
import java.util.HashMap;
import java.util.Map;

public class Solution {
    public String minWindow(String s, String t) {
        if (s == null || t == null || s.length() < t.length()) return "";
        
        // Build a dictionary to map the target string characters to their required counts
        Map<Character, Integer> dictT = new HashMap<>();
        for (char c : t.toCharArray()) {
            dictT.put(c, dictT.getOrDefault(c, 0) + 1);
        }
        
        int required = dictT.size();
        int left = 0, right = 0;
        int formed = 0; // Tracks how many unique characters have met their target frequency
        
        Map<Character, Integer> windowCounts = new HashMap<>();
        int[] ans = {-1, 0, 0}; // window length, left, right
        
        // Expand the window to the right, bringing characters into our frame
        while (right < s.length()) {
            char c = s.charAt(right);
            windowCounts.put(c, windowCounts.getOrDefault(c, 0) + 1);
            
            // If this character reached the exact required amount, we formed one target!
            if (dictT.containsKey(c) && windowCounts.get(c).intValue() == dictT.get(c).intValue()) {
                formed++;
            }
            
            // If all targets are met, the window is valid! 
            // Now, shrink it from the left to find the absolute minimum size.
            while (left <= right && formed == required) {
                c = s.charAt(left);
                
                // Save smallest window
                if (ans[0] == -1 || right - left + 1 < ans[0]) {
                    ans[0] = right - left + 1;
                    ans[1] = left;
                    ans[2] = right;
                }
                
                // Remove the left character from our frame
                windowCounts.put(c, windowCounts.get(c) - 1);
                // If removing this character breaks our valid window, we lose a formed target
                if (dictT.containsKey(c) && windowCounts.get(c) < dictT.get(c)) {
                    formed--;
                }
                left++;
            }
            right++;
        }
        
        return ans[0] == -1 ? "" : s.substring(ans[1], ans[2] + 1);
    }
}
\`\`\`

##### C++
\`\`\`cpp
#include <string>
#include <unordered_map>
#include <climits>

class Solution {
public:
    std::string minWindow(std::string s, std::string t) {
        if (s.empty() || t.empty() || s.length() < t.length()) return "";
        
        // Build a dictionary to map the target string characters to their required counts
        std::unordered_map<char, int> dictT;
        for (char c : t) dictT[c]++;
        
        int required = dictT.size();
        int left = 0, right = 0;
        int formed = 0; // Tracks how many unique characters have met their target frequency
        
        std::unordered_map<char, int> windowCounts;
        int minLen = INT_MAX;
        int startIdx = 0;
        
        // Expand the window to the right, bringing characters into our frame
        while (right < s.length()) {
            char c = s[right];
            windowCounts[c]++;
            
            // If this character reached the exact required amount, we formed one target!
            if (dictT.find(c) != dictT.end() && windowCounts[c] == dictT[c]) {
                formed++;
            }
            
            // If all targets are met, the window is valid! 
            // Now, shrink it from the left to find the absolute minimum size.
            while (left <= right && formed == required) {
                char leftChar = s[left];
                
                // Save smallest window
                if (right - left + 1 < minLen) {
                    minLen = right - left + 1;
                    startIdx = left;
                }
                
                // Remove the left character from our frame
                windowCounts[leftChar]--;
                // If removing this character breaks our valid window, we lose a formed target
                if (dictT.find(leftChar) != dictT.end() && windowCounts[leftChar] < dictT[leftChar]) {
                    formed--;
                }
                left++;
            }
            right++;
        }
        
        return minLen == INT_MAX ? "" : s.substr(startIdx, minLen);
    }
};
\`\`\`

##### TypeScript
\`\`\`typescript
function minWindow(s: string, t: string): string {
  if (!s || !t || s.length < t.length) return "";

  // Build a dictionary to map the target string characters to their required counts
  const dictT = new Map<string, number>();
  for (const c of t) {
    dictT.set(c, (dictT.get(c) || 0) + 1);
  }

  const required = dictT.size;
  let left = 0;
  let right = 0;
  let formed = 0; // Tracks how many unique characters have met their target frequency

  const windowCounts = new Map<string, number>();
  let minLen = Infinity;
  let startIdx = 0;

  // Expand the window to the right, bringing characters into our frame
  while (right < s.length) {
    const c = s[right];
    windowCounts.set(c, (windowCounts.get(c) || 0) + 1);

    // If this character reached the exact required amount, we formed one target!
    if (dictT.has(c) && windowCounts.get(c) === dictT.get(c)) {
      formed++;
    }

    // If all targets are met, the window is valid! 
    // Now, shrink it from the left to find the absolute minimum size.
    while (left <= right && formed === required) {
      const leftChar = s[left];

      // Save smallest window
      if (right - left + 1 < minLen) {
        minLen = right - left + 1;
        startIdx = left;
      }

      // Remove the left character from our frame
      windowCounts.set(leftChar, windowCounts.get(leftChar)! - 1);
      // If removing this character breaks our valid window, we lose a formed target
      if (dictT.has(leftChar) && windowCounts.get(leftChar)! < dictT.get(leftChar)!) {
        formed--;
      }
      left++;
    }
    right++;
  }

  return minLen === Infinity ? "" : s.substring(startIdx, startIdx + minLen);
}
\`\`\`

---

## Common Interview Pitfalls and Debugging Strategies

Dynamic sliding windows are highly prone to off-by-one bugs. Watch out for these three issues:

### 1. Off-by-One in Window Lengths
* **The Trap**: Calculating window length incorrectly using \`right - left\` instead of \`right - left + 1\`.
* **The Fix**: Because indices are 0-based, the number of elements in range \`[left, right]\` is always \`right - left + 1\`. For example, if \`left = 0\` and \`right = 2\`, the window has 3 elements (\`0, 1, 2\`), which matches \`2 - 0 + 1 = 3\`.

### 2. Map Key Deletion Failures
* **The Trap**: Checking map sizes (like \`window.size()\`) but forgetting to delete keys when their counts reach 0.
* **The Fix**: In JavaScript/TypeScript and Python, checking \`if character in map\` will return \`true\` even if the count is \`0\`. You must explicitly delete the key:
  \`if window[char] == 0: del window[char]\` (Python) or \`if (window.get(char) === 0) window.delete(char)\` (TypeScript).

### 3. Missing Inner Loop Terminations
* **The Trap**: Failing to advance the \`left\` pointer during the shrink cycle, resulting in an infinite loop.
* **The Fix**: Verify that the \`left\` pointer increments on every path inside the \`while\` loop that shrinks the window.

---

## Practice Problems & Website Verifications

Verify your sliding window calculations by solving these interactive problems:
* [Longest Substring Without Repeating Characters](/problem/longest-substring-without-repeating-characters) — Dynamic sliding window using character duplicates.
* [Longest Repeating Character Replacement](/problem/longest-repeating-character-replacement) — Maximize window size using count maps.
* [Minimum Window Substring](/problem/minimum-window-substring) — Two-map lookup with expanding and contracting bounds.
`;
