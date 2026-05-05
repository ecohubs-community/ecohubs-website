export interface ApplicationEmailData {
	// PAGE 1 — Basic Information
	fullName: string;
	email: string;
	location: string;
	timeAvailability: string;
	languages: string;
	discovery: string;

	// PAGE 2 — Values & Vision
	resonanceCombined: string;
	natureCommunityMeaning: string;
	values: string | string[];

	// PAGE 3 — Emotional Maturity & Communication
	groupWork: string;
	teamworkMoment: string;
	disagreementResponse: string;
	disagreementResponseOther?: string;
	ideaNotChosen: string;
	ideaNotChosenOther?: string;
	comfortFeedback: number;
	comfortAskingHelp: number;
	adaptToChange: number;
	decisionMakingValue: string;

	// PAGE 4 — Motivation, Contribution, Skills
	motivation: string;
	contribution: string;
	receiveLearn: string;
	experienceAreas: string | string[];
	experienceAreasOther?: string;
	proudProject: string;
	bestWorkEnvironments: string;

	// PAGE 5 — Stability, Challenges, Next Steps
	manageCommitments: string;
	collaborationChallengesMerged: string;
	concernsDoubts: string;
	howStartContributing: string;
	anythingElse?: string;

	timestamp: string;
}

/* ---------------------------------------------------------------------------
   Shared design tokens — mirrored from the v2 homepage (Pridi / Fraunces /
   Inter, ivory + deep emerald). Fonts gracefully fall back to web-safe
   alternatives in clients that strip <link>.
--------------------------------------------------------------------------- */
const FONTS_LINK = `<link href="https://fonts.googleapis.com/css2?family=Pridi:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Fraunces:ital,wght@0,400;0,500;1,400;1,500&display=swap" rel="stylesheet">`;

const FF_SERIF = `'Pridi', Georgia, 'Times New Roman', serif`;
const FF_STORY = `'Fraunces', Georgia, 'Times New Roman', serif`;
const FF_SANS = `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`;

// palette
const C_BASE = '#fbfbf9';
const C_IVORY = '#f5f2ea';
const C_TEXT = '#1c1917';
const C_PRIMARY = '#059669';
const C_DARK = '#064e3b';
const C_DEEP = '#0b2e24';
const C_MUTED = '#6b7265';
const C_LINE = '#e7e2d4';
const C_AMBER = '#d97706';

/* simple helper to render a labelled field */
function field(label: string, value: string, opts: { box?: boolean } = {}): string {
	const safe = value && value.trim() ? value : '—';
	const inner = opts.box
		? `<div style="font-family:${FF_SERIF};font-size:15px;line-height:1.6;color:${C_TEXT};background:${C_IVORY};border-left:2px solid ${C_PRIMARY};padding:14px 16px;border-radius:0 6px 6px 0;">${safe.replace(/\n/g, '<br>')}</div>`
		: `<div style="font-family:${FF_SERIF};font-size:16px;line-height:1.5;color:${C_TEXT};">${safe}</div>`;
	return `
	<tr><td style="padding:0 0 14px 0;">
		<div style="font-family:${FF_SANS};font-size:10.5px;letter-spacing:0.18em;text-transform:uppercase;font-weight:600;color:${C_MUTED};margin:0 0 6px 0;">${label}</div>
		${inner}
	</td></tr>`;
}

function sectionHeader(kicker: string, title: string, italicTail?: string): string {
	return `
	<tr><td style="padding:0 0 18px 0;">
		<div style="font-family:${FF_SANS};font-size:10.5px;letter-spacing:0.22em;text-transform:uppercase;font-weight:600;color:${C_PRIMARY};margin:0 0 10px 0;">${kicker}</div>
		<div style="font-family:${FF_SERIF};font-size:24px;line-height:1.2;color:${C_DEEP};font-weight:500;">
			${title}${italicTail ? ` <em style="font-family:${FF_STORY};font-style:italic;font-weight:400;color:${C_MUTED};">${italicTail}</em>` : ''}
		</div>
		<div style="height:1px;background:linear-gradient(90deg, ${C_DARK}40, transparent);margin:18px 0 0 0;line-height:1px;font-size:0;">&nbsp;</div>
	</td></tr>`;
}

