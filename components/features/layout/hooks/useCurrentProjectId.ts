"use client";
import { usePathname } from "next/navigation";

export function useCurrentProjectId() {
  const path = usePathname();

  const id = getValidProjectId(path) ?? "";
  const isInsideProject = id !== "";

  return { id, isInsideProject };
}

const isValidUUID = (id: string) => {
  const looseUuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return looseUuidRegex.test(id);
};

const getValidProjectId = (path: string): string | null => {
  const match = path.match(/\/project\/([^\/]+)/);
  const id = match && match[1];
  if (match && id && isValidUUID(id)) {
    return id;
  }
  return null;
};
