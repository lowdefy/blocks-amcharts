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

import React, { useEffect } from 'react';
import { blockDefaultProps } from '@lowdefy/block-tools';

const ListBlock = ({ blockId, methods, properties, list }) => {
  useEffect(() => {
    methods.registerMethod('pushItem', methods.pushItem);
    methods.registerMethod('unshiftItem', methods.unshiftItem);
    methods.registerMethod('removeItem', methods.removeItem);
    methods.registerMethod('moveItemDown', methods.moveItemDown);
    methods.registerMethod('moveItemUp', methods.moveItemUp);
  }, []);
  return (
    <div id={blockId} data-testid={blockId} style={{ border: '1px solid blue' }}>
      <button data-testid={`${blockId}-pushItem`} onClick={methods.pushItem}>
        pushItem
      </button>
      {list.map((item, index) => (
        <div key={index}>
          <h4>
            {properties.itemTitle || 'Item Title'} {index}
            <div>
              <button
                data-testid={`${blockId}-removeItem-${index}`}
                onClick={() => methods.removeItem(index)}
              >
                removeItem
              </button>{' '}
              <button
                data-testid={`${blockId}-moveItemUp-${index}`}
                onClick={() => methods.moveItemUp(index)}
              >
                moveItemUp
              </button>{' '}
              <button
                data-testid={`${blockId}-moveItemDown-${index}`}
                onClick={() => methods.moveItemDown(index)}
              >
                moveItemDown
              </button>
            </div>
          </h4>
          <div>{item.content()}</div>
        </div>
      ))}
      <button data-testid={`${blockId}-unshiftItem`} onClick={methods.unshiftItem}>
        unshiftItem
      </button>
    </div>
  );
};

ListBlock.defaultProps = blockDefaultProps;

export default ListBlock;
