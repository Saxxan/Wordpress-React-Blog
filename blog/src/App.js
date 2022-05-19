import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Post from './components/Post';
import styled from 'styled-components';

export const SideMenu = styled.aside`
	width: 300px;
	border-right: 1px solid gray;
	height: 100vh;
	overflow: auto;
`;

function App() {

	let [data, setData] = useState([]);
	let [selectedPost, setSelectedPost] = useState([undefined]);
	const [image, setImage] = useState(undefined);

	const handleClick = (postClicked) => {
		setSelectedPost(postClicked);
	};

	useEffect(() => {
		axios.get('https://wordpress.esatid3-2021.com/salva/emojibook/wp-json/wp/v2/posts')
		.then(response => {
			setData(response.data);
		});
	}, []);

	useEffect(() => {
		if (selectedPost) {
		  axios.get(`https://wordpress.esatid3-2021.com/alex/emojibook/wp-json/wp/v2/media/${selectedPost.featured_media}`)
		  .then(response => setImage(response.data.source_url));
		}
	}, [selectedPost]);

  	return (
	  	<>
			<SideMenu>
				{data.map((d) => {
					return (
					<Post title={d.title.rendered}>
						<p onClick={() => handleClick(d) } dangerouslySetInnerHTML={{__html: d.excerpt.rendered}}></p>
					</Post>
					)
				})}
			</SideMenu>
			<main>
				{ image && <img src={image}></img>}
        		{ selectedPost ? <h1>{ selectedPost.title.rendered }</h1> : ''}
        		{ selectedPost ? <div dangerouslySetInnerHTML={{ __html: selectedPost.content.rendered }}></div> : ''}
			</main>
		</>
  	);
}

export default App;
