import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Github, Users, GitFork, Star } from "lucide-react";

interface GitHubProfile {
  avatar_url: string;
  name: string;
  bio: string;
  followers: number;
  public_repos: number;
  html_url: string;
}

export function GitHubProfile() {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.github.com/users/hari7261")
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </Card>
    );
  }

  if (!profile) return null;

  return (
    <Card className="p-6 backdrop-blur-sm bg-card/50 border-primary/20">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <img
          src={profile.avatar_url}
          alt={profile.name}
          className="w-24 h-24 rounded-full ring-2 ring-primary/20"
        />
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-2xl font-bold mb-2">{profile.name}</h3>
          <p className="text-muted-foreground mb-4">{profile.bio}</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{profile.followers} followers</span>
            </div>
            <div className="flex items-center gap-2">
              <GitFork className="w-4 h-4" />
              <span>{profile.public_repos} repositories</span>
            </div>
            <a
              href={profile.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-500 hover:text-blue-600"
            >
              <Github className="w-4 h-4" />
              <span>View Profile</span>
            </a>
          </div>
        </div>
      </div>
    </Card>
  );
}