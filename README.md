# MotionKit — Animated React Component Library

16 accessible, animated React components built with Framer Motion and TypeScript. Includes an interactive docs site with live demos, props tables, and copiable code snippets.

## Components

| Component   | Description                          |
|-------------|--------------------------------------|
| Button      | Spring tap · variants · loading state |
| Badge       | Status indicator · dot · spring entrance |
| Card        | Hover lift animation                 |
| Input       | Animated focus ring · error/hint states |
| Checkbox    | Spring checkmark · indeterminate     |
| Switch      | Smooth thumb slide · 3 sizes         |
| Modal       | Scale + fade · focus trap · Escape   |
| Drawer      | Slide from any side · focus trap     |
| Toast       | Auto-dismiss notification stack      |
| Tooltip     | Delayed fade-in · 4 sides            |
| Dropdown    | Spring menu · icons · danger items   |
| Accordion   | Height animation · single or multi   |
| Tabs        | Sliding indicator · keyboard nav     |
| Progress    | Spring fill · indeterminate mode     |
| Skeleton    | Shimmer loader · preset compositions |
| Alert       | Animated icon · dismissible          |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the landing page, then navigate to `/docs` for the component library.

## Project Structure

```
MotionKit/
├── src/
│   ├── components/        # 16 components, each in its own folder
│   ├── hooks/             # useClickOutside · useEscapeKey · useFocusTrap
│   ├── utils/cn.ts        # clsx wrapper
│   └── index.ts           # Barrel export
├── app/
│   ├── page.tsx           # Landing page
│   ├── layout.tsx         # Fonts + metadata
│   ├── globals.css        # CSS custom property theme tokens
│   └── docs/
│       ├── layout.tsx     # Sidebar nav + ToastProvider
│       ├── page.tsx       # Getting started
│       └── [component]/   # One page per component with live demos
└── components/docs/
    └── DocComponents.tsx  # Preview, PropTable, DocHeading helpers
```

## Theme

All components use CSS custom properties. Toggle `html.light` to switch themes:

```css
:root {
  --accent:  #6366F1;
  --surface: #111118;
  /* ... */
}
html.light {
  --surface: #FFFFFF;
  /* ... */
}
```

## Accessibility

Every component follows WAI-ARIA patterns: focus trapping in Modal/Drawer, `role="switch"` on Switch, `role="tablist"` with arrow key navigation on Tabs, `aria-expanded` on Accordion, `role="alert"` on Toast/Alert, and `aria-describedby` on Tooltip.

## Tech Stack

Next.js 16 · TypeScript 5 · Framer Motion 12 · Tailwind CSS · lucide-react

## License

MIT
