import LegalLayout from '../components/ui/LegalLayout'
import { useSEO } from '../hooks/usePageMeta'

/**
 * The child-safety standards page — the published statement Google Play's
 * Child Safety Standards policy asks for, and the URL handed to it.
 *
 * Its job is narrow: say what is banned, say how to report it, say who reads
 * it, and name a person to write to. Everything below is read off the build
 * rather than written from memory, because a standards page that promises a
 * button that is not there is worse than no page at all:
 *
 *   - `app/lib/screens/report.dart` — one sheet reports a profile, a post, a
 *     video, a comment or a live room, and it says out loud that nobody is told
 *     who reported and that nothing happens on its own.
 *   - `backend/apps/social/models.py` `Report.REASONS` — which grounds are
 *     offered for which thing. A profile's list is Spam, Abuse, Hate speech,
 *     Fake account, Scam or fraud, Other: it has no "Sexual content", which is
 *     why this page sends a reporter to the note field for that one surface.
 *   - `backend/apps/social/models.py` `Report.Outcome` — the decisions a
 *     moderator can record, of which `ESCALATED` is "Passed it on".
 *   - `app/lib/screens/signup.dart:194` — `_ok` requires `_age >= 13`, and the
 *     year picker starts thirteen years back, so the gate is not a checkbox.
 *   - `app/lib/screens/person.dart:487` — a block is one endpoint call on a
 *     profile, both directions at once.
 */
