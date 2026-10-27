export function getVisitorSiteUrl(path: string = ""): string {
  const cleanPath = path ? (path.startsWith("/") ? path : `/${path}`) : "/";
  return cleanPath;
}

export function getOpsUrl(path: string = ""): string {
  const cleanPath = path ? (path.startsWith("/") ? path : `/${path}`) : "";
  return `/ops${cleanPath}`;
}
