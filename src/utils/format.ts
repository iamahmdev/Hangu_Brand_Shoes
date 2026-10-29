export function formatPrice(amount: number | undefined | null): string {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return 'Rs. 0';
  }
  return `Rs. ${Math.round(amount).toLocaleString('en-PK')}`;
}

export function cleanPhoneForWhatsApp(phone: string): string {
  const digits = phone.replace(/[^0-9]/g, '');
  if (digits.startsWith('92')) return digits;
  if (digits.startsWith('0')) return `92${digits.slice(1)}`;
  return digits;
}
