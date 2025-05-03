import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");

  return (
    <nav className="text-sm text-gray-500 mb-4">
      <Link to="/" className="text-blue-600 hover:underline">
        Home
      </Link>
      {pathnames.map((name, index) => {
        const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
        const isLast = index === pathnames.length - 1;

        // Only enhance if on search page
        const label =
          name === "search" && query
            ? `Search: "${decodeURIComponent(query)}"`
            : decodeURIComponent(name).replace(/-/g, " ");

        return (
          <span key={routeTo}>
            {" / "}
            {isLast ? (
              <span className="font-medium text-gray-700">{label}</span>
            ) : (
              <Link to={routeTo} className="text-blue-600 hover:underline">
                {label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
