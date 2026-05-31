import React, { Component } from "react";
import { Icon } from "@iconify/react";
import pythonIcon from "@iconify/icons-logos/python";
import sqliteIcon from "@iconify/icons-logos/sqlite";
import javascriptIcon from "@iconify/icons-logos/javascript";

class About extends Component {
  render() {
    if (this.props.sharedBasicInfo) {
      var profilepic = "images/" + this.props.sharedBasicInfo.image;
    }
    if (this.props.resumeBasicInfo) {
      var sectionName = this.props.resumeBasicInfo.section_name.about;
      var hello = this.props.resumeBasicInfo.description_header;
      var about = this.props.resumeBasicInfo.description;
    }

    return (
      <section id="about">
        <div className="col-md-12">
          <h1 style={{ color: "black" }}>
            <span>{sectionName}</span>
          </h1>
          <div className="row center mx-auto mb-5">
            <div className="col-md-4 mb-5 center">
              <div className="polaroid">
                <span style={{ cursor: "auto" }}>
                  <img
                    height="250px"
                    src={profilepic}
                    alt="Avatar placeholder"
                  />
                  <Icon icon={pythonIcon} style={{ fontSize: "400%", margin: "9% 5% 0 5%" }} />
                  <Icon icon={sqliteIcon} style={{ fontSize: "400%", margin: "9% 5% 0 5%" }} />
                  <Icon icon={javascriptIcon} style={{ fontSize: "400%", margin: "9% 5% 0 5%" }} />
                </span>
              </div>
            </div>

            <div className="col-md-8 center">
              <div className="col-md-10">
                <div className="card">
                  <div className="card-header">
                    <span style={{
                      display: "inline-block",
                      width: "13px", height: "13px",
                      borderRadius: "50%",
                      background: "#ff5f57"
                    }}></span>
                    &nbsp;&nbsp;
                    <span style={{
                      display: "inline-block",
                      width: "13px", height: "13px",
                      borderRadius: "50%",
                      background: "#febc2e"
                    }}></span>
                    &nbsp;&nbsp;
                    <span style={{
                      display: "inline-block",
                      width: "13px", height: "13px",
                      borderRadius: "50%",
                      background: "#28c840"
                    }}></span>
                  </div>
                  <div
                    className="card-body font-trebuchet text-justify ml-3 mr-3"
                    style={{
                      height: "auto",
                      fontSize: "132%",
                      lineHeight: "200%",
                    }}
                  >
                    <br />
                    <span className="wave">{hello} :) </span>
                    <br />
                    <br />
                    {about}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default About;