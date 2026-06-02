import {
  Bell,
  CameraOff,
  Eye,
  Repeat,
  Scale,
  Shirt,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  Users,
  type LucideIcon,
} from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  Bell,
  CameraOff,
  Eye,
  Repeat,
  Scale,
  Shirt,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  Users,
}

type PsychologyIconProps = {
  icon: string
  className?: string
  size?: number
}

export function PsychologyIcon({
  icon,
  className,
  size = 22,
}: PsychologyIconProps) {
  const Icon = iconMap[icon] ?? Sparkles

  return <Icon className={className} size={size} aria-hidden="true" />
}