function ratingBar(value: number): string {
	const pct = Math.max(0, Math.min(10, value)) * 10;
	return `
		<div style="font-family:${FF_SANS};display:inline-block;">
			<span style="font-family:${FF_STORY};font-style:italic;font-size:22px;color:${C_DARK};font-weight:500;vertical-align:middle;">${value}</span><span style="font-family:${FF_SANS};font-size:13px;color:${C_MUTED};vertical-align:middle;">&nbsp;/&nbsp;10</span>
			<div style="display:inline-block;vertical-align:middle;margin-left:14px;width:160px;height:4px;background:${C_LINE};border-radius:2px;overflow:hidden;">
				<div style="width:${pct}%;height:4px;background:${C_PRIMARY};border-radius:2px;line-height:4px;font-size:0;">&nbsp;</div>
			</div>
		</div>`;
}

export function getApplicationEmailHTML(data: ApplicationEmailData): string {
	const submitted = new Date(data.timestamp).toLocaleString('en-US', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		timeZoneName: 'short'
	});

	const valuesArr = Array.isArray(data.values) ? data.values : (data.values ? [data.values] : []);
	const expArr = Array.isArray(data.experienceAreas) ? data.experienceAreas : (data.experienceAreas ? [data.experienceAreas] : []);

	const valueChips = valuesArr.map(
		(v) => `<span style="display:inline-block;font-family:${FF_SANS};font-size:12px;font-weight:500;color:${C_DARK};background:${C_IVORY};border:1px solid ${C_LINE};padding:6px 12px;border-radius:999px;margin:0 6px 6px 0;">${v}</span>`
	).join('');

	const expChips = expArr.map(
		(v) => `<span style="display:inline-block;font-family:${FF_SANS};font-size:12px;font-weight:500;color:${C_DARK};background:#ffffff;border:1px solid ${C_LINE};padding:6px 12px;border-radius:999px;margin:0 6px 6px 0;">${v}</span>`
	).join('');

	return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>New Application Submission · EcoHubs</title>
${FONTS_LINK}
<style>
	body { margin:0; padding:0; background:${C_BASE}; }
	a { color:${C_DARK}; }
	@media (max-width: 640px) {
		.container { width:100% !important; border-radius:0 !important; }
		.px { padding-left:24px !important; padding-right:24px !important; }
		.hero-h1 { font-size:32px !important; line-height:1.1 !important; }
		.story-h2 { font-size:22px !important; }
	}
</style>
</head>
<body style="margin:0;padding:0;background:${C_BASE};font-family:${FF_SANS};color:${C_TEXT};-webkit-font-smoothing:antialiased;">

