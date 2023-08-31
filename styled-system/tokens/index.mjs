const tokens = {
  "colors.primary.user": {
    "value": "#5CD8F3",
    "variable": "var(--colors-primary-user)"
  },
  "colors.primary.admin": {
    "value": "#5C99F3",
    "variable": "var(--colors-primary-admin)"
  },
  "sizes.tableSize.normal": {
    "value": "600px",
    "variable": "var(--sizes-table-size-normal)"
  },
  "sizes.tableSize.large": {
    "value": "800px",
    "variable": "var(--sizes-table-size-large)"
  },
  "sizes.tableSize.fullWidth": {
    "value": "100%",
    "variable": "var(--sizes-table-size-full-width)"
  },
  "sizes.breakpoint-sm": {
    "value": "640px",
    "variable": "var(--sizes-breakpoint-sm)"
  },
  "sizes.breakpoint-md": {
    "value": "768px",
    "variable": "var(--sizes-breakpoint-md)"
  },
  "sizes.breakpoint-lg": {
    "value": "1024px",
    "variable": "var(--sizes-breakpoint-lg)"
  },
  "sizes.breakpoint-xl": {
    "value": "1280px",
    "variable": "var(--sizes-breakpoint-xl)"
  },
  "sizes.breakpoint-2xl": {
    "value": "1536px",
    "variable": "var(--sizes-breakpoint-2xl)"
  },
  "breakpoints.sm": {
    "value": "640px",
    "variable": "var(--breakpoints-sm)"
  },
  "breakpoints.md": {
    "value": "768px",
    "variable": "var(--breakpoints-md)"
  },
  "breakpoints.lg": {
    "value": "1024px",
    "variable": "var(--breakpoints-lg)"
  },
  "breakpoints.xl": {
    "value": "1280px",
    "variable": "var(--breakpoints-xl)"
  },
  "breakpoints.2xl": {
    "value": "1536px",
    "variable": "var(--breakpoints-2xl)"
  },
  "colors.colorPalette.user": {
    "value": "var(--colors-color-palette-user)",
    "variable": "var(--colors-color-palette-user)"
  },
  "colors.colorPalette.admin": {
    "value": "var(--colors-color-palette-admin)",
    "variable": "var(--colors-color-palette-admin)"
  }
}

export function token(path, fallback) {
  return tokens[path]?.value || fallback
}

function tokenVar(path, fallback) {
  return tokens[path]?.variable || fallback
}

token.var = tokenVar