// associations 0826 V16.js
// V16: Volume V lands — the eight chapters of One God, One Name, One Throne.
// Six expected counts bump (see the Book 05 handoff, Part Five):
//   pulpit-vocabulary 14 -> 21, trinity-examined 4 -> 6, two-stage-salvation
//   22 -> 24, lost-in-translation 18 -> 19, goel-kopher 12 -> 13, the-mishkan
//   12 -> 13. The pulpit-vocabulary jump is the big one: this book becomes a
//   third of that cluster in one batch. Defensible — the cluster is named for
//   exactly what the book does — but it moves the panel's centre of gravity.
// NOTE the counts land only when the chapters lift out of draft; they are
// carried here now so the registry and the posts ship together.
// V15: The four Living Temple studies join lost-in-translation; expected 14 -> 18.
// The four Living Temple studies join lost-in-translation; expected 14 -> 18.
// NOTE: they were specced for a "the-law-stands" cluster too. No such cluster
// exists in this registry and one was not invented, so all four carry
// lost-in-translation only — which is why this is +4 and not the +3 specced.
// Restore the-law-stands and re-tag when that cluster is written.
// V14: Two Kingdoms, One Walk added to delegated-authority; expected bumped +1.

export const CLUSTERS = {
  "two-stage-salvation": {
    label: "The Two-Stage Salvation",
    blurb:
      "Entry by the blood, walk by the bread. The framework the pulpit collapsed into a single step.",
    anchor: "bread-and-wine",
    expected: 24,
  },

  "lost-in-translation": {
    label: "Lost in Translation",
    blurb:
      "Helel became Lucifer. Kappōret became a mercy seat. Qesheth became a rainbow. Har Mo'ed became Megiddo. What the English buried, and what it cost.",
    anchor: "the-lucifer-deception",
    expected: 19,
  },

  "how-yahuah-speaks": {
    label: "How Yahuah Speaks",
    blurb:
      "The sky, the letters, the words, and at last His own Son. He has already spoken — the question is whether we will hear what was given.",
    anchor: "heavens-letters-words-son",
    expected: 7,
  },

  "the-second-adam": {
    label: "The First Adam and the Second",
    blurb:
      "The image was sonship. Adam lost it, Seth inherited the loss, and the Second Adam put it back on every man who trusts Him.",
    anchor: "the-bearer-2-unseen-and-image",
    expected: 8,
  },

  "whose-righteousness": {
    label: "Whose Work Is It?",
    blurb:
      "Fruit belongs to the owner of the tree. The covering belongs to the one who made it. Self-generated righteousness has always been filthy rags.",
    anchor: "clothed-by-the-owner",
    expected: 10,
  },

  "garments-and-covering": {
    label: "Garments and Covering",
    blurb:
      "Beged, ketonet, simlah, fine linen — from fig leaves to the robe of the bride. What you wear declares who covered you.",
    anchor: "clothed-by-the-owner",
    expected: 6,
  },

  "delegated-authority": {
    label: "The Right Hand and the Heirs",
    blurb:
      "Authority given, never seized. The Son at the right hand, the heirs in His throne, and the kingdom handed back to the Father.",
    anchor: "the-throne-and-the-right-hand",
    expected: 9,
  },

  "pulpit-vocabulary": {
    label: "What the Words Actually Mean",
    blurb:
      "Words the pulpit softened, sweetened, or reinvented outright — and what the Hebrew and Greek actually say.",
    anchor: "the-whole-counsel",
    expected: 21,
  },

  "goel-kopher": {
    label: "The Go'el and the Kopher",
    blurb:
      "Yahuah as sole Redeemer, the Son as the price paid. The legal spine under the whole atonement question.",
    anchor: "the-redeemer-who-never-needed-redeeming",
    expected: 13,
  },

  "the-mishkan": {
    label: "The Mishkan and the Veil",
    blurb:
      "The structure Yahuah designed: ark, cover, veil, garments — and who may pass through what.",
    anchor: "ark-of-covering",
    expected: 13,
  },

  "yom-kippur": {
    label: "Yom Kippur and the Two Goats",
    blurb:
      "The Day of Atonement pattern: the goat that was slain, the goat that was not, and what the church never explains.",
    anchor: "goat-that-was-not-slain",
    expected: 6,
  },

  "light-and-lamp": {
    label: "The Light and the Lamp",
    blurb:
      "Yahuah is the source; the Son is the lamp that bears it. The Father speaks, the Son delivers. The impression is not the engraver.",
    anchor: "the-bearer-1-light-and-lamp",
    expected: 10,
  },

  "the-moedim": {
    label: "The Appointed Times",
    blurb:
      "Yahuah's moedim as He set them — the days, the timing, and what was kept on each.",
    anchor: "seven-feasts-in-exodus",
    expected: 13,
  },

  "restored-creation": {
    label: "Garden to Garden",
    blurb:
      "Eden planted, Eden closed, Eden restored. The arc that ends with the Tree of Knowledge absent and the curse gone.",
    anchor: "paradise-restored",
    expected: 9,
  },

  "cosmology-north": {
    label: "The Throne and the North",
    blurb:
      "The shape of what Yahuah made, the direction of His dwelling, and the machine built to hide both.",
    anchor: "throne-above-the-north",
    expected: 6,
  },

  "foreign-fire": {
    label: "Foreign Fire",
    blurb:
      "Borrowed worship, borrowed names, borrowed fire — traced back to where it was struck.",
    anchor: "esther-ishtar-marduk",
    expected: 12,
  },

  "trinity-examined": {
    label: "Trinity Studies",
    blurb:
      "The Godhead the text actually shows. Every throne vision names two, not three; worship and service sort the same way — the pattern the doctrine has to explain away.",
    anchor: "the-throne-and-the-right-hand",
    expected: 6,
  },
};

// --- helpers (unchanged) -------------------------------------------------

export const getCluster = (key) =>
  CLUSTERS[key] || { label: key, blurb: "", anchor: null, expected: null };

export const clusterKeys = () => Object.keys(CLUSTERS);

export const keysFor = (study) =>
  (study?.associations || []).filter((k) => k in CLUSTERS);

export const hasAssociations = (study) => keysFor(study).length > 0;

export const labelsFor = (study) => keysFor(study).map((k) => CLUSTERS[k].label);

export const membersOf = (key, allStudies = []) => {
  const anchorSlug = getCluster(key).anchor;
  return allStudies
    .filter((s) => (s.associations || []).includes(key))
    .sort((a, b) => {
      if (a.slug === anchorSlug) return -1;
      if (b.slug === anchorSlug) return 1;
      const ao = a.order ?? 99;
      const bo = b.order ?? 99;
      if (ao !== bo) return ao - bo;
      return (a.title || "").localeCompare(b.title || "");
    });
};

export const isAnchorOf = (study, key) => getCluster(key).anchor === study?.slug;

// --- Astro glue (preserved from the site port; not in the source registry) ---

/** Map a `posts` collection entry to the flat study shape the helpers expect.
 *  deck falls back to subtitle, then description. category is carried through so
 *  the Associated Studies panel can drop same-category siblings (V3 filter). */
export const toStudy = (post) => ({
  slug: post.slug,
  title: post.data.title,
  deck: post.data.deck || post.data.subtitle || post.data.description || "",
  category: post.data.category,
  associations: post.data.associations || [],
  order: post.data.order,
});
