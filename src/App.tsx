import {Container} from "@/components/container.tsx";
import {BundlePreview} from "@/components/bundle-preview.tsx";
import {BundleSettings} from "@/components/bundle-settings.tsx";
import {Breadcrumbs} from "@/components/breadcrumbs.tsx";
import React, {useState} from "react";
import type {IBundleSettings} from "@/types.ts";

function App() {
  const [bundleSettings, setBundleSettings] = useState<IBundleSettings>({
    bundleTitle: 'FOCUS, ENERGY + CALM',
    tiers: [
      {
        id: 1,
        name: "Rainbow Dust",
        image: '/public/1bag_img_300x.png',
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
            image: '/public/6626cf79f4741b98d7b5d32a7e87540a_300x.jpg'
          },
          {
            id: 'vanilla-cinnamon',
            label: 'Vanilla Cinnamon',
            image: '/public/1122d0319a64b308cb5a854488fdd444_300x.jpg'
          },
          {
            id: 'chocolate',
            label: 'Chocolate',
            image: '/public/e78d5f28b1f6b05900a56d0b9aba2378_300x.jpg'
          },
          {
            id: 'strawberry',
            label: 'Strawberry',
            image: '/public/strawberry_web_300x.jpg'
          },
          {
            id: 'raw-chocolate',
            label: 'Raw Chocolate (Decaf)',
            image: '/public/raw_choc_300x.jpg'
          }
        ]
      },
      {
        id: 2,
        name: "Rainbow Dust",
        image: '/public/2bag_img_300x.png',
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
            image: '/public/6626cf79f4741b98d7b5d32a7e87540a_300x.jpg'
          },
          {
            id: 'vanilla-cinnamon',
            label: 'Vanilla Cinnamon',
            image: '/public/1122d0319a64b308cb5a854488fdd444_300x.jpg'
          },
          {
            id: 'chocolate',
            label: 'Chocolate',
            image: '/public/e78d5f28b1f6b05900a56d0b9aba2378_300x.jpg'
          },
          {
            id: 'strawberry',
            label: 'Strawberry',
            image: '/public/strawberry_web_300x.jpg'
          },
          {
            id: 'raw-chocolate',
            label: 'Raw Chocolate (Decaf)',
            image: '/public/raw_choc_300x.jpg'
          }
        ]
      },
      {
        id: 3,
        name: "Rainbow Dust",
        image: '/public/3bag_img_300x.png',
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
            image: '/public/6626cf79f4741b98d7b5d32a7e87540a_300x.jpg'
          },
          {
            id: 'vanilla-cinnamon',
            label: 'Vanilla Cinnamon',
            image: '/public/1122d0319a64b308cb5a854488fdd444_300x.jpg'
          },
          {
            id: 'chocolate',
            label: 'Chocolate',
            image: '/public/e78d5f28b1f6b05900a56d0b9aba2378_300x.jpg'
          },
          {
            id: 'strawberry',
            label: 'Strawberry',
            image: '/public/strawberry_web_300x.jpg'
          },
          {
            id: 'raw-chocolate',
            label: 'Raw Chocolate (Decaf)',
            image: '/public/raw_choc_300x.jpg'
          }
        ]
      },
    ],
    badges: [
      '25% off regular price', 'never run out of product', 'free shipping', 'skip or cancel anytime'
    ],

    colorThemeSettings: {
      accentColor: '#0098ff',
      cardBackgroundColor: '#ffffff',
      backgroundColor: '#eff0f5',
      textColor: '#0e1b4d',
    },

    shouldShowSavingsBadge: true,
    shouldShowOriginalPrice: true,
    shouldShowGuarantee: true,
    shouldShowDeliveryInfo: true,
    shouldShowInfoBadges: true,
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

        <div className='flex flex-col-reverse gap-8 justify-between lg:gap-1 lg:flex-row'>
          <BundleSettings
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
