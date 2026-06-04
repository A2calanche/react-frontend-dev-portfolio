import React, { Component } from "react";
import $ from "jquery";
import "./App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import { Icon } from "@iconify/react";
import usFlag from "@iconify/icons-twemoji/flag-united-states";
import mxFlag from "@iconify/icons-twemoji/flag-mexico";
import brFlag from "@iconify/icons-twemoji/flag-brazil";
import Chat from "./components/Chat";

class App extends Component {

  constructor(props) {
    super();
    this.state = {
      foo: "bar",
      resumeData: {},
      sharedData: {},
    };
    this.applyPickedLanguage = this.applyPickedLanguage.bind(this);
    this.swapCurrentlyActiveLanguage = this.swapCurrentlyActiveLanguage.bind(this);
  }

  componentDidMount() {
    this.loadSharedData();
    this.applyPickedLanguage(
      window.$primaryLanguage,
      window.$primaryLanguageIconId
    );
  }

  applyPickedLanguage(pickedLanguage, pickedLangIconId) {
    this.swapCurrentlyActiveLanguage(pickedLangIconId);
    document.documentElement.lang = pickedLanguage;

    const langToFile = {
      [window.$primaryLanguage]:  `res_primaryLanguage.json`,
      [window.$secondaryLanguage]: `res_secondaryLanguage.json`,
      [window.$tertiaryLanguage]:  `res_tertiaryLanguage.json`,
    };

    const resumePath = langToFile[pickedLanguage] || `res_primaryLanguage.json`;
    this.loadResumeFromPath(resumePath);
  }

  swapCurrentlyActiveLanguage(pickedLangIconId) {
    const allIconIds = [
      window.$primaryLanguageIconId,
      window.$secondaryLanguageIconId,
      window.$tertiaryLanguageIconId,
    ];

    allIconIds.forEach(function(id) {
      var el = document.getElementById(id);
      if (el) el.classList.remove("active");
    });

    var picked = document.getElementById(pickedLangIconId);
    if (picked) picked.classList.add("active");
  }

  loadResumeFromPath(path) {
    $.ajax({
      url: path,
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({ resumeData: data });
      }.bind(this),
      error: function (xhr, status, err) {
        alert(err);
      },
    });
  }

  loadSharedData() {
    $.ajax({
      url: `portfolio_shared_data.json`,
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({ sharedData: data });
        document.title = `${this.state.sharedData.basic_info.name}`;
      }.bind(this),
      error: function (xhr, status, err) {
        alert(err);
      },
    });
  }

  render() {
    return (
      <div>
        <Header sharedData={this.state.sharedData.basic_info} />
        <div className="col-md-12 mx-auto text-center language">

          <div
            onClick={() => this.applyPickedLanguage(
              window.$primaryLanguage,
              window.$primaryLanguageIconId
            )}
            style={{ display: "inline" }}
          >
            <Icon icon={usFlag} className="language-icon mr-5" 
            id={window.$primaryLanguageIconId} style={{fontSize: "2rem"}} />
          </div>

          <div
            onClick={() => this.applyPickedLanguage(
              window.$secondaryLanguage,
              window.$secondaryLanguageIconId
            )}
            style={{ display: "inline" }}
          >
            <Icon icon={mxFlag} className="language-icon mr-5" 
            id={window.$secondaryLanguageIconId} style={{fontSize: "2rem"}} />
          </div>

          <div
            onClick={() => this.applyPickedLanguage(
              window.$tertiaryLanguage,
              window.$tertiaryLanguageIconId
            )}
            style={{ display: "inline" }}
          >
            <Icon icon={brFlag} className="language-icon" 
            id={window.$tertiaryLanguageIconId} style={{fontSize: "2rem"}} />
          </div>

        </div>
        <About
          resumeBasicInfo={this.state.resumeData.basic_info}
          sharedBasicInfo={this.state.sharedData.basic_info}
        />
        <Projects
          resumeProjects={this.state.resumeData.projects}
          resumeBasicInfo={this.state.resumeData.basic_info}
        />
        <Skills
          sharedSkills={this.state.sharedData.skills}
          resumeBasicInfo={this.state.resumeData.basic_info}
        />
        <Experience
          resumeExperience={this.state.resumeData.experience}
          resumeBasicInfo={this.state.resumeData.basic_info}
        />
        <Footer sharedBasicInfo={this.state.sharedData.basic_info} />

        <Chat chatData={this.state.resumeData.chat} />

      </div>
    );
  }
}

export default App;