# Airtable Integration

This document describes how to set up and configure Airtable integration for storing membership applications.

## Overview

The EcoHubs.community application form automatically saves submissions to Airtable when properly configured. The integration uses the official [Airtable.js](https://github.com/Airtable/airtable.js) library for reliable data storage.

## Setup

### 1. Create Airtable Base

1. Go to [Airtable.com](https://airtable.com) and create a new base
2. Name it "EcoHubs Applications" (or your preferred name)

### 2. Create Applications Table

Create a table named **"Applications"** (or set `AIRTABLE_APPLICATIONS_TABLE` env var to match your table name).

### 3. Configure Table Fields

Create the following fields in your Applications table. Field names must match exactly (case-sensitive):

#### Page 1: Basic Information

| Field Name | Type | Description |
|------------|------|-------------|
| `fullName` | Single line text | Applicant's full name |
| `email` | Email | Applicant's email address |
| `location` | Single line text | Country/location |
| `timeAvailability` | Single line text | Time availability per week |
| `languages` | Long text | Languages spoken |
| `discovery` | Long text | How they discovered EcoHubs |

#### Page 2: Values & Alignment

| Field Name | Type | Description |
|------------|------|-------------|
| `resonance` | Long text | What resonates with regenerative living |
| `missingInSociety` | Long text | What's missing in society today |
| `attraction` | Long text | What attracts them to EcoHubs |
| `values` | Single line text | Selected values (comma-separated) |
| `alignmentWithNature` | Long text | Understanding of living in alignment with nature |

#### Page 3: Collaboration & Self-Awareness

| Field Name | Type | Description |
|------------|------|-------------|
| `groupWork` | Long text | What helps groups work well |
| `teamworkMoment` | Long text | Moment when teamwork felt easy |
| `disagreementResponse` | Single line text | Response to disagreement |
| `disagreementResponseOther` | Long text | Additional details (optional) |
| `ideaNotChosen` | Single line text | Response when idea not chosen |
| `ideaNotChosenOther` | Long text | Additional details (optional) |
| `comfortFeedback` | Number | Comfort receiving feedback (1-10) |
| `comfortAskingHelp` | Number | Comfort asking for help (1-10) |
| `adaptToChange` | Number | Ease adapting to change (1-10) |
| `decisionMakingValue` | Single line text | Valued aspect of decision-making |
| `personalPatternOptional` | Long text | Personal pattern working on (optional) |

#### Page 4: Motivation & Contribution

| Field Name | Type | Description |
|------------|------|-------------|
| `motivation` | Long text | Motivation to join |
| `contribution` | Long text | What they want to contribute |
| `receiveLearn` | Long text | What they hope to receive/learn |
| `communityMeaning` | Long text | What community means to them |
| `joiningReason` | Long text | Reason for joining |

#### Page 5: Experience & Skills

| Field Name | Type | Description |
|------------|------|-------------|
| `experienceAreas` | Single line text | Experience areas (comma-separated) |
| `experienceAreasOther` | Long text | Other experience areas (optional) |
| `proudProject` | Long text | Project they're proud of |
| `bestWorkEnvironments` | Long text | Environments for best work |

#### Page 6: Commitment & Stability

| Field Name | Type | Description |
|------------|------|-------------|
| `manageCommitments` | Long text | How they manage commitments |
| `obstaclesToContribution` | Long text | Obstacles and how they handle them |
| `stability` | Single line text | Stability status |
| `stabilityComment` | Long text | Additional stability context (optional) |
| `commitmentLevel` | Single line text | Commitment level to shaping blueprint |

#### Page 7: Self-Reflection

| Field Name | Type | Description |
|------------|------|-------------|
| `reactToIdeasNotChosen` | Long text | Reaction when ideas not chosen |
| `collaborationChallenges` | Long text | Collaboration challenges |
| `personalPattern` | Long text | Personal pattern working on |
| `howOthersDescribe` | Long text | How others describe working with them |

#### Page 8: Vision & Concerns

| Field Name | Type | Description |
|------------|------|-------------|
| `whatExcites` | Long text | What excites about co-creating blueprint |
| `concernsDoubts` | Long text | Concerns or doubts |
| `howStartContributing` | Long text | How they'd like to start contributing |
| `anythingElse` | Long text | Anything else to share (optional) |

#### Page 9: Consciousness & Meaning

| Field Name | Type | Description |
|------------|------|-------------|
| `lifeMeaning` | Long text | What gives life meaning |
| `responsibilityMeaning` | Long text | What responsibility means |
| `freedomMeaning` | Long text | What freedom means in community context |

#### Metadata Fields

| Field Name | Type | Description |
|------------|------|-------------|
| `submittedAt` | Date | Submission timestamp (auto-filled) |
| `status` | Single line text | Application status (default: "New") |

### 4. Get API Credentials

1. Go to [Airtable Account Settings](https://airtable.com/account)
2. Navigate to **Developer** section
3. Click **Create new personal access token**
4. Name it (e.g., "EcoHubs Community")
5. Grant access to your base
6. Copy the **API key** (starts with `pat...`)
7. Copy your **Base ID** from the base URL: `https://airtable.com/appXXXXXXXXXXXXXX` (the part after `/app`)

### 5. Configure Environment Variables

Add these to your `.env` file:

```bash
# Airtable Configuration
AIRTABLE_API_KEY=pat_your_api_key_here
AIRTABLE_BASE_ID=appYourBaseIdHere
AIRTABLE_APPLICATIONS_TABLE=Applications  # Optional, defaults to "Applications"
```

## Usage

The integration is automatic. When a user submits the application form:

1. Form data is validated
2. Email notifications are sent
3. **Application is saved to Airtable** (if configured)
4. Optional GitHub issue is created (if configured)

The Airtable save is **non-blocking** - if it fails, the form submission still succeeds (errors are logged to console).

## Error Handling

The integration includes comprehensive error handling:

- **Rate Limiting**: Detects and reports Airtable rate limit errors
- **Authentication**: Validates API key and reports auth failures
- **Table Not Found**: Reports if table name doesn't exist
- **Field Validation**: Reports field name/type mismatches
- **Generic Errors**: Catches and logs all other errors

All errors are logged to the server console but don't prevent form submission.

## Verification

To verify your Airtable connection, you can use the `verifyAirtableConnection()` function:

```typescript
import { verifyAirtableConnection } from '$lib/server/airtable';

const isConnected = await verifyAirtableConnection();
console.log('Airtable connected:', isConnected);
```

## Field Mapping Notes

- **Array fields** (`values`, `experienceAreas`) are automatically converted to comma-separated strings
- **Number fields** (`comfortFeedback`, `comfortAskingHelp`, `adaptToChange`) must be Number type in Airtable
- **Optional fields** are included even if empty (empty strings)
- **Date field** (`submittedAt`) is set automatically as ISO timestamp string

## Troubleshooting

### Application not saving to Airtable

1. **Check environment variables**: Ensure `AIRTABLE_API_KEY` and `AIRTABLE_BASE_ID` are set
2. **Check API key permissions**: Token must have access to your base
3. **Check table name**: Default is "Applications", or set `AIRTABLE_APPLICATIONS_TABLE`
4. **Check field names**: Must match exactly (case-sensitive)
5. **Check server logs**: Look for Airtable error messages

### Common Errors

- **"Airtable authentication failed"**: Invalid or expired API key
- **"Table not found"**: Table name doesn't match or doesn't exist
- **"Field validation failed"**: Field name/type mismatch
- **"Rate limit exceeded"**: Too many requests (wait and retry)

## API Reference

### `saveApplication(data, timestamp)`

Saves application data to Airtable.

**Parameters:**
- `data: ApplicationFormData` - Form data from application schema
- `timestamp: string` - ISO timestamp string

**Returns:** `Promise<string | null>` - Record ID if successful, null if not configured

**Throws:** `AirtableError` - If save operation fails

### `verifyAirtableConnection()`

Verifies Airtable connection and configuration.

**Returns:** `Promise<boolean>` - True if connected and configured

## Security Notes

- **Never commit API keys** to version control
- Use environment variables for all credentials
- Rotate API keys periodically
- Use read-only tokens if possible (though write access is required for saving applications)
- Consider using Airtable's field-level permissions if needed

## Support

For issues or questions:
- Check server logs for detailed error messages
- Verify field names match exactly
- Test with `verifyAirtableConnection()` function
- See [Airtable API Documentation](https://airtable.com/developers/web/api/introduction)


