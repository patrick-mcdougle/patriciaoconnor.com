import PropTypes from 'prop-types';
import React from 'react';
import { getProjectCategories } from '../src/cms/utils';
import Bio from '../src/Bio';
import Layout from '../src/layout';

function MoreIntro() {
  return <p>My background in Architecture means I approach design from a truly graphic perspective. For me, everything begins with shape, proportion, and balance. This is why I have a particular connection to Art Deco design. It’s bold and modern, while being harmonious and balanced. I believe in simple designs with a high attention to detail and a touch of whimsy.</p>;
}

function AboutPage({projectCategories}) {
  return (
    <Layout projectCategories={projectCategories}>
      <div className="bio-container">
        <Bio moreIntro={<MoreIntro />}>
          <h2>Stay In Touch</h2>
          <p>
            <a href="mailto:patricia@patriciaoconnor.com">Email</a>
          </p>
        </Bio>
      </div>
    </Layout>
  );
}

AboutPage.propTypes = {
  projectCategories: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export async function getStaticProps() {
  return {
    props: {
      projectCategories: await getProjectCategories(),
    },
  };
}

export default AboutPage;
