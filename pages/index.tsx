import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Layout from '../src/layout';
import { getProjectData, getProjectCategoriesFromProjects, Project } from '../src/cms/utils';

interface IndexProps {
  projects: Project[];
  projectCategories: string[];
}

function IndexPage({ projects, projectCategories }: IndexProps) {
  const router = useRouter();
  const [currentHash, setCurrentHash] = useState('');
  const [filter, setFilter] = useState(projectCategories[0]);
  const jumpElementRef = useRef<HTMLSpanElement>();

  useLayoutEffect(() => {
    document.getElementById('__next')?.classList.add('no-pad');
    function handleHashChange() {
      const windowHash = window.location.hash;
      if (windowHash === '') {
        setCurrentHash(`#${encodeURIComponent(filter)}`);
      } else {
        setCurrentHash(windowHash);
        jumpElementRef.current?.scrollIntoView();
      }
    }

    router.events.on('hashChangeComplete', handleHashChange);
    handleHashChange();
    return () => {
      document.getElementById('__next')?.classList.remove('no-pad');
      router.events.off('hashChangeComplete', handleHashChange);
    };
  }, []);

  useEffect(() => {
    const hashParts = currentHash.split('#');
    if (hashParts.length > 1) {
      setFilter(decodeURIComponent(hashParts[1]));
    } else {
      setFilter(projectCategories[0]);
    }
  }, [currentHash]);

  const filteredProjects = useMemo(() => {
    if (filter === projectCategories[0]) {
      return projects;
    }
    return projects.filter((project) => project.category.includes(filter));
  }, [filter, projects]);

  return (
    <Layout>
      <Head>
        <title>Patricia O&rsquo;Connor</title>
      </Head>
      <span id="All%20Projects" ref={(elementRef) => { jumpElementRef.current = elementRef ?? undefined; }} aria-hidden="true" style={{ position: 'relative', top: 'calc(-50px - 4em)' }} />
      <div className="projects-container">
        <nav className="projects-nav">
          {projectCategories.map((category) => {
            const hash = `#${encodeURIComponent(category)}`;
            return (
              <Link key={category} href={`/${hash}`}><a className={filter === category ? 'active' : undefined}>{category}</a></Link>
            );
          })}
        </nav>
        <div className="projects">
          {filteredProjects.map((project) => (
            <Link key={project.url} href={project.url}>
              <a className="project">
                <img width="400" height="400" src={project.thumbnail} alt="" />
                <h1 className="minerva">{project.title}</h1>
                <h2 className="medium">{project.displayCategory}</h2>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<IndexProps> = async function getStaticProps() {
  const projects: Project[] = await getProjectData();

  return {
    props: {
      projects,
      projectCategories: getProjectCategoriesFromProjects(projects),
    },
  };
};

export default IndexPage;
