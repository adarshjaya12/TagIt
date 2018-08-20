import 'es6-promise/auto';
import * as React from 'react';
import * as _ from 'lodash';
import * as fetch from 'isomorphic-fetch';
import IndexCreateForm from './index-create-form';
import IndexUpdateForm from './index-update-form';
import IndexListing from './index-listing';

interface TagBlock{
    id: string;
    url: string;
    siteTitle: string;
    tagType: string;    
}

interface IndexState{
    tagId: string;
    tagUrl : string;
    addTag:boolean;
    tagList: Array<TagBlock>;
    updateTag: boolean;
    tagTitle: string;
    tagType: string;
}

const GET_TAG_LIST ="/api/database/GetTags";

class IndexContainer extends React.Component<any, IndexState>{
    constructor(props: any) {
        super(props)
        this.state = {
            tagId:'',
            tagUrl: '',
            addTag: false,
            tagList: undefined,
            updateTag: false,
            tagType: '',
            tagTitle: ''
        }
        this.bindData();
    }


    getTagList():void{
        var apiUrl = GET_TAG_LIST;
        fetch(apiUrl).then(response => {
            if (response.status >= 200 && response.status < 300) {
            }
            return response.json();
        }).then(body => {
            this.setState({
                tagList : body
            });
        })
    }

    bindData():void{
        this.getTagList();
    }

    updateTagList(): void {
        this.getTagList();
    }

    getPastedData(eve:ClipboardEvent):string{
        var clipText = '';
        clipText = eve.clipboardData.getData('text');
        if(clipText == undefined)
            return '';
        return clipText;
    }
    
    isUrl(data:string):boolean
    {
        var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
        var regex = new RegExp(expression);
        if (data.match(regex))
            return true;
        return false;
    }

    updateTag(id: string): void {
        var selectedTag = this.state.tagList.filter(tg => tg.id == id);
        if (selectedTag.length > 0) {
            var tag = selectedTag[0];
            this.setState({
                tagId: tag.id,
                tagTitle: tag.siteTitle,
                tagType: tag.tagType,
                tagUrl: tag.url,
                updateTag:true
            });
        }
    }

    handlePasteEvent = (e) =>{
        var data= this.getPastedData(e);
        if(this.isUrl(data)){
            this.setState({
                tagUrl: data,
                addTag:true
            });
        }
    }
    disableUpdateBlocK(): void {
        this.setState({
            updateTag: false
        });
    }
    componentDidMount(){
        document.body.addEventListener('paste',(e) => this.handlePasteEvent(e));
    }
    componentWillUnmount(){
        document.body.removeEventListener('paste',(e) =>this.handlePasteEvent(e));
    }
    render() {
       return(
           <div>
               {
                   (this.state.addTag) ?
                       <IndexCreateForm eventUrl={this.state.tagUrl} addUrl={this.state.addTag} updateTagList={this.updateTagList.bind(this)} />
                   :
                   <div></div>
               }
               {
                   (this.state.updateTag) ?
                       <IndexUpdateForm disableUpdateBlock={this.disableUpdateBlocK.bind(this)} id={this.state.tagId} eventUrl={this.state.tagUrl} title={this.state.tagTitle} imageUrl="" tagType={this.state.tagType} updateTagList={this.updateTagList.bind(this)} />
                       :
                       <div></div>
               }
               {
                   (this.state.tagList != undefined) ?
                       <IndexListing updateTag={this.updateTag.bind(this)} tagList={this.state.tagList} updateTagList={this.updateTagList.bind(this)} />
                    :
                    <div></div>
               }
           </div>
       );
    }

}

export default IndexContainer;