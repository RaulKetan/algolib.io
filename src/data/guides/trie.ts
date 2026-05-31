export const content = `
# Trie (Prefix Tree) Guide

## Introduction: The Alphabet Search Index

Imagine you are looking up words in a physical dictionary. If you want to find the word **"apple"**, you do not scan from page one, reading every word linearly. Instead, you jump straight to the letter **'a'**. Once you are in the 'a' section, you look for the next letter, **'p'**, and follow that path to find words starting with **"ap"**. Then you look for the third letter, **'p'**, leading to **"app"**, and so on.

By sharing prefixes, you quickly locate the word and ignore thousands of other unrelated words (like "banana" or "zebra").

A **Trie** (derived from the word re**trie**val, but pronounced like "try" to distinguish it from "tree") is a tree-like data structure optimized for storing and retrieving keys in a dataset of strings. It is often called a **Prefix Tree** because the path from the root to any node represents a prefix shared by all words descended from that node.

### Analogy: The Spelling Maze
Imagine you are playing a game inside a giant **Spelling Maze** where you walk along letter paths to build words!
* **The Entrance**: The entrance to the maze is a blank starting circle called the **Root**.
* **Spelling CAT**: To spell "CAT", you walk through the 'C' door, then the 'A' door, and finally the 'T' door. When you reach the 'T' door, there's a big star sticker on the wall that says: *"You spelled a real word!"*
* **Spelling CAB**: What if you want to spell "CAB"? You start at the same 'C' and 'A' doors, but instead of turning towards 'T', you take a turn to the 'B' door, which also has a star sticker!
* **Why Tries are Awesome**: Notice that "CAT" and "CAB" shared the exact same 'C' and 'A' doors. You didn't have to build new doors for 'C' and 'A'! This saves a lot of space in the computer's brain.
* **Smart Autocomplete**: This is how the search bar on your tablet guesses what you are typing! As soon as you walk through the 'C' and 'A' doors, it looks ahead and says: *"Hey, are you trying to spell CAT or CAB?"*

---

### Autocomplete & Search Engines
Tries are the secret engine behind:
1. **Search engine autocomplete systems**: As you type "how to c...", it instantly suggests "how to code" or "how to cook".
2. **IP routing table lookups**: Looking up the longest matching network prefix.
3. **Spell checkers & T9 texting**: Predicting word boundaries based on character keys.

---

## Anatomy of a Trie Node

Unlike binary trees where each node has at most two children (left and right), a Trie Node represents a character junction point and can have **many children**. For standard English text containing lowercase a-z, a node can have up to **26 children**, each pointing to another Trie Node.

### Analogy: A Room inside the Spelling Maze
What does a single room (Node) in our spelling maze look like? It has two things:
1. **A Bunch of Doors** (Children References): Up to 26 doorways pointing to other letter rooms.
2. **A Star Sticker** (\`isEndOfWord\`): A true/false switch that says if spelling stops here to form a complete word. (For example, if you spell "CAR", 'R' has a star. If you keep walking to spell "CART", 'T' has a star too!).

---

### Structural Design
A Trie Node contains:
1. **Children References**: A collection mapping characters to child nodes. This is typically implemented in one of three ways:
   * **Fixed-size Array**: An array of size 26 (for a-z): \`children = [null] * 26\` where index 0 represents 'a', index 1 is 'b', etc. This offers the fastest lookup time (\`O(1)\`) but wastes memory if many slots are empty.
   * **Hash Map**: A dynamic Map mapping characters to child nodes. This is memory-efficient for sparse trees but has a small overhead.
   * **Binary Search Tree / Sorted List**: Useful when memory is extremely constrained and character sets are large.
2. **End-of-word Flag (\`isEndOfWord\`)**: A boolean flag indicating whether the sequence of letters from the root to this node forms a complete word. This is crucial because "app" and "apple" share the same prefix, but they are both complete words in their own right.

#### Visualizing a Trie containing "cat", "cab", and "car"

\`\`\`
          [ Root ]
             |
            (c)
             |
            (a)
           / | \
         (t) (b) (r)
          *   *   *
\`\`\`
*(Asterisk * denotes a node where \`isEndOfWord = true\`)*

#### Node Definition

##### Python
\`\`\`python
class TrieNode:
    def __init__(self):
        self.children = {}  # Map character -> TrieNode
        self.is_end_of_word = False
    
    def has_no_children(self) -> bool:
        return len(self.children) == 0
\`\`\`

##### Java
\`\`\`java
import java.util.HashMap;
import java.util.Map;

class TrieNode {
    Map<Character, TrieNode> children = new HashMap<>();
    boolean isEndOfWord = false;
}
\`\`\`

##### C++
\`\`\`cpp
#include <unordered_map>

struct TrieNode {
    std::unordered_map<char, TrieNode*> children;
    bool isEndOfWord = false;
};
\`\`\`

##### TypeScript
\`\`\`typescript
class TrieNode {
  children: Map<string, TrieNode>;
  isEndOfWord: boolean;

  constructor() {
    this.children = new Map<string, TrieNode>();
    this.isEndOfWord = false;
  }
}
\`\`\`

---

## Trie vs. Hash Table: The Operational Trade-Offs

Why use a Trie when we can just throw strings into a Hash Set or Hash Map? Let's analyze the trade-offs:

| Feature | Hash Table | Trie (Prefix Tree) |
| :--- | :--- | :--- |
| **Search (Exact Match)** | O(L) (L = length of string) | O(L) |
| **Space Complexity** | O(N * L) (N = number of words) | O(N * L) (often much smaller due to prefix sharing) |
| **Prefix Matching (\`startsWith\`)** | O(N * L) (must check every key) | O(L) (directly walk prefix path) |
| **Sorted Traversal** | Requires sorting keys | Alphabetically sorted by nature of Trie traversal |

### Why Tries Excel at Prefix Search
If you want to find all words starting with **"ap"** in a Hash Table containing 10,000 words, you have to iterate through all 10,000 keys and check if they start with "ap". This takes \`O(N * L)\` time.
In a Trie, you walk from root -> 'a' -> 'p'. The subtree under 'p' contains exactly and only the words starting with "ap". You can retrieve or print them instantly without scanning unrelated words.

---

## Trie Memory Optimization: Radix Trees (Compressed Tries)

One criticism of Tries is their high memory usage. If a Trie has many long words that do not share prefixes, it creates a chain of nodes with single children. For example, storing "unbelievable" without other "un-" words creates 13 distinct nodes.

To solve this, we use a **Radix Tree** (also known as a **Compressed Trie**). A Radix tree merges any node that has only one child with its parent.

\`\`\`
Standard Trie:  [Root] -> (u) -> (n) -> (b) -> (e) -> (l) -> (i) -> (e) -> (v) -> (a) -> (b) -> (l) -> (e)*
Radix Tree:     [Root] -> (unbelievable)*
\`\`\`

If we later insert "unbeaten":
\`\`\`
Radix Tree:     [Root] -> (unbeat) -> (able)*
                                   -> (en)*
\`\`\`
This compression dramatically reduces the node count and pointer overhead, speeding up memory access.

---

## Trie Core Operations & Walkthroughs

A standard Trie supports four core operations: \`insert\`, \`search\`, \`startsWith\`, and \`delete\`.

### 1. Inserting a Word (\`insert\`)
To insert a word of length \`L\`:
1. Start at the Root.
2. Loop through each character in the word.
3. Check if the current character exists as a child of the current node. If not, create a new child Trie Node.
4. Move down to the child node.
5. After processing the final character, set \`isEndOfWord = true\`.

### 2. Searching for a Word (\`search\`)
To search for an exact word:
1. Start at the Root.
2. Loop through each character.
3. If a character is not found in the children of the current node, return \`false\` immediately.
4. Move down.
5. After walking through all characters, return the value of \`isEndOfWord\`. (If it is \`false\`, it means we only found a prefix, not the entire word).

### 3. Prefix Matching (\`startsWith\`)
To check if any word starts with a prefix:
1. Walk the character path identical to the search function.
2. If we reach the end of the prefix successfully without hitting any missing links, return \`true\`. It does not matter if \`isEndOfWord\` is true or false.

### 4. Deleting a Word (\`delete\`)
Deleting a word from a Trie is more complex than insertion. If we simply set \`isEndOfWord = false\`, we leave orphaned nodes in memory. If we delete nodes blindly, we might delete parts of other words (e.g. deleting "car" shouldn't destroy "cart").

We use recursion (post-order traversal):
1. Walk down to the end of the word.
2. Set \`isEndOfWord = false\` at the final character node.
3. As the recursion unwinds back up, we check if a node has:
   * No children.
   * \`isEndOfWord\` is false.
4. If both conditions are met, we delete the node from its parent's children map. If the node has other children or has \`isEndOfWord = true\` (meaning it's part of another word), we stop deleting and return.

---

## Complete Trie Implementations in 4 Languages (with Delete)

Here are the complete implementations including the recursive delete operation.

##### Python
\`\`\`python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end_of_word = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        curr = self.root
        # Walk through each letter in the word
        for char in word:
            # If there is no door for this letter, build a new room!
            if char not in curr.children:
                curr.children[char] = TrieNode()
            # Step into the room for this letter
            curr = curr.children[char]
        # We finished walking, so put a star sticker here!
        curr.is_end_of_word = True

    def search(self, word: str) -> bool:
        curr = self.root
        for char in word:
            # If we hit a dead end, the word doesn't exist
            if char not in curr.children:
                return False
            curr = curr.children[char]
        # We reached the end of the path. Is there a star sticker?
        return curr.is_end_of_word

    def startsWith(self, prefix: str) -> bool:
        curr = self.root
        for char in prefix:
            if char not in curr.children:
                return False
            curr = curr.children[char]
        return True

    def delete(self, word: str) -> None:
        def _delete(node: TrieNode, word: str, depth: int) -> bool:
            # Base Case: We reached the end of the word
            if depth == len(word):
                # If there's no star sticker, the word wasn't here anyway
                if not node.is_end_of_word:
                    return False # Word doesn't exist
                
                # Peel off the star sticker
                node.is_end_of_word = False
                
                # If this room has no other doors (children), it's safe to destroy it!
                return len(node.children) == 0 # True if safe to delete this node

            char = word[depth]
            if char not in node.children:
                return False

            should_delete_child = _delete(node.children[char], word, depth + 1)
            
            if should_delete_child:
                del node.children[char]
                return not node.is_end_of_word and len(node.children) == 0

            return False

        _delete(self.root, word, 0)
\`\`\`

##### Java
\`\`\`java
import java.util.HashMap;
import java.util.Map;

class Trie {
    private static class TrieNode {
        Map<Character, TrieNode> children = new HashMap<>();
        boolean isEndOfWord = false;
    }

    private final TrieNode root;

    public Trie() {
        root = new TrieNode();
    }

    public void insert(String word) {
        TrieNode curr = root;
        // Walk through each letter in the word
        for (char ch : word.toCharArray()) {
            // If there is no door for this letter, build a new room!
            curr.children.putIfAbsent(ch, new TrieNode());
            // Step into the room for this letter
            curr = curr.children.get(ch);
        }
        // We finished walking, so put a star sticker here!
        curr.isEndOfWord = true;
    }

    public boolean search(String word) {
        TrieNode curr = root;
        for (char ch : word.toCharArray()) {
            // If we hit a dead end, the word doesn't exist
            if (!curr.children.containsKey(ch)) {
                return false;
            }
            curr = curr.children.get(ch);
        }
        // We reached the end of the path. Is there a star sticker?
        return curr.isEndOfWord;
    }

    public boolean startsWith(String prefix) {
        TrieNode curr = root;
        for (char ch : prefix.toCharArray()) {
            if (!curr.children.containsKey(ch)) {
                return false;
            }
            curr = curr.children.get(ch);
        }
        return true;
    }

    public void delete(String word) {
        delete(root, word, 0);
    }

    private boolean delete(TrieNode current, String word, int index) {
        // Base Case: We reached the end of the word
        if (index == word.length()) {
            // If there's no star sticker, the word wasn't here anyway
            if (!current.isEndOfWord) {
                return false;
            }
            
            // Peel off the star sticker
            current.isEndOfWord = false;
            
            // If this room has no other doors (children), it's safe to destroy it!
            return current.children.isEmpty();
        }
        char ch = word.charAt(index);
        TrieNode node = current.children.get(ch);
        if (node == null) {
            return false;
        }
        boolean shouldDeleteCurrentNode = delete(node, word, index + 1);

        if (shouldDeleteCurrentNode) {
            current.children.remove(ch);
            return !current.isEndOfWord && current.children.isEmpty();
        }
        return false;
    }
}
\`\`\`

##### C++
\`\`\`cpp
#include <unordered_map>
#include <string>

class Trie {
private:
    struct TrieNode {
        std::unordered_map<char, TrieNode*> children;
        bool isEndOfWord = false;
    };
    TrieNode* root;

    bool deleteHelper(TrieNode* curr, const std::string& word, int depth) {
        // Base Case: We reached the end of the word
        if (depth == word.length()) {
            // If there's no star sticker, the word wasn't here anyway
            if (!curr->isEndOfWord) {
                return false;
            }
            // Peel off the star sticker
            curr->isEndOfWord = false;
            // If this room has no other doors (children), it's safe to destroy it!
            return curr->children.empty();
        }
        char ch = word[depth];
        if (curr->children.find(ch) == curr->children.end()) {
            return false;
        }
        bool shouldDeleteChild = deleteHelper(curr->children[ch], word, depth + 1);

        if (shouldDeleteChild) {
            delete curr->children[ch];
            curr->children.erase(ch);
            return !curr->isEndOfWord && curr->children.empty();
        }
        return false;
    }

public:
    Trie() {
        root = new TrieNode();
    }

    void insert(std::string word) {
        TrieNode* curr = root;
        // Walk through each letter in the word
        for (char ch : word) {
            // If there is no door for this letter, build a new room!
            if (curr->children.find(ch) == curr->children.end()) {
                curr->children[ch] = new TrieNode();
            }
            // Step into the room for this letter
            curr = curr->children[ch];
        }
        // We finished walking, so put a star sticker here!
        curr->isEndOfWord = true;
    }

    bool search(std::string word) {
        TrieNode* curr = root;
        for (char ch : word) {
            // If we hit a dead end, the word doesn't exist
            if (curr->children.find(ch) == curr->children.end()) {
                return false;
            }
            curr = curr->children[ch];
        }
        // We reached the end of the path. Is there a star sticker?
        return curr->isEndOfWord;
    }

    bool startsWith(std::string prefix) {
        TrieNode* curr = root;
        for (char ch : prefix) {
            if (curr->children.find(ch) == curr->children.end()) {
                return false;
            }
            curr = curr->children[ch];
        }
        return true;
    }

    void remove(std::string word) {
        deleteHelper(root, word, 0);
    }
};
\`\`\`

##### TypeScript
\`\`\`typescript
class TrieNode {
  children: Map<string, TrieNode>;
  isEndOfWord: boolean;

  constructor() {
    this.children = new Map<string, TrieNode>();
    this.isEndOfWord = false;
  }
}

class Trie {
  private root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  insert(word: string): void {
    let curr = this.root;
    // Walk through each letter in the word
    for (const char of word) {
      // If there is no door for this letter, build a new room!
      if (!curr.children.has(char)) {
        curr.children.set(char, new TrieNode());
      }
      // Step into the room for this letter
      curr = curr.children.get(char)!;
    }
    // We finished walking, so put a star sticker here!
    curr.isEndOfWord = true;
  }

  search(word: string): boolean {
    let curr = this.root;
    for (const char of word) {
      // If we hit a dead end, the word doesn't exist
      if (!curr.children.has(char)) {
        return false;
      }
      curr = curr.children.get(char)!;
    }
    // We reached the end of the path. Is there a star sticker?
    return curr.isEndOfWord;
  }

  startsWith(prefix: string): boolean {
    let curr = this.root;
    for (const char of prefix) {
      if (!curr.children.has(char)) {
        return false;
      }
      curr = curr.children.get(char)!;
    }
    return true;
  }

  delete(word: string): void {
    this.deleteNode(this.root, word, 0);
  }

  private deleteNode(curr: TrieNode, word: string, depth: number): boolean {
    // Base Case: We reached the end of the word
    if (depth === word.length) {
      // If there's no star sticker, the word wasn't here anyway
      if (!curr.isEndOfWord) {
        return false;
      }
      // Peel off the star sticker
      curr.isEndOfWord = false;
      // If this room has no other doors (children), it's safe to destroy it!
      return curr.children.size === 0;
    }

    const char = word[depth];
    if (!curr.children.has(char)) {
      return false;
    }

    const shouldDeleteChild = this.deleteNode(curr.children.get(char)!, word, depth + 1);

    if (shouldDeleteChild) {
      curr.children.delete(char);
      return !curr.isEndOfWord && curr.children.size === 0;
    }

    return false;
  }
}
\`\`\`

---

## Step-by-Step Code Trace: Inserting "cat" and "cab"

Let's watch how the internal children links are created and navigated.

| Operation | Char | Current Node | Child exists? | Action | Final Node State |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Insert("cat")** | 'c' | Root | No | Create 'c' | \`Root.children['c'] = Node1\` |
| | 'a' | Node1 | No | Create 'a' | \`Node1.children['a'] = Node2\` |
| | 't' | Node2 | No | Create 't' | \`Node2.children['t'] = Node3\` |
| | | Node3 | - | End of Word | \`Node3.isEndOfWord = true\` |
| **Insert("cab")** | 'c' | Root | Yes | Walk down to 'c' | Move to Node1 |
| | 'a' | Node1 | Yes | Walk down to 'a' | Move to Node2 |
| | 'b' | Node2 | No | Create 'b' | \`Node2.children['b'] = Node4\` |
| | | Node4 | - | End of Word | \`Node4.isEndOfWord = true\` |

Notice that during the second insertion, the characters 'c' and 'a' were not re-created; the Trie reused existing nodes, saving memory!

---

## Common Interview Pitfalls and Debugging Strategies

1. **Losing Word Boundaries**:
   * **Symptom**: \`search("app")\` returns \`true\` even though you only inserted \`"apple"\`.
   * **Cause**: You forgot to check if the target node has \`isEndOfWord = true\`.
   * **Fix**: Ensure that exact match queries return \`node.isEndOfWord\`, not just \`true\` on loop completion.

2. **Memory Leaks during Deletion**:
   * **Symptom**: Out of memory errors or obsolete words lingering in memory.
   * **Cause**: Simply setting \`isEndOfWord = false\` leaves trailing nodes in memory.
   * **Fix**: To properly delete a word, use backtracking (DFS recursion) to clean up and delete child nodes that have empty children maps.

---

## Practice Problems & Interactive Visualizers

Build your prefix lookup skills by practicing these standard problems on our platform:
* [Implement Trie](/problem/implement-trie-prefix-tree) — Code insertion, lookup, and prefix testing.
* [Design Add and Search Words](/problem/design-add-and-search-words-data-structure) — Support wildcard '.' character lookups.
`;
