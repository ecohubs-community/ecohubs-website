export interface ContactEmailData {
	name: string;
	email: string;
	message: string;
	timestamp: string;
}

const FONT_INTER = `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`;
const FONT_PRIDI = `'Pridi', Georgia, 'Times New Roman', serif`;
const FONT_FRAUNCES = `'Fraunces', Georgia, 'Times New Roman', serif`;
const LOGO_URL = 'https://ecohubs.community/logo-symbol.png';

function nl2br(text: string): string {
	return text.replace(/\n/g, '<br>');
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

export function getContactEmailHTML(data: ContactEmailData): string {
	return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>New Message · EcoHubs</title>
<link href="https://fonts.googleapis.com/css2?family=Pridi:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Fraunces:ital,wght@0,400;0,500;1,400;1,500&display=swap" rel="stylesheet">
<style>
	body { margin:0; padding:0; background:#fbfbf9; }
	a { color:#064e3b; }
	@media (max-width: 640px) {
		.container { width:100% !important; border-radius:0 !important; }
		.px { padding-left:24px !important; padding-right:24px !important; }
		.hero-h1 { font-size:32px !important; line-height:1.1 !important; }
	}
</style>
</head>
<body style="margin:0;padding:0;background:#fbfbf9;font-family:${FONT_INTER};color:#1c1917;-webkit-font-smoothing:antialiased;">

<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">New message from ${data.name}</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#fbfbf9;">
	<tr><td align="center" style="padding:32px 16px;">

		<table role="presentation" class="container" width="640" cellpadding="0" cellspacing="0" border="0" style="width:640px;max-width:640px;background:#fbfbf9;border:1px solid #e7e2d4;border-radius:18px;overflow:hidden;">

			<!-- MASTHEAD -->
			<tr><td style="background:#0b2e24;padding:28px 40px 24px 40px;" class="px">
				<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
					<tr>
						<td align="left" style="font-family:${FONT_PRIDI};font-size:17px;color:#f5f2ea;font-weight:500;letter-spacing:0.01em;">
							<img src="${LOGO_URL}" alt="" width="24" height="24" style="display:inline-block;width:24px;height:24px;margin-right:10px;vertical-align:middle;border:0;outline:none;text-decoration:none;" />
							<span style="vertical-align:middle;">EcoHubs</span>
						</td>
						<td align="right" style="font-family:${FONT_INTER};font-size:10.5px;letter-spacing:0.22em;text-transform:uppercase;color:#a7f3d0;font-weight:600;">
							Contact form
						</td>
					</tr>
				</table>
			</td></tr>

			<!-- HERO -->
			<tr><td style="background:#f5f2ea;padding:48px 40px 40px 40px;" class="px">
				<div style="font-family:${FONT_INTER};font-size:10.5px;letter-spacing:0.22em;text-transform:uppercase;font-weight:600;color:#059669;margin:0 0 18px 0;">
					New message received
				</div>
				<div class="hero-h1" style="font-family:${FONT_PRIDI};font-size:38px;line-height:1.06;color:#0b2e24;font-weight:500;letter-spacing:-0.01em;margin:0 0 22px 0;">
					Someone wrote to <em style="font-family:${FONT_FRAUNCES};font-style:italic;font-weight:400;color:#059669;">say hello.</em>
				</div>
				<div style="font-family:${FONT_PRIDI};font-size:17px;line-height:1.55;color:#1c1917;font-weight:400;max-width:520px;">
					${data.name} just reached out through the contact form. A short, human reply within a day or two is what keeps this place feeling like a real place.
				</div>

				<!-- identity card -->
				<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:28px;background:#ffffff;border:1px solid #e7e2d4;border-radius:14px;">
					<tr>
						<td style="padding:20px 22px;">
							<div style="font-family:${FONT_INTER};font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:#6b7265;font-weight:600;margin-bottom:4px;">From</div>
							<div style="font-family:${FONT_PRIDI};font-size:22px;color:#0b2e24;font-weight:500;line-height:1.2;">${data.name}</div>
							<div style="font-family:${FONT_INTER};font-size:13px;color:#6b7265;margin-top:4px;">
								<a href="mailto:${data.email}" style="color:#064e3b;text-decoration:none;border-bottom:1px solid #064e3b40;">${data.email}</a>
							</div>
						</td>
						<td align="right" style="padding:20px 22px;border-left:1px solid #e7e2d4;width:180px;vertical-align:top;">
							<div style="font-family:${FONT_INTER};font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:#6b7265;font-weight:600;margin-bottom:6px;">Received</div>
							<div style="font-family:${FONT_FRAUNCES};font-style:italic;font-size:14px;color:#064e3b;line-height:1.4;">${formatTimestamp(data.timestamp)}</div>
						</td>
					</tr>
				</table>
			</td></tr>

			<!-- MESSAGE -->
			<tr><td style="background:#fbfbf9;padding:40px 40px 8px 40px;" class="px">
				<div style="font-family:${FONT_INTER};font-size:10.5px;letter-spacing:0.22em;text-transform:uppercase;font-weight:600;color:#059669;margin-bottom:14px;">
					Their message
				</div>
				<div style="font-family:${FONT_PRIDI};font-size:16px;line-height:1.7;color:#1c1917;background:#f5f2ea;border-left:2px solid #059669;padding:20px 22px;border-radius:0 6px 6px 0;">
					${nl2br(data.message)}
				</div>
			</td></tr>

			<!-- CTA -->
			<tr><td style="padding:32px 40px 40px 40px;" class="px">
				<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0b2e24;border-radius:18px;">
					<tr><td style="padding:36px 32px;text-align:center;">
						<div style="font-family:${FONT_INTER};font-size:10.5px;letter-spacing:0.22em;text-transform:uppercase;font-weight:600;color:#a7f3d0;margin-bottom:14px;">Your move</div>
						<div style="font-family:${FONT_PRIDI};font-size:22px;line-height:1.25;color:#f5f2ea;font-weight:500;margin-bottom:8px;">
							Write back to <em style="font-family:${FONT_FRAUNCES};font-style:italic;font-weight:400;color:#a7f3d0;">${data.name}</em>
						</div>
						<div style="font-family:${FONT_PRIDI};font-size:14px;line-height:1.5;color:#d4cfb8;max-width:380px;margin:0 auto 22px auto;">
							A message with a real person on the other end is rare. Take a quiet moment with this one.
						</div>
						<a href="mailto:${data.email}?subject=Re: Your message to EcoHubs"
						   style="display:inline-block;font-family:${FONT_INTER};font-size:14px;font-weight:500;color:#0b2e24;background:#f5f2ea;text-decoration:none;padding:14px 28px;border-radius:999px;">
							Reply to ${data.name} →
						</a>
					</td></tr>
				</table>
			</td></tr>

			<!-- FOOTER -->
			<tr><td style="background:#f5f2ea;padding:24px 40px;border-top:1px solid #e7e2d4;text-align:center;" class="px">
				<div style="font-family:${FONT_FRAUNCES};font-style:italic;font-size:13px;color:#6b7265;line-height:1.5;">
					Sent via the contact form on ecohubs.community · A living project, carried by many.
				</div>
			</td></tr>

		</table>

	</td></tr>
</table>

</body>
</html>`;
}

export function getContactEmailText(data: ContactEmailData): string {
	return `NEW MESSAGE · EcoHubs contact form

From:     ${data.name}
Email:    ${data.email}
Received: ${formatTimestamp(data.timestamp)}

----------------------------------------------------------------
THEIR MESSAGE
----------------------------------------------------------------

${data.message}

----------------------------------------------------------------
YOUR MOVE — write back to ${data.name}
Reply: ${data.email}

Sent via the contact form on ecohubs.community · A living project, carried by many.
`;
}

export function getContactConfirmationHTML(name: string): string {
	return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>We received your message</title>
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

<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">We received your message — and we're glad you wrote.</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#fbfbf9;">
	<tr><td align="center" style="padding:32px 16px;">

		<table role="presentation" class="container" width="640" cellpadding="0" cellspacing="0" border="0" style="width:640px;max-width:640px;background:#fbfbf9;border:1px solid #e7e2d4;border-radius:18px;overflow:hidden;">

			<!-- Masthead -->
			<tr><td style="background:#0b2e24;padding:22px 36px;" class="px">
				<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
					<tr>
						<td align="left" style="font-family:${FONT_PRIDI};font-size:17px;color:#f5f2ea;font-weight:500;letter-spacing:0.01em;">
							<img src="${LOGO_URL}" alt="" width="24" height="24" style="display:inline-block;width:24px;height:24px;margin-right:10px;vertical-align:middle;border:0;outline:none;text-decoration:none;" />
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
					Your message · received with care
				</div>
				<div class="hero-h1" style="font-family:${FONT_PRIDI};font-size:46px;line-height:1.04;color:#0b2e24;font-weight:500;letter-spacing:-0.01em;margin:0 0 24px 0;">
					Thank you, ${name}.<br>
					<em style="font-family:${FONT_FRAUNCES};font-style:italic;font-weight:400;color:#059669;">We're glad you wrote.</em>
				</div>
				<div style="font-family:${FONT_PRIDI};font-size:18px;line-height:1.6;color:#1c1917;max-width:480px;">
					Your note has arrived. Someone here will read it carefully — not auto-tag it — and write back, in their own words, soon.
				</div>
			</td></tr>

			<!-- Body -->
			<tr><td style="background:#fbfbf9;padding:48px 40px 24px 40px;" class="px">

				<div style="font-family:${FONT_INTER};font-size:10.5px;letter-spacing:0.22em;text-transform:uppercase;font-weight:600;color:#059669;margin-bottom:12px;">
					What happens next
				</div>
				<div style="font-family:${FONT_PRIDI};font-size:28px;line-height:1.2;color:#0b2e24;font-weight:500;margin-bottom:28px;">
					A day or two, <em style="font-family:${FONT_FRAUNCES};font-style:italic;font-weight:400;color:#6b7265;">then a real reply.</em>
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
										Within 24–48 hours. By a person, not a triage bot.
									</div>
								</td>
							</tr>
						</table>
					</td></tr>
					<tr><td style="padding:0 0 4px 0;">
						<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td width="42" valign="top" style="padding-top:6px;">
									<div style="font-family:${FONT_FRAUNCES};font-style:italic;font-size:18px;color:#059669;font-weight:500;">02</div>
								</td>
								<td valign="top" style="padding:0 0 0 22px;">
									<div style="font-family:${FONT_PRIDI};font-size:18px;color:#0b2e24;font-weight:500;line-height:1.3;margin-bottom:6px;">We write back</div>
									<div style="font-family:${FONT_PRIDI};font-size:15px;line-height:1.6;color:#1c1917;">
										With something thoughtful, in plain words. If your note needs a longer answer, we'll say so.
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
							<a href="https://ecohubs.community/join" style="display:block;background:#f5f2ea;border:1px solid #e7e2d4;border-radius:14px;padding:18px 20px;text-decoration:none;">
								<div style="font-family:${FONT_INTER};font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:#6b7265;font-weight:600;margin-bottom:6px;">Join us</div>
								<div style="font-family:${FONT_PRIDI};font-size:17px;color:#0b2e24;font-weight:500;line-height:1.3;">Apply to the founding circle <span style="color:#059669;">→</span></div>
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
							Thank you for writing, ${name}. A real reply is on its way.
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

export function getContactConfirmationText(name: string): string {
	return `Your message · received with care

Thank you, ${name}. We're glad you wrote.

Your note has arrived. Someone here will read it carefully — not auto-tag it — and write back, in their own words, soon.

WHAT HAPPENS NEXT — A day or two, then a real reply.

01 · We read it
   Within 24–48 hours. By a person, not a triage bot.

02 · We write back
   With something thoughtful, in plain words. If your note needs a longer answer, we'll say so.

WHILE YOU WAIT — A few doors that are already open.

· The Blueprint — read the open-source guidebook: https://blueprint.ecohubs.community
· Discord — join the conversation already underway: https://discord.gg/Xnh7247Nq3
· The Vision — why we believe small, rooted places matter: https://ecohubs.community/vision
· Join us — apply to the founding circle: https://ecohubs.community/join

----------------------------------------------------------------

The system does not provide — nature does.

Thank you for writing, ${name}. A real reply is on its way.

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
