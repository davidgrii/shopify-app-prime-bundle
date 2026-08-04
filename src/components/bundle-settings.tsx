import React, {useEffect} from "react";
import type {IBundleSettings} from "@/types.ts";
import { cn } from "@/utils.ts";

interface IProps {
  settings: IBundleSettings
  setSettings: (settings: IBundleSettings) => void
}

export const BundleSettings: React.FC<IProps> = ({settings, setSettings}) => {
  const {
    bundleTitle,
    colorThemeSettings,
    tiers,
    shouldShowSavingsBadge,
    shouldShowGuarantee,
    shouldShowOriginalPrice,
    shouldShowDeliveryInfo,
    shouldShowInfoBadges
  } = settings

  const handleBundleTitleChange = (value: string) => {
    const updatedSettings = {
      ...settings,
      bundleTitle: value,
    }

    setSettings(updatedSettings)
  }

  const handleTierTitleChange = (value: string, tierId: number) => {
    setSettings({
      ...settings,
      tiers: tiers.map((tier) => {
        return tier.id === tierId ? {...tier, name: value} : tier
      }),
    })
  }

  const handleDisplayOptionsToggle = (id: string, value: boolean) => {
    setSettings({
      ...settings,
      [id]: !value
    })
  }

  const handleColorThemeSettingsChange = (id: string, value: string) => {
    setSettings({
      ...settings,
      colorThemeSettings: {
        ...settings.colorThemeSettings,
        [id]: value
      }
    })
  }

  useEffect(() => {
    document.body.style.backgroundColor = colorThemeSettings.backgroundColor;
  }, [colorThemeSettings.backgroundColor]);

  return (
    <div
      className='bg-foreground w-full max-w-5/12 rounded-xl px-4 py-6 shadow flex flex-col gap-6 overflow-y-scroll max-h-[calc(100vh-100px)] overflow-x-hidden'
      style={{
        '--color-primary': colorThemeSettings.accentColor,
        '--color-background': colorThemeSettings.backgroundColor,
        '--color-foreground': colorThemeSettings.cardBackgroundColor,
        '--color-secondary': colorThemeSettings.textColor,
      } as React.CSSProperties}
    >
      <label className='flex flex-col gap-1.5 text-sm font-medium text-secondary/60'>
        <span>
          Bundle Title <span className='text-specials-danger'>*</span>
        </span>

        <input
          defaultValue={bundleTitle}
          onChange={(e) => handleBundleTitleChange(e.target.value)}
          className='flex border-black/10 bg-transparent px-4 py-2 font-medium text-secondary shadow-[0px_2px_11px_0px_#0000000F] rounded-lg border w-full h-11 focus:outline-2 outline-primary'
        />
      </label>

      <div className='w-full h-px shrink-0 bg-black/5'/>

      <div className='flex flex-col gap-3'>
        <span className='text-sm font-medium text-secondary/60'>Tiers</span>

        {tiers.map(({name, id}, i) => (
          <div key={i} className='flex items-center gap-3'>
            <div className='flex flex-col gap-1 flex-1'>
              <input
                defaultValue={name}
                placeholder='Tier name'
                onChange={(e) => handleTierTitleChange(e.target.value, id)}
                className='border-black/10 bg-transparent px-4 py-2 font-medium text-secondary shadow-[0px_2px_11px_0px_#0000000F] rounded-lg border w-full h-10 text-sm focus:outline-2 outline-primary'
              />
            </div>

            <div className='flex items-center gap-1.5 shrink-0'>
              <input
                type='number'
                defaultValue={tiers[i].discount}
                className='border-black/10 bg-transparent px-3 py-2 font-medium text-secondary shadow-[0px_2px_11px_0px_#0000000F] rounded-lg border w-16 h-10 text-sm text-center focus:outline-2 outline-primary'
              />
              <span className='text-sm text-secondary/50 font-medium'>%</span>
            </div>
          </div>
        ))}
      </div>

      <div className='w-full h-px shrink-0 bg-black/5'/>

      <div className='flex flex-col gap-2'>
        <span className='text-sm font-medium text-secondary/60'>Color Theme Settings</span>

        {[
          {id: 'accentColor', label: 'Accent Color', value: colorThemeSettings.accentColor},
          {id: 'cardBackgroundColor', label: 'Card Color', value: colorThemeSettings.cardBackgroundColor},
          {id: 'backgroundColor', label: 'Background Color', value: colorThemeSettings.backgroundColor},
          {id: 'textColor', label: 'Text Color', value: colorThemeSettings.textColor},
        ].map(({id, label, value}) => (
          <div key={id} className='flex flex-col gap-1.5'>
            <span className='text-xs font-medium text-secondary'>{label}</span>

            <div className='flex items-center gap-3'>
              <input
                type='color'
                value={value}
                onChange={(e) => handleColorThemeSettingsChange(id, e.target.value)}
                className='size-10 rounded-lg border border-black/10 cursor-pointer bg-transparent p-1.5'
              />

              <input
                value={value}
                onChange={(e) => handleColorThemeSettingsChange(id, e.target.value)}
                className='border-black/10 bg-transparent px-4 py-2 font-medium text-secondary shadow-[0px_2px_11px_0px_#0000000F] rounded-lg border flex-1 h-10 text-sm focus:outline-2 outline-primary uppercase'
              />
            </div>
          </div>
        ))}

      </div>

      <div className='w-full h-px shrink-0 bg-black/5'/>

      <div className='flex flex-col gap-4'>
        <span className='text-sm font-medium text-secondary/60'>Display Options</span>

        {[
          {id: 'shouldShowSavingsBadge', label: 'Show savings badge', value: shouldShowSavingsBadge},
          {id: 'shouldShowOriginalPrice', label: 'Show original price', value: shouldShowOriginalPrice},
          {id: 'shouldShowGuarantee', label: 'Show money-back guarantee', value: shouldShowGuarantee},
          {id: 'shouldShowDeliveryInfo', label: 'Show  delivery info', value: shouldShowDeliveryInfo},
          {id: 'shouldShowInfoBadges', label: 'Show info badges', value: shouldShowInfoBadges},
        ].map(({id, label, value}) => (
          <div key={label} className='flex items-center justify-between'>
            <span className='text-sm font-medium text-secondary'>{label}</span>

            <button
              onClick={() => handleDisplayOptionsToggle(id, value)}
              className={cn(
                'relative w-11 h-6 rounded-full transition-colors duration-200',
                value ? 'bg-primary' : 'bg-black/15'
              )}
            >
              <div className={cn(
                'absolute top-[2px] size-5 bg-white rounded-full shadow transition-transform duration-200',
                value ? 'translate-x-[21px]' : 'translate-x-[3px]'
              )}/>
            </button>
          </div>
        ))}
      </div>

    </div>
  )
}