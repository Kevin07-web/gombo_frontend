import { AlertTriangle, Lock, XCircle, Info } from "lucide-react";
import type { ReactNode } from "react";

type ErrorProps = {
  status?: number;
  content?: ReactNode; // Permet d’envoyer du JSX complètement personnalisé
};

type StatusConfig = {
  title?: string;
  message?: string;
  Icon?: typeof AlertTriangle;
  color?: string;
  customContent?: ReactNode; // Si tu veux remplacer tout
};

const statusMap: Record<number, StatusConfig> = {
  400: {
    message: "Requête invalide.",
    Icon: XCircle,
    color: "text-yellow-600",
  },
  401: {
    message: "Vous n'êtes pas autorisé.",
    Icon: Lock,
    color: "text-orange-600",
  },
  403: { message: "Accès refusé.", Icon: Lock, color: "text-orange-700" },
  404: {
    message: "Élément introuvable.",
    Icon: AlertTriangle,
    color: "text-red-600",
  },
  500: {
    message: "Erreur serveur.",
    Icon: AlertTriangle,
    color: "text-red-700",
  },
  503: {
    customContent: (
      <div className="flex flex-col items-center gap-3 text-center">
        <Info className="h-6 w-6 text-blue-600" />
        <p className="text-[13px]">
          Service indisponible, réessayez plus tard.
        </p>
        <button className="mt-2 rounded bg-blue-500 px-3 py-1 text-white">
          Actualiser
        </button>
      </div>
    ),
  },
};

export default function Error({ status = 500, content }: ErrorProps) {
  const config = statusMap[status] || {
    message: "Erreur inconnue.",
    Icon: AlertTriangle,
    color: "text-gray-600",
  };

  // Si un content personnalisé est passé via props, on l’affiche
  if (content) return <>{content}</>;

  // Sinon si le statut a un customContent, on l’affiche
  if (config.customContent) return <>{config.customContent}</>;

  const Icon = config.Icon!;

  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div
        className={`h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center`}
      >
        <Icon className={`h-6 w-6 ${config.color}`} />
      </div>
      <p className="text-[13px]">{config.message}</p>
    </div>
  );
}
