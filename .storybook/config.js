import { configure } from "@storybook/react";

const req = require.context("../source/", true, /\.stories\.js$/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
