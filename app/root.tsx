import {
  isRouteErrorResponse,
  Links,
  Meta,
  Link,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./styles/app.css";
import "./styles/root.scss";

import { Shirt, Dot } from "lucide-react";
import { githubRepoUrl } from "./constants";
import Loader from "./components/loader";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function HydrateFallback() {
  return (
    <main>
      <Loader />
    </main>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <div className="container">
            <div className="logo">
              <Link to="/">
                <Shirt size={28} />
                <span>Clothing Store</span>
              </Link>
            </div>
            <nav>
              <Link to="/">Home</Link>
              <Link to="/product/1">Awesome Shirt</Link>
              <Link to="/product/2">Comfy Pants</Link>
              <Link to="/product/3">Cool Shorts</Link>
              <Link to="/product/4">Warm Jacket</Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer>
          <div className="container">
            <span>
              Built by{" "}
              <a href="https://mikebostone.com" target="_blank">
                Mike Bostone
              </a>
            </span>
            <Dot size={28} />
            <a href={githubRepoUrl} target="_blank">
              View Source Code
            </a>
          </div>
        </footer>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
