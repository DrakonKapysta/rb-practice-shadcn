export const PASSWORD_REQUIREMENTS = [
  {
    id: 'minLength',
    label: 'At least 8 characters long',
    regex: /.{8,}/,
  },
  {
    id: 'uppercase',
    label: 'One uppercase letter (A-Z)',
    regex: /[A-Z]/,
  },
  {
    id: 'lowercase',
    label: 'One lowercase letter (a-z)',
    regex: /[a-z]/,
  },
  {
    id: 'number',
    label: 'One number (0-9)',
    regex: /[0-9]/,
  },
  {
    id: 'specialCharacter',
    label: 'One special character (!@#$%^&*)',
    regex: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
  },
]
