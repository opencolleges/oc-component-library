# Open Colleges style guide

## Introduction

The OpenSpace style guide is a living, breathing system. Designed to convey our visual language and encourage product consistency across all contexts and technologies.

### Strategy

Our aim is to deliver a system comprised of reusable components that ensures efficient implementation and a unified user experience. Learn more about these components using [our Wiki](https://github.com/opencolleges/oc-ui-library-master/wiki 'our Wiki') on GitHub.

The OpenSpace style guide will be updated regularly, mature over its iterations and improve the workflow between design and development. To learn more about upcoming features, view [our progress](https://opencolleges.jira.com/browse/MM-1146 'our releases') in Jira, or check out some of [our library](https://sketch.cloud/s/qK522 'our library') on Sketch Cloud.

### Landscape

Open Colleges has had a number of competing style guides, all relevant in their own right. However, to eliminate fragmentation we’ve deprecated other style guides and created this single reference for your convenience.

Copyright © Open Colleges 2018

## Scripts

- `npm run build or npm run prepublish` - produces production version of your library under the `lib` folder
- `npm run start` - produces development version of your library and runs a watcher

## Installation

#Using npm

npm install oc-component-library

## Usage

Import stylesheets:

import 'oc-component/dist/style.css';

Import Component:

import { OCDate } from 'oc-component-library';
