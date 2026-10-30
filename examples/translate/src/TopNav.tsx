import {Card, Flex, Label, Select, Text} from '@sanity/ui'

import {type LanguageKey, languages} from './labels'

export function TopNav({
  languageKey,
  onLanguageChange,
}: {
  languageKey: LanguageKey
  onLanguageChange: (key: LanguageKey) => void
}) {
  const {app} = languages[languageKey]

  return (
    <Card as="nav" borderBottom paddingX={4} paddingY={3}>
      <Flex align="center" gap={4} wrap="wrap">
        <Text size={2} weight="semibold">
          {app.title}
        </Text>

        <Flex align="center" flex={1} gap={2} justify="flex-end">
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
      </Flex>
    </Card>
  )
}
