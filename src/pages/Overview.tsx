/**
 * Explore and Overview are one page now — the feed, the chats, the stories and
 * every feature in a single tour. `/overview` redirects to `/explore` in the
 * router; this re-export only keeps a stale import path resolving to the real
 * page instead of a second copy that could drift out of date.
 */
export { default } from './Explore'
