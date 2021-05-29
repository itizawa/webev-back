export const InquiryType = {
  BUG_REPORT: 'bug_report',
  VIOLATION_REPORT: 'violation_report',
  FEATURE_REQUEST: 'feature_request',
  DEVELOPMENT: 'development',
  OTHERS: 'others',
} as const;
export type InquiryType = typeof InquiryType[keyof typeof InquiryType];

export class Inquiry {
  type: InquiryType;
  email?: string;
  text: string;
  constructor({ type, email, text }: Inquiry) {
    this.type = type;
    this.email = email;
    this.text = text;
  }
}
