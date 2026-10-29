import type { Language } from "./i18n";

export type AuthTranslations = {
  pageTitle: string;
  pageSubtitle: string;
  badge: string;
  tabSignIn: string;
  tabRegister: string;
  socialGoogle: string;
  socialApple: string;
  orContinueWithEmail: string;
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  phoneLabel: string;
  searchCountry: string;
  rememberMe: string;
  forgotPassword: string;
  signInBtn: string;
  registerBtn: string;
  noAccountPrompt: string;
  createAccountLink: string;
  hasAccountPrompt: string;
  signInLink: string;
  registeredSuccess: string;
  loggedInSuccess: string;
  emailNotFoundError: string;
  invalidPasswordError: string;
  emailAlreadyRegisteredError: string;
  fillAllFieldsError: string;
  shortPasswordError: string;
  invalidEmailError: string;
  welcomeBack: string;
  signedInAs: string;
  logoutBtn: string;
  backToHome: string;
  visitorAccount: string;
  securityNote: string;

  // Forgot password flow
  forgotPasswordTitle: string;
  forgotPasswordSubtitle: string;
  enterCodeTitle: string;
  enterCodeSubtitle: string;
  newPasswordTitle: string;
  newPasswordSubtitle: string;
  confirmPasswordLabel: string;
  confirmPasswordPlaceholder: string;
  sendCodeBtn: string;
  verifyCodeBtn: string;
  saveNewPasswordBtn: string;
  resendCodeIn: string;
  resendCodeBtn: string;
  backToLogin: string;
  changeEmail: string;
  passwordResetSuccess: string;
  passwordResetSuccessMsg: string;
  passwordsDoNotMatch: string;
  passwordsMatch: string;
  otpCodePlaceholder: string;
  codeSentNotice: string;
  simulationCodeNotice: string;
};

