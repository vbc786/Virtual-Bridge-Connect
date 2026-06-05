# Firestore Security Specifications - Virtual Bridge Connect

## 1. Data Invariants
- **Leads Collection (`/leads/{leadId}`)**:
  - Only authenticated creators can submit a lead (or standard users for lead intake if anonymous; wait, rule: "Verified Users: For all standard write operations (unless the app explicitly supports anonymous users), you MUST strictly mandate that the user is verified using `request.auth.token.email_verified == true`." Since lead generation is open to any prospective client, we allow creation without email-verified login if they are anonymous, or we can check simple auth, or we can allow public creation if it's a lead intake form. But wait! Writing admin-approved or reviewer-only updates must be locked to admins).
  - Let's allow public creation of leads (write) so prospect users can submit them, but only let authenticated admins read/update them. This is an extremely common, secure pattern for intake forms!
  - `status` must only transition to valid states (`new`, `analyzing`, `scheduled`, `reviewed`, `archived`).
  - `createdAt` is immutable.
  - Documents cannot be deleted by standard users; only administrators can delete or archive.

## 2. The "Dirty Dozen" Malicious Payloads
1. **Unauthenticated Read on Leads**: Attempt to list leads without login. Should fail.
2. **Standard User Read on other Leads**: Authenticated non-admin attempting to list other users' leads. Should fail.
3. **Ghost Field Update**: Attempting to inject a field `isAdmin` or `role` on leads. Should fail.
4. **State Skip Attack**: Creating an intake with standard status but updating it directly to 'reviewed/completed' bypass. Should fail.
5. **ID Poisoning / Junk Field ID**: Writing with a document ID that is 2KB of random characters. Should fail.
6. **Denial of Wallet String Injection**: Injecting a 2MB binary string into the `name` field of a lead. Should fail.
7. **Timestamp Spoof**: Attempting to set `createdAt` to a client-controlled future date. Should fail.
8. **Immutability Breach**: Updating a lead's `createdAt` timestamp. Should fail.
9. **Unauthenticated Audit Log Entry**: Trying to write into the audit log directly as a client. Should fail.
10. **Admin Claim Spoof**: Trying to read logs by spoofing token custom claims. Should fail.
11. **Lead Deletion Attack**: An unauthenticated or standard client attempting to delete a lead document. Should fail.
12. **Null ID / Empty Write Injection**: Submitting an empty lead document with invalid schemas. Should fail.

## 3. Recommended Test Configurations
We will enforce verification check bounds on all inputs.
All rules will default to deny and explicitly whitelist valid paths.
- Auth check
- Schema check
- Identity check
- Sanitization size bounds
- Administrative role validation using the existence path `/admins/{uid}` or checking known email pattern.
