import { APP_VERSION, CHANGELOG } from "../../version";
import { Seo } from "../Seo";
import { Badge } from "../ui/badge";

export function Changelog() {
  return (
    <Seo
      title="Humaneers | Changelog"
      description="Recent updates and improvements to the Humaneers platform."
      canonicalPath="/changelog"
    >
      <div className="bg-brand-cream min-h-screen py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-brand-oxford mb-4">Changelog</h1>
            <p className="text-brand-slate text-lg">
              Track the latest updates, features, and improvements to the Humaneers platform.
            </p>
          </div>

          <div className="space-y-12">
            {CHANGELOG.map((entry, index) => (
              <div key={entry.version} className="relative pl-8 border-l-2 border-brand-copper/20">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-brand-copper" />

                <div className="flex items-center gap-4 mb-4">
                  <h2 className="text-2xl font-bold text-brand-oxford">v{entry.version}</h2>
                  <Badge
                    variant={index === 0 ? "default" : "secondary"}
                    className={
                      index === 0
                        ? "bg-brand-copper hover:bg-brand-copper-dark"
                        : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                    }
                  >
                    {entry.date}
                  </Badge>
                  {index === 0 && entry.version === APP_VERSION && (
                    <span className="text-xs font-bold text-brand-copper uppercase tracking-wider">
                      Current
                    </span>
                  )}
                </div>

                <ul className="space-y-3">
                  {entry.changes.map((change, i) => (
                    <li key={i} className="text-brand-slate leading-relaxed flex items-start gap-2">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
                      <span>{change}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Seo>
  );
}
