import { Pause, Play, RotateCcw, SkipBack, SkipForward } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { VariablePanel } from "../shared/VariablePanel";
import { VisualizationLayout } from "../shared/VisualizationLayout";
import { AnimatedCodeEditor } from "../shared/AnimatedCodeEditor";

interface Step {
  type: "postTweet" | "getNewsFeed" | "follow" | "unfollow" | "init";
  operation: string;
  message: string;
  detailedMessage: string;
  highlightedLine: number;
  substep: number;
  totalSubsteps: number;
  count: number;
  tweetMap: Record<number, [number, number][]>;
  followMap: Record<number, number[]>;
  heap?: [number, number, number, number][]; // [count, tweetId, followeeId, index]
  result?: number[];
  highlightedUser?: number;
  highlightedFollower?: number;
  highlightedFollowee?: number;
  highlightedTweetId?: number;
  highlightedHeapElementIndex?: number;
}

const codeExamples = {
  typescript: `class Twitter {
    private count: number;
    private tweetMap: Map<number, [number, number][]>;
    private followMap: Map<number, Set<number>>;

    constructor() {
        this.count = 0;
        this.tweetMap = new Map();
        this.followMap = new Map();
    }

    postTweet(userId: number, tweetId: number): void {
        if (!this.tweetMap.has(userId)) {
            this.tweetMap.set(userId, []);
        }
        this.tweetMap.get(userId)!.push([this.count, tweetId]);
        this.count--;
    }

    getNewsFeed(userId: number): number[] {
        const result: number[] = [];
        if (!this.followMap.has(userId)) {
            this.followMap.set(userId, new Set());
        }
        this.followMap.get(userId)!.add(userId);

        const heap: [number, number, number, number][] = [];
        const pushHeap = (count: number, tweetId: number, followeeId: number, index: number) => {
            heap.push([count, tweetId, followeeId, index]);
            heap.sort((a, b) => a[0] - b[0]);
        };
        const popHeap = (): [number, number, number, number] => {
            return heap.shift()!;
        };

        for (const followeeId of this.followMap.get(userId)!) {
            const tweets = this.tweetMap.get(followeeId);
            if (tweets && tweets.length > 0) {
                const index = tweets.length - 1;
                const [count, tweetId] = tweets[index];
                pushHeap(count, tweetId, followeeId, index - 1);
            }
        }

        while (heap.length > 0 && result.length < 10) {
            const [count, tweetId, followeeId, index] = popHeap();
            result.push(tweetId);
            const tweets = this.tweetMap.get(followeeId)!;
            if (index >= 0) {
                const [nextCount, nextTweetId] = tweets[index];
                pushHeap(nextCount, nextTweetId, followeeId, index - 1);
            }
        }
        return result;
    }

    follow(followerId: number, followeeId: number): void {
        if (!this.followMap.has(followerId)) {
            this.followMap.set(followerId, new Set());
        }
        this.followMap.get(followerId)!.add(followeeId);
    }

    unfollow(followerId: number, followeeId: number): void {
        this.followMap.get(followerId)?.delete(followeeId);
    }
}`
};

