import fs from 'fs';
import Head from 'next/head';
import Link from 'next/link';
import path from 'path';
import PropTypes from 'prop-types';
import React from 'react';
import Carousel from '../src/Carousel';
import Layout from '../src/layout';
import { getProjectData } from '../src/cms/utils';

function ProjectElement({ element }) {
  switch (element.type) {
    case 'scroll-gallery':
      return (
        <div className="scroll-gallery">
          {element.items.map((item, index) => {
            if (item.type && item.type === 'carousel') {
              return (<div className="carousel" style={item.background ? { background: item.background } : null} key={item.items[0].src}><Carousel items={item.items} /></div>);
            }
            return (
              <React.Fragment key={item.src}>
                <img className={item.class ?? null} src={item.src} alt={item.alt ?? ''} />
                {index === element.items.length - 1 ? <br /> : null}
              </React.Fragment>
            );
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
      throw new Error(`type not found: ${element.type}`);
  }
}

function ProjectPage({
  project,
}) {
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
          <Link href="/#All%20Projects"><a>All</a></Link>
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

ProjectPage.propTypes = {
  project: PropTypes.shape({
    credits: PropTypes.objectOf(PropTypes.string).isRequired,
    descriptionHTML: PropTypes.string.isRequired,
    displayCategory: PropTypes.string.isRequired,
    elements: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
    nav: PropTypes.shape({
      prevProject: PropTypes.string.isRequired,
      nextProject: PropTypes.string.isRequired,
    }).isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export async function getStaticProps({ params }) {
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
}

export async function getStaticPaths() {
  const files = await fs.promises.readdir(path.resolve('src/cms/projects'));
  return {
    paths: files.filter((fileName) => fileName.endsWith('.json')).map((fileName) => (
      { params: { project: fileName.split('.')[0] } }
    )),
    fallback: false,
  };
}

export default ProjectPage;
