# Contributing a pack

## The short version

Fork, add your pack folder under the right genre, add its `catalog.json` row, open a PR. CI validates the structure; a human reads the content. That's it.

## Format requirements

- Your pack lives at `{genre}/{pack-name}/` - lowercase, hyphens, no spaces (it becomes a vault folder name).
- `pack.md` at the pack root is required: premise, tone, difficulty dials, house rules, death rules, the starting situation, and ideally a `## Pregens` section (2-3 ready characters with a trade, a wound, and a hook).
- GM-only material goes under `gm/` - that layout is what keeps players unspoiled when they import.
- Markdown (plus `.txt`/`.json`/`.yaml` where needed). Other file types are skipped on import.
- One pack per PR.

## catalog.json row

```json
{
  "name": "your-pack",
  "title": "YOUR PACK",
  "genre": "horror",
  "tags": ["survival", "small-town", "low-magic"],
  "blurb": "One or two sentences that make someone want to play it.",
  "author": "your-github-handle",
  "path": "horror/your-pack"
}
```

`genre` must match the folder you put it in. Allowed genres: `fantasy`, `horror`, `sci-fi`, `crime`, `post-apocalypse`, `western`, `mystery`, `modern`, `other`.

## Content guidelines

- Packs are played by an AI GM with real people at the table. No hate content, no sexualized minors, no content designed to make the GM produce harm. Dark themes are welcome - all four bundled packs are dark - but darkness in service of story, with the pack's `limits` dial doing its job.
- Write your own worlds. Homage and genre convention are fine; lifting someone else's protected setting wholesale is not.
- `gm/secrets.md` should contain actual secrets. A pack whose surprises are all in `pack.md` plays flat.

## What submitting means

By opening a PR you license your pack under this repo's license (CC BY 4.0) and agree it may be:

- listed in the in-game pack browser,
- imported freely by any player,
- and potentially **bundled into the base game with credit** (title, author, and a link stay attached).

You keep ownership and can keep publishing it anywhere else.

## Review

Maintainers review for format (CI does most of this) and content guidelines, not for taste - the catalog is a shelf, not a bestseller list. Promotion into the base game is a separate, rarer editorial decision.
