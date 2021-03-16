/*
  Copyright 2021 Lowdefy, Inc

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

import { runBlockSchemaTests } from '@lowdefy/block-tools';

// import { AmChartsTreeMap } from '../src';
import examples from '../demo/examples/AmChartsTreeMap.yaml';
import meta from '../src/blocks/AmChartsTreeMap/AmChartsTreeMap.json';

// FIX: Error
// /Users/gerrie/GitHub/blocks-amcharts/.yarn/cache/@amcharts-amcharts4-npm-4.10.12-4f2b3b0985-7d15767950.zip/node_modules/@amcharts/amcharts4/core.js:8
// export { System, system } from "./.internal/core/System";
// ^^^^^^
// SyntaxError: Unexpected token 'export'
// runRenderTests({ examples, Block: AmChartsTreeMap, meta });
runBlockSchemaTests({ examples, meta });
