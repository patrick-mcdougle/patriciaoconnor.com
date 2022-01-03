import Link from 'next/link';
import React, {
  PropsWithChildren,
} from 'react';

function Layout({ children }: PropsWithChildren<{}>) {
  return (
    <>
      <div id="nav-container">
        <div className="nav-wrap">
          <Link href="/"><a className="home">Patrica O&rsquo;Connor</a></Link>
          <nav id="primary-nav">
            <Link href="/#All%20Projects"><a>Work</a></Link>
            <Link href="/about"><a>About</a></Link>
          </nav>
        </div>
      </div>
      { children }
    </>
  );
}

export default Layout;
