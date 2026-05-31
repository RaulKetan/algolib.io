import React, { useEffect, useState } from "react";
import { AnimatedCodeEditor } from "../shared/AnimatedCodeEditor";
import { SimpleStepControls } from "../shared/SimpleStepControls";
import { VariablePanel } from "../shared/VariablePanel";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Step {
  digits: string;
  curStr: string;
  i: number;
  results: string[];
  activeDigitIndex: number | null;
  activeChar: string | null;
  phase: "init" | "recurse" | "base-case" | "loop" | "backtrack" | "done";
  message: string;
  lineNumber: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const DIGIT_MAP: Record<string, string> = {
  "2": "abc",
  "3": "def",
  "4": "ghi",
  "5": "jkl",
  "6": "mno",
  "7": "pqrs",
  "8": "tuv",
  "9": "wxyz",
};

const DIGIT_LABELS: Record<string, string> = {
  "2": "ABC",
  "3": "DEF",
  "4": "GHI",
  "5": "JKL",
  "6": "MNO",
  "7": "PQRS",
  "8": "TUV",
  "9": "WXYZ",
};

const PHASE_COLORS: Record<string, string> = {
  init: "text-blue-400",
  recurse: "text-violet-400",
  "base-case": "text-emerald-400",
  loop: "text-amber-400",
  backtrack: "text-rose-400",
  done: "text-emerald-400",
};

const PHASE_BG: Record<string, string> = {
  init: "bg-blue-500/10 border-blue-500/30",
  recurse: "bg-violet-500/10 border-violet-500/30",
  "base-case": "bg-emerald-500/10 border-emerald-500/30",
  loop: "bg-amber-500/10 border-amber-500/30",
  backtrack: "bg-rose-500/10 border-rose-500/30",
  done: "bg-emerald-500/10 border-emerald-500/30",
};

// ─── Step Generator ───────────────────────────────────────────────────────────

function generateSteps(digits: string): Step[] {
  const steps: Step[] = [];
  const res: string[] = [];

  steps.push({
    digits,
    curStr: "",
    i: 0,
    results: [],
    activeDigitIndex: null,
    activeChar: null,
    phase: "init",
    message: `Start: digits = "${digits}". We will build letter combinations using recursive backtracking.`,
    lineNumber: 1,
  });

  if (!digits) {
    steps.push({
      digits,
      curStr: "",
      i: 0,
      results: [],
      activeDigitIndex: null,
      activeChar: null,
      phase: "done",
      message: "Empty input: return [].",
      lineNumber: 2,
    });
    return steps;
  }

  steps.push({
    digits,
    curStr: "",
    i: 0,
    results: [],
    activeDigitIndex: null,
    activeChar: null,
    phase: "init",
    message: `Initialize empty result array and define the digit-to-letter mapping.`,
    lineNumber: 3,
  });

  function backtrack(i: number, curStr: string) {
    steps.push({
      digits,
      curStr,
      i,
      results: [...res],
      activeDigitIndex: i < digits.length ? i : null,
      activeChar: null,
      phase: "recurse",
      message: `backtrack(i=${i}, curStr="${curStr}") — depth ${i} of ${digits.length}.`,
      lineNumber: 10,
    });

    if (curStr.length === digits.length) {
      res.push(curStr);
      steps.push({
        digits,
        curStr,
        i,
        results: [...res],
        activeDigitIndex: null,
        activeChar: null,
        phase: "base-case",
        message: `✓ Base case! curStr "${curStr}" has length ${curStr.length} = digits.length ${digits.length}. Added to results!`,
        lineNumber: 11,
      });
      return;
    }

    const letters = DIGIT_MAP[digits[i]];

    steps.push({
      digits,
      curStr,
      i,
      results: [...res],
      activeDigitIndex: i,
      activeChar: null,
      phase: "loop",
      message: `Digit "${digits[i]}" maps to "${letters}". Iterating over each letter to try.`,
      lineNumber: 15,
    });

    for (const c of letters) {
      steps.push({
        digits,
        curStr,
        i,
        results: [...res],
        activeDigitIndex: i,
        activeChar: c,
        phase: "loop",
        message: `Choose letter "${c}" from digit "${digits[i]}". Call backtrack(${i + 1}, "${curStr + c}").`,
        lineNumber: 16,
      });

      backtrack(i + 1, curStr + c);

      steps.push({
        digits,
        curStr,
        i,
        results: [...res],
        activeDigitIndex: i,
        activeChar: c,
        phase: "backtrack",
        message: `Backtrack: finished exploring paths starting with "${curStr + c}". Try next letter for digit "${digits[i]}".`,
        lineNumber: 17,
      });
    }
  }

  steps.push({
    digits,
    curStr: "",
    i: 0,
    results: [],
    activeDigitIndex: 0,
    activeChar: null,
    phase: "recurse",
    message: `Begin backtracking from index 0 with empty string.`,
    lineNumber: 20,
  });

  backtrack(0, "");

  steps.push({
    digits,
    curStr: "",
    i: 0,
    results: [...res],
    activeDigitIndex: null,
    activeChar: null,
    phase: "done",
    message: `✓ Complete! Found ${res.length} combinations: [${res.map((r) => `"${r}"`).join(", ")}]`,
    lineNumber: 22,
  });

  return steps;
}

// ─── Phone Keypad Component ───────────────────────────────────────────────────

const KEYPAD_LAYOUT = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["*", "0", "#"],
];