export const authTranslations: Record<Language, AuthTranslations> = {
  ar: {
    pageTitle: "تسجيل الدخول إلى AgriPort",
    pageSubtitle: "بوابتك المباشرة لاستعراض كتالوج المحاصيل، متابعة الطلبات، وتنسيق الشحنات الدولية.",
    badge: "بوابة الزوار والعملاء المعتمدة",
    tabSignIn: "تسجيل الدخول",
    tabRegister: "إنشاء حساب جديد",
    socialGoogle: "المتابعة باستخدام Google",
    socialApple: "المتابعة باستخدام Apple",
    orContinueWithEmail: "أو بالبريد الإلكتروني",
    nameLabel: "الاسم بالكامل",
    namePlaceholder: "مثال: م. أحمد عبد الله",
    emailLabel: "البريد الإلكتروني",
    emailPlaceholder: "name@company.com",
    passwordLabel: "كلمة المرور",
    passwordPlaceholder: "••••••••",
    phoneLabel: "رقم الهاتف حسب الدولة",
    searchCountry: "بحث عن دولة أو رمز النداء...",
    rememberMe: "تذكر بياناتي",
    forgotPassword: "نسيت كلمة المرور؟",
    signInBtn: "تسجيل الدخول",
    registerBtn: "إنشاء الحساب وبدء التجربة",
    noAccountPrompt: "ليس لديك حساب بعد؟",
    createAccountLink: "أنشئ حسابك الآن",
    hasAccountPrompt: "لديك حساب بالفعل؟",
    signInLink: "تسجيل الدخول",
    registeredSuccess: "تم إنشاء حسابك وتفعيله بنجاح! مرحباً بك.",
    loggedInSuccess: "تم تسجيل الدخول بنجاح! مرحباً بك.",
    emailNotFoundError: "هذا الحساب غير مسجل بعد، يرجى إنشاء حساب جديد أولاً.",
    invalidPasswordError: "كلمة المرور غير صحيحة، يرجى المحاولة مرة أخرى.",
    emailAlreadyRegisteredError: "هذا البريد مسجل مسبقاً، يمكنك تسجيل الدخول به مباشرة.",
    fillAllFieldsError: "يرجى تعبئة كافة الحقول المطلوبة.",
    shortPasswordError: "يجب ألا تقل كلمة المرور عن 8 أحرف وأرقام.",
    invalidEmailError: "يرجى إدخال بريد إلكتروني صالح.",
    welcomeBack: "أهلاً بك مجدداً،",
    signedInAs: "تم تسجيل دخولك بنجاح بحساب",
    logoutBtn: "تسجيل الخروج",
    backToHome: "العودة إلى الرئيسية",
    visitorAccount: "حساب زائر معتمد",
    securityNote: "بياناتك مشفرة ومحمية وفق أعلى معايير أمان التصدير الزراعي الدولي.",

    forgotPasswordTitle: "استعادة كلمة المرور",
    forgotPasswordSubtitle: "أدخل بريدك الإلكتروني المسجل وسنرسل لك رمز تحقق من 6 أرقام لتعيين كلمة مرور جديدة.",
    enterCodeTitle: "أدخل رمز التحقق",
    enterCodeSubtitle: "أدخل الرمز المكون من 6 أرقام الذي تم إرساله إلى بريدك الإلكتروني.",
    newPasswordTitle: "تعيين كلمة سر جديدة",
    newPasswordSubtitle: "أنشئ كلمة مرور قوية وجديدة لحسابك.",
    confirmPasswordLabel: "تأكيد كلمة المرور الجديدة",
    confirmPasswordPlaceholder: "••••••••",
    sendCodeBtn: "إرسال رمز التحقق",
    verifyCodeBtn: "التحقق والمتابعة",
    saveNewPasswordBtn: "حفظ وتعيين كلمة المرور",
    resendCodeIn: "إعادة إرسال الرمز خلال",
    resendCodeBtn: "إعادة إرسال الرمز الآن",
    backToLogin: "العودة لتسجيل الدخول",
    changeEmail: "تغيير البريد الإلكتروني",
    passwordResetSuccess: "تم تعيين كلمة المرور بنجاح!",
    passwordResetSuccessMsg: "تم تحديث كلمة المرور الخاصة بحسابك بنجاح. يمكنك الآن تسجيل الدخول مباشرة ببياناتك الجديدة.",
    passwordsDoNotMatch: "كلمتا المرور غير متطابقتين.",
    passwordsMatch: "كلمتا المرور متطابقتان ✓",
    otpCodePlaceholder: "0 0 0 0 0 0",
    codeSentNotice: "تم إرسال رمز التحقق إلى بريدك الإلكتروني بنجاح.",
    simulationCodeNotice: "رمز التحقق الفوري للتجربة السريعة:",
  },
  en: {
    pageTitle: "Sign in to AgriPort",
    pageSubtitle: "Your global portal to browse fresh produce, track inquiries, and coordinate international shipments.",
    badge: "Authorized Visitor & Client Portal",
    tabSignIn: "Sign In",
    tabRegister: "Create Account",
    socialGoogle: "Continue with Google",
    socialApple: "Continue with Apple",
    orContinueWithEmail: "or continue with email",
    nameLabel: "Full Name",
    namePlaceholder: "e.g. Johnathan Smith",
    emailLabel: "Email Address",
    emailPlaceholder: "name@company.com",
    passwordLabel: "Password",
    passwordPlaceholder: "••••••••",
    phoneLabel: "Phone Number by Country",
    searchCountry: "Search country or dial code...",
    rememberMe: "Remember me",
    forgotPassword: "Forgot password?",
    signInBtn: "Sign In",
    registerBtn: "Create Account & Start",
    noAccountPrompt: "Don't have an account?",
    createAccountLink: "Register now",
    hasAccountPrompt: "Already have an account?",
    signInLink: "Sign In",
    registeredSuccess: "Account created and activated successfully! Welcome.",
    loggedInSuccess: "Signed in successfully! Welcome.",
    emailNotFoundError: "Account not found. Please register first.",
    invalidPasswordError: "Incorrect password. Please try again.",
    emailAlreadyRegisteredError: "This email is already registered. Please sign in.",
    fillAllFieldsError: "Please fill in all required fields.",
    shortPasswordError: "Password must be at least 8 characters with letters and numbers.",
    invalidEmailError: "Please enter a valid email address.",
    welcomeBack: "Welcome back,",
    signedInAs: "Signed in successfully as",
    logoutBtn: "Sign Out",
    backToHome: "Back to Home",
    visitorAccount: "Verified Visitor Account",
    securityNote: "Your data is protected under international enterprise encryption standards.",

    forgotPasswordTitle: "Reset Your Password",
    forgotPasswordSubtitle: "Enter your registered email address and we'll send you a 6-digit verification code to set a new password.",
    enterCodeTitle: "Enter Verification Code",
    enterCodeSubtitle: "Enter the 6-digit code sent to your email address.",
    newPasswordTitle: "Set New Password",
    newPasswordSubtitle: "Create a strong, new password for your account.",
    confirmPasswordLabel: "Confirm New Password",
    confirmPasswordPlaceholder: "••••••••",
    sendCodeBtn: "Send Verification Code",
    verifyCodeBtn: "Verify & Continue",
    saveNewPasswordBtn: "Save & Set Password",
    resendCodeIn: "Resend code in",
    resendCodeBtn: "Resend code now",
    backToLogin: "Back to Sign In",
    changeEmail: "Change Email Address",
    passwordResetSuccess: "Password Reset Successfully!",
    passwordResetSuccessMsg: "Your password has been updated. You can now sign in with your new credentials.",
    passwordsDoNotMatch: "Passwords do not match.",
    passwordsMatch: "Passwords match ✓",
    otpCodePlaceholder: "0 0 0 0 0 0",
    codeSentNotice: "Verification code sent to your email successfully.",
    simulationCodeNotice: "Quick test verification code:",
  },
  fr: {
    pageTitle: "Connexion à AgriPort",
    pageSubtitle: "Votre portail pour explorer les produits frais et organiser vos expéditions internationales.",
    badge: "Portail Visiteurs et Clients",
    tabSignIn: "Connexion",
    tabRegister: "Créer un compte",
    socialGoogle: "Continuer avec Google",
    socialApple: "Continuer avec Apple",
    orContinueWithEmail: "ou continuer avec email",
    nameLabel: "Nom complet",
    namePlaceholder: "ex. Jean Dupont",
    emailLabel: "Adresse email",
    emailPlaceholder: "nom@entreprise.com",
    passwordLabel: "Mot de passe",
    passwordPlaceholder: "••••••••",
    phoneLabel: "Numéro de téléphone selon le pays",
    searchCountry: "Rechercher pays ou indicatif...",
    rememberMe: "Se souvenir de moi",
    forgotPassword: "Mot de passe oublié ?",
    signInBtn: "Se connecter",
    registerBtn: "Créer un compte",
    noAccountPrompt: "Vous n'avez pas de compte ?",
    createAccountLink: "Inscrivez-vous maintenant",
    hasAccountPrompt: "Vous avez déjà un compte ?",
    signInLink: "Se connecter",
    registeredSuccess: "Compte créé avec succès ! Bienvenue.",
    loggedInSuccess: "Connexion réussie ! Bienvenue.",
    emailNotFoundError: "Compte introuvable. Veuillez d'abord vous inscrire.",
    invalidPasswordError: "Mot de passe incorrect.",
    emailAlreadyRegisteredError: "Cet email est déjà enregistré. Connectez-vous.",
    fillAllFieldsError: "Veuillez remplir tous les champs obligatoires.",
    shortPasswordError: "Le mot de passe doit comporter au moins 8 caractères avec lettres et chiffres.",
    invalidEmailError: "Veuillez saisir un email valide.",
    welcomeBack: "Bon retour parmi nous,",
    signedInAs: "Connecté avec succès en tant que",
    logoutBtn: "Déconnexion",
    backToHome: "Retour à l'accueil",
    visitorAccount: "Compte Visiteur Vérifié",
    securityNote: "Vos données sont protégées selon les normes de sécurité internationales.",

    forgotPasswordTitle: "Réinitialiser le mot de passe",
    forgotPasswordSubtitle: "Saisissez votre adresse email enregistrée et nous vous enverrons un code à 6 chiffres pour définir un nouveau mot de passe.",
    enterCodeTitle: "Saisir le code de vérification",
    enterCodeSubtitle: "Saisissez le code à 6 chiffres envoyé à votre adresse email.",
    newPasswordTitle: "Définir un nouveau mot de passe",
    newPasswordSubtitle: "Créez un nouveau mot de passe sécurisé pour votre compte.",
    confirmPasswordLabel: "Confirmer le nouveau mot de passe",
    confirmPasswordPlaceholder: "••••••••",
    sendCodeBtn: "Envoyer le code",
    verifyCodeBtn: "Vérifier et continuer",
    saveNewPasswordBtn: "Enregistrer le mot de passe",
    resendCodeIn: "Renvoyer le code dans",
    resendCodeBtn: "Renvoyer le code maintenant",
    backToLogin: "Retour à la connexion",
    changeEmail: "Changer d'adresse email",
    passwordResetSuccess: "Mot de passe réinitialisé !",
    passwordResetSuccessMsg: "Votre mot de passe a été mis à jour avec succès. Vous pouvez maintenant vous connecter.",
    passwordsDoNotMatch: "Les mots de passe ne correspondent pas.",
    passwordsMatch: "Les mots de passe correspondent ✓",
    otpCodePlaceholder: "0 0 0 0 0 0",
    codeSentNotice: "Code de vérification envoyé avec succès.",
    simulationCodeNotice: "Code de test rapide :",
  },
  it: {
    pageTitle: "Accedi ad AgriPort",
    pageSubtitle: "Il tuo portale per esplorare i prodotti ortofrutticoli e gestire le spedizioni internazionali.",
    badge: "Portale Visitatori e Clienti Autorizzati",
    tabSignIn: "Accedi",
    tabRegister: "Crea Account",
    socialGoogle: "Continua con Google",
    socialApple: "Continua con Apple",
    orContinueWithEmail: "o continua via email",
    nameLabel: "Nome completo",
    namePlaceholder: "es. Marco Rossi",
    emailLabel: "Indirizzo Email",
    emailPlaceholder: "nome@azienda.it",
    passwordLabel: "Password",
    passwordPlaceholder: "••••••••",
    phoneLabel: "Numero di telefono per paese",
    searchCountry: "Cerca paese o prefisso...",
    rememberMe: "Ricordami",
    forgotPassword: "Password dimenticata?",
    signInBtn: "Accedi",
    registerBtn: "Crea Account",
    noAccountPrompt: "Non hai un account?",
    createAccountLink: "Registrati ora",
    hasAccountPrompt: "Hai già un account?",
    signInLink: "Accedi",
    registeredSuccess: "Account creato con successo! Benvenuto.",
    loggedInSuccess: "Accesso effettuato con successo! Benvenuto.",
    emailNotFoundError: "Account non trovato. Registrati prima.",
    invalidPasswordError: "Password errata.",
    emailAlreadyRegisteredError: "Questa email è già registrata. Effettua l'accesso.",
    fillAllFieldsError: "Compila tutti i campi obbligatori.",
    shortPasswordError: "La password deve contenere almeno 8 caratteri con lettere e numeri.",
    invalidEmailError: "Inserisci un'email valida.",
    welcomeBack: "Bentornato,",
    signedInAs: "Accesso effettuato come",
    logoutBtn: "Disconnetti",
    backToHome: "Torna alla Home",
    visitorAccount: "Account Visitatore Verificato",
    securityNote: "I tuoi dati sono protetti secondo i più elevati standard internazionali.",

    forgotPasswordTitle: "Reimposta Password",
    forgotPasswordSubtitle: "Inserisci l'email registrata e ti invieremo un codice di verifica a 6 cifre per impostare una nuova password.",
    enterCodeTitle: "Inserisci codice di verifica",
    enterCodeSubtitle: "Inserisci il codice a 6 cifre inviato alla tua email.",
    newPasswordTitle: "Imposta nuova password",
    newPasswordSubtitle: "Crea una nuova password sicura per il tuo account.",
    confirmPasswordLabel: "Conferma nuova password",
    confirmPasswordPlaceholder: "••••••••",
    sendCodeBtn: "Invia codice di verifica",
    verifyCodeBtn: "Verifica e continua",
    saveNewPasswordBtn: "Salva nuova password",
    resendCodeIn: "Reinvia codice tra",
    resendCodeBtn: "Reinvia codice ora",
    backToLogin: "Torna al login",
    changeEmail: "Modifica email",
    passwordResetSuccess: "Password reimpostata con successo!",
    passwordResetSuccessMsg: "La tua password è stata aggiornata. Ora puoi accedere con le nuove credenziali.",
    passwordsDoNotMatch: "Le password non coincidono.",
    passwordsMatch: "Le password coincidono ✓",
    otpCodePlaceholder: "0 0 0 0 0 0",
    codeSentNotice: "Codice di verifica inviato con successo alla tua email.",
    simulationCodeNotice: "Codice di test rapido:",
  },
  es: {
    pageTitle: "Iniciar sesión en AgriPort",
    pageSubtitle: "Tu portal global para explorar productos agrícolas frescos y coordinar envíos internacionales.",
    badge: "Portal de Visitantes y Clientes Autorizados",
    tabSignIn: "Iniciar Sesión",
    tabRegister: "Crear Cuenta",
    socialGoogle: "Continuar con Google",
    socialApple: "Continuar con Apple",
    orContinueWithEmail: "o continuar con correo",
    nameLabel: "Nombre Completo",
    namePlaceholder: "ej. Carlos Morales",
    emailLabel: "Correo Electrónico",
    emailPlaceholder: "nombre@empresa.com",
    passwordLabel: "Contraseña",
    passwordPlaceholder: "••••••••",
    phoneLabel: "Número de teléfono según el país",
    searchCountry: "Buscar país o código...",
    rememberMe: "Recordarme",
    forgotPassword: "¿Olvidaste tu contraseña?",
    signInBtn: "Iniciar Sesión",
    registerBtn: "Crear Cuenta",
    noAccountPrompt: "¿No tienes una cuenta?",
    createAccountLink: "Regístrate ahora",
    hasAccountPrompt: "¿Ya tienes cuenta?",
    signInLink: "Iniciar Sesión",
    registeredSuccess: "¡Cuenta creada exitosamente! Bienvenido.",
    loggedInSuccess: "¡Sesión iniciada con éxito! Bienvenido.",
    emailNotFoundError: "Cuenta no encontrada. Por favor regístrate primero.",
    invalidPasswordError: "Contraseña incorrecta.",
    emailAlreadyRegisteredError: "Este correo ya está registrado. Inicia sesión.",
    fillAllFieldsError: "Por favor completa todos los campos requeridos.",
    shortPasswordError: "La contraseña debe tener al menos 8 caracteres con letras y números.",
    invalidEmailError: "Por favor ingresa un correo válido.",
    welcomeBack: "Bienvenido de nuevo,",
    signedInAs: "Sesión iniciada como",
    logoutBtn: "Cerrar Sesión",
    backToHome: "Volver al Inicio",
    visitorAccount: "Cuenta de Visitante Verificada",
    securityNote: "Tus datos están protegidos bajo estándares internacionales de cifrado.",

    forgotPasswordTitle: "Restablecer contraseña",
    forgotPasswordSubtitle: "Ingresa tu correo registrado y te enviaremos un código de 6 dígitos para establecer una nueva contraseña.",
    enterCodeTitle: "Ingresar código de verificación",
    enterCodeSubtitle: "Ingresa el código de 6 dígitos enviado a tu correo.",
    newPasswordTitle: "Establecer nueva contraseña",
    newPasswordSubtitle: "Crea una contraseña nueva y segura para tu cuenta.",
    confirmPasswordLabel: "Confirmar nueva contraseña",
    confirmPasswordPlaceholder: "••••••••",
    sendCodeBtn: "Enviar código de verificación",
    verifyCodeBtn: "Verificar y continuar",
    saveNewPasswordBtn: "Guardar nueva contraseña",
    resendCodeIn: "Reenviar código en",
    resendCodeBtn: "Reenviar código ahora",
    backToLogin: "Volver a Iniciar Sesión",
    changeEmail: "Cambiar correo electrónico",
    passwordResetSuccess: "¡Contraseña restablecida con éxito!",
    passwordResetSuccessMsg: "Tu contraseña ha sido actualizada. Ya puedes iniciar sesión con tus nuevas credenciales.",
    passwordsDoNotMatch: "Las contraseñas no coinciden.",
    passwordsMatch: "Las contraseñas coinciden ✓",
    otpCodePlaceholder: "0 0 0 0 0 0",
    codeSentNotice: "Código de verificación enviado con éxito a tu correo.",
    simulationCodeNotice: "Código de prueba rápida:",
  },
};
