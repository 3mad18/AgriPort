// Safe no-op Clarity stubs for Ops Dashboard
export const CLARITY_PROJECT_ID = "z6bhtb3yil";

export function initClarity(_projectId?: string) {}
export function identifyUser(
  _customId?: string,
  _customSessionId?: string,
  _customPageId?: string,
  _friendlyName?: string
) {}
export function setTag(_key?: string, _value?: string | string[]) {}
export function trackEvent(_eventName?: string) {}
export function upgradeSession(_reason?: string) {}
export function setConsent(_granted?: boolean) {}

export const Clarity = {
  init: (_projectId?: string) => {},
  identify: (
    _customId?: string,
    _customSessionId?: string,
    _customPageId?: string,
    _friendlyName?: string
  ) => {},
  setTag: (_key?: string, _value?: string | string[]) => {},
  event: (_eventName?: string) => {},
  upgrade: (_reason?: string) => {},
  consentV2: (_config?: Record<string, unknown>) => {},
  consent: (_granted?: boolean) => {},
};
