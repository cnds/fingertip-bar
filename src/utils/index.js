export const isPhone = (value) => /^1[3456789]\d{9}$/.test(value);

export const isWeixin = () => {
  return (
    navigator?.userAgent?.toLowerCase()?.includes("micromessenger") ||
    typeof navigator?.wxuserAgent !== "undefined"
  );
};

export function isIOS() {
  const userAgent = window.navigator.userAgent;
  return /iPhone|iPad|iPod/i.test(userAgent);
}
