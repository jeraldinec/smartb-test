import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getInfo } from "../redux/actions/test";
import Loading from "react-fullscreen-loading";
import Slider from "react-animated-slider";
import Modal from "react-responsive-modal";
import ReactPlayer from "react-player";
import Moment from "react-moment";
import "moment-timezone";
import "../assets/styles/customSlider.scss";
import "../assets/styles/App.css";

const Carousel = ({ getInfo, data, loading }) => {
  const [visible, toggleModal] = useState(false);
  const [info, setInfo] = useState(null);

  useEffect(() => {
    getInfo();
  }, []);
  return (
    <div className="wh100">
      {loading && !data ? (
        <Loading loading={loading} background="#111111" loaderColor="#ffd800" />
      ) : (
        <Slider className="slider" autoplay={5000}>
          {data.items.map((item, index) => {
            const type = item.images[2] ? item.images[2] : item.images[0];
            const image = `https://mychannel.nunchee.tv/api/assets/images/view/${type._id}?type=${type.type}&scale=25&placeholder=true`;
            const dateToFormat = item._updateDate;

            return (
              <div
                className="sliderContent"
                key={index}
                style={{
                  background: `url(${image}) no-repeat center center / cover`
                }}
              >
                <div className="inner">
                  <h1>{item.title.original}</h1>
                  <p>
                    {item.description.plain.original.length > 250
                      ? `${item.description.plain.original.substring(
                          0,
                          250
                        )}...`
                      : item.description.plain.original}
                  </p>
                  <button
                    className="details-button"
                    onClick={() => {
                      toggleModal(!visible);
                      setInfo({ ...item, image, dateToFormat });
                    }}
                  >
                    Read more
                  </button>
                </div>
              </div>
            );
          })}
        </Slider>
      )}
      {info && (
        <Modal open={visible} onClose={() => toggleModal(!visible)} center>
          <div className="player-wrapper">
            <ReactPlayer
              className="react-player"
              width="100%"
              height="300px"
              url={"https://www.youtube.com/watch?v=bDbWftXlKWU"}
              pip={true}
              playing={false}
              controls={true}
              light={info.image}
              volume={0.8}
              muted={false}
            />
          </div>
          <div className="containerModal">
            <div className="title">{info.title.original}</div>
            <Moment format="D MMM YYYY" withTitle>{info.dateToFormat}</Moment>
            <div className="description">{info.description.plain.original}</div>
          </div>
        </Modal>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  data: state.test.data,
  loading: state.test.loading
});

export default connect(
  mapStateToProps,
  { getInfo }
)(Carousel);
