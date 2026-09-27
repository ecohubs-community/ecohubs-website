# Record of processing activities (RAT)

Internal record under Ecuador's LOPDP. Keep in step with the public page `src/routes/(web)/privacy/+page.svelte` and its `data.ts`: every data category and retention period there must appear here, and the reverse.

- **Controller:** EcoHubs.community, based in Ecuador
- **Contact:** privacy@ecohubs.community
- **DPO:** none designated (see open points)
- **Last reviewed:** 2026-09-27

## Infrastructure

| Component                                        | Provider                                | Location             |
| ------------------------------------------------ | --------------------------------------- | -------------------- |
| Website (SvelteKit), request logs, Web Analytics | Vercel                                  | USA (`iad1`)         |
| ecohubsOS, Ghost, Listmonk, Mautic               | Own server rented from IONOS (ionos.de) | USA (74.208.179.123) |
| Outgoing mail (`mail.mediakular.com`)            | Mediakular, same IONOS server           | USA                  |
| Form spam check                                  | Cloudflare Turnstile                    | USA                  |
| Analytics (consent), video previews              | Google (GA4, YouTube)                   | USA                  |
| Error alerts                                     | Discord webhook                         | USA                  |

## Processing activities

### 1. Contact form

|               |                                                                                                           |
| ------------- | --------------------------------------------------------------------------------------------------------- |
| Purpose       | Answer a visitor's message                                                                                |
| Legal basis   | Consent (sending the form)                                                                                |
| Data subjects | Visitors                                                                                                  |
| Data          | Name, email, message; IP address to Turnstile and in-memory rate limiting                                 |
| Storage       | Not stored by the site; emailed to `ADMIN_EMAIL`, confirmation to the sender (`/api/contact`)             |
| Recipients    | Our team; Mediakular mail server; Cloudflare (Turnstile); Discord (name, email, IP, only on send failure) |
| Retention     | Two years after the last exchange (**manual mailbox clean-up**)                                           |

### 2. Membership applications

|               |                                                                                                                                                                 |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Purpose       | Consider a membership application                                                                                                                               |
| Legal basis   | Consent (submitting the application)                                                                                                                            |
| Data subjects | Applicants                                                                                                                                                      |
| Data          | Name, email, location, languages, availability, free-text answers (values, motivation, experience, collaboration) — may incidentally contain special categories |
| Storage       | ecohubsOS (`/api/applications`); copy emailed to `ADMIN_EMAIL`; draft in the applicant's localStorage (`ecohubs-application-draft`) until submitted             |
| Recipients    | Our team; IONOS; Mediakular mail server; Cloudflare (Turnstile); Discord (name, email, only on failure)                                                         |
| Retention     | While under consideration + 1 year if not accepted; while a member if accepted (**manual clean-up in ecohubsOS and the admin mailbox**)                         |

### 3. Newsletter and EcoHub One waitlist

|               |                                                                                                                                                              |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Purpose       | Send the newsletter / waitlist updates                                                                                                                       |
| Legal basis   | Consent, double opt-in (Listmonk `preconfirm_subscriptions: false`)                                                                                          |
| Data subjects | Subscribers                                                                                                                                                  |
| Data          | Email, list; waitlist step 2 (optional): first name, location, skills/profession, why they want to join; subscription status; open/click tracking if enabled |
| Storage       | Listmonk and Mautic on the IONOS server (`/api/newsletter`, `/api/waitlist`)                                                                                 |
| Recipients    | Our team; IONOS; Mediakular mail server; Discord (email, only on failure)                                                                                    |
| Retention     | Until unsubscribed or deletion requested; afterwards the address stays marked unsubscribed                                                                   |

### 4. Community Resilience Assessment

