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
import { blockDefaultProps } from '@lowdefy/block-tools';

const ContextBlock = ({ blockId, content, properties, methods, actions }) => (
  <div
    id={blockId}
    data-testid={blockId}
    onClick={() => methods.callAction({ action: 'onClick' })}
    className={methods.makeCssClass([
      { outline: 'none', cursor: actions.onClick && 'pointer' },
      properties.style,
    ])}
  >
    {properties.title && <h3>{properties.title}</h3>}
    {properties.content || (content.content && content.content())}
  </div>
);

ContextBlock.defaultProps = blockDefaultProps;

export default ContextBlock;
