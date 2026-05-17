import {Icons} from "./icons.tsx";
import React, {useState} from "react";
import {cn} from "@/components/ui/cn.ts";
import type {IBundleSettings} from "@/types.ts";

interface IProps {
  settings: IBundleSettings
  activeTierId: number
  activePlan: 'flexible' | 'onetime'
  setActiveTierId: (activeTierId: number) => void
  setActivePlan: (activePlan: 'flexible' | 'onetime') => void
}

export const BundlePreview: React.FC<IProps> = (
  {
    settings,
    activeTierId,
    activePlan,
    setActiveTierId,
    setActivePlan
  }) => {
  const [selectedQuantity, setSelectedQuantity] = useState(1)
  const [selectedFlavour, setSelectedFlavour] = useState(0)

  const {
    bundleTitle,
    tiers,
    shouldShowSavingsBadge,
    shouldShowGuarantee,
    shouldShowOriginalPrice,
    shouldShowDeliveryInfo,
    shouldShowInfoBadges,
    badges
  } = settings

  const currentTier = tiers.find(t => t.id === activeTierId)!
  const displayPrice = activePlan === 'onetime'
    ? currentTier.originalPrice
    : (currentTier.originalPrice - currentTier.discount)

  const handleQuantityChange = (id: number) => {
    setSelectedQuantity(tiers.find(t => t.id === id)?.quantity ?? 1)
    setActiveTierId(id)
  }

  const handleFlavourChange = (index: number) => {
    setSelectedFlavour(index)
  }

  return (
    <div
      className='flex flex-col gap-4 rounded-xl lg:px-4 lg:py-6 w-full overflow-y-auto h-fit lg:max-h-[calc(100vh-100px)] lg:max-w-8/12 xl:max-w-7/12'
    >
      <h2 className='text-4xl font-bold text-secondary text-nowrap'>{bundleTitle}</h2>

      <div className='flex gap-3 -mb-4 relative z-10'>
        <div className='relative flex-1'>
          <button
            onClick={() => setActivePlan('flexible')}
            className={cn('bg-image-right w-full flex gap-3 items-center h-[93px] overflow-hidden transition-opacity duration-200 rounded-tl-xl px-4 py-3 text-left hover:opacity-100',
              activePlan === 'flexible' ? 'active-plan-bg-image-right' : 'opacity-60'
            )}
          >
            <div className={cn(
              'size-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5',
              activePlan === 'flexible' ? 'border-primary' : 'border-gray-300'
            )}>
              {activePlan === 'flexible' && <div className='size-[11px] rounded-full bg-primary'/>}
            </div>

            <div className='relative flex items-center w-full pr-13 justify-between'>
              <div>
                <span className='text-xs font-semibold text-primary block'>Flexible plan:</span>

                <span className='text-xl font-bold text-secondary'>
                  ${activePlan === 'flexible' ? currentTier.discountedPrice.toFixed(2) : '39.00'}
                  <span className='text-xs font-medium text-secondary/50'>per bag</span>
                </span>
              </div>

              <span className='text-xs text-secondary font-semibold'>$1.30/serving</span>
              <span
                className='absolute -top-3 right-13 text-xs font-semibold text-white bg-primary px-3 py-0.5 rounded-sm text-nowrap'>most popular</span>
            </div>
          </button>
        </div>

        <button
          onClick={() => setActivePlan('onetime')}
          className={cn('flex-1 flex gap-3 items-center justify-center pl-4 h-[93px] transition-opacity duration-200 py-3 rounded-tr-xl hover:opacity-100',
            activePlan !== 'flexible' ? 'active-plan-bg-image-left' : 'opacity-60')}
        >
          <div className={cn(
            'size-5 rounded-full border-2 flex items-center justify-center shrink-0',
            activePlan === 'onetime' ? 'border-primary' : 'border-gray-300'
          )}>
            {activePlan === 'onetime' && <div className='size-[11px] rounded-full bg-primary'/>}
          </div>

          <span className='text-sm font-semibold text-secondary'>
            One-time purchase:
            <span
              className='font-bold'
            >
              $${activePlan === 'onetime' ? currentTier.originalPrice.toFixed(2) : '49.00'}</span>
          </span>
        </button>
      </div>

      <div className='flex flex-col gap-4 w-full mb-2'>
        {(() => {
          const tier = tiers.find(t => t.id === activeTierId) ?? tiers[0]
          return (
            <article
              key={tier.id}
              className={cn('overflow-hidden shadow rounded-b-xl px-5 pt-6 pb-5 flex flex-col gap-3 bg-foreground',
                activePlan === 'flexible' ? 'rounded-r-xl' : 'rounded-l-xl'
              )}
            >
              <div className={cn('flex items-start justify-between', !shouldShowSavingsBadge && 'items-center')}>
                <div className='flex items-center gap-2'>
                  <div>
                    <div className='flex items-center gap-2'>
                      <h3 className='text-4xl font-semibold text-secondary'>{tier.name}</h3>

                      {shouldShowSavingsBadge && (
                        <span
                          className={cn('flex items-center justify-center text-xs font-semibold text-white bg-primary w-fit px-3 py-1 rounded-sm')}>
                            Save ${tier.discount}
                          </span>
                      )}
                    </div>
                    <p className='text-sm text-secondary/50 font-medium'>{tier.description}</p>
                  </div>
                </div>

                <div className='flex flex-col items-end'>
                    <span className='text-4xl font-extrabold text-primary'>
                      ${displayPrice.toFixed(2)}
                    </span>

                  {tier.discount && shouldShowOriginalPrice && (
                    <span className='text-sm text-black/40 font-medium line-through'>
                      ${activePlan === 'onetime' ? '0.00' : tier.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>

              <div className='flex flex-col gap-6'>
                <div className='flex flex-col gap-1.5 w-full'>
                  <span className='text-xs font-medium text-secondary/50'>Flavour</span>

                  <div className='grid grid-cols-3 gap-3'>
                    {tier.variants.map(({id, label, image}, variantIndex) => (
                      <button
                        key={id}
                        type='button'
                        onClick={(e) => {
                          e.stopPropagation()
                          handleFlavourChange(variantIndex)
                        }}
                        style={{flex: selectedFlavour === variantIndex ? '2' : '1'}}
                        className={cn(
                          'flex gap-1 h-14 items-center justify-center border-dashed border-3 transition-all bg-foreground duration-300 ease-in-out px-3 py-1 rounded-lg font-medium text-xs w-full',
                          selectedFlavour === variantIndex
                            ? 'border-primary border-solid text-primary'
                            : 'border-black/10 bg-white text-secondary hover:border-primary'
                        )}
                      >
                        <img
                          src={image}
                          alt={label}
                          className='h-10'
                        />
                        <span className='block max-w-24 font-semibold text-center'>{label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className='flex flex-col gap-1.5 w-full'>
                  <span className='text-xs font-medium text-secondary/50'>Quantity</span>

                  <div className='flex gap-3'>
                    {tiers.map(({id, quantity, discount, image}) => (
                      <button
                        key={id}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleQuantityChange(id)
                        }}
                        className={cn(
                          'relative flex bg-foreground shadow gap-1 items-center justify-center px-3 pb-2 pt-4 rounded-lg text-sm font-medium border-dashed border-3 w-1/3 transition-all duration-300 ease-in-out',
                          quantity === selectedQuantity
                            ? 'border-primary border-solid text-primary'
                            : 'border-black/10 bg-white  text-secondary hover:border-primary'
                        )}
                      >
                        <div className={cn(
                          'absolute text-nowrap -top-3 right-1/2 translate-x-1/2 flex items-center justify-center text-[11px] font-semibold text-white w-fit px-3 py-0.5 rounded-sm',
                          quantity === selectedQuantity ? 'bg-primary' : 'bg-secondary'
                        )}
                        >
                          Save ${activePlan === 'onetime' && quantity === 1 ? '0' : discount}
                        </div>

                        <img src={image} alt='product' className='h-10'/>

                        <span
                          className='font-semibold text-secondary text-sm'
                        >
                            {quantity} {quantity > 1 ? 'bags' : 'bag'}
                         </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {shouldShowInfoBadges && (
                <div className='flex flex-wrap gap-x-4 gap-y-3 items-center justify-center mx-8'>
                  {badges.map((item, i) => (
                    <p
                      key={i}
                      className='flex gap-1 text-secondary items-center justify-center font-semibold text-sm'
                    >
                      <Icons.checkFullRounded className='size-4'/>
                      {item}
                    </p>
                  ))}
                </div>
              )}
            </article>
          )
        })()}
      </div>

      {shouldShowDeliveryInfo && (
        <>
          <div className='flex items-center gap-3 -mt-2 -mb-1 text-secondary text-xs font-semibold'>


            <Icons.shipping className='size-5'/> orders are typically delivered within 1-2 business days.
          </div>
        </>
      )}

      <div className='flex flex-col gap-4'>
        <button
          className='px-12 py-4 h-13 flex items-center justify-center w-full text-lg font-bold shadow text-white bg-primary rounded-lg transition duration-300 ease-in hover:bg-primary/80'>
          Add To Bug — ${displayPrice.toFixed(2)}
        </button>


        {shouldShowGuarantee && (
          <span
            className='gap-1.5 text-xs text-secondary font-semibold flex items-center mx-auto transition-transform duration-200 select-none'
          >
            <Icons.check className='size-5'/> 60-day money back guarantee
          </span>
        )}
      </div>
    </div>
  )
}