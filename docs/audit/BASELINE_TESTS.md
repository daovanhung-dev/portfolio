# Baseline checks

**Base commit:** `a99fac9d6dd769e2a4b2b31f4eead9629f00faf0`
**Runtime:** Node `v24.21.0`; npm from the user-local Node installation.

| Command | Result | Notes |
|---|---|---|
| `npm ci` | PASS | 83 packages installed. npm reported 4 fixable dev-dependency advisories: 2 moderate and 2 high. |
| `npm run typecheck` | PASS | `tsc --noEmit` |
| `npm test` | PASS | 1 file, 12 tests |
| `npm run validate:project-data` | PASS | 8 timeline entries, 10 projects |
| `npm run validate:links` | PASS with warning | 3 anchors and 19 external URLs checked; LinkedIn fetch failed. |
| `npm run build` | PASS | Vite 6.4.3; build output generated in ignored `dist/`. |

The aggregate `npm run validate` completed successfully. Network reachability of the LinkedIn profile remains unverified; the validator treats that fetch error as a warning.