<!-- Preheader (hidden) -->
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">New application from ${data.fullName} · ${data.location}</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C_BASE};">
	<tr><td align="center" style="padding:32px 16px;">

		<table role="presentation" class="container" width="680" cellpadding="0" cellspacing="0" border="0" style="width:680px;max-width:680px;background:${C_BASE};border:1px solid ${C_LINE};border-radius:18px;overflow:hidden;">

			<!-- ============================================================ -->
			<!-- MASTHEAD                                                      -->
			<!-- ============================================================ -->
			<tr><td style="background:${C_DEEP};padding:28px 40px 24px 40px;" class="px">
				<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
					<tr>
						<td align="left" style="font-family:${FF_SERIF};font-size:17px;color:#f5f2ea;font-weight:500;letter-spacing:0.01em;">
							<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${C_PRIMARY};margin-right:10px;vertical-align:middle;"></span>
							<span style="vertical-align:middle;">EcoHubs</span>
						</td>
						<td align="right" style="font-family:${FF_SANS};font-size:10.5px;letter-spacing:0.22em;text-transform:uppercase;color:#a7f3d0;font-weight:600;">
							Member application
						</td>
					</tr>
				</table>
			</td></tr>

			<!-- ============================================================ -->
			<!-- HERO — editorial opener                                       -->
			<!-- ============================================================ -->
			<tr><td style="background:${C_IVORY};padding:48px 40px 44px 40px;" class="px">
				<div style="font-family:${FF_SANS};font-size:10.5px;letter-spacing:0.22em;text-transform:uppercase;font-weight:600;color:${C_PRIMARY};margin:0 0 18px 0;">
					New application received
				</div>
				<div class="hero-h1" style="font-family:${FF_SERIF};font-size:42px;line-height:1.05;color:${C_DEEP};font-weight:500;letter-spacing:-0.01em;margin:0 0 22px 0;">
					Someone wants to <em style="font-family:${FF_STORY};font-style:italic;font-weight:400;color:${C_PRIMARY};">build this</em> with us.
				</div>
				<div style="font-family:${FF_SERIF};font-size:18px;line-height:1.55;color:${C_TEXT};font-weight:400;max-width:520px;">
					${data.fullName} just sent in their application from ${data.location}. Take a quiet moment with it — every voice that arrives shapes what this becomes.
				</div>

				<!-- identity card -->
				<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:32px;background:#ffffff;border:1px solid ${C_LINE};border-radius:14px;">
					<tr>
						<td style="padding:20px 22px;">
							<div style="font-family:${FF_SANS};font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:${C_MUTED};font-weight:600;margin-bottom:4px;">Applicant</div>
							<div style="font-family:${FF_SERIF};font-size:22px;color:${C_DEEP};font-weight:500;line-height:1.2;">${data.fullName}</div>
							<div style="font-family:${FF_SANS};font-size:13px;color:${C_MUTED};margin-top:4px;">
								<a href="mailto:${data.email}" style="color:${C_DARK};text-decoration:none;border-bottom:1px solid ${C_DARK}40;">${data.email}</a>
							</div>
						</td>
						<td align="right" style="padding:20px 22px;border-left:1px solid ${C_LINE};width:180px;vertical-align:top;">
							<div style="font-family:${FF_SANS};font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:${C_MUTED};font-weight:600;margin-bottom:6px;">Submitted</div>
							<div style="font-family:${FF_STORY};font-style:italic;font-size:14px;color:${C_DARK};line-height:1.4;">${submitted}</div>
						</td>
					</tr>
				</table>
			</td></tr>

			<!-- ============================================================ -->
			<!-- CHAPTER 01 — BASIC INFO                                       -->
			<!-- ============================================================ -->
			<tr><td style="background:${C_BASE};padding:44px 40px 8px 40px;" class="px">
				<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
					<tr><td>
						<div style="font-family:${FF_STORY};font-style:italic;font-size:15px;color:${C_PRIMARY};font-weight:500;margin-bottom:6px;">01</div>
					</td></tr>
				</table>
				<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
					${sectionHeader('Chapter one', 'Basic information', '— who, where, and how they found us')}
					${field('Location', data.location)}
					${field('Time availability', data.timeAvailability)}
					${field('Languages', data.languages, { box: true })}
					${field('How discovered', data.discovery, { box: true })}
				</table>
			</td></tr>

			<!-- ============================================================ -->
			<!-- CHAPTER 02 — VALUES & VISION                                  -->
			<!-- ============================================================ -->
			<tr><td style="background:${C_BASE};padding:32px 40px 8px 40px;" class="px">
				<div style="font-family:${FF_STORY};font-style:italic;font-size:15px;color:${C_PRIMARY};font-weight:500;margin-bottom:6px;">02</div>
				<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
					${sectionHeader('Chapter two', 'Values & vision', '— what resonates with them')}
					${field('What resonates with EcoHubs', data.resonanceCombined, { box: true })}
					${field('Living well in community & alignment with nature', data.natureCommunityMeaning, { box: true })}
					<tr><td style="padding:0 0 14px 0;">
						<div style="font-family:${FF_SANS};font-size:10.5px;letter-spacing:0.18em;text-transform:uppercase;font-weight:600;color:${C_MUTED};margin:0 0 10px 0;">Essential values (up to 3)</div>
						<div>${valueChips || `<span style="font-family:${FF_SERIF};color:${C_MUTED};font-size:14px;">—</span>`}</div>
					</td></tr>
				</table>
			</td></tr>

			<!-- ============================================================ -->
			<!-- CHAPTER 03 — EMOTIONAL MATURITY                               -->
			<!-- ============================================================ -->
			<tr><td style="background:${C_BASE};padding:32px 40px 8px 40px;" class="px">
				<div style="font-family:${FF_STORY};font-style:italic;font-size:15px;color:${C_PRIMARY};font-weight:500;margin-bottom:6px;">03</div>
				<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
					${sectionHeader('Chapter three', 'Emotional maturity', '& how they communicate')}
					${field('What helps groups work', data.groupWork, { box: true })}
					${field('A teamwork moment they remember', data.teamworkMoment, { box: true })}
					${field('Disagreement response', data.disagreementResponse)}
					${data.disagreementResponseOther ? field('— in their words', data.disagreementResponseOther, { box: true }) : ''}
					${field('When their idea isn\'t chosen', data.ideaNotChosen)}
					${data.ideaNotChosenOther ? field('— in their words', data.ideaNotChosenOther, { box: true }) : ''}
				</table>

				<!-- Self-rated bars -->
				<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:18px 0 8px 0;background:${C_IVORY};border-radius:12px;">
					<tr><td style="padding:22px 24px;">
						<div style="font-family:${FF_SANS};font-size:10.5px;letter-spacing:0.22em;text-transform:uppercase;font-weight:600;color:${C_MUTED};margin-bottom:18px;">Self-rated</div>

						<div style="font-family:${FF_SERIF};font-size:14px;color:${C_DEEP};margin-bottom:6px;font-weight:500;">Comfort receiving feedback</div>
						<div style="margin-bottom:18px;">${ratingBar(data.comfortFeedback)}</div>

						<div style="font-family:${FF_SERIF};font-size:14px;color:${C_DEEP};margin-bottom:6px;font-weight:500;">Comfort asking for help</div>
						<div style="margin-bottom:18px;">${ratingBar(data.comfortAskingHelp)}</div>

						<div style="font-family:${FF_SERIF};font-size:14px;color:${C_DEEP};margin-bottom:6px;font-weight:500;">Adapting to change</div>
						<div>${ratingBar(data.adaptToChange)}</div>
					</td></tr>
				</table>

				<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
					${field('Decision-making value', data.decisionMakingValue)}
				</table>
			</td></tr>

			<!-- ============================================================ -->
			<!-- CHAPTER 04 — MOTIVATION & SKILLS                              -->
			<!-- ============================================================ -->
			<tr><td style="background:${C_BASE};padding:32px 40px 8px 40px;" class="px">
				<div style="font-family:${FF_STORY};font-style:italic;font-size:15px;color:${C_PRIMARY};font-weight:500;margin-bottom:6px;">04</div>
				<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
					${sectionHeader('Chapter four', 'Motivation, contribution', '& skills they carry')}
					${field('Motivation', data.motivation, { box: true })}
					${field('What they want to contribute', data.contribution, { box: true })}
					${field('What they hope to receive or learn', data.receiveLearn, { box: true })}
					<tr><td style="padding:0 0 14px 0;">
						<div style="font-family:${FF_SANS};font-size:10.5px;letter-spacing:0.18em;text-transform:uppercase;font-weight:600;color:${C_MUTED};margin:0 0 10px 0;">Experience areas</div>
						<div>${expChips || `<span style="font-family:${FF_SERIF};color:${C_MUTED};font-size:14px;">—</span>`}</div>
					</td></tr>
					${data.experienceAreasOther ? field('— other experience', data.experienceAreasOther, { box: true }) : ''}
					${field('A project they\'re proud of', data.proudProject, { box: true })}
					${field('Where they do their best work', data.bestWorkEnvironments, { box: true })}
				</table>
			</td></tr>

			<!-- ============================================================ -->
			<!-- CHAPTER 05 — STABILITY & NEXT STEPS                           -->
			<!-- ============================================================ -->
			<tr><td style="background:${C_BASE};padding:32px 40px 8px 40px;" class="px">
				<div style="font-family:${FF_STORY};font-style:italic;font-size:15px;color:${C_PRIMARY};font-weight:500;margin-bottom:6px;">05</div>
				<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
					${sectionHeader('Chapter five', 'Stability, challenges', '& how they want to start')}
					${field('How they manage commitments', data.manageCommitments, { box: true })}
					${field('Honest about collaboration challenges', data.collaborationChallengesMerged, { box: true })}
					${field('Concerns or doubts', data.concernsDoubts, { box: true })}
					${field('How they\'d like to start contributing', data.howStartContributing, { box: true })}
					${data.anythingElse ? field('Anything else', data.anythingElse, { box: true }) : ''}
				</table>
			</td></tr>

			<!-- ============================================================ -->
			<!-- CTA — manifesto-style dark band                               -->
			<!-- ============================================================ -->
			<tr><td style="padding:32px 40px 40px 40px;" class="px">
				<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C_DEEP};border-radius:18px;">
					<tr><td style="padding:40px 36px;text-align:center;">
						<div style="font-family:${FF_SANS};font-size:10.5px;letter-spacing:0.22em;text-transform:uppercase;font-weight:600;color:#a7f3d0;margin-bottom:14px;">Your move</div>
						<div style="font-family:${FF_SERIF};font-size:24px;line-height:1.25;color:#f5f2ea;font-weight:500;margin-bottom:8px;">
							Write back to <em style="font-family:${FF_STORY};font-style:italic;font-weight:400;color:#a7f3d0;">${data.fullName}</em>
						</div>
						<div style="font-family:${FF_SERIF};font-size:14px;line-height:1.5;color:#d4cfb8;max-width:380px;margin:0 auto 24px auto;">
							A short, human reply within a few days is what makes the difference between an application form and a community.
						</div>
						<a href="mailto:${data.email}?subject=Re: Your EcoHubs application"
						   style="display:inline-block;font-family:${FF_SANS};font-size:14px;font-weight:500;color:${C_DEEP};background:#f5f2ea;text-decoration:none;padding:14px 28px;border-radius:999px;">
							Reply to ${data.fullName} →
						</a>
					</td></tr>
				</table>
			</td></tr>

			<!-- ============================================================ -->
			<!-- FOOTER                                                        -->
			<!-- ============================================================ -->
			<tr><td style="background:${C_IVORY};padding:24px 40px;border-top:1px solid ${C_LINE};text-align:center;" class="px">
				<div style="font-family:${FF_STORY};font-style:italic;font-size:13px;color:${C_MUTED};line-height:1.5;">
					Submitted via ecohubs.community · A living project, carried by many.
				</div>
			</td></tr>

		</table>

	</td></tr>
