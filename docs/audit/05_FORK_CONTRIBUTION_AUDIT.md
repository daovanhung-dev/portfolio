# XiaoZhi fork contribution audit

**Fork:** `daovanhung-dev/xiaozhi-esp32`
**Upstream:** `78/xiaozhi-esp32`
**Fork main:** `9cd4401d30fe3b54f0e6b656de44199cb0595f3c`
**Upstream main fetched:** yes; merge base `e0d2390a1ca415473508bbc0c66eaf1d8dc04e37`.

## Fork-only source changes

`git log upstream/main..HEAD` returns three commits in the fork's current `main` ancestry, all dated 2026-10-17 and carrying the Git author name `DaoVanHung`:

- `8d3142411117263c7345d626f68b7dc34c6dd64c` — Vietnamese protocol/build documentation under `docs/`.
- `d9e3f61c8494ca14b2cb8e79df22f360c815594d` — agent context and architecture/build notes.
- `9cd4401d30fe3b54f0e6b656de44199cb0595f3c` — OSTB XiaoZhi 3ST board support: C++ board source, configuration, CMake/Kconfig wiring, README, and a 16 MB partition CSV.

The all-refs comparison reports eight commits not reachable from the fetched upstream refs. Five are older commits authored by another contributor and are not credited to Dao. Fork commit metadata supports attribution review but is not independent proof of authorship.

## Portfolio claim boundary

The portfolio may describe source-level board support and protocol documentation. It must not attribute upstream firmware, count the fork's full commit history as personal work, or state the board passed a firmware build, flash, display, network, or voice/speaker acceptance test. Those device checks were not run in this audit.

The sibling NanoBioAI repository also contains XiaoZhi-related paths. Those paths are not treated as personal contribution evidence without a separate fork diff.
