# Connecting the forms to EmailJS

The site is already wired up. You only need to add three values.

## 1. Add your IDs
Open `src/config.js` and paste in your three values:

| Setting | Where to find it in EmailJS |
|---|---|
| `serviceId` | Email Services → your service → Service ID |
| `templateId` | Email Templates → your template → Template ID |
| `publicKey` | Account → General → Public Key |

These are public by design, so no `.env` file is needed. Never paste your EmailJS **Private** Key anywhere in this project.

## 2. Build the template
In EmailJS, create a template with these variables:

- **To Email:** contact@stampcleaning.com (the inbox that should get enquiries)
- **Reply To:** `{{reply_to}}`
- **Subject:** `{{subject}}`
- **Content:**

```
New enquiry from stampcleaning.com

Name: {{name}}
Email: {{email}}
Phone: {{phone}}
Property type: {{property}}
Service (from a service card): {{service}}
Phone or email (from a service card): {{contact}}

Message:
{{message}}
```

Variables sent by the site: `subject, name, email, phone, contact, property, service, message, reply_to`.

## 3. Allow your website
EmailJS → Account → Security: add your live domain (and `localhost` while testing) so browsers are allowed to send.

## How it behaves
- Main contact form and the quick-quote box on each service card both use this.
- Until the three IDs exist, the forms open the visitor's email app instead (and say so honestly).
- A hidden spam-trap field and a 15-second gap between sends reduce junk.
