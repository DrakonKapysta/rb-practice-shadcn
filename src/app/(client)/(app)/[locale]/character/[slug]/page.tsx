'use cache'

import type { Metadata } from 'next'

import { cacheLife } from 'next/cache'
import { setRequestLocale } from 'next-intl/server'
import { FC } from 'react'

import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

import { characterByIdQueryOptions, getCharacterById, getCharacters } from '@/app/(client)/entities/api'
import { CharacterModule } from '@/app/(client)/modules/character'
import { getQueryClient } from '@/pkg/libraries/rest-api'
import { routing } from '@/pkg/libraries/locale'

interface IProps extends PageProps<'/[locale]/character/[slug]'> {}

export async function generateStaticParams() {
  const characters = await getCharacters()

  const res = characters.results.map((character) => ({
    slug: character.id.toString(),
  }))

  return res
}

export const generateMetadata = async (props: IProps): Promise<Metadata> => {
  const { locale, slug } = await props.params
  const characterId = parseInt(slug)
  const siteUrl = process.env.NEXT_PUBLIC_CLIENT_WEB_URL || 'https://example.com'
  const alternateLocales = routing.locales.filter((loc) => loc !== locale)
  const url = `${siteUrl}/${locale}/character/${slug}`

  try {
    const character = await getCharacterById(characterId)
    const description = `${character.name} is a ${character.status.toLowerCase()} ${character.species}${character.type ? ` (${character.type})` : ''}. ${character.gender !== 'unknown' ? `Gender: ${character.gender}.` : ''} ${character.origin.name !== 'unknown' ? `Origin: ${character.origin.name}.` : ''} Explore detailed information, episodes, and comments.`

    return {
      title: character.name,
      description,
      keywords: [character.name, character.status, character.species, 'character', 'details'],
      openGraph: {
        type: 'article',
        locale,
        alternateLocale: alternateLocales,
        url,
        siteName: 'Character Database',
        title: character.name,
        description,
        images: [
          {
            url: character.image,
            width: 1200,
            height: 630,
            alt: character.name,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: character.name,
        description,
        images: [character.image],
      },
      alternates: {
        canonical: url,
        languages: Object.fromEntries(routing.locales.map((loc) => [loc, `${siteUrl}/${loc}/character/${slug}`])),
      },
    }
  } catch (error) {
    // Fallback metadata if character not found
    return {
      title: 'Character Not Found',
      description: 'The character you are looking for does not exist.',
      openGraph: {
        type: 'website',
        locale,
        alternateLocale: alternateLocales,
        url,
        siteName: 'Character Database',
        title: 'Character Not Found',
        description: 'The character you are looking for does not exist.',
      },
      twitter: {
        card: 'summary',
        title: 'Character Not Found',
        description: 'The character you are looking for does not exist.',
      },
    }
  }
}

const Page: FC<Readonly<IProps>> = async (props) => {
  cacheLife('minutes')

  const { locale } = await props.params

  setRequestLocale(locale)

  const characterId = parseInt((await props.params).slug)

  const queryClient = getQueryClient()

  await queryClient.prefetchQuery(characterByIdQueryOptions(characterId))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CharacterModule characterId={characterId} />
    </HydrationBoundary>
  )
}

export default Page
