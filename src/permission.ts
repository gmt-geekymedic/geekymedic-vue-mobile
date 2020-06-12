import router from "./router";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import getPageTitle from "@/utils/get-page-title";
import { getToken } from "@/utils/auth";
import { userModule, permissionModule } from "./store/modules";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ["/index", "/login"]; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();
  // set page title
  document.title = getPageTitle(to.meta.title);
  // determine whether the user has logged in
  const token = getToken();
  if (token) {
    if (to.path === "/login") {
      // If is logged in, redirect to the home page
      next({ path: "/" });
      NProgress.done();
    } else {
      // Check whether the user has obtained his permission roles
      if (userModule.roles.length === 0) {
        try {
          // Note: roles must be a object array! such as: ['admin'] or ['developer', 'editor']
          await userModule.getUserInfo();
          const roles = userModule.roles;
          // Generate accessible routes map based on role
          permissionModule.generateRoutes(roles);
          // Dynamically add accessible routes
          router.addRoutes(permissionModule.dynamicRoutes);
          // Hack: ensure addRoutes is complete
          // Set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true });
        } catch (err) {
          // Remove token and redirect to login page
          userModule.resetToken();
          // Toast(err || "Has Error");
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      } else {
        next();
      }
    }
  } else {
    // has no token
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${encodeURIComponent(to.fullPath)}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
