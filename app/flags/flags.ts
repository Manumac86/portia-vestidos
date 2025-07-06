import { flag } from "flags/next";

export const launchedSiteFlag = flag({
  key: "launched-site-flag",
  description: "Flag to check if the site is launched",
  decide() {
    return !!+process.env.LAUNCHED_SITE_FLAG!;
  },
});
