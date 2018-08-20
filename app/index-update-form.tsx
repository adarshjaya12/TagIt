import 'es6-promise/auto';
import * as React from 'react';
import * as _ from 'lodash';
import * as fetch from 'isomorphic-fetch';

interface IndexFormProps{
    id: string;
    eventUrl: string;
    title: string;
    imageUrl: string;
    tagType: string;
    updateTagList: () => void;
    disableUpdateBlock: () => void;
}

interface IndexFormState{
    eventUrl: string;
    title: string;
    imageUrl: string;
    tagType: string;
    displayBlock: boolean;
}

const UPDATE_TAG = "/api/database/UpdateTag";

const TagTypes = ["Top", "Favorite"];

class IndexUpdateForm extends React.Component<IndexFormProps, IndexFormState>{
    constructor(props: any) {
        super(props)
        this.state = {
            eventUrl: this.props.eventUrl,
            title: this.props.title,
            imageUrl: this.props.imageUrl,
            tagType: this.props.tagType,
            displayBlock: true
        }
    }

    formUpdate():void{
        var apiUrl = UPDATE_TAG;
        var bodyObj = {
            "id": this.props.id,
            "url": this.state.eventUrl,
            "title": this.state.title,
            "tagType": this.state.tagType == "" ? "Top" : this.state.tagType
        }
        fetch(apiUrl,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body:JSON.stringify(bodyObj)
        }).then(response => {
            if (response.status >= 200 && response.status < 300) {
            }
            return response.json();
        }).then(body => {
            this.props.disableUpdateBlock();
            this.props.updateTagList();
        })
    }
   
    selectedTagType(e: any):void{
        var typeSelectedValue = e.target.value;
        this.setState({
            tagType: typeSelectedValue
        });
    }
    render() {
       return(
           <div>
                <div>
                    <h2>Update Tag</h2>
                    <input type="text" defaultValue={this.state.title} onChange={(e) => { this.setState({ title: e.target.value }) }} />
                    <input type="text" defaultValue={this.state.eventUrl} onChange={(e) => { this.setState({ eventUrl: e.target.value }) }} />
                    <select  onChange={this.selectedTagType.bind(this)} value={this.state.tagType}>
                    {TagTypes.map(item =>
                        <option key={item} value={item} >
                            {item}
                        </option>
                    )}
                </select>
                    <h2>Image</h2>
                    <input type="submit" onClick={this.formUpdate.bind(this)} value="Update"/>
                </div>
           </div>
       );
    }

}

export default IndexUpdateForm;