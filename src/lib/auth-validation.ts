/**
 * Real-world validation rules for AgriPort visitor registration
 */

// Disposable / Fake email domain blacklist
const DISPOSABLE_EMAIL_DOMAINS = new Set([
  "mailinator.com",
  "tempmail.com",
  "10minutemail.com",
  "guerrillamail.com",
  "trashmail.com",
  "yopmail.com",
  "sharklasers.com",
  "dispostable.com",
  "getairmail.com",
  "throwawaymail.com",
]);

export type ValidationResult = {
  isValid: boolean;
  error?: string;
  formattedValue?: string;
};

export type PasswordStrength = {
  score: 0 | 1 | 2 | 3 | 4;
  labelAr: string;
  labelEn: string;
  hasMinLength: boolean;
  hasLetter: boolean;
  hasNumber: boolean;
  hasSymbol: boolean;
};

/**
 * Validates Full Name:
 * - Must be at least 3 characters.
 * - Must contain at least two words (first and last name).
 * - Only Arabic/English letters, spaces, hyphens, and apostrophes allowed.
 * - No numbers or pure symbols.
 */
export function validateFullName(name: string, lang: string = "ar"): ValidationResult {
  const trimmed = name.trim();

  if (!trimmed) {
    return {
      isValid: false,
      error: lang === "ar" ? "يرجى إدخال الاسم بالكامل" : "Please enter your full name",
    };
  }

  if (trimmed.length < 3) {
    return {
      isValid: false,
      error: lang === "ar" ? "الاسم قصير جداً (3 أحرف على الأقل)" : "Name is too short (min 3 characters)",
    };
  }

  if (trimmed.length > 70) {
    return {
      isValid: false,
      error: lang === "ar" ? "الاسم طويل جداً" : "Name is too long",
    };
  }

  // Regex for Arabic letters, Latin letters, spaces, hyphens, and single quotes
  const validCharsRegex = /^[\u0600-\u06FFa-zA-Z\s'-]+$/;
  if (!validCharsRegex.test(trimmed)) {
    return {
      isValid: false,
      error:
        lang === "ar"
          ? "يجب أن يحتوي الاسم على أحرف فقط دون أرقام أو رموز خاصة"
          : "Name should only contain letters and spaces",
    };
  }

  // Check for at least two words
  const words = trimmed.split(/\s+/).filter((w) => w.length > 0);
  if (words.length < 2) {
    return {
      isValid: false,
      error:
        lang === "ar"
          ? "يرجى كتابة الاسم ثنائياً على الأقل (الاسم واسم العائلة)"
          : "Please enter at least first and last name",
    };
  }

  // Check that words are not just 1 character
  if (words.some((w) => w.length < 2)) {
    return {
      isValid: false,
      error:
        lang === "ar"
          ? "يرجى إدخال اسم حقيقي صالح"
          : "Please enter a valid full name",
    };
  }

  // Prevent keyboard spam repetitions (e.g. "aaaaa bbbbb")
  if (/(.)\1{4,}/.test(trimmed)) {
    return {
      isValid: false,
      error: lang === "ar" ? "يرجى إدخال اسم حقيقي صحيح" : "Please enter a valid name",
    };
  }

  return { isValid: true, formattedValue: trimmed };
}

/**
 * Validates Email Address:
 * - RFC compliant regex
 * - Valid TLD (at least 2 letters)
 * - Block known throwaway/disposable email services
 */
export function validateEmailAddress(email: string, lang: string = "ar"): ValidationResult {
  const trimmed = email.trim().toLowerCase();

  if (!trimmed) {
    return {
      isValid: false,
      error: lang === "ar" ? "يرجى إدخال البريد الإلكتروني" : "Please enter your email",
    };
  }

  // Standard RFC 5322 regex
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

  if (!emailRegex.test(trimmed)) {
    return {
      isValid: false,
      error:
        lang === "ar"
          ? "صيغة البريد الإلكتروني غير صحيحة (مثال: name@company.com)"
          : "Invalid email format (e.g. name@company.com)",
    };
  }

  const parts = trimmed.split("@");
  if (parts.length !== 2) {
    return { isValid: false, error: lang === "ar" ? "بريد إلكتروني غير صالح" : "Invalid email address" };
  }

  const domain = parts[1];
  const domainParts = domain.split(".");
  const tld = domainParts[domainParts.length - 1];

  if (!tld || tld.length < 2 || !/^[a-zA-Z]+$/.test(tld)) {
    return {
      isValid: false,
      error:
        lang === "ar"
          ? "نطاق البريد الإلكتروني غير مكتمل (يرجى التأكد من كتابة .com أو ما يماثلها)"
          : "Invalid domain extension (e.g. .com)",
    };
  }

  if (DISPOSABLE_EMAIL_DOMAINS.has(domain)) {
    return {
      isValid: false,
      error:
        lang === "ar"
          ? "لا يُسمح باستخدام بريد إلكتروني مؤقت أو وهمي"
          : "Temporary or disposable emails are not allowed",
    };
  }

  return { isValid: true, formattedValue: trimmed };
}

/**
 * Password Strength Evaluator:
 * - Checks length, digits, letters, special characters
 */
export function evaluatePasswordStrength(password: string): PasswordStrength {
  const hasMinLength = password.length >= 8;
  const hasLetter = /[a-zA-Z\u0600-\u06FF]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^a-zA-Z0-9\u0600-\u06FF\s]/.test(password);

  let score: 0 | 1 | 2 | 3 | 4 = 0;

  if (password.length === 0) {
    score = 0;
  } else if (password.length < 6) {
    score = 1;
  } else if (!hasLetter || !hasNumber) {
    score = 1;
  } else if (password.length >= 8 && hasLetter && hasNumber && hasSymbol) {
    score = 4;
  } else if (password.length >= 8 && hasLetter && hasNumber) {
    score = 3;
  } else {
    score = 2;
  }

  const labels = {
    0: { ar: "فارغة", en: "Empty" },
    1: { ar: "ضعيفة جداً", en: "Very Weak" },
    2: { ar: "مقبولة", en: "Fair" },
    3: { ar: "جيدة وقوية", en: "Good & Strong" },
    4: { ar: "ممتازة وحصينة", en: "Excellent" },
  };

  return {
    score,
    labelAr: labels[score].ar,
    labelEn: labels[score].en,
    hasMinLength,
    hasLetter,
    hasNumber,
    hasSymbol,
  };
}

