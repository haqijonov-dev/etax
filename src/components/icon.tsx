import dynamic from "next/dynamic";
import type { IconProps, IconWeight } from "@phosphor-icons/react";
import {
  ChartLineUp,
  ChartPieSlice,
  Strategy,
  Scales,
  Briefcase,
  MagnifyingGlass,
  Buildings,
  UsersThree,
  Handshake,
  GlobeHemisphereEast,
  Phone,
  EnvelopeSimple,
  MapPin,
  Quotes,
  Plus,
  Minus,
  CaretRight,
  ArrowUpRight,
  Sparkle,
} from "@phosphor-icons/react/dist/ssr";

const REGISTRY = {
  ChartLineUp,
  ChartPieSlice,
  Strategy,
  Scales,
  Briefcase,
  MagnifyingGlass,
  Buildings,
  UsersThree,
  Handshake,
  GlobeHemisphereEast,
  Phone,
  EnvelopeSimple,
  MapPin,
  Quotes,
  Plus,
  Minus,
  CaretRight,
  ArrowUpRight,
  Sparkle,
} as const;

export type IconName = keyof typeof REGISTRY;

type Props = IconProps & { name: IconName | string };

export function Icon({ name, weight = "regular" as IconWeight, ...rest }: Props) {
  const Cmp = (REGISTRY as Record<string, (p: IconProps) => React.JSX.Element>)[name as string];
  if (!Cmp) return null;
  return <Cmp weight={weight} {...rest} />;
}
