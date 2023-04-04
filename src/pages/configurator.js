import React from "react";
import "../utils/css/components/configurator.css";
import ThreeContainer from "../components/ThreeContainer";
import Slider from "../components/Slider";

function Configurator() {
	return (
		<div>
			<div className="configurator-canvas">
				<ThreeContainer />
			</div>
			<div className="configurator-canvas">
				<Slider />
			</div>
		</div>
	);
}

export default Configurator;
