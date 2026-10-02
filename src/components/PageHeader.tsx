import React from 'react';
import { Info } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  description: string;
  badge?: string;
  children?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  badge,
  children
}) => {
  return (
    <div className="glass-panel p-4 md:p-5 border border-white/10 flex flex-wrap items-center justify-between gap-4 w-full">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <h1 className="text-base md:text-lg font-bold text-white tracking-tight truncate">
            {title}
          </h1>
          {badge && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#1EC1CB]/15 text-[#1EC1CB] border border-[#1EC1CB]/30">
              {badge}
            </span>
          )}
          <span className="group relative cursor-help shrink-0">
            <Info className="w-3.5 h-3.5 text-white/40 hover:text-[#1EC1CB] transition" />
            <div className="absolute left-5 top-0 hidden group-hover:block w-72 p-2.5 rounded-xl glass-modal border border-white/20 text-xs text-white/90 shadow-2xl z-30 pointer-events-none">
              {description}
            </div>
          </span>
        </div>
        <p className="text-xs text-white/50 mt-0.5 truncate max-w-2xl">
          {description}
        </p>
      </div>

      {children && (
        <div className="flex items-center gap-2.5 flex-wrap">
          {children}
        </div>
      )}
    </div>
  );
};
