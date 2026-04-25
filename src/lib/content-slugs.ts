type DocLikeEntry = {
  id: string;
  data: {
    slug?: string;
  };
};

export function getDocSlug(entry: DocLikeEntry) {
  return entry.data.slug ?? entry.id.replace(/-(en|pt|es)$/, "");
}
