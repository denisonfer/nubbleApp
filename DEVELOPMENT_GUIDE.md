# NubbleApp - Development Guide

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Folder Structure](#folder-structure)
- [Data Flow](#data-flow)
- [Creating a New Domain](#creating-a-new-domain)
- [Creating a New Screen](#creating-a-new-screen)
- [Naming Conventions](#naming-conventions)
- [TypeScript Rules](#typescript-rules)
- [Styling with Restyle](#styling-with-restyle)
- [Forms: React Hook Form + Zod](#forms-react-hook-form--zod)
- [State Management](#state-management)
- [Navigation](#navigation)
- [Performance Rules](#performance-rules)
- [Testing Standards](#testing-standards)
- [Import Aliases](#import-aliases)
- [Code Review Checklist](#code-review-checklist)
- [Things to Avoid](#things-to-avoid)

---

## Architecture Overview

NubbleApp follows a **Domain-Driven Design (DDD)** with a **clean layered architecture**. Every feature is self-contained inside a domain folder, and data flows through well-defined layers.

### Tech Stack

| Layer          | Technology                      |
| -------------- | ------------------------------- |
| Framework      | React Native 0.76 + Expo 52    |
| Language       | TypeScript (strict mode)        |
| Navigation     | React Navigation 7             |
| Server State   | TanStack Query 5 (React Query) |
| Client State   | Zustand 5 + MMKV               |
| Styling        | Restyle 2.4 (Shopify)          |
| Forms          | React Hook Form + Zod           |
| HTTP Client    | Axios                           |
| Testing        | Jest + RNTL + MSW               |

---

## Folder Structure

```
src/
├── api/                # Axios instance, interceptors, adapters, types
├── assets/             # Icons (SVG), images, fonts, brand assets
├── components/         # Shared/reusable UI components
├── domains/            # Feature domains (Auth, Post, PostComments, User)
├── hooks/              # App-level custom hooks
├── infra/              # Query keys enum, pagination hook, shared infra
├── routes/             # Navigation stacks, types, and hooks
├── screens/            # Screen components organized by stack
│   ├── app/            # Authenticated screens (Home, Profile, Settings...)
│   ├── auth/           # Login, SignUp, ForgotPassword
│   └── onboarding/     # First-time user walkthrough
├── services/           # Business logic services (multimedia, search, settings)
├── stores/             # Zustand global stores (auth, toast, settings)
├── test/               # Test utilities, MSW server, mocks
├── theme/              # Restyle theme, colors, dark/light mode
├── types/              # Global TypeScript types
└── utils/              # Utility functions
```

---

## Data Flow

Every data operation follows this chain:

```
Screen → UseCase (hook) → Service → Adapter → API → Axios
```

| Layer       | File Pattern        | Responsibility                                    |
| ----------- | ------------------- | ------------------------------------------------- |
| **API**     | `*Api.ts`           | Raw HTTP calls using Axios                        |
| **Adapter** | `*Adapter.ts`       | Transforms API response into the app model        |
| **Service** | `*Services.ts`      | Orchestrates API call + adapter transformation    |
| **UseCase** | `useCases/use*.ts`  | React Query hook (query or mutation)              |
| **Screen**  | `*Screen.tsx`       | Consumes the hook and renders UI                  |

### Example: Fetching Posts

```
HomeScreen
  → usePostList()                          # UseCase hook
    → usePaginatedList(key, getList)       # Infra pagination hook
      → postServices.getList({ page })     # Service
        → postApi.getList({ page })        # API (axios GET /user/post)
        → postAdapter.toPostList(data)     # Adapter (IPostListApi → TPost)
```

---

## Creating a New Domain

Each domain lives in `src/domains/` with this structure:

```
src/domains/MyFeature/
├── myFeatureApi.ts          # Raw HTTP calls
├── myFeatureAdapter.ts      # API model → App model
├── myFeatureServices.ts     # Business logic
├── types.ts                 # TypeScript types (API interfaces + App types)
├── useCases/
│   ├── useMyFeatureList.ts  # Query hook (GET)
│   └── useMyFeatureCreate.ts # Mutation hook (POST)
└── index.ts                 # Public exports
```

### Step 1: Define Types (`types.ts`)

```ts
// API response shape (matches backend JSON)
export interface IMyFeatureApi {
  id: number;
  title: string;
  created_at: string;
}

// App model (what screens consume)
export type TMyFeature = {
  id: string;
  title: string;
  createdAt: string;
};
```

### Step 2: Create API Layer (`myFeatureApi.ts`)

```ts
import { api, IApiPaginated, IPageParams } from '@api';
import { IMyFeatureApi } from './types';

async function getList(
  params?: IPageParams,
): Promise<IApiPaginated<IMyFeatureApi>> {
  const response = await api.get<IApiPaginated<IMyFeatureApi>>(
    '/my-feature',
    { params },
  );
  return response.data;
}

export const myFeatureApi = { getList };
```

### Step 3: Create Adapter (`myFeatureAdapter.ts`)

```ts
import { IMyFeatureApi, TMyFeature } from './types';

function toMyFeature(api: IMyFeatureApi): TMyFeature {
  return {
    id: api.id.toString(),
    title: api.title,
    createdAt: api.created_at,
  };
}

export const myFeatureAdapter = { toMyFeature };
```

### Step 4: Create Service (`myFeatureServices.ts`)

```ts
import { apiAdapter } from '@api';
import { TPagination } from '@types';
import { myFeatureAdapter } from './myFeatureAdapter';
import { myFeatureApi } from './myFeatureApi';
import { TMyFeature } from './types';

async function getList({
  page,
}: {
  page: number;
}): Promise<TPagination<TMyFeature>> {
  const response = await myFeatureApi.getList({ page, per_page: 10 });
  return apiAdapter.toPageModel(response, myFeatureAdapter.toMyFeature);
}

export const myFeatureServices = { getList };
```

### Step 5: Create UseCase Hook (`useCases/useMyFeatureList.ts`)

```ts
import { EQueryKeys, usePaginatedList } from '@infra';
import { myFeatureServices } from '../myFeatureServices';

export function useMyFeatureList() {
  return usePaginatedList(
    [EQueryKeys.UseMyFeatureList],
    myFeatureServices.getList,
  );
}
```

### Step 6: Add Query Key (`src/infra/infraTypes.ts`)

```ts
export enum EQueryKeys {
  // ... existing keys
  UseMyFeatureList = 'UseMyFeatureList',
}
```

### Step 7: Export from Domain Index (`index.ts`)

```ts
export * from './myFeatureServices';
export * from './types';
export * from './useCases/useMyFeatureList';
```

Then add the export to `src/domains/index.ts`:

```ts
export * from './MyFeature';
```

---

## Creating a New Screen

### Step 1: Create the Screen Folder

```
src/screens/app/MyFeatureScreen/
├── MyFeatureScreen.tsx
├── components/              # Screen-specific sub-components
│   └── MyFeatureHeader.tsx
└── __tests__/
    └── MyFeatureScreen.test.tsx
```

### Step 2: Build the Screen Component

```tsx
import React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { Screen, Text } from '@components';
import { TAppScreenProps } from '@routes';
import { TMyFeature, useMyFeatureList } from '@domains';

export function MyFeatureScreen({
  navigation,
}: TAppScreenProps<'MyFeatureScreen'>) {
  const { list, isLoading, fetchNextPage } = useMyFeatureList();

  function renderItem({ item }: ListRenderItemInfo<TMyFeature>) {
    return <Text>{item.title}</Text>;
  }

  return (
    <Screen canGoBack title="My Feature">
      <FlatList
        data={list}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        onEndReached={fetchNextPage}
        onEndReachedThreshold={0.5}
      />
    </Screen>
  );
}
```

### Step 3: Register Navigation Route

**3a. Add to type definitions** (`src/routes/navigationType.ts`):

```ts
export type TAppStackParamList = {
  // ... existing screens
  MyFeatureScreen: undefined; // or { id: string } if it needs params
};
```

**3b. Add to the stack** (`src/routes/AppStack.tsx`):

```tsx
<Stack.Screen name="MyFeatureScreen" component={MyFeatureScreen} />
```

### Step 4: Write Tests

```tsx
import { renderScreen, screen } from 'test-utils';
import { MyFeatureScreen } from '../MyFeatureScreen';

describe('<MyFeatureScreen />', () => {
  it('should render the screen title', () => {
    renderScreen(
      <MyFeatureScreen navigation={{} as any} route={{} as any} />,
    );
    expect(screen.getByText('My Feature')).toBeTruthy();
  });
});
```

---

## Naming Conventions

| Element               | Convention           | Example                              |
| --------------------- | -------------------- | ------------------------------------ |
| Variables & functions | camelCase            | `isFetchingData`, `handleUserInput`  |
| Components            | PascalCase           | `UserProfile`, `ChatScreen`          |
| Types                 | PascalCase + `T`     | `TPost`, `TUser`, `TAuth`           |
| Interfaces (API)      | PascalCase + `I`     | `IPostListApi`, `IMetaApi`           |
| Enums                 | PascalCase + `E`     | `EQueryKeys`, `EUserRole`            |
| Constants             | SCREAMING_SNAKE_CASE | `MAX_RETRY_COUNT`, `BASE_URL`        |
| Files (components)    | PascalCase           | `UserCard.tsx`, `PostItem.tsx`       |
| Files (hooks)         | camelCase            | `useAuth.ts`, `useAppDebounce.ts`    |
| Files (utils)         | camelCase            | `formatDate.ts`, `stringUtils.ts`    |
| Files (domain layers) | camelCase            | `postApi.ts`, `postAdapter.ts`       |
| Test files            | camelCase + suffix   | `Button.test.tsx`, `useAuth.spec.ts` |

### Type Prefixes Used in This Project

| Prefix | Meaning          | Example                        |
| ------ | ---------------- | ------------------------------ |
| `T`    | Type             | `TPost`, `TUser`, `TTheme`     |
| `I`    | Interface (API)  | `IPostListApi`, `IAuthApi`     |
| `E`    | Enum             | `EQueryKeys`                   |

---

## TypeScript Rules

- **Prefer `type` over `interface`** for data shapes
- **Use `interface`** only for API response contracts or extensible objects
- **Use `enum`** for finite sets of named constants
- **Enable strict mode** in `tsconfig.json` — never disable it
- **Never use `any`** — use `unknown` and narrow it
- **Use type inference** — don't annotate unnecessarily

```ts
// Good
type TUser = {
  id: string;
  name: string;
  role: EUserRole;
};

enum EUserRole {
  Admin = 'ADMIN',
  Member = 'MEMBER',
}

// Bad
const user: any = fetchUser();
```

---

## Styling with Restyle

### Theme Tokens

All styling uses tokens from the Restyle theme. Never hardcode values.

**Spacing scale:**

| Token   | Value |
| ------- | ----- |
| `spc0`  | 0     |
| `spc4`  | 4     |
| `spc8`  | 8     |
| `spc10` | 10    |
| `spc12` | 12    |
| `spc14` | 14    |
| `spc16` | 16    |
| `spc20` | 20    |
| `spc24` | 24    |
| `spc32` | 32    |
| `spc40` | 40    |
| `spc48` | 48    |
| `spc56` | 56    |
| `spc64` | 64    |

**Border radii:** `br8`, `br12`, `br16`

**Text presets:** `headingLarge` (32px), `headingMedium` (22px), `headingSmall` (18px), `paragraphLarge` (18px), `paragraphMedium` (16px), `paragraphSmall` (14px), `captionMedium` (12px), `captionSmall` (10px)

### Using Restyle Components

```tsx
// Use Box instead of View
<Box paddingHorizontal="spc24" marginBottom="spc16" backgroundColor="background">
  <Text preset="headingLarge" color="primary" mb="spc8">
    Title
  </Text>
</Box>

// Use TouchableOpacityBox for pressable elements
<TouchableOpacityBox
  onPress={handlePress}
  padding="spc12"
  borderRadius="br8"
  backgroundColor="primary"
>
  <Text color="primaryContrast">Press me</Text>
</TouchableOpacityBox>
```

### Rules

- Never use inline style objects — use Restyle props or `StyleSheet.create()`
- Never hardcode colors — use theme color tokens
- Never hardcode spacing — use theme spacing tokens
- Support dark mode — both `theme` and `darkTheme` are available

---

## Forms: React Hook Form + Zod

### Step 1: Define the Schema

```ts
import { z } from 'zod';

export const myFormSchema = z.object({
  name: z.string().min(3, 'Name must have at least 3 characters'),
  email: z.string().email('Invalid email'),
});

export type TMyForm = z.infer<typeof myFormSchema>;
```

### Step 2: Use in the Screen

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput, Button, Screen } from '@components';
import { myFormSchema, TMyForm } from './myFormSchema';

export function MyFormScreen() {
  const { control, handleSubmit, formState } = useForm<TMyForm>({
    resolver: zodResolver(myFormSchema),
    defaultValues: { name: '', email: '' },
    mode: 'onChange',
  });

  function submitForm(data: TMyForm) {
    // handle submission
  }

  return (
    <Screen canGoBack title="My Form">
      <FormInput
        name="name"
        control={control}
        label="Name"
        placeholder="Enter your name"
        boxProps={{ mb: 'spc16' }}
      />
      <FormInput
        name="email"
        control={control}
        label="Email"
        placeholder="Enter your email"
        boxProps={{ mb: 'spc16' }}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Button
        title="Submit"
        onPress={handleSubmit(submitForm)}
        disabled={!formState.isValid}
      />
    </Screen>
  );
}
```

---

## State Management

### Server State: TanStack Query (React Query)

Used for all data that comes from the API.

```ts
// Query (GET) — use usePaginatedList for lists
export function useMyList() {
  return usePaginatedList([EQueryKeys.MyList], myServices.getList);
}

// Mutation (POST/PUT/DELETE)
export function useMyCreate(options?: TMutationProps<TMyModel>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: myServices.create,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: [EQueryKeys.MyList] });
      options?.onSuccess?.(data);
    },
    onError: options?.onError,
  });
}
```

### Client State: Zustand

Used for global app state (auth, settings, toasts).

```ts
// Stores live in src/stores/
// Persisted with MMKV storage

// Reading from a store
const { authCredentials } = useAuthCredentialsStore();

// Using toast
const { showToast } = useToastServices();
showToast({ type: 'success', message: 'Done!', position: 'top' });
```

### When to Use What

| Data Source     | Tool                    |
| --------------- | ----------------------- |
| API data        | TanStack Query          |
| Auth state      | Zustand (persisted)     |
| App settings    | Zustand (persisted)     |
| Toast messages  | Zustand (in-memory)     |
| Form state      | React Hook Form         |
| Local UI state  | `useState` / `useReducer` |

---

## Navigation

### Stack Structure

```
useRouter() decides which stack:
├── LoadingStack    → Splash screen (store hydration)
├── OnboardingStack → First-time walkthrough
├── AuthStack       → Login, SignUp, ForgotPassword
└── AppStack        → Main app
     ├── AppBottomTab (Home, NewPost, Favorites, MyProfile)
     └── Modal Screens (PostComment, Profile, Search, Settings...)
```

### Type-Safe Navigation

```ts
// Define params in navigationType.ts
export type TAppStackParamList = {
  HomeScreen: undefined;
  ProfileScreen: { userId: string };
};

// Screen receives typed props
export function ProfileScreen({
  route,
  navigation,
}: TAppScreenProps<'ProfileScreen'>) {
  const { userId } = route.params;
}

// Navigate with type safety
navigation.navigate('ProfileScreen', { userId: '123' });
```

---

## Performance Rules

1. **Never pass anonymous functions as props** — use `useCallback`
2. **Memoize pure components** — use `React.memo()`
3. **Memoize expensive computations** — use `useMemo`
4. **FlatList must have:** `keyExtractor`, `removeClippedSubviews`, `maxToRenderPerBatch`, `windowSize`, `initialNumToRender`
5. **No inline styles** — use Restyle props or `StyleSheet.create()`
6. **Keep state local** — lift only when necessary

```tsx
// Good
const renderItem = useCallback(
  ({ item }: { item: TPost }) => <PostItem post={item} />,
  [],
);

// Bad
<FlatList renderItem={({ item }) => <PostItem post={item} />} />
```

---

## Testing Standards

### Tools

| Tool | Purpose                          |
| ---- | -------------------------------- |
| Jest | Test runner                      |
| RNTL | Component rendering and queries  |
| MSW  | API mocking (integration tests)  |

### Custom Utilities (`src/test/test-utils.tsx`)

| Utility         | Use Case                                  |
| --------------- | ----------------------------------------- |
| `render()`      | Renders component with all providers      |
| `renderHook()`  | Tests custom hooks with providers         |
| `renderScreen()` | Renders screen with navigation context   |

### Test Naming

```ts
// Good — behavior-driven, descriptive
it('should display error message when login fails', () => {});
it('should show loading indicator while fetching data', () => {});
it('should disable button when form is invalid', () => {});

// Bad
it('test error', () => {});
it('works', () => {});
```

### Query Preference

```ts
// Prefer (accessible queries)
screen.getByText('Submit');
screen.getByRole('button');

// Avoid (use only when no accessible alternative)
screen.getByTestId('submit-button');
```

### Example: Component Test

```tsx
import { fireEvent, render, screen } from '@test';
import { Button } from '../Button';

describe('<Button />', () => {
  it('should call onPress when pressed', () => {
    const onPress = jest.fn();
    render(<Button title="Save" onPress={onPress} />);

    fireEvent.press(screen.getByText('Save'));
    expect(onPress).toHaveBeenCalled();
  });

  it('should not call onPress when disabled', () => {
    const onPress = jest.fn();
    render(<Button title="Save" onPress={onPress} disabled />);

    fireEvent.press(screen.getByText('Save'));
    expect(onPress).not.toHaveBeenCalled();
  });
});
```

### Example: Hook Test

```ts
import { renderHook, waitFor } from 'test-utils';
import { useMyHook } from '../useMyHook';

describe('useMyHook', () => {
  it('should return data after fetching', async () => {
    const { result } = renderHook(() => useMyHook());

    await waitFor(() => expect(result.current.list).toHaveLength(2));
  });
});
```

### Example: Integration Test (with MSW)

```tsx
import { server } from '@test';
import { renderScreen, screen } from 'test-utils';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('integration: MyScreen', () => {
  it('should render items from API', async () => {
    renderScreen(<MyScreen navigation={{} as any} route={{} as any} />);

    const item = await screen.findByText(/expected text/i);
    expect(item).toBeTruthy();
  });
});
```

---

## Import Aliases

All imports use `@` aliases. Never use relative paths like `../../../`.

| Alias            | Path               |
| ---------------- | ------------------ |
| `@components`    | `src/components`   |
| `@hooks`         | `src/hooks`        |
| `@routes`        | `src/routes`       |
| `@screens`       | `src/screens`      |
| `@domains`       | `src/domains`      |
| `@api`           | `src/api`          |
| `@stores`        | `src/stores`       |
| `@services`      | `src/services`     |
| `@theme`         | `src/theme`        |
| `@infra`         | `src/infra`        |
| `@types`         | `src/types`        |
| `@utils`         | `src/utils`        |
| `@test`          | `src/test`         |
| `@assets/icons`  | `src/assets/icons` |
| `@assets/brand`  | `src/assets/brand` |

```ts
// Good
import { Button, Screen, Text } from '@components';
import { usePostList, TPost } from '@domains';
import { useAuth } from '@hooks';

// Bad
import { Button } from '../../../components/Button/Button';
```

---

## Code Review Checklist

Before submitting any code change, verify:

- [ ] TypeScript strict compliance — no `any`, no type suppression
- [ ] Component has a single, clear responsibility
- [ ] No anonymous functions passed as props
- [ ] Styles use Restyle props or `StyleSheet.create()` — no inline objects
- [ ] All side effects in `useEffect` with proper cleanup
- [ ] Meaningful variable and function names
- [ ] Tests written or updated for the changed behavior
- [ ] No hardcoded colors, spacing, or magic numbers
- [ ] Imports use `@` aliases, not relative paths
- [ ] New domain follows the Api → Adapter → Service → UseCase pattern
- [ ] New screen registered in navigation types and stack
- [ ] Query key added to `EQueryKeys` if fetching new data

---

## Things to Avoid

| Do Not                                    | Do Instead                                    |
| ----------------------------------------- | --------------------------------------------- |
| Use `any` type                            | Use `unknown` + type narrowing                |
| Write class components                    | Use functional components with hooks          |
| Pass anonymous functions as props         | Use `useCallback`                             |
| Hardcode strings for UI text              | Use i18n keys or constants                    |
| Mutate state directly                     | Create new references (spread, map, filter)   |
| Nest components deeply                    | Extract sub-components                        |
| Skip error boundaries on critical screens | Wrap with error boundaries                    |
| Use inline styles                         | Use Restyle props or `StyleSheet.create()`    |
| Import with relative paths               | Use `@` aliases                               |
| Put business logic in screens             | Use the Service + UseCase layer               |
