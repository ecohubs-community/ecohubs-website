<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import Section from '$lib/components/Section.svelte';
	import ContactForm from '$lib/components/ContactForm.svelte';
	import { Mail, MessageSquare, Users } from 'lucide-svelte';
</script>

<SEO
	title="Contact - EcoHubs.community"
	description="Get in touch with EcoHubs.community. We'd love to hear from you."
	ogImage="/og-contact.jpg"
	breadcrumbs={[
		{ name: 'Home', url: 'https://ecohubs.community' },
		{ name: 'Contact', url: 'https://ecohubs.community/contact' }
	]}
/>

<Section spacing="xl">
	<div class="mx-auto w-full max-w-5xl">
		<div class="text-center mb-12">
			<h1 class="font-serif text-4xl font-bold text-ecohubs-dark sm:text-5xl mb-4">Get in Touch</h1>
			<p class="text-lg text-gray-600 max-w-2xl mx-auto">
				Have questions about EcoHubs? Want to learn more about joining our community? We'd love to hear from you.
			</p>
		</div>

		<div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
			<div class="bg-white p-6 rounded-xl border border-gray-200 text-center">
				<div class="w-12 h-12 bg-ecohubs-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
					<Mail class="w-6 h-6 text-ecohubs-primary" aria-hidden="true" />
				</div>
				<h3 class="font-bold text-gray-900 mb-2">Email Us</h3>
				<p class="text-sm text-gray-600 mb-3">We will get back to you as soon as possible</p>
				<a href="mailto:hello@ecohubs.community" class="text-ecohubs-primary hover:underline">
					hello@ecohubs.community
				</a>
			</div>

			<div class="bg-white p-6 rounded-xl border border-gray-200 text-center">
				<div class="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
					<MessageSquare class="w-6 h-6 text-blue-600" aria-hidden="true" />
				</div>
				<h3 class="font-bold text-gray-900 mb-2">Join the Discussion</h3>
				<p class="text-sm text-gray-600 mb-3">Connect with our community</p>
				<a href="https://discord.gg/Xnh7247Nq3" class="text-ecohubs-primary hover:underline" target="_blank" rel="noopener noreferrer">
					Community Discord
				</a>
			</div>

			<div class="bg-white p-6 rounded-xl border border-gray-200 text-center">
				<div class="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
					<Users class="w-6 h-6 text-purple-600" aria-hidden="true" />
				</div>
				<h3 class="font-bold text-gray-900 mb-2">Join Our Community</h3>
				<p class="text-sm text-gray-600 mb-3">Be part of the first 500</p>
				<a href="/join" class="text-ecohubs-primary hover:underline">
					Apply Now
				</a>
			</div>
		</div>

		<div class="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 lg:p-12">
			<h2 class="text-2xl font-serif font-bold text-gray-900 mb-6">Send Us a Message</h2>
			<ContactForm />
		</div>
	</div>
</Section>
