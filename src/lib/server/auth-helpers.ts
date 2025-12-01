import { SignJWT, jwtVerify } from 'jose';
import { AUTH_SECRET } from '$env/static/private';

export interface AuthPayload {
	address: string;
	isOwner: boolean;
	exp?: number;
}

function getSecret(): Uint8Array {
	const secretString = AUTH_SECRET || 'fallback-secret-change-in-production-min-32-chars';
	if (secretString.length < 32) {
		console.warn('AUTH_SECRET should be at least 32 characters long for security');
	}
	return new TextEncoder().encode(secretString);
}

const secret = getSecret();

/**
 * Create a JWT token for authenticated session
 */
export async function createJWT(payload: Omit<AuthPayload, 'exp'>): Promise<string> {
	const jwt = await new SignJWT({
		address: payload.address,
		isOwner: payload.isOwner
	})
		.setProtectedHeader({ alg: 'HS256' })
		.setIssuedAt()
		.setExpirationTime('7d')
		.sign(secret);

	return jwt;
}

/**
 * Verify and decode a JWT token
 */
export async function verifyJWT(token: string): Promise<AuthPayload> {
	try {
		const { payload } = await jwtVerify(token, secret);
		return payload as AuthPayload;
	} catch (error) {
		throw new Error('Invalid or expired token');
	}
}

