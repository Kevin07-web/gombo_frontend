export const STATUS_VALUES = [
  "ACTIF",
  "INACTIF",
  "SUSPENDU",
  "ENCOURS",
  "EN_ATTENTE",
  "CLOTURER",
  "OCCUPER",
] as const;
export type STATUS = (typeof STATUS_VALUES)[number];

export const BASIC_STATUS_VALUES = ["ACTIF", "INACTIF"] as const;
export type BASIC_STATUS = (typeof BASIC_STATUS_VALUES)[number];
