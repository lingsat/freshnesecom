import { IProduct } from "@Products/types/product";
import { ERoutes } from "@/types/routes";

interface IBreadCrumb {
  path: string;
  text: string;
}

export const generateBreadcrumbs = (
  pathName: string,
  product: IProduct | null
): IBreadCrumb[] => {
  const paths = pathName.split("/").filter((path) => path.trim() !== "");
  const breadcrumbsArr = [{ path: "/", text: "Home" }];

  if (paths[0]) {
    breadcrumbsArr.push(getMiddleCrumb(paths[0]));
  }

  if (paths[1]) {
    const crumbText =
      product && product.id === paths[1] ? product.title : "Not Found";
    breadcrumbsArr.push({
      path: `/${ERoutes.PRODUCTS_LIST}/${paths[1]}`,
      text: crumbText,
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
