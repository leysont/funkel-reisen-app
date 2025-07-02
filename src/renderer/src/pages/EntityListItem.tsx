import React from 'react'

export function EntityListItem({
  id,
  title,
  active,
  onClick,
}: {
  id: string
  title: string
  active: boolean
  onClick: () => any
}): React.ReactElement | null {
  return (
    <button
      className={
        'flex items-center gap-4 px-2 py-1' +
        ' rounded-md text-mocha-text/75' +
        (active
          ? ' bg-accent/20 text-mocha-text hover:bg-accent/25'
          : ' hover:bg-mocha-base hover:text-mocha-text cursor-pointer' +
            ' active:bg-mocha-surface-0 active:text-mocha-text cursor-pointer')
      }
      onClick={onClick}
    >
      <div className="truncate flex gap-3 items-center" title={title}>
        <span className={'opacity-50'}>{id}</span>
        <span>{title}</span>
      </div>
    </button>
  )
}
