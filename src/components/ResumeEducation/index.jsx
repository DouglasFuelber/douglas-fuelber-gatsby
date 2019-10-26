import React, { Component } from "react";
import resume from "../../../data/Resume";
import "./ResumeEducation.scss";

class ResumeEducation extends Component {
    render() {
        return (
            <div className="education-container mobile-fix">
                <div className="education-wrapper md-cell--center">
                    <div className="md-cell--center md-cell--middle md-cell--12">
                        <h3>Educação</h3>
                        <div id="educations">
                            {this.getEducation()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    getEducation() {    
        return resume.education.map(education => (
            <div className="education left-border-area light-border">
                <h4 className="education-title">{education.title}</h4>
                <h5 className="education-school">
                    <a href={education.schoolUrl} target="_blank" rel="noopener">{education.school} <i class="fas fa-external-link-alt external-link-icon"></i></a>
                </h5>
                <div className="education-location">{education.schoolLocation}</div>                
                <div className="education-period">{education.period}</div>
            </div>          
        ));
    }
}

export default ResumeEducation;