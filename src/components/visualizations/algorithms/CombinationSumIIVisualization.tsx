import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { SimpleStepControls } from '../shared/SimpleStepControls';
import { VariablePanel } from '../shared/VariablePanel';
import { AnimatedCodeEditor } from '../shared/AnimatedCodeEditor';
import { VisualizationLayout } from '../shared/VisualizationLayout';
import { motion } from 'framer-motion';

interface Step {
  candidates: number[];
  target: number;
  current: number[];
  sum: number;
  i: number;
  allCombinations: number[][];
  variables: Record<string, any>;
  explanation: string;
  highlightedLines: number[];
  lineExecution: string;
}

export const CombinationSumIIVisualization = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps: Step[] = [
  {
    "candidates": [
      2,
      5,
      2,
      1,
      2
    ],
    "target": 5,
    "current": [],
    "sum": 0,
    "i": 0,
    "allCombinations": [],
    "variables": {
      "candidates": "[2,5,2,1,2]",
      "target": 5
    },
    "explanation": "Starting with candidates [2,5,2,1,2] and target 5.",
    "highlightedLines": [
      1
    ],
    "lineExecution": "function combinationSum2(candidates: number[], target: number): number[][]"
  },
  {
    "candidates": [
      2,
      5,
      2,
      1,
      2
    ],
    "target": 5,
    "current": [],
    "sum": 0,
    "i": 0,
    "allCombinations": [],
    "variables": {
      "result": "[]"
    },
    "explanation": "Initialize empty result array to store all unique combinations.",
    "highlightedLines": [
      2
    ],
    "lineExecution": "const result: number[][] = [];"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [],
    "sum": 0,
    "i": 0,
    "allCombinations": [],
    "variables": {
      "candidates": "[1,2,2,2,5]"
    },
    "explanation": "Sort the candidates array to easily skip duplicates.",
    "highlightedLines": [
      3
    ],
    "lineExecution": "candidates.sort((a, b) => a - b);"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [],
    "sum": 0,
    "i": 0,
    "allCombinations": [],
    "variables": {},
    "explanation": "Define the depth-first search (DFS) function.",
    "highlightedLines": [
      5
    ],
    "lineExecution": "function dfs(i: number, current: number[], total: number): void"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [],
    "sum": 0,
    "i": 0,
    "allCombinations": [],
    "variables": {},
    "explanation": "Start the DFS from the beginning of the candidates array.",
    "highlightedLines": [
      26
    ],
    "lineExecution": "dfs(0, [], 0);"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [],
    "sum": 0,
    "i": 0,
    "allCombinations": [],
    "variables": {
      "i": 0,
      "current": "[]",
      "total": 0
    },
    "explanation": "dfs called with i=0, current=[], total=0",
    "highlightedLines": [
      5
    ],
    "lineExecution": "dfs(0, [], 0)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [],
    "sum": 0,
    "i": 0,
    "allCombinations": [],
    "variables": {
      "total": 0,
      "target": 5
    },
    "explanation": "Check if total (0) equals target (5).",
    "highlightedLines": [
      6
    ],
    "lineExecution": "if (total === target)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [],
    "sum": 0,
    "i": 0,
    "allCombinations": [],
    "variables": {
      "total": 0,
      "target": 5,
      "i": 0,
      "len": 5
    },
    "explanation": "Check if total exceeds target or we reached the end of candidates.",
    "highlightedLines": [
      11
    ],
    "lineExecution": "if (total > target || i === candidates.length)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      1
    ],
    "sum": 0,
    "i": 0,
    "allCombinations": [],
    "variables": {
      "current": "[1]"
    },
    "explanation": "Include candidates[0] (1) in the current combination.",
    "highlightedLines": [
      15
    ],
    "lineExecution": "current.push(candidates[i]);"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      1
    ],
    "sum": 0,
    "i": 0,
    "allCombinations": [],
    "variables": {
      "next_i": 1,
      "next_total": 1
    },
    "explanation": "Recurse with the updated sum and the next index.",
    "highlightedLines": [
      16
    ],
    "lineExecution": "dfs(1, current, 1);"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      1
    ],
    "sum": 1,
    "i": 1,
    "allCombinations": [],
    "variables": {
      "i": 1,
      "current": "[1]",
      "total": 1
    },
    "explanation": "dfs called with i=1, current=[1], total=1",
    "highlightedLines": [
      5
    ],
    "lineExecution": "dfs(1, [1], 1)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      1
    ],
    "sum": 1,
    "i": 1,
    "allCombinations": [],
    "variables": {
      "total": 1,
      "target": 5
    },
    "explanation": "Check if total (1) equals target (5).",
    "highlightedLines": [
      6
    ],
    "lineExecution": "if (total === target)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      1
    ],
    "sum": 1,
    "i": 1,
    "allCombinations": [],
    "variables": {
      "total": 1,
      "target": 5,
      "i": 1,
      "len": 5
    },
    "explanation": "Check if total exceeds target or we reached the end of candidates.",
    "highlightedLines": [
      11
    ],
    "lineExecution": "if (total > target || i === candidates.length)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      1,
      2
    ],
    "sum": 1,
    "i": 1,
    "allCombinations": [],
    "variables": {
      "current": "[1,2]"
    },
    "explanation": "Include candidates[1] (2) in the current combination.",
    "highlightedLines": [
      15
    ],
    "lineExecution": "current.push(candidates[i]);"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      1,
      2
    ],
    "sum": 1,
    "i": 1,
    "allCombinations": [],
    "variables": {
      "next_i": 2,
      "next_total": 3
    },
    "explanation": "Recurse with the updated sum and the next index.",
    "highlightedLines": [
      16
    ],
    "lineExecution": "dfs(2, current, 3);"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      1,
      2
    ],
    "sum": 3,
    "i": 2,
    "allCombinations": [],
    "variables": {
      "i": 2,
      "current": "[1,2]",
      "total": 3
    },
    "explanation": "dfs called with i=2, current=[1,2], total=3",
    "highlightedLines": [
      5
    ],
    "lineExecution": "dfs(2, [1,2], 3)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      1,
      2
    ],
    "sum": 3,
    "i": 2,
    "allCombinations": [],
    "variables": {
      "total": 3,
      "target": 5
    },
    "explanation": "Check if total (3) equals target (5).",
    "highlightedLines": [
      6
    ],
    "lineExecution": "if (total === target)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      1,
      2
    ],
    "sum": 3,
    "i": 2,
    "allCombinations": [],
    "variables": {
      "total": 3,
      "target": 5,
      "i": 2,
      "len": 5
    },
    "explanation": "Check if total exceeds target or we reached the end of candidates.",
    "highlightedLines": [
      11
    ],
    "lineExecution": "if (total > target || i === candidates.length)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      1,
      2,
      2
    ],
    "sum": 3,
    "i": 2,
    "allCombinations": [],
    "variables": {
      "current": "[1,2,2]"
    },
    "explanation": "Include candidates[2] (2) in the current combination.",
    "highlightedLines": [
      15
    ],
    "lineExecution": "current.push(candidates[i]);"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      1,
      2,
      2
    ],
    "sum": 3,
    "i": 2,
    "allCombinations": [],
    "variables": {
      "next_i": 3,
      "next_total": 5
    },
    "explanation": "Recurse with the updated sum and the next index.",
    "highlightedLines": [
      16
    ],
    "lineExecution": "dfs(3, current, 5);"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      1,
      2,
      2
    ],
    "sum": 5,
    "i": 3,
    "allCombinations": [],
    "variables": {
      "i": 3,
      "current": "[1,2,2]",
      "total": 5
    },
    "explanation": "dfs called with i=3, current=[1,2,2], total=5",
    "highlightedLines": [
      5
    ],
    "lineExecution": "dfs(3, [1,2,2], 5)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      1,
      2,
      2
    ],
    "sum": 5,
    "i": 3,
    "allCombinations": [],
    "variables": {
      "total": 5,
      "target": 5
    },
    "explanation": "Check if total (5) equals target (5).",
    "highlightedLines": [
      6
    ],
    "lineExecution": "if (total === target)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      1,
      2,
      2
    ],
    "sum": 5,
    "i": 3,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "result": "[[1,2,2]]"
    },
    "explanation": "Valid combination found! Add to result and return.",
    "highlightedLines": [
      7,
      8
    ],
    "lineExecution": "result.push([...current]); return;"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      1,
      2
    ],
    "sum": 3,
    "i": 2,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "current": "[1,2]"
    },
    "explanation": "Backtrack: Remove candidates[2] (2) from the current combination.",
    "highlightedLines": [
      17
    ],
    "lineExecution": "current.pop();"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      1,
      2
    ],
    "sum": 3,
    "i": 2,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "i": 2
    },
    "explanation": "Skip duplicate numbers to avoid duplicate combinations.",
    "highlightedLines": [
      19
    ],
    "lineExecution": "while (i + 1 < candidates.length && candidates[i] === candidates[i + 1])"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      1,
      2
    ],
    "sum": 3,
    "i": 3,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "i": 3
    },
    "explanation": "Skip duplicate candidate 2.",
    "highlightedLines": [
      20
    ],
    "lineExecution": "i++;"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      1,
      2
    ],
    "sum": 3,
    "i": 3,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "i": 3
    },
    "explanation": "Check for more duplicates.",
    "highlightedLines": [
      19
    ],
    "lineExecution": "while (...)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      1,
      2
    ],
    "sum": 3,
    "i": 3,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "next_i": 4
    },
    "explanation": "Recurse excluding the current candidate (and its duplicates).",
    "highlightedLines": [
      23
    ],
    "lineExecution": "dfs(4, current, total);"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      1,
      2
    ],
    "sum": 3,
    "i": 4,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "i": 4,
      "current": "[1,2]",
      "total": 3
    },
    "explanation": "dfs called with i=4, current=[1,2], total=3",
    "highlightedLines": [
      5
    ],
    "lineExecution": "dfs(4, [1,2], 3)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      1,
      2
    ],
    "sum": 3,
    "i": 4,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "total": 3,
      "target": 5
    },
    "explanation": "Check if total (3) equals target (5).",
    "highlightedLines": [
      6
    ],
    "lineExecution": "if (total === target)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      1,
      2
    ],
    "sum": 3,
    "i": 4,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "total": 3,
      "target": 5,
      "i": 4,
      "len": 5
    },
    "explanation": "Check if total exceeds target or we reached the end of candidates.",
    "highlightedLines": [
      11
    ],
    "lineExecution": "if (total > target || i === candidates.length)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      1,
      2,
      5
    ],
    "sum": 3,
    "i": 4,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "current": "[1,2,5]"
    },
    "explanation": "Include candidates[4] (5) in the current combination.",
    "highlightedLines": [
      15
    ],
    "lineExecution": "current.push(candidates[i]);"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      1,
      2,
      5
    ],
    "sum": 3,
    "i": 4,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "next_i": 5,
      "next_total": 8
    },
    "explanation": "Recurse with the updated sum and the next index.",
    "highlightedLines": [
      16
    ],
    "lineExecution": "dfs(5, current, 8);"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      1,
      2,
      5
    ],
    "sum": 8,
    "i": 5,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "i": 5,
      "current": "[1,2,5]",
      "total": 8
    },
    "explanation": "dfs called with i=5, current=[1,2,5], total=8",
    "highlightedLines": [
      5
    ],
    "lineExecution": "dfs(5, [1,2,5], 8)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      1,
      2,
      5
    ],
    "sum": 8,
    "i": 5,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "total": 8,
      "target": 5
    },
    "explanation": "Check if total (8) equals target (5).",
    "highlightedLines": [
      6
    ],
    "lineExecution": "if (total === target)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      1,
      2,
      5
    ],
    "sum": 8,
    "i": 5,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "total": 8,
      "target": 5,
      "i": 5,
      "len": 5
    },
    "explanation": "Check if total exceeds target or we reached the end of candidates.",
    "highlightedLines": [
      11
    ],
    "lineExecution": "if (total > target || i === candidates.length)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      1,
      2,
      5
    ],
    "sum": 8,
    "i": 5,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {},
    "explanation": "Condition met, backtrack.",
    "highlightedLines": [
      12
    ],
    "lineExecution": "return;"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      1,
      2
    ],
    "sum": 3,
    "i": 4,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "current": "[1,2]"
    },
    "explanation": "Backtrack: Remove candidates[4] (5) from the current combination.",
    "highlightedLines": [
      17
    ],
    "lineExecution": "current.pop();"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      1,
      2
    ],
    "sum": 3,
    "i": 4,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "i": 4
    },
    "explanation": "Skip duplicate numbers to avoid duplicate combinations.",
    "highlightedLines": [
      19
    ],
    "lineExecution": "while (i + 1 < candidates.length && candidates[i] === candidates[i + 1])"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      1,
      2
    ],
    "sum": 3,
    "i": 4,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "next_i": 5
    },
    "explanation": "Recurse excluding the current candidate (and its duplicates).",
    "highlightedLines": [
      23
    ],
    "lineExecution": "dfs(5, current, total);"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      1,
      2
    ],
    "sum": 3,
    "i": 5,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "i": 5,
      "current": "[1,2]",
      "total": 3
    },
    "explanation": "dfs called with i=5, current=[1,2], total=3",
    "highlightedLines": [
      5
    ],
    "lineExecution": "dfs(5, [1,2], 3)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      1,
      2
    ],
    "sum": 3,
    "i": 5,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "total": 3,
      "target": 5
    },
    "explanation": "Check if total (3) equals target (5).",
    "highlightedLines": [
      6
    ],
    "lineExecution": "if (total === target)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      1,
      2
    ],
    "sum": 3,
    "i": 5,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "total": 3,
      "target": 5,
      "i": 5,
      "len": 5
    },
    "explanation": "Check if total exceeds target or we reached the end of candidates.",
    "highlightedLines": [
      11
    ],
    "lineExecution": "if (total > target || i === candidates.length)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      1,
      2
    ],
    "sum": 3,
    "i": 5,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {},
    "explanation": "Condition met, backtrack.",
    "highlightedLines": [
      12
    ],
    "lineExecution": "return;"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      1
    ],
    "sum": 1,
    "i": 1,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "current": "[1]"
    },
    "explanation": "Backtrack: Remove candidates[1] (2) from the current combination.",
    "highlightedLines": [
      17
    ],
    "lineExecution": "current.pop();"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      1
    ],
    "sum": 1,
    "i": 1,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "i": 1
    },
    "explanation": "Skip duplicate numbers to avoid duplicate combinations.",
    "highlightedLines": [
      19
    ],
    "lineExecution": "while (i + 1 < candidates.length && candidates[i] === candidates[i + 1])"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      1
    ],
    "sum": 1,
    "i": 2,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "i": 2
    },
    "explanation": "Skip duplicate candidate 2.",
    "highlightedLines": [
      20
    ],
    "lineExecution": "i++;"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      1
    ],
    "sum": 1,
    "i": 2,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "i": 2
    },
    "explanation": "Check for more duplicates.",
    "highlightedLines": [
      19
    ],
    "lineExecution": "while (...)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      1
    ],
    "sum": 1,
    "i": 3,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "i": 3
    },
    "explanation": "Skip duplicate candidate 2.",
    "highlightedLines": [
      20
    ],
    "lineExecution": "i++;"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      1
    ],
    "sum": 1,
    "i": 3,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "i": 3
    },
    "explanation": "Check for more duplicates.",
    "highlightedLines": [
      19
    ],
    "lineExecution": "while (...)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      1
    ],
    "sum": 1,
    "i": 3,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "next_i": 4
    },
    "explanation": "Recurse excluding the current candidate (and its duplicates).",
    "highlightedLines": [
      23
    ],
    "lineExecution": "dfs(4, current, total);"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      1
    ],
    "sum": 1,
    "i": 4,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "i": 4,
      "current": "[1]",
      "total": 1
    },
    "explanation": "dfs called with i=4, current=[1], total=1",
    "highlightedLines": [
      5
    ],
    "lineExecution": "dfs(4, [1], 1)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      1
    ],
    "sum": 1,
    "i": 4,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "total": 1,
      "target": 5
    },
    "explanation": "Check if total (1) equals target (5).",
    "highlightedLines": [
      6
    ],
    "lineExecution": "if (total === target)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      1
    ],
    "sum": 1,
    "i": 4,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "total": 1,
      "target": 5,
      "i": 4,
      "len": 5
    },
    "explanation": "Check if total exceeds target or we reached the end of candidates.",
    "highlightedLines": [
      11
    ],
    "lineExecution": "if (total > target || i === candidates.length)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      1,
      5
    ],
    "sum": 1,
    "i": 4,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "current": "[1,5]"
    },
    "explanation": "Include candidates[4] (5) in the current combination.",
    "highlightedLines": [
      15
    ],
    "lineExecution": "current.push(candidates[i]);"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      1,
      5
    ],
    "sum": 1,
    "i": 4,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "next_i": 5,
      "next_total": 6
    },
    "explanation": "Recurse with the updated sum and the next index.",
    "highlightedLines": [
      16
    ],
    "lineExecution": "dfs(5, current, 6);"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      1,
      5
    ],
    "sum": 6,
    "i": 5,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "i": 5,
      "current": "[1,5]",
      "total": 6
    },
    "explanation": "dfs called with i=5, current=[1,5], total=6",
    "highlightedLines": [
      5
    ],
    "lineExecution": "dfs(5, [1,5], 6)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      1,
      5
    ],
    "sum": 6,
    "i": 5,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "total": 6,
      "target": 5
    },
    "explanation": "Check if total (6) equals target (5).",
    "highlightedLines": [
      6
    ],
    "lineExecution": "if (total === target)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      1,
      5
    ],
    "sum": 6,
    "i": 5,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "total": 6,
      "target": 5,
      "i": 5,
      "len": 5
    },
    "explanation": "Check if total exceeds target or we reached the end of candidates.",
    "highlightedLines": [
      11
    ],
    "lineExecution": "if (total > target || i === candidates.length)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      1,
      5
    ],
    "sum": 6,
    "i": 5,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {},
    "explanation": "Condition met, backtrack.",
    "highlightedLines": [
      12
    ],
    "lineExecution": "return;"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      1
    ],
    "sum": 1,
    "i": 4,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "current": "[1]"
    },
    "explanation": "Backtrack: Remove candidates[4] (5) from the current combination.",
    "highlightedLines": [
      17
    ],
    "lineExecution": "current.pop();"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      1
    ],
    "sum": 1,
    "i": 4,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "i": 4
    },
    "explanation": "Skip duplicate numbers to avoid duplicate combinations.",
    "highlightedLines": [
      19
    ],
    "lineExecution": "while (i + 1 < candidates.length && candidates[i] === candidates[i + 1])"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      1
    ],
    "sum": 1,
    "i": 4,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "next_i": 5
    },
    "explanation": "Recurse excluding the current candidate (and its duplicates).",
    "highlightedLines": [
      23
    ],
    "lineExecution": "dfs(5, current, total);"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      1
    ],
    "sum": 1,
    "i": 5,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "i": 5,
      "current": "[1]",
      "total": 1
    },
    "explanation": "dfs called with i=5, current=[1], total=1",
    "highlightedLines": [
      5
    ],
    "lineExecution": "dfs(5, [1], 1)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      1
    ],
    "sum": 1,
    "i": 5,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "total": 1,
      "target": 5
    },
    "explanation": "Check if total (1) equals target (5).",
    "highlightedLines": [
      6
    ],
    "lineExecution": "if (total === target)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      1
    ],
    "sum": 1,
    "i": 5,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "total": 1,
      "target": 5,
      "i": 5,
      "len": 5
    },
    "explanation": "Check if total exceeds target or we reached the end of candidates.",
    "highlightedLines": [
      11
    ],
    "lineExecution": "if (total > target || i === candidates.length)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      1
    ],
    "sum": 1,
    "i": 5,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {},
    "explanation": "Condition met, backtrack.",
    "highlightedLines": [
      12
    ],
    "lineExecution": "return;"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [],
    "sum": 0,
    "i": 0,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "current": "[]"
    },
    "explanation": "Backtrack: Remove candidates[0] (1) from the current combination.",
    "highlightedLines": [
      17
    ],
    "lineExecution": "current.pop();"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [],
    "sum": 0,
    "i": 0,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "i": 0
    },
    "explanation": "Skip duplicate numbers to avoid duplicate combinations.",
    "highlightedLines": [
      19
    ],
    "lineExecution": "while (i + 1 < candidates.length && candidates[i] === candidates[i + 1])"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [],
    "sum": 0,
    "i": 0,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "next_i": 1
    },
    "explanation": "Recurse excluding the current candidate (and its duplicates).",
    "highlightedLines": [
      23
    ],
    "lineExecution": "dfs(1, current, total);"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [],
    "sum": 0,
    "i": 1,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "i": 1,
      "current": "[]",
      "total": 0
    },
    "explanation": "dfs called with i=1, current=[], total=0",
    "highlightedLines": [
      5
    ],
    "lineExecution": "dfs(1, [], 0)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [],
    "sum": 0,
    "i": 1,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "total": 0,
      "target": 5
    },
    "explanation": "Check if total (0) equals target (5).",
    "highlightedLines": [
      6
    ],
    "lineExecution": "if (total === target)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [],
    "sum": 0,
    "i": 1,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "total": 0,
      "target": 5,
      "i": 1,
      "len": 5
    },
    "explanation": "Check if total exceeds target or we reached the end of candidates.",
    "highlightedLines": [
      11
    ],
    "lineExecution": "if (total > target || i === candidates.length)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      2
    ],
    "sum": 0,
    "i": 1,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "current": "[2]"
    },
    "explanation": "Include candidates[1] (2) in the current combination.",
    "highlightedLines": [
      15
    ],
    "lineExecution": "current.push(candidates[i]);"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      2
    ],
    "sum": 0,
    "i": 1,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "next_i": 2,
      "next_total": 2
    },
    "explanation": "Recurse with the updated sum and the next index.",
    "highlightedLines": [
      16
    ],
    "lineExecution": "dfs(2, current, 2);"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      2
    ],
    "sum": 2,
    "i": 2,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "i": 2,
      "current": "[2]",
      "total": 2
    },
    "explanation": "dfs called with i=2, current=[2], total=2",
    "highlightedLines": [
      5
    ],
    "lineExecution": "dfs(2, [2], 2)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      2
    ],
    "sum": 2,
    "i": 2,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "total": 2,
      "target": 5
    },
    "explanation": "Check if total (2) equals target (5).",
    "highlightedLines": [
      6
    ],
    "lineExecution": "if (total === target)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      2
    ],
    "sum": 2,
    "i": 2,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "total": 2,
      "target": 5,
      "i": 2,
      "len": 5
    },
    "explanation": "Check if total exceeds target or we reached the end of candidates.",
    "highlightedLines": [
      11
    ],
    "lineExecution": "if (total > target || i === candidates.length)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      2,
      2
    ],
    "sum": 2,
    "i": 2,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "current": "[2,2]"
    },
    "explanation": "Include candidates[2] (2) in the current combination.",
    "highlightedLines": [
      15
    ],
    "lineExecution": "current.push(candidates[i]);"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      2,
      2
    ],
    "sum": 2,
    "i": 2,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "next_i": 3,
      "next_total": 4
    },
    "explanation": "Recurse with the updated sum and the next index.",
    "highlightedLines": [
      16
    ],
    "lineExecution": "dfs(3, current, 4);"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      2,
      2
    ],
    "sum": 4,
    "i": 3,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "i": 3,
      "current": "[2,2]",
      "total": 4
    },
    "explanation": "dfs called with i=3, current=[2,2], total=4",
    "highlightedLines": [
      5
    ],
    "lineExecution": "dfs(3, [2,2], 4)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      2,
      2
    ],
    "sum": 4,
    "i": 3,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "total": 4,
      "target": 5
    },
    "explanation": "Check if total (4) equals target (5).",
    "highlightedLines": [
      6
    ],
    "lineExecution": "if (total === target)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      2,
      2
    ],
    "sum": 4,
    "i": 3,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "total": 4,
      "target": 5,
      "i": 3,
      "len": 5
    },
    "explanation": "Check if total exceeds target or we reached the end of candidates.",
    "highlightedLines": [
      11
    ],
    "lineExecution": "if (total > target || i === candidates.length)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      2,
      2,
      2
    ],
    "sum": 4,
    "i": 3,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "current": "[2,2,2]"
    },
    "explanation": "Include candidates[3] (2) in the current combination.",
    "highlightedLines": [
      15
    ],
    "lineExecution": "current.push(candidates[i]);"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      2,
      2,
      2
    ],
    "sum": 4,
    "i": 3,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "next_i": 4,
      "next_total": 6
    },
    "explanation": "Recurse with the updated sum and the next index.",
    "highlightedLines": [
      16
    ],
    "lineExecution": "dfs(4, current, 6);"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      2,
      2,
      2
    ],
    "sum": 6,
    "i": 4,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "i": 4,
      "current": "[2,2,2]",
      "total": 6
    },
    "explanation": "dfs called with i=4, current=[2,2,2], total=6",
    "highlightedLines": [
      5
    ],
    "lineExecution": "dfs(4, [2,2,2], 6)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      2,
      2,
      2
    ],
    "sum": 6,
    "i": 4,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "total": 6,
      "target": 5
    },
    "explanation": "Check if total (6) equals target (5).",
    "highlightedLines": [
      6
    ],
    "lineExecution": "if (total === target)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      2,
      2,
      2
    ],
    "sum": 6,
    "i": 4,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "total": 6,
      "target": 5,
      "i": 4,
      "len": 5
    },
    "explanation": "Check if total exceeds target or we reached the end of candidates.",
    "highlightedLines": [
      11
    ],
    "lineExecution": "if (total > target || i === candidates.length)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      2,
      2,
      2
    ],
    "sum": 6,
    "i": 4,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {},
    "explanation": "Condition met, backtrack.",
    "highlightedLines": [
      12
    ],
    "lineExecution": "return;"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      2,
      2
    ],
    "sum": 4,
    "i": 3,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "current": "[2,2]"
    },
    "explanation": "Backtrack: Remove candidates[3] (2) from the current combination.",
    "highlightedLines": [
      17
    ],
    "lineExecution": "current.pop();"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      2,
      2
    ],
    "sum": 4,
    "i": 3,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "i": 3
    },
    "explanation": "Skip duplicate numbers to avoid duplicate combinations.",
    "highlightedLines": [
      19
    ],
    "lineExecution": "while (i + 1 < candidates.length && candidates[i] === candidates[i + 1])"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      2,
      2
    ],
    "sum": 4,
    "i": 3,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "next_i": 4
    },
    "explanation": "Recurse excluding the current candidate (and its duplicates).",
    "highlightedLines": [
      23
    ],
    "lineExecution": "dfs(4, current, total);"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      2,
      2
    ],
    "sum": 4,
    "i": 4,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "i": 4,
      "current": "[2,2]",
      "total": 4
    },
    "explanation": "dfs called with i=4, current=[2,2], total=4",
    "highlightedLines": [
      5
    ],
    "lineExecution": "dfs(4, [2,2], 4)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      2,
      2
    ],
    "sum": 4,
    "i": 4,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "total": 4,
      "target": 5
    },
    "explanation": "Check if total (4) equals target (5).",
    "highlightedLines": [
      6
    ],
    "lineExecution": "if (total === target)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      2,
      2
    ],
    "sum": 4,
    "i": 4,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "total": 4,
      "target": 5,
      "i": 4,
      "len": 5
    },
    "explanation": "Check if total exceeds target or we reached the end of candidates.",
    "highlightedLines": [
      11
    ],
    "lineExecution": "if (total > target || i === candidates.length)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      2,
      2,
      5
    ],
    "sum": 4,
    "i": 4,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "current": "[2,2,5]"
    },
    "explanation": "Include candidates[4] (5) in the current combination.",
    "highlightedLines": [
      15
    ],
    "lineExecution": "current.push(candidates[i]);"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      2,
      2,
      5
    ],
    "sum": 4,
    "i": 4,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "next_i": 5,
      "next_total": 9
    },
    "explanation": "Recurse with the updated sum and the next index.",
    "highlightedLines": [
      16
    ],
    "lineExecution": "dfs(5, current, 9);"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      2,
      2,
      5
    ],
    "sum": 9,
    "i": 5,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "i": 5,
      "current": "[2,2,5]",
      "total": 9
    },
    "explanation": "dfs called with i=5, current=[2,2,5], total=9",
    "highlightedLines": [
      5
    ],
    "lineExecution": "dfs(5, [2,2,5], 9)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      2,
      2,
      5
    ],
    "sum": 9,
    "i": 5,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "total": 9,
      "target": 5
    },
    "explanation": "Check if total (9) equals target (5).",
    "highlightedLines": [
      6
    ],
    "lineExecution": "if (total === target)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      2,
      2,
      5
    ],
    "sum": 9,
    "i": 5,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "total": 9,
      "target": 5,
      "i": 5,
      "len": 5
    },
    "explanation": "Check if total exceeds target or we reached the end of candidates.",
    "highlightedLines": [
      11
    ],
    "lineExecution": "if (total > target || i === candidates.length)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      2,
      2,
      5
    ],
    "sum": 9,
    "i": 5,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {},
    "explanation": "Condition met, backtrack.",
    "highlightedLines": [
      12
    ],
    "lineExecution": "return;"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      2,
      2
    ],
    "sum": 4,
    "i": 4,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "current": "[2,2]"
    },
    "explanation": "Backtrack: Remove candidates[4] (5) from the current combination.",
    "highlightedLines": [
      17
    ],
    "lineExecution": "current.pop();"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      2,
      2
    ],
    "sum": 4,
    "i": 4,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "i": 4
    },
    "explanation": "Skip duplicate numbers to avoid duplicate combinations.",
    "highlightedLines": [
      19
    ],
    "lineExecution": "while (i + 1 < candidates.length && candidates[i] === candidates[i + 1])"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      2,
      2
    ],
    "sum": 4,
    "i": 4,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "next_i": 5
    },
    "explanation": "Recurse excluding the current candidate (and its duplicates).",
    "highlightedLines": [
      23
    ],
    "lineExecution": "dfs(5, current, total);"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      2,
      2
    ],
    "sum": 4,
    "i": 5,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "i": 5,
      "current": "[2,2]",
      "total": 4
    },
    "explanation": "dfs called with i=5, current=[2,2], total=4",
    "highlightedLines": [
      5
    ],
    "lineExecution": "dfs(5, [2,2], 4)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      2,
      2
    ],
    "sum": 4,
    "i": 5,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "total": 4,
      "target": 5
    },
    "explanation": "Check if total (4) equals target (5).",
    "highlightedLines": [
      6
    ],
    "lineExecution": "if (total === target)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      2,
      2
    ],
    "sum": 4,
    "i": 5,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "total": 4,
      "target": 5,
      "i": 5,
      "len": 5
    },
    "explanation": "Check if total exceeds target or we reached the end of candidates.",
    "highlightedLines": [
      11
    ],
    "lineExecution": "if (total > target || i === candidates.length)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      2,
      2
    ],
    "sum": 4,
    "i": 5,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {},
    "explanation": "Condition met, backtrack.",
    "highlightedLines": [
      12
    ],
    "lineExecution": "return;"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      2
    ],
    "sum": 2,
    "i": 2,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "current": "[2]"
    },
    "explanation": "Backtrack: Remove candidates[2] (2) from the current combination.",
    "highlightedLines": [
      17
    ],
    "lineExecution": "current.pop();"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      2
    ],
    "sum": 2,
    "i": 2,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "i": 2
    },
    "explanation": "Skip duplicate numbers to avoid duplicate combinations.",
    "highlightedLines": [
      19
    ],
    "lineExecution": "while (i + 1 < candidates.length && candidates[i] === candidates[i + 1])"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      2
    ],
    "sum": 2,
    "i": 3,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "i": 3
    },
    "explanation": "Skip duplicate candidate 2.",
    "highlightedLines": [
      20
    ],
    "lineExecution": "i++;"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      2
    ],
    "sum": 2,
    "i": 3,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "i": 3
    },
    "explanation": "Check for more duplicates.",
    "highlightedLines": [
      19
    ],
    "lineExecution": "while (...)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      2
    ],
    "sum": 2,
    "i": 3,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "next_i": 4
    },
    "explanation": "Recurse excluding the current candidate (and its duplicates).",
    "highlightedLines": [
      23
    ],
    "lineExecution": "dfs(4, current, total);"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      2
    ],
    "sum": 2,
    "i": 4,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "i": 4,
      "current": "[2]",
      "total": 2
    },
    "explanation": "dfs called with i=4, current=[2], total=2",
    "highlightedLines": [
      5
    ],
    "lineExecution": "dfs(4, [2], 2)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      2
    ],
    "sum": 2,
    "i": 4,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "total": 2,
      "target": 5
    },
    "explanation": "Check if total (2) equals target (5).",
    "highlightedLines": [
      6
    ],
    "lineExecution": "if (total === target)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      2
    ],
    "sum": 2,
    "i": 4,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "total": 2,
      "target": 5,
      "i": 4,
      "len": 5
    },
    "explanation": "Check if total exceeds target or we reached the end of candidates.",
    "highlightedLines": [
      11
    ],
    "lineExecution": "if (total > target || i === candidates.length)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      2,
      5
    ],
    "sum": 2,
    "i": 4,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "current": "[2,5]"
    },
    "explanation": "Include candidates[4] (5) in the current combination.",
    "highlightedLines": [
      15
    ],
    "lineExecution": "current.push(candidates[i]);"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      2,
      5
    ],
    "sum": 2,
    "i": 4,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "next_i": 5,
      "next_total": 7
    },
    "explanation": "Recurse with the updated sum and the next index.",
    "highlightedLines": [
      16
    ],
    "lineExecution": "dfs(5, current, 7);"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      2,
      5
    ],
    "sum": 7,
    "i": 5,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "i": 5,
      "current": "[2,5]",
      "total": 7
    },
    "explanation": "dfs called with i=5, current=[2,5], total=7",
    "highlightedLines": [
      5
    ],
    "lineExecution": "dfs(5, [2,5], 7)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      2,
      5
    ],
    "sum": 7,
    "i": 5,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "total": 7,
      "target": 5
    },
    "explanation": "Check if total (7) equals target (5).",
    "highlightedLines": [
      6
    ],
    "lineExecution": "if (total === target)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      2,
      5
    ],
    "sum": 7,
    "i": 5,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "total": 7,
      "target": 5,
      "i": 5,
      "len": 5
    },
    "explanation": "Check if total exceeds target or we reached the end of candidates.",
    "highlightedLines": [
      11
    ],
    "lineExecution": "if (total > target || i === candidates.length)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      2,
      5
    ],
    "sum": 7,
    "i": 5,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {},
    "explanation": "Condition met, backtrack.",
    "highlightedLines": [
      12
    ],
    "lineExecution": "return;"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      2
    ],
    "sum": 2,
    "i": 4,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "current": "[2]"
    },
    "explanation": "Backtrack: Remove candidates[4] (5) from the current combination.",
    "highlightedLines": [
      17
    ],
    "lineExecution": "current.pop();"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      2
    ],
    "sum": 2,
    "i": 4,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "i": 4
    },
    "explanation": "Skip duplicate numbers to avoid duplicate combinations.",
    "highlightedLines": [
      19
    ],
    "lineExecution": "while (i + 1 < candidates.length && candidates[i] === candidates[i + 1])"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      2
    ],
    "sum": 2,
    "i": 4,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "next_i": 5
    },
    "explanation": "Recurse excluding the current candidate (and its duplicates).",
    "highlightedLines": [
      23
    ],
    "lineExecution": "dfs(5, current, total);"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      2
    ],
    "sum": 2,
    "i": 5,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "i": 5,
      "current": "[2]",
      "total": 2
    },
    "explanation": "dfs called with i=5, current=[2], total=2",
    "highlightedLines": [
      5
    ],
    "lineExecution": "dfs(5, [2], 2)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      2
    ],
    "sum": 2,
    "i": 5,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "total": 2,
      "target": 5
    },
    "explanation": "Check if total (2) equals target (5).",
    "highlightedLines": [
      6
    ],
    "lineExecution": "if (total === target)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      2
    ],
    "sum": 2,
    "i": 5,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "total": 2,
      "target": 5,
      "i": 5,
      "len": 5
    },
    "explanation": "Check if total exceeds target or we reached the end of candidates.",
    "highlightedLines": [
      11
    ],
    "lineExecution": "if (total > target || i === candidates.length)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      2
    ],
    "sum": 2,
    "i": 5,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {},
    "explanation": "Condition met, backtrack.",
    "highlightedLines": [
      12
    ],
    "lineExecution": "return;"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [],
    "sum": 0,
    "i": 1,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "current": "[]"
    },
    "explanation": "Backtrack: Remove candidates[1] (2) from the current combination.",
    "highlightedLines": [
      17
    ],
    "lineExecution": "current.pop();"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [],
    "sum": 0,
    "i": 1,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "i": 1
    },
    "explanation": "Skip duplicate numbers to avoid duplicate combinations.",
    "highlightedLines": [
      19
    ],
    "lineExecution": "while (i + 1 < candidates.length && candidates[i] === candidates[i + 1])"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [],
    "sum": 0,
    "i": 2,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "i": 2
    },
    "explanation": "Skip duplicate candidate 2.",
    "highlightedLines": [
      20
    ],
    "lineExecution": "i++;"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [],
    "sum": 0,
    "i": 2,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "i": 2
    },
    "explanation": "Check for more duplicates.",
    "highlightedLines": [
      19
    ],
    "lineExecution": "while (...)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [],
    "sum": 0,
    "i": 3,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "i": 3
    },
    "explanation": "Skip duplicate candidate 2.",
    "highlightedLines": [
      20
    ],
    "lineExecution": "i++;"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [],
    "sum": 0,
    "i": 3,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "i": 3
    },
    "explanation": "Check for more duplicates.",
    "highlightedLines": [
      19
    ],
    "lineExecution": "while (...)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [],
    "sum": 0,
    "i": 3,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "next_i": 4
    },
    "explanation": "Recurse excluding the current candidate (and its duplicates).",
    "highlightedLines": [
      23
    ],
    "lineExecution": "dfs(4, current, total);"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [],
    "sum": 0,
    "i": 4,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "i": 4,
      "current": "[]",
      "total": 0
    },
    "explanation": "dfs called with i=4, current=[], total=0",
    "highlightedLines": [
      5
    ],
    "lineExecution": "dfs(4, [], 0)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [],
    "sum": 0,
    "i": 4,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "total": 0,
      "target": 5
    },
    "explanation": "Check if total (0) equals target (5).",
    "highlightedLines": [
      6
    ],
    "lineExecution": "if (total === target)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [],
    "sum": 0,
    "i": 4,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "total": 0,
      "target": 5,
      "i": 4,
      "len": 5
    },
    "explanation": "Check if total exceeds target or we reached the end of candidates.",
    "highlightedLines": [
      11
    ],
    "lineExecution": "if (total > target || i === candidates.length)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      5
    ],
    "sum": 0,
    "i": 4,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "current": "[5]"
    },
    "explanation": "Include candidates[4] (5) in the current combination.",
    "highlightedLines": [
      15
    ],
    "lineExecution": "current.push(candidates[i]);"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      5
    ],
    "sum": 0,
    "i": 4,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "next_i": 5,
      "next_total": 5
    },
    "explanation": "Recurse with the updated sum and the next index.",
    "highlightedLines": [
      16
    ],
    "lineExecution": "dfs(5, current, 5);"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      5
    ],
    "sum": 5,
    "i": 5,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "i": 5,
      "current": "[5]",
      "total": 5
    },
    "explanation": "dfs called with i=5, current=[5], total=5",
    "highlightedLines": [
      5
    ],
    "lineExecution": "dfs(5, [5], 5)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      5
    ],
    "sum": 5,
    "i": 5,
    "allCombinations": [
      [
        1,
        2,
        2
      ]
    ],
    "variables": {
      "total": 5,
      "target": 5
    },
    "explanation": "Check if total (5) equals target (5).",
    "highlightedLines": [
      6
    ],
    "lineExecution": "if (total === target)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [
      5
    ],
    "sum": 5,
    "i": 5,
    "allCombinations": [
      [
        1,
        2,
        2
      ],
      [
        5
      ]
    ],
    "variables": {
      "result": "[[1,2,2],[5]]"
    },
    "explanation": "Valid combination found! Add to result and return.",
    "highlightedLines": [
      7,
      8
    ],
    "lineExecution": "result.push([...current]); return;"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [],
    "sum": 0,
    "i": 4,
    "allCombinations": [
      [
        1,
        2,
        2
      ],
      [
        5
      ]
    ],
    "variables": {
      "current": "[]"
    },
    "explanation": "Backtrack: Remove candidates[4] (5) from the current combination.",
    "highlightedLines": [
      17
    ],
    "lineExecution": "current.pop();"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [],
    "sum": 0,
    "i": 4,
    "allCombinations": [
      [
        1,
        2,
        2
      ],
      [
        5
      ]
    ],
    "variables": {
      "i": 4
    },
    "explanation": "Skip duplicate numbers to avoid duplicate combinations.",
    "highlightedLines": [
      19
    ],
    "lineExecution": "while (i + 1 < candidates.length && candidates[i] === candidates[i + 1])"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [],
    "sum": 0,
    "i": 4,
    "allCombinations": [
      [
        1,
        2,
        2
      ],
      [
        5
      ]
    ],
    "variables": {
      "next_i": 5
    },
    "explanation": "Recurse excluding the current candidate (and its duplicates).",
    "highlightedLines": [
      23
    ],
    "lineExecution": "dfs(5, current, total);"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [],
    "sum": 0,
    "i": 5,
    "allCombinations": [
      [
        1,
        2,
        2
      ],
      [
        5
      ]
    ],
    "variables": {
      "i": 5,
      "current": "[]",
      "total": 0
    },
    "explanation": "dfs called with i=5, current=[], total=0",
    "highlightedLines": [
      5
    ],
    "lineExecution": "dfs(5, [], 0)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [],
    "sum": 0,
    "i": 5,
    "allCombinations": [
      [
        1,
        2,
        2
      ],
      [
        5
      ]
    ],
    "variables": {
      "total": 0,
      "target": 5
    },
    "explanation": "Check if total (0) equals target (5).",
    "highlightedLines": [
      6
    ],
    "lineExecution": "if (total === target)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [],
    "sum": 0,
    "i": 5,
    "allCombinations": [
      [
        1,
        2,
        2
      ],
      [
        5
      ]
    ],
    "variables": {
      "total": 0,
      "target": 5,
      "i": 5,
      "len": 5
    },
    "explanation": "Check if total exceeds target or we reached the end of candidates.",
    "highlightedLines": [
      11
    ],
    "lineExecution": "if (total > target || i === candidates.length)"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [],
    "sum": 0,
    "i": 5,
    "allCombinations": [
      [
        1,
        2,
        2
      ],
      [
        5
      ]
    ],
    "variables": {},
    "explanation": "Condition met, backtrack.",
    "highlightedLines": [
      12
    ],
    "lineExecution": "return;"
  },
  {
    "candidates": [
      1,
      2,
      2,
      2,
      5
    ],
    "target": 5,
    "current": [],
    "sum": 0,
    "i": 0,
    "allCombinations": [
      [
        1,
        2,
        2
      ],
      [
        5
      ]
    ],
    "variables": {
      "result": "[[1,2,2],[5]]"
    },
    "explanation": "Return the result array containing all unique combinations.",
    "highlightedLines": [
      27
    ],
    "lineExecution": "return result;"
  }
];

  const code = `function combinationSum2(candidates: number[], target: number): number[][] {
  const result: number[][] = [];
  candidates.sort((a, b) => a - b);

  function dfs(i: number, current: number[], total: number): void {
    if (total === target) {
      result.push([...current]);
      return;
    }

    if (total > target || i === candidates.length) {
      return;
    }

    current.push(candidates[i]);
    dfs(i + 1, current, total + candidates[i]);
    current.pop();

    while (i + 1 < candidates.length && candidates[i] === candidates[i + 1]) {
      i++;
    }

    dfs(i + 1, current, total);
  }

  dfs(0, [], 0);
  return result;
}`;

  const step = steps[currentStep];

  return (
    <VisualizationLayout
      leftContent={
        <div className="space-y-4">
          <Card className="p-4">
            <h3 className="text-sm font-semibold mb-4">Combination Sum II</h3>
            <div className="space-y-6">
              
              <div>
                <div className="flex justify-between items-end mb-2">
                  <div className="text-xs font-semibold">Candidates & Pointer 'i'</div>
                  <div className="text-xs text-muted-foreground">Target: <span className="font-mono text-foreground font-bold">{step.target}</span></div>
                </div>
                <div className="flex gap-2 flex-wrap items-center">
                  {step.candidates.map((num, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-1">
                      <div className={`w-8 h-8 flex items-center justify-center rounded border-2 transition-colors ${idx === step.i ? 'border-primary bg-primary/10 text-primary font-bold shadow-sm' : 'border-border bg-muted/30 text-muted-foreground'}`}>
                        {num}
                      </div>
                      <div className="h-3 flex items-center justify-center">
                        {idx === step.i && (
                          <div className="text-[10px] font-bold text-primary animate-bounce">↑</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-end mb-2">
                  <div className="text-xs font-semibold">Current Combination</div>
                  <div className="text-xs text-muted-foreground">Sum: <span className={`font-mono font-bold ${step.sum === step.target ? 'text-green-500' : step.sum > step.target ? 'text-red-500' : 'text-foreground'}`}>{step.sum}</span> / {step.target}</div>
                </div>
                
                <div className="w-full bg-muted rounded-full h-1.5 mb-3 overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${step.sum === step.target ? 'bg-green-500' : step.sum > step.target ? 'bg-red-500' : 'bg-primary'}`} 
                    style={{ width: `${Math.min(100, (step.sum / step.target) * 100)}%` }}
                  />
                </div>

                <div className="flex gap-2 flex-wrap min-h-8">
                  {step.current.length === 0 ? (
                    <div className="h-8 px-3 flex items-center justify-center rounded border border-dashed border-muted-foreground/40 text-muted-foreground text-xs italic">
                      Empty
                    </div>
                  ) : (
                    step.current.map((num, idx) => (
                      <div key={idx} className="w-8 h-8 flex items-center justify-center rounded bg-primary text-primary-foreground font-bold shadow-sm">
                        {num}
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold mb-2">Unique Combinations Found:</div>
                <div className="flex flex-wrap gap-2">
                  {step.allCombinations.length === 0 ? (
                    <div className="text-xs text-muted-foreground italic">None yet</div>
                  ) : (
                    step.allCombinations.map((combo, idx) => (
                      <div key={idx} className="flex gap-1 p-1.5 rounded-md bg-green-500/10 border border-green-500/20">
                        {combo.map((num, nIdx) => (
                          <div key={nIdx} className="w-6 h-6 flex items-center justify-center rounded bg-green-500/20 text-green-700 dark:text-green-400 text-xs font-bold">
                            {num}
                          </div>
                        ))}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-muted/30 border-primary/20">
            <div className="space-y-3">
              <div className="text-sm font-semibold text-primary flex items-center gap-2">
                <span>Explanation</span>
              </div>
              <div className="text-sm leading-relaxed">
                {step.explanation}
              </div>
              <div className="mt-3 pt-3 border-t border-border/50">
                <div className="text-xs text-muted-foreground mb-1">Executing Line:</div>
                <div className="text-xs font-mono bg-background/80 p-2 rounded border">
                  {step.lineExecution}
                </div>
              </div>
            </div>
          </Card>

          <VariablePanel variables={step.variables} />
        </div>
      }
      rightContent={
        <AnimatedCodeEditor
          code={code}
          language="typescript"
          highlightedLines={step.highlightedLines}
        />
      }
      controls={
        <SimpleStepControls
          currentStep={currentStep}
          totalSteps={steps.length}
          onStepChange={setCurrentStep}
        />
      }
    />
  );
};
