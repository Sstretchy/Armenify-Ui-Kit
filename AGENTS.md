# AI / Codex — источник дизайна

## Почему «не видно» Figma

Инструменты вроде **GitHub Copilot / Codex** не ходят в Figma по API и не используют **Figma MCP** (это отдельная интеграция в Cursor). Они видят только то, что **лежит в репозитории** и в открытых файлах.

## Как сверяться с макетом Armenify

- **Файл:** [Armenify (Figma)](https://www.figma.com/design/btCKgn6RrWiteyBN0bViU1/Armenify)
- **fileKey:** `btCKgn6RrWiteyBN0bViU1`
- **Токены в коде:** `src/styles/tokens.css` (агрегатор), детали в `src/styles/tokens/*.css`
- **Компоненты UI:** `src/components/ui/`

Полезные `node-id` из URL переводить в формат API: `454-21644` → `454:21644`.

## Что делать, если нужен точный кадр

1. Вставить в задачу **ссылку на фрейм** + скрин или краткие числа (padding, radius, цвета).
2. Либо экспортировать спеки в markdown в этот репозиторий (например `docs/figma-specs.md`) — тогда любой ассистент по репо их прочитает.
