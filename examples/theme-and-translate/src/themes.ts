import * as colors from '@sanity/color'
import {buildTheme} from '@sanity/ui/theme'

// "Theme the components" > "Change the Sanity UI theme". Each theme is built
// once, outside render; the picker only chooses between them.

// No config: Sanity UI's own look.
const defaultTheme = buildTheme()

// "Use a brand palette": the primary tone uses `blue`, so swap the ramp.
// "Increase corner radius and spacing": indexed by the numbers the components
// pass to Sanity UI.
const brand = buildTheme({
  palette: {...colors, blue: colors.purple},
  radius: [0, 3, 6, 10, 14, 18, 24],
  space: [0, 5, 10, 15, 24, 36, 56, 88, 140, 220],
})

// A built theme carries its full config under `v2`. Spreading it keeps every
// default the playful theme does not change.
const base = defaultTheme.v2
if (!base) throw new Error('Expected a v2 theme from buildTheme()')

// The same theme config, pushed further. Every hue is swapped for a louder
// one: primary is magenta, neutrals are tinted purple, positive is cyan and
// caution is orange. Borders are 2px and a few tints darker, corners are
// round and button text is bold. Each ramp still runs light to dark, so both
// schemes keep their contrast.
const playful = buildTheme({
  palette: {
    ...colors,
    gray: colors.purple,
    blue: colors.magenta,
    purple: colors.blue,
    green: colors.cyan,
    yellow: colors.orange,
  },
  radius: [0, 6, 10, 16, 22, 28, 36],
  space: [0, 5, 10, 15, 24, 36, 56, 88, 140, 220],
  button: {
    ...base.button,
    border: {width: 2},
    focusRing: {offset: 1, width: 2},
    textWeight: 'bold',
  },
  card: {
    ...base.card,
    border: {width: 2},
    focusRing: {offset: 1, width: 2},
  },
  input: {...base.input, border: {width: 2}},
  // Color tokens merge into the defaults. Each pair is [light, dark], as
  // tints of the tone's hue.
  color: {
    base: {'*': {border: ['300', '700']}},
    button: {default: {primary: {enabled: {bg: ['600', '400']}}}},
    input: {'*': {'*': {border: ['400', '600']}}},
  },
})

export const themes = {default: defaultTheme, brand, playful}

export type ThemeKey = keyof typeof themes
