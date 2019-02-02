import React, { Component } from "react";
import ImageLightBox from "./lightbox";

class ProdImg extends Component {
  state = {
    lightbox: false,
    imagePos: 0,
    lightboxImages: []
  };

  componentDidMount() {
    const images = this.props.detail.images;
    if (images.length > 0) {
      let lightboxImages = [];

      images.forEach(item => {
        lightboxImages.push(item.url);
      });

      this.setState({
        lightboxImages
      });
    }
  }

  handleLightBox = pos => {
    if (this.state.lightboxImages.length > 0) {
      this.setState({
        lightbox: true,
        imagePos: pos
      });
    }
  };

  handleLightBoxClose = () => {
    this.setState({
      lightbox: false
    });
  };

  showThumbs = () =>
    this.state.lightboxImages.map((item, i) =>
      i > 0 ? (
        <div
          key={i}
          onClick={() => this.handleLightBox(i)}
          className="thumb"
          style={{ background: `url(${item}) no-repeat` }}
        />
      ) : null
    );

  renderCardImage = images => {
    if (images.length > 0) {
      return images[0].url;
    } else {
      return `/images/image_not_availble.png`;
    }
  };

  render() {
    const { detail } = this.props;
    return (
      <div className="product_image_container">
        <div className="main_pic">
          <div
            style={{
              background: `url(${this.renderCardImage(
                detail.images
              )}) no-repeat`
            }}
            onClick={() => this.handleLightBox(0)}
          />
        </div>
        <div className="main_thumbs">{this.showThumbs()}</div>
        {this.state.lightbox ? (
          <ImageLightBox
            id={detail.id}
            images={this.state.lightboxImages}
            open={this.state.open}
            pos={this.state.imagePos}
            onclose={() => this.handleLightBoxClose()}
          />
        ) : null}
      </div>
    );
  }
}

export default ProdImg;
