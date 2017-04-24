import Component, { tracked } from "@glimmer/component";

const DEPTH = 10;

class Node {
  @tracked left: Node;
  @tracked rite: Node;

  constructor(depth) {
    this.left = depth > 0 ? new Node(depth-1) : null;
    this.rite = depth > 0 ? new Node(depth-1) : null;
  }

  @tracked get count() {
    let leftCount = (this.left == null) ? 0 : this.left.count;
    let riteCount = (this.rite == null) ? 0 : this.rite.count;
    return leftCount + riteCount + 1;
  }

}

let initNodesStartTime;
let initNodesEndTime;
let didInsertElementTime;

export default class GlimmerBenchmarks extends Component {
  @tracked root

  constructor(options) {
    super(options);

    initNodesStartTime = performance.now();
    let root = new Node(DEPTH);
    initNodesEndTime = performance.now();

    this.root = root;
  }

  didInsertElement() {
    didInsertElementTime = performance.now();

    document.write(`
      <table border=1>
        <tr>
          <td>time to allocate nodes</td>
          <td style="text-align: right">${Math.round(initNodesEndTime - initNodesStartTime)} ms</td>
        </tr>
        <tr>
          <td>time to insert element</td>
          <td style="text-align: right">${Math.round(didInsertElementTime - initNodesEndTime)} ms</td>
        </tr>
      </table>
     `);
  }
}