export const DesignTwitterVisualization = () => {
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const generatedSteps: Step[] = [];
    let count = 0;
    const tweetMap: Record<number, [number, number][]> = {};
    const followMap: Record<number, Set<number>> = {};
    
    // Helper to deep copy structures
    const getTweetMap = () => JSON.parse(JSON.stringify(tweetMap));
    const getFollowMap = () => {
        const res: Record<number, number[]> = {};
        for (const k in followMap) res[k] = Array.from(followMap[k]);
        return res;
    };

    const addStep = (
      type: Step["type"],
      operation: string,
      message: string,
      detailedMessage: string,
      highlightedLine: number,
      substep: number,
      totalSubsteps: number,
      extras: Partial<Step> = {}
    ) => {
      generatedSteps.push({
        type,
        operation,
        message,
        detailedMessage,
        highlightedLine,
        substep,
        totalSubsteps,
        count,
        tweetMap: getTweetMap(),
        followMap: getFollowMap(),
        ...extras
      });
    };

    // INIT
    addStep("init", "Twitter()", "Initialize Twitter Data Structures", "Created count (0), tweetMap (empty), and followMap (empty).", 6, 1, 1);

    // 1. postTweet(1, 5)
    let total = 4; let s = 1; let op = "postTweet(1, 5)";
    addStep("postTweet", op, "Posting a tweet", "User 1 is attempting to post tweet 5.", 12, s++, total, { highlightedUser: 1, highlightedTweetId: 5 });
    tweetMap[1] = [];
    addStep("postTweet", op, "Initializing user's tweet list", "User 1 has no tweets yet, initializing a new empty list in tweetMap.", 14, s++, total, { highlightedUser: 1 });
    tweetMap[1].push([count, 5]);
    addStep("postTweet", op, "Adding tweet to user's list", `Added [count: ${count}, tweetId: 5] to user 1's list.`, 16, s++, total, { highlightedUser: 1, highlightedTweetId: 5 });
    count--;
    addStep("postTweet", op, "Decrementing global count", "Decremented count to maintain chronological ordering (smaller count means more recent).", 17, s++, total);

    // 2. getNewsFeed(1)
    total = 14; s = 1; op = "getNewsFeed(1)";
    let heap: [number, number, number, number][] = [];
    let result: number[] = [];
    addStep("getNewsFeed", op, "Fetching news feed", "User 1 is requesting their news feed.", 20, s++, total, { highlightedUser: 1 });
    followMap[1] = new Set();
    addStep("getNewsFeed", op, "Checking follow relationships", "User 1 doesn't have a follow list yet, initializing it.", 23, s++, total, { highlightedUser: 1 });
    followMap[1].add(1);
    addStep("getNewsFeed", op, "User follows themselves", "Adding User 1 to their own follow list so their tweets appear in their feed.", 25, s++, total, { highlightedFollower: 1, highlightedFollowee: 1 });
    addStep("getNewsFeed", op, "Initializing Min-Heap", "Created an empty heap to merge sorted tweet lists from all followed users.", 27, s++, total, { heap: [...heap], result: [...result] });
    
    addStep("getNewsFeed", op, "Iterating followees", "Checking User 1's followees. Only User 1 is followed.", 36, s++, total, { highlightedFollowee: 1, heap: [...heap], result: [...result] });
    heap.push([0, 5, 1, 0]);
    heap.sort((a, b) => a[0] - b[0]);
    addStep("getNewsFeed", op, "Pushing most recent tweet to heap", "User 1 has tweets. Pushing their most recent tweet (ID 5) into the min-heap.", 41, s++, total, { highlightedFollowee: 1, highlightedTweetId: 5, heap: [...heap], result: [...result] });
    
    addStep("getNewsFeed", op, "Extracting from heap", "Entering extraction loop to get the 10 most recent tweets.", 45, s++, total, { heap: [...heap], result: [...result] });
    heap.shift();
    addStep("getNewsFeed", op, "Popping smallest count", "Popped tweet 5 from heap (count 0).", 46, s++, total, { highlightedTweetId: 5, heap: [...heap], result: [...result] });
    result.push(5);
    addStep("getNewsFeed", op, "Adding to result", "Added tweet 5 to the result feed.", 47, s++, total, { highlightedTweetId: 5, heap: [...heap], result: [...result] });
    addStep("getNewsFeed", op, "Checking for next tweet", "User 1 has no more tweets in their list.", 49, s++, total, { highlightedFollowee: 1, heap: [...heap], result: [...result] });
    addStep("getNewsFeed", op, "Returning result", "Heap is empty. Returning feed containing tweet 5.", 54, s++, total, { heap: [...heap], result: [...result] });

    // 3. follow(1, 2)
    total = 3; s = 1; op = "follow(1, 2)";
    addStep("follow", op, "Following a user", "User 1 is following User 2.", 57, s++, total, { highlightedFollower: 1, highlightedFollowee: 2 });
    followMap[1].add(2);
    addStep("follow", op, "Adding to followMap", "Added User 2 to User 1's follow set.", 61, s++, total, { highlightedFollower: 1, highlightedFollowee: 2 });

    // 4. postTweet(2, 6)
    total = 4; s = 1; op = "postTweet(2, 6)";
    addStep("postTweet", op, "Posting a tweet", "User 2 is attempting to post tweet 6.", 12, s++, total, { highlightedUser: 2, highlightedTweetId: 6 });
    tweetMap[2] = [];
    addStep("postTweet", op, "Initializing user's tweet list", "User 2 has no tweets yet, initializing a new list.", 14, s++, total, { highlightedUser: 2 });
    tweetMap[2].push([count, 6]);
    addStep("postTweet", op, "Adding tweet to user's list", `Added [count: ${count}, tweetId: 6] to user 2's list.`, 16, s++, total, { highlightedUser: 2, highlightedTweetId: 6 });
    count--;
    addStep("postTweet", op, "Decrementing global count", "Decremented count to maintain chronological ordering.", 17, s++, total);

    // 5. getNewsFeed(1)
    total = 15; s = 1; op = "getNewsFeed(1)";
    heap = []; result = [];
    addStep("getNewsFeed", op, "Fetching news feed", "User 1 is requesting their news feed again.", 20, s++, total, { highlightedUser: 1 });
    addStep("getNewsFeed", op, "User follows themselves", "User 1 is already in their follow list.", 25, s++, total, { highlightedFollower: 1, highlightedFollowee: 1 });
    addStep("getNewsFeed", op, "Initializing Min-Heap", "Created an empty min-heap.", 27, s++, total, { heap: [...heap], result: [...result] });
    
    addStep("getNewsFeed", op, "Iterating followees", "Checking User 1's followees (User 1 and User 2). First checking User 1.", 36, s++, total, { highlightedFollowee: 1, heap: [...heap], result: [...result] });
    heap.push([0, 5, 1, 0]); // From User 1
    heap.sort((a, b) => a[0] - b[0]);
    addStep("getNewsFeed", op, "Pushing most recent tweet", "Pushed User 1's most recent tweet (5) to heap.", 41, s++, total, { highlightedFollowee: 1, highlightedTweetId: 5, heap: [...heap], result: [...result] });
    
    addStep("getNewsFeed", op, "Iterating followees", "Checking User 2.", 36, s++, total, { highlightedFollowee: 2, heap: [...heap], result: [...result] });
    heap.push([-1, 6, 2, 0]); // From User 2
    heap.sort((a, b) => a[0] - b[0]);
    addStep("getNewsFeed", op, "Pushing most recent tweet", "Pushed User 2's most recent tweet (6) to heap.", 41, s++, total, { highlightedFollowee: 2, highlightedTweetId: 6, heap: [...heap], result: [...result] });

    addStep("getNewsFeed", op, "Extracting from heap", "Entering extraction loop.", 45, s++, total, { heap: [...heap], result: [...result] });
    heap.shift(); // pops [-1, 6, 2, 0]
    addStep("getNewsFeed", op, "Popping smallest count", "Popped tweet 6 from heap (count -1, most recent).", 46, s++, total, { highlightedTweetId: 6, heap: [...heap], result: [...result] });
    result.push(6);
    addStep("getNewsFeed", op, "Adding to result", "Added tweet 6 to the result feed.", 47, s++, total, { highlightedTweetId: 6, heap: [...heap], result: [...result] });
    addStep("getNewsFeed", op, "Checking for next tweet", "User 2 has no more tweets.", 49, s++, total, { highlightedFollowee: 2, heap: [...heap], result: [...result] });

    heap.shift(); // pops [0, 5, 1, 0]
    addStep("getNewsFeed", op, "Popping smallest count", "Popped tweet 5 from heap (count 0).", 46, s++, total, { highlightedTweetId: 5, heap: [...heap], result: [...result] });
    result.push(5);
    addStep("getNewsFeed", op, "Adding to result", "Added tweet 5 to the result feed.", 47, s++, total, { highlightedTweetId: 5, heap: [...heap], result: [...result] });
    
    addStep("getNewsFeed", op, "Returning result", "Heap is empty. Returning feed containing [6, 5].", 54, s++, total, { heap: [...heap], result: [...result] });

    // 6. unfollow(1, 2)
    total = 3; s = 1; op = "unfollow(1, 2)";
    addStep("unfollow", op, "Unfollowing a user", "User 1 is unfollowing User 2.", 64, s++, total, { highlightedFollower: 1, highlightedFollowee: 2 });
    followMap[1].delete(2);
    addStep("unfollow", op, "Removing from followMap", "Removed User 2 from User 1's follow set.", 65, s++, total, { highlightedFollower: 1, highlightedFollowee: 2 });

    // 7. getNewsFeed(1)
    total = 8; s = 1; op = "getNewsFeed(1)";
    heap = []; result = [];
    addStep("getNewsFeed", op, "Fetching news feed", "User 1 is requesting news feed after unfollowing User 2.", 20, s++, total, { highlightedUser: 1 });
    addStep("getNewsFeed", op, "Initializing Min-Heap", "Created an empty min-heap.", 27, s++, total, { heap: [...heap], result: [...result] });
    
    addStep("getNewsFeed", op, "Iterating followees", "Checking User 1's followees (Only User 1).", 36, s++, total, { highlightedFollowee: 1, heap: [...heap], result: [...result] });
    heap.push([0, 5, 1, 0]);
    heap.sort((a, b) => a[0] - b[0]);
    addStep("getNewsFeed", op, "Pushing most recent tweet", "Pushed User 1's tweet 5.", 41, s++, total, { highlightedFollowee: 1, highlightedTweetId: 5, heap: [...heap], result: [...result] });
    
    addStep("getNewsFeed", op, "Extracting from heap", "Entering extraction loop.", 45, s++, total, { heap: [...heap], result: [...result] });
    heap.shift(); // pops [0, 5]
    result.push(5);
    addStep("getNewsFeed", op, "Adding to result", "Popped tweet 5 and added to result feed.", 47, s++, total, { highlightedTweetId: 5, heap: [...heap], result: [...result] });
    
    addStep("getNewsFeed", op, "Returning result", "Heap is empty. Returning feed containing [5].", 54, s++, total, { heap: [...heap], result: [...result] });

    setSteps(generatedSteps);
  }, []);

  useEffect(() => {
    if (isPlaying && currentStepIndex < steps.length - 1) {
      intervalRef.current = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1500 / speed);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, currentStepIndex, steps.length, speed]);

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);
  const handleStepForward = () => currentStepIndex < steps.length - 1 && setCurrentStepIndex((prev) => prev + 1);
  const handleStepBack = () => currentStepIndex > 0 && setCurrentStepIndex((prev) => prev - 1);
  const handleReset = () => { setCurrentStepIndex(0); setIsPlaying(false); };

  if (steps.length === 0) return null;
  const currentStep = steps[currentStepIndex];

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex items-center justify-between w-full gap-4 p-4 bg-card border border-border rounded-lg shadow-sm">
        <div className="flex items-center gap-2">
          <Button onClick={handleStepBack} disabled={currentStepIndex === 0} variant="outline" size="icon">
            <SkipBack className="h-4 w-4" />
          </Button>
          <Button onClick={isPlaying ? handlePause : handlePlay} disabled={currentStepIndex === steps.length - 1} variant="default" size="icon">
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button onClick={handleStepForward} disabled={currentStepIndex === steps.length - 1} variant="outline" size="icon">
            <SkipForward className="h-4 w-4" />
          </Button>
          <Button onClick={handleReset} variant="outline" size="icon">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">Step {currentStepIndex + 1} / {steps.length}</span>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Speed:</span>
            <Slider value={[speed]} onValueChange={(val) => setSpeed(val[0])} min={0.5} max={3} step={0.5} className="w-24" />
            <span className="text-sm font-medium">{speed}x</span>
          </div>
        </div>
      </div>

      <VisualizationLayout
        controls={null}
        leftContent={
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="text-sm font-semibold mb-2">Current Operation</h3>
              <p className="text-lg font-mono text-primary">{currentStep.operation}</p>
              <p className="text-base font-semibold text-foreground mt-2">{currentStep.message}</p>
              <p className="text-sm text-muted-foreground mt-1">{currentStep.detailedMessage}</p>
              <div className="mt-2 text-xs text-muted-foreground">Substep {currentStep.substep} of {currentStep.totalSubsteps}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="text-sm font-semibold mb-3 text-foreground">Follow Map</h3>
                {Object.keys(currentStep.followMap).length === 0 && <p className="text-sm text-muted-foreground italic">No followers yet.</p>}
                <div className="flex flex-col gap-2">
                    {Object.entries(currentStep.followMap).map(([follower, followees]) => (
                    <div key={follower} className={`p-2 rounded border-2 ${Number(follower) === currentStep.highlightedFollower ? "border-primary bg-primary/20" : "border-border bg-muted/30"}`}>
                        <div className="font-mono text-sm text-foreground">User {follower} follows:</div>
                        <div className="flex flex-wrap gap-1 mt-1">
                            {followees.length === 0 && <span className="text-xs text-muted-foreground">No one</span>}
                            {followees.map(followee => (
                                <span key={followee} className={`text-xs px-2 py-1 rounded bg-background border ${Number(follower) === currentStep.highlightedFollower && followee === currentStep.highlightedFollowee ? "border-secondary text-secondary font-bold" : "border-border text-foreground"}`}>
                                    User {followee}
                                </span>
                            ))}
                        </div>
                    </div>
                    ))}
                </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="text-sm font-semibold mb-3 text-foreground">Tweet Map</h3>
                {Object.keys(currentStep.tweetMap).length === 0 && <p className="text-sm text-muted-foreground italic">No tweets yet.</p>}
                <div className="flex flex-col gap-2">
                    {Object.entries(currentStep.tweetMap).map(([user, tweets]) => (
                    <div key={user} className={`p-2 rounded border-2 ${Number(user) === currentStep.highlightedUser || Number(user) === currentStep.highlightedFollowee ? "border-primary bg-primary/20" : "border-border bg-muted/30"}`}>
                        <div className="font-mono text-sm text-foreground">User {user} tweets:</div>
                        <div className="flex flex-col gap-1 mt-1">
                            {tweets.map(([c, tid]) => (
                                <div key={tid} className={`text-xs px-2 py-1 rounded bg-background border flex justify-between ${tid === currentStep.highlightedTweetId ? "border-secondary text-secondary font-bold" : "border-border text-foreground"}`}>
                                    <span>Tweet: {tid}</span>
                                    <span className="text-muted-foreground text-[10px]">count: {c}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    ))}
                </div>
                </div>
            </div>

            {currentStep.type === 'getNewsFeed' && currentStep.heap && (
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="text-sm font-semibold mb-3 text-foreground">News Feed Generation (Min-Heap)</h3>
                <div className="flex gap-4">
                    <div className="flex-1">
                        <div className="text-xs text-muted-foreground mb-2">Heap State (Top = smallest count / most recent)</div>
                        <div className="flex flex-col gap-1">
                            {currentStep.heap.length === 0 && <p className="text-xs text-muted-foreground italic">Heap is empty</p>}
                            {currentStep.heap.map((h, i) => (
                                <div key={i} className="text-xs px-2 py-1 rounded bg-secondary/10 border border-secondary text-foreground flex justify-between">
                                    <span>Tweet: {h[1]} (from User {h[2]})</span>
                                    <span className="text-muted-foreground">count: {h[0]}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="w-px bg-border"></div>
                    <div className="flex-1">
                        <div className="text-xs text-muted-foreground mb-2">Result Array</div>
                        <div className="flex flex-wrap gap-1">
                            {currentStep.result?.length === 0 && <p className="text-xs text-muted-foreground italic">Empty</p>}
                            {currentStep.result?.map((r, i) => (
                                <div key={i} className="text-xs px-2 py-1 rounded bg-primary/20 border border-primary font-bold text-foreground">
                                    {r}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
              </div>
            )}
          </div>
        }
        rightContent={
          <div className="space-y-4">
            <AnimatedCodeEditor code={codeExamples.typescript} language="typescript" highlightedLines={[currentStep.highlightedLine]} />
            <VariablePanel variables={{ "Global Count": currentStep.count }} />
          </div>
        }
      />
    </div>
  );
};
