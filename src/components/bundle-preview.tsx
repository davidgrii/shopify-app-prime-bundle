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
    shouldShowShareButton,
    layout
  } = settings

  const currentTier = tiers.find(t => t.id === activeTierId)!
  const displayPrice = activePlan === 'onetime'
    ? currentTier.originalPrice
    : currentTier.discountedPrice

  const handleTierChange = (id: number) => {
    setActiveTierId(id)
  }

  const handleQuantityChange = (id: number) => {
    setSelectedQuantity(tiers.find(t => t.id === id)?.quantity ?? 1)
    setActiveTierId(id)
  }

  const handleFlavourChange = (index: number) => {
    setSelectedFlavour(index)
  }

  const getTierPrice = (tier: typeof tiers[0]) => {
    return activePlan === 'onetime' ? tier.originalPrice : tier.discountedPrice
  }

  return (
    <div
      className='flex flex-col gap-4 bg-foreground rounded-xl px-4 py-6 w-full shadow max-w-8/12 overflow-y-auto h-fit max-h-[calc(100vh-100px)]'
    >
      <h2 className='text-4xl font-bold text-secondary text-nowrap text-center mb-2 mt-2'>{bundleTitle}</h2>

      <div className='flex gap-3'>
        <div className='relative flex-1'>
          <button
            onClick={() => setActivePlan('flexible')}
            className={cn(
              'w-full flex gap-3 items-center px-4 py-3 rounded-xl border-2 text-left transition-all duration-200',
              activePlan === 'flexible'
                ? 'border-primary bg-white shadow-md'
                : 'border-black/10 bg-gray-50 hover:border-primary/40'
            )}
          >
            <div className={cn(
              'size-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5',
              activePlan === 'flexible' ? 'border-primary' : 'border-gray-300'
            )}>
              {activePlan === 'flexible' && <div className='size-[11px] rounded-full bg-primary'/>}
            </div>

            <div className='flex items-center w-full justify-between'>
              <div>
                <span className='text-xs font-semibold text-primary block'>Flexible plan:</span>
                <span className='text-xl font-bold text-secondary'>
                  ${activePlan === 'flexible' ? currentTier.originalPrice.toFixed(2) : '39.00'}
                  <span className='text-xs font-medium text-secondary/50'>per bag</span>
                </span>
              </div>

              <span className='text-xs text-secondary font-semibold'>$1.30/serving</span>
            </div>
          </button>

          {activePlan === 'flexible' && (
            <span
              className='absolute -top-2.5 left-1/2 -translate-x-1/2 text-xs font-semibold text-white bg-primary px-3 py-0.5 rounded-sm text-nowrap'>most popular</span>
          )}
        </div>

        <button
          onClick={() => setActivePlan('onetime')}
          className={cn(
            'flex-1 flex gap-3 items-center justify-center px-4 py-3 rounded-xl border-2 transition-all duration-200',
            activePlan === 'onetime'
              ? 'border-primary bg-white shadow-md'
              : 'border-black/10 bg-gray-50 hover:border-primary/40'
          )}
        >
          <div className={cn(
            'size-5 rounded-full border-2 flex items-center justify-center shrink-0',
            activePlan === 'onetime' ? 'border-primary' : 'border-gray-300'
          )}>
            {activePlan === 'onetime' && <div className='size-[11px] rounded-full bg-primary'/>}
          </div>

          <span className='text-sm font-semibold text-secondary'>
            One-time purchase: <span className='font-bold'>${activePlan === 'onetime' ? currentTier.originalPrice.toFixed(2) : '49.00'}</span>
          </span>
        </button>
      </div>

      <div className='flex flex-col gap-4 w-full mb-2'>
        {layout === 'default' ? (
          tiers.map((tier) => (
            <article
              key={tier.id}
              onClick={() => handleTierChange(tier.id)}
              className={cn('overflow-hidden shadow transition-all duration-300 ease-in-out cursor-pointer rounded-xl border-2  px-4 py-3 flex flex-col gap-3',
                activeTierId === tier.id
                  ? 'border-primary border-solid shadow-primary/15 bg-primary/10'
                  : 'border-black/5 border-2'
              )}
            >
              <div className={cn('flex items-start justify-between', !shouldShowSavingsBadge && 'items-center')}>
                <div className='flex items-center gap-2'>
                  <div
                    className={cn('size-5 rounded-full border-2 flex items-center justify-center shrink-0',
                      activeTierId === tier.id ? 'border-primary' : 'border-gray-300'
                    )}
                  >
                    {activeTierId === tier.id && (
                      <div className='size-[13px] rounded-full bg-primary'/>
                    )}
                  </div>

                  <div>
                    <div className='flex items-center gap-2'>
                      <h3 className='text-2xl font-semibold text-secondary'>{tier.name}</h3>

                      {shouldShowOriginalPrice && (
                        <span
                          className={cn('flex items-center justify-center text-xs font-semibold text-white bg-secondary w-fit px-2 py-0.5 rounded-sm', tier.id === activeTierId && 'bg-primary')}
                        >
                        Save {tier.discount}%
                      </span>
                      )}
                    </div>

                    <p className='text-xs text-secondary/50 font-medium'>{tier.description}</p>
                  </div>
                </div>

                <div className='flex flex-col items-end'>
                <span className='text-3xl font-extrabold text-primary'>
                  ${getTierPrice(tier).toFixed(2)}
                </span>

                  {tier.discount && shouldShowSavingsBadge && (
                    <span className='text-sm text-black/40 font-medium line-through'>
                  ${tier.originalPrice.toFixed(2)}
                 </span>
                  )}
                </div>
              </div>

              {activeTierId === tier.id && (
                <div className='flex flex-col gap-2 mt-1'>
                  {Array.from({length: tier.quantity}).map((_, i) => (
                    <div key={i} className='flex items-center gap-3'>
                      <span className='text-sm text-secondary font-semibold w-4'>#{i + 1}</span>

                      <div className='relative w-full'>
                        <select
                          className='appearance-none text-secondary w-full text-md font-medium border border-black/10 rounded-lg px-4 py-2 h-11 bg-white focus:outline-none focus:border-primary transition-colors'>
                          {tier.variants.map(({id, label}) => (
                            <option
                              key={id}
                            >
                              {label}
                            </option>
                          ))}
                        </select>

                        <Icons.chevronDown
                          className='absolute right-4 top-1/2 -translate-y-1/2 size-5 text-secondary stroke-3 pointer-events-none'/>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </article>
          ))
        ) : (
          (() => {
            const tier = tiers.find(t => t.id === activeTierId) ?? tiers[0]
            return (
              <article
                key={tier.id}
                className='overflow-hidden shadow transition-all duration-300 ease-in-out rounded-xl border-2 border-black/5 px-5 pt-7 pb-5 flex flex-col gap-3 bg-primary/10'
              >
                <div className={cn('flex items-start justify-between', !shouldShowSavingsBadge && 'items-center')}>
                  <div className='flex items-center gap-2'>
                    <div>
                      <div className='flex items-center gap-2'>
                        <h3 className='text-4xl font-semibold text-secondary'>{tier.name}</h3>

                        {shouldShowOriginalPrice && (
                          <span
                            className={cn('flex items-center justify-center text-xs font-semibold text-white bg-primary w-fit px-3 py-1 rounded-sm')}>
                            Save {tier.discount}%
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

                    {tier.discount && shouldShowSavingsBadge && (
                      <span className='text-sm text-black/40 font-medium line-through'>
                        {activePlan === 'onetime' && activeTierId === 1 ? '0.00' : tier.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                <div className='flex flex-col gap-6 mt-1'>
                  <div className='flex flex-col gap-1.5 w-full'>
                    <span className='text-sm font-medium text-secondary/50'>Flavour</span>
                    <div className='flex gap-2'>
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
                            'flex flex-col gap-1 items-center justify-center border-dashed border-2 transition-all bg-foreground duration-300 ease-in-out px-3 py-1.5 rounded-lg font-medium text-xs w-full',
                            selectedFlavour === variantIndex
                              ? 'border-primary border-solid text-primary'
                              : 'border-black/10 bg-white opacity-75 text-secondary hover:border-primary scale-95'
                          )}
                        >
                          <img src={image} alt={label} className='h-12'/>
                          <span className='block max-w-24 font-semibold text-center'>{label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className='flex flex-col gap-1.5 w-full'>
                    <span className='text-sm font-medium text-secondary/50'>Quantity</span>
                    <div className='flex gap-2'>
                      {tiers.map(({id, quantity, discount, image}) => (
                        <button
                          key={id}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleQuantityChange(id)
                          }}
                          className={cn(
                            'relative flex bg-foreground shadow flex-col gap-1 items-center justify-center px-3 pb-3 pt-6 rounded-xl text-sm font-medium border-dashed border-2 w-1/3 transition-all duration-300 ease-in-out',
                            quantity === selectedQuantity
                              ? 'border-primary border-solid text-primary'
                              : 'border-black/10 scale-95 bg-white opacity-75 text-secondary hover:border-primary'
                          )}
                        >
                          <div className={cn(
                            'absolute text-nowrap -top-2.5 right-1/2 translate-x-1/2 flex items-center justify-center text-xs font-semibold text-white w-fit px-4 py-1 rounded-sm',
                            quantity === selectedQuantity ? 'bg-primary' : 'bg-secondary'
                          )}>
                            Save {discount}%
                          </div>
                          <img src={image} alt='product' className='h-16'/>
                          <span className='font-semibold text-secondary text-sm'>
                    {quantity} {quantity > 1 ? 'bags' : 'bag'}
                  </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            )
          })()
        )}
      </div>

      {shouldShowShareButton && (
        <div className='flex items-center gap-3 -mt-2 -mb-1'>
          <div className='w-full h-px bg-black/10  rounded-full'/>
          <button
            className='p-2  flex items-center justify-center w-fit text-lg font-bold text-secondary bg-white border shadow border-black/10 rounded-lg transition duration-300 ease-in hover:bg-black/5'
          >
            <Icons.share className='size-4'/>
          </button>

          <div className='w-full h-px bg-black/10  rounded-full'/>
        </div>
      )}

      <div className='flex flex-col gap-4'>
        <button
          className='px-12 gap-1.5 py-4 h-13 flex items-center justify-center w-full text-lg font-bold text-secondary bg-white border shadow border-black/10 rounded-lg transition duration-300 ease-in hover:bg-black/5'>
          Add To Cart <Icons.plus className='size-5 stroke-3'/>
        </button>

        <button
          className='px-12 py-4 h-13 flex items-center justify-center w-full text-lg font-bold shadow text-white bg-primary rounded-lg transition duration-300 ease-in hover:bg-primary/80'>
          Buy It Now — ${displayPrice.toFixed(2)}
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