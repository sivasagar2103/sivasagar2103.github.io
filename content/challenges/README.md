# Challenges content

1. Create a folder such as `my-challenge/` here.
2. Add a `README.md` inside it using the format below.
3. Write the full story below the front matter. Copy an existing entry as a starting point.
4. From the repository root, run `npm run preview` and refresh.

```markdown
---
title: "My challenge"
category: "Engineering"
excerpt: "One sentence for the list and search."
stack: [Python, MCP]
---

## Context

Describe the problem.

## Approach

Explain your actions and decisions.

## Result

Describe the outcome and what you learned.
```

The folder name becomes the URL slug. Optional: `slug: custom-name`, `draft: true` to hide an entry, and `readTime: "5 min read"`. Projects and challenges also support `timeline`, `status`, and a `stack` list. Writing requires `date` in YYYY-MM-DD format.

This top-level README is an editing guide and is not published. Nested README files and other Markdown story files are converted into pages, list cards, search entries automatically. Keep local links relative to the site root (for example `[Projects](projects.html)`), because generated pages use the site root as their base URL.
