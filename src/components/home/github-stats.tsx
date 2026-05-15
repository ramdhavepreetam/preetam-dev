import { getGitHubStats } from "@/lib/github";
import { Star, GitBranch, Flame, Code2 } from "lucide-react";

export async function GitHubStats() {
  const stats = await getGitHubStats();

  if (!stats) return null;

  return (
    <section className="py-20 bg-slate/30 border-y border-white/5">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-md">
            <h2 className="text-3xl font-serif italic text-pearl mb-4">Building in Public</h2>
            <p className="text-mist">
              Shipping fast, breaking things, and documenting the journey. 
              My GitHub activity reflects my commitment to high-quality code and continuous learning.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full md:w-auto">
            <StatCard 
              icon={<Star className="h-5 w-5 text-gold-solar" />} 
              label="Total Stars" 
              value={stats.stars.toString()} 
            />
            <StatCard 
              icon={<GitBranch className="h-5 w-5 text-cyan-electric" />} 
              label="Public Repos" 
              value={stats.repos.toString()} 
            />
            <StatCard 
              icon={<Flame className="h-5 w-5 text-orange-500" />} 
              label="Current Streak" 
              value={`${stats.streak} days`} 
            />
            <StatCard 
              icon={<Code2 className="h-5 w-5 text-code-green" />} 
              label="Top Language" 
              value={stats.topLanguage} 
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="p-6 glass rounded-xl flex flex-col space-y-2">
      <div className="flex items-center space-x-2">
        {icon}
        <span className="text-xs font-medium text-whisper uppercase tracking-wider">{label}</span>
      </div>
      <span className="text-2xl font-bold text-pearl">{value}</span>
    </div>
  );
}
