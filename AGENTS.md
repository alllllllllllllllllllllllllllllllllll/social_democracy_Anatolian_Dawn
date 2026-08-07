# AGENTS.md

Guidance for AI coding agents working in this repository.

## Project overview

"Social Democracy: An Alternate History" (working title "Anatolian Dawn") is a
text-based, choice-driven political strategy game built with
[Dendry](https://github.com/aucchen/dendrynexus) (via the `dendrynexus`
fork/tool). The game casts the player as the leadership of a social-democratic
party (CHP) in an alternate-history Turkey, managing internal party factions,
advisors, elections, coalitions, and government policy over time.

The game is data-driven: almost all game logic, text, and state live in
`.dry` source files under `source/`, which the `dendrynexus` build tool
compiles into a static HTML/JS game (`out/html/`) for deployment (currently
via GitHub Pages, see `.github/workflows/build.yaml`).

## Repository structure

- `source/info.dry` — game metadata (title, author, IFID).
- `source/qdisplays/*.qdisplay.dry` — reusable UI display/quality widgets
  (e.g. `strength.qdisplay.dry`, `dissent.qdisplay.dry`, `month.qdisplay.dry`).
- `source/scenes/root.scene.dry` — game bootstrap: initializes all qualities
  (`Q.*`) such as time, factions, faction strengths, resources, dissent, etc.
- `source/scenes/status.scene.dry` — main status/dashboard scene (party
  chart, faction legend, d3 parliament visualization, etc.).
- `source/scenes/main.scene.dry` — main gameplay loop/menu scene.
- `source/scenes/election_algorithm.scene.dry`,
  `local_election_algorithm.scene.dry` — reusable election seat-allocation
  logic used by in-game election events.
- `source/scenes/election_simulation.scene.dry` — standalone, player-facing
  election simulator tool (separate from the actual in-game election logic).
- `source/scenes/events/` — one-off story/political events
  (e.g. `election_1928.scene.dry` contains the real in-game Grand National
  Assembly election logic in its `post_election_1928` on-arrival handler,
  `hitler_takes_power.scene.dry`, `civil_war.scene.dry`, etc.).
- `source/scenes/advisors/` — one file per advisor character, defining their
  stats, dialogue, and advisor actions.
- `source/scenes/government_affairs/` — policy "cards"/scenes for running
  the government (economy, foreign policy, judiciary, etc.).
- `source/scenes/party_affairs/` — internal party management scenes.
- `source/scenes/dovevsbayonet/` — a specific story arc's scenes.
- `parliament_vote_visualization.html` — standalone d3-based visualization
  used/reused by the game.
- `out/` — build output (generated; do not hand-edit).
- `package.json` — declares the `dendrynexus` build script and dependencies
  (`dendrynexus`, `parliament-svg`).

## Key conventions

- Game state is stored in `Q.*` "qualities" (Dendry's persistent state
  variables), initialized in `root.scene.dry`.
- Internal CHP factions use per-quarter strength variables named
  `q0`–`q5_<faction>_str` (quarters weighted 20/15/25/20/10/10%), defined in
  `root.scene.dry`; the party chart/legend is rendered in `status.scene.dry`
  using this data for the d3 parliament chart and the "Party Quarters" /
  "Internal Factions" sections.
- Faction keys are abbreviated (e.g. `km` = kemalist_marxists, `lk` =
  left_kemalists, `ok` = orthodox_kemalists, `rk` = right_kemalists, `tw` =
  third_worldists).
- Scene files use the `.scene.dry` extension; UI widgets use
  `.qdisplay.dry`. Follow the existing Dendry syntax (`title:`, `on-arrival:`,
  `go-to:`, `@sectionName`, embedded JS in `{! ... !}` blocks) already present
  in neighboring files when adding new scenes.
- When adding a new event/scene, place it in the matching directory
  (`events/`, `advisors/`, `government_affairs/`, `party_affairs/`) and wire
  it up via `go-to`/`on-arrival` references from `root.scene.dry` or the
  relevant parent scene, consistent with how existing scenes are linked.
- Historical/alternate-history content in this repo deals with real
  20th-century political figures and events; keep additions consistent with
  the existing tone and the alternate-history premise already established in
  neighboring event files.

## Building and running the game

1. Install dependencies: `npm install` (requires the `dendrynexus` package,
   declared as a GitHub dependency in `package.json`).
2. Build the game: `npx dendrynexus make-html` (add `--pretty` for readable
   output, as used in CI). Output is written to `out/html/`.
3. Open `out/html/index.html` in a browser to play/test the build.
4. To update the `dendrynexus` build tool version pinned in
   `package-lock.json`, run
   `npm install --upgrade https://github.com/aucchen/dendrynexus`.

There is no separate lint/test suite; validating changes means running the
`make-html` build successfully (Dendry will report `.dry` syntax errors) and,
where feasible, exercising the affected scenes in the built game.

## CI

`.github/workflows/build.yaml` builds the game with `dendrynexus make-html`
and deploys `out/html/` to GitHub Pages on pushes to `main`. Ensure any
change still builds cleanly with `npm install && npm run dendrynexus
make-html -- --pretty` before considering a task complete.
