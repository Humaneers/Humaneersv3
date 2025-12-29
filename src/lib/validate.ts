export const CONTACT_LIMITS = {
  name: 100,
  email: 254,
  company: 150,
  message: 2000,
  phone: 50,
  website: 200,
};

export type ContactFormValues = {
  name: string;
  email: string;
  company: string;
  message: string;
  phone: string;
  website: string;
  hp: string;
};

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const normalize = (value: string) => value.trim();

export function validateField(
  field: keyof ContactFormValues,
  values: ContactFormValues
): string | undefined {
  const value = normalize(values[field] ?? "");

  switch (field) {
    case "name":
      if (!value) return "Name is required.";
      if (value.length > CONTACT_LIMITS.name)
        return `Name must be ${CONTACT_LIMITS.name} characters or fewer.`;
      return;
    case "email":
      if (!value) return "Email is required.";
      if (value.length > CONTACT_LIMITS.email)
        return `Email must be ${CONTACT_LIMITS.email} characters or fewer.`;
      if (!emailRegex.test(value)) return "Enter a valid email address.";
      return;
    case "message":
      if (!value) return "Message is required.";
      if (value.length > CONTACT_LIMITS.message)
        return `Message must be ${CONTACT_LIMITS.message} characters or fewer.`;
      return;
    case "company":
      if (value.length > CONTACT_LIMITS.company)
        return `Company must be ${CONTACT_LIMITS.company} characters or fewer.`;
      return;
    case "phone":
      if (value.length > CONTACT_LIMITS.phone)
        return `Phone must be ${CONTACT_LIMITS.phone} characters or fewer.`;
      return;
    case "website":
      if (value.length > CONTACT_LIMITS.website)
        return `Website must be ${CONTACT_LIMITS.website} characters or fewer.`;
      return;
    case "hp":
      return;
    default:
      return;
  }
}

export function validateContact(values: ContactFormValues): ContactFormErrors {
  const fields: (keyof ContactFormValues)[] = [
    "name",
    "email",
    "company",
    "phone",
    "website",
    "message",
    "hp",
  ];

  return fields.reduce<ContactFormErrors>((errors, field) => {
    const error = validateField(field, values);
    if (error) {
      errors[field] = error;
    }
    return errors;
  }, {});
}

export function sanitizeContact(values: ContactFormValues) {
  return {
    name: normalize(values.name),
    email: normalize(values.email),
    company: normalize(values.company),
    message: normalize(values.message),
    phone: normalize(values.phone),
    website: normalize(values.website),
    hp: values.hp,
  };
}
