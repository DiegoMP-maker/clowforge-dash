# Component Specifications: clowforge-dashboard

## Design Principles
1. **Clarity** - Data-dense dashboard requires clear hierarchy. Every metric, status, and action must be immediately understandable.
2. **Efficiency** - Internal tool for developers. Optimize for speed of information access, not hand-holding.
3. **Consistency** - Reuse patterns. Same status badge colors, same card layouts, same table structures across all pages.
4. **Accessibility** - WCAG 2.2 AA baseline. Keyboard navigation essential for developer workflow.
5. **Real-time** - Visual feedback for live updates. Subtle animations for status changes, no page reloads.

---

## Component: Button

### Purpose
Primary interaction element for actions (deploy, retry, refresh, delete).

### Variants
| Variant | Use Case | Visual Difference |
|---------|----------|-------------------|
| `primary` | Main actions (deploy, create) | Filled primary-600 background, white text |
| `secondary` | Secondary actions (refresh, export) | Filled neutral-200 background, neutral-900 text |
| `outline` | Tertiary actions (filters, view) | Border neutral-300, neutral-700 text |
| `ghost` | Subtle actions (close, cancel) | No border, neutral-700 text |
| `destructive` | Delete, terminate actions | Filled error-DEFAULT background, white text |

### Sizes
| Size | Height | Font Size | Padding X | Padding Y | Use Case |
|------|--------|-----------|-----------|-----------|----------|
| `sm` | 32px | text-sm | 12px (3) | 6px (1.5) | Dense tables, inline actions |
| `md` | 36px | text-sm | 16px (4) | 8px (2) | Default, forms, toolbars |
| `lg` | 40px | text-base | 20px (5) | 10px (2.5) | Primary CTAs |

### States

**Primary Variant:**
| State | Background | Border | Text | Shadow | Cursor | Transform | Other |
|-------|-----------|--------|------|--------|--------|-----------|-------|
| Default | primary-600 | none | white | sm | pointer | none | font-medium |
| Hover | primary-700 | none | white | md | pointer | none | transition 200ms |
| Focus | primary-600 | none | white | sm | pointer | none | ring-2 ring-primary-400 ring-offset-2 |
| Active | primary-800 | none | white | none | pointer | none | |
| Disabled | neutral-300 | none | neutral-500 | none | not-allowed | none | opacity-50 |
| Loading | primary-600 | none | transparent | sm | wait | none | spinner white |

**Secondary Variant:**
| State | Background | Border | Text | Shadow | Cursor |
|-------|-----------|--------|------|--------|--------|
| Default | neutral-100 | none | neutral-900 | sm | pointer |
| Hover | neutral-200 | none | neutral-900 | md | pointer |
| Focus | neutral-100 | none | neutral-900 | sm | ring-2 ring-neutral-400 ring-offset-2 |
| Active | neutral-300 | none | neutral-900 | none | pointer |
| Disabled | neutral-100 | none | neutral-400 | none | not-allowed |

**Outline Variant:**
| State | Background | Border | Text | Shadow | Cursor |
|-------|-----------|--------|------|--------|--------|
| Default | transparent | 1px neutral-300 | neutral-700 | none | pointer |
| Hover | neutral-50 | 1px neutral-400 | neutral-900 | sm | pointer |
| Focus | transparent | 1px neutral-300 | neutral-700 | none | ring-2 ring-neutral-400 ring-offset-2 |
| Active | neutral-100 | 1px neutral-400 | neutral-900 | none | pointer |
| Disabled | transparent | 1px neutral-200 | neutral-400 | none | not-allowed |

### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'destructive'` | `'primary'` | No | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Component size |
| `disabled` | `boolean` | `false` | No | Disable interaction |
| `loading` | `boolean` | `false` | No | Show loading spinner |
| `icon` | `LucideIcon` | — | No | Leading icon |
| `iconRight` | `LucideIcon` | — | No | Trailing icon |
| `onClick` | `() => void` | — | No | Click handler |
| `children` | `ReactNode` | — | Yes | Button text |

### Accessibility
- **Role:** `button` (native `<button>` element)
- **Keyboard:** `Enter` and `Space` to activate. `Tab` to focus.
- **ARIA:** `aria-disabled="true"` when disabled. `aria-busy="true"` when loading.
- **Screen reader:** Loading state announces via `aria-live="polite"`.
- **Focus indicator:** 2px ring, always visible.

### Motion
- Hover: Background color transition, duration `200ms`, easing `default`
- **Reduced motion:** Instant color change

### Responsive Behavior
- Full width on mobile (`< sm`) when in form context
- Auto width with padding at `sm+`

### Usage Examples