|               |                                                                                                  |
| ------------- | ------------------------------------------------------------------------------------------------ |
| Purpose       | Send a gap report on a community's agreements                                                    |
| Legal basis   | Consent                                                                                          |
| Data subjects | Community representatives                                                                        |
| Data          | Email, community name, website, location, size, quiz summary; agreements documents sent by email |
| Storage       | Mautic (form 1); documents in the mailbox                                                        |
| Retention     | Answers: until deletion requested, max 2 years. Documents: deleted once the report is sent       |

### 5. Campaign tracking (Mautic `mtc.js`)

|               |                                                                                                                 |
| ------------- | --------------------------------------------------------------------------------------------------------------- |
| Purpose       | See which campaigns lead to sign-ups                                                                            |
| Legal basis   | Consent (cookie banner); `initMauticTracking()` loads nothing until `cookie_consent` is `accepted`              |
| Data subjects | Visitors to `/community-resilience-assessment` and `/join-the-waitlist`                                         |
| Data          | Cookies `mtc_id`, `mautic_device_id`; page views, IP address; linked to the email address on sign-up            |
| Retention     | Anonymous visitors 12 months; identified contacts as long as the subscription (**needs a Mautic cleanup cron**) |

### 6. Web analytics

|             |                                                                                                                                                                             |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Purpose     | See which pages help people                                                                                                                                                 |
| Legal basis | GA4: consent (Consent Mode v2, denied by default; accepting grants `analytics_storage` only, ad signals stay denied). Vercel Web Analytics: legitimate interest, cookieless |
| Data        | GA4 cookies and usage data; Vercel: page, referrer, country, device, daily-rotating hash                                                                                    |
| Recipients  | Google (USA), Vercel (USA)                                                                                                                                                  |
| Retention   | GA4: 2 months user/event-level (**verify in GA Admin › Data retention**); Vercel: aggregated only                                                                           |

### 7. Member map (homepage)

|             |                                                                        |
| ----------- | ---------------------------------------------------------------------- |
| Purpose     | Show the member network                                                |
| Legal basis | The member's choice to make their ecohubsOS profile public             |
| Data        | Display name, location, avatar, XP, level (from `/api/public/members`) |
| Retention   | In-memory cache, 12 hours                                              |

### 8. Security, logs and error alerts

|             |                                                                                                                                                                 |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Purpose     | Keep the site and forms safe, fix failures                                                                                                                      |
| Legal basis | Legitimate interest                                                                                                                                             |
| Data        | Request logs (IP, time, path); IP in memory for rate limiting (not stored); Turnstile signals; Discord alerts with name/email/IP of a failed submission         |
| Retention   | Vercel logs: days at most; IONOS server logs: Plesk default, monthly rotation × 10 (≈10 months); Discord alerts: deleted once handled, max 30 days (**manual**) |

### 9. Data kept in the visitor's own browser

`cookie_consent`, `ecohubs-application-draft`, the newsletter-modal state, the colour theme, and the Learning Hub keys in `src/lib/learning/storage.ts` (depth, progress, bookmarks, paths, quizzes) stay in localStorage on the visitor's device. We never receive them.

## Open points for the owner

- **Retention promises that need a routine:** the contact/application mailbox clean-up, the Mautic cleanup cron (`mautic:maintenance:cleanup --days-old=365`), the Discord alert clean-up, and verifying the GA4 retention setting.
- **Member map:** confirm that `/api/public/members` returns only members who chose a public profile.
- **Data processing agreements:** have the IONOS, Vercel and Cloudflare DPAs on file, and note the Mediakular arrangement in writing.
- **DPO (Ecuador):** under Resolution SPDP-SPD-2025-0028-R a private entity must designate one only in listed sectors or under the general LOPDP criteria (large-scale special categories, or permanent systematic control). EcoHubs is not public sector and processes no special categories at scale. The listed sector closest to us is "advertising, commercial prospecting or market research … based on preferences, interests or behaviours, or involving profiling" — Mautic campaign tracking is near enough to that line to get a one-off legal confirmation.
- **Applicability:** whether the LOPDP binds EcoHubs at all depends on whether it counts as providing economic services. The page follows it regardless.
