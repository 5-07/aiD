// import React from "react";
// import LogoIcon from "@/assets/logo.svg";
// import MenuIcon from "@/assets/icon-menu.svg";
// import { Button } from "@/components/button";
// import Link from "next/link";

// export const Header = () => {
//   return (
//     <header className="py-4 border-b border-white/15 md:border-none sticky top-0 z-10">
//       <div className="container">
//         <div className="flex justify-between items-center md:border border-white/15 md:p-2.5 rounded-xl max-w-2xl mx-auto backdrop-blur">
//           <div>
//             <Link href="/">
//               <div className="border h-10 w-10 rounded-lg inline-flex justify-center items-center border-white/15">
//                 <LogoIcon className="h-8 w-8" />
//               </div>
//             </Link>
//           </div>
//           <div className="hidden md:block">
//             <nav className="flex gap-8 text-sm">
//               <a
//                 href="https://linktr.ee/5_07"
//                 className=" text-white/70 hover:text-white transition"
//               >
//                 {" "}
//                 Developers
//               </a>
//             </nav>
//           </div>
//           <div className="flex gap-4 items-center">
//             <Link href="/chat">
//               <Button>Get Started</Button>
//             </Link>
//             <MenuIcon className="md:hidden" />
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };
// import React from "react";
// import LogoIcon from "@/assets/logo.svg";
// import MenuIcon from "@/assets/icon-menu.svg";
// import { Button } from "@/components/button";
// import Link from "next/link";

// export const Header = () => {
//   return (
//     <header className="py-4 border-b border-white/15 md:border-none sticky top-0 z-10">
//       <div className="container">
//         <div className="flex justify-between items-center md:border border-white/15 md:p-2.5 rounded-xl max-w-2xl mx-auto backdrop-blur">
//           <div>
//             <Link href="/">
//               <div className="border h-10 w-10 rounded-lg inline-flex justify-center items-center border-white/15">
//                 <LogoIcon className="h-8 w-8" />
//               </div>
//             </Link>
//           </div>
//           <div className="hidden md:block">
//             <nav className="flex gap-8 text-sm">
//               <a
//                 href="https://linktr.ee/5_07"
//                 className=" text-white/70 hover:text-white transition"
//               >
//                 Developers
//               </a>
//             </nav>
//           </div>
//           <div className="flex gap-4 items-center">
//           <a href="/signuplogin/index.html">
//   <Button>Sign Up</Button>
// </a>
         
//             <MenuIcon className="md:hidden" />
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

import React from "react";
import LogoIcon from "@/assets/logo.svg";
import MenuIcon from "@/assets/icon-menu.svg";
import { Button } from "@/components/button";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="py-4 border-b border-white/15 md:border-none sticky top-0 z-10">
      <div className="container">
        <div className="flex justify-between items-center md:border border-white/15 md:p-2.5 rounded-xl max-w-2xl mx-auto backdrop-blur">
          <div>
            <Link href="/">
              <a className="border h-10 w-10 rounded-lg inline-flex justify-center items-center border-white/15">
                <LogoIcon className="h-8 w-8" />
              </a>
            </Link>
          </div>
          <div className="hidden md:block">
            <nav className="flex gap-8 text-sm">
              <a
                href="https://linktr.ee/5_07"
                className="text-white/70 hover:text-white transition"
              >
                Developers
              </a>
            </nav>
          </div>
          <div className="flex gap-4 items-center">
            <Link href="/signuplogin/index.html">
              <a>
                <Button>Sign Up</Button>
              </a>
            </Link>
            <MenuIcon className="md:hidden" />
          </div>
        </div>
      </div>
    </header>
  );
};
