# delete-guard

Holds any delete-like command — `rm`, `del`, `Remove-Item`, SQL `DROP`/`TRUNCATE`,
a forced git branch delete, a remote branch delete push, or any tool whose own
name says delete/trash/remove/drop — and asks before it runs, with two
buttons: **Delete it** / **Cancel**. If nothing can ask (e.g. a non-interactive
run), it cancels by default.

## Install

```
/plugin install delete-guard --marketplace stalinraja-afm/delete-guard
```