/**
 * Validates Password:
 * - At least 8 characters
 * - Must contain letters and numbers
 */
export function validatePassword(password: string, lang: string = "ar"): ValidationResult {
  if (!password) {
    return {
      isValid: false,
      error: lang === "ar" ? "يرجى إدخال كلمة المرور" : "Please enter a password",
    };
  }

  if (password.length < 8) {
    return {
      isValid: false,
      error:
        lang === "ar"
          ? "يجب ألا تقل كلمة المرور عن 8 خانات"
          : "Password must be at least 8 characters",
    };
  }

  const hasLetter = /[a-zA-Z\u0600-\u06FF]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  if (!hasLetter || !hasNumber) {
    return {
      isValid: false,
      error:
        lang === "ar"
          ? "يجب أن تحتوي كلمة المرور على أحرف وأرقام معاً"
          : "Password must contain both letters and numbers",
    };
  }

  return { isValid: true };
}

/**
 * Validates Phone Number by Selected Country:
 * - Cleans digits
 * - Applies real national prefix and length rules
 */
export function validatePhoneNumberByCountry(
  phone: string,
  countryIso: string,
  lang: string = "ar"
): ValidationResult {
  // Strip non-digits
  let digits = phone.replace(/\D/g, "");

  if (!digits) {
    return {
      isValid: false,
      error: lang === "ar" ? "يرجى إدخال رقم الهاتف" : "Please enter your phone number",
    };
  }

  // Remove leading zero if entered
  if (digits.startsWith("0")) {
    digits = digits.slice(1);
  }

  const iso = countryIso.toUpperCase();

  switch (iso) {
    case "EG": {
      // Egypt: Mobile numbers start with 10, 11, 12, or 15 and are 10 digits without leading 0
      if (digits.length !== 10) {
        return {
          isValid: false,
          error:
            lang === "ar"
              ? "رقم الهاتف المصري يتكون من 10 أرقام (مثال: 1012345678)"
              : "Egyptian mobile must be 10 digits (e.g. 1012345678)",
        };
      }
      if (!/^(10|11|12|15)/.test(digits)) {
        return {
          isValid: false,
          error:
            lang === "ar"
              ? "يجب أن يبدأ الرقم بـ 10 أو 11 أو 12 أو 15 (فودافون، أورنج، اتصالات، وي)"
              : "Egyptian mobile must start with 10, 11, 12, or 15",
        };
      }
      return { isValid: true, formattedValue: digits };
    }

    case "SA": {
      // Saudi Arabia: starts with 5, 9 digits
      if (digits.length !== 9) {
        return {
          isValid: false,
          error:
            lang === "ar"
              ? "رقم الجوال السعودي يتكون من 9 أرقام (مثال: 501234567)"
              : "Saudi mobile must be 9 digits (e.g. 501234567)",
        };
      }
      if (!digits.startsWith("5")) {
        return {
          isValid: false,
          error:
            lang === "ar"
              ? "يجب أن يبدأ رقم الجوال السعودي بالرقم 5"
              : "Saudi mobile number must start with 5",
        };
      }
      return { isValid: true, formattedValue: digits };
    }

    case "AE": {
      // UAE: starts with 5, 9 digits
      if (digits.length !== 9) {
        return {
          isValid: false,
          error:
            lang === "ar"
              ? "رقم الهاتف الإماراتي يتكون من 9 أرقام (مثال: 501234567)"
              : "UAE mobile must be 9 digits (e.g. 501234567)",
        };
      }
      if (!digits.startsWith("5")) {
        return {
          isValid: false,
          error:
            lang === "ar"
              ? "يجب أن يبدأ الرقم الإماراتي بـ 5 (مثل 50 أو 55 أو 56)"
              : "UAE mobile must start with 5",
        };
      }
      return { isValid: true, formattedValue: digits };
    }

    case "KW": {
      // Kuwait: 8 digits, starts with 5, 6, 9
      if (digits.length !== 8) {
        return {
          isValid: false,
          error:
            lang === "ar"
              ? "رقم الهاتف الكويتي يتكون من 8 أرقام"
              : "Kuwait phone must be 8 digits",
        };
      }
      if (!/^[569]/.test(digits)) {
        return {
          isValid: false,
          error:
            lang === "ar"
              ? "يجب أن يبدأ الرقم الكويتي بـ 5 أو 6 أو 9"
              : "Kuwait mobile must start with 5, 6, or 9",
        };
      }
      return { isValid: true, formattedValue: digits };
    }

    case "QA": {
      // Qatar: 8 digits, starts with 3, 5, 6, 7
      if (digits.length !== 8) {
        return {
          isValid: false,
          error:
            lang === "ar"
              ? "رقم الهاتف القطري يتكون من 8 أرقام"
              : "Qatar phone must be 8 digits",
        };
      }
      return { isValid: true, formattedValue: digits };
    }

    case "BH":
    case "OM": {
      // Bahrain & Oman: 8 digits
      if (digits.length !== 8) {
        return {
          isValid: false,
          error:
            lang === "ar"
              ? "رقم الهاتف يتكون من 8 أرقام"
              : "Phone number must be 8 digits",
        };
      }
      return { isValid: true, formattedValue: digits };
    }

    case "JO": {
      // Jordan: 9 digits, starts with 7
      if (digits.length !== 9) {
        return {
          isValid: false,
          error:
            lang === "ar"
              ? "رقم الهاتف الأردني يتكون من 9 أرقام (مثال: 791234567)"
              : "Jordan mobile must be 9 digits",
        };
      }
      return { isValid: true, formattedValue: digits };
    }

    case "US":
    case "CA": {
      // USA / Canada: 10 digits
      if (digits.length !== 10) {
        return {
          isValid: false,
          error:
            lang === "ar"
              ? "رقم الهاتف يتكون من 10 أرقام"
              : "Phone number must be 10 digits",
        };
      }
      return { isValid: true, formattedValue: digits };
    }

    case "GB": {
      // UK: 10 digits
      if (digits.length !== 10) {
        return {
          isValid: false,
          error:
            lang === "ar"
              ? "رقم الهاتف البريطاني يتكون من 10 أرقام"
              : "UK phone number must be 10 digits",
        };
      }
      return { isValid: true, formattedValue: digits };
    }

    default: {
      // Global fallback (E.164 standard: between 7 and 15 digits)
      if (digits.length < 7 || digits.length > 15) {
        return {
          isValid: false,
          error:
            lang === "ar"
              ? "رقم الهاتف غير صحيح (بين 7 و 15 رقماً)"
              : "Invalid phone number (between 7 and 15 digits)",
        };
      }
      return { isValid: true, formattedValue: digits };
    }
  }
}
