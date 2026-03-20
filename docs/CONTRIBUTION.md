# Contribution Guide

Thanks for contributing.

## Conventional Commits

This project uses Conventional Commits so release automation can generate versions and changelog entries.

Use commit messages in this format:

`<type>(optional-scope): <short description>`

Examples:

- `feat(ui): add dark mode switch`
- `fix(canvas): prevent null ref when rendering`
- `chore(ci): update workflow permissions`
- `docs: update contribution guide`

Common types:

- `feat`: New feature (usually bumps minor version)
- `fix`: Bug fix (usually bumps patch version)
- `docs`: Documentation changes
- `chore`: Maintenance work
- `refactor`: Code changes without behavior change
- `test`: Tests only
- `ci`: CI/CD workflow changes

Breaking changes:

- Use `!` after type/scope, e.g. `feat(api)!: remove legacy endpoint`
- Or include a `BREAKING CHANGE:` section in the commit body

## Review Comment Conventions

Use prefixes on your review comments so the author knows what actually needs to change before merging:

- `blocking`: This must be fixed before merge. Use sparingly — reserve it for bugs, security issues, or things that will break.
- `nit`: A minor style or naming suggestion. Take it or leave it.
- `suggestion`: A different approach worth considering, but the author's call.
- `question`: You don't understand something. Not necessarily a problem, but you'd like clarification.
