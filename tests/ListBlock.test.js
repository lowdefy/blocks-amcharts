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

import { ListBlock } from '../src';
import examples from '../demo/examples/ListBlock.yaml';
import meta from '../src/blocks/ListBlock/ListBlock.json';

jest.spyOn(window, 'alert').mockImplementation(() => {});

runRenderTests({ examples, Block: ListBlock, meta });
runBlockSchemaTests({ examples, meta });

const { before, methods, getProps } = mockBlock({ meta });
beforeEach(before);

it('test button clicks', () => {
  const block = {
    id: 'one',
    type: 'InputBlock',
    areas: {
      content: {
        blocks: [
          {
            id: 'a',
          },
        ],
      },
    },
  };
  const Shell = () => <ListBlock {...getProps(block)} methods={methods} />;
  const wrapper = mount(<Shell />);
  wrapper.find('[data-testid="one-pushItem"]').simulate('click');
  expect(methods.pushItem).toHaveBeenCalled();
  wrapper.find('[data-testid="one-unshiftItem"]').simulate('click');
  expect(methods.unshiftItem).toHaveBeenCalled();
  wrapper.find('[data-testid="one-removeItem-0"]').simulate('click');
  expect(methods.removeItem).toHaveBeenCalledWith(0);
  wrapper.find('[data-testid="one-moveItemUp-0"]').simulate('click');
  expect(methods.removeItem).toHaveBeenCalledWith(0);
  wrapper.find('[data-testid="one-moveItemDown-0"]').simulate('click');
  expect(methods.removeItem).toHaveBeenCalledWith(0);
});
