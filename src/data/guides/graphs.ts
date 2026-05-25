export const content = `
# Graphs Algorithms Guide

## Introduction: The Social Network Map and the Flight Router

Imagine a social network like Facebook or LinkedIn. You have user profiles, and you have friendships connecting them. If Alice is friends with Bob, there is a connection. If Bob is friends with Charlie, there is another connection. But Alice might not be friends with Charlie directly. 

This network of people and friendships is a real-world representation of a **Graph**.

In computer science, a Graph is a non-linear data structure consisting of two parts:
* **Vertices (or Nodes)**: The entities in the graph (e.g., Alice, Bob, Charlie, cities, web pages).
* **Edges**: The relationships or connections between entities (e.g., friendships, flight paths, hyperlinks).

Graphs are versatile because they do not have a rigid hierarchical structure like Trees. Any node can connect to any other node, and there can be multiple loops or cycles in the paths.

### Analogy: The Friend Map
Imagine a big map of your friends!
Each friend is represented as a dot on a sheet of paper. If two friends know each other, you draw a line connecting their dots.
In computer science, we call this a **Graph**!
* **Vertices (or Nodes)**: The dots representing people, cities, or toys.
* **Edges**: The lines connecting the dots together.
* **No rules!**: Unlike a Tree, which grows in neat branches from the top, a Graph can connect *any* dot to *any* other dot. You can even have loops where you follow a path and end up right back at your starting spot!

---

### Classifying Graphs

#### Directed vs. Undirected (Facebook Friends vs. Instagram Followers)

##### Analogy: Facebook vs Instagram
* **Facebook Friendship (Undirected)**: The friendship goes both ways! If Alice is friends with Bob, Bob is friends with Alice. The line has no arrows.
* **Instagram Follower (Directed)**: The follow has a direction! You follow a cool superhero account, but they might not follow you back. We draw this connection as a one-way arrow pointing from you to the superhero.

* **Undirected**: The connection goes both ways. If Alice is friends with Bob, Bob is friends with Alice. The edge has no arrow.
* **Directed**: The connection has a specific direction. If Alice follows Drake on Instagram, Drake does not automatically follow Alice. The edge is drawn as an arrow: \`Alice -> Drake\`.

#### Weighted vs. Unweighted (Candy-toll Roads)

##### Analogy: Candy-toll Roads
* **Unweighted**: Every connection is equal and free.
* **Weighted**: Each path has a cost. Imagine walking between rooms in a board game, where some pathways require you to pay 5 candies to cross, but other paths only cost 1 candy. The candies are the **Weights**!

* **Unweighted**: Every connection is equal.
* **Weighted**: Connections have values or costs (weights). For example, in an airline routing system, an edge between New York and London might have a weight of \`5,500\` (representing kilometers or flight costs).

#### Cyclic vs. Acyclic Graphs
* **Cyclic**: A graph containing at least one path that starts at a node and travels through edges to end up back at the same node.
* **Acyclic**: A graph with no cycles. A Directed Acyclic Graph is commonly known as a **DAG** and is key for scheduling algorithms.

---

## Representing Graphs in Code

How do we represent nodes and edges in computer memory? We use three primary formats, each with distinct speed and memory trade-offs.

### 1. Adjacency Matrix
A 2D array of size \`V * V\` (where \`V\` is the number of vertices). If there is an edge between node \`i\` and node \`j\`, the cell \`matrix[i][j]\` is set to \`1\` (or the edge weight); otherwise, it is \`0\`.

* **Advantage**: Instant \`O(1)\` lookup to check if node A is connected to node B.
* **Disadvantage**: Demands \`O(V^2)\` memory. If you have 10,000 users but each user only has 5 friends, you waste huge amounts of memory storing millions of zeros.

### 2. Adjacency List
A mapping where each vertex is associated with a list or set of its neighbors. This is the most popular representation for interview coding because most graphs are sparse (nodes have relatively few edges).

* **Advantage**: Saves memory; requires only \`O(V + E)\` space.
* **Disadvantage**: Checking if node A connects to node B takes \`O(degree of A)\` because you must search through A's list of neighbors.

##### Adjacency List Representation

##### Python
\`\`\`python
# Adjacency List represented as a Dictionary of Lists
graph = {
    'A': ['B', 'C'],
    'B': ['C', 'D'],
    'C': ['D'],
    'D': []
}
\`\`\`

##### Java
\`\`\`java
import java.util.*;

// Adjacency List represented as a Map of Lists
Map<String, List<String>> graph = new HashMap<>();

graph.put("A", Arrays.asList("B", "C"));
graph.put("B", Arrays.asList("C", "D"));
graph.put("C", Arrays.asList("D"));
graph.put("D", new ArrayList<>());
\`\`\`

##### C++
\`\`\`cpp
#include <unordered_map>
#include <vector>
#include <string>

// Adjacency List represented as an unordered_map of vectors
std::unordered_map<std::string, std::vector<std::string>> graph = {
    {"A", {"B", "C"}},
    {"B", {"C", "D"}},
    {"C", {"D"}},
    {"D", {}}
};
\`\`\`

##### TypeScript
\`\`\`typescript
// Adjacency List represented as a Record object
const graph: Record<string, string[]> = {
  'A': ['B', 'C'],
  'B': ['C', 'D'],
  'C': ['D'],
  'D': []
};
\`\`\`

### 3. Edge List
A simple collection of pairs representing edges. E.g., \`edges = [[0, 1], [1, 2], [2, 3]]\`.

* **Use Case**: Used as input in many problems (which you must first convert to an Adjacency List before traversing), and in Kruskal's Minimum Spanning Tree algorithm.

### Complexity Matrix of Graph Formats

| Feature / Operation | Adjacency Matrix | Adjacency List | Edge List |
| :--- | :--- | :--- | :--- |
| **Space Complexity** | O(V^2) | O(V + E) | O(E) |
| **Add Edge** | O(1) | O(1) | O(1) |
| **Check Edge Connection** | O(1) | O(deg(V)) | O(E) |
| **Find All Neighbors** | O(V) | O(deg(V)) | O(E) |

---

## Core Graph Traversals: BFS vs. DFS

To traverse a graph, we must visit its vertices. Since graphs can have loops, we must keep track of nodes we have already visited to avoid falling into infinite loops. We do this using a **Visited Set**.

### Analogy: Secret Hideouts in the Playground
Imagine you are exploring a web of secret hideouts in a giant playground!
How do you visit every single hideout without getting lost in loops? You bring a bucket of green slime to mark each hideout you visit (we call this a **Visited Set** so we don't walk in circles forever!).

There are two fun ways to explore the web:

#### Breadth-First Search (BFS): The Ripple in a Pond
Imagine dropping a pebble in a puddle of water—it creates ripples that spread outwards in growing circles.
* You start at your house.
* First, you visit all of your *direct* next-door neighbors.
* Next, you visit all of *their* next-door neighbors.
* You keep spreading outwards layer-by-layer. This is the **perfect** way to find the absolute shortest path to any hideout!

#### Depth-First Search (DFS): The Deep Maze Explorer
Imagine exploring a deep, dark maze.
* You pick a path and walk **as far as you can possibly go** until you hit a dead end.
* Once you hit a wall, you walk back to the last intersection and try the other path!
* You explore deep before you explore wide. It is perfect for checking if a path exists or finding your way out of a maze!

---

### 1. Breadth-First Search (BFS)
BFS visits vertices level-by-level, radiating outwards from a starting node.
* **Application**: Finding the **shortest path** on unweighted graphs.
* **Mechanism**: Uses a **Queue** (First-In, First-Out) and a **Visited Set**.

### 2. Depth-First Search (DFS)
DFS plunges deep into a path, exploring as far as possible down a branch before backtracking.
* **Application**: Cycle detection, finding connected components, path-finding.
* **Mechanism**: Uses **Recursion** (the call stack) and a **Visited Set**.

### Side-by-Side Comparison

| Metric | BFS | DFS |
| :--- | :--- | :--- |
| **Data Structure** | Queue (FIFO) | Stack / Recursion (LIFO) |
| **Memory Usage** | O(width) (stores all nodes of a level) | O(depth) (stores the recursion path) |
| **Shortest Path** | Guaranteed to find the shortest path (unweighted) | Not guaranteed to find the shortest path |
| **Best For** | Finding nearest neighbors, shortest path | Topological sort, cycle detection, maze solving |

---

## Key Algorithmic Patterns

### Pattern 1: Grid BFS/DFS (The Island Problem)
Many interview problems represent a graph as a 2D matrix (a grid) where cells are vertices and adjacent cells (Up, Down, Left, Right) are edges. A classic example is **Number of Islands**.

* **The Strategy**:
  1. Iterate through every cell in the grid.
  2. If you find land (\`'1'\`), trigger a DFS or BFS to visit and mark all connected land cells as water (\`'0'\`) or visited.
  3. Increment your island count.

##### Grid DFS Traversal Template

##### Python
\`\`\`python
def numIslands(grid: List[List[str]]) -> int:
    if not grid:
        return 0
        
    rows, cols = len(grid), len(grid[0])
    islands = 0
    
    def dfs(r, c):
        # Base Cases: out of bounds or water cell
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] == '0':
            return
            
        grid[r][c] = '0'  # Mark as visited to save space
        
        # Explore 4 directions: Down, Up, Right, Left
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)
        
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                islands += 1
                dfs(r, c)  # Destroy/sink the island
                
    return islands
\`\`\`

##### Java
\`\`\`java
class Solution {
    public int numIslands(char[][] grid) {
        if (grid == null || grid.length == 0) {
            return 0;
        }
        int rows = grid.length;
        int cols = grid[0].length;
        int islands = 0;
        
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (grid[r][c] == '1') {
                    islands++;
                    dfs(grid, r, c);
                }
            }
        }
        return islands;
    }
    
    private void dfs(char[][] grid, int r, int c) {
        int rows = grid.length;
        int cols = grid[0].length;
        
        if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] == '0') {
            return;
        }
        
        grid[r][c] = '0';
        dfs(grid, r + 1, c);
        dfs(grid, r - 1, c);
        dfs(grid, r, c + 1);
        dfs(grid, r, c - 1);
    }
}
\`\`\`

##### C++
\`\`\`cpp
#include <vector>

class Solution {
private:
    void dfs(std::vector<std::vector<char>>& grid, int r, int c) {
        int rows = grid.size();
        int cols = grid[0].size();
        
        if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] == '0') {
            return;
        }
        
        grid[r][c] = '0';
        dfs(grid, r + 1, c);
        dfs(grid, r - 1, c);
        dfs(grid, r, c + 1);
        dfs(grid, r, c - 1);
    }

public:
    int numIslands(std::vector<std::vector<char>>& grid) {
        if (grid.empty()) return 0;
        int rows = grid.size();
        int cols = grid[0].size();
        int islands = 0;
        
        for (int r = 0; r < rows; ++r) {
            for (int c = 0; c < cols; ++c) {
                if (grid[r][c] == '1') {
                    islands++;
                    dfs(grid, r, c);
                }
            }
        }
        return islands;
    }
};
\`\`\`

##### TypeScript
\`\`\`typescript
function numIslands(grid: string[][]): number {
  if (!grid || grid.length === 0) return 0;
  
  const rows = grid.length;
  const cols = grid[0].length;
  let islands = 0;
  
  const dfs = (r: number, c: number) => {
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === '0') {
      return;
    }
    
    grid[r][c] = '0';
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  };
  
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') {
        islands++;
        dfs(r, c);
      }
    }
  }
  
  return islands;
}
\`\`\`

---

### Pattern 2: Topological Sort (Kahn's Algorithm)
A **Directed Acyclic Graph (DAG)** has directed edges and no cycles. **Topological Sort** provides a linear ordering of vertices such that for every directed edge \`U -> V\`, vertex \`U\` comes before \`V\` in the ordering.
* **Real-world Example**: Course scheduling. If Course A is a prerequisite for Course B, you must take A before B.
* **Kahn's Algorithm**:
  1. Calculate the **in-degree** (number of incoming edges) for every vertex.
  2. Add all vertices with an in-degree of 0 (no prerequisites) to a **Queue**.
  3. While the queue is not empty:
     * Pop a vertex from the queue, add it to our sorted output.
     * Decrement the in-degree of all its neighbors.
     * If a neighbor's in-degree drops to 0, push it onto the queue.
  4. If the sorted output does not contain all vertices, a cycle exists, and topological sort is impossible.

##### Kahn's Algorithm Implementation

##### Python
\`\`\`python
from collections import deque
from typing import List

def canFinishCourses(numCourses: int, prerequisites: List[List[int]]) -> bool:
    in_degree = [0] * numCourses
    adj_list = {i: [] for i in range(numCourses)}
    
    for course, pre in prerequisites:
        adj_list[pre].append(course)
        in_degree[course] += 1
        
    queue = deque([i for i in range(numCourses) if in_degree[i] == 0])
    visited_count = 0
    
    while queue:
        node = queue.popleft()
        visited_count += 1
        
        for neighbor in adj_list[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
                
    return visited_count == numCourses
\`\`\`

##### Java
\`\`\`java
import java.util.*;

class Solution {
    public boolean canFinishCourses(int numCourses, int[][] prerequisites) {
        int[] inDegree = new int[numCourses];
        Map<Integer, List<Integer>> adjList = new HashMap<>();
        
        for (int i = 0; i < numCourses; i++) {
            adjList.put(i, new ArrayList<>());
        }
        
        for (int[] pair : prerequisites) {
            int course = pair[0];
            int pre = pair[1];
            adjList.get(pre).add(course);
            inDegree[course]++;
        }
        
        Queue<Integer> queue = new LinkedList<>();
        for (int i = 0; i < numCourses; i++) {
            if (inDegree[i] == 0) {
                queue.add(i);
            }
        }
        
        int visitedCount = 0;
        while (!queue.isEmpty()) {
            int node = queue.poll();
            visitedCount++;
            
            for (int neighbor : adjList.get(node)) {
                inDegree[neighbor]--;
                if (inDegree[neighbor] == 0) {
                    queue.add(neighbor);
                }
            }
        }
        
        return visitedCount == numCourses;
    }
}
\`\`\`

##### C++
\`\`\`cpp
#include <vector>
#include <queue>
#include <unordered_map>

class Solution {
public:
    bool canFinishCourses(int numCourses, std::vector<std::vector<int>>& prerequisites) {
        std::vector<int> inDegree(numCourses, 0);
        std::unordered_map<int, std::vector<int>> adjList;
        
        for (int i = 0; i < numCourses; ++i) {
            adjList[i] = std::vector<int>();
        }
        
        for (const auto& pair : prerequisites) {
            int course = pair[0];
            int pre = pair[1];
            adjList[pre].push_back(course);
            inDegree[course]++;
        }
        
        std::queue<int> q;
        for (int i = 0; i < numCourses; ++i) {
            if (inDegree[i] == 0) {
                q.push(i);
            }
        }
        
        int visitedCount = 0;
        while (!q.empty()) {
            int node = q.front();
            q.pop();
            visitedCount++;
            
            for (int neighbor : adjList[node]) {
                inDegree[neighbor]--;
                if (inDegree[neighbor] == 0) {
                    q.push(neighbor);
                }
            }
        }
        
        return visitedCount == numCourses;
    }
};
\`\`\`

##### TypeScript
\`\`\`typescript
function canFinishCourses(numCourses: number, prerequisites: number[][]): boolean {
  const inDegree: number[] = new Array(numCourses).fill(0);
  const adjList: Map<number, number[]> = new Map();

  for (let i = 0; i < numCourses; i++) {
    adjList.set(i, []);
  }

  // Build Graph and Calculate In-degrees
  for (const [course, pre] of prerequisites) {
    adjList.get(pre)!.push(course);
    inDegree[course]++;
  }

  const queue: number[] = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) {
      queue.push(i);
    }
  }

  let visitedCount = 0;
  while (queue.length > 0) {
    const node = queue.shift()!;
    visitedCount++;

    const neighbors = adjList.get(node) || [];
    for (const neighbor of neighbors) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }

  return visitedCount === numCourses;
}
\`\`\`

---

### Pattern 3: Shortest Path on Weighted Graphs (Dijkstra's Algorithm)

To find the shortest distance from a starting node to all other nodes in a weighted graph with non-negative weights, we use **Dijkstra's Algorithm**.

It uses a **Min-Heap (Priority Queue)** to always explore the next node that has the absolute shortest path distance from the start.

##### Dijkstra's Template

##### Python
\`\`\`python
import heapq

def dijkstra(graph: dict, start: str) -> dict:
    # graph format: { 'A': [('B', 3), ('C', 5)] } -> neighbor, weight
    min_heap = [(0, start)]  # (current_distance, node)
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    visited = set()
    
    while min_heap:
        dist, node = heapq.heappop(min_heap)
        
        if node in visited:
            continue
        visited.add(node)
        
        for neighbor, weight in graph[node]:
            new_dist = dist + weight
            if new_dist < distances[neighbor]:
                distances[neighbor] = new_dist
                heapq.heappush(min_heap, (new_dist, neighbor))
                
    return distances
\`\`\`

##### Java
\`\`\`java
import java.util.*;

class Dijkstra {
    public static class NodeDist {
        String node;
        int distance;
        public NodeDist(String node, int distance) {
            this.node = node;
            this.distance = distance;
        }
    }

    public Map<String, Integer> dijkstra(Map<String, List<NodeDist>> graph, String start) {
        PriorityQueue<NodeDist> minHeap = new PriorityQueue<>(Comparator.comparingInt(nd -> nd.distance));
        minHeap.add(new NodeDist(start, 0));
        
        Map<String, Integer> distances = new HashMap<>();
        for (String node : graph.keySet()) {
            distances.put(node, Integer.MAX_VALUE);
        }
        distances.put(start, 0);
        
        Set<String> visited = new HashSet<>();
        
        while (!minHeap.isEmpty()) {
            NodeDist curr = minHeap.poll();
            String node = curr.node;
            int dist = curr.distance;
            
            if (visited.contains(node)) {
                continue;
            }
            visited.add(node);
            
            if (graph.containsKey(node)) {
                for (NodeDist edge : graph.get(node)) {
                    int newDist = dist + edge.distance;
                    if (newDist < distances.getOrDefault(edge.node, Integer.MAX_VALUE)) {
                        distances.put(edge.node, newDist);
                        minHeap.add(new NodeDist(edge.node, newDist));
                    }
                }
            }
        }
        return distances;
    }
}
\`\`\`

##### C++
\`\`\`cpp
#include <vector>
#include <string>
#include <unordered_map>
#include <queue>
#include <limits>
#include <unordered_set>

struct NodeDist {
    std::string node;
    int distance;
    
    // Greater comparison for Min-Heap
    bool operator>(const NodeDist& other) const {
        return distance > other.distance;
    }
};

std::unordered_map<std::string, int> dijkstra(
    std::unordered_map<std::string, std::vector<std::pair<std::string, int>>>& graph, 
    std::string start
) {
    std::priority_queue<NodeDist, std::vector<NodeDist>, std::greater<NodeDist>> minHeap;
    minHeap.push({start, 0});
    
    std::unordered_map<std::string, int> distances;
    for (const auto& pair : graph) {
        distances[pair.first] = std::numeric_limits<int>::max();
    }
    distances[start] = 0;
    
    std::unordered_set<std::string> visited;
    
    while (!minHeap.empty()) {
        NodeDist curr = minHeap.top();
        minHeap.pop();
        
        std::string node = curr.node;
        int dist = curr.distance;
        
        if (visited.find(node) != visited.end()) {
            continue;
        }
        visited.insert(node);
        
        for (const auto& edge : graph[node]) {
            std::string neighbor = edge.first;
            int weight = edge.second;
            
            int newDist = dist + weight;
            if (newDist < distances[neighbor]) {
                distances[neighbor] = newDist;
                minHeap.push({neighbor, newDist});
            }
        }
    }
    return distances;
}
\`\`\`

##### TypeScript
\`\`\`typescript
interface Edge {
  node: string;
  weight: number;
}

function dijkstra(graph: Record<string, Edge[]>, start: string): Record<string, number> {
  const distances: Record<string, number> = {};
  for (const node of Object.keys(graph)) {
    distances[node] = Infinity;
  }
  distances[start] = 0;
  
  const minHeap: [number, string][] = [[0, start]];
  const visited = new Set<string>();
  
  while (minHeap.length > 0) {
    minHeap.sort((a, b) => a[0] - b[0]);
    const [dist, node] = minHeap.shift()!;
    
    if (visited.has(node)) {
      continue;
    }
    visited.add(node);
    
    const neighbors = graph[node] || [];
    for (const { node: neighbor, weight } of neighbors) {
      const newDist = dist + weight;
      if (newDist < distances[neighbor]) {
        distances[neighbor] = newDist;
        minHeap.push([newDist, neighbor]);
      }
    }
  }
  
  return distances;
}
\`\`\`

---

### Pattern 4: Disjoint Set Union (DSU / Union-Find)

The **Disjoint Set Union (Union-Find)** data structure tracks elements split into non-overlapping subsets. It is useful for:
1. Cycle detection in undirected graphs.
2. Kruskal's algorithm (Minimum Spanning Tree).
3. Finding connected components in dynamic graphs.

DSU implements two main operations:
* **Find**: Determine which subset an element belongs to (returns the representative or parent of the set).
* **Union**: Join two subsets into a single subset.

#### DSU Optimization: Path Compression & Union by Rank
Without optimization, DSU find operations can degrade to \`O(n)\` if elements form a long linear chain. We use two tricks:
1. **Path Compression**: During a \`find\` call, we update the parent pointer of every node visited to point directly to the root. This flattens the tree.
2. **Union by Rank**: Always attach the smaller tree (lower rank) under the root of the larger tree (higher rank) to keep the depth balanced.

##### Union-Find Implementation

##### Python
\`\`\`python
class UnionFind:
    def __init__(self, size: int):
        self.parent = [i for i in range(size)]
        self.rank = [1] * size

    def find(self, i: int) -> int:
        if self.parent[i] == i:
            return i
        self.parent[i] = self.find(self.parent[i])  # Path Compression
        return self.parent[i]

    def union(self, i: int, j: int) -> bool:
        root_i = self.find(i)
        root_j = self.find(j)
        
        if root_i != root_j:
            # Union by Rank
            if self.rank[root_i] > self.rank[root_j]:
                self.parent[root_j] = root_i
            elif self.rank[root_i] < self.rank[root_j]:
                self.parent[root_i] = root_j
            else:
                self.parent[root_j] = root_i
                self.rank[root_i] += 1
            return True # Successfully joined
        return False # They were already in the same set (cycle detected!)
\`\`\`

##### Java
\`\`\`java
class UnionFind {
    private final int[] parent;
    private final int[] rank;

    public UnionFind(int size) {
        parent = new int[size];
        rank = new int[size];
        for (int i = 0; i < size; i++) {
            parent[i] = i;
            rank[i] = 1;
        }
    }

    public int find(int i) {
        if (parent[i] == i) {
            return i;
        }
        parent[i] = find(parent[i]); // Path Compression
        return parent[i];
    }

    public boolean union(int i, int j) {
        int rootI = find(i);
        int rootJ = find(j);
        
        if (rootI != rootJ) {
            // Union by Rank
            if (rank[rootI] > rank[rootJ]) {
                parent[rootJ] = rootI;
            } else if (rank[rootI] < rank[rootJ]) {
                parent[rootI] = rootJ;
            } else {
                parent[rootJ] = rootI;
                rank[rootI] += 1;
            }
            return true; // Successfully joined
        }
        return false; // Already in the same set
    }
}
\`\`\`

##### C++
\`\`\`cpp
#include <vector>

class UnionFind {
private:
    std::vector<int> parent;
    std::vector<int> rank;

public:
    UnionFind(int size) {
        parent.resize(size);
        rank.assign(size, 1);
        for (int i = 0; i < size; ++i) {
            parent[i] = i;
        }
    }

    int find(int i) {
        if (parent[i] == i) {
            return i;
        }
        parent[i] = find(parent[i]); // Path Compression
        return parent[i];
    }

    bool unionSets(int i, int j) {
        int rootI = find(i);
        int rootJ = find(j);
        
        if (rootI != rootJ) {
            // Union by Rank
            if (rank[rootI] > rank[rootJ]) {
                parent[rootJ] = rootI;
            } else if (rank[rootI] < rank[rootJ]) {
                parent[rootI] = rootJ;
            } else {
                parent[rootJ] = rootI;
                rank[rootI] += 1;
            }
            return true; // Successfully joined
        }
        return false; // Already in the same set
    }
};
\`\`\`

##### TypeScript
\`\`\`typescript
class UnionFind {
  private parent: number[];
  private rank: number[];

  constructor(size: number) {
    this.parent = Array.from({ length: size }, (_, i) => i);
    this.rank = new Array(size).fill(1);
  }

  find(i: number): number {
    if (this.parent[i] === i) {
      return i;
    }
    this.parent[i] = this.find(this.parent[i]); // Path Compression
    return this.parent[i];
  }

  union(i: number, j: number): boolean {
    const rootI = this.find(i);
    const rootJ = this.find(j);

    if (rootI !== rootJ) {
      // Union by Rank
      if (this.rank[rootI] > this.rank[rootJ]) {
        this.parent[rootJ] = rootI;
      } else if (this.rank[rootI] < this.rank[rootJ]) {
        this.parent[rootI] = rootJ;
      } else {
        this.parent[rootJ] = rootI;
        this.rank[rootI] += 1;
      }
      return true; // Successfully joined
    }
    return false; // Already in the same set
  }
}
\`\`\`

---

## Complete Graph Traversals in 4 Languages

Let's write standard BFS on an adjacency list in Python, Java, C++, and TypeScript.

##### Python
\`\`\`python
from collections import deque

def bfs(graph: dict, start: str) -> list:
    visited = set([start])
    queue = deque([start])
    order = []
    
    while queue:
        node = queue.popleft()
        order.append(node)
        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    return order
\`\`\`

##### Java
\`\`\`java
import java.util.*;

public class GraphBFS {
    public List<String> bfs(Map<String, List<String>> graph, String start) {
        Set<String> visited = new HashSet<>();
        Queue<String> queue = new LinkedList<>();
        List<String> order = new ArrayList<>();

        visited.add(start);
        queue.add(start);

        while (!queue.isEmpty()) {
            String node = queue.poll();
            order.add(node);
            for (String neighbor : graph.getOrDefault(node, new ArrayList<>())) {
                if (!visited.contains(neighbor)) {
                    visited.add(neighbor);
                    queue.add(neighbor);
                }
            }
        }
        return order;
    }
}
\`\`\`

##### C++
\`\`\`cpp
#include <iostream>
#include <unordered_map>
#include <unordered_set>
#include <vector>
#include <queue>
#include <string>

using namespace std;

vector<string> bfs(unordered_map<string, vector<string>>& graph, string start) {
    unordered_set<string> visited;
    queue<string> q;
    vector<string> order;

    visited.insert(start);
    q.push(start);

    while (!q.empty()) {
        string node = q.front();
        q.pop();
        order.push_back(node);

        for (const string& neighbor : graph[node]) {
            if (visited.find(neighbor) == visited.end()) {
                visited.insert(neighbor);
                q.push(neighbor);
            }
        }
    }
    return order;
}
\`\`\`

##### TypeScript
\`\`\`typescript
function bfs(graph: Map<string, string[]>, start: string): string[] {
  const visited = new Set<string>();
  const queue: string[] = [start];
  const order: string[] = [];

  visited.add(start);

  while (queue.length > 0) {
    const node = queue.shift()!;
    order.push(node);

    const neighbors = graph.get(node) || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return order;
}
\`\`\`

---

## Step-by-Step Kahn's Course Schedule Trace

Suppose we have \`numCourses = 3\` and \`prerequisites = [[1, 0], [2, 1]]\`.
This means:
* Course 0 must be taken before Course 1 (\`0 -> 1\`).
* Course 1 must be taken before Course 2 (\`1 -> 2\`).

##### 1. Initial State
* In-degrees: \`{0: 0, 1: 1, 2: 1}\`
* Adjacency list: \`{0: [1], 1: [2], 2: []}\`
* Queue: \`[0]\` (since in-degree of 0 is 0).

##### 2. Trace Table

| Step | Node Popped | Neighbors checked | In-degree changes | Nodes pushed to Queue | Visited Count |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | \`0\` | \`1\` | In-degree of 1 drops to 0 | \`[1]\` | 1 |
| **2** | \`1\` | \`2\` | In-degree of 2 drops to 0 | \`[2]\` | 2 |
| **3** | \`2\` | None | - | None | 3 |

* **Termination**: Queue is empty. Visited Count is 3, which equals numCourses. We can complete all courses!

---

## Common Interview Pitfalls and Debugging Strategies

1. **Cycle Infinitum**:
   * **Symptom**: Your traversal runs forever and hits a stack overflow or timeout.
   * **Cause**: You forgot to register visited nodes in your Visited Set, causing you to revisit the same loop repeatedly.
   * **Fix**: Always mark the starting node as visited *immediately* before pushing it to a queue or executing the recursion step.

2. **Index Out of Bounds in Grids**:
   * **Symptom**: \`IndexOutOfBoundsException\` or \`undefined\` reads during grid traversal.
   * **Cause**: You forgot to check boundaries before accessing \`grid[r][c]\`.
   * **Fix**: Validate borders first: \`if r < 0 or r >= rows or c < 0 or c >= cols: return\`.

3. **Directed Cycle Detection DFS (Three-State Coloring)**:
   * **Symptom**: Traditional visited sets fail to detect cycles in directed graphs.
   * **Cause**: A node might be visited from two independent paths without there being a cycle.
   * **Fix**: Use a three-state marker array (0 = unvisited, 1 = visiting/on stack, 2 = fully processed). A cycle is detected only if you encounter a neighbor in the 'visiting' state.

---

## Practice Problems & Website Verifications

Verify your graph traversals and scheduling algorithms on our platform:
* [Number of Islands](/problem/number-of-islands) — Run 4-directional DFS to count components.
* [Clone Graph](/problem/clone-graph) — Traverse using a Hash Map to clone deep nodes.
* [Course Schedule](/problem/course-schedule) — Implement Kahn's Topological Sort.
`;
