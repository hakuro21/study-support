# Repository guidance

## Project overview

まなびポケット is a dependency-free, static Japanese learning app. Open `index.html` directly in a browser; it loads `styles.css` and the deferred `app.js`. There is no package manifest, build step, backend, or test runner.

- `index.html` owns the shared app shell, desktop and mobile navigation, dashboard, learning-history view, and quiz dialog.
- `app.js` owns the grade-to-school-stage and subject catalogs, sample question banks, DOM rendering, hash-based view navigation, quiz state, and persisted learning records.
- `styles.css` owns the shared visual system and responsive layouts. Mobile navigation appears at the 760px breakpoint; the narrower 480px breakpoint adjusts compact layouts.
- `README.md` documents how to launch the app, its MVP features, and local-only storage.

The dashboard and history are views within one document, not separate pages. Navigation links use `data-view` and URL hashes; `renderPage()` updates the visible view and active navigation state. Subject navigation scrolls to the subject picker. Keep desktop and mobile links in sync.

## Data and UI conventions

- Question banks are keyed by school stage (`elementary`, `middle`, `high`) and subject ID. `stageForGrade()` maps the selected grade to a stage; each listed subject must have a matching question bank for that stage. A quiz currently contains three questions.
- Subject IDs connect the subject catalog, question banks, selected-subject control, and CSS color classes. Keep these identifiers and their cross-references aligned when adding a subject.
- Learning totals and up to 50 recent quiz attempts are stored in `localStorage` under `manabi-pocket-stats`; save each answered question so partial sessions survive closing the quiz. Preserve the stored fields (`sessions`, `correct`, `studyDates`, and `history`) and validate saved history before rendering it.
- Build dynamic UI with DOM elements and `textContent` (or `replaceChildren`), following `renderSubjects()` and `renderHistory()`. Keep generated data as text rather than interpolating it into HTML.
- Preserve the existing Japanese learner-facing labels, semantic navigation and buttons, quiz-dialog accessibility, and responsive mobile navigation when changing UI.

## Build, test, and lint

There are no configured build, test, or lint scripts, and no test framework or single-test command. Open `index.html` in a browser to run the app. For lightweight checks after editing:

```sh
node --check app.js
git diff --check
```
