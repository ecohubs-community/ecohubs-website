<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import { SEO_CONFIG, generateBreadcrumbs } from '$lib/config/seo';
</script>

<SEO
	title={SEO_CONFIG.pages.privacy.title}
	description={SEO_CONFIG.pages.privacy.description}
	breadcrumbs={generateBreadcrumbs('privacy')}
/>

<section class="py-16 md:py-24">
	<div class="max-w-4xl mx-auto px-4">
		<h1 class="font-serif text-4xl md:text-5xl font-bold text-ecohubs-dark mb-8">Privacy Policy</h1>

		<p class="text-gray-600 mb-8">
			Last updated: January 2025
		</p>

		<div class="prose prose-lg max-w-none text-gray-700">
			<p>
				EcoHubs.community ("we," "us," or "our") is committed to protecting your personal data in
				accordance with Ecuador's Organic Law on Personal Data Protection (Ley Orgánica de
				Protección de Datos Personales - LOPDP) and international data protection standards.
			</p>

			<h2 class="font-serif text-2xl font-semibold text-ecohubs-dark mt-10 mb-4">
				1. Data Controller
			</h2>
			<p>
				The data controller responsible for your personal data is:
			</p>
			<ul class="list-disc pl-6 space-y-2">
				<li><strong>Entity:</strong> EcoHubs.community</li>
				<li><strong>Location:</strong> Ecuador</li>
				<li><strong>Contact:</strong> privacy@ecohubs.community</li>
			</ul>

			<h2 class="font-serif text-2xl font-semibold text-ecohubs-dark mt-10 mb-4">
				2. Legal Basis for Processing
			</h2>
			<p>
				In accordance with Article 10 of the LOPDP, we process your personal data based on the
				following legal grounds:
			</p>
			<ul class="list-disc pl-6 space-y-2">
				<li>
					<strong>Consent:</strong> When you voluntarily provide information through our contact or application
					forms
				</li>
				<li>
					<strong>Legitimate Interest:</strong> For website analytics to improve our services (with anonymized
					data)
				</li>
				<li>
					<strong>Legal Obligation:</strong> When required by applicable laws
				</li>
			</ul>

			<h2 class="font-serif text-2xl font-semibold text-ecohubs-dark mt-10 mb-4">
				3. Personal Data We Collect
			</h2>
			<p>We may collect the following types of personal data:</p>

			<h3 class="font-semibold text-xl text-ecohubs-dark mt-6 mb-3">3.1 Contact Form Data</h3>
			<ul class="list-disc pl-6 space-y-2">
				<li>Name</li>
				<li>Email address</li>
				<li>Message content</li>
			</ul>

			<h3 class="font-semibold text-xl text-ecohubs-dark mt-6 mb-3">3.2 Application Form Data</h3>
			<ul class="list-disc pl-6 space-y-2">
				<li>Full name</li>
				<li>Email address</li>
				<li>Location/country</li>
				<li>Skills and experience</li>
				<li>Motivation and interests</li>
			</ul>

			<h3 class="font-semibold text-xl text-ecohubs-dark mt-6 mb-3">3.3 Automatically Collected Data</h3>
			<ul class="list-disc pl-6 space-y-2">
				<li>IP address (anonymized)</li>
				<li>Browser type and version</li>
				<li>Pages visited and time spent</li>
				<li>Referring website</li>
			</ul>

			<h2 class="font-serif text-2xl font-semibold text-ecohubs-dark mt-10 mb-4">
				4. Purpose of Processing
			</h2>
			<p>
				In compliance with the transparency principle of the LOPDP, we use your personal data for:
			</p>
			<ul class="list-disc pl-6 space-y-2">
				<li>Responding to your inquiries and messages</li>
				<li>Processing community membership applications</li>
				<li>Sending relevant updates about EcoHubs.community (with your consent)</li>
				<li>Improving our website and services through anonymized analytics</li>
				<li>Complying with legal obligations</li>
			</ul>

			<h2 class="font-serif text-2xl font-semibold text-ecohubs-dark mt-10 mb-4">
				5. Cookies and Analytics
			</h2>
			<p>
				We use cookies and similar technologies to enhance your experience:
			</p>

			<h3 class="font-semibold text-xl text-ecohubs-dark mt-6 mb-3">5.1 Essential Cookies</h3>
			<p>
				These are necessary for the website to function and cannot be disabled. They include cookies
				for remembering your cookie consent preferences.
			</p>

			<h3 class="font-semibold text-xl text-ecohubs-dark mt-6 mb-3">5.2 Analytics Cookies (Google Analytics 4)</h3>
			<p>
				With your consent, we use Google Analytics 4 to understand how visitors interact with our
				website. We have configured GA4 with privacy-enhancing settings:
			</p>
			<ul class="list-disc pl-6 space-y-2">
				<li>IP anonymization enabled</li>
				<li>Secure cookie flags (SameSite=Strict)</li>
				<li>No data sharing with Google for advertising purposes</li>
			</ul>
			<p class="mt-4">
				You can withdraw your consent at any time by clearing your browser cookies and declining
				when the consent banner appears again.
			</p>

			<h2 class="font-serif text-2xl font-semibold text-ecohubs-dark mt-10 mb-4">
				6. Third-Party Services
			</h2>
			<p>We use the following third-party services that may process your data:</p>
			<ul class="list-disc pl-6 space-y-2">
				<li>
					<strong>Ghost CMS:</strong> For blog content delivery
				</li>
				<li>
					<strong>Google Analytics:</strong> For website analytics (consent-based)
				</li>
			</ul>
			<p class="mt-4">
				Each third-party service has its own privacy policy governing their data processing
				activities.
			</p>

			<h2 class="font-serif text-2xl font-semibold text-ecohubs-dark mt-10 mb-4">
				7. Your Rights Under LOPDP
			</h2>
			<p>
				Under Ecuador's LOPDP, you have the following rights regarding your personal data:
			</p>
			<ul class="list-disc pl-6 space-y-2">
				<li>
					<strong>Right of Access:</strong> Request information about what personal data we hold about
					you
				</li>
				<li>
					<strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete data
				</li>
				<li>
					<strong>Right to Erasure:</strong> Request deletion of your personal data
				</li>
				<li>
					<strong>Right to Data Portability:</strong> Receive your data in a structured, commonly used
					format
				</li>
				<li>
					<strong>Right to Withdraw Consent:</strong> Withdraw consent at any time without affecting
					the lawfulness of prior processing
				</li>
				<li>
					<strong>Right to Object:</strong> Object to processing based on legitimate interests
				</li>
			</ul>
			<p class="mt-4">
				To exercise any of these rights, please contact us at <a
					href="mailto:privacy@ecohubs.community"
					class="text-ecohubs-primary hover:underline">privacy@ecohubs.community</a
				>. We will respond within 15 business days as required by the LOPDP.
			</p>

			<h2 class="font-serif text-2xl font-semibold text-ecohubs-dark mt-10 mb-4">
				8. Data Retention
			</h2>
			<p>We retain your personal data only for as long as necessary:</p>
			<ul class="list-disc pl-6 space-y-2">
				<li>
					<strong>Contact form data:</strong> 2 years from last interaction
				</li>
				<li>
					<strong>Application data:</strong> Duration of membership consideration plus 1 year
				</li>
				<li>
					<strong>Analytics data:</strong> 14 months (Google Analytics default)
				</li>
			</ul>

			<h2 class="font-serif text-2xl font-semibold text-ecohubs-dark mt-10 mb-4">
				9. International Data Transfers
			</h2>
			<p>
				Some of our third-party service providers may process data outside of Ecuador. When this
				occurs, we ensure appropriate safeguards are in place as required by the LOPDP, including:
			</p>
			<ul class="list-disc pl-6 space-y-2">
				<li>Use of services with adequate data protection certifications</li>
				<li>Standard contractual clauses where applicable</li>
			</ul>

			<h2 class="font-serif text-2xl font-semibold text-ecohubs-dark mt-10 mb-4">
				10. Security Measures
			</h2>
			<p>
				We implement appropriate technical and organizational measures to protect your personal
				data, including:
			</p>
			<ul class="list-disc pl-6 space-y-2">
				<li>HTTPS encryption for all data transmission</li>
				<li>Secure server infrastructure</li>
				<li>Access controls and authentication</li>
				<li>Regular security assessments</li>
			</ul>

			<h2 class="font-serif text-2xl font-semibold text-ecohubs-dark mt-10 mb-4">
				11. Children's Privacy
			</h2>
			<p>
				Our services are not directed to individuals under 18 years of age. We do not knowingly
				collect personal data from children.
			</p>

			<h2 class="font-serif text-2xl font-semibold text-ecohubs-dark mt-10 mb-4">
				12. Updates to This Policy
			</h2>
			<p>
				We may update this privacy policy from time to time. We will notify you of any material
				changes by posting the new policy on this page with an updated revision date.
			</p>

			<h2 class="font-serif text-2xl font-semibold text-ecohubs-dark mt-10 mb-4">
				13. Contact Information
			</h2>
			<p>
				If you have any questions about this privacy policy or our data practices, please contact
				us:
			</p>
			<ul class="list-disc pl-6 space-y-2">
				<li>
					<strong>Email:</strong>
					<a href="mailto:privacy@ecohubs.community" class="text-ecohubs-primary hover:underline"
						>privacy@ecohubs.community</a
					>
				</li>
				<li>
					<strong>Contact Form:</strong>
					<a href="/contact" class="text-ecohubs-primary hover:underline">ecohubs.community/contact</a
					>
				</li>
			</ul>

			<h2 class="font-serif text-2xl font-semibold text-ecohubs-dark mt-10 mb-4">
				14. Supervisory Authority
			</h2>
			<p>
				If you believe your data protection rights have been violated, you have the right to lodge a
				complaint with the Superintendencia de Protección de Datos Personales (SPDP) of Ecuador.
			</p>
		</div>
	</div>
</section>