interface KeypadProps {
  digits: string;
  activeDigitIndex: number | null;
  activeChar: string | null;
}

const PhoneKeypad: React.FC<KeypadProps> = ({ digits, activeDigitIndex, activeChar }) => {
  const activeDigit = activeDigitIndex !== null ? digits[activeDigitIndex] : null;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-1">
        Phone Keypad
      </div>
      <div
        className="rounded-2xl p-4 shadow-2xl"
        style={{
          background: "linear-gradient(145deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
          border: "1px solid rgba(100,120,200,0.3)",
          boxShadow: "0 0 40px rgba(60,80,200,0.15), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        {KEYPAD_LAYOUT.map((row, rowIdx) => (
          <div key={rowIdx} className="flex gap-2 mb-2 last:mb-0">
            {row.map((key) => {
              const isActive = key === activeDigit;
              const isInDigits = digits.includes(key) && !["0", "1", "*", "#"].includes(key);
              const letters = DIGIT_LABELS[key] || "";

              return (
                <div
                  key={key}
                  className="relative flex flex-col items-center justify-center rounded-xl transition-all duration-200"
                  style={{
                    width: 56,
                    height: 56,
                    background: isActive
                      ? "linear-gradient(135deg, #7c3aed, #4f46e5)"
                      : isInDigits
                      ? "linear-gradient(135deg, #1e40af, #1d4ed8)"
                      : "linear-gradient(135deg, #1f2937, #111827)",
                    border: isActive
                      ? "1.5px solid #a78bfa"
                      : isInDigits
                      ? "1.5px solid #3b82f6"
                      : "1.5px solid #374151",
                    boxShadow: isActive
                      ? "0 0 18px rgba(124,58,237,0.6), inset 0 1px 0 rgba(255,255,255,0.1)"
                      : isInDigits
                      ? "0 0 10px rgba(59,130,246,0.3), inset 0 1px 0 rgba(255,255,255,0.05)"
                      : "inset 0 1px 0 rgba(255,255,255,0.03)",
                    transform: isActive ? "scale(1.08)" : "scale(1)",
                  }}
                >
                  <span
                    className="font-bold"
                    style={{
                      fontSize: 18,
                      color: isActive ? "#e9d5ff" : isInDigits ? "#93c5fd" : "#9ca3af",
                      lineHeight: 1,
                    }}
                  >
                    {key}
                  </span>
                  {letters && (
                    <span
                      style={{
                        fontSize: 7,
                        letterSpacing: "0.05em",
                        color: isActive ? "#c4b5fd" : isInDigits ? "#60a5fa" : "#6b7280",
                        lineHeight: 1,
                        marginTop: 2,
                      }}
                    >
                      {letters}
                    </span>
                  )}
                  {/* Active letter indicator */}
                  {isActive && activeChar && (
                    <div
                      className="absolute -top-2 -right-2 flex items-center justify-center rounded-full"
                      style={{
                        width: 20,
                        height: 20,
                        background: "linear-gradient(135deg, #f59e0b, #d97706)",
                        border: "1px solid #fbbf24",
                        fontSize: 10,
                        fontWeight: 700,
                        color: "#fff",
                        boxShadow: "0 0 8px rgba(245,158,11,0.8)",
                      }}
                    >
                      {activeChar}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Combination Builder Component ───────────────────────────────────────────

interface BuilderProps {
  digits: string;
  curStr: string;
  activeDigitIndex: number | null;
  activeChar: string | null;
}

const CombinationBuilder: React.FC<BuilderProps> = ({ digits, curStr, activeDigitIndex }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
        Building Combination
      </div>
      <div className="flex gap-1 flex-wrap items-center">
        {digits.split("").map((digit, idx) => {
          const char = curStr[idx];
          const isActive = idx === activeDigitIndex;
          const isFilled = idx < curStr.length;
          const isNext = idx === curStr.length;

          return (
            <React.Fragment key={idx}>
              {idx > 0 && (
                <div className="text-muted-foreground/30 text-xs">+</div>
              )}
              <div className="flex flex-col items-center gap-1">
                <div
                  className="flex flex-col items-center justify-center rounded-lg transition-all duration-200"
                  style={{
                    width: 44,
                    height: 44,
                    background: isActive
                      ? "linear-gradient(135deg, #7c3aed33, #4f46e533)"
                      : isFilled
                      ? "linear-gradient(135deg, #059669, #047857)"
                      : isNext
                      ? "linear-gradient(135deg, #92400e33, #78350f33)"
                      : "transparent",
                    border: isActive
                      ? "1.5px solid #7c3aed"
                      : isFilled
                      ? "1.5px solid #10b981"
                      : isNext
                      ? "1.5px dashed #f59e0b66"
                      : "1.5px dashed #374151",
                    boxShadow: isFilled && !isActive
                      ? "0 0 8px rgba(16,185,129,0.2)"
                      : isActive
                      ? "0 0 12px rgba(124,58,237,0.3)"
                      : "none",
                  }}
                >
                  <span
                    className="font-bold font-mono"
                    style={{
                      fontSize: 16,
                      color: isActive
                        ? "#a78bfa"
                        : isFilled
                        ? "#d1fae5"
                        : "#4b5563",
                    }}
                  >
                    {char || (isNext ? "?" : "_")}
                  </span>
                </div>
                <span
                  className="font-mono"
                  style={{
                    fontSize: 10,
                    color: isActive ? "#7c3aed" : "#6b7280",
                  }}
                >
                  {digit}
                </span>
              </div>
            </React.Fragment>
          );
        })}
        {curStr.length === digits.length && curStr.length > 0 && (
          <div
            className="ml-2 px-2 py-1 rounded-md text-xs font-bold"
            style={{
              background: "linear-gradient(135deg, #059669, #047857)",
              color: "#d1fae5",
              boxShadow: "0 0 10px rgba(16,185,129,0.4)",
            }}
          >
            ✓
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Results Grid ─────────────────────────────────────────────────────────────

interface ResultsGridProps {
  results: string[];
  totalExpected: number;
}

const ResultsGrid: React.FC<ResultsGridProps> = ({ results, totalExpected }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
          Combinations Found
        </span>
        <span
          className="text-xs font-mono px-2 py-0.5 rounded-full"
          style={{
            background: results.length > 0 ? "rgba(16,185,129,0.15)" : "rgba(100,116,139,0.15)",
            color: results.length > 0 ? "#10b981" : "#64748b",
            border: `1px solid ${results.length > 0 ? "rgba(16,185,129,0.3)" : "rgba(100,116,139,0.2)"}`,
          }}
        >
          {results.length} / {totalExpected}
        </span>
      </div>
      <div
        className="rounded-xl p-3 min-h-[72px] flex flex-wrap gap-2 content-start overflow-y-auto"
        style={{
          maxHeight: 120,
          background: "rgba(0,0,0,0.2)",
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        {results.length === 0 ? (
          <span className="text-xs text-muted-foreground italic self-center">
            No results yet…
          </span>
        ) : (
          results.map((r, idx) => (
            <div
              key={idx}
              className="px-3 py-1 rounded-lg font-mono text-sm font-semibold"
              style={{
                background: "linear-gradient(135deg, rgba(16,185,129,0.12), rgba(5,150,105,0.12))",
                border: "1px solid rgba(16,185,129,0.3)",
                color: "#6ee7b7",
                boxShadow: "0 0 6px rgba(16,185,129,0.1)",
              }}
            >
              "{r}"
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

export const LetterCombinationsVisualization: React.FC = () => {
  const digits = "23";
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const code = `function letterCombinations(digits: string): string[] {
  if (!digits) return [];

  const res: string[] = [];

  const digitToChar: Record<string, string> = {
    "2": "abc", "3": "def", "4": "ghi",
    "5": "jkl", "6": "mno", "7": "pqrs",
    "8": "tuv", "9": "wxyz"
  };

  function backtrack(i: number, curStr: string): void {
    if (curStr.length === digits.length) {
      res.push(curStr);
      return;
    }

    for (const c of digitToChar[digits[i]]) {
      backtrack(i + 1, curStr + c);
    }
  }

  backtrack(0, "");
  return res;
}`;

  useEffect(() => {
    setSteps(generateSteps(digits));
  }, []);

  if (steps.length === 0) return null;

  const step = steps[currentStepIndex];

  // Calculate expected total
  const totalExpected = digits
    .split("")
    .reduce((acc, d) => acc * (DIGIT_MAP[d]?.length ?? 0), 1);

  const phaseLabel: Record<string, string> = {
    init: "Initialize",
    recurse: "Recurse",
    "base-case": "Base Case — Found!",
    loop: "Iterate Letters",
    backtrack: "Backtrack",
    done: "Complete",
  };

  return (
    <div className="space-y-4">
      <SimpleStepControls
        currentStep={currentStepIndex}
        totalSteps={steps.length}
        onStepChange={setCurrentStepIndex}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* ── Left Panel ── */}
        <div className="flex flex-col gap-4">

          {/* 1. Phone Keypad — top */}
          <div
            className="rounded-xl p-4 flex flex-col items-center"
            style={{
              background: "rgba(15,23,42,0.6)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <PhoneKeypad
              digits={step.digits}
              activeDigitIndex={step.activeDigitIndex}
              activeChar={step.activeChar}
            />
          </div>

          {/* 2. Input Digits + Building Combination — below keypad */}
          <div
            className="rounded-xl p-4 flex flex-col sm:flex-row gap-8 items-start flex-wrap"
            style={{
              background: "rgba(15,23,42,0.6)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {/* Input Digits */}
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-1">
                Input Digits
              </span>
              <div className="flex gap-2">
                {step.digits.split("").map((d, idx) => {
                  const isActive = idx === step.activeDigitIndex;
                  const isProcessed = idx < step.i || (step.curStr.length > idx);
                  return (
                    <div
                      key={idx}
                      className="flex flex-col items-center gap-1 transition-all duration-200"
                    >
                      <div
                        className="flex items-center justify-center rounded-lg font-bold font-mono"
                        style={{
                          width: 36,
                          height: 36,
                          fontSize: 18,
                          background: isActive
                            ? "linear-gradient(135deg, #7c3aed, #4f46e5)"
                            : isProcessed
                            ? "linear-gradient(135deg, #1e40af, #1d4ed8)"
                            : "rgba(31,41,55,0.8)",
                          border: isActive
                            ? "1.5px solid #a78bfa"
                            : isProcessed
                            ? "1.5px solid #3b82f6"
                            : "1.5px solid #374151",
                          color: isActive ? "#e9d5ff" : isProcessed ? "#93c5fd" : "#9ca3af",
                          boxShadow: isActive ? "0 0 14px rgba(124,58,237,0.5)" : "none",
                          transform: isActive ? "scale(1.1)" : "scale(1)",
                        }}
                      >
                        {d}
                      </div>
                      <span
                        className="text-xs font-mono"
                        style={{ color: isActive ? "#a78bfa" : "#6b7280" }}
                      >
                        [{idx}]
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Divider */}
            <div
              className="self-stretch w-px hidden sm:block"
              style={{ background: "rgba(255,255,255,0.07)" }}
            />

            {/* Building Combination */}
            <div className="flex-1">
              <CombinationBuilder
                digits={step.digits}
                curStr={step.curStr}
                activeDigitIndex={step.activeDigitIndex}
                activeChar={step.activeChar}
              />
            </div>
          </div>

          {/* 3. Commentary — below keypad and builder */}
          <div
            className={`rounded-xl p-4 border ${PHASE_BG[step.phase]}`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${PHASE_COLORS[step.phase]}`}
                style={{ background: "rgba(0,0,0,0.3)" }}
              >
                {phaseLabel[step.phase]}
              </span>
              <span className="text-xs text-muted-foreground font-mono">
                step {currentStepIndex + 1} / {steps.length}
              </span>
            </div>
            <p className="text-sm text-foreground leading-relaxed">
              {step.message}
            </p>
          </div>

          {/* 4. Letter options for current digit */}
          {step.activeDigitIndex !== null && step.activeDigitIndex < step.digits.length && (
            <div
              className="rounded-xl p-4"
              style={{
                background: "rgba(15,23,42,0.6)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
                Letters for digit &ldquo;{step.digits[step.activeDigitIndex]}&rdquo;
              </div>
              <div className="flex gap-2">
                {(DIGIT_MAP[step.digits[step.activeDigitIndex]] || "")
                  .split("")
                  .map((letter) => {
                    const isChosen = letter === step.activeChar;
                    return (
                      <div
                        key={letter}
                        className="flex items-center justify-center rounded-lg font-mono font-bold transition-all duration-200"
                        style={{
                          width: 40,
                          height: 40,
                          fontSize: 18,
                          background: isChosen
                            ? "linear-gradient(135deg, #f59e0b, #d97706)"
                            : "rgba(31,41,55,0.8)",
                          border: isChosen
                            ? "1.5px solid #fbbf24"
                            : "1.5px solid #374151",
                          color: isChosen ? "#fff" : "#9ca3af",
                          transform: isChosen ? "scale(1.15)" : "scale(1)",
                          boxShadow: isChosen
                            ? "0 0 14px rgba(245,158,11,0.6)"
                            : "none",
                        }}
                      >
                        {letter}
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* 5. Results + Variable panel */}
          <div
            className="rounded-xl p-4 flex flex-col gap-4"
            style={{
              background: "rgba(15,23,42,0.6)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <ResultsGrid results={step.results} totalExpected={totalExpected} />
            <VariablePanel
              variables={{
                "i (digit index)": step.i,
                'curStr (current)': `"${step.curStr}"`,
                "depth": `${step.curStr.length} / ${step.digits.length}`,
                "results.length": step.results.length,
              }}
            />
          </div>
        </div>

        {/* ── Right Panel: Code Editor ── */}
        <AnimatedCodeEditor
          code={code}
          highlightedLines={[step.lineNumber]}
          language="typescript"
        />
      </div>
    </div>
  );
};
