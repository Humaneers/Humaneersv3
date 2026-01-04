import { View } from "../../App";
import { Button } from "../ui/button";
import { Home, ArrowLeft } from "lucide-react";

interface NotFoundProps {
  onViewChange: (view: View) => void;
}

export function NotFound({ onViewChange }: NotFoundProps) {
  return (
    <div className="min-h-screen bg-[#F5F1E9] flex items-center justify-center p-6">
      <div className="max-w-lg w-full text-center">
        <div className="text-[#B87333] text-9xl font-bold mb-4">404</div>
        <h1 className="text-3xl font-bold text-[#1B263B] mb-4">Page Not Found</h1>
        <p className="text-[#4E596F] mb-8 text-lg">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => window.history.back()}
            variant="outline"
            className="border-[#1B263B] text-[#1B263B]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
          <Button
            onClick={() => onViewChange("home")}
            className="bg-[#1B263B] hover:bg-[#2c3b55] text-white"
          >
            <Home className="w-4 h-4 mr-2" />
            Return Home
          </Button>
        </div>
      </div>
    </div>
  );
}
