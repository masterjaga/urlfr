import React, { Component } from "react";
import "./Landing.css";
import { createShortUrl } from "../ApiHelper";
import constants from "../../config/constants";
class Landing extends Component {
  constructor() {
    super();
    this.state = {
      showShortenUrl: false,
      shortenUrl: "",
      originalUrl: "",
      baseUrl: "",
      clickSubmit: true,
      showError: false,
      apiError: "",
      showApiError: false,
      showLoading: false,
      exUrl:
        "https://www.daraz.com.np/products/mobile-game-finger-sleeve-breathable-anti-sweat-full-touch-screen-sensitive-shoot-aim-joysticks-finger-set-for-pubgknives-outrules-of-survival-per-pair-i105146666-s1026806360.html?spm=a2a0e.11779170.just4u.23.287d2d2bHfOl0K&scm=1007.28811.244313.0&pvid=c66c9971-8ffc-40b0-8606-c5b3b71c9f9e&clickTrackInfo=pvid%3Ac66c9971-8ffc-40b0-8606-c5b3b71c9f9e%3Bchannel_id%3A0000%3Bmt%3Ahot%3Bitem_id%3A105146666%3B",
      exShortUrl: constants.baseUrl
    };
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleUserInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }
  handleSubmit() {
    this.setState({ clickSubmit: true, showApiError: false });
    if (this.state.clickSubmit && this.state.originalUrl) {
      this.setState({ showLoading: true, showShortenUrl: false });
      let reqObj = {
        longUrl: this.state.originalUrl
      };
      createShortUrl(reqObj)
        .then(json => {
          setTimeout(() => {
            this.setState({
              showLoading: false,
              showShortenUrl: true,
              showError: false,
              shortenUrl: json.data.shortUrl
            });
          }, 0);
        })
        .catch(error => {
          this.setState({
            showLoading: false,
            showApiError: true,
            showError: false,
            apiError: error.response.data ?? "Server Error"
          });
        });
    } else {
      this.setState({ showError: true });
    }
  }
  renderButton() {
    if (!this.state.showLoading) {
      return (
        <button
          className="btn waves-effect waves-light submit-btn"
          name="action"
          onClick={this.handleSubmit}
        >
          Submit
        </button>
      );
    } else {
      return (
        <div className="loader">
          <div className="preloader-wrapper small active">
            <div className="spinner-layer spinner-green-only">
              <div className="circle-clipper left">
                <div className="circle" />
              </div>
              <div className="gap-patch">
                <div className="circle" />
              </div>
              <div className="circle-clipper right">
                <div className="circle" />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
  render() {
    return (
      <div className="landing">
        <div>
          <h5> Long Url</h5>
        </div>
        <div>
          Ex:{" "}
          <a target="_blank" href={this.state.exUrl}>
            {this.state.exUrl}
          </a>
        </div>
        <input
          name="originalUrl"
          field="originalUrl"
          placeholder="Paste your link.."
          value={this.state.originalUrl}
          onChange={this.handleUserInput.bind(this)}
        />

        {this.state.showError && (
          <div className="formError">Long Url is required</div>
        )}

        {this.renderButton()}
        {this.state.showApiError && (
          <div className="shorten-error">{this.state.apiError}</div>
        )}
        {this.state.showShortenUrl && (
          <div className="shorten-title">
            Shortened Url is -&gt;{` `}
            <a target="_blank" href={this.state.shortenUrl}>
              {this.state.shortenUrl}
            </a>
          </div>
        )}
        <div className="shorten-imp">
          [* Here base url has the default value{" "}
          <a target="_blank" href={this.state.exShortUrl}>
            {this.state.exShortUrl}
          </a>{" "}
          .This will change based on domain name]
        </div>
      </div>
    );
  }
}

export default Landing;
