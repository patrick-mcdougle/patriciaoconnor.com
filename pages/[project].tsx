import fs from 'fs';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import path from 'path';
import React from 'react';
import Carousel, { LinkableImageData } from '../src/Carousel';
import { getProjectData, Project } from '../src/cms/utils';
import Layout from '../src/layout';

interface AltableImageData {
  alt?: string;
}

interface MobileDesktopImage extends AltableImageData {
  desktop_img: string;
  mobile_img?: string;
}

export interface StandardImageData extends AltableImageData {
  src: string;
}

interface ClassedImageData extends StandardImageData {
  class?: string;
}

interface CarouselItem {
  background?: string;
  items: LinkableImageData[];
  type: 'carousel';
}

interface VideoItem {
  type: 'video';
  videoFile: string;
}

type ScrollGalleryItem = CarouselItem | ClassedImageData | VideoItem;

interface ScrollGallery {
  type: 'scroll-gallery';
  items: ScrollGalleryItem[];
}

interface FullBleed extends MobileDesktopImage {
  type: 'full-bleed';
}

interface FullBleedVideo {
  type: 'full-bleed-video';
  videoFile: string;
}

export type ProjectElements = ScrollGallery | FullBleed | FullBleedVideo;

interface ProjectElementProps {
  element: ProjectElements;
}

function ProjectElement({ element }: ProjectElementProps) {
  switch (element.type) {
    case 'scroll-gallery':
      return (
        <div className="scroll-gallery">
          {element.items.map((item, index) => {
            if ('type' in item) {
              switch (item.type) {
                case 'carousel':
                  return (
                    <div className="carousel" style={item.background ? { background: item.background } : undefined} key={item.items[0].src}>
                      <Carousel items={item.items} />
                    </div>
                  );
                case 'video':
                  return (<video src={item.videoFile} playsInline loop muted autoPlay controls />);
                default:
                  // @ts-ignore
                  throw new Error(`Received an unknown type for scroll gallery item: ${item.type}`);
              }
            }
            if (('src' in item)) {
              return (
                <React.Fragment key={item.src}>
                  <img className={item.class} src={item.src} alt={item.alt ?? ''} />
                  {index === element.items.length - 1 ? <br /> : null}
                </React.Fragment>
              );
            }
            return null;
          })}
        </div>
      );
    case 'full-bleed':
      return (
        <div className="full-bleed">
          {element.desktop_img && element.mobile_img ? (
            <picture>
              <source media="(min-width: 768px)" srcSet={element.desktop_img} />
              <img src={element.mobile_img} alt={element.alt ?? ''} />
            </picture>
          ) : (
            <img src={element.desktop_img} alt={element.alt ?? ''} />
          )}
        </div>
      );
    case 'full-bleed-video':
      return (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video className="full-bleed" playsInline loop muted autoPlay controls src={element.videoFile} />
      );
    default:
      return null;
  }
}

interface ProjectProps {
  project: Project & { nav: { prevProject: string; nextProject: string; }};
}

function ProjectPage({
  project,
}: ProjectProps) {
  const {
    credits,
    descriptionHTML,
    displayCategory,
    elements,
    nav,
    title,
  } = project;
  const creditKeys = Object.keys(credits);

  return (
    <Layout>
      <Head>
        <title>{`Patricia O'Connor | ${title}`}</title>
      </Head>
      <div id="project-details">
        <nav className="project-nav">
          <Link href={nav.prevProject}><a className="prev">Prev</a></Link>
          <Link href="/#All%20Projects" prefetch={false}><a>All</a></Link>
          <Link href={nav.nextProject}><a className="next">Next</a></Link>
        </nav>
        <h1 className="minerva">{title}</h1>
        <h2 className="medium">{displayCategory}</h2>
        <div dangerouslySetInnerHTML={{ __html: descriptionHTML }} />
      </div>
      {elements.map((element, index) => <ProjectElement key={index} element={element} />)}
      {creditKeys.length ? (
        <div className="credits">
          <h2>Credits</h2>
          <dl>
            {creditKeys.map((roleName) => (
              <React.Fragment key={roleName}>
                <dt className="bold">
                  {roleName}
                  {': '}
                </dt>
                <dd dangerouslySetInnerHTML={{ __html: credits[roleName] }} />
                <br />
              </React.Fragment>
            ))}
          </dl>
        </div>
      ) : null }
    </Layout>
  );
}

// eslint-disable-next-line max-len
export const getStaticProps: GetStaticProps<ProjectProps> = async function getStaticProps({ params }) {
  if (!params) {
    throw new Error('params was not in getStaticProps but was required');
  }
  const projects = await getProjectData();
  const projectIndex = projects.findIndex((project) => project.url.substring(1) === params.project);
  const prevProjectIndex = projectIndex === 0 ? projects.length - 1 : projectIndex - 1;
  const nextProjectIndex = projectIndex === projects.length - 1 ? 0 : projectIndex + 1;
  return {
    props: {
      project: {
        nav: {
          prevProject: projects[prevProjectIndex].url,
          nextProject: projects[nextProjectIndex].url,
        },
        ...projects[projectIndex],
      },
    },
  };
};

export const getStaticPaths: GetStaticPaths = async function getStaticPaths() {
  const files = await fs.promises.readdir(path.resolve('src/cms/projects'));
  return {
    paths: files.filter((fileName) => fileName.endsWith('.json')).map((fileName) => (
      { params: { project: fileName.split('.')[0] } }
    )),
    fallback: false,
  };
};

export default ProjectPage;
