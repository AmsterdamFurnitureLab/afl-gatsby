import { changeLocale, injectIntl, IntlContextConsumer } from "gatsby-plugin-intl";
import React, { Component } from "react";
import { Helmet } from "react-helmet";

class LanguageSwitcher extends Component {
	getButtonTextByCode(code) {
		return code === "en" ? "Nederlands" : "English";
	}

	changeLocaleMyWayLmao(code) {
		changeLocale(code);
		window.location.assign(window.location.href.replace(/\/(en|nl)\//g, `/${code}/`));
	}

	render() {
		return (
			<IntlContextConsumer>
				{({ languages, language: currentLocale }) => (
					<a
						className="language-link"
						// Todo
						onClick={() => {
							console.log(`Current Locale: `, currentLocale);
							this.changeLocaleMyWayLmao(currentLocale === "en" ? "nl" : "en");
						}}
					>
						<Helmet>
							<html lang={currentLocale} />
						</Helmet>
						{this.getButtonTextByCode(currentLocale)}
					</a>
				)}
			</IntlContextConsumer>
		);
	}
}

export default injectIntl(LanguageSwitcher);
