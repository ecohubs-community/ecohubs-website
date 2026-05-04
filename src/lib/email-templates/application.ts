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

const FONT_INTER = `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`;
const FONT_PRIDI = `'Pridi', Georgia, 'Times New Roman', serif`;
const FONT_FRAUNCES = `'Fraunces', Georgia, 'Times New Roman', serif`;

function nl2br(text: string): string {
	return text.replace(/\n/g, '<br>');
}

function toArray(value: string | string[]): string[] {
	if (Array.isArray(value)) return value;
	return value
		.split(/\r?\n|,/)
		.map((s) => s.trim())
		.filter(Boolean);
}

function pill(label: string, light = false): string {
	const bg = light ? '#ffffff' : '#f5f2ea';
	return `<span style="display:inline-block;font-family:${FONT_INTER};font-size:12px;font-weight:500;color:#064e3b;background:${bg};border:1px solid #e7e2d4;padding:6px 12px;border-radius:999px;margin:0 6px 6px 0;">${label}</span>`;
}

function ratingBlock(label: string, n: number): string {
	const safe = Math.max(0, Math.min(10, n));
	const pct = safe * 10;
	return `
		<div style="font-family:${FONT_PRIDI};font-size:14px;color:#0b2e24;margin-bottom:6px;font-weight:500;">${label}</div>
		<div style="margin-bottom:18px;">
			<div style="font-family:${FONT_INTER};display:inline-block;">
				<span style="font-family:${FONT_FRAUNCES};font-style:italic;font-size:22px;color:#064e3b;font-weight:500;vertical-align:middle;">${safe}</span><span style="font-family:${FONT_INTER};font-size:13px;color:#6b7265;vertical-align:middle;">&nbsp;/&nbsp;10</span>
				<div style="display:inline-block;vertical-align:middle;margin-left:14px;width:160px;height:4px;background:#e7e2d4;border-radius:2px;overflow:hidden;">
					<div style="width:${pct}%;height:4px;background:#059669;border-radius:2px;line-height:4px;font-size:0;">&nbsp;</div>
				</div>
			</div>
		</div>`;
}

function quoteBox(content: string): string {
	return `<div style="font-family:${FONT_PRIDI};font-size:15px;line-height:1.6;color:#1c1917;background:#f5f2ea;border-left:2px solid #059669;padding:14px 16px;border-radius:0 6px 6px 0;">${content}</div>`;
}

function fieldRow(label: string, valueHtml: string, opts: { box?: boolean } = {}): string {
	const value = opts.box
		? quoteBox(valueHtml)
		: `<div style="font-family:${FONT_PRIDI};font-size:16px;line-height:1.5;color:#1c1917;">${valueHtml}</div>`;
	return `
		<tr><td style="padding:0 0 14px 0;">
			<div style="font-family:${FONT_INTER};font-size:10.5px;letter-spacing:0.18em;text-transform:uppercase;font-weight:600;color:#6b7265;margin:0 0 6px 0;">${label}</div>
			${value}
		</td></tr>`;
}

function chapterHeader(num: string, title: string, subtitle: string): string {
	return `
		<tr><td style="padding:0 0 18px 0;">
			<div style="font-family:${FONT_INTER};font-size:10.5px;letter-spacing:0.22em;text-transform:uppercase;font-weight:600;color:#059669;margin:0 0 10px 0;">Chapter ${num}</div>
			<div style="font-family:${FONT_PRIDI};font-size:24px;line-height:1.2;color:#0b2e24;font-weight:500;">
				${title} <em style="font-family:${FONT_FRAUNCES};font-style:italic;font-weight:400;color:#6b7265;">— ${subtitle}</em>
			</div>
			<div style="height:1px;background:linear-gradient(90deg, #064e3b40, transparent);margin:18px 0 0 0;line-height:1px;font-size:0;">&nbsp;</div>
		</td></tr>`;
}

function formatTimestamp(ts: string): string {
	return new Date(ts).toLocaleString('en-US', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		timeZoneName: 'short'
	});
}

