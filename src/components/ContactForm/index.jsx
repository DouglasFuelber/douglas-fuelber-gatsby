import React, { Component } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Button from "react-md/lib/Buttons";
import config from "../../../data/SiteConfig";
import { TextField } from 'react-md';
import "./ContactForm.scss";

class ContactForm extends Component {
    onSubmit() {
        const recaptchaValue = recaptchaRef.current.getValue();
        this.props.onSubmit(recaptchaValue);
      }
    render() {
        const recaptchaRef = React.createRef();
        return (
            <div className="contact-container mobile-fix">
                <div className="contact-wrapper md-cell--center">
                    <div className="md-cell--12">
                        <h3>Contact</h3>
                        <p>If you want to contact me, leave me a message:</p>
                    </div>
                    <div id="form">                        
                        <form name="contact" method="post" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={this.onSubmit}>
                            <input type="hidden" name="form-name" value="contact" />
                            <div className="md-grid">
                                <TextField
                                    id="name"
                                    label="Name"
                                    name="Name"
                                    className="md-cell--12 md-cell--bottom"
                                    required
                                    />
                                <TextField
                                    id="email"
                                    label="Email"
                                    name="Email"
                                    className="md-cell--12 md-cell--bottom"
                                    type="email"
                                    required
                                    />
                                <TextField
                                    id="message"
                                    label="Message"
                                    name="Message"
                                    rows={5}
                                    className="md-cell--12 md-cell--bottom"
                                    required
                                    />
                                <div className="md-cell--6">
                                    <br/>
                                    <ReCAPTCHA
                                        ref={recaptchaRef}
                                        sitekey={config.recaptchaPublicKey} />
                                </div>
                                <div className="md-cell--6">
                                    <br/>
                                    <Button flat className="submit-button" type="submit">Send</Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default ContactForm;