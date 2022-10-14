export default {
  en: {
    buttons: {
      become_vip: 'Become VIP',
      buy_credits: 'Buy credits',
      create_account: 'Create account',
      login: 'Log In',
      join_now: 'Join Now',
      terms_and_agreement: 'Terms and Agreement',
      privacy_policy: 'Privacy Policy',
    },
    auth: {
      failed: 'These credentials do not match our records.',
      throttle:
        'Too many login attempts. Please try again in {seconds} seconds.',
    },
    enums: [],
    email_verification: {
      subject: 'Verify Email',
      greeting: 'Welcome',
      one_more_step: 'Just one more step...',
      we_are_pleased:
        'We are pleased to inform you, you have been allowed access to our dating platform. To activate your account, please click on the button below',
      activate_account: 'Activate Account',
      subject_verified: 'Account Activated',
      greeting_verified: 'Congratulations',
      your_account:
        'Your account is successfully activated. We note to use a clear profile photo to get the best results possible.',
      go_to_account: 'Go to Account',
    },
    pagination: {
      previous: '&laquo; Previous',
      next: 'Next &raquo;',
    },
    faq: {
      account: {
        title: 'Your account',
        list: {
          getting_starded: 'Getting started on ShagToday',
          signin: "Why can't I sign in?",
          joining_requirements: 'What are the joining requirements?',
          cost: 'Are there any costs for using this service?',
          delete: 'How to delete my account?',
        },
      },
      payment: {
        title: 'Payments',
      },
    },
    passwords: {
      password:
        'Passwords must be at least eight characters and match the confirmation.',
      reset: 'Your password has been reset!',
      sent: 'We have e-mailed your password reset link!',
      token: 'This password reset token is invalid.',
      user: "We can't find a user with that e-mail address.",
      reset_subject: 'Reset your password',
      reset_greeting: 'Hello',
      reset_request:
        'You have requested to reset your password. Click on the button below to reset your password. If you have not requested this, please contact us immediately.',
      reset_password: 'Reset Password',
    },
    email: {
      you_are_receiving:
        'You are receiving this e-mail because you agreed to receive notiﬁcations when you registered at our website with this e-mailaddress',
      physical_address: 'Physical address',
      address: 'Geekee Co.,Ltd, Wanchai, Hongkong',
      contact_us: 'Contact us',
      stop_notification: 'Stop notification',
    },
    validation: {
      accepted: 'The {attribute} must be accepted.',
      active_url: 'The {attribute} is not a valid URL.',
      after: 'The {attribute} must be a date after {date}.',
      after_or_equal:
        'The {attribute} must be a date after or equal to {date}.',
      alpha: 'The {attribute} may only contain letters.',
      alpha_dash:
        'The {attribute} may only contain letters, numbers, dashes and underscores.',
      alpha_num: 'The {attribute} may only contain letters and numbers.',
      array: 'The {attribute} must be an array.',
      before: 'The {attribute} must be a date before {date}.',
      before_or_equal:
        'The {attribute} must be a date before or equal to {date}.',
      between: {
        numeric: 'The {attribute} must be between {min} and {max}.',
        file: 'The {attribute} must be between {min} and {max} kilobytes.',
        string: 'The {attribute} must be between {min} and {max} characters.',
        array: 'The {attribute} must have between {min} and {max} items.',
      },
      boolean: 'The {attribute} field must be true or false.',
      confirmed: 'The {attribute} confirmation does not match.',
      date: 'The {attribute} is not a valid date.',
      date_equals: 'The {attribute} must be a date equal to {date}.',
      date_format: 'The {attribute} does not match the format {format}.',
      different: 'The {attribute} and {other} must be different.',
      digits: 'The {attribute} must be {digits} digits.',
      digits_between: 'The {attribute} must be between {min} and {max} digits.',
      dimensions: 'The {attribute} has invalid image dimensions.',
      distinct: 'The {attribute} field has a duplicate value.',
      email: 'The {attribute} must be a valid email address.',
      ends_with: 'The {attribute} must end with one of the following: {values}',
      exists: 'The selected {attribute} is invalid.',
      file: 'The {attribute} must be a file.',
      filled: 'The {attribute} field must have a value.',
      gt: {
        numeric: 'The {attribute} must be greater than {value}.',
        file: 'The {attribute} must be greater than {value} kilobytes.',
        string: 'The {attribute} must be greater than {value} characters.',
        array: 'The {attribute} must have more than {value} items.',
      },
      gte: {
        numeric: 'The {attribute} must be greater than or equal {value}.',
        file: 'The {attribute} must be greater than or equal {value} kilobytes.',
        string:
          'The {attribute} must be greater than or equal {value} characters.',
        array: 'The {attribute} must have {value} items or more.',
      },
      image: 'The {attribute} must be an image.',
      in: 'The selected {attribute} is invalid.',
      in_array: 'The {attribute} field does not exist in {other}.',
      integer: 'The {attribute} must be an integer.',
      ip: 'The {attribute} must be a valid IP address.',
      ipv4: 'The {attribute} must be a valid IPv4 address.',
      ipv6: 'The {attribute} must be a valid IPv6 address.',
      json: 'The {attribute} must be a valid JSON string.',
      lt: {
        numeric: 'The {attribute} must be less than {value}.',
        file: 'The {attribute} must be less than {value} kilobytes.',
        string: 'The {attribute} must be less than {value} characters.',
        array: 'The {attribute} must have less than {value} items.',
      },
      lte: {
        numeric: 'The {attribute} must be less than or equal {value}.',
        file: 'The {attribute} must be less than or equal {value} kilobytes.',
        string:
          'The {attribute} must be less than or equal {value} characters.',
        array: 'The {attribute} must not have more than {value} items.',
      },
      max: {
        numeric: 'The {attribute} may not be greater than {max}.',
        file: 'The {attribute} may not be greater than {max} kilobytes.',
        string: 'The {attribute} may not be greater than {max} characters.',
        array: 'The {attribute} may not have more than {max} items.',
      },
      mimes: 'The {attribute} must be a file of type: {values}.',
      mimetypes: 'The {attribute} must be a file of type: {values}.',
      min: {
        numeric: 'The {attribute} must be at least {min}.',
        file: 'The {attribute} must be at least {min} kilobytes.',
        string: 'The {attribute} must be at least {min} characters.',
        array: 'The {attribute} must have at least {min} items.',
      },
      not_in: 'The selected {attribute} is invalid.',
      not_regex: 'The {attribute} format is invalid.',
      numeric: 'The {attribute} must be a number.',
      present: 'The {attribute} field must be present.',
      regex: 'The {attribute} format is invalid.',
      required: 'The {attribute} field is required.',
      required_if: 'The {attribute} field is required when {other} is {value}.',
      required_unless:
        'The {attribute} field is required unless {other} is in {values}.',
      required_with:
        'The {attribute} field is required when {values} is present.',
      required_with_all:
        'The {attribute} field is required when {values} are present.',
      required_without:
        'The {attribute} field is required when {values} is not present.',
      required_without_all:
        'The {attribute} field is required when none of {values} are present.',
      same: 'The {attribute} and {other} must match.',
      size: {
        numeric: 'The {attribute} must be {size}.',
        file: 'The {attribute} must be {size} kilobytes.',
        string: 'The {attribute} must be {size} characters.',
        array: 'The {attribute} must contain {size} items.',
      },
      starts_with:
        'The {attribute} must start with one of the following: {values}',
      string: 'The {attribute} must be a string.',
      timezone: 'The {attribute} must be a valid zone.',
      unique: 'The {attribute} has already been taken.',
      uploaded: 'The {attribute} failed to upload.',
      url: 'The {attribute} format is invalid.',
      uuid: 'The {attribute} must be a valid UUID.',
      custom: {
        'attribute-name': {
          'rule-name': 'custom-message',
        },
      },
    },
    header: {
      search: 'Search',
      message: 'Messages',
      my_profile: 'My Profile',
      my_visitors: 'My Visitors',
      buy_credits: 'Buy Credits',
      account_settings: 'Account Settings',
      logout: 'Logout',
    },

    pages: {
      dashboard: 'Search',
      confirm_email: 'Confirm Email',
      pricing: 'Pricing',
      how_to_pay: 'How to Pay',
      terms: 'Terms of Use',
      privacy: 'Privacy Policy',
      faq: 'FAQ',
      report_abuse: 'Report Abuse',
    },
  },
}