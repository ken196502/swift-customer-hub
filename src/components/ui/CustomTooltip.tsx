import { useState, useRef, useEffect } from 'react';

interface CustomTooltipProps {
  content: string | React.ReactNode;
  children: React.ReactNode;
  maxWidth?: number;
}

export function CustomTooltip({ content, children, maxWidth = 300 }: CustomTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const hideTimeout = useRef<NodeJS.Timeout>();
  const showTimeout = useRef<NodeJS.Timeout>();

  const updatePosition = () => {
    if (!triggerRef.current) return;
    
    const rect = triggerRef.current.getBoundingClientRect();
    setPosition({
      top: rect.top + window.scrollY - 8,
      left: rect.left + rect.width / 2 + window.scrollX,
    });
  };

  const handleMouseEnter = () => {
    if (hideTimeout.current) {
      clearTimeout(hideTimeout.current);
      hideTimeout.current = undefined;
    }
    
    updatePosition();
    
    if (!isMounted) {
      setIsMounted(true);
      // 等待下一帧确保元素已经挂载
      requestAnimationFrame(() => {
        updatePosition();
        showTimeout.current = setTimeout(() => {
          setIsVisible(true);
        }, 50);
      });
    } else {
      showTimeout.current = setTimeout(() => {
        setIsVisible(true);
      }, 50);
    }
  };

  const handleMouseLeave = () => {
    if (showTimeout.current) {
      clearTimeout(showTimeout.current);
      showTimeout.current = undefined;
    }
    
    hideTimeout.current = setTimeout(() => {
      setIsVisible(false);
    }, 100);
  };

  useEffect(() => {
    if (isMounted) {
      updatePosition();
      window.addEventListener('resize', updatePosition);
      const scrollableElements = document.querySelectorAll('*');
      scrollableElements.forEach(el => {
        if (el.scrollHeight > el.clientHeight) {
          el.addEventListener('scroll', updatePosition);
        }
      });
      
      return () => {
        window.removeEventListener('resize', updatePosition);
        scrollableElements.forEach(el => {
          el.removeEventListener('scroll', updatePosition);
        });
      };
    }
  }, [isMounted]);

  useEffect(() => {
    return () => {
      if (showTimeout.current) clearTimeout(showTimeout.current);
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
    };
  }, []);

  return (
    <div className="relative inline-block">
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="inline-block w-full"
      >
        {children}
      </div>
      {isMounted && (
        <div
          ref={tooltipRef}
          className={`fixed z-50 p-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-md shadow-lg transition-opacity duration-200 ${
            isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
            transform: 'translate(-50%, -100%)',
            maxWidth: `${maxWidth}px`,
          }}
          onMouseEnter={() => {
            if (hideTimeout.current) {
              clearTimeout(hideTimeout.current);
              hideTimeout.current = undefined;
            }
          }}
          onMouseLeave={handleMouseLeave}
        >
          <div className="relative">
            <div className="absolute -bottom-1 left-1/2 w-3 h-3 -translate-x-1/2 translate-y-1/2 rotate-45 bg-white border-r border-b border-gray-200" />
            <div className="relative z-10 p-2 bg-white rounded">
              {content}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomTooltip;
