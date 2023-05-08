import react from 'react';

const SelectWrap = ( {children, className,ariaPressed, handleClick, ariaLabel, style = {} } ) => {
  return (
    <button
    type="button"
    className={className}
    onClick={ handleClick }
    style={style}
    aria-pressed={ariaPressed}
    aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}

export default SelectWrap