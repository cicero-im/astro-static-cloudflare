---
name: agent-skills-index
description: Publish and maintain a non-empty Agent Skills discovery index at /.well-known/agent-skills/index.json.
---

# Agent Skills Discovery Index

Publish skills in the Agent Skills Discovery RFC v0.2.0 format so agents can discover your capabilities.

## Requirements

- Serve `/.well-known/agent-skills/index.json`
- Include `$schema`
- Populate `skills[]` with `name`, `type`, `description`, `url`, and a SHA-256 digest value

## Implementation Pattern

Store each skill in `skills/<skill-id>/SKILL.md` with valid frontmatter (`name`, `description`) and let discovery tooling generate the index.
