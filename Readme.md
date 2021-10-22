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

- [ ] Setup kanban board
- [x] Setup expo
  - [x] install NativeBase
  - [x] install expo-location
  - [x] install expo-notifications
- [ ] Setup Supabase
  - [ ] construct tables
  - [ ] configure OAuth
  - [ ] Fix environment variables for supabase
- [ ] Setup up Deta.sh proxy for webhooks / cloud functions (?)
- [ ] Connect Supabase to Expo
- [ ] Build wireframe
  - [ ] Swipe view
  - [ ] Question view (?) [maybe integrated as campaign]
  - [ ] Login view
  - [ ] Register view
  - [ ] Config Profile view
    - [ ] Settings
    - [ ] Privacy (?)
    - [ ] Edit profile
  - [ ] User detail view
  - [ ] Explore view (Movies / Series / Cinema)
  - [ ] Matches view
  - [ ] Chat view
- [ ] Build popovers / modals
  - [ ] Welcome
  - [ ] Campaign

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