# Swipe-flix

## Development

pre requisites:

- Node (LTS)
- Yarn (LTS)
- expo-cli (LTS)

Install pre requisites [macOS]:

```sh
brew install node yarn;
yarn global add expo-cli;
```

Install packages:

```sh
yarn
```

Start dev server:

```sh
yarn start
```

## Backlog

- [ ] Setup expo
  - [x] install NativeBase
  - [ ] install expo-location
  - [ ] install expo-notifications
- [ ] Setup Supabase
  - [ ] construct tables
  - [ ] configure OAuth
- [ ] Setup up Deta.sh proxy for webhooks / cloud functions (?)

## Rough architecture plan

- Backend:
    - Supabase.io
      - Provides social OAuth, database, realtime db, storage
    - Deta.sh
      - provides cloud functions (?)
- Frontend:
    - [Expo.dev](https://expo.dev)
      - Provides niceities to React Native
    - NativeBase.io
      - Provides mobile friendly UI components to Expo