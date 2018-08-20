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
var GET_TITLE_URL = "/api/database/GetTitle?Url=";
var ADD_TAG = "/api/database/AddTag";
var UPDATE_TAG = "/api/database/UpdateTag";
var TagTypes = ["Top", "Favorite"];
var IndexCreateForm = /** @class */ (function (_super) {
    __extends(IndexCreateForm, _super);
    function IndexCreateForm(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            eventUrl: _this.props.eventUrl,
            domainUrl: _this.getDomainName(_this.props.eventUrl),
            title: "",
            image: undefined,
            tagType: "",
            postStatus: false,
            displayBlock: _this.props.addUrl
        };
        _this.populateField(_this.props.eventUrl);
        return _this;
    }
    IndexCreateForm.prototype.getDomainName = function (url) {
        var r = /:\/\/(.[^/]+)/;
        var domainUrl = url.match(r);
        if (domainUrl != undefined || domainUrl.length == 0)
            return domainUrl[1];
        return '';
    };
    IndexCreateForm.prototype.populateField = function (url) {
        this.setState({
            eventUrl: this.props.eventUrl
        });
        this.getTitleByUrl(url);
    };
    IndexCreateForm.prototype.getImageByUrl = function (url) {
    };
    IndexCreateForm.prototype.getTitleByUrl = function (url) {
        var _this = this;
        var apiUrl = GET_TITLE_URL + url;
        fetch(apiUrl).then(function (response) {
            if (response.status >= 200 && response.status < 300) {
            }
            return response.json();
        }).then(function (body) {
            _this.setState({
                title: body
            });
        });
    };
    IndexCreateForm.prototype.formSubmit = function () {
        var _this = this;
        var apiUrl = ADD_TAG;
        var bodyObj = {
            "url": this.props.eventUrl,
            "title": this.state.title,
            "tagType": this.state.tagType == "" ? "Top" : this.state.tagType
        };
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(bodyObj)
        }).then(function (response) {
            if (response.status >= 200 && response.status < 300) {
            }
            return response.json();
        }).then(function (body) {
            _this.setState({
                postStatus: true,
                displayBlock: false
            });
            _this.props.updateTagList();
        });
    };
    IndexCreateForm.prototype.selectedTagType = function (e) {
        var typeSelectedValue = e.target.value;
        this.setState({
            tagType: typeSelectedValue
        });
    };
    IndexCreateForm.prototype.render = function () {
        return (React.createElement("div", null, (this.state.displayBlock) ?
            React.createElement("div", null,
                React.createElement("h2", null, "Add Tag"),
                React.createElement("input", { type: "text", value: this.state.title }),
                React.createElement("input", { type: "text", value: this.props.eventUrl }),
                React.createElement("select", { onChange: this.selectedTagType.bind(this), value: this.state.tagType }, TagTypes.map(function (item) {
                    return React.createElement("option", { key: item, value: item }, item);
                })),
                React.createElement("h3", null, this.state.tagType),
                React.createElement("h2", null, "Image"),
                React.createElement("input", { type: "submit", onClick: this.formSubmit.bind(this), value: "Add" }))
            :
                React.createElement("div", null)));
    };
    return IndexCreateForm;
}(React.Component));
exports.default = IndexCreateForm;
//# sourceMappingURL=index-create-form.js.map