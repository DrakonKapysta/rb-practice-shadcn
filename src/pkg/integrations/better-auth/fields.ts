export const fields = {
  phoneNumber: {
    type: 'string' as const,
    required: false,
    defaultValue: null,
    input: true,
    unique: true,
  },
  address: {
    type: 'string' as const,
    required: false,
    defaultValue: null,
    input: true,
  },
  country: {
    type: 'string' as const,
    required: false,
    defaultValue: null,
    input: true,
  },
  birthDate: {
    type: 'date' as const,
    required: false,
    defaultValue: null,
    input: true,
  },
  gender: {
    type: 'string' as const,
    required: false,
    defaultValue: null,
    input: true,
  },
  surname: {
    type: 'string' as const,
    required: false,
    defaultValue: null,
    input: true,
  },
}
