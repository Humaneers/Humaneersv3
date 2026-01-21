import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Home, ArrowLeft } from "lucide-react";
import { routePaths } from "../../routes";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-brand-cream flex items-center justify-center p-6">
      <div className="max-w-lg w-full text-center">
        <div className="text-brand-copper text-9xl font-bold mb-4">404</div>
        <h1 className="text-3xl font-bold text-brand-oxford mb-4">Page Not Found</h1>
        <p className="text-brand-slate mb-8 text-lg">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="border-brand-oxford text-brand-oxford"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
          <Button className="bg-brand-oxford hover:bg-brand-oxford-muted text-white" asChild>
            <Link to={routePaths.home}>
              <Home className="w-4 h-4 mr-2" />
              Return Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
