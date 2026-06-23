export type LeadPayload = {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  interest?: string;
  message?: string;
};

export function clean(value?: string): string {
  return value?.trim() ?? "";
}

export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function validateLeadPayload(body: LeadPayload): {
  lead: {
    name: string;
    company: string;
    email: string;
    phone: string;
    interest: string;
    message: string;
  };
  error: string | null;
} {
  const lead = {
    name: clean(body.name),
    company: clean(body.company),
    email: clean(body.email).toLowerCase(),
    phone: clean(body.phone),
    interest: clean(body.interest),
    message: clean(body.message)
  };

  const requiredFields: Array<keyof typeof lead> = ["name", "company", "email", "phone", "interest"];

  for (const field of requiredFields) {
    if (!lead[field]) {
      return { lead, error: `${field} is required` };
    }
  }

  if (!isEmail(lead.email)) {
    return { lead, error: "A valid email is required" };
  }

  return { lead, error: null };
}
