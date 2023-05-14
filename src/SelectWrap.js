import react from 'react';

const SelectWrap = ( {children, className,ariaPressed, handleClick, ariaLabel, style = {} } ) => {
  return (
    <div
    className={className}
    onClick={ handleClick }
    style={style}
    aria-pressed={ariaPressed}
    aria-label={ariaLabel}
    >
      {children}
    </div>
  )
}

export default SelectWrap