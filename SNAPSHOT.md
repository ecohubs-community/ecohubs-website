# Snapshot Integration

This document describes how to set up and configure Snapshot integration for DAO-based application voting.

## Overview

The EcoHubs.community application form automatically creates Snapshot proposals for each application submission. This enables DAO members to vote on applications using gasless voting, allowing transparent and verifiable governance decisions.

## What is Snapshot?

Snapshot is a gasless governance platform that enables DAO members to vote on proposals without paying transaction fees. Votes are signed off-chain and can be verified on-chain. It's perfect for DAO governance and aligns with EcoHubs' decentralized decision-making approach.

## Setup

### 1. Create a Snapshot Space

1. Go to [Snapshot.org](https://snapshot.org)
2. Connect your wallet (MetaMask, WalletConnect, etc.)
3. Click **"Create a space"**
4. Fill in the space details:
   - **Name**: Your space name (e.g., "ecohubs")
   - **ENS domain** (optional): If you have an ENS domain, you can use it (e.g., "ecohubs.eth")
   - **Avatar**: Upload a logo/avatar
   - **About**: Description of your DAO/space

### 2. Configure Space Settings

#### Basic Settings
- **Admins**: Add wallet addresses that can manage the space
- **Moderators**: Add wallet addresses that can moderate proposals
- **Members**: Define who can create proposals (optional)

#### Voting Strategy
Configure how votes are weighted:

- **Token-weighted**: Votes weighted by token holdings
- **Quadratic voting**: Votes weighted by square root of holdings
- **One person, one vote**: Equal voting power
- **Custom strategies**: Create your own

For application voting, **"One person, one vote"** or **"Token-weighted"** are common choices.

#### Proposal Settings
- **Min score**: Minimum score needed for proposals to appear
- **Voting period**: Default voting duration (can be overridden per proposal)
- **Quorum**: Minimum participation required (optional)

### 3. Get Your Space Identifier

Your space identifier is either:
- Your ENS domain (e.g., `ecohubs.eth`)
- Your space name (e.g., `ecohubs`)

You'll use this in the `SNAPSHOT_SPACE` environment variable.

### 4. Configure Environment Variables

Add these to your `.env` file:

```bash
# Snapshot Configuration
SNAPSHOT_SPACE=ecohubs.eth  # Your Snapshot space name or ENS domain
SNAPSHOT_NETWORK=1          # Network ID: 1 (Ethereum), 137 (Polygon), etc.
SNAPSHOT_VOTING_DURATION=604800  # Voting duration in seconds (604800 = 7 days)
```

#### Environment Variable Details

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `SNAPSHOT_SPACE` | Yes | - | Your Snapshot space identifier (e.g., "ecohubs.eth") |
| `SNAPSHOT_NETWORK` | No | `1` | Blockchain network ID (1 = Ethereum mainnet, 137 = Polygon) |
| `SNAPSHOT_VOTING_DURATION` | No | `604800` | Voting duration in seconds (default: 7 days) |

## How It Works

### Application Submission Flow

1. **User submits application** → Form data is validated
2. **Email notifications sent** → Admin and applicant receive emails
3. **Saved to Airtable** → Application stored in private database
4. **Snapshot proposal created** → Proposal automatically created for voting
5. **DAO members vote** → Members vote on Snapshot (Approve/Reject/Needs Review)
6. **Results tracked** → Voting results are visible on Snapshot

### Proposal Structure

Each application creates a Snapshot proposal with:

- **Title**: `Application Review: [Full Name]`
- **Body**: Summary of key application information
- **Choices**: 
  - `Approve` - Application is accepted
  - `Reject` - Application is declined
  - `Needs Review` - Requires more discussion/information
- **Type**: `single-choice` (one vote per member)
- **Duration**: 7 days (configurable)
- **Snapshot Block**: Current block number at creation time

### Proposal Content

The proposal body includes:
- Basic applicant information (name, location, availability)
- Motivation and alignment with EcoHubs values
- Contribution intentions and experience
- Collaboration style indicators
- Commitment level
- Vision and goals

**Note**: Full application details remain private in Airtable. The Snapshot proposal contains a summary suitable for voting.

## Voting Process

### For DAO Members

1. **Receive notification** (via email, Discord, etc.) about new application
2. **Visit Snapshot space**: Go to `https://snapshot.org/#/ecohubs.eth`
3. **Find the proposal**: Look for "Application Review: [Name]"
4. **Read the summary**: Review the application summary
5. **Cast your vote**: Choose Approve, Reject, or Needs Review
6. **Sign with wallet**: Sign the vote (gasless, no transaction fee)
7. **Vote recorded**: Your vote is recorded and visible to all

### Voting Results

- **Real-time updates**: See vote counts as members vote
- **Transparent**: All votes are visible (who voted and how)
- **Verifiable**: Votes can be verified on-chain
- **Final results**: After voting period ends, results are final

## Integration Details

### API Endpoint

The integration uses Snapshot's GraphQL API:
- **Endpoint**: `https://hub.snapshot.org/api`
- **Method**: POST
- **Content-Type**: application/json

### Proposal Creation

The service automatically:
1. Formats application data for Snapshot
2. Gets current blockchain block number
3. Creates proposal via GraphQL mutation
4. Returns proposal ID and URL
5. Logs success/errors

### Error Handling

The integration includes comprehensive error handling:

- **Space not found**: Validates space exists
- **Authentication errors**: Reports permission issues
- **Validation errors**: Checks proposal format
- **Network errors**: Handles connection issues
- **Non-blocking**: Application submission succeeds even if Snapshot fails

All errors are logged to the server console but don't prevent form submission.

## Verification

To verify your Snapshot connection, you can use the `verifySnapshotConnection()` function:

```typescript
import { verifySnapshotConnection } from '$lib/server/snapshot';

const isConnected = await verifySnapshotConnection();
console.log('Snapshot connected:', isConnected);
```

## Troubleshooting

### Proposal not created

1. **Check environment variables**: Ensure `SNAPSHOT_SPACE` is set correctly
2. **Verify space exists**: Check that your space name/ENS is correct
3. **Check space permissions**: Ensure your space allows proposal creation
4. **Check server logs**: Look for Snapshot error messages
5. **Test space manually**: Try creating a proposal manually on Snapshot

### Common Errors

- **"Space not found"**: Space name/ENS is incorrect or doesn't exist
- **"Unauthorized"**: Space permissions don't allow API proposal creation
- **"Validation failed"**: Proposal format doesn't match space requirements
- **"Network error"**: Cannot connect to Snapshot API or blockchain RPC

### Space Configuration Issues

If proposals aren't being created automatically:

1. **Check space admins**: Ensure the space has proper admin configuration
2. **Review proposal settings**: Check minimum score and other requirements
3. **Test manual creation**: Create a proposal manually to verify space works
4. **Contact Snapshot support**: If issues persist, contact Snapshot team

## Best Practices

### Privacy Considerations

- **Application data**: Full applications stored privately in Airtable
- **Proposal summaries**: Only key information in Snapshot proposals
- **Email addresses**: Not included in public proposals
- **Personal details**: Sensitive information kept private

### Voting Strategy

- **Choose appropriate strategy**: Consider token-weighted vs. one-person-one-vote
- **Set quorum**: Require minimum participation for valid results
- **Define voting period**: Balance between time for discussion and quick decisions
- **Document process**: Make voting process clear to all members

### Integration Maintenance

- **Monitor proposals**: Regularly check that proposals are being created
- **Review errors**: Check server logs for any Snapshot errors
- **Update space settings**: Adjust voting strategy as DAO evolves
- **Test regularly**: Verify integration works after deployments

## Advanced Configuration

### Custom Voting Duration

Set different durations for different types of proposals:

```bash
# 3 days for urgent decisions
SNAPSHOT_VOTING_DURATION=259200

# 14 days for major decisions
SNAPSHOT_VOTING_DURATION=1209600
```

### Multiple Networks

If using multiple blockchains:

```bash
# Ethereum mainnet
SNAPSHOT_NETWORK=1

# Polygon
SNAPSHOT_NETWORK=137

# Arbitrum
SNAPSHOT_NETWORK=42161
```

### Custom RPC Endpoints

The service uses public RPC endpoints by default. For production, consider:
- Using your own RPC endpoint for reliability
- Adding fallback RPC endpoints
- Monitoring RPC rate limits

## API Reference

### `createApplicationProposal(data, applicationData)`

Creates a Snapshot proposal for an application.

**Parameters:**
- `data: ApplicationFormData` - Form data from application schema
- `applicationData: ApplicationEmailData` - Formatted application email data

**Returns:** `Promise<string | null>` - Proposal ID if successful, null if not configured

**Throws:** `SnapshotError` - If proposal creation fails

### `formatApplicationForSnapshot(data)`

Formats application data for Snapshot proposal body.

**Parameters:**
- `data: ApplicationEmailData` - Application email data

**Returns:** `string` - Formatted markdown for proposal body

### `verifySnapshotConnection()`

Verifies Snapshot connection and space configuration.

**Returns:** `Promise<boolean>` - True if connected and configured

## Security Notes

- **Space permissions**: Configure space admins carefully
- **Proposal validation**: Snapshot validates proposals before creation
- **Vote verification**: All votes are verifiable on-chain
- **No private keys**: Integration doesn't require storing private keys
- **API security**: Snapshot API is public, but space permissions protect access

## Support

For issues or questions:
- Check server logs for detailed error messages
- Verify space configuration on Snapshot
- Test space manually on Snapshot.org
- See [Snapshot Documentation](https://docs.snapshot.org/)
- Visit [Snapshot Discord](https://discord.snapshot.org/) for community support

## Links

- **Snapshot Platform**: https://snapshot.org
- **Snapshot Documentation**: https://docs.snapshot.org/
- **Snapshot API**: https://hub.snapshot.org/api
- **Snapshot Discord**: https://discord.snapshot.org/




