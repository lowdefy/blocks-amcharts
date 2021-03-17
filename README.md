# Lowdefy Blocks for AmCharts

This repository provides blocks for [AmCharts](https://www.amcharts.com/), a feature rich javascript charts amd maps library.

The implementation of these blocks is a minimal wrapper for the [@amcharts/amcharts4
](https://www.npmjs.com/package/@amcharts/amcharts4) package. It creates charts using the `am4core.createFromConfig()` method which maps chart config settings directly to the AMChart library. This means you write normal AmChart config to create charts.

See the [AmCharts docs](https://www.amcharts.com/docs/v4/) for the chart settings API.

## Blocks

### AmChartsPie Example

Block URL: `https://blocks-cdn.lowdefy.com/v3.11.3/blocks-amcharts/meta/AmChartsPie.json`

```yaml
name: my-app
lowdefy: 3.11.3
types:
  AmChartsXY:
    url: https://blocks-cdn.lowdefy.com/v3.11.3/blocks-amcharts/meta/AmChartsPie.json
pages:
  - id: dashboard
    type: PageHeaderMenu
    blocks:
      - id: my_chart
        type: AmChartsPie
        properties:
          height: 400 # The default height is 500px.
          data: # This will usually be data from a request, so use the  _request operator.
            - name: 'A'
              count: 10
            - name: 'B'
              count: 30
            - name: 'C'
              count: 60
            - name: 'D'
              count: 90
          series:
            - type: PieSeries
              dataFields:
                category: name
                value: count
```

### AmChartsXY Example

Block URL: `https://blocks-cdn.lowdefy.com/v3.11.3/blocks-amcharts/meta/AmChartsXY.json`

```yaml
name: my-app
lowdefy: 3.11.3
types:
  AmChartsXY:
    url: https://blocks-cdn.lowdefy.com/v3.11.3/blocks-amcharts/meta/AmChartsXY.json
pages:
  - id: dashboard
    type: PageHeaderMenu
    blocks:
      - id: my_chart
        type: AmChartsXY
        properties:
          data: # This will usually be data from a request, so use the _request operator.
            - name: 'A'
              count: 10
            - name: 'B'
              count: 30
            - name: 'C'
              count: 60
            - name: 'D'
              count: 90
          xAxes:
            - type: CategoryAxis
              dataFields:
                category: name
          yAxes:
            - type: ValueAxis
          series:
            - type: ColumnSeries
              dataFields:
                categoryX: name
                valueY: count
              columns:
                events:
                  hit: # EXPERIMENTAL: create a chart event listener which will trigger the onClick Lowdefy event when the chart column is clicked.
                    amcharts_event_listener:
                      name: onClick
                adapter:
                  fill: # Use the _function operator to change the column color based on the value.
                    _function:
                      __if:
                        test:
                          __lte:
                            - __args: '0.count'
                            - 50
                        then: '#F00'
                        else: '#0F0'
        events:
          onClick:
            - id: set_selected
              type: SetState
              params:
                selected: # Update 'selected' in state with the event data.
                  _event: true
      - id: selection
        type: Title
        properties:
          level: 4
          content:
            _if: # Show the event data in a title, or call to action.
              test:
                _eq:
                  - _state: selected
                  - null
              then: 'Click to select a column.'
              else:
                _string.concat:
                  - 'Selected: '
                  - _state: selected.name
                  - ', Value: '
                  - _state: selected.count
```

### AmChartsTreeMap Example

Block URL: `https://blocks-cdn.lowdefy.com/v3.11.3/blocks-amcharts/meta/AmChartsTreeMap.json`

```yaml
name: my-app
lowdefy: 3.11.3
types:
  AmChartsTreeMap:
    url: https://blocks-cdn.lowdefy.com/v3.11.3/blocks-amcharts/meta/AmChartsTreeMap.json
pages:
  - id: dashboard
    type: PageHeaderMenu
    blocks:
      - id: my_chart
        type: AmChartsTreeMap
        properties:
          height: 400 # The default height is 500px.
          data: # This will usually be data from a request, so use the  _request operator.
            - name: 'A'
              value: 10
            - name: 'B'
              value: 30
            - name: 'C'
              value: 60
            - name: 'D'
              value: 90
          dataFields:
            name: name
            value: value
```

## Other Lowdefy Blocks Packages

- [@lowdefy/blocks-template](https://github.com/lowdefy/blocks-template): Lowdefy template for creating blocks.
- [@lowdefy/blocks-basic](https://github.com/lowdefy/lowdefy/tree/main/packages/blocks/blocksBasic): Official Lowdefy blocks some basic Html elements.
- [@lowdefy/blocks-antd](https://github.com/lowdefy/lowdefy/tree/main/packages/blocks/blocksAntd): Official Lowdefy blocks for [Antd design](https://ant.design/).
- [@lowdefy/blocks-color-selectors](https://github.com/lowdefy/lowdefy/tree/main/packages/blocks/blocksColorSelectorsd): Official Lowdefy blocks for [react-color](https://casesandberg.github.io/react-color/).
- [@lowdefy/blocks-markdown](https://github.com/lowdefy/lowdefy/tree/main/packages/blocks/blocksMarkdown): Official Lowdefy blocks to render Markdown.
- [@lowdefy/blocks-aggrid](https://github.com/lowdefy/blocks-aggrid): Lowdefy blocks to render [Ag-Grid](https://www.ag-grid.com/) tables.

## More Lowdefy resources

- Getting started with Lowdefy - https://docs.lowdefy.com/tutorial-start
- Lowdefy docs - https://docs.lowdefy.com
- Lowdefy website - https://lowdefy.com
- Community forum - https://github.com/lowdefy/lowdefy/discussions
- Bug reports and feature requests - https://github.com/lowdefy/lowdefy/issues

## Licence

[Apache-2.0](https://github.com/lowdefy/blocks-amcharts/blob/main/LICENSE)
