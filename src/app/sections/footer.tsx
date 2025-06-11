import React from 'react';
import { portfolioConfig } from '@/app/config';

const Footer: React.FC = () => {
  const { copyright, tagline } = portfolioConfig.footer;

  return (
    <footer className="py-8 px-4 border-t border-gray-800">
      <div className="container mx-auto text-center">
        <p className="text-gray-300 text-sm">{copyright}</p>
        <p className="text-gray-400 text-xs mt-2">{tagline}</p>
      </div>
    </footer>
  );
};

export { Footer };
