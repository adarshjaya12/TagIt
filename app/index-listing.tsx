import 'es6-promise/auto';
import * as React from 'react';
import * as _ from 'lodash';
import * as fetch from 'isomorphic-fetch';
import IndexListingDisplay from './index-listing-display';

interface TagBlock {
    id: string;
    url: string;
    siteTitle: string;
    tagType: string;
}
interface IndexListProps{
    tagList: Array<TagBlock>;
    updateTag: (id: string) => void;
    updateTagList: () => void;
}


class IndexListing extends React.Component<IndexListProps, any>{
    constructor(props: any) {
        super(props)
    }

    
    render() {
        return(
            (<ul>
                {this.props.tagList.map(item =>
                    <IndexListingDisplay updateTag={this.props.updateTag.bind(this)} tag={item} updateTagList={this.props.updateTagList.bind(this)} />
                )}
            </ul>)
        );
     }

}

export default IndexListing;