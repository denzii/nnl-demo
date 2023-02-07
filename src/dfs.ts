import {Link, Node} from "./pages/index"

export type GraphData = {
  nodes: {
      id: number;
      name: string;
      dependencies: number[];
  }[];
  links: {
      source: number;
      target: number;
  }[];
};

export function mapToGraphData(nodesWithDeps: (Node & { Dependencies: number[] })[]) {
  const sortedNodes = sortNodes(nodesWithDeps);
  
  return {
    nodes: sortedNodes.map(node => ({
      id: Number(node.NodeId),
      name: `Node${node.NodeId} at ${node.StartDate} - ${node.EndDate}`,
      dependencies: node.Dependencies,
      startDate: new Date(node.StartDate),
      endDate: new Date(node.EndDate)
    })),
    links: sortedNodes.reduce((links, node) => {
      links.push(...node.Dependencies.map(depId => ({
        source: Number(node.NodeId) + 1,
        target: Number(depId) + 1
      })));
      return links;
    }, [] as Array<{ source: number; target: number; }>)
  };
}

export function sortNodes(nodes: (Node & { Dependencies: number[] })[]) {
  const sortedNodes: typeof nodes = [];
  const visitedNodes = new Set();
  
  for (const node of nodes) {
    sortNode(nodes, node, visitedNodes, sortedNodes);
  }
  
  return sortedNodes;
}

export function resolveNodeDependencies(nodes: Node[], links: Link[]):(Node & {Dependencies: number[]})[] {
	return nodes.map((node: Node) => {
		const Dependencies = links.reduce((acc: number[], link: Link, index: number) => {
			if (Number(link[node.NodeId]) === 1) {
				acc.push(index);
			}
			return acc;

		}, []);
		return {...node, Dependencies};
	});
}

function sortNode(nodes:Node[] ,node: (Node & { Dependencies: number[] }), visitedNodes: Set<unknown>, sortedNodes: (Node & {Dependencies: number[] })[] ) {
  if (visitedNodes.has(node.NodeId)) {
    return;
  }
  
  visitedNodes.add(node.NodeId);
  
  for (const dependency of node.Dependencies) {
    const nodeDependency = nodes.find(n => n.NodeId === dependency);
    if (nodeDependency) sortNode(nodes, nodeDependency as Node & { Dependencies: number[]; } , visitedNodes, sortedNodes);
  }
  
  sortedNodes.push(node);
}


