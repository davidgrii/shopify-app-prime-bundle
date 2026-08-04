export const Breadcrumbs = () => {
  return (
    <div className='flex items-center justify-between mb-8 lg:mb-5'>
      <div className='flex items-center gap-2 text-sm'>
        <a className='text-secondary/50 font-medium hover:text-secondary transition-colors duration-200 cursor-pointer'>
          Settings
        </a>
        <span className='text-secondary/50'>/</span>
        <span className='text-secondary font-semibold'>Bundle Preview</span>
      </div>

      <div className='flex items-center gap-3'>
        <button className='px-6 py-2 h-10 text-sm font-semibold text-secondary bg-white border border-gray-200 rounded-lg shadow-sm transition-colors duration-200 hover:text-specials-danger'>
          Cancel
        </button>

        <button className='px-6 py-2 h-10 text-sm font-semibold text-white bg-primary rounded-lg shadow-sm transition-colors duration-200 hover:bg-primary/80'>
          Save changes
        </button>
      </div>
    </div>
  )
}