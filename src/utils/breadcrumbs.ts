import { ERoutes } from "@/types/routes";

export const generateBreadcrumbs = (
  pathName: string,
  productTitle = ""
): { path: string; text: string }[] => {
  const paths = pathName.split("/").filter((path) => path.trim() !== "");
  const breadcrumbsArr = [{ path: "/", text: "Home" }];

  if (paths[0] === ERoutes.PRODUCTS_LIST) {
    breadcrumbsArr.push({
      path: `/${ERoutes.PRODUCTS_LIST}`,
      text: "All products",
    });
  }
  if (paths[0] === ERoutes.CART) {
    breadcrumbsArr.push({ path: `/${ERoutes.CART}`, text: "Checkout page" });
  }
  if (paths[1]) {
    breadcrumbsArr.push({
      path: `/${ERoutes.PRODUCTS_LIST}/${paths[1]}`,
      text: productTitle,
    });
  }

  return breadcrumbsArr;
};
