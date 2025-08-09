import { useEffect, useMemo, useState } from "react";

type ReleaseAsset = {
  name: string;
  browser_download_url: string;
};

type ReleaseInfo = {
  tag_name: string;
  assets: ReleaseAsset[];
};

function detectPlatform() {
  const ua = navigator.userAgent.toLowerCase();
  if (/macintosh|mac os x/.test(ua)) return "mac";
  if (/windows/.test(ua)) return "win";
  if (/linux/.test(ua)) return "linux";
  return "other";
}

async function fetchLatestRelease(): Promise<ReleaseInfo | null> {
  const res = await fetch("https://api.github.com/repos/dyad-sh/dyad/releases/latest", {
    headers: { Accept: "application/vnd.github+json" },
  });
  if (!res.ok) return null;
  const json = await res.json();
  return {
    tag_name: json.tag_name as string,
    assets: (json.assets as any[]).map((a) => ({
      name: a.name as string,
      browser_download_url: a.browser_download_url as string,
    })),
  };
}

function pickAsset(assets: ReleaseAsset[], platform: string) {
  const byPriority =
    platform === "mac"
      ? [".dmg", "arm64.dmg", "universal.dmg"]
      : platform === "win"
      ? [".exe", "Setup.exe", ".msi"]
      : platform === "linux"
      ? [".AppImage", ".deb", ".rpm"]
      : [];

  for (const ext of byPriority) {
    const item = assets.find((a) => a.name.includes(ext));
    if (item) return item;
  }
  return null;
}

export function DownloadButtons({ dense = false }: { dense?: boolean }) {
  const platform = useMemo(detectPlatform, []);
  const [release, setRelease] = useState<ReleaseInfo | null>(null);

  useEffect(() => {
    fetchLatestRelease().then(setRelease).catch(() => setRelease(null));
  }, []);

  const primary = release ? pickAsset(release.assets, platform) : null;
  const all = release?.assets ?? [];

  return (
    <div className="flex flex-col gap-3">
      {primary ? (
        <a
          href={primary.browser_download_url}
          className={`inline-flex items-center justify-center rounded-lg border border-border bg-primary text-primary-foreground hover:opacity-95 transition px-4 ${dense ? "h-9 text-sm" : "h-10 text-base"}`}
        >
          تنزيل {platform === "mac" ? "لـ macOS" : platform === "win" ? "لـ Windows" : platform === "linux" ? "لـ Linux" : ""} — {release?.tag_name}
        </a>
      ) : (
        <div className="text-sm opacity-80">جاري جلب روابط التنزيل الحقيقية…</div>
      )}

      <details className="rounded-lg border border-border bg-card p-3">
        <summary className="cursor-pointer select-none text-sm">روابط لكل الأنظمة</summary>
        <ul className="mt-2 space-y-2 text-sm">
          {all.map((a) => (
            <li key={a.name} className="flex items-center justify-between gap-2">
              <span className="truncate">{a.name}</span>
              <a className="underline opacity-90 hover:opacity-100" href={a.browser_download_url}>
                تنزيل
              </a>
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}