</table>

</body>
</html>`;
}

export function getApplicationEmailText(data: ApplicationEmailData): string {
	return `
NEW APPLICATION · ECOHUBS
=========================

Someone wants to build this with us.
${data.fullName} · ${data.location}
${data.email}

Submitted: ${new Date(data.timestamp).toLocaleString()}


01 · BASIC INFORMATION
----------------------
Time Availability: ${data.timeAvailability}
Languages: ${data.languages}
How Discovered: ${data.discovery}


02 · VALUES & VISION
--------------------
What Resonates with EcoHubs:
${data.resonanceCombined}

Living Well in Community / Alignment with Nature:
${data.natureCommunityMeaning}

Essential Values: ${Array.isArray(data.values) ? data.values.join(', ') : data.values}


03 · EMOTIONAL MATURITY & COMMUNICATION
---------------------------------------
What Helps Groups Work:
${data.groupWork}

Teamwork Moment:
${data.teamworkMoment}

Disagreement Response: ${data.disagreementResponse}
${data.disagreementResponseOther ? `In their words: ${data.disagreementResponseOther}\n` : ''}
Idea Not Chosen: ${data.ideaNotChosen}
${data.ideaNotChosenOther ? `In their words: ${data.ideaNotChosenOther}\n` : ''}
Comfort Receiving Feedback: ${data.comfortFeedback}/10
Comfort Asking for Help:    ${data.comfortAskingHelp}/10
Adapt to Change:            ${data.adaptToChange}/10

