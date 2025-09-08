import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home/home.tsx"),
  route("product/:id", "routes/product-detail/product-detail.tsx"),
] satisfies RouteConfig;
