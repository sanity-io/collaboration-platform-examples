import {Button, Card, Flex, Label, Select, Text} from '@sanity/ui'

import {type LanguageKey, languages} from './labels'
import {type ThemeKey, themes} from './themes'

export function TopNav({
  themeKey,
  onThemeChange,
  languageKey,
  onLanguageChange,
  scheme,
  onSchemeChange,
}: {
  themeKey: ThemeKey
  onThemeChange: (key: ThemeKey) => void
  languageKey: LanguageKey
  onLanguageChange: (key: LanguageKey) => void
  scheme: 'light' | 'dark'
  onSchemeChange: (scheme: 'light' | 'dark') => void
}) {
  const {app} = languages[languageKey]

  return (
    <Card as="nav" borderBottom paddingX={4} paddingY={3}>
      <Flex align="center" gap={4} wrap="wrap">
        <Text size={2} weight="semibold">
          {app.title}
        </Text>

        <Flex align="center" flex={1} gap={4} justify="flex-end" wrap="wrap">
          <Flex align="center" gap={2}>
            <Label as="label" htmlFor="theme-select" muted size={1}>
              {app.theme}
            </Label>
            <Select
              id="theme-select"
              fontSize={1}
              padding={2}
              value={themeKey}
              onChange={(event) =>
                onThemeChange(event.currentTarget.value as ThemeKey)
              }
            >
              {Object.keys(themes).map((key) => (
                <option key={key} value={key}>
                  {app.themes[key as ThemeKey]}
                </option>
              ))}
            </Select>
          </Flex>

          <Flex align="center" gap={2}>
            <Label as="label" htmlFor="language-select" muted size={1}>
              {app.language}
            </Label>
            <Select
              id="language-select"
              fontSize={1}
              padding={2}
              value={languageKey}
              onChange={(event) =>
                onLanguageChange(event.currentTarget.value as LanguageKey)
              }
            >
              {Object.entries(languages).map(([key, language]) => (
                <option key={key} value={key}>
                  {language.name}
                </option>
              ))}
            </Select>
          </Flex>

          <Button
            fontSize={1}
            mode="ghost"
            padding={2}
            text={scheme === 'light' ? app.darkMode : app.lightMode}
            onClick={() =>
              onSchemeChange(scheme === 'light' ? 'dark' : 'light')
            }
          />
        </Flex>
      </Flex>
    </Card>
  )
}