Decision-Making Value: ${data.decisionMakingValue}


04 · MOTIVATION, CONTRIBUTION, SKILLS
-------------------------------------
Motivation:
${data.motivation}

What to Contribute:
${data.contribution}

What to Receive/Learn:
${data.receiveLearn}

Experience Areas: ${Array.isArray(data.experienceAreas) ? data.experienceAreas.join(', ') : data.experienceAreas}
${data.experienceAreasOther ? `Other: ${data.experienceAreasOther}\n` : ''}
Proud Project:
${data.proudProject}

Best Work Environments:
${data.bestWorkEnvironments}


05 · STABILITY, CHALLENGES, NEXT STEPS
--------------------------------------
Manage Commitments:
${data.manageCommitments}

Collaboration Challenges:
${data.collaborationChallengesMerged}

Concerns/Doubts:
${data.concernsDoubts}

How to Start Contributing:
${data.howStartContributing}
${data.anythingElse ? `\nAnything Else:\n${data.anythingElse}\n` : ''}

---
Reply to: ${data.email}

Submitted via ecohubs.community — a living project, carried by many.
`;
}

export function getApplicationConfirmationHTML(name: string): string {
	return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Your EcoHubs application</title>
${FONTS_LINK}
<style>
	body { margin:0; padding:0; background:${C_BASE}; }
	a { color:${C_DARK}; }
	@media (max-width: 640px) {
		.container { width:100% !important; border-radius:0 !important; }
		.px { padding-left:24px !important; padding-right:24px !important; }
		.hero-h1 { font-size:34px !important; line-height:1.08 !important; }
	}
</style>
</head>
<body style="margin:0;padding:0;background:${C_BASE};font-family:${FF_SANS};color:${C_TEXT};-webkit-font-smoothing:antialiased;">

<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">We received your application — and we're glad you wrote.</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C_BASE};">
	<tr><td align="center" style="padding:32px 16px;">

		<table role="presentation" class="container" width="640" cellpadding="0" cellspacing="0" border="0" style="width:640px;max-width:640px;background:${C_BASE};border:1px solid ${C_LINE};border-radius:18px;overflow:hidden;">

			<!-- Masthead -->
			<tr><td style="background:${C_DEEP};padding:22px 36px;" class="px">
				<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
					<tr>
						<td align="left" style="font-family:${FF_SERIF};font-size:17px;color:#f5f2ea;font-weight:500;letter-spacing:0.01em;">
							<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${C_PRIMARY};margin-right:10px;vertical-align:middle;"></span>
							<span style="vertical-align:middle;">EcoHubs</span>
						</td>
						<td align="right" style="font-family:${FF_SANS};font-size:10.5px;letter-spacing:0.22em;text-transform:uppercase;color:#a7f3d0;font-weight:600;">
							A living project
						</td>
					</tr>
				</table>
			</td></tr>

			<!-- Hero -->
			<tr><td style="background:${C_IVORY};padding:56px 40px 48px 40px;" class="px">
				<div style="font-family:${FF_SANS};font-size:10.5px;letter-spacing:0.22em;text-transform:uppercase;font-weight:600;color:${C_PRIMARY};margin:0 0 22px 0;">
					Your application · received with care
				</div>
				<div class="hero-h1" style="font-family:${FF_SERIF};font-size:46px;line-height:1.04;color:${C_DEEP};font-weight:500;letter-spacing:-0.01em;margin:0 0 24px 0;">
					Thank you, ${name}.<br>
					<em style="font-family:${FF_STORY};font-style:italic;font-weight:400;color:${C_PRIMARY};">We're glad you wrote.</em>
				</div>
				<div style="font-family:${FF_SERIF};font-size:18px;line-height:1.6;color:${C_TEXT};max-width:480px;">
					Your application has arrived. Someone here will read it slowly — not scan it — because that's how we want this community to feel from the very first moment.
				</div>
			</td></tr>

			<!-- Body -->
			<tr><td style="background:${C_BASE};padding:48px 40px 24px 40px;" class="px">

				<!-- What happens next -->
				<div style="font-family:${FF_SANS};font-size:10.5px;letter-spacing:0.22em;text-transform:uppercase;font-weight:600;color:${C_PRIMARY};margin-bottom:12px;">
					What happens next
				</div>
				<div style="font-family:${FF_SERIF};font-size:28px;line-height:1.2;color:${C_DEEP};font-weight:500;margin-bottom:28px;">
					A few quiet days, <em style="font-family:${FF_STORY};font-style:italic;font-weight:400;color:${C_MUTED};">then a real reply.</em>
				</div>

				<!-- Steps as story beats with vertical line -->
				<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
					<tr><td style="padding:4px 0 22px 0;">
						<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td width="42" valign="top" style="padding-top:6px;">
									<div style="font-family:${FF_STORY};font-style:italic;font-size:18px;color:${C_PRIMARY};font-weight:500;">01</div>
								</td>
								<td valign="top" style="border-left:1px solid ${C_LINE};padding:0 0 0 22px;">
									<div style="font-family:${FF_SERIF};font-size:18px;color:${C_DEEP};font-weight:500;line-height:1.3;margin-bottom:6px;">We read it</div>
									<div style="font-family:${FF_SERIF};font-size:15px;line-height:1.6;color:${C_TEXT};">
										Within 3–5 days. Not by an algorithm — by a person who cares about who is arriving.
									</div>
								</td>
							</tr>
						</table>
					</td></tr>
					<tr><td style="padding:0 0 22px 0;">
						<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td width="42" valign="top" style="padding-top:6px;">
									<div style="font-family:${FF_STORY};font-style:italic;font-size:18px;color:${C_PRIMARY};font-weight:500;">02</div>
								</td>
								<td valign="top" style="border-left:1px solid ${C_LINE};padding:0 0 0 22px;">
									<div style="font-family:${FF_SERIF};font-size:18px;color:${C_DEEP};font-weight:500;line-height:1.3;margin-bottom:6px;">We write back</div>
									<div style="font-family:${FF_SERIF};font-size:15px;line-height:1.6;color:${C_TEXT};">
										We're choosing the first 500 founding members for this cohort. Whatever the answer, you'll hear it from a human, with care.
									</div>
								</td>
							</tr>
						</table>
					</td></tr>
					<tr><td style="padding:0 0 4px 0;">
						<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td width="42" valign="top" style="padding-top:6px;">
									<div style="font-family:${FF_STORY};font-style:italic;font-size:18px;color:${C_AMBER};font-weight:500;">03</div>
								</td>
								<td valign="top" style="padding:0 0 0 22px;">
									<div style="font-family:${FF_SERIF};font-size:18px;color:${C_DEEP};font-weight:500;line-height:1.3;margin-bottom:6px;">We begin, together</div>
									<div style="font-family:${FF_SERIF};font-size:15px;line-height:1.6;color:${C_TEXT};">
										If it's a yes, we'll share next steps for joining the founding circle and shaping the Blueprint with us.
									</div>
								</td>
							</tr>
						</table>
					</td></tr>
				</table>

				<!-- Hairline -->
				<div style="height:1px;background:linear-gradient(90deg, transparent, ${C_DARK}30, transparent);margin:36px 0 32px 0;line-height:1px;font-size:0;">&nbsp;</div>

				<!-- While you wait -->
				<div style="font-family:${FF_SANS};font-size:10.5px;letter-spacing:0.22em;text-transform:uppercase;font-weight:600;color:${C_PRIMARY};margin-bottom:12px;">
					While you wait
				</div>
				<div style="font-family:${FF_SERIF};font-size:24px;line-height:1.22;color:${C_DEEP};font-weight:500;margin-bottom:22px;">
					A few doors that are <em style="font-family:${FF_STORY};font-style:italic;font-weight:400;color:${C_MUTED};">already open.</em>
				</div>

				<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
					<tr>
						<td valign="top" width="50%" style="padding:6px 8px 6px 0;">
							<a href="https://blueprint.ecohubs.community" style="display:block;background:${C_IVORY};border:1px solid ${C_LINE};border-radius:14px;padding:18px 20px;text-decoration:none;">
								<div style="font-family:${FF_SANS};font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:${C_MUTED};font-weight:600;margin-bottom:6px;">The Blueprint</div>
								<div style="font-family:${FF_SERIF};font-size:17px;color:${C_DEEP};font-weight:500;line-height:1.3;">Read the open-source guidebook <span style="color:${C_PRIMARY};">→</span></div>
							</a>
						</td>
						<td valign="top" width="50%" style="padding:6px 0 6px 8px;">
							<a href="https://discord.gg/Xnh7247Nq3" style="display:block;background:${C_IVORY};border:1px solid ${C_LINE};border-radius:14px;padding:18px 20px;text-decoration:none;">
								<div style="font-family:${FF_SANS};font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:${C_MUTED};font-weight:600;margin-bottom:6px;">Discord</div>
								<div style="font-family:${FF_SERIF};font-size:17px;color:${C_DEEP};font-weight:500;line-height:1.3;">Join the conversation already underway <span style="color:${C_PRIMARY};">→</span></div>
							</a>
						</td>
					</tr>
					<tr>
						<td valign="top" width="50%" style="padding:6px 8px 6px 0;">
							<a href="https://ecohubs.community/vision" style="display:block;background:${C_IVORY};border:1px solid ${C_LINE};border-radius:14px;padding:18px 20px;text-decoration:none;">
								<div style="font-family:${FF_SANS};font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:${C_MUTED};font-weight:600;margin-bottom:6px;">The Vision</div>
								<div style="font-family:${FF_SERIF};font-size:17px;color:${C_DEEP};font-weight:500;line-height:1.3;">Why we believe small, rooted places matter <span style="color:${C_PRIMARY};">→</span></div>
							</a>
						</td>
						<td valign="top" width="50%" style="padding:6px 0 6px 8px;">
							<a href="https://ecohubs.community" style="display:block;background:${C_IVORY};border:1px solid ${C_LINE};border-radius:14px;padding:18px 20px;text-decoration:none;">
								<div style="font-family:${FF_SANS};font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:${C_MUTED};font-weight:600;margin-bottom:6px;">Share</div>
								<div style="font-family:${FF_SERIF};font-size:17px;color:${C_DEEP};font-weight:500;line-height:1.3;">Pass it on to someone who'd want this <span style="color:${C_PRIMARY};">→</span></div>
							</a>
						</td>
					</tr>
				</table>

			</td></tr>

			<!-- Manifesto closer -->
			<tr><td style="padding:24px 40px 40px 40px;" class="px">
				<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C_DEEP};border-radius:18px;">
					<tr><td style="padding:44px 36px;text-align:center;">
						<div style="font-family:${FF_SERIF};font-size:24px;line-height:1.3;color:#f5f2ea;font-weight:500;margin-bottom:6px;">
							<em style="font-family:${FF_STORY};font-style:italic;font-weight:400;color:#9c9685;">The system does not provide —</em>
						</div>
						<div style="font-family:${FF_STORY};font-style:italic;font-size:28px;line-height:1.2;color:#a7f3d0;font-weight:500;margin-bottom:22px;">
							nature does.
						</div>
						<div style="width:48px;height:1px;background:${C_PRIMARY}80;margin:0 auto 22px auto;line-height:1px;font-size:0;">&nbsp;</div>
						<div style="font-family:${FF_SERIF};font-size:15px;line-height:1.65;color:#d4cfb8;max-width:420px;margin:0 auto;">
							We're glad you're here, ${name}. Whatever happens next — thank you for the trust it took to write.
						</div>
						<div style="font-family:${FF_STORY};font-style:italic;font-size:15px;color:#a7f3d0;margin-top:18px;">
							— Stefan, for the EcoHubs team
						</div>
					</td></tr>
				</table>
			</td></tr>

			<!-- Footer -->
			<tr><td style="background:${C_IVORY};padding:28px 40px;border-top:1px solid ${C_LINE};text-align:center;" class="px">
				<div style="font-family:${FF_SERIF};font-size:15px;color:${C_DEEP};font-weight:500;margin-bottom:4px;">EcoHubs.community</div>
				<div style="font-family:${FF_STORY};font-style:italic;font-size:13px;color:${C_MUTED};margin-bottom:14px;">Co-creating a regenerative way of life — one hub at a time.</div>
				<div style="font-family:${FF_SANS};font-size:12px;color:${C_MUTED};">
					<a href="https://ecohubs.community" style="color:${C_DARK};text-decoration:none;margin:0 6px;">Website</a>·
					<a href="https://mastodon.social/@ecohubs" style="color:${C_DARK};text-decoration:none;margin:0 6px;">Mastodon</a>·
					<a href="https://farcaster.xyz/ecohubs" style="color:${C_DARK};text-decoration:none;margin:0 6px;">Farcaster</a>·
					<a href="https://x.com/eco_hubs" style="color:${C_DARK};text-decoration:none;margin:0 6px;">X</a>·
					<a href="https://www.instagram.com/ecohubs_community/" style="color:${C_DARK};text-decoration:none;margin:0 6px;">Instagram</a>·
					<a href="https://github.com/ecohubs-community" style="color:${C_DARK};text-decoration:none;margin:0 6px;">GitHub</a>
				</div>
			</td></tr>

		</table>

	</td></tr>
</table>

</body>
</html>`;
}

