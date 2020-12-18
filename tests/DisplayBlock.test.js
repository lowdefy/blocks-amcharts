/*
  Copyright 2020 Lowdefy, Inc

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

import React from 'react';
import { mockBlock, runBlockSchemaTests, runRenderTests } from '@lowdefy/block-tools';
import { configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });

import { DisplayBlock } from '../src';
import examples from '../demo/examples/DisplayBlock.yaml';
import meta from '../src/blocks/DisplayBlock/DisplayBlock.json';

runRenderTests({ examples, Block: DisplayBlock, meta });
runBlockSchemaTests({ examples, meta });

const { before, methods, getProps } = mockBlock({ meta });
beforeEach(before);

test('callAction onClick', () => {
  const block = {
    id: 'one',
    type: 'DisplayBlock',
  };

  const Shell = () => <DisplayBlock {...getProps(block)} methods={methods} />;
  const wrapper = mount(<Shell />);
  wrapper.find('[data-testid="one"]').simulate('click');
  expect(methods.callAction).toHaveBeenCalledWith({ action: 'onClick' });
});