export default function ChildSafety() {
  useSEO()

  return (
    <LegalLayout
      title="Child safety"
      updated="October 2026"
      minutes={6}
      wall="/media/walls/safar.jpg"
      intro="Xelvic is for people aged 13 and over. Child sexual abuse material, grooming, sextortion and any sexual content involving a minor are banned outright — there is no context, no private room and no joke in which they are allowed. This page is the standard we hold ourselves to, how to report something that breaks it, and who reads the report."
      inShort={[
        'Child sexual abuse material, grooming and any sexual content involving a minor are prohibited on Xelvic, without exception.',
        'Every profile, post, comment, Vibe and live room can be reported from inside the app, and a person reads every report.',
        'Pick “Sexual content” where it is offered. Where it is not — a profile — choose Other and say what it is in the note.',
        'safety@xelvic.app reaches a person directly and is triaged the same day. Use it alongside the in-app report when a child is involved.',
        'Xelvic is 13+, and the gate is enforced at sign-up rather than asserted afterwards. Accounts that should not be here are removed.',
      ]}
      glance={[
        { label: 'Child sexual abuse material', value: 'Zero tolerance' },
        { label: 'Youngest account', value: '13, enforced' },
        { label: 'The ground to pick', value: 'Sexual content' },
        { label: 'Reaching a person', value: 'Same day' },
      ]}
      sections={[
        {
          heading: 'What is never allowed here',
          body: [
            'Some things are not moderation questions, and this is the shortest clause on the site because of it. Child sexual abuse material is banned on Xelvic. So is anything that sexualises a minor — a picture, a caption, a comment, a voice note, a live room, a profile picture, a username — and so is using the app to reach a minor for a sexual purpose. Grooming and sextortion are banned in the same sentence.',
            'There is no version of this that is allowed in private. A disappearing message, a Vault conversation and a live room are all covered by exactly the same rule as a public post, and a room being live when it is reported does not make it a grey area — it makes it urgent.',
            'Nothing on this page is a matter of judgement about taste. Where a minor is involved, the answer is the removal of the content, the closure of the room and the end of the account.',
          ],
          points: [
            'Child sexual abuse material: banned, with no exception.',
            'Sexualising a minor, in any format: banned.',
            'Reaching a minor for a sexual purpose: banned.',
            'Private, disappearing and live are all covered by the same rule.',
          ],
        },
        {
          heading: 'How to report it',
          body: [
            'Reporting happens inside the app, on the thing itself. Open the profile, the post, the comment, the Vibe or the live room and use its report option — a live room carries one behind the three dots in its header, and it appears once the room has opened, because a room that has not begun has nothing in it to complain about yet. The sheet that opens shows you what you are reporting before it files anything, so a complaint that goes into a queue a person has to read is never filed at the wrong thing.',
            'The sheet then asks for a ground from a list the server keeps for that kind of thing, and one of them is Sexual content. It is offered on posts, comments, Vibes, messages and live rooms. It is not on a profile’s list: a profile is reported as Abuse, Hate speech, Fake account, Scam or fraud, Spam or Other. So for an account that worries you — a username or a picture that sexualises a child — pick Other or Abuse and write what it is in the note.',
            'The note is optional everywhere else and it is the important field here. A ground sorts a complaint into a queue; the note is what a moderator reads first, and one sentence naming the age of the person involved is worth more than any ground on the list. Tell us what you saw and what makes you think a minor is involved.',
            'You are not told off for a report that turns out to be mistaken, and the app will tell you if the same thing has already been reported rather than filing it twice. The person you reported is never told who reported them.',
          ],
          points: [
            'Report from the thing itself — profile, post, comment, Vibe or live room.',
            'Choose Sexual content where the list offers it.',
            'On a profile, choose Other or Abuse and say what it is.',
            'Put the age of anyone involved in the note.',
            'Nobody is told you reported it.',
          ],
          app: 'Reported. A moderator will look at it.',
        },
        {
          heading: 'How to reach a person directly',
          body: [
            'The in-app queue is worked newest first, and it carries no flag that says “this one is about a child” — so a report filed in the app does not jump anything, and it is not a way of saying how urgent something is. That is the honest limit of it, and it is why there is a second route.',
            'Write to safety@xelvic.app as well, or instead, when a child is involved. That address is not a queue: it is read by a person and triaged the same day, which is what makes it the right place to say “there is a child in this”. Put the handle in the subject line, say what you saw, and say where you saw it — a profile, a room, a conversation. If you have a screenshot, attach it rather than linking to it, because a link that expires is a report nobody can act on.',
            'If you are not sure whether something is serious enough to write to an address rather than tap a button in the app, write to the address. A report that turns out to be nothing costs us a few minutes; the other mistake is not recoverable.',
          ],
          points: [
            'safety@xelvic.app — read by a person, triaged the same day.',
            'Name the handle and where you saw it, in the subject line.',
            'Attach a screenshot rather than sending a link.',
            'Also write to legal@xelvic.app for notices and law-enforcement requests.',
            'Not sure whether it is serious enough? Send it.',
          ],
        },
        {
          heading: 'What happens after a report',
          body: [
            'A person reads it. There is no classifier that decides a report about a child, no keyword rule that fires on its own, and no automatic punishment — a report opens a review, and the review ends in a decision somebody reached by hand. The decisions are recorded in the moderation console, and one of them is “Passed it on”: the record of a complaint that was escalated rather than closed.',
            'Where a report concerns a child, the content goes, the room is closed if it is live, and the account behind it is suspended. Where apparent child sexual abuse material is involved, we pass it on to the relevant authorities and preserve what we hold so that a request for it can be answered. The account is not reinstated because the content was deleted and nobody followed up.',
            'Two things we do not do, said plainly. We do not tell you what we did about your report: the outcome is between the account and us, and a queue that reports back to every complainant is a queue that leaks the fact that a specific account is under investigation. And we do not hold a report open indefinitely — it is either decided or escalated, and the console can say which.',
          ],
          points: [
            'A person reads it; no filter decides it.',
            'Content removed, room closed, account suspended.',
            'Apparent child sexual abuse material is passed to the authorities.',
            '“Passed it on” is a recorded outcome, not a promise in an email.',
            'You are not told the outcome of your report — that is deliberate.',
          ],
          app: 'Leave it up · Take it down · Suspend the account · Pass it on',
        },
        {
          heading: 'Blocking, and getting out',
          body: [
            'Blocking is the one control on this page that does not wait for anybody. Open the other person’s profile and block them: it takes effect at once, in both directions, and neither of you appears to the other again. Nobody is asked to review it and nobody is notified of it — the other person simply stops getting through.',
            'A block is not a mute and not a report. It is the thing to do while a report is being read, and it is the thing to do when you would rather not file one at all. Anything already sent stays sent — a block is not a recall — so if a conversation contains something you may need to show somebody later, keep your own copy before you block.',
            'Two people cannot be blocked out of a room they are both in, which is why a live room has its own report: if something is happening on a stage, close the room, not the person. And if a child is in a conversation they should not be in, the block is the first move and the report is the second — in that order, because the block works immediately.',
          ],
          points: [
            'Block from a profile: immediate, both ways, silent.',
            'It works while a report is still in the queue.',
            'A block does not delete anything already sent.',
            'Something happening on a live stage? Report the room instead.',
          ],
        },
        {
          heading: 'The age gate',
          body: [
            'You must be 13 or over to have a Xelvic account, and the sign-up enforces it rather than asking you to confirm it. The year picker does not offer a year that would make you younger than 13, so the gate is not a checkbox a twelve-year-old can tick — it is a value they cannot enter.',
            'The date of birth is kept on the account afterwards, because it does more than one job: it is what holds the 18+ line, it puts a birthday on the profile, and it sets the age band the feed is tuned by. Only the day and month are ever shown to other people, and the year stays private unless it is deliberately shown.',
            'Accounts belonging to anyone under 13 are removed when we learn of them, and reporting an account is how we usually learn. If you believe an account on Xelvic belongs to a child under 13, report the profile and write to safety@xelvic.app with the handle. We would much rather look at one that turns out to be fine.',
          ],
          points: [
            '13 or over, enforced at sign-up rather than after it.',
            'The year picker cannot produce an under-13 date.',
            'The date is kept; only the day and month are shown.',
            'Under-13 accounts are removed when we learn of them.',
            'Reporting is how we most often learn.',
          ],
          app: 'Xelvic is not for anyone under 13.',
        },
        {
          heading: 'For parents, guardians and law enforcement',
          body: [
            'If you are a parent or a guardian and you want to know what the app collects about a young person and what controls exist, the Data page answers that question directly, and the Settings page explains every switch in the app one by one. If you want to ask about a specific account, write to privacy@xelvic.app from the address on that account where there is one — a request about somebody else’s account can only be answered as far as the law and that person’s privacy allow, and we will say so rather than pretend otherwise.',
            'If you are with law enforcement, write to legal@xelvic.app. Name the account by its handle rather than its display name, say what you are asking for and under what legal basis, and give the jurisdiction you are writing from. We preserve what we hold on a valid request and disclose it as the law requires; we will tell you what we can and cannot produce rather than leaving a request unanswered.',
            'If a child is in immediate danger, none of this page is the right first step. Call your local emergency number. A report filed with us is read by a moderator, and a moderator cannot reach anybody in the next ten minutes.',
          ],
          points: [
            'Parents: the Data page answers the collection question in plain language.',
            'privacy@xelvic.app for a question about a specific account.',
            'Law enforcement: legal@xelvic.app, naming the handle and the legal basis.',
            'Immediate danger: emergency services first, this page afterwards.',
          ],
        },
      ]}
      related={[
        { label: 'Safety', to: '/safety' },
        { label: 'Privacy Policy', to: '/privacy' },
        { label: 'Terms', to: '/terms' },
        { label: 'Your Data', to: '/data' },
        { label: 'Contact', to: '/contact' },
      ]}
      contact={{
        label: 'Email safety@xelvic.app',
        href: 'mailto:safety@xelvic.app',
        note: 'A child-safety concern, a report you want a person to pick up directly, or a question from a parent or guardian. This inbox is triaged the same day rather than read in queue order, and it is the designated point of contact for child-safety matters on Xelvic.',
      }}
    />
  )
}