export function getApplicationConfirmationText(name: string): string {
	return `
Hi ${name},

Your application has arrived. Someone here will read it slowly — not scan it — because that's how we want this community to feel from the very first moment.


WHAT HAPPENS NEXT
-----------------
01 · We read it
   Within 3–5 days. Not by an algorithm — by a person who cares about who is arriving.

02 · We write back
   We're choosing the first 500 founding members for this cohort. Whatever the answer, you'll hear it from a human, with care.

03 · We begin, together
   If it's a yes, we'll share next steps for joining the founding circle and shaping the Blueprint with us.


WHILE YOU WAIT
--------------
The Blueprint:  https://blueprint.ecohubs.community
Discord:        https://discord.gg/Xnh7247Nq3
The Vision:     https://ecohubs.community/vision
Share EcoHubs:  https://ecohubs.community


"The system does not provide — nature does."

We're glad you're here, ${name}. Whatever happens next — thank you for the trust it took to write.

— Stefan, for the EcoHubs team

---
EcoHubs.community — Co-creating a regenerative way of life, one hub at a time.

Website:    https://ecohubs.community
Mastodon:   https://mastodon.social/@ecohubs
Farcaster:  https://farcaster.xyz/ecohubs
X:          https://x.com/eco_hubs
Instagram:  https://www.instagram.com/ecohubs_community/
GitHub:     https://github.com/ecohubs-community
`;
}
