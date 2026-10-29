import React from 'react';

interface SectionHeadingProps {
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  theme?: 'light' | 'dark';
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  kicker,
  title,
  subtitle,
  align = 'center',
  theme = 'light'
}) => {
  const isCenter = align === 'center';
  const isRight = align === 'right';

  const alignClass = isCenter ? 'text-center items-center' : isRight ? 'text-right items-end' : 'text-left items-start';
  const lineAlignClass = isCenter ? 'mx-auto' : isRight ? 'ml-auto' : 'mr-auto';

  return (
    <div className={`flex flex-col ${alignClass} mb-10`}>
      {kicker && (
        <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#C9A66B] mb-2 block">
          {kicker}
        </span>
      )}
      <h2
        className={`font-playfair text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight ${
          theme === 'dark' ? 'text-[#F7F3EC]' : 'text-[#17140F]'
        }`}
        style={{ textWrap: 'balance' }}
      >
        {title}
      </h2>
      <div className={`w-10 h-[2px] bg-[#C9A66B] mt-3 mb-3 ${lineAlignClass}`} />
      {subtitle && (
        <p
          className={`text-sm sm:text-base max-w-2xl font-normal ${
            theme === 'dark' ? 'text-[#EDE6DA]/80' : 'text-[#6B645B]'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
