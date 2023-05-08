export const isPhone = (value) => /^1[3456789]\d{9}$/.test(value);

export const isWeixin = () => {
  return (
    navigator?.userAgent?.toLowerCase()?.includes("micromessenger") ||
    typeof navigator?.wxuserAgent !== "undefined"
  );
};
