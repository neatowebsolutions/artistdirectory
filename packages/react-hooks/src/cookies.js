import UniversalCookies from 'universal-cookie';

const getDomain = () => {
  if (typeof window === 'undefined') {
    return undefined;
  }

  // Do not specify host for localhost.
  if (window.location.host.includes('localhost')) {
    return undefined;
  }

  // Use full host as cookies will not be used on multiple domains.
  return window.location.host;
};

class Cookies {
  constructor(cookieString) {
    this.cookies = new UniversalCookies(cookieString);
  }

  get(name) {
    // This automatically deserializes objects.
    return this.cookies.get(name);
  }

  set(name, value, options = {}) {
    const defaultOptions = {
      path: '/',
      maxAge: (60 * 60 * 24 * 365) / 12, // 1 month in relative seconds
      secure:
        typeof window !== 'undefined' && window.location.protocol === 'https:', // Secure based on protocol.
      sameSite: 'Strict',
      domain: getDomain(), // Use top-level domain.
      httpOnly: false // Allow access on client side.
    };

    // This automatically serializes objects.
    this.cookies.set(name, value, { ...defaultOptions, ...options });
  }

  remove(name, options) {
    const defaultOptions = {
      path: '/',
      domain: getDomain()
    };

    this.cookies.remove(name, { ...defaultOptions, ...options });
  }
}

const useCookies = (cookieString) => {
  const cookies = new Cookies(cookieString);
  const getCookie = (name) => {
    return cookies.get(name);
  };

  const setCookie = (name, value, options = {}) => {
    return cookies.set(name, value, options);
  };

  const removeCookie = (name, options = {}) => {
    return cookies.remove(name, options);
  };

  return { getCookie, setCookie, removeCookie };
};

export default useCookies;
