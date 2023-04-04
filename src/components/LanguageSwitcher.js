import { changeLocale, injectIntl, IntlContextConsumer } from "gatsby-plugin-intl";
import React, { Component } from "react";
import { Helmet } from "react-helmet";

class LanguageSwitcher extends Component {
	getButtonTextByCode(code) {
		return code === "en" ? "Nederlands" : "English";
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
							currentLocale === "en" ? changeLocale("nl") : changeLocale("en");
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
