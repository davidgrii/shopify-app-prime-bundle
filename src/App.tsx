import {Container} from "@/components/container.tsx";
import {BundlePreview} from "@/components/bundle-preview.tsx";
import {BundleSettings} from "@/components/bundle-settings.tsx";
import {Breadcrumbs} from "@/components/breadcrumbs.tsx";
import React, {useState} from "react";
import type {IBundleSettings} from "@/types.ts";

function App() {
  const [bundleSettings, setBundleSettings] = useState<IBundleSettings>({
    bundleTitle: 'Bundle & Save',
    tiers: [
      {
        id: 1,
        name: "Rainbow Dust",
        image: 'https://web.archive.org/web/20250329191243im_/https://spacegoods.com/cdn/shop/files/1bag_img_300x.png?v=1719596057',
        quantity: 1,
        badge: '',
        description: "Standard Price",
        originalPrice: 49.00,
        discountedPrice: 39.00,
        discount: 10,
        variants: [
          {
            id: 'coffee',
            label: 'Coffee',
            image: 'https://web.archive.org/web/20250329191243im_/https://spacegoods.com/cdn/shop/files/6626cf79f4741b98d7b5d32a7e87540a_300x.webp?v=1719595663'
          },
          {
            id: 'vanilla-cinnamon',
            label: 'Vanilla Cinnamon',
            image: 'https://web.archive.org/web/20250329191243im_/https://spacegoods.com/cdn/shop/files/1122d0319a64b308cb5a854488fdd444_300x.webp?v=1719595656'
          },
          {
            id: 'chocolate',
            label: 'Chocolate',
            image: 'https://web.archive.org/web/20250329191243im_/https://spacegoods.com/cdn/shop/files/e78d5f28b1f6b05900a56d0b9aba2378_300x.webp?v=1719595657'
          },
          {
            id: 'strawberry',
            label: 'Strawberry',
            image: 'https://web.archive.org/web/20250329191243im_/https://spacegoods.com/cdn/shop/files/strawberry_web_300x.jpg?v=1721389895'
          },
          {
            id: 'raw-chocolate',
            label: 'Raw Chocolate (Decaf)',
            image: 'https://web.archive.org/web/20250329191243im_/https://spacegoods.com/cdn/shop/files/raw_choc_300x.jpg?v=1723536323'
          }
        ]
      },
      {
        id: 2,
        name: "Rainbow Dust",
        image: 'https://web.archive.org/web/20250329191243im_/https://spacegoods.com/cdn/shop/files/2bag_img_300x.png?v=1719596058',
        quantity: 2,
        badge: "Most Popular",
        description: "Buy 2 and Save $20",
        originalPrice: 79.00,
        discountedPrice: 59.00,
        discount: 20,
        variants: [
          {
            id: 'coffee',
            label: 'Coffee',
            image: 'https://web.archive.org/web/20250329191243im_/https://spacegoods.com/cdn/shop/files/6626cf79f4741b98d7b5d32a7e87540a_300x.webp?v=1719595663'
          },
          {
            id: 'vanilla-cinnamon',
            label: 'Vanilla Cinnamon',
            image: 'https://web.archive.org/web/20250329191243im_/https://spacegoods.com/cdn/shop/files/1122d0319a64b308cb5a854488fdd444_300x.webp?v=1719595656'
          },
          {
            id: 'chocolate',
            label: 'Chocolate',
            image: 'https://web.archive.org/web/20250329191243im_/https://spacegoods.com/cdn/shop/files/e78d5f28b1f6b05900a56d0b9aba2378_300x.webp?v=1719595657'
          },
          {
            id: 'strawberry',
            label: 'Strawberry',
            image: 'https://web.archive.org/web/20250329191243im_/https://spacegoods.com/cdn/shop/files/strawberry_web_300x.jpg?v=1721389895'
          },
          {
            id: 'raw-chocolate',
            label: 'Raw Chocolate (Decaf)',
            image: 'https://web.archive.org/web/20250329191243im_/https://spacegoods.com/cdn/shop/files/raw_choc_300x.jpg?v=1723536323'
          }
        ]
      },
      {
        id: 3,
        name: "Rainbow Dust",
        image: 'https://web.archive.org/web/20250329191243im_/https://spacegoods.com/cdn/shop/files/3bag_img_300x.png?v=1719596059',
        quantity: 3,
        badge: "Best Value",
        description: "Buy 3 and Save $25",
        originalPrice: 99.00,
        discountedPrice: 74.00,
        discount: 25,
        variants: [
          {
            id: 'coffee',
            label: 'Coffee',
            image: 'https://web.archive.org/web/20250329191243im_/https://spacegoods.com/cdn/shop/files/6626cf79f4741b98d7b5d32a7e87540a_300x.webp?v=1719595663'
          },
          {
            id: 'vanilla-cinnamon',
            label: 'Vanilla Cinnamon',
            image: 'https://web.archive.org/web/20250329191243im_/https://spacegoods.com/cdn/shop/files/1122d0319a64b308cb5a854488fdd444_300x.webp?v=1719595656'
          },
          {
            id: 'chocolate',
            label: 'Chocolate',
            image: 'https://web.archive.org/web/20250329191243im_/https://spacegoods.com/cdn/shop/files/e78d5f28b1f6b05900a56d0b9aba2378_300x.webp?v=1719595657'
          },
          {
            id: 'strawberry',
            label: 'Strawberry',
            image: 'https://web.archive.org/web/20250329191243im_/https://spacegoods.com/cdn/shop/files/strawberry_web_300x.jpg?v=1721389895'
          },
          {
            id: 'raw-chocolate',
            label: 'Raw Chocolate (Decaf)',
            image: 'https://web.archive.org/web/20250329191243im_/https://spacegoods.com/cdn/shop/files/raw_choc_300x.jpg?v=1723536323'
          }
        ]
      },
    ],
    colorThemeSettings: {
      accentColor: '#0098ff',
      cardBackgroundColor: '#ffffff',
      backgroundColor: '#eff0f5',
      textColor: '#0e1b4d',
    },

    layout: 'compact',

    shouldShowSavingsBadge: true,
    shouldShowOriginalPrice: true,
    shouldShowGuarantee: true,
    shouldShowShareButton: true,
  })

  const [activeTierId, setActiveTierId] = useState(1)
  const [activePlan, setActivePlan] = useState<'flexible' | 'onetime'>('flexible')

  return (
    <div
      style={{
        '--color-primary': bundleSettings.colorThemeSettings.accentColor,
        '--color-background': bundleSettings.colorThemeSettings.backgroundColor,
        '--color-foreground': bundleSettings.colorThemeSettings.cardBackgroundColor,
        '--color-secondary': bundleSettings.colorThemeSettings.textColor,
      } as React.CSSProperties}
    >
      <Container
        className='my-5'
      >
        <Breadcrumbs/>

        <div className='flex gap-4 justify-between'>
          <BundleSettings
            setActiveTierId={setActiveTierId}
            settings={bundleSettings}
            setSettings={setBundleSettings}
          />

          <BundlePreview
            activePlan={activePlan}
            setActivePlan={setActivePlan}
            setActiveTierId={setActiveTierId}
            activeTierId={activeTierId}
            settings={bundleSettings}
          />
        </div>
      </Container>
    </div>
  )
}

export default App
