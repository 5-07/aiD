import Logo from '@/assets/logo.svg';
import Link from 'next/link';

export const Footer = () => {
  return ( 
  <footer className="py-5 border-t border-white/15">
    <div className="container">
      <div className="flex flex-col lg:flex-row lg:items-center gap-8">
        <div className="flex gap-2 items-center lg:flex-1">
          <Logo  className="h-6 w-6"/>
          <div className="font-medium"> aiD: AI Customer Support</div>
        </div>

        <div className="flex flex-col lg:flex-row lg:gap-7 gap-5 lg:flex-1 lg:justify-center">
          <a href="https://github.com/5-07/aiD" className="font-medium opacity-70">@5-07 on GitHub</a>
        
        </div> 
      
        <nav className="relative flex flex-col lg:flex-row lg:gap-7 gap-5 lg:flex-1 lg:justify-end">
          <a href="https://linktr.ee/5_07"className="text-white/70 hover:text-white text-xs md:text-sm transition">Developers</a>
          <Link href="/"className="text-white/70 hover:text-white text-xs md:text-sm transition">Main Page</Link>
        </nav>
      
    </div>
    </div>
  </footer>
  );
};
