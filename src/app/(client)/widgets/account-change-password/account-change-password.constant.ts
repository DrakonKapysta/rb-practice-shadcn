export const PASSWORD_REQUIREMENTS = [
  {
    label: 'At least 8 characters long',
    regex: /.{8,}/,
  },
  {
    label: 'One uppercase letter (A-Z)',
    regex: /[A-Z]/,
  },
  {
    label: 'One lowercase letter (a-z)',
    regex: /[a-z]/,
  },
  {
    label: 'One number (0-9)',
    regex: /[0-9]/,
  },
  {
    label: 'One special character (!@#$%^&*)',
    regex: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
  },
]
