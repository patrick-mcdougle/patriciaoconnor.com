import Link from 'next/link';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import IsMobileContext from './contexts/IsMobileContext';
import Bio from './Bio';

const openSpeed = 25;
const closeSpeed = 20;
const mobileOpenSpeed = 50;
const mobileCloseSpeed = 40;

function Layout({ children, projectCategories }) {
  const [height, setHeight] = useState(0);
  const [targetHeight, setTargetHeight] = useState(0);
  const [activeNav, setActiveNav] = useState('');
  const [animatedNav, setAnimatedNav] = useState('');
  const isMobile = useContext(IsMobileContext);
  const workRef = useRef();
  const bioRef = useRef();

  function activateSubnav(subnav) {
    if (subnav) {
      setActiveNav(subnav);
    } else {
      setTargetHeight(0);
    }
    setAnimatedNav(undefined);
  }

  useEffect(() => {
    let requestId;
    if (height !== targetHeight) {
      window.requestAnimationFrame(() => {
        if (height - targetHeight > closeSpeed) {
          setHeight((oldHeight) => oldHeight - (isMobile ? mobileCloseSpeed : closeSpeed));
        } else if (targetHeight - height > openSpeed) {
          setHeight((oldHeight) => oldHeight + (isMobile ? mobileOpenSpeed : openSpeed));
        } else {
          setHeight(targetHeight);
          if (targetHeight === 0) {
            setActiveNav('');
            setAnimatedNav('');
          } else {
            setAnimatedNav(activeNav);
          }
        }
      });
    }
    return () => {
      if (requestId) {
        window.cancelAnimationFrame(requestId);
      }
    };
  }, [height, isMobile, targetHeight]);

  useEffect(() => {
    switch (activeNav) {
      case 'work':
        setTargetHeight(workRef.current.scrollHeight);
        break;
      case 'bio':
        setTargetHeight(bioRef.current.scrollHeight);
        break;
      default:
    }
  }, [activeNav]);

  const subNavClassNames = useMemo(() => (
    ['work', 'bio'].reduce((returnValue, subNavName) => {
      const classes = [];
      if (animatedNav === subNavName) {
        classes.push('animated');
        classes.push('active');
      } else if (activeNav === subNavName) {
        classes.push('active');
      }
      return { ...returnValue, [subNavName]: classes.length ? classes.join(' ') : null };
    }, {})
  ), [activeNav, animatedNav]);

  function handleWorkClick(e) {
    if (isMobile) {
      e.preventDefault();
      if (activeNav === 'work') {
        activateSubnav();
      } else {
        activateSubnav('work');
      }
    }
  }

  return (
    <>
      <div id="nav-container" className={isMobile && activeNav ? 'open' : null} onBlur={!isMobile ? () => activateSubnav() : null} onMouseLeave={!isMobile ? () => activateSubnav() : null}>
        <div className="nav-wrap">
          <a className="home" href="/">Patrica O&rsquo;Connor</a>
          <nav id="primary-nav">
            <a href="/#All%20Projects" onClick={handleWorkClick} onFocus={!isMobile ? () => activateSubnav('work') : null} onMouseOver={!isMobile ? () => activateSubnav('work') : null}>Work</a>
            <a href="/about" onFocus={!isMobile ? () => activateSubnav('bio') : null} onMouseOver={!isMobile ? () => activateSubnav('bio') : null}>About</a>
          </nav>
        </div>
        <div id="subnav-container" style={{ height }}>
          <div id="subnav-work" ref={workRef} className={subNavClassNames.work}>
            {projectCategories.map((category) => {
              const hash = `#${encodeURIComponent(category)}`;
              return (
                <Link key={category} href={`/${hash}`}><a className="minerva">{category}</a></Link>
              );
            })}
          </div>
          <div id="subnav-bio" ref={bioRef} className={subNavClassNames.bio}>
            <Bio />
          </div>
        </div>
      </div>
      { children }
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  projectCategories: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Layout;
