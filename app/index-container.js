"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
require("es6-promise/auto");
var React = require("react");
var fetch = require("isomorphic-fetch");
var index_create_form_1 = require("./index-create-form");
var index_update_form_1 = require("./index-update-form");
var index_listing_1 = require("./index-listing");
var GET_TAG_LIST = "/api/database/GetTags";
var IndexContainer = /** @class */ (function (_super) {
    __extends(IndexContainer, _super);
    function IndexContainer(props) {
        var _this = _super.call(this, props) || this;
        _this.handlePasteEvent = function (e) {
            var data = _this.getPastedData(e);
            if (_this.isUrl(data)) {
                _this.setState({
                    tagUrl: data,
                    addTag: true
                });
            }
        };
        _this.state = {
            tagId: '',
            tagUrl: '',
            addTag: false,
            tagList: undefined,
            updateTag: false,
            tagType: '',
            tagTitle: ''
        };
        _this.bindData();
        return _this;
    }
    IndexContainer.prototype.getTagList = function () {
        var _this = this;
        var apiUrl = GET_TAG_LIST;
        fetch(apiUrl).then(function (response) {
            if (response.status >= 200 && response.status < 300) {
            }
            return response.json();
        }).then(function (body) {
            _this.setState({
                tagList: body
            });
        });
    };
    IndexContainer.prototype.bindData = function () {
        this.getTagList();
    };
    IndexContainer.prototype.updateTagList = function () {
        this.getTagList();
    };
    IndexContainer.prototype.getPastedData = function (eve) {
        var clipText = '';
        clipText = eve.clipboardData.getData('text');
        if (clipText == undefined)
            return '';
        return clipText;
    };
    IndexContainer.prototype.isUrl = function (data) {
        var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
        var regex = new RegExp(expression);
        if (data.match(regex))
            return true;
        return false;
    };
    IndexContainer.prototype.updateTag = function (id) {
        var selectedTag = this.state.tagList.filter(function (tg) { return tg.id == id; });
        if (selectedTag.length > 0) {
            var tag = selectedTag[0];
            this.setState({
                tagId: tag.id,
                tagTitle: tag.siteTitle,
                tagType: tag.tagType,
                tagUrl: tag.url,
                updateTag: true
            });
        }
    };
    IndexContainer.prototype.componentDidMount = function () {
        var _this = this;
        document.body.addEventListener('paste', function (e) { return _this.handlePasteEvent(e); });
    };
    IndexContainer.prototype.componentWillUnmount = function () {
        var _this = this;
        document.body.removeEventListener('paste', function (e) { return _this.handlePasteEvent(e); });
    };
    IndexContainer.prototype.render = function () {
        return (React.createElement("div", null,
            (this.state.addTag) ?
                React.createElement(index_create_form_1.default, { eventUrl: this.state.tagUrl, addUrl: this.state.addTag, updateTagList: this.updateTagList.bind(this) })
                :
                    React.createElement("div", null),
            (this.state.updateTag) ?
                React.createElement(index_update_form_1.default, { id: this.state.tagId, eventUrl: this.state.tagUrl, title: this.state.tagTitle, imageUrl: "", tagType: this.state.tagType, updateTagList: this.updateTagList.bind(this) })
                :
                    React.createElement("div", null),
            (this.state.tagList != undefined) ?
                React.createElement(index_listing_1.default, { updateTag: this.updateTag.bind(this), tagList: this.state.tagList, updateTagList: this.updateTagList.bind(this) })
                :
                    React.createElement("div", null)));
    };
    return IndexContainer;
}(React.Component));
exports.default = IndexContainer;
//# sourceMappingURL=index-container.js.map