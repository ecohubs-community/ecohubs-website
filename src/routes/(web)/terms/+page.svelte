<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import { SEO_CONFIG, generateBreadcrumbs } from '$lib/config/seo';
</script>

<SEO
	title={SEO_CONFIG.pages.terms.title}
	description={SEO_CONFIG.pages.terms.description}
	breadcrumbs={generateBreadcrumbs('terms')}
/>

<section class="py-16 md:py-24">
	<div class="max-w-4xl mx-auto px-4">
		<h1 class="font-serif text-4xl md:text-5xl font-bold text-ecohubs-dark mb-8">
			Terms of Service
		</h1>

		<p class="text-gray-600 mb-8">Last updated: January 2025</p>

		<div class="prose prose-lg max-w-none text-gray-700">
			<p>
				Welcome to EcoHubs.community. By accessing or using our website and services, you agree to
				be bound by these Terms of Service. Please read them carefully.
			</p>

			<h2 class="font-serif text-2xl font-semibold text-ecohubs-dark mt-10 mb-4">
				1. Acceptance of Terms
			</h2>
			<p>
				By accessing and using EcoHubs.community ("the Service"), you accept and agree to be bound
				by these Terms of Service and our <a
					href="/privacy"
					class="text-ecohubs-primary hover:underline">Privacy Policy</a
				>. If you do not agree to these terms, please do not use our Service.
			</p>

			<h2 class="font-serif text-2xl font-semibold text-ecohubs-dark mt-10 mb-4">
				2. Description of Service
			</h2>
			<p>EcoHubs.community is a platform dedicated to:</p>
			<ul class="list-disc pl-6 space-y-2">
				<li>
					Co-creating and sharing an open-source blueprint for regenerative intentional communities
				</li>
				<li>Connecting individuals interested in sustainable community living</li>
				<li>Facilitating community governance through decentralized mechanisms</li>
				<li>Providing educational resources about regenerative practices</li>
			</ul>

			<h2 class="font-serif text-2xl font-semibold text-ecohubs-dark mt-10 mb-4">
				3. User Responsibilities
			</h2>
			<p>By using our Service, you agree to:</p>
			<ul class="list-disc pl-6 space-y-2">
				<li>Provide accurate and truthful information in all submissions</li>
				<li>Respect other users and community members</li>
				<li>Not use the Service for any unlawful purpose</li>
				<li>Not attempt to gain unauthorized access to any part of the Service</li>
				<li>Not interfere with or disrupt the Service or servers</li>
				<li>Comply with all applicable laws and regulations</li>
			</ul>

			<h2 class="font-serif text-2xl font-semibold text-ecohubs-dark mt-10 mb-4">
				4. Open-Source Blueprint
			</h2>
			<p>
				The EcoHubs Blueprint and associated documentation are released under open-source
				principles:
			</p>
			<ul class="list-disc pl-6 space-y-2">
				<li>The Blueprint is freely available for use, modification, and distribution</li>
				<li>
					Derivative works should acknowledge EcoHubs.community as the original source
				</li>
				<li>
					Commercial use of the Blueprint is permitted, provided proper attribution is given
				</li>
				<li>
					We encourage contributions back to the community to improve the Blueprint
				</li>
			</ul>
			<p class="mt-4">
				Specific licensing terms for individual components may be detailed in their respective
				documentation.
			</p>

			<h2 class="font-serif text-2xl font-semibold text-ecohubs-dark mt-10 mb-4">
				5. Intellectual Property
			</h2>
			<p>
				Unless otherwise stated, EcoHubs.community and/or its licensors own the intellectual
				property rights for all material on EcoHubs.community. This includes:
			</p>
			<ul class="list-disc pl-6 space-y-2">
				<li>Website design and user interface</li>
				<li>Logos and branding elements</li>
				<li>Original content not covered by open-source licenses</li>
			</ul>
			<p class="mt-4">
				You may view and/or print pages from the website for your own personal use subject to
				restrictions set in these Terms.
			</p>

			<h2 class="font-serif text-2xl font-semibold text-ecohubs-dark mt-10 mb-4">
				6. User Submissions
			</h2>
			<p>
				When you submit content through our contact forms, applications, or other means:
			</p>
			<ul class="list-disc pl-6 space-y-2">
				<li>You retain ownership of your original content</li>
				<li>
					You grant us a non-exclusive right to use your submission for the purposes described at
					the time of collection
				</li>
				<li>
					You represent that you have the right to submit such content
				</li>
			</ul>

			<h2 class="font-serif text-2xl font-semibold text-ecohubs-dark mt-10 mb-4">
				7. Disclaimer of Warranties
			</h2>
			<p>
				The Service is provided "as is" and "as available" without warranties of any kind, either
				express or implied, including but not limited to:
			</p>
			<ul class="list-disc pl-6 space-y-2">
				<li>Implied warranties of merchantability</li>
				<li>Fitness for a particular purpose</li>
				<li>Non-infringement</li>
			</ul>
			<p class="mt-4">
				We do not warrant that the Service will be uninterrupted, secure, or error-free.
			</p>

			<h2 class="font-serif text-2xl font-semibold text-ecohubs-dark mt-10 mb-4">
				8. Limitation of Liability
			</h2>
			<p>
				To the maximum extent permitted by applicable law, EcoHubs.community shall not be liable
				for:
			</p>
			<ul class="list-disc pl-6 space-y-2">
				<li>
					Any indirect, incidental, special, consequential, or punitive damages
				</li>
				<li>
					Any loss of profits, data, use, goodwill, or other intangible losses
				</li>
				<li>
					Any damages resulting from your use or inability to use the Service
				</li>
				<li>
					Any content obtained from the Service
				</li>
			</ul>

			<h2 class="font-serif text-2xl font-semibold text-ecohubs-dark mt-10 mb-4">
				9. Indemnification
			</h2>
			<p>
				You agree to indemnify and hold harmless EcoHubs.community, its founders, contributors, and
				affiliates from any claims, damages, losses, or expenses arising from:
			</p>
			<ul class="list-disc pl-6 space-y-2">
				<li>Your use of the Service</li>
				<li>Your violation of these Terms</li>
				<li>Your violation of any third-party rights</li>
			</ul>

			<h2 class="font-serif text-2xl font-semibold text-ecohubs-dark mt-10 mb-4">
				10. Third-Party Links
			</h2>
			<p>
				Our Service may contain links to third-party websites or services that are not owned or
				controlled by EcoHubs.community. We have no control over, and assume no responsibility for:
			</p>
			<ul class="list-disc pl-6 space-y-2">
				<li>The content, privacy policies, or practices of any third-party websites</li>
				<li>Any damages or losses caused by third-party websites</li>
			</ul>

			<h2 class="font-serif text-2xl font-semibold text-ecohubs-dark mt-10 mb-4">
				11. Modifications to Terms
			</h2>
			<p>
				We reserve the right to modify these Terms at any time. We will provide notice of material
				changes by:
			</p>
			<ul class="list-disc pl-6 space-y-2">
				<li>Updating the "Last updated" date at the top of these Terms</li>
				<li>Posting a notice on our website for significant changes</li>
			</ul>
			<p class="mt-4">
				Your continued use of the Service after changes constitutes acceptance of the modified
				Terms.
			</p>

			<h2 class="font-serif text-2xl font-semibold text-ecohubs-dark mt-10 mb-4">
				12. Governing Law
			</h2>
			<p>
				These Terms shall be governed by and construed in accordance with the laws of the Republic
				of Ecuador, without regard to its conflict of law provisions.
			</p>

			<h2 class="font-serif text-2xl font-semibold text-ecohubs-dark mt-10 mb-4">
				13. Dispute Resolution
			</h2>
			<p>
				Any disputes arising from these Terms or your use of the Service shall be resolved through:
			</p>
			<ol class="list-decimal pl-6 space-y-2">
				<li>
					<strong>Informal Resolution:</strong> First, by attempting to resolve the dispute informally
					by contacting us
				</li>
				<li>
					<strong>Mediation:</strong> If informal resolution fails, through mediation in Ecuador
				</li>
				<li>
					<strong>Legal Proceedings:</strong> If mediation fails, through the courts of Ecuador
				</li>
			</ol>

			<h2 class="font-serif text-2xl font-semibold text-ecohubs-dark mt-10 mb-4">
				14. Severability
			</h2>
			<p>
				If any provision of these Terms is found to be unenforceable or invalid, that provision will
				be limited or eliminated to the minimum extent necessary so that the Terms will otherwise
				remain in full force and effect.
			</p>

			<h2 class="font-serif text-2xl font-semibold text-ecohubs-dark mt-10 mb-4">
				15. Contact Information
			</h2>
			<p>If you have any questions about these Terms, please contact us:</p>
			<ul class="list-disc pl-6 space-y-2">
				<li>
					<strong>Email:</strong>
					<a href="mailto:legal@ecohubs.community" class="text-ecohubs-primary hover:underline"
						>legal@ecohubs.community</a
					>
				</li>
				<li>
					<strong>Contact Form:</strong>
					<a href="/contact" class="text-ecohubs-primary hover:underline">ecohubs.community/contact</a
					>
				</li>
			</ul>
		</div>
	</div>
</section>
