import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { API_BASE_URL } from "@/services/api";

const OAUTH_BASE = API_BASE_URL.replace(/\/api\/?$/, "");
const REDIRECT_URI =
    `${window.location.origin}/oauth2/redirect`;

export function OAuthButtons() {
  const google = `${OAUTH_BASE}/oauth2/authorize/google?redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
  const github = `${OAUTH_BASE}/oauth2/authorize/github?redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
  return (
    <div className="grid grid-cols-2 gap-3">
      <Button
        asChild
        variant="outline"
        className="border-slate-700 bg-slate-900/60 text-slate-200 hover:bg-slate-800 hover:text-white"
      >
        <a href={google}>
          <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="#EA4335"
              d="M12 10.2v3.9h5.5c-.2 1.4-1.6 4-5.5 4-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3.3 14.6 2.3 12 2.3 6.9 2.3 2.8 6.4 2.8 11.5S6.9 20.7 12 20.7c6.9 0 9.2-4.9 9.2-7.4 0-.5 0-.9-.1-1.3H12z"
            />
          </svg>
          Google
        </a>
      </Button>
      <Button
        asChild
        variant="outline"
        className="border-slate-700 bg-slate-900/60 text-slate-200 hover:bg-slate-800 hover:text-white"
      >
        <a href={github}>
          <Github className="h-4 w-4" />
          GitHub
        </a>
      </Button>
    </div>
  );
}
