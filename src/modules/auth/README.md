# Authentication Module

This module provides authentication functionality using TanStack Query for state management and API calls.

## Features

- Login with username/password
- Automatic token refresh
- Logout functionality
- Route guards
- Persistent authentication state via cookies

## Usage

### Login

```vue
<template>
  <form @submit.prevent="handleLogin">
    <input v-model="username" placeholder="Username" />
    <input v-model="password" type="password" placeholder="Password" />
    <button type="submit" :disabled="isLoggingIn()">Login</button>
  </form>
</template>

<script setup>
import { useAuth } from "@/modules/auth";

const { login, isLoggingIn } = useAuth();

const username = ref("");
const password = ref("");

const handleLogin = () => {
  login({
    username: username.value,
    password: password.value,
  });
};
</script>
```

### Logout

```vue
<template>
  <button @click="logout">Logout</button>
</template>

<script setup>
import { useAuth } from "@/modules/auth";

const { logout } = useAuth();
</script>
```

### Check Authentication Status

```vue
<script setup>
import { useAuth } from "@/modules/auth";

const { isAuthenticated } = useAuth();

// Check if user is authenticated
if (isAuthenticated()) {
  // User is logged in
}
</script>
```

### Get User Profile

```vue
<template>
  <div v-if="userLoading()">Loading...</div>
  <div v-else-if="user()">
    <h2>Welcome, {{ user().name }}!</h2>
    <p>Role: {{ user().role }}</p>
    <p>Last login: {{ user().last_login }}</p>
  </div>
</template>

<script setup>
import { useAuth } from "@/modules/auth";

const { user, userLoading, userError } = useAuth();
</script>
```

## API Endpoints

- `POST /auth/token/` - Login endpoint
- `POST /auth/token/refresh/` - Refresh token endpoint
- `POST /auth/logout/` - Logout endpoint
- `GET /users/current/` - Get current user profile

## Configuration

The authentication system uses cookies to persist tokens:

- `__access_token` - JWT access token
- `__refresh_token` - JWT refresh token

Tokens are automatically included in API requests via axios interceptors.
