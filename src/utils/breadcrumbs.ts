import { ERoutes } from "@/types/routes";

interface IBreadCrumb {
  path: string;
  text: string;
}

export const generateBreadcrumbs = (
  pathName: string,
  productTitle = ""
): IBreadCrumb[] => {
  const paths = pathName.split("/").filter((path) => path.trim() !== "");
  const breadcrumbsArr = [{ path: "/", text: "Home" }];

  if (paths[0]) {
    breadcrumbsArr.push(getMiddleCrumb(paths[0]));
  }

  if (paths[1]) {
    breadcrumbsArr.push({
      path: `/${ERoutes.PRODUCTS_LIST}/${paths[1]}`,
      text: productTitle,
    });
  }

  return breadcrumbsArr;
};

const getMiddleCrumb = (route: string): IBreadCrumb => {
  const lowerRoute = route.toLowerCase();
  const validText = lowerRoute[0].toUpperCase() + lowerRoute.slice(1);
  const breadCrumb = { path: `/${lowerRoute}`, text: validText };
  switch (lowerRoute) {
    case ERoutes.PRODUCTS_LIST:
      breadCrumb.text = "All products";
      break;
    case ERoutes.CART:
      breadCrumb.text = "Checkout page";
      break;
  }
  return breadCrumb;
};
