export const TOKEN_KEY = "token";
export const ROLE_KEY = "role";

export function normalizeRole(role) {
  if (!role) {
    return null;
  }
  const raw = String(role).toUpperCase();
  return raw.startsWith("ROLE_") ? raw.replace("ROLE_", "") : raw;
}

export function setAuthSession(token, role) {
  localStorage.setItem(TOKEN_KEY, token);
  const normalizedRole = normalizeRole(role);
  if (normalizedRole) {
    localStorage.setItem(ROLE_KEY, normalizedRole);
  }
}

export function clearAuthSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ROLE_KEY);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getRole() {
  return normalizeRole(localStorage.getItem(ROLE_KEY));
}

function decodeJwtPayload(token) {
  try {
    const payload = token.split(".")[1];
    if (!payload) {
      return null;
    }
    const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

export function isTokenExpired(token) {
  if (!token) {
    return true;
  }
  const payload = decodeJwtPayload(token);
  if (!payload?.exp) {
    return false;
  }
  return Date.now() >= payload.exp * 1000;
}

export function extractRoleFromToken(token) {
  const payload = decodeJwtPayload(token);
  return normalizeRole(payload?.role || payload?.authorities?.[0] || payload?.scope || null);
}
