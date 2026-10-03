import React, { useState, useRef, useEffect, useId } from 'react';
import ReactDOM from 'react-dom';
import { ChevronDown, Check } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

export interface CustomSelectProps {
  value: string;
  onChange?: (e: { target: { value: string; name?: string } }) => void;
  onValueChange?: (value: string) => void;
  options?: SelectOption[];
  children?: React.ReactNode;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  name?: string;
  id?: string;
  'aria-label'?: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  onValueChange,
  options: directOptions,
  children,
  placeholder = 'Select...',
  className = '',
  disabled = false,
  name = '',
  id,
  'aria-label': ariaLabel
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
  const [isFlipped, setIsFlipped] = useState(false);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const autoId = useId();
  const selectId = id || autoId;

  // Parse options either from direct options prop or from React children (<option>)
  const parsedOptions: SelectOption[] = React.useMemo(() => {
    if (directOptions && directOptions.length > 0) {
      return directOptions;
    }
    const list: SelectOption[] = [];
    React.Children.forEach(children, (child) => {
      if (!React.isValidElement<{ value?: string | number; children?: React.ReactNode }>(child)) return;
      if (child.props) {
        const val = child.props.value !== undefined ? String(child.props.value) : '';
        let lbl = '';
        if (typeof child.props.children === 'string' || typeof child.props.children === 'number') {
          lbl = String(child.props.children);
        } else if (Array.isArray(child.props.children)) {
          lbl = child.props.children
            .map((c: unknown) => (typeof c === 'string' || typeof c === 'number' ? String(c) : ''))
            .join('');
        } else {
          lbl = val;
        }
        list.push({
          value: val,
          label: lbl || val
        });
      }
    });
    return list;
  }, [directOptions, children]);

  const selectedOption = parsedOptions.find((opt) => String(opt.value) === String(value));

  // Compute position relative to viewport and flip if near bottom
  const updatePosition = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const dropdownHeight = Math.min(parsedOptions.length * 36 + 16, 240);
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const shouldFlip = spaceBelow < dropdownHeight && spaceAbove > spaceBelow;

    setIsFlipped(shouldFlip);
    setDropdownStyle({
      position: 'fixed',
      left: `${rect.left}px`,
      width: `${rect.width}px`,
      minWidth: `${rect.width}px`,
      maxWidth: 'calc(100vw - 16px)',
      ...(shouldFlip
        ? { bottom: `${window.innerHeight - rect.top + 4}px`, top: undefined }
        : { top: `${rect.bottom + 4}px`, bottom: undefined }),
      maxHeight: '240px',
      zIndex: 99999
    });
  };

  useEffect(() => {
    if (isOpen) {
      updatePosition();
      // Find initial highlighted index
      const currentIndex = parsedOptions.findIndex((opt) => String(opt.value) === String(value));
      setHighlightedIndex(currentIndex >= 0 ? currentIndex : 0);

      const handleScrollOrResize = () => {
        updatePosition();
      };

      const handleMouseDownOutside = (e: MouseEvent) => {
        const target = e.target as Node;
        if (
          triggerRef.current &&
          !triggerRef.current.contains(target) &&
          panelRef.current &&
          !panelRef.current.contains(target)
        ) {
          setIsOpen(false);
        }
      };

      window.addEventListener('resize', handleScrollOrResize);
      window.addEventListener('scroll', handleScrollOrResize, true);
      document.addEventListener('mousedown', handleMouseDownOutside);

      return () => {
        window.removeEventListener('resize', handleScrollOrResize);
        window.removeEventListener('scroll', handleScrollOrResize, true);
        document.removeEventListener('mousedown', handleMouseDownOutside);
      };
    }
  }, [isOpen, value, parsedOptions]);

  // Scroll highlighted item into view
  useEffect(() => {
    if (isOpen && highlightedIndex >= 0 && optionRefs.current[highlightedIndex]) {
      optionRefs.current[highlightedIndex]?.scrollIntoView({
        block: 'nearest'
      });
    }
  }, [highlightedIndex, isOpen]);

  const selectOption = (opt: SelectOption) => {
    if (disabled) return;
    onChange?.({ target: { value: opt.value, name } });
    onValueChange?.(opt.value);
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev < parsedOptions.length - 1 ? prev + 1 : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : parsedOptions.length - 1));
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < parsedOptions.length) {
          selectOption(parsedOptions[highlightedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        triggerRef.current?.focus();
        break;
      case 'Tab':
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  return (
    <div className="relative inline-block w-full">
      <button
        ref={triggerRef}
        type="button"
        id={selectId}
        disabled={disabled}
        onClick={() => {
          if (!disabled) {
            setIsOpen((prev) => !prev);
          }
        }}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel}
        className={`glass-input flex items-center justify-between gap-2 text-left cursor-pointer transition select-none disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:border-[#1EC1CB] focus:ring-2 focus:ring-[#1EC1CB]/25 ${
          isOpen ? 'border-[#1EC1CB] ring-2 ring-[#1EC1CB]/25 bg-white/[0.08]' : ''
        } ${className}`}
      >
        <span className="truncate flex items-center gap-2">
          {selectedOption?.icon && <span>{selectedOption.icon}</span>}
          <span className={selectedOption ? 'text-[var(--text-primary,#FFFFFF)]' : 'text-white/40'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-white/50 shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#1EC1CB]' : ''
          }`}
        />
      </button>

      {isOpen &&
        ReactDOM.createPortal(
          <div
            ref={panelRef}
            style={{
              ...dropdownStyle,
              backgroundColor: 'rgba(28, 28, 40, 0.96)',
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              border: '1px solid var(--glass-border, rgba(255, 255, 255, 0.11))'
            }}
            role="listbox"
            tabIndex={-1}
            className={`overflow-y-auto p-1.5 rounded-[14px] shadow-2xl shadow-black/80 animate-in fade-in zoom-in-95 duration-100 ${
              isFlipped ? 'origin-bottom' : 'origin-top'
            }`}
          >
            <div className="space-y-0.5">
              {parsedOptions.length === 0 ? (
                <div className="px-3 py-2 text-xs text-white/40 text-center select-none">
                  No options available
                </div>
              ) : (
                parsedOptions.map((opt, index) => {
                  const isSelected = String(opt.value) === String(value);
                  const isHighlighted = index === highlightedIndex;

                  return (
                    <div
                      key={`${opt.value}-${index}`}
                      ref={(el) => {
                        optionRefs.current[index] = el;
                      }}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => selectOption(opt)}
                      onMouseEnter={() => setHighlightedIndex(index)}
                      className={`px-3 py-2 text-xs rounded-[10px] flex items-center justify-between gap-2 cursor-pointer transition select-none ${
                        isSelected
                          ? 'text-[#1EC1CB] font-semibold bg-[#1EC1CB]/15'
                          : isHighlighted
                          ? 'bg-[var(--accent-soft,rgba(30,193,203,0.14))] text-white'
                          : 'text-[var(--text-primary,rgba(255,255,255,0.92))] hover:bg-[var(--accent-soft,rgba(30,193,203,0.14))] hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        {opt.icon && <span>{opt.icon}</span>}
                        <span className="truncate">{opt.label}</span>
                      </div>
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-[#1EC1CB] shrink-0 stroke-[2.5]" />
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default CustomSelect;
