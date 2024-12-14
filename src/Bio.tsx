import React from "react";

export default function Bio() {
  return (
    <>
      <div>
        <img
          src="imgs/POC_Portfolio_Bio_Img_1000x1000.jpg"
          alt="Patricia O'Connor beside a fjord in Norway"
        />
      </div>
      <div>
        <h1 className="minerva">hello.</h1>
        <p>
          I&rsquo;m an experienced design leader with expertise in logo and
          brand design, print, packaging, and illustration.
        </p>
        <p>
          My background in Architecture means I approach design from a truly
          graphic perspective. For me, everything begins with shape, proportion,
          and balance. I believe in simple designs with a high attention to
          detail and a touch of whimsy.
        </p>
        <h2>In Brief</h2>
        <dl>
          <dt className="bold">Reads: </dt>
          <dd>
            Anything Agatha Christie
            <br />
          </dd>
          <dt className="bold">Watches: </dt>
          <dd>
            BBC&rsquo;s Poirot or anything Hitchcock
            <br />
          </dd>
          <dt className="bold">Splurges on: </dt>
          <dd>
            Diptyque Cyprès candles
            <br />
          </dd>
          <dt className="bold">In the morning: </dt>
          <dd>
            Cold brew, even in winter
            <br />
          </dd>
          <dt className="bold">At night: </dt>
          <dd>
            Corpse Reviver #2
            <br />
          </dd>
          <dt className="bold">Last Meal: </dt>
          <dd>
            Sourdough with green olives and chocolate covered orange peel
            <br />
          </dd>
          <dt className="bold">Happy Place: </dt>
          <dd>
            Scandinavia (this photo was taken in{" "}
            <a target="_blank" href="https://goo.gl/maps/91KJRnVH2vuntkJr6">
              Solvorn, Norway
            </a>
            )
          </dd>
        </dl>
        <h2>Stay In Touch</h2>
        <p>
          <a href="mailto:patricia@patriciaoconnor.com">Email</a>
        </p>
      </div>
    </>
  );
}
