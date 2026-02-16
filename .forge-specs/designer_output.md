[35m[plugins][39m [36mmemory-lancedb: plugin registered (db: /home/paco/.openclaw/memory/lancedb, lazy init)[39m
<!-- FILE: design_tokens.json -->
```json
{
  "$schema": "design-tokens-v1",
  "project": "clowforge-dashboard",

  "colors": {
    "primary": {
      "50": "#eef2ff",
      "100": "#e0e7ff",
      "200": "#c7d2fe",
      "300": "#a5b4fc",
      "400": "#818cf8",
      "500": "#4338CA",
      "600": "#3730a3",
      "700": "#312e81",
      "800": "#2e1065",
      "900": "#1e1b4b",
      "950": "#1e1b4b"
    },
    "secondary": {
      "50": "#ecfdf5",
      "100": "#d1fae5",
      "200": "#a7f3d0",
      "300": "#6ee7b7",
      "400": "#34d399",
      "500": "#059669",
      "600": "#047857",
      "700": "#065f46",
      "800": "#064e3b",
      "900": "#064e3b",
      "950": "#022c22"
    },
    "accent": {
      "50": "#eef2ff",
      "100": "#e0e7ff",
      "200": "#c7d2fe",
      "300": "#a5b4fc",
      "400": "#818cf8",
      "500": "#818CF8",
      "600": "#6366f1",
      "700": "#4f46e5",
      "800": "#4338ca",
      "900": "#3730a3",
      "950": "#312e81"
    },
    "neutral": {
      "50": "#f9fafb",
      "100": "#f3f4f6",
      "200": "#e5e7eb",
      "300": "#d1d5db",
      "400": "#9ca3af",
      "500": "#6b7280",
      "600": "#4b5563",
      "700": "#374151",
      "800": "#1f2937",
      "900": "#111827",
      "950": "#030712"
    },
    "success": {
      "light": "#d1fae5",
      "DEFAULT": "#059669",
      "dark": "#065f46"
    },
    "warning": {
      "light": "#fef3c7",
      "DEFAULT": "#f59e0b",
      "dark": "#d97706"
    },
    "error": {
      "light": "#fee2e2",
      "DEFAULT": "#DC2626",
      "dark": "#991b1b"
    },
    "info": {
      "light": "#dbeafe",
      "DEFAULT": "#3b82f6",
      "dark": "#1e40af"
    },

    "semantic": {
      "background": {
        "primary": "#ffffff",
        "secondary": "#f9fafb",
        "tertiary": "#f3f4f6"
      },
      "foreground": {
        "primary": "#111827",
        "secondary": "#4b5563",
        "muted": "#6b7280",
        "inverted": "#ffffff"
      },
      "border": {
        "default": "#e5e7eb",
        "strong": "#d1d5db",
        "focus": "#4338CA"
      },
      "surface": {
        "elevated": "#ffffff",
        "sunken": "#f9fafb"
      }
    },

    "dark": {
      "semantic": {
        "background": {
          "primary": "#030712",
          "secondary": "#111827",
          "tertiary": "#1f2937"
        },
        "foreground": {
          "primary": "#f9fafb",
          "secondary": "#d1d5db",
          "muted": "#9ca3af",
          "inverted": "#030712"
        },
        "border": {
          "default": "#1f2937",
          "strong": "#374151",
          "focus": "#818cf8"
        },
        "surface": {
          "elevated": "#111827",
          "sunken": "#030712"
        }
      }
    }
  },

  "typography": {
    "fontFamily": {
      "sans": "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      "mono": "'JetBrains Mono', 'Fira Code', Consolas, monospace"
    },
    "fontSize": {
      "xs": ["0.75rem", { "lineHeight": "1rem", "letterSpacing": "0.02em" }],
      "sm": ["0.875rem", { "lineHeight": "1.25rem", "letterSpacing": "0" }],
      "base": ["0.9375rem", { "lineHeight": "1.5rem", "letterSpacing": "0" }],
      "lg": ["1.0625rem", { "lineHeight": "1.75rem", "letterSpacing": "-0.01em" }],
      "xl": ["1.25rem", { "lineHeight": "1.875rem", "letterSpacing": "-0.01em" }],
      "2xl": ["1.5rem", { "lineHeight": "2rem", "letterSpacing": "-0.02em" }],
      "3xl": ["1.875rem", { "lineHeight": "2.25rem", "letterSpacing": "-0.02em" }],
      "4xl": ["2.25rem", { "lineHeight": "2.5rem", "letterSpacing": "-0.03em" }]
    },
    "fontWeight": {
      "normal": "400",
      "medium": "500",
      "semibold": "600",
      "bold": "700"
    }
  },

  "spacing": {
    "comment": "Uses Tailwind's default 4px grid: 1=4px, 2=8px, 3=12px, 4=16px, etc.",
    "section": "Semantic spacing for dashboard layouts",
    "page-x": {
      "mobile": "1rem",
      "md": "1.5rem",
      "lg": "2rem"
    },
    "page-y": {
      "mobile": "1.5rem",
      "md": "2rem",
      "lg": "2.5rem"
    },
    "card-padding": {
      "mobile": "1rem",
      "md": "1.5rem"
    },
    "stack-xs": "0.25rem",
    "stack-sm": "0.5rem",
    "stack-md": "1rem",
    "stack-lg": "1.5rem",
    "stack-xl": "2rem",
    "inline-sm": "0.5rem",
    "inline-md": "0.75rem",
    "inline-lg": "1rem"
  },

  "borderRadius": {
    "none": "0",
    "sm": "0.25rem",
    "DEFAULT": "0.5rem",
    "md": "0.5rem",
    "lg": "0.75rem",
    "xl": "1rem",
    "2xl": "1.5rem",
    "full": "9999px"
  },

  "shadows": {
    "sm": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    "DEFAULT": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    "md": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    "lg": "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    "xl": "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    "inner": "inset 0 2px 4px 0 rgb(0 0 0 / 0.06)"
  },

  "animation": {
    "durations": {
      "instant": "100ms",
      "fast": "200ms",
      "normal": "300ms",
      "slow": "500ms"
    },
    "easings": {
      "default": "cubic-bezier(0.4, 0, 0.2, 1)",
      "in": "cubic-bezier(0.4, 0, 1, 1)",
      "out": "cubic-bezier(0, 0, 0.2, 1)",
      "inOut": "cubic-bezier(0.4, 0, 0.2, 1)",
      "smooth": "cubic-bezier(0.25, 0.1, 0.25, 1)"
    }
  },

  "breakpoints": {
    "sm": "640px",
    "md": "768px",
    "lg": "1024px",
    "xl": "1280px",
    "2xl": "1536px"
  }
}
```

<!-- FILE: component_specs.md -->
```markdown
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
```tsx
<Button variant="primary" icon={Rocket}>Deploy to Production</Button>
<Button variant="secondary" onClick={handleRefresh}>Refresh</Button>
<Button variant="destructive" size="sm">Terminate Run</Button>
```

---

## Component: StatusBadge

### Purpose
Display run/task status with color-coded visual indicator.

### Variants
| Variant | Use Case | Background | Text | Icon |
|---------|----------|-----------|------|------|
| `pending` | Queued, not started | neutral-100 | neutral-700 | Clock |
| `running` | Currently executing | accent-100 | accent-700 | Loader (animated) |
| `completed` | Successful completion | secondary-100 | secondary-700 | CheckCircle |
| `failed` | Error/failure | error-light | error-dark | XCircle |
| `cancelled` | User-terminated | neutral-200 | neutral-600 | Ban |

### Sizes
| Size | Height | Font Size | Padding | Icon Size |
|------|--------|-----------|---------|-----------|
| `sm` | 20px | text-xs | px-2 py-0.5 | 12px |
| `md` | 24px | text-sm | px-2.5 py-1 | 14px |

### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `status` | `'pending' \| 'running' \| 'completed' \| 'failed' \| 'cancelled'` | — | Yes | Status value |
| `size` | `'sm' \| 'md'` | `'md'` | No | Component size |
| `showIcon` | `boolean` | `true` | No | Display status icon |

### Accessibility
- **Role:** `status` with `aria-live="polite"`
- **Icon:** `aria-hidden="true"` (decorative)
- **Text:** Status announced clearly

### Motion
- Running state: Icon rotates 360deg, duration `1s`, linear, infinite
- Status change: Fade out → fade in, duration `200ms`
- **Reduced motion:** Static icon for running state

---

## Component: Card

### Purpose
Container for grouped content (project info, run details, metrics).

### Variants
| Variant | Use Case | Visual Difference |
|---------|----------|-------------------|
| `default` | Standard content cards | White background, border, shadow sm |
| `elevated` | Interactive/clickable cards | White background, shadow md on hover |
| `flat` | Nested content, no elevation | White background, border only, no shadow |

### Sizes
| Size | Padding | Use Case |
|------|---------|----------|
| `sm` | 1rem (4) | Compact metrics, list items |
| `md` | 1.5rem (6) | Default cards |
| `lg` | 2rem (8) | Feature cards, detailed views |

### States
| State | Background | Border | Shadow | Cursor |
|-------|-----------|--------|--------|--------|
| Default | white | 1px neutral-200 | sm | auto |
| Hover (elevated) | white | 1px neutral-300 | md | pointer |
| Focus (elevated) | white | 2px primary-500 | md | pointer |

### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `variant` | `'default' \| 'elevated' \| 'flat'` | `'default'` | No | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Padding size |
| `onClick` | `() => void` | — | No | Makes card clickable (elevated behavior) |
| `children` | `ReactNode` | — | Yes | Card content |

### Accessibility
- **Role:** `article` for semantic cards
- **Interactive:** Wrap in `<button>` or `<a>` if `onClick` provided
- **Focus:** Visible focus ring when interactive

### Motion
- Hover (elevated): Shadow increase, duration `200ms`
- **Reduced motion:** Shadow change only

---

## Component: StatCard

### Purpose
Display key metric with value, label, and optional trend indicator.

### Layout
```
+------------------------------------------------+
| [Icon - 40px, primary-600]    [Trend: +12%]    |
|                                                |
| **1,247**  (text-3xl, font-bold, neutral-900)  |
| Total Projects (text-sm, neutral-600)          |
+------------------------------------------------+
```

### Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `value` | `string \| number` | Yes | Metric value |
| `label` | `string` | Yes | Metric label |
| `icon` | `LucideIcon` | No | Leading icon |
| `trend` | `{ value: number, direction: 'up' \| 'down' }` | No | Trend indicator |
| `loading` | `boolean` | No | Show skeleton state |

### Accessibility
- **Role:** `article`
- **Value:** Primary info, larger font
- **Trend:** Use color + icon (not color alone)

### Motion
- Value change: Animate number (count up/down), duration `500ms`
- **Reduced motion:** Instant value update

---

## Component: Table

### Purpose
Display tabular data (runs, tasks, projects) with sortable columns.

### Layout
```
+------------------------------------------------------------------+
| Column Header ↑ | Column Header | Column Header | Actions        |
|------------------------------------------------------------------+
| Cell content    | Cell content  | Cell content  | [Edit] [Delete]|
| Cell content    | Cell content  | Cell content  | [Edit] [Delete]|
+------------------------------------------------------------------+
```

### Sizes
- Header: text-xs, uppercase, font-semibold, neutral-600
- Cell: text-sm, neutral-900
- Row height: 48px (min)
- Cell padding: px-4 py-3

### States
| Row State | Background | Border |
|-----------|-----------|--------|
| Default | white | bottom 1px neutral-200 |
| Hover | neutral-50 | bottom 1px neutral-200 |
| Selected | accent-50 | bottom 1px accent-300 |

### Props
| Prop | Type | Required | Description |
|------|------|---------|----------|-------------|
| `columns` | `Column[]` | Yes | Column definitions |
| `data` | `any[]` | Yes | Table data |
| `sortable` | `boolean` | No | Enable column sorting |
| `onSort` | `(column, direction) => void` | No | Sort handler |
| `loading` | `boolean` | No | Show skeleton rows |
| `emptyMessage` | `string` | No | Empty state text |

### Accessibility
- **Role:** `table` with `<thead>`, `<tbody>`, `<th>`, `<td>`
- **Headers:** `scope="col"` on header cells
- **Sortable:** `aria-sort="ascending|descending|none"`
- **Keyboard:** Arrow keys navigate cells, Enter activates actions

### Motion
- Sort: Rows fade out → reorder → fade in, duration `300ms`
- **Reduced motion:** Instant reorder

### Responsive Behavior
- Desktop: Full table
- Mobile (`< md`): Stack as cards or horizontal scroll

---

## Component: Tabs

### Purpose
Navigate between views (Itinerary/Map/Budget tabs, Settings sections).

### Layout
```
+------------------------------------------------------------------+
| [Tab 1 - active]  [Tab 2]  [Tab 3]                               |
| ══════════════                                                    |
+------------------------------------------------------------------+
| Tab content area                                                 |
+------------------------------------------------------------------+
```

### Tab States
| State | Text | Border Bottom | Background |
|-------|------|---------------|-----------|
| Default | neutral-600 | none | transparent |
| Hover | neutral-900 | none | neutral-50 |
| Active | primary-600 | 2px primary-600 | transparent |
| Focus | neutral-900 | none | ring-2 ring-primary-400 |

### Props
| Prop | Type | Required | Description |
|------|------|---------|----------|-------------|
| `tabs` | `Tab[]` | Yes | Tab definitions |
| `activeTab` | `string` | Yes | Active tab key |
| `onChange` | `(key) => void` | Yes | Tab change handler |

### Props (Tab)
| Prop | Type | Required | Description |
|------|------|---------|----------|-------------|
| `key` | `string` | Yes | Unique tab identifier |
| `label` | `string` | Yes | Tab label |
| `icon` | `LucideIcon` | No | Tab icon |

### Accessibility
- **Role:** `tablist` with `<tab>` elements
- **Selection:** `aria-selected="true"` on active tab
- **Keyboard:** Left/Right arrows navigate tabs, Enter activates
- **Content:** `<tabpanel>` with `aria-labelledby` pointing to tab

### Motion
- Tab change: Content fade out → fade in, duration `200ms`
- Active indicator: Slide to new position, duration `200ms`
- **Reduced motion:** Instant switch

---

## Component: Skeleton

### Purpose
Loading placeholder for content (cards, table rows, text).

### Variants
| Variant | Use Case | Shape |
|---------|----------|-------|
| `text` | Text lines | Rectangular, varying widths (100%, 80%, 60%) |
| `card` | Full card | Rounded rectangle matching card size |
| `circle` | Avatar | Circle |
| `rect` | Generic block | Rectangular |

### Animation
- Pulse: opacity 0.5 → 1 → 0.5, duration `1.5s`, infinite
- Background: neutral-200

### Props
| Prop | Type | Required | Description |
|------|------|---------|----------|-------------|
| `variant` | `'text' \| 'card' \| 'circle' \| 'rect'` | Yes | Skeleton type |
| `width` | `string` | No | Custom width |
| `height` | `string` | No | Custom height |
| `count` | `number` | No | Number of skeleton items (text variant) |

### Accessibility
- **ARIA:** `aria-busy="true"` on container, `aria-label="Loading"`

### Motion
- Pulse animation always enabled
- **Reduced motion:** Static mid-opacity, no animation

---

## Component: Sidebar

### Purpose
Primary navigation for dashboard sections.

### Layout
```
+----------------------------------+
| [Logo]                           |
|                                  |
| [Projects - active]              |
| [Runs]                           |
| [Costs]                          |
| [Health]                         |
|                                  |
| --- (divider)                    |
|                                  |
| [Settings]                       |
| [User Menu]                      |
+----------------------------------+
```

### Dimensions
- Width: 240px (desktop), collapsed: 64px
- Height: 100vh (sticky)

### Navigation Item States
| State | Background | Text | Border Left |
|-------|-----------|------|-------------|
| Default | transparent | neutral-600 | none |
| Hover | neutral-100 | neutral-900 | none |
| Active | primary-50 | primary-600 | 3px primary-600 |
| Focus | transparent | neutral-900 | ring-2 ring-primary-400 |

### Props
| Prop | Type | Required | Description |
|------|------|---------|----------|-------------|
| `items` | `NavItem[]` | Yes | Navigation items |
| `activeItem` | `string` | Yes | Active route |
| `collapsed` | `boolean` | No | Collapsed state |
| `onToggle` | `() => void` | No | Collapse toggle handler |

### Accessibility
- **Role:** `navigation` with `aria-label="Main navigation"`
- **Current:** `aria-current="page"` on active item
- **Keyboard:** Tab through items, Enter to navigate
- **Focus trap:** When mobile menu open

### Motion
- Collapse: Width transition, duration `300ms`
- **Reduced motion:** Instant collapse

### Responsive Behavior
- Desktop (`lg+`): Fixed sidebar, always visible
- Tablet/Mobile (`< lg`): Drawer overlay, toggle button in header

---

## Component: Header

### Purpose
Top bar with breadcrumbs, actions, and user menu (when sidebar is present).

### Layout
```
+------------------------------------------------------------------+
| [Breadcrumbs]                                    [Actions] [User] |
+------------------------------------------------------------------+
```

### Dimensions
- Height: 64px
- Sticky: top 0

### Props
| Prop | Type | Required | Description |
|------|------|---------|----------|-------------|
| `breadcrumbs` | `Breadcrumb[]` | No | Breadcrumb items |
| `actions` | `ReactNode` | No | Header actions (buttons, etc.) |
| `showSidebarToggle` | `boolean` | No | Show sidebar toggle on mobile |

### Accessibility
- **Role:** `banner`
- **Breadcrumbs:** `<nav aria-label="Breadcrumb">`
- **Skip link:** "Skip to main content" (visually hidden)

---

## Component: Toast

### Purpose
Temporary notification for user feedback (deploy success, error occurred).

### Layout
```
+--------------------------------------------------+
| [Icon] Message text here.            [X Close]  |
+--------------------------------------------------+
```

### Variants
| Variant | Icon | Background | Border Left | Text |
|---------|------|-----------|-------------|------|
| `success` | CheckCircle | white | 4px secondary-DEFAULT | neutral-900 |
| `error` | XCircle | white | 4px error-DEFAULT | neutral-900 |
| `info` | Info | white | 4px info-DEFAULT | neutral-900 |
| `warning` | AlertTriangle | white | 4px warning-DEFAULT | neutral-900 |

### Props
| Prop | Type | Required | Description |
|------|------|---------|----------|-------------|
| `variant` | `'success' \| 'error' \| 'info' \| 'warning'` | Yes | Toast type |
| `message` | `string` | Yes | Toast message |
| `duration` | `number` | No | Auto-dismiss time (ms), default 5000 |
| `onClose` | `() => void` | No | Manual close handler |

### Accessibility
- **Role:** `status` for info/success, `alert` for error/warning
- **Live region:** `aria-live="polite"` for info/success, `aria-live="assertive"` for error/warning
- **Dismissible:** Close button with `aria-label="Close notification"`

### Motion
- Enter: Slide in from right, duration `200ms`
- Exit: Slide out to right + fade, duration `200ms`
- **Reduced motion:** Fade only

### Responsive Behavior
- Mobile: Full width, bottom of screen
- Desktop: Fixed bottom-right, max-width 400px

---

## Component: CostChart

### Purpose
Visualize cost trends over time using Recharts.

### Chart Type
Line chart with:
- X-axis: Date/time
- Y-axis: Cost in USD
- Line color: accent-500
- Grid: neutral-200
- Tooltip: White background, border neutral-300, shadow md

### Props
| Prop | Type | Required | Description |
|------|------|---------|----------|-------------|
| `data` | `CostDataPoint[]` | Yes | Cost data points |
| `height` | `number` | No | Chart height (default 300px) |
| `showGrid` | `boolean` | No | Display grid lines |

### Props (CostDataPoint)
| Prop | Type | Required | Description |
|------|------|---------|----------|-------------|
| `date` | `string` | Yes | ISO date string |
| `cost` | `number` | Yes | Cost in USD |

### Accessibility
- **Role:** `img` with `aria-label` describing the chart
- **Keyboard:** Focus on interactive elements (tooltips)
- **Data table:** Provide accessible data table alternative

---

## Page-Level Specifications

### Page: Projects List (/)

#### Layout
```
+------------------------------------------------------------------+
| Header: Breadcrumbs (Home)                         [New Project] |
+------------------------------------------------------------------+
| Sidebar |                                                        |
|         | Stats Row:                                             |
|         | [Active: 12] [Completed: 45] [Failed: 3] [Total: 60]  |
|         |                                                        |
|         | Projects Grid:                                         |
|         | [ProjectCard] [ProjectCard] [ProjectCard]              |
|         | [ProjectCard] [ProjectCard] [ProjectCard]              |
|         |                                                        |
+------------------------------------------------------------------+
```

#### Component Placement
1. Header with breadcrumb "Projects" and "New Project" button
2. 4 StatCards in a row (Active, Completed, Failed, Total)
3. Grid of ProjectCards (3 columns on desktop, responsive)

#### Responsive Breakpoints
- `< md`: Single column grid, sidebar as drawer
- `md - lg`: 2-column grid
- `lg+`: 3-column grid, fixed sidebar

#### Loading State
- 4 skeleton StatCards
- 6 skeleton ProjectCards in grid

#### Empty State
```
+------------------------------------------------------------------+
| [Icon: FolderPlus]                                               |
| **No projects yet**                                              |
| Create your first project to get started with ClowForge.         |
| [Create Project - primary button]                                |
+------------------------------------------------------------------+
```

#### Error State
- Toast with error message
- Retry button in empty state

---

### Page: Project Detail (/projects/[id])

#### Layout
```
+------------------------------------------------------------------+
| Header: Projects > {Project Name}        [Deploy] [Settings]     |
+------------------------------------------------------------------+
| Sidebar |                                                        |
|         | Project Info Card:                                     |
|         | - Name                                                 |
|         | - Status Badge                                         |
|         | - Preview URL                                          |
|         | - Production URL                                       |
|         | - Repository                                           |
|         |                                                        |
|         | Tabs: [Runs] [Files] [Settings]                       |
|         |                                                        |
|         | Runs Tab Content:                                      |
|         | Table of runs (status, started, duration, cost)        |
+------------------------------------------------------------------+
```

#### Component Placement
1. Project info card (left sidebar or top)
2. Tabs for Runs, Files, Settings
3. Runs table as default tab
4. Quick actions (Deploy, Settings) in header

#### Responsive Breakpoints
- `< md`: Stack vertically, full width
- `md+`: Sidebar left, content right

#### Loading State
- Skeleton project info card
- Skeleton table (5 rows)

#### Empty State (no runs)
```
+------------------------------------------------------------------+
| [Icon: Layers]                                                   |
| **No runs yet**                                                  |
| This project hasn't been built yet. Deploy to create a run.      |
| [Deploy - primary button]                                        |
+------------------------------------------------------------------+
```

---

### Page: Runs List (/runs)

#### Layout
```
+------------------------------------------------------------------+
| Header: Runs                                [Refresh] [Filter]   |
+------------------------------------------------------------------+
| Sidebar |                                                        |
|         | Filters (left sidebar):                                |
|         | - Status (checkboxes)                                  |
|         | - Date range                                           |
|         | - Project (dropdown)                                   |
|         |                                                        |
|         | Runs Table:                                            |
|         | ID | Project | Status | Started | Duration | Cost      |
+------------------------------------------------------------------+
```

#### Component Placement
1. Filter sidebar (collapsible on mobile)
2. Table with sortable columns
3. Pagination at bottom
4. Refresh and Filter buttons in header

#### Responsive Breakpoints
- `< md`: Filters as modal/drawer, full-width table (horizontal scroll)
- `md+`: Fixed filter sidebar, table with comfortable columns

#### Loading State
- Skeleton table (10 rows)
- Disabled filters

#### Empty State (no runs)
```
+------------------------------------------------------------------+
| [Icon: PlayCircle]                                               |
| **No runs found**                                                |
| Try adjusting your filters or create a new project.              |
| [Clear Filters]                                                  |
+------------------------------------------------------------------+
```

---

### Page: Run Detail (/runs/[id])

#### Layout
```
+------------------------------------------------------------------+
| Header: Runs > {Run ID}                      [Terminate] [Logs]  |
+------------------------------------------------------------------+
| Sidebar |                                                        |
|         | Run Info Card:                                         |
|         | - Status Badge (live updating)                         |
|         | - Started at                                           |
|         | - Duration                                             |
|         | - Cost                                                 |
|         |                                                        |
|         | Task Timeline:                                         |
|         | [Task 1: Architect] ✓ Completed 12.3s $0.15           |
|         | [Task 2: Lead Frontend] ⏳ Running 5.2s                |
|         | [Task 3: Designer] ○ Pending                           |
|         | [Task 4: Developer] ○ Pending                          |
|         |                                                        |
|         | Artifacts:                                             |
|         | - architecture.md                                      |
|         | - design_tokens.json                                   |
+------------------------------------------------------------------+
```

#### Component Placement
1. Run info card with live status
2. Task timeline with real-time progress
3. Artifacts list (collapsible, downloadable)
4. Quick actions (Terminate, View Logs) in header

#### Responsive Breakpoints
- `< md`: Stack vertically
- `md+`: Sidebar layout

#### Loading State
- Skeleton run info
- Skeleton task timeline (4 items)

#### Empty State (no tasks yet)
```
+------------------------------------------------------------------+
| [Icon: Loader]                                                   |
| **Run initializing...**                                          |
| Tasks will appear here as the run progresses.                    |
+------------------------------------------------------------------+
```

---

### Page: Costs (/costs)

#### Layout
```
+------------------------------------------------------------------+
| Header: Costs                                       [Export CSV]  |
+------------------------------------------------------------------+
| Sidebar |                                                        |
|         | Stats Row:                                             |
|         | [Total: $142.35] [This Month: $28.50] [Avg/Run: $2.37]|
|         |                                                        |
|         | Cost Chart (last 30 days)                              |
|         |                                                        |
|         | Cost Breakdown Table:                                  |
|         | Agent | Runs | Total Cost | Avg Cost | % of Total      |
+------------------------------------------------------------------+
```

#### Component Placement
1. Stats cards (total, monthly, average)
2. Line chart showing cost trend
3. Table breaking down by agent/model
4. Export CSV button

#### Responsive Breakpoints
- `< md`: Stack vertically, full-width chart
- `md+`: Grid layout

#### Loading State
- Skeleton stats
- Skeleton chart
- Skeleton table

---

### Page: Health (/health)

#### Layout
```
+------------------------------------------------------------------+
| Header: System Health                              [Refresh]     |
+------------------------------------------------------------------+
| Sidebar |                                                        |
|         | Overall Status:                                        |
|         | [✓ All Systems Operational] (or error state)           |
|         |                                                        |
|         | Service Status Cards:                                  |
|         | [Supabase] ✓ Operational                               |
|         | [Vercel] ✓ Operational                                 |
|         | [OpenAI] ✓ Operational                                 |
|         |                                                        |
|         | Recent Errors:                                         |
|         | Table of errors (if any)                               |
+------------------------------------------------------------------+
```

#### Component Placement
1. Overall status banner
2. Service status cards in grid
3. Recent errors table (if applicable)

#### Responsive Breakpoints
- `< md`: Single column
- `md+`: 2-column grid for services

#### Loading State
- Skeleton status cards

#### Empty State (no errors)
```
+------------------------------------------------------------------+
| [Icon: CheckCircle]                                              |
| **No recent errors**                                             |
| All systems are running smoothly.                                |
+------------------------------------------------------------------+
```

---

### Page: Settings (/settings)

#### Layout
```
+------------------------------------------------------------------+
| Header: Settings                                                 |
+------------------------------------------------------------------+
| Sidebar |                                                        |
|         | Tabs (vertical):                                       |
|         | [Account - active]                                     |
|         | [Notifications]                                        |
|         | [Security]                                             |
|         |                                                        |
|         | Tab Content:                                           |
|         | [Form fields for selected section]                    |
|         | [Save Changes button]                                  |
+------------------------------------------------------------------+
```

#### Component Placement
1. Vertical tabs on left
2. Form content area on right
3. Save button at bottom of each section

#### Responsive Breakpoints
- `< md`: Tabs as horizontal top bar
- `md+`: Vertical sidebar tabs

#### Loading State
- Skeleton form fields

---

### Page: Login (/login)

#### Layout
```
+------------------------------------------------------------------+
|                                                                  |
|                     [ClowForge Logo]                             |
|                                                                  |
|                  **ClowForge Dashboard**                         |
|                  Sign in to continue                             |
|                                                                  |
|                  [Email input]                                   |
|                  [Password input]                                |
|                                                                  |
|                  [Sign in - primary button]                      |
|                                                                  |
+------------------------------------------------------------------+
```

#### Component Placement
- Centered card (max-width 400px)
- Logo at top
- Title and subtitle
- Email and password inputs
- Sign in button

#### Responsive Breakpoints
- All breakpoints: Centered, max-width 400px

#### Loading State
- Disabled inputs, loading button

#### Error State
- Inline error message below form
- Red border on invalid input
```

<!-- FILE: copy.md -->
```markdown
# Copy Document: clowforge-dashboard

## Voice & Tone

- **Voice:** Technical, direct, no-nonsense. This is an internal developer tool. Speak to developers who understand the pipeline. Use technical terminology without apology. Brief and actionable.

- **Tone shifts:**
  - **Success states:** Straightforward confirmation. "Deploy completed."
  - **Error states:** Diagnostic. Provide specific error info, not sympathy. "Build failed. Task 3 (Developer) timed out after 600s."
  - **Empty states:** Neutral guidance. "No runs yet. Deploy a project to create a run."
  - **Loading states:** Minimal. "Loading..." or specific progress ("Architect generating blueprint...").

---

## Global

### Navigation
| Key | Text |
|-----|------|
| `nav.projects` | Projects |
| `nav.runs` | Runs |
| `nav.costs` | Costs |
| `nav.health` | Health |
| `nav.settings` | Settings |

### Common Actions
| Key | Text |
|-----|------|
| `action.save` | Save |
| `action.cancel` | Cancel |
| `action.delete` | Delete |
| `action.deploy` | Deploy |
| `action.refresh` | Refresh |
| `action.filter` | Filter |
| `action.export` | Export |
| `action.terminate` | Terminate |
| `action.retry` | Retry |
| `action.viewLogs` | View Logs |
| `action.loading` | Loading... |
| `action.close` | Close |

---

## Auth

### Login Page
| Key | Text |
|-----|------|
| `auth.login.title` | ClowForge Dashboard |
| `auth.login.subtitle` | Sign in to continue |
| `auth.login.email.label` | Email |
| `auth.login.email.placeholder` | you@example.com |
| `auth.login.password.label` | Password |
| `auth.login.password.placeholder` | Enter your password |
| `auth.login.submit` | Sign in |
| `auth.login.error.invalid` | Invalid email or password |
| `auth.login.error.network` | Connection failed. Check network and retry. |

---

## Projects

### Projects List
| Key | Text |
|-----|------|
| `projects.title` | Projects |
| `projects.new` | New Project |
| `projects.stats.active` | Active |
| `projects.stats.completed` | Completed |
| `projects.stats.failed` | Failed |
| `projects.stats.total` | Total |
| `projects.empty.title` | No projects yet |
| `projects.empty.message` | Create your first project to get started with ClowForge. |
| `projects.empty.cta` | Create Project |

### Project Card
| Key | Text |
|-----|------|
| `projectCard.preview` | Preview |
| `projectCard.production` | Production |
| `projectCard.repository` | Repository |
| `projectCard.lastRun` | Last run: {time} |
| `projectCard.noRuns` | No runs yet |

### Project Detail
| Key | Text |
|-----|------|
| `project.tabs.runs` | Runs |
| `project.tabs.files` | Files |
| `project.tabs.settings` | Settings |
| `project.info.status` | Status |
| `project.info.created` | Created |
| `project.info.updated` | Last updated |
| `project.info.preview` | Preview URL |
| `project.info.production` | Production URL |
| `project.info.repository` | Repository |
| `project.info.branch` | Branch |
| `project.runs.empty.title` | No runs yet |
| `project.runs.empty.message` | This project hasn't been built yet. Deploy to create a run. |
| `project.runs.empty.cta` | Deploy |

---

## Runs

### Runs List
| Key | Text |
|-----|------|
| `runs.title` | Runs |
| `runs.filter.status` | Status |
| `runs.filter.project` | Project |
| `runs.filter.dateRange` | Date range |
| `runs.filter.clear` | Clear filters |
| `runs.table.id` | ID |
| `runs.table.project` | Project |
| `runs.table.status` | Status |
| `runs.table.started` | Started |
| `runs.table.duration` | Duration |
| `runs.table.cost` | Cost |
| `runs.empty.title` | No runs found |
| `runs.empty.message` | Try adjusting your filters or create a new project. |
| `runs.empty.cta` | Clear Filters |

### Run Detail
| Key | Text |
|-----|------|
| `run.info.id` | Run ID |
| `run.info.status` | Status |
| `run.info.project` | Project |
| `run.info.started` | Started |
| `run.info.completed` | Completed |
| `run.info.duration` | Duration |
| `run.info.cost` | Cost |
| `run.tasks.title` | Tasks |
| `run.tasks.agent` | Agent |
| `run.tasks.phase` | Phase |
| `run.tasks.status` | Status |
| `run.tasks.duration` | Duration |
| `run.tasks.tokens` | Tokens |
| `run.tasks.cost` | Cost |
| `run.artifacts.title` | Artifacts |
| `run.artifacts.download` | Download |
| `run.empty.tasks.title` | Run initializing... |
| `run.empty.tasks.message` | Tasks will appear here as the run progresses. |

### Run Statuses
| Key | Text |
|-----|------|
| `status.pending` | Pending |
| `status.running` | Running |
| `status.completed` | Completed |
| `status.failed` | Failed |
| `status.cancelled` | Cancelled |

### Task Agents
| Key | Text |
|-----|------|
| `agent.architect` | Architect |
| `agent.leadFrontend` | Lead Frontend |
| `agent.designer` | Designer |
| `agent.developer` | Developer |
| `agent.reviewer` | Reviewer |

---

## Costs

| Key | Text |
|-----|------|
| `costs.title` | Costs |
| `costs.export` | Export CSV |
| `costs.stats.total` | Total Cost |
| `costs.stats.thisMonth` | This Month |
| `costs.stats.avgRun` | Avg per Run |
| `costs.chart.title` | Cost Trend (Last 30 Days) |
| `costs.breakdown.title` | Cost Breakdown by Agent |
| `costs.table.agent` | Agent |
| `costs.table.runs` | Runs |
| `costs.table.totalCost` | Total Cost |
| `costs.table.avgCost` | Avg Cost |
| `costs.table.percentage` | % of Total |

---

## Health

| Key | Text |
|-----|------|
| `health.title` | System Health |
| `health.status.operational` | All Systems Operational |
| `health.status.degraded` | Degraded Performance |
| `health.status.outage` | Service Outage |
| `health.service.supabase` | Supabase |
| `health.service.vercel` | Vercel |
| `health.service.openai` | OpenAI |
| `health.service.status.operational` | Operational |
| `health.service.status.degraded` | Degraded |
| `health.service.status.down` | Down |
| `health.errors.title` | Recent Errors |
| `health.errors.empty.title` | No recent errors |
| `health.errors.empty.message` | All systems are running smoothly. |

---

## Settings

| Key | Text |
|-----|------|
| `settings.title` | Settings |
| `settings.tabs.account` | Account |
| `settings.tabs.notifications` | Notifications |
| `settings.tabs.security` | Security |
| `settings.account.email.label` | Email |
| `settings.account.name.label` | Full name |
| `settings.account.role.label` | Role |
| `settings.account.save` | Save changes |
| `settings.notifications.email.label` | Email notifications |
| `settings.notifications.runCompleted` | Run completed |
| `settings.notifications.runFailed` | Run failed |
| `settings.notifications.save` | Save preferences |
| `settings.security.password.label` | Password |
| `settings.security.changePassword` | Change password |
| `settings.security.currentPassword.label` | Current password |
| `settings.security.newPassword.label` | New password |
| `settings.security.confirmPassword.label` | Confirm new password |

---

## Errors

### Validation Errors
| Key | Text |
|-----|------|
| `error.required` | Required |
| `error.email.invalid` | Invalid email address |
| `error.password.min` | Password must be at least 8 characters |
| `error.password.mismatch` | Passwords do not match |

### API Errors
| Key | Text |
|-----|------|
| `error.network` | Network error. Check connection and retry. |
| `error.server` | Server error. Try again in a moment. |
| `error.unauthorized` | Session expired. Sign in again. |
| `error.forbidden` | Permission denied. |
| `error.notFound` | Resource not found. |
| `error.timeout` | Request timed out. Retry. |
| `error.unknown` | An error occurred. Contact support if this persists. |

### Toast Messages
| Key | Text |
|-----|------|
| `toast.deploy.success` | Deploy started |
| `toast.deploy.error` | Deploy failed. Check logs. |
| `toast.save.success` | Changes saved |
| `toast.save.error` | Save failed. Retry. |
| `toast.delete.success` | Deleted |
| `toast.delete.error` | Delete failed |
| `toast.copy.success` | Copied to clipboard |
| `toast.terminate.success` | Run terminated |
| `toast.terminate.error` | Terminate failed |

---

## Empty States

### Generic
| Key | Text |
|-----|------|
| `empty.title` | No data |
| `empty.message` | Nothing to display yet. |

### Projects
| Key | Text |
|-----|------|
| `empty.projects.title` | No projects yet |
| `empty.projects.message` | Create your first project to get started with ClowForge. |
| `empty.projects.cta` | Create Project |

### Runs
| Key | Text |
|-----|------|
| `empty.runs.title` | No runs found |
| `empty.runs.message` | Try adjusting your filters or create a new project. |
| `empty.runs.cta` | Clear Filters |

### Tasks
| Key | Text |
|-----|------|
| `empty.tasks.title` | Run initializing... |
| `empty.tasks.message` | Tasks will appear here as the run progresses. |

### Errors (Health)
| Key | Text |
|-----|------|
| `empty.errors.title` | No recent errors |
| `empty.errors.message` | All systems are running smoothly. |

---

## Meta

| Page | Title | Description |
|------|-------|-------------|
| Login | Sign In - ClowForge Dashboard | Sign in to ClowForge Dashboard |
| Projects | Projects - ClowForge Dashboard | View and manage ClowForge projects |
| Project Detail | {Project Name} - ClowForge Dashboard | Project details and runs |
| Runs | Runs - ClowForge Dashboard | View all pipeline runs |
| Run Detail | Run {ID} - ClowForge Dashboard | Run details and task progress |
| Costs | Costs - ClowForge Dashboard | Cost tracking and analytics |
| Health | System Health - ClowForge Dashboard | System status and service health |
| Settings | Settings - ClowForge Dashboard | Account and dashboard settings |

---

## Time Formatting

| Key | Format |
|-----|--------|
| `time.relative.justNow` | Just now |
| `time.relative.minutesAgo` | {n}m ago |
| `time.relative.hoursAgo` | {n}h ago |
| `time.relative.daysAgo` | {n}d ago |
| `time.relative.weeksAgo` | {n}w ago |
| `time.duration.seconds` | {n}s |
| `time.duration.minutes` | {n}m |
| `time.duration.hours` | {n}h |
| `time.duration.days` | {n}d |

---

## Units

| Key | Text |
|-----|------|
| `units.cost.usd` | ${amount} |
| `units.tokens.input` | {n} in |
| `units.tokens.output` | {n} out |
| `units.tokens.total` | {n} tokens |
```

<!-- FILE: assets_manifest.json -->
```json
[]
```