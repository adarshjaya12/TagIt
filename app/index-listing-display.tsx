import 'es6-promise/auto';
import * as React from 'react';
import * as _ from 'lodash';
import * as fetch from 'isomorphic-fetch';

interface TagBlock{
    id: string;
    url: string;
    siteTitle: string;
    tagType: string;    
}

interface IndexListDisplayProps{
    tag: TagBlock;
    updateTagList: () => void;
    updateTag: (id: string) => void;
}

const DELETE_TAG = "/api/database/DeleteTag?id=";


class IndexListingDisplay extends React.Component<IndexListDisplayProps, any>{
    constructor(props: any) {
        super(props)
    }

    deleteTag(e:any): void {
        var tagId = e.currentTarget.attributes["value"].value as string;
        var apiUrl = DELETE_TAG + tagId;
        fetch(apiUrl).then(response => {
            if (response.status >= 200 && response.status < 300) {
            }
            return response.json();
        }).then(body => {
            this.setState({
                tagList: body
            });
            this.props.updateTagList();
        });
    }

    editTag(e:any): void {
        var tagId = e.currentTarget.attributes["value"].value as string;
        this.props.updateTag(tagId);
    }

    render() {
        return(
            <li>
                <h4>{this.props.tag.tagType}</h4>
                <button type="submit" value={this.props.tag.id} onClick={this.deleteTag.bind(this)}>Delete</button>
                <button type="submit" value={this.props.tag.id} onClick={this.editTag.bind(this)}>Update</button>
                <a href={this.props.tag.url} target="_blank">{this.props.tag.siteTitle}</a>
            </li>
        );
     }

}

export default IndexListingDisplay;