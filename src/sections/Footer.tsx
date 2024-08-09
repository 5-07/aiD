import Logo from '@/assets/logo.svg';

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
          <div className="font-medium opacity-70">@5-07 on GitHub</div>
        
        </div> 
      
        <nav className="flex flex-col lg:flex-row lg:gap-7 gap-5 lg:flex-1 lg:justify-end">
          <a href="#"className="text-white/70 hover:text-white text-xs md:text-sm transition">Developers</a>
          <a href="#"className="text-white/70 hover:text-white text-xs md:text-sm transition">Sign Up</a>
          <a href="#"className="text-white/70 hover:text-white text-xs md:text-sm transition">Main Page</a>
        </nav>
      
    </div>
    </div>
  </footer>
  );
};
