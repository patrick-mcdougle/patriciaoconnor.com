import React from 'react';
import Bio from '../src/Bio';
import Layout from '../src/layout';

function AboutPage() {
  return (
    <Layout>
      <div className="bio-container">
        <Bio />
      </div>
    </Layout>
  );
}

export default AboutPage;
