import * as colors from '@sanity/color'
import {buildTheme} from '@sanity/ui/theme'

// "Theme the components" > "Change the Sanity UI theme". Built once, outside
// render.

// "Use a brand palette": the primary tone uses `blue`, so swap the ramp.
// "Increase corner radius and spacing": indexed by the numbers the components
// pass to Sanity UI.
export const theme = buildTheme({
  palette: {...colors, blue: colors.purple},
  radius: [0, 3, 6, 10, 14, 18, 24],
  space: [0, 5, 10, 15, 24, 36, 56, 88, 140, 220],
})
