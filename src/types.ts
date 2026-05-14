import type React from 'react';

export type IconProps = React.HTMLAttributes<SVGElement>;

export interface IBundleSettings {
  bundleTitle: string

  tiers: ITier[]
  badges: string[]
  colorThemeSettings: {
    accentColor: string
    cardBackgroundColor: string
    backgroundColor: string
    textColor: string
  }

  shouldShowSavingsBadge: boolean
  shouldShowOriginalPrice: boolean
  shouldShowGuarantee: boolean
  shouldShowDeliveryInfo: boolean
  shouldShowInfoBadges: boolean
}

interface ITier {
  id: number
  name: string
  image: string
  quantity: number
  badge: string
  description: string
  originalPrice: number
  discountedPrice: number
  discount: number
  variants: {
    id: string
    label: string
    image: string
  }[]
}