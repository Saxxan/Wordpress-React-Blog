import styled from 'styled-components'
import { css } from 'styled-components';

export const ArticlePost = styled.article`
    border-bottom: 1px solid gray;
    padding: 20px;

    ${props => props.featured &&
        css`background: lightyellow;`
    }
`;

export default function Post (props) {
    return (
        <ArticlePost>
            {props.title}
            {props.children}
        </ArticlePost>
    );
}