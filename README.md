# Adventure Mode Packs

The community scenario-pack registry for [Adventure Mode](https://adventure-mode.com) - a persistent AI game master for claude.ai.

A pack is a folder of markdown: a world, its secrets, its people, and the dials that make it play the way it should. Anyone's Session Zero output can become one. This repo is where they live, get discovered, and get played.

## Browse first

The friendly view of this whole registry lives at **[adventure-mode.com/packs](https://adventure-mode.com/packs)** - live search, genre filters, and a copy-ready import line per pack. This repo is the submission surface; that page is the shelf.

## Play a pack from this repo

In your Adventure Mode session, from the Tavern or anywhere:

```
import pack https://github.com/bluewilliams/adventure-mode-packs/tree/main/horror/your-pick
```

Your GM copies it into your vault server-side (the `gm/` secrets never touch your chat, so you stay unspoiled), then say `new game`. You can also browse from inside the game: say `packs` or `browse packs horror`.

## Share your own pack

1. In your game, say `--eject-pack {name}` - you get a download link with a GitHub-ready zip.
2. Fork this repo, unzip your pack into the genre folder that fits (`horror/{your-pack}/`, etc.).
3. Add a row for it in `catalog.json` (see the schema comment at the top; CI checks it).
4. Open a pull request.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the format, content guidelines, and what submitting means.

## What's in a pack

```
{your-pack}/
  pack.md          # manifest: premise, tone, dials, house rules, starting situation, pregens
  gm/              # GM-only material - spoilers by design
    secrets.md     # the truths behind the campaign
    npcs.md        # named NPCs with drives and depths
    arcs.md        # arc skeletons: hooks, escalations, endings
    factions.md    # who wants what, and what happens if nobody stops them
    starting-state.md
```

Start from [`_template/`](_template/) if you're authoring by hand rather than ejecting from a game.

## The base game

Standout packs get pulled into the base game and ship bundled with every Adventure Mode install, with credit. The four current bundled packs are listed in `catalog.json` for discovery, and live in the [engine repo](https://github.com/bluewilliams/adventure-mode).
