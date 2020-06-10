import { Amplify } from "aws-amplify";
import React from "react";
import ReactDom from "react-dom";
import App from "./app";
import aws_config from "./aws-config";

Amplify.configure(aws_config);

ReactDom.render(<App />, document.getElementById("root"));
