/**
 * Array of routes exposed to the public
 * Routes do not require authentication
 * @type {string[]}
 */

export const publicRoutes = [
    "/"
]


/**
 * Array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = [
    "/login",
    "register"
]

/**
 * Prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth"

/**
 * Default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings"