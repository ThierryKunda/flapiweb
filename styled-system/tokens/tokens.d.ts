/* eslint-disable */
export type Token = "colors.primary.user" | "colors.primary.admin" | "sizes.tableSize.normal" | "sizes.tableSize.large" | "sizes.tableSize.fullWidth" | "sizes.breakpoint-sm" | "sizes.breakpoint-md" | "sizes.breakpoint-lg" | "sizes.breakpoint-xl" | "sizes.breakpoint-2xl" | "breakpoints.sm" | "breakpoints.md" | "breakpoints.lg" | "breakpoints.xl" | "breakpoints.2xl" | "colors.colorPalette.user" | "colors.colorPalette.admin"

export type ColorPalette = "primary"

export type ColorToken = "primary.user" | "primary.admin" | "colorPalette.user" | "colorPalette.admin"

export type SizeToken = "tableSize.normal" | "tableSize.large" | "tableSize.fullWidth" | "breakpoint-sm" | "breakpoint-md" | "breakpoint-lg" | "breakpoint-xl" | "breakpoint-2xl"

export type BreakpointToken = "sm" | "md" | "lg" | "xl" | "2xl"

export type AnimationName = "spin" | "ping" | "pulse" | "bounce"

export type Tokens = {
		colors: ColorToken
		sizes: SizeToken
		breakpoints: BreakpointToken
		animationName: AnimationName
} & { [token: string]: never }

export type TokenCategory = "zIndex" | "opacity" | "colors" | "fonts" | "fontSizes" | "fontWeights" | "lineHeights" | "letterSpacings" | "sizes" | "shadows" | "spacing" | "radii" | "borders" | "durations" | "easings" | "animations" | "blurs" | "gradients" | "breakpoints" | "assets"