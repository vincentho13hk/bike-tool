import React from "react";

interface IProps {
    children: JSX.Element | JSX.Element[]
}

const Layers: React.FC<IProps> = ({ children }) => {
	return <div>{children}</div>;
};

export default Layers;