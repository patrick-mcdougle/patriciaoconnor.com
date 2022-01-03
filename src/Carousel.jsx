import Link from 'next/link';
import PropTypes from 'prop-types';
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import GalleryTimerContext from './contexts/GalleryTimerContext';

function Carousel({ items }) {
  const changeTrigger = useContext(GalleryTimerContext);
  const [height, setHeight] = useState(0);
  const slidesRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex((oldIndex) => {
      const candidateIndex = oldIndex + 1;
      if (candidateIndex === items.length) {
        return 0;
      }
      return candidateIndex;
    });
  }, [changeTrigger, items]);

  function checkSizes() {
    setHeight(() => {
      let maxHeight = 0;
      slidesRef.current.forEach((slide) => {
        maxHeight = Math.max(maxHeight, slide.scrollHeight);
      });
      return maxHeight;
    });
  }

  useEffect(checkSizes, [slidesRef]);
  useEffect(() => {
    let rafId;
    function handleResize() {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      rafId = window.requestAnimationFrame(checkSizes);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <ul className="slides" style={{ height }}>
      {items.map((item, index) => {
        let img = <img src={item.src} alt={item.alt ?? ''} onLoad={checkSizes}/>;
        if (item.link) {
          img = <Link href={item.link}><a>{img}</a></Link>;
        }
        if (index === activeIndex) {
          return (
            <li key={index} ref={(el) => { slidesRef.current[index] = el; }} className="active">
              {img}
            </li>
          );
        }
        return <li key={index} ref={(el) => { slidesRef.current[index] = el; }}>{img}</li>;
      })}
    </ul>
  );
}

Carousel.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
  })).isRequired,
};

export default Carousel;