export function getApplicationEmailHTML(data: ApplicationEmailData): string {
	const valueArr = toArray(data.values);
	const expArr = toArray(data.experienceAreas);

	const valuesHtml = valueArr.length
		? `<div>${valueArr.map((v) => pill(v)).join('')}</div>`
		: `<div style="font-family:${FONT_PRIDI};font-size:15px;color:#6b7265;font-style:italic;">No values selected</div>`;

	const experienceHtml =
		(expArr.length
			? `<div>${expArr.map((v) => pill(v, true)).join('')}</div>`
			: `<div style="font-family:${FONT_PRIDI};font-size:15px;color:#6b7265;font-style:italic;">No experience areas selected</div>`) +
		(data.experienceAreasOther
			? `<div style="margin-top:10px;">${quoteBox(nl2br(data.experienceAreasOther))}</div>`
			: '');

	const disagreementOther = data.disagreementResponseOther
		? `<div style="margin-top:8px;">${quoteBox(nl2br(data.disagreementResponseOther))}</div>`
		: '';
	const ideaNotChosenOther = data.ideaNotChosenOther
		? `<div style="margin-top:8px;">${quoteBox(nl2br(data.ideaNotChosenOther))}</div>`
		: '';

	const anythingElseRow = data.anythingElse
		? fieldRow('Anything else', nl2br(data.anythingElse), { box: true })
		: '';

	return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>New Application Submission · EcoHubs</title>
<link href="https://fonts.googleapis.com/css2?family=Pridi:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Fraunces:ital,wght@0,400;0,500;1,400;1,500&display=swap" rel="stylesheet">
<style>
	body { margin:0; padding:0; background:#fbfbf9; }
	a { color:#064e3b; }
	@media (max-width: 640px) {
		.container { width:100% !important; border-radius:0 !important; }
		.px { padding-left:24px !important; padding-right:24px !important; }
		.hero-h1 { font-size:32px !important; line-height:1.1 !important; }
		.story-h2 { font-size:22px !important; }
	}
</style>
</head>
<body style="margin:0;padding:0;background:#fbfbf9;font-family:${FONT_INTER};color:#1c1917;-webkit-font-smoothing:antialiased;">

<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">New application from ${data.fullName} · ${data.location}</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#fbfbf9;">
	<tr><td align="center" style="padding:32px 16px;">

		<table role="presentation" class="container" width="680" cellpadding="0" cellspacing="0" border="0" style="width:680px;max-width:680px;background:#fbfbf9;border:1px solid #e7e2d4;border-radius:18px;overflow:hidden;">

			<!-- MASTHEAD -->
			<tr><td style="background:#0b2e24;padding:28px 40px 24px 40px;" class="px">
				<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
					<tr>
						<td align="left" style="font-family:${FONT_PRIDI};font-size:17px;color:#f5f2ea;font-weight:500;letter-spacing:0.01em;">
							<img src="https://ecohubs.community/logo-symbol.png" alt="" width="24" height="24" style="display:inline-block;width:24px;height:24px;margin-right:10px;vertical-align:middle;border:0;outline:none;text-decoration:none;" />
							<span style="vertical-align:middle;">EcoHubs</span>
						</td>
						<td align="right" style="font-family:${FONT_INTER};font-size:10.5px;letter-spacing:0.22em;text-transform:uppercase;color:#a7f3d0;font-weight:600;">
							Member application
						</td>
					</tr>
				</table>
			</td></tr>

			<!-- HERO -->
			<tr><td style="background:#f5f2ea;padding:48px 40px 44px 40px;" class="px">
				<div style="font-family:${FONT_INTER};font-size:10.5px;letter-spacing:0.22em;text-transform:uppercase;font-weight:600;color:#059669;margin:0 0 18px 0;">
					New application received
				</div>
				<div class="hero-h1" style="font-family:${FONT_PRIDI};font-size:42px;line-height:1.05;color:#0b2e24;font-weight:500;letter-spacing:-0.01em;margin:0 0 22px 0;">
					Someone wants to <em style="font-family:${FONT_FRAUNCES};font-style:italic;font-weight:400;color:#059669;">build this</em> with us.
				</div>
				<div style="font-family:${FONT_PRIDI};font-size:18px;line-height:1.55;color:#1c1917;font-weight:400;max-width:520px;">
					${data.fullName} just sent in their application from ${data.location}. Take a quiet moment with it — every voice that arrives shapes what this becomes.
				</div>

				<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:32px;background:#ffffff;border:1px solid #e7e2d4;border-radius:14px;">
					<tr>
						<td style="padding:20px 22px;">
							<div style="font-family:${FONT_INTER};font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:#6b7265;font-weight:600;margin-bottom:4px;">Applicant</div>
							<div style="font-family:${FONT_PRIDI};font-size:22px;color:#0b2e24;font-weight:500;line-height:1.2;">${data.fullName}</div>
							<div style="font-family:${FONT_INTER};font-size:13px;color:#6b7265;margin-top:4px;">
								<a href="mailto:${data.email}" style="color:#064e3b;text-decoration:none;border-bottom:1px solid #064e3b40;">${data.email}</a>
							</div>
						</td>
						<td align="right" style="padding:20px 22px;border-left:1px solid #e7e2d4;width:180px;vertical-align:top;">
							<div style="font-family:${FONT_INTER};font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:#6b7265;font-weight:600;margin-bottom:6px;">Submitted</div>
							<div style="font-family:${FONT_FRAUNCES};font-style:italic;font-size:14px;color:#064e3b;line-height:1.4;">${formatTimestamp(data.timestamp)}</div>
						</td>
					</tr>
				</table>
			</td></tr>

			<!-- CHAPTER 01 -->
			<tr><td style="background:#fbfbf9;padding:44px 40px 8px 40px;" class="px">
				<div style="font-family:${FONT_FRAUNCES};font-style:italic;font-size:15px;color:#059669;font-weight:500;margin-bottom:6px;">01</div>
				<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
					${chapterHeader('one', 'Basic information', 'who, where, and how they found us')}
					${fieldRow('Location', data.location)}
					${fieldRow('Time availability', data.timeAvailability)}
					${fieldRow('Languages', nl2br(data.languages), { box: true })}
					${fieldRow('How discovered', nl2br(data.discovery), { box: true })}
				</table>
			</td></tr>

			<!-- CHAPTER 02 -->
			<tr><td style="background:#fbfbf9;padding:32px 40px 8px 40px;" class="px">
				<div style="font-family:${FONT_FRAUNCES};font-style:italic;font-size:15px;color:#059669;font-weight:500;margin-bottom:6px;">02</div>
				<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
					${chapterHeader('two', 'Values & vision', 'what resonates with them')}
					${fieldRow('What resonates with EcoHubs', nl2br(data.resonanceCombined), { box: true })}
					${fieldRow('Living well in community & alignment with nature', nl2br(data.natureCommunityMeaning), { box: true })}
					<tr><td style="padding:0 0 14px 0;">
						<div style="font-family:${FONT_INTER};font-size:10.5px;letter-spacing:0.18em;text-transform:uppercase;font-weight:600;color:#6b7265;margin:0 0 10px 0;">Essential values (up to 3)</div>
						${valuesHtml}
					</td></tr>
				</table>
			</td></tr>

			<!-- CHAPTER 03 -->
			<tr><td style="background:#fbfbf9;padding:32px 40px 8px 40px;" class="px">
				<div style="font-family:${FONT_FRAUNCES};font-style:italic;font-size:15px;color:#059669;font-weight:500;margin-bottom:6px;">03</div>
				<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
					${chapterHeader('three', 'Emotional maturity', '& how they communicate')}
					${fieldRow('What helps groups work', nl2br(data.groupWork), { box: true })}
					${fieldRow('A teamwork moment they remember', nl2br(data.teamworkMoment), { box: true })}
					<tr><td style="padding:0 0 14px 0;">
						<div style="font-family:${FONT_INTER};font-size:10.5px;letter-spacing:0.18em;text-transform:uppercase;font-weight:600;color:#6b7265;margin:0 0 6px 0;">Disagreement response</div>
						<div style="font-family:${FONT_PRIDI};font-size:16px;line-height:1.5;color:#1c1917;">${data.disagreementResponse}</div>
						${disagreementOther}
					</td></tr>
					<tr><td style="padding:0 0 14px 0;">
						<div style="font-family:${FONT_INTER};font-size:10.5px;letter-spacing:0.18em;text-transform:uppercase;font-weight:600;color:#6b7265;margin:0 0 6px 0;">When their idea isn't chosen</div>
						<div style="font-family:${FONT_PRIDI};font-size:16px;line-height:1.5;color:#1c1917;">${data.ideaNotChosen}</div>
						${ideaNotChosenOther}
					</td></tr>
				</table>

				<!-- Self-rated bars -->
				<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:18px 0 8px 0;background:#f5f2ea;border-radius:12px;">
					<tr><td style="padding:22px 24px;">
						<div style="font-family:${FONT_INTER};font-size:10.5px;letter-spacing:0.22em;text-transform:uppercase;font-weight:600;color:#6b7265;margin-bottom:18px;">Self-rated</div>
						${ratingBlock('Comfort receiving feedback', data.comfortFeedback)}
						${ratingBlock('Comfort asking for help', data.comfortAskingHelp)}
						${ratingBlock('Adapting to change', data.adaptToChange)}
					</td></tr>
				</table>

				<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
					${fieldRow('Decision-making value', data.decisionMakingValue)}
				</table>
			</td></tr>

			<!-- CHAPTER 04 -->
			<tr><td style="background:#fbfbf9;padding:32px 40px 8px 40px;" class="px">
				<div style="font-family:${FONT_FRAUNCES};font-style:italic;font-size:15px;color:#059669;font-weight:500;margin-bottom:6px;">04</div>
				<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
					${chapterHeader('four', 'Motivation, contribution', '& skills they carry')}
					${fieldRow('Motivation', nl2br(data.motivation), { box: true })}
					${fieldRow('What they want to contribute', nl2br(data.contribution), { box: true })}
					${fieldRow('What they hope to receive or learn', nl2br(data.receiveLearn), { box: true })}
					<tr><td style="padding:0 0 14px 0;">
						<div style="font-family:${FONT_INTER};font-size:10.5px;letter-spacing:0.18em;text-transform:uppercase;font-weight:600;color:#6b7265;margin:0 0 10px 0;">Experience areas</div>
						${experienceHtml}
					</td></tr>
					${fieldRow('A project they\'re proud of', nl2br(data.proudProject), { box: true })}
					${fieldRow('Where they do their best work', nl2br(data.bestWorkEnvironments), { box: true })}
				</table>
			</td></tr>

			<!-- CHAPTER 05 -->
			<tr><td style="background:#fbfbf9;padding:32px 40px 8px 40px;" class="px">
				<div style="font-family:${FONT_FRAUNCES};font-style:italic;font-size:15px;color:#059669;font-weight:500;margin-bottom:6px;">05</div>
				<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
					${chapterHeader('five', 'Stability, challenges', '& how they want to start')}
					${fieldRow('How they manage commitments', nl2br(data.manageCommitments), { box: true })}
					${fieldRow('Honest about collaboration challenges', nl2br(data.collaborationChallengesMerged), { box: true })}
					${fieldRow('Concerns or doubts', nl2br(data.concernsDoubts), { box: true })}
					${fieldRow('How they\'d like to start contributing', nl2br(data.howStartContributing), { box: true })}
					${anythingElseRow}
				</table>
			</td></tr>

			<!-- CTA -->
			<tr><td style="padding:32px 40px 40px 40px;" class="px">
				<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0b2e24;border-radius:18px;">
					<tr><td style="padding:40px 36px;text-align:center;">
						<div style="font-family:${FONT_INTER};font-size:10.5px;letter-spacing:0.22em;text-transform:uppercase;font-weight:600;color:#a7f3d0;margin-bottom:14px;">Your move</div>
						<div style="font-family:${FONT_PRIDI};font-size:24px;line-height:1.25;color:#f5f2ea;font-weight:500;margin-bottom:8px;">
							Write back to <em style="font-family:${FONT_FRAUNCES};font-style:italic;font-weight:400;color:#a7f3d0;">${data.fullName}</em>
						</div>
						<div style="font-family:${FONT_PRIDI};font-size:14px;line-height:1.5;color:#d4cfb8;max-width:380px;margin:0 auto 24px auto;">
							A short, human reply within a few days is what makes the difference between an application form and a community.
						</div>
						<a href="mailto:${data.email}?subject=Re: Your EcoHubs application"
						   style="display:inline-block;font-family:${FONT_INTER};font-size:14px;font-weight:500;color:#0b2e24;background:#f5f2ea;text-decoration:none;padding:14px 28px;border-radius:999px;">
							Reply to ${data.fullName} →
						</a>
					</td></tr>
				</table>
			</td></tr>

			<!-- FOOTER -->
			<tr><td style="background:#f5f2ea;padding:24px 40px;border-top:1px solid #e7e2d4;text-align:center;" class="px">
				<div style="font-family:${FONT_FRAUNCES};font-style:italic;font-size:13px;color:#6b7265;line-height:1.5;">
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
	const valueArr = toArray(data.values);
	const expArr = toArray(data.experienceAreas);

	return `NEW APPLICATION RECEIVED · EcoHubs

${data.fullName} just sent in their application from ${data.location}.
Submitted: ${formatTimestamp(data.timestamp)}
Email: ${data.email}

================================================================
CHAPTER 01 — Basic information
================================================================

Location:
${data.location}

Time availability:
${data.timeAvailability}

Languages:
${data.languages}

How discovered:
${data.discovery}

================================================================
CHAPTER 02 — Values & vision
================================================================

What resonates with EcoHubs:
${data.resonanceCombined}

Living well in community & alignment with nature:
${data.natureCommunityMeaning}

Essential values (up to 3):
${valueArr.length ? valueArr.join(', ') : '—'}

================================================================
CHAPTER 03 — Emotional maturity & how they communicate
================================================================

What helps groups work:
${data.groupWork}

A teamwork moment they remember:
${data.teamworkMoment}

Disagreement response:
${data.disagreementResponse}${data.disagreementResponseOther ? `\n  ↳ ${data.disagreementResponseOther}` : ''}

When their idea isn't chosen:
${data.ideaNotChosen}${data.ideaNotChosenOther ? `\n  ↳ ${data.ideaNotChosenOther}` : ''}

Self-rated:
  Comfort receiving feedback ........ ${data.comfortFeedback}/10
  Comfort asking for help ........... ${data.comfortAskingHelp}/10
  Adapting to change ................ ${data.adaptToChange}/10

Decision-making value:
${data.decisionMakingValue}

================================================================
CHAPTER 04 — Motivation, contribution & skills
================================================================

Motivation:
${data.motivation}

What they want to contribute:
${data.contribution}

What they hope to receive or learn:
${data.receiveLearn}

Experience areas:
${expArr.length ? expArr.join(', ') : '—'}${data.experienceAreasOther ? `\n  ↳ ${data.experienceAreasOther}` : ''}

A project they're proud of:
${data.proudProject}

Where they do their best work:
${data.bestWorkEnvironments}

================================================================
CHAPTER 05 — Stability, challenges & how they want to start
================================================================

How they manage commitments:
${data.manageCommitments}

Honest about collaboration challenges:
${data.collaborationChallengesMerged}

Concerns or doubts:
${data.concernsDoubts}

How they'd like to start contributing:
${data.howStartContributing}
${data.anythingElse ? `\nAnything else:\n${data.anythingElse}\n` : ''}
----------------------------------------------------------------
YOUR MOVE — write back to ${data.fullName}
Reply: ${data.email}

Submitted via ecohubs.community · A living project, carried by many.
`;
}

export function getApplicationConfirmationHTML(name: string): string {
	return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Your EcoHubs application</title>
<link href="https://fonts.googleapis.com/css2?family=Pridi:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Fraunces:ital,wght@0,400;0,500;1,400;1,500&display=swap" rel="stylesheet">
<style>
	body { margin:0; padding:0; background:#fbfbf9; }
	a { color:#064e3b; }
	@media (max-width: 640px) {
		.container { width:100% !important; border-radius:0 !important; }
		.px { padding-left:24px !important; padding-right:24px !important; }
		.hero-h1 { font-size:34px !important; line-height:1.08 !important; }
	}
</style>
</head>
<body style="margin:0;padding:0;background:#fbfbf9;font-family:${FONT_INTER};color:#1c1917;-webkit-font-smoothing:antialiased;">

<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">We received your application — and we're glad you wrote.</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#fbfbf9;">
	<tr><td align="center" style="padding:32px 16px;">

		<table role="presentation" class="container" width="640" cellpadding="0" cellspacing="0" border="0" style="width:640px;max-width:640px;background:#fbfbf9;border:1px solid #e7e2d4;border-radius:18px;overflow:hidden;">

			<!-- Masthead -->
			<tr><td style="background:#0b2e24;padding:22px 36px;" class="px">
				<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
					<tr>
						<td align="left" style="font-family:${FONT_PRIDI};font-size:17px;color:#f5f2ea;font-weight:500;letter-spacing:0.01em;">
							<img src="https://ecohubs.community/logo-symbol.png" alt="" width="24" height="24" style="display:inline-block;width:24px;height:24px;margin-right:10px;vertical-align:middle;border:0;outline:none;text-decoration:none;" />
							<span style="vertical-align:middle;">EcoHubs</span>
						</td>
						<td align="right" style="font-family:${FONT_INTER};font-size:10.5px;letter-spacing:0.22em;text-transform:uppercase;color:#a7f3d0;font-weight:600;">
							A living project
						</td>
					</tr>
				</table>
			</td></tr>

			<!-- Hero -->
			<tr><td style="background:#f5f2ea;padding:56px 40px 48px 40px;" class="px">
				<div style="font-family:${FONT_INTER};font-size:10.5px;letter-spacing:0.22em;text-transform:uppercase;font-weight:600;color:#059669;margin:0 0 22px 0;">
					Your application · received with care
				</div>
				<div class="hero-h1" style="font-family:${FONT_PRIDI};font-size:46px;line-height:1.04;color:#0b2e24;font-weight:500;letter-spacing:-0.01em;margin:0 0 24px 0;">
					Thank you, ${name}.<br>
					<em style="font-family:${FONT_FRAUNCES};font-style:italic;font-weight:400;color:#059669;">We're glad you wrote.</em>
				</div>
				<div style="font-family:${FONT_PRIDI};font-size:18px;line-height:1.6;color:#1c1917;max-width:480px;">
					Your application has arrived. Someone here will read it slowly — not scan it — because that's how we want this community to feel from the very first moment.
				</div>
			</td></tr>

			<!-- Body -->
			<tr><td style="background:#fbfbf9;padding:48px 40px 24px 40px;" class="px">

				<div style="font-family:${FONT_INTER};font-size:10.5px;letter-spacing:0.22em;text-transform:uppercase;font-weight:600;color:#059669;margin-bottom:12px;">
					What happens next
				</div>
				<div style="font-family:${FONT_PRIDI};font-size:28px;line-height:1.2;color:#0b2e24;font-weight:500;margin-bottom:28px;">
					A few quiet days, <em style="font-family:${FONT_FRAUNCES};font-style:italic;font-weight:400;color:#6b7265;">then a real reply.</em>
				</div>

				<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
					<tr><td style="padding:4px 0 22px 0;">
						<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td width="42" valign="top" style="padding-top:6px;">
									<div style="font-family:${FONT_FRAUNCES};font-style:italic;font-size:18px;color:#059669;font-weight:500;">01</div>
								</td>
								<td valign="top" style="border-left:1px solid #e7e2d4;padding:0 0 0 22px;">
									<div style="font-family:${FONT_PRIDI};font-size:18px;color:#0b2e24;font-weight:500;line-height:1.3;margin-bottom:6px;">We read it</div>
									<div style="font-family:${FONT_PRIDI};font-size:15px;line-height:1.6;color:#1c1917;">
										Within 3–5 days. Not by an algorithm — by people in our community who care about who is arriving.
									</div>
								</td>
							</tr>
						</table>
					</td></tr>
					<tr><td style="padding:0 0 22px 0;">
						<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td width="42" valign="top" style="padding-top:6px;">
									<div style="font-family:${FONT_FRAUNCES};font-style:italic;font-size:18px;color:#059669;font-weight:500;">02</div>
								</td>
								<td valign="top" style="border-left:1px solid #e7e2d4;padding:0 0 0 22px;">
									<div style="font-family:${FONT_PRIDI};font-size:18px;color:#0b2e24;font-weight:500;line-height:1.3;margin-bottom:6px;">We write back</div>
									<div style="font-family:${FONT_PRIDI};font-size:15px;line-height:1.6;color:#1c1917;">
										We're selecting the first 150 founding members for this cohort. Whatever the answer, you'll receive a thoughtful, personalized response.
									</div>
								</td>
							</tr>
						</table>
					</td></tr>
					<tr><td style="padding:0 0 4px 0;">
						<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td width="42" valign="top" style="padding-top:6px;">
									<div style="font-family:${FONT_FRAUNCES};font-style:italic;font-size:18px;color:#d97706;font-weight:500;">03</div>
								</td>
								<td valign="top" style="padding:0 0 0 22px;">
									<div style="font-family:${FONT_PRIDI};font-size:18px;color:#0b2e24;font-weight:500;line-height:1.3;margin-bottom:6px;">We begin, together</div>
									<div style="font-family:${FONT_PRIDI};font-size:15px;line-height:1.6;color:#1c1917;">
										If it's a yes, we'll share next steps for joining the founding circle and shaping the Blueprint with us.
									</div>
								</td>
							</tr>
						</table>
					</td></tr>
				</table>

				<div style="height:1px;background:linear-gradient(90deg, transparent, #064e3b30, transparent);margin:36px 0 32px 0;line-height:1px;font-size:0;">&nbsp;</div>

				<div style="font-family:${FONT_INTER};font-size:10.5px;letter-spacing:0.22em;text-transform:uppercase;font-weight:600;color:#059669;margin-bottom:12px;">
					While you wait
				</div>
				<div style="font-family:${FONT_PRIDI};font-size:24px;line-height:1.22;color:#0b2e24;font-weight:500;margin-bottom:22px;">
					A few doors that are <em style="font-family:${FONT_FRAUNCES};font-style:italic;font-weight:400;color:#6b7265;">already open.</em>
				</div>

				<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
					<tr>
						<td valign="top" width="50%" style="padding:6px 8px 6px 0;">
							<a href="https://blueprint.ecohubs.community" style="display:block;background:#f5f2ea;border:1px solid #e7e2d4;border-radius:14px;padding:18px 20px;text-decoration:none;">
								<div style="font-family:${FONT_INTER};font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:#6b7265;font-weight:600;margin-bottom:6px;">The Blueprint</div>
								<div style="font-family:${FONT_PRIDI};font-size:17px;color:#0b2e24;font-weight:500;line-height:1.3;">Read the open-source guidebook <span style="color:#059669;">→</span></div>
							</a>
						</td>
						<td valign="top" width="50%" style="padding:6px 0 6px 8px;">
							<a href="https://discord.gg/Xnh7247Nq3" style="display:block;background:#f5f2ea;border:1px solid #e7e2d4;border-radius:14px;padding:18px 20px;text-decoration:none;">
								<div style="font-family:${FONT_INTER};font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:#6b7265;font-weight:600;margin-bottom:6px;">Discord</div>
								<div style="font-family:${FONT_PRIDI};font-size:17px;color:#0b2e24;font-weight:500;line-height:1.3;">Join the conversation already underway <span style="color:#059669;">→</span></div>
							</a>
						</td>
					</tr>
					<tr>
						<td valign="top" width="50%" style="padding:6px 8px 6px 0;">
							<a href="https://ecohubs.community/vision" style="display:block;background:#f5f2ea;border:1px solid #e7e2d4;border-radius:14px;padding:18px 20px;text-decoration:none;">
								<div style="font-family:${FONT_INTER};font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:#6b7265;font-weight:600;margin-bottom:6px;">The Vision</div>
								<div style="font-family:${FONT_PRIDI};font-size:17px;color:#0b2e24;font-weight:500;line-height:1.3;">Why we believe small, rooted places matter <span style="color:#059669;">→</span></div>
							</a>
						</td>
						<td valign="top" width="50%" style="padding:6px 0 6px 8px;">
							<a href="https://ecohubs.community" style="display:block;background:#f5f2ea;border:1px solid #e7e2d4;border-radius:14px;padding:18px 20px;text-decoration:none;">
								<div style="font-family:${FONT_INTER};font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:#6b7265;font-weight:600;margin-bottom:6px;">Share</div>
								<div style="font-family:${FONT_PRIDI};font-size:17px;color:#0b2e24;font-weight:500;line-height:1.3;">Pass it on to someone who'd want this <span style="color:#059669;">→</span></div>
							</a>
						</td>
					</tr>
				</table>

			</td></tr>

			<!-- Manifesto closer -->
			<tr><td style="padding:24px 40px 40px 40px;" class="px">
				<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0b2e24;border-radius:18px;">
					<tr><td style="padding:44px 36px;text-align:center;">
						<div style="font-family:${FONT_PRIDI};font-size:24px;line-height:1.3;color:#f5f2ea;font-weight:500;margin-bottom:6px;">
							<em style="font-family:${FONT_FRAUNCES};font-style:italic;font-weight:400;color:#9c9685;">The system does not provide —</em>
						</div>
						<div style="font-family:${FONT_FRAUNCES};font-style:italic;font-size:28px;line-height:1.2;color:#a7f3d0;font-weight:500;margin-bottom:22px;">
							nature does.
						</div>
						<div style="width:48px;height:1px;background:#05966980;margin:0 auto 22px auto;line-height:1px;font-size:0;">&nbsp;</div>
						<div style="font-family:${FONT_PRIDI};font-size:15px;line-height:1.65;color:#d4cfb8;max-width:420px;margin:0 auto;">
							We're glad you're here, ${name}. Whatever happens next — thank you for the trust it took to write.
						</div>
						<div style="font-family:${FONT_FRAUNCES};font-style:italic;font-size:15px;color:#a7f3d0;margin-top:18px;">
							— Stefan, for the EcoHubs team
						</div>
					</td></tr>
				</table>
			</td></tr>

			<!-- Footer -->
			<tr><td style="background:#f5f2ea;padding:28px 40px;border-top:1px solid #e7e2d4;text-align:center;" class="px">
				<div style="font-family:${FONT_PRIDI};font-size:15px;color:#0b2e24;font-weight:500;margin-bottom:4px;">EcoHubs.community</div>
				<div style="font-family:${FONT_FRAUNCES};font-style:italic;font-size:13px;color:#6b7265;margin-bottom:14px;">Co-creating a regenerative way of life — one hub at a time.</div>
				<div style="font-family:${FONT_INTER};font-size:12px;color:#6b7265;">
					<a href="https://ecohubs.community" style="color:#064e3b;text-decoration:none;margin:0 6px;">Website</a>·
					<a href="https://mastodon.social/@ecohubs" style="color:#064e3b;text-decoration:none;margin:0 6px;">Mastodon</a>·
					<a href="https://farcaster.xyz/ecohubs" style="color:#064e3b;text-decoration:none;margin:0 6px;">Farcaster</a>·
					<a href="https://x.com/eco_hubs" style="color:#064e3b;text-decoration:none;margin:0 6px;">X</a>·
					<a href="https://www.instagram.com/ecohubs_community/" style="color:#064e3b;text-decoration:none;margin:0 6px;">Instagram</a>·
					<a href="https://github.com/ecohubs-community" style="color:#064e3b;text-decoration:none;margin:0 6px;">GitHub</a>
				</div>
			</td></tr>

		</table>

	</td></tr>
</table>

</body>
</html>`;
}

export function getApplicationConfirmationText(name: string): string {
	return `Your application · received with care

Thank you, ${name}. We're glad you wrote.

Your application has arrived. Someone here will read it slowly — not scan it — because that's how we want this community to feel from the very first moment.

WHAT HAPPENS NEXT — A few quiet days, then a real reply.

01 · We read it
   Within 3–5 days. Not by an algorithm — by a person who cares about who is arriving.

02 · We write back
   We're selecting the first 150 founding members for this cohort. Whatever the answer, you'll receive a thoughtful, personalized response.

03 · We begin, together
   If it's a yes, we'll share next steps for joining the founding circle and shaping the Blueprint with us.

WHILE YOU WAIT — A few doors that are already open.

· The Blueprint — read the open-source guidebook: https://blueprint.ecohubs.community
· Discord — join the conversation already underway: https://discord.gg/Xnh7247Nq3
· The Vision — why we believe small, rooted places matter: https://ecohubs.community/vision
· Share — pass it on to someone who'd want this: https://ecohubs.community

----------------------------------------------------------------

The system does not provide — nature does.

We're glad you're here, ${name}. Whatever happens next — thank you for the trust it took to write.

— Stefan, for the EcoHubs team

----------------------------------------------------------------
EcoHubs.community
Co-creating a regenerative way of life — one hub at a time.

Website:   https://ecohubs.community
Mastodon:  https://mastodon.social/@ecohubs
Farcaster: https://farcaster.xyz/ecohubs
X:         https://x.com/eco_hubs
Instagram: https://www.instagram.com/ecohubs_community/
GitHub:    https://github.com/ecohubs-community
`;
}
