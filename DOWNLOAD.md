# The Android download

The Download page's Android badge hands over a file, not a store listing. This
is where that file comes from and how to replace it.

## Where it lives

| | |
|---|---|
| the link | `site.androidApk` in `src/data/site.ts` → `/download/xelvic.apk` |
| the file | `public/download/xelvic.apk` |
| served at | `https://xelvic.com/download/xelvic.apk` |
| on the box | `/srv/xelvic-site/download/xelvic.apk` |

`npm run build` copies `public/` into `dist/`, so the APK ships with the site on
the ordinary [ship_site.sh](../gg%20pages/tools/ship_site.sh) road — there is no
second upload step.

nginx serves `.apk` as `application/vnd.android.package-archive` out of its own
`mime.types`, which is what makes the phone offer to install it instead of
showing it as text. Nothing had to be added to the vhost for that.

## Bringing a fresh build in

Build the app by its own rules — `tools/ship_android.sh --live`, never
`flutter build apk` by hand — then copy the artifact across:

```sh
cp "$HOME/projects/gg pages/app/build/app/outputs/flutter-apk/app-release.apk" \
   public/download/xelvic.apk
shasum -a 256 public/download/xelvic.apk
```

Then build and ship the site as usual:

```sh
npm run build
"$HOME/projects/gg pages/tools/ship_site.sh"
```

And check the bytes that actually came out the far end, because a download page
that 404s is the one failure nobody reports:

```sh
curl -sI https://xelvic.com/download/xelvic.apk | head -3
curl -sI https://xelvic.com/download/xelvic.apk | grep -i content-length
```

The `content-length` must equal the local `stat -f%z`. If it is smaller, the
upload truncated — nothing else on this path fails that quietly.

Replacing the file needs no cache purge, and that is deliberate: the vhost
answers `/download/xelvic.apk` with `Cache-Control: no-cache`, so a browser
revalidates against the `etag` and gets a `304` rather than serving a copy of
last week's build. Cloudflare's zone-wide Browser Cache TTL is four hours and
would have rewritten any `max-age` this file asked for; `no-cache` is the one
directive it leaves alone. So the new bytes are what the next visitor gets,
immediately, with no button to press anywhere.

## Why the file is not in git

`.gitignore` keeps `public/download/*.apk` and `dist/download/*.apk` out.
`dist/` **is** committed in this repository, and that is right for built pages:
they are text, they diff, a deploy can be read before it goes. A 73 MB binary
is the opposite of every one of those — it cannot be reviewed, and committing it
would copy another 73 MB into the history on every release, for ever, to say
nothing of what it does to a clone.

So the file is the one artifact on this site that is deployed but not tracked.
That is a deliberate trade, and the cost of it is the sentence above: **a fresh
APK is a manual copy.** If that ever gets forgotten, the site keeps serving the
previous build — which installs, and works, and is simply not the build anyone
thinks it is. The `content-length` check is how you catch that, so compare it
against the APK's own size and not against the last one you remember.

## The two badges are not the same kind of thing

The Apple badge on the same page is still `href="#"` — there is no App Store
listing, so it is a button that does nothing. It has been left as it is because
that is a copy decision rather than a plumbing one: naming a store that does not
exist is worse than a badge that is quietly dead, and the honest fix is either
an iOS build to hand out (TestFlight, most likely) or a badge that says
"coming soon". Neither is a one-line change, so neither was made here.
