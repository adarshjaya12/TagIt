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
var UPDATE_TAG = "/api/database/UpdateTag";
var TagTypes = ["Top", "Favorite"];
var IndexUpdateForm = /** @class */ (function (_super) {
    __extends(IndexUpdateForm, _super);
    function IndexUpdateForm(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            eventUrl: _this.props.eventUrl,
            title: _this.props.title,
            imageUrl: _this.props.imageUrl,
            tagType: _this.props.tagType,
            displayBlock: true
        };
        return _this;
    }
    IndexUpdateForm.prototype.formUpdate = function () {
        var _this = this;
        var apiUrl = UPDATE_TAG;
        var bodyObj = {
            "id": this.props.id,
            "url": this.state.eventUrl,
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
                displayBlock: false
            });
            _this.props.updateTagList();
        });
    };
    IndexUpdateForm.prototype.selectedTagType = function (e) {
        var typeSelectedValue = e.target.value;
        this.setState({
            tagType: typeSelectedValue
        });
    };
    IndexUpdateForm.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null, (this.state.displayBlock) ?
            React.createElement("div", null,
                React.createElement("h2", null, "Update Tag"),
                React.createElement("input", { type: "text", defaultValue: this.state.title, onChange: function (e) { _this.setState({ title: e.target.value }); } }),
                React.createElement("input", { type: "text", defaultValue: this.state.eventUrl, onChange: function (e) { _this.setState({ eventUrl: e.target.value }); } }),
                React.createElement("select", { onChange: this.selectedTagType.bind(this), value: this.state.tagType }, TagTypes.map(function (item) {
                    return React.createElement("option", { key: item, value: item }, item);
                })),
                React.createElement("h2", null, "Image"),
                React.createElement("input", { type: "submit", onClick: this.formUpdate.bind(this), value: "Update" }))
            :
                React.createElement("div", null)));
    };
    return IndexUpdateForm;
}(React.Component));
exports.default = IndexUpdateForm;
//# sourceMappingURL=index-update-form.js.map