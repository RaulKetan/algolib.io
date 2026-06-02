---
name: Guides Update
description: Skill for adding or updating educational algorithm guides, ensuring consistent patterns and simple explanations suitable for an 8-year-old.
---

# Guides Update Skill

This skill is invoked when adding a new concept guide (like "prefix sum", "recursion", etc.) to the pattern guides section.

## Workflow Process

### 1. Identify and Structure
- When asked to add a new guide pattern, first check existing guides (e.g., `src/data/guides/recursion.ts`) to understand the layout and format.
- Ensure the guide data file is created in `src/data/guides/` and exposes a `content` markdown string.
- Create a corresponding page in `src/app/guides/patterns/<slug>/page.tsx`.
- Register the new guide in `src/data/guidesData.ts` under the appropriate category or as a new category, ensuring the new category matches the `id` and structure of existing categories.
- **CRITICAL:** Add the new guide's `id` to the `PATTERN_IDS` array in `src/config/sidebarNav.ts` so it appears in the sidebar navigation!

### 2. Implementation Rules & Standards

When writing the content for the guide, rigidly follow these rules:

1. **Simple Analogy First:** Always start with a relatable, real-world analogy. The explanation MUST be simple enough for an 8-year-old to understand (e.g., using piggy banks, Russian nesting dolls, lines at a movie theater).
2. **Engaging Formatting:** Use emojis, bold text for key terms, and clear headings to make the guide visually appealing and easy to read.
3. **Core Formula/Concept:** Clearly outline the core formula, rules, or strategy of the pattern after the analogy.
4. **Interactive Visualization Link:** Always include a markdown link to the interactive simulator visualization for the pattern. Format: `[Visualize <Topic> in the Interactive Simulator](viz:<slug>)`.
5. **Multi-Language Code Examples:** Provide complete, working code implementations in Python, Java, C++, and TypeScript. Use clear, educational variable names. **Crucially, all code blocks (the solution viewer codes) must be well-commented at a moderate rate so the user can easily understand what each line or block does.**
6. **Problem Walkthroughs:** Include at least one common problem walkthrough (e.g., Range Sum Query, Climbing Stairs) showing how to apply the pattern.
7. **Common Mistakes:** Add a section explicitly listing common pitfalls or errors to watch out for (e.g., infinite loops, off-by-one errors).
8. **Practice Links:** End the guide with a list of related practice problems linked to the platform.

### 3. Verification
- Verify that `guidesData.ts` has been correctly updated and has no syntax errors.
- Verify that the guide page route (`page.tsx`) correctly mounts `GuidesClient` with the metadata setup.
- Verify that the language uses plain English and avoids overly dense academic jargon.
