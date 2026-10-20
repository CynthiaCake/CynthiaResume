# Fixed portfolio repository

This is the canonical, permanent source repository for Cynthia's portfolio website. Edit this checkout for future portfolio changes. Older `portfolio-site` and `portfolio-v2` folders are historical backups, not the source of truth after this migration.

## Scope and design

- Website source is in `site/`. It is buildless HTML/CSS/JavaScript with local assets.
- Preserve base background `#f3f3f3`; keep a neutral, spacious editorial layout.
- Main projects follow the user's resume order: storefront, ComfyUI/LoRA, MF26B672 visual production, AI video, Skill/automation. Team practices and design selection follow.
- Do not include resume previews, resume downloads or resume files.
- Preserve verified user metrics and role boundaries. Do not transfer one project's results to a different artwork or claim self-developed agent frameworks.
- Do not copy private review files, raw documents, credentials or unredacted operational screenshots into this repository or published assets.

## Verification and synchronization

- Run `python scripts/validate.py` and `node --check site/app.js` using the task's available trusted runtimes.
- For layout or interaction changes, inspect desktop and mobile previews and test affected behavior. Disclose limits if browser QA is unavailable.
- The user wants future approved website changes reflected on GitHub and the fixed website link. When a remote and authenticated access have been configured, commit and push approved changes as part of delivery; report any authentication failure instead of claiming synchronization.
- Do not force-push, rewrite published history or overwrite unrelated user edits.
- Deployment is configured by `.github/workflows/pages.yml` for pushes to `main`; GitHub Pages must first be enabled using GitHub Actions, and the repository variable `ENABLE_PAGES_DEPLOY` must be set to `true` after the user confirms the publication audience. Without it only validation runs.
- Before first publication, confirm the chosen GitHub repository and audience with the user. The local workflow configuration is not evidence of a completed online deployment.
- Remote: `https://github.com/CynthiaCake/CynthiaResume.git`. Original remote README and history were preserved by merging, not force-pushing.
- In this task environment the inherited loopback proxy was unavailable and Windows SChannel failed. A working temporary Git invocation used `-c http.proxy= -c https.proxy= -c http.sslBackend=openssl`. TLS verification remains enabled. Prefer process-scoped overrides; do not change the user's global proxy or disable certificate checks.
