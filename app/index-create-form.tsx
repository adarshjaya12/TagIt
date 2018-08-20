import 'es6-promise/auto';
import * as React from 'react';
import * as _ from 'lodash';
import * as fetch from 'isomorphic-fetch';

interface IndexFormProps{
    eventUrl : string;
    addUrl: boolean;
    updateTagList: () => void;
}

interface IndexFormState{
    eventUrl: string;
    domainUrl: string;
    title: string;
    image: ImageBitmap;
    tagType: string;
    postStatus: boolean;
    displayBlock: boolean;
}

const GET_TITLE_URL = "/api/database/GetTitle?Url=";
const ADD_TAG ="/api/database/AddTag";
const UPDATE_TAG = "/api/database/UpdateTag";

const TagTypes = ["Top", "Favorite"];

class IndexCreateForm extends React.Component<IndexFormProps, IndexFormState>{
    constructor(props: any) {
        super(props)
        this.state = {
            eventUrl: this.props.eventUrl,
            domainUrl: this.getDomainName(this.props.eventUrl),
            title: "",
            image: undefined,
            tagType:"",
            postStatus: false,
            displayBlock: this.props.addUrl
        }
      
        this.populateField(this.props.eventUrl);
    }

    getDomainName(url: string): string {
        var r = /:\/\/(.[^/]+)/;
        var domainUrl = url.match(r);
        if (domainUrl != undefined || domainUrl.length == 0)
            return domainUrl[1];
        return '';
    }

    populateField(url: string): void{
        this.setState({
            eventUrl: this.props.eventUrl

        })
        this.getTitleByUrl(url);
    }

    getImageByUrl(url:string):void{
        
    }
    getTitleByUrl(url:string):void{
        var apiUrl = GET_TITLE_URL+url;
        fetch(apiUrl).then(response => {
            if (response.status >= 200 && response.status < 300) {
            }
            return response.json();
        }).then(body => {
            this.setState({
                title: body
            });
        })
    }

    formSubmit():void{
        var apiUrl = ADD_TAG;
        var bodyObj = {
            "url": this.props.eventUrl,
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
            this.setState({
                postStatus: true,
                displayBlock: false
            });
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
               {
                   (this.state.displayBlock) ?
                   <div>
                       <h2>Add Tag</h2>
                       <input type="text" value={this.state.title} />
                       <input type="text" value={this.props.eventUrl} />
                       {
                            //(this.state.domainUrl != '') ?
                            //<div>
                            //    <object type="text/html" data={this.state.domainUrl} width="30px" height="30px" />
                            //</div>
                            //:
                            //<div></div>
                       }
                       <select  onChange={this.selectedTagType.bind(this)} value={this.state.tagType}>
                        {TagTypes.map(item =>
                            <option key={item} value={item} >
                                {item}
                            </option>
                        )}
                    </select>
                       <h3>{this.state.tagType}</h3>
                       <h2>Image</h2>
                       <input type="submit" onClick={this.formSubmit.bind(this)} value="Add"/>
                    </div>
                   :
                   <div></div>
               }
           </div>
       );
    }

}

export default IndexCreateForm;