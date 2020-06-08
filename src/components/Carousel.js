import React from "react";

export default class Carousel extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="carousel">
          <div className="glider-contain">
            <div className="glider">
              <div>your content here</div>
              <div>your content here</div>
              <div>your content here</div>
              <div>your content here</div>
            </div>
            <button aria-label="Previous" className="glider-prev">
              «
            </button>
            <button aria-label="Next" className="glider-next">
              »
            </button>
            <div role="tablist" className="dots"></div>
          </div>
        </div>
      </div>
    );
  }
}
