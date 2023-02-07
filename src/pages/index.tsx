declare var dataLayer: any[];

import { Inter } from '@next/font/google'
import { useEffect, useState } from 'react'
import { StyledHeader } from '@/style/header.style'
import { StyledHero } from '@/style/hero.style'
import { StyledMain } from '@/style/main.style'
import _ from '@/keyableFragment'
import { DependencyGraph } from '../DependencyGraph'
import { StyledForm } from '@/style/form.style'
import { StyledFooter } from '@/style/footer.style'
import  GlobalStyle from '@/style/global.style'
import Papa from 'papaparse'
import { mapToGraphData, resolveNodeDependencies, sortNodes } from '@/dfs'
import Head from 'next/head'


export type Link = {
	[key: number]: 0 | 1
}
export type Node = {
	NodeId: number, 
	StartDate: string, 
	EndDate: string
}
const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [ formState, setFormState ] = useState<{nodes: File|null, links: File|null}>({nodes:null, links: null});
	const [ parsedFiles, setParsedFiles ] = useState<{nodes: Node[] | null, links:Link[] |null}>({nodes:null, links: null});
	const [ graphData, setGraphData ] = useState<any | null>(null);

	const handleParse = () => {
		if (!formState.links || !formState.nodes) return;
		Papa.parse<Link>(formState.links, {
		  header: false,
		  complete: function(results) {
			setParsedFiles(s => ({...s, links: results.data}));
		  },
		});
		Papa.parse<Node>(formState.nodes, {
			header: true,
			skipEmptyLines: true,
			complete: function(results) {
			  setParsedFiles(s => ({...s, nodes: results.data}));
			}
     	});
	  };

	useEffect(() => {
		if (!parsedFiles.links || !parsedFiles.nodes) return;
		const nodesWithDeps = resolveNodeDependencies(parsedFiles.nodes, parsedFiles.links);
		const sortedNodes = sortNodes(nodesWithDeps);

    console.log("Calling fetch");
    fetch('/api/import-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(sortedNodes)
    })
    .then((res) => res.json())
    .then((data) => {
      setGraphData(data)
    })

	}, [parsedFiles])

	return <>
    <Head>
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-9SCMYM22Y5"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments)}
        gtag('js', new Date());

        gtag('config', 'G-9SCMYM22Y5');
      </script>
    </Head>
  	<GlobalStyle />
		<div className="app">
			<StyledHeader role="banner" className={'app__header'} aria-labelledby='header__description'>
				<h2 className='header__description hidden'> Navigation links pertaining to the various sections of the page. </h2>
					<a className="menu__anchor" href="/#" title='Scroll to Top'>
						<h3>N & L</h3>
					</a>
					<nav className="header__nav">
						<ul className="nav__menu">
							{["Demo"].map((key: string) => <_ key={`menu__element-${key}`}>
								<li className="menu__element">
									<a className="element__anchor" title={`Scroll to ${key} section`} href={ `#${key}`}> 
										<h4>{key}</h4>
									</a>
								</li>
							</_>)}
						</ul>
					</nav>
			</StyledHeader>
			<hr/>
			<StyledHero role="img" className={"app__hero"} aria-labelledby='hero__description'>
				<h2 className='hero__description hidden' id="hero__description"> Presentational hero section</h2>
				<article className="hero__cta">
					<div role="presentation" className="cta__content">
						<h1 className="hero__title">Welcome to my demo project</h1>
						<h3 className="hero__body"> Feel free to explore the below form to generate a graph! <form action="" className=""></form></h3>
					</div>
				</article>
			</StyledHero>
			<hr />
			<StyledMain className="app__main" id="Demo" aria-labelledby='demo__description'>
				{graphData 
				? <DependencyGraph data={graphData}/>
				: <StyledForm>
						<div>
							<label htmlFor="nodesFile">Nodes File:</label>
							<input type="file" id="nodesFile" name="nodesFile" accept=".csv" onChange={
									(e) => setFormState(s => ({...s, nodes: e.target.files![0]}))
								} 
							/>
						</div>
						<div>
							<label htmlFor="adjMatrixFile">Adjacency Matrix File:</label>
							<input type="file" id="adjMatrixFile" name="adjMatrixFile" accept=".csv" onChange={
									(e) => setFormState(s => ({...s, links: e.target.files![0]}))
								}
							/>
						</div>
						<button type="submit" onClick={(e) => {
							e.preventDefault();
							handleParse();
						}}>
							Submit
						</button>
				  </StyledForm>
				}
        	</StyledMain>
			<hr/>
			<StyledFooter role="banner" className={"app__footer"} aria-labelledby='footer__description'> 
				<h2 className='footer__description hidden'> Footer info such as author and copy-right notice. </h2>
				<p className="footer__text"> Deniz Arca Submission 08/02/2023 </p>
			</StyledFooter>
		</div>
	</>
}

