import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center gradient-soft">
      <div className="text-center px-6 animate-fade-in">
        <p className="font-serif text-9xl text-gradient mb-4">404</p>
        <h1 className="font-serif text-4xl mb-3">Page Not Found</h1>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">The page you're looking for has drifted away. Let us guide you back home.</p>
        <Button asChild size="lg" className="rounded-full gradient-hero text-primary-foreground">
          <Link to="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
