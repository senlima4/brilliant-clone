# brilliant clone

just try to write a very little mvp thing. not really need to clone the target.

It just bunch of boring CRUD. Just find some little time to write it. Not really want to waste too much time on it. That's it.

## Stack

nextjs
prisma
next-auth
typescript
react-query
chakra-ui
monaco-editor

## Structure

+- src/
+-+- api/ - client api caller
+-+-+-+- hooks/ - react query hooks
+-+-+-+- fetcher.ts - client fetcher
+-+-+-+- instance.ts - axios
+-+-+-+- types.ts - types
+-+- domain/ - feature || style modules
+-+- libs/
+-+- pages/ - nextjs pages
+-+- services/ - service for api implementation
+-+- constants.ts - share constants
+-+- middleware.ts - nextjs middleware

## Setup

Only setup two thing then you should able to run that at local

1. Github OAuth App
2. PlanetScale(or you can just start a mysql with docker compose)

## Maybe

If you try to make some implement question at interview:

| question                                         | level  | memo                                                    |
| ------------------------------------------------ | ------ | ------------------------------------------------------- |
| Display course & unit that is public status.     | low    | If you can not. You fucked                              |
| Test form with jest & react-testing-library      | low    | If you can not. You fucked                              |
| Test flow with cypress                           | low    | Actually next-auth part is a little bit tricky          |
| Try to write description of one of the user flow | low    | Don't be a fucking idiot PM is not that hard            |
| Question form feature                            | medium | Sort the logic between react & generated MDX            |
| Store mdx at AWS S3 not mysql                    | medium | Seems hard. Actually very simple once you figure it out |
| Don't use next-auth as user service.             | hard   | Design auth system and refactor with elegant way        |